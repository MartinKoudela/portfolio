"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { ServiceCheck, StatusPayload } from "@/app/api/status/route";
import { networkLabels } from "@/content/site";
import Caption from "../Caption";
import DataTable, { type Row } from "../DataTable";

const HOSTS = ["martinkoudela.com", "laravix.com"];

const NOTES = {
    timeout: "No response within 10 seconds.",
    connection: "The connection failed before a response arrived.",
    cert: "The TLS handshake did not complete, so the certificate could not be read.",
    load: "The status data could not be loaded in your browser.",
};

type NoteKey = keyof typeof NOTES;

function formatTime(iso: string): string {
    return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export default function StatusPanel() {
    const [data, setData] = useState<StatusPayload | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let active = true;
        fetch("/api/status")
            .then((res) => (res.ok ? (res.json() as Promise<StatusPayload>) : Promise.reject()))
            .then((payload) => active && setData(payload))
            .catch(() => active && setFailed(true));
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

    const loading = !data && !failed;
    const cells = (host: string): ReactNode[] => {
        if (loading) return ["checking…", "checking…", "checking…", "checking…"];
        if (failed || !data) return [na("load"), na("load"), na("load"), na("load")];
        const s = data.services.find((x: ServiceCheck) => x.host === host);
        if (!s) return [na("load"), na("load"), na("load"), na("load")];
        return [
            s.up ? "UP" : <span className="st-down">DOWN</span>,
            s.responseMs !== null ? `${s.responseMs} ms` : na(s.error ?? "connection"),
            s.certValidTo ? s.certValidTo.slice(0, 10) : na("cert"),
            formatTime(data.checkedAt),
        ];
    };

    const results = HOSTS.map((host) => ({ host, values: cells(host) }));
    const rows: Row[] = results.map(({ host, values }) => ({
        cells: [{ content: host }, ...values.map((content) => ({ content, mono: true }))],
    }));
    const columns = ["Status", "Response time", "TLS certificate valid until", "Checked at"];
    const captionId = "table-status-caption";
    const caption = "Service status. Checked from the server every 5 minutes.";

    const footnotes = notes.map((key, i) => (
        <p key={key} className="cap">
            <sup>{String.fromCharCode(97 + i)}</sup> {NOTES[key]}
        </p>
    ));

    return (
        <>
            <div className="row tbl-row hide-m">
                <Caption id={captionId} label={networkLabels.status} text={caption} rail className="rail" />
                <div className="main">
                    <DataTable
                        columns={[
                            { label: "Service", width: "26%" },
                            { label: columns[0], width: "12%" },
                            { label: columns[1], width: "14%" },
                            { label: columns[2], width: "24%" },
                            { label: columns[3] },
                        ]}
                        rows={rows}
                        minWidth={640}
                        labelledBy={captionId}
                    />
                    <div className="st-foot">{footnotes}</div>
                </div>
            </div>

            <div className="hide-d">
                <h3 className="mdl-title">
                    {networkLabels.status} · {caption}
                </h3>
                <dl className="mdl">
                    {results.map(({ host, values }) => (
                        <div key={host}>
                            <dt>{host}</dt>
                            {values.map((value, i) => (
                                <dd key={columns[i]}>
                                    {columns[i]}: <span className="mono">{value}</span>
                                </dd>
                            ))}
                        </div>
                    ))}
                </dl>
                <div className="st-foot">{footnotes}</div>
            </div>
        </>
    );
}
