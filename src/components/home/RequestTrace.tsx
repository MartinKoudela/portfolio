"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { networkLabels } from "@/content/site";
import Caption from "../Caption";
import DataTable, { type Row } from "../DataTable";

const SAMPLES = 5;
const PING = "/api/ping";

type Edge = { value: string; source: string } | null;

type Result = {
    rtt: number | null;
    protocol: string | null;
    edge: Edge;
    origin: string | null;
};

const NOTES = {
    rtt: "The test requests did not complete, so no round trip could be timed.",
    protocol: "Your browser did not report the protocol for this page load.",
    edge: "The response carried no edge identifier (cf-ray or x-vercel-id), so it was not served through an edge network here, for example in a local build.",
    origin: "The response did not name the region of the function that answered it.",
    tls: "Browsers do not expose the negotiated TLS version to page scripts, and the origin never sees it because TLS ends at the edge.",
};

type NoteKey = keyof typeof NOTES;

function median(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function edgeFrom(headers: Headers): Edge {
    const colo = headers.get("cf-ray")?.split("-").pop();
    if (colo && /^[A-Z]{3}$/.test(colo)) return { value: colo, source: "Cloudflare data centre, from cf-ray" };
    const region = headers.get("x-vercel-id")?.split("::")[0];
    if (region && /^[a-z]{3}\d$/.test(region)) return { value: region, source: "Vercel edge region, from x-vercel-id" };
    return null;
}

function originFrom(headers: Headers): string | null {
    const parts = headers.get("x-vercel-id")?.split("::") ?? [];
    const region = parts.length > 2 ? parts[parts.length - 2] : undefined;
    return region && /^[a-z]{3}\d$/.test(region) ? region : null;
}

function navigationProtocol(): string | null {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    return nav?.nextHopProtocol || null;
}

async function measure(): Promise<Result> {
    const times: number[] = [];
    let headers: Headers | null = null;
    for (let i = 0; i < SAMPLES; i++) {
        try {
            const start = performance.now();
            const res = await fetch(PING, { cache: "no-store" });
            const end = performance.now();
            if (!res.ok) continue;
            times.push(end - start);
            headers = res.headers;
        } catch {
            continue;
        }
    }
    return {
        rtt: times.length === SAMPLES ? Math.round(median(times)) : null,
        protocol: navigationProtocol(),
        edge: headers ? edgeFrom(headers) : null,
        origin: headers ? originFrom(headers) : null,
    };
}

function afterLoad(): Promise<void> {
    if (document.readyState === "complete") return Promise.resolve();
    return new Promise((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
}

export default function RequestTrace() {
    const [result, setResult] = useState<Result | null>(null);
    const [measuring, setMeasuring] = useState(true);

    const run = useCallback(async () => {
        setMeasuring(true);
        setResult(await measure());
        setMeasuring(false);
    }, []);

    useEffect(() => {
        let active = true;
        afterLoad()
            .then(measure)
            .then((r) => {
                if (!active) return;
                setResult(r);
                setMeasuring(false);
            });
        return () => {
            active = false;
        };
    }, []);

    const notes: NoteKey[] = [];
    const na = (key: NoteKey): ReactNode => {
        if (!notes.includes(key)) notes.push(key);
        return (
            <>
                n/a<sup>{String.fromCharCode(97 + notes.indexOf(key))}</sup>
            </>
        );
    };
    const show = (value: string | null | undefined, key: NoteKey): ReactNode =>
        measuring || !result ? "measuring…" : value ? value : na(key);

    const rtt = show(result?.rtt != null ? `${result.rtt} ms` : null, "rtt");
    const protocol = show(result?.protocol, "protocol");
    const edge = show(result?.edge?.value, "edge");
    const origin = show(result?.origin, "origin");
    const tls = measuring ? "measuring…" : na("tls");

    const rows: Row[] = [
        { cells: [{ content: "Round-trip time" }, { content: rtt, mono: true }, { content: `Median of ${SAMPLES} requests to ${PING}` }] },
        { cells: [{ content: "HTTP protocol" }, { content: protocol, mono: true }, { content: "Navigation request for this page" }] },
        {
            cells: [
                { content: "Edge location" },
                { content: edge, mono: true },
                { content: result?.edge?.source ?? "From cf-ray or x-vercel-id" },
            ],
        },
        { cells: [{ content: "Origin region" }, { content: origin, mono: true }, { content: "Vercel function region, from x-vercel-id" }] },
        { cells: [{ content: "TLS version" }, { content: tls, mono: true }, { content: "" }] },
    ];

    const steps: { title: string; value: ReactNode }[] = [
        { title: "Browser", value: "your browser" },
        { title: "Edge", value: edge },
        { title: "Origin", value: origin },
        { title: "Response", value: measuring || !result ? "measuring…" : rtt },
    ];

    const figureId = "fig-trace-caption";
    const tableId = "table-trace-caption";

    return (
        <>
            <figure className="row fig fig--rail rt-fig">
                <Caption as="figcaption" id={figureId} label={networkLabels.traceFigure} text="Your request, traced" rail className="rail" />
                <div className="main">
                    <ol className="rt-path">
                        {steps.map((step, i) => (
                            <li key={step.title} className="rt-step">
                                {i > 0 && (
                                    <svg className="rt-arr" width="40" height="8" viewBox="0 0 40 8" aria-hidden="true">
                                        <path d="M0 4 L33 4" />
                                        <path d="M32 1 L39 4 L32 7 Z" className="rt-head" />
                                    </svg>
                                )}
                                <span className="rt-node">
                                    <b>{step.title}</b>
                                    <br />
                                    <span className="mono rt-val">{step.value}</span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </figure>

            <div className="row tbl-row">
                <Caption
                    id={tableId}
                    label={networkLabels.traceTable}
                    text="Measured characteristics. Test conditions: your browser, at page load."
                    rail
                    className="rail"
                />
                <div className="main">
                    <DataTable
                        columns={[
                            { label: "Parameter", width: "26%" },
                            { label: "Value", width: "26%" },
                            { label: "Conditions" },
                        ]}
                        rows={rows}
                        minWidth={560}
                        mobileMinWidth={0}
                        labelledBy={tableId}
                    />
                    <div className="rt-foot">
                        {!measuring &&
                            notes.map((key, i) => (
                                <p key={key} className="cap">
                                    <sup>{String.fromCharCode(97 + i)}</sup> {NOTES[key]}
                                </p>
                            ))}
                        <p className="cap rt-status">
                            <span aria-live="polite">{measuring ? "Measuring…" : "Measured in your browser."}</span>{" "}
                            <button type="button" className="rt-btn" onClick={run} disabled={measuring}>
                                Re-measure
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
