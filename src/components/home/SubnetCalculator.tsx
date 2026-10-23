"use client";

import { useId, useState, type FormEvent } from "react";
import { networkLabels } from "@/content/site";
import { calculateSubnet, type Subnet } from "@/lib/subnet";
import Caption from "../Caption";
import DataTable, { type Row } from "../DataTable";

const EXAMPLE = "192.168.10.0/26";

function rowsFor(s: Subnet): Row[] {
    const noBroadcast = s.prefix === 31 ? "none (/31 point-to-point, RFC 3021)" : "none (/32 single host)";
    const values: [string, string][] = [
        ["Network", `${s.network}/${s.prefix}`],
        ["Broadcast", s.broadcast ?? noBroadcast],
        ["First usable host", s.firstHost],
        ["Last usable host", s.lastHost],
        ["Usable hosts", s.usableHosts.toLocaleString("en-US")],
        ["Subnet mask", s.subnetMask],
        ["Wildcard mask", s.wildcardMask],
    ];
    return values.map(([label, value]) => ({ cells: [{ content: label }, { content: value, mono: true }] }));
}

export default function SubnetCalculator() {
    const id = useId();
    const inputId = `${id}-input`;
    const errorId = `${id}-error`;
    const captionId = "table-subnet-caption";

    const [value, setValue] = useState(EXAMPLE);
    const [result, setResult] = useState(() => calculateSubnet(EXAMPLE));

    const submit = (e: FormEvent) => {
        e.preventDefault();
        setResult(calculateSubnet(value));
    };

    return (
        <div className="row tbl-row">
            <Caption id={captionId} label={networkLabels.subnet} text="Subnet calculator" rail className="rail" />
            <div className="main">
                <form className="sn-form" onSubmit={submit} noValidate>
                    <label htmlFor={inputId} className="sn-label">
                        IPv4 address with prefix
                    </label>
                    <div className="sn-controls">
                        <input
                            id={inputId}
                            className="sn-input mono"
                            type="text"
                            inputMode="decimal"
                            autoComplete="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            aria-invalid={result.ok ? undefined : true}
                            aria-describedby={result.ok ? undefined : errorId}
                        />
                        <button type="submit" className="sn-btn">
                            Calculate
                        </button>
                    </div>
                </form>
                <div aria-live="polite">
                    {result.ok ? (
                        <p className="sr-only">
                            {`${result.subnet.network}/${result.subnet.prefix}: ${result.subnet.usableHosts.toLocaleString("en-US")} usable hosts, ${result.subnet.firstHost} to ${result.subnet.lastHost}.`}
                        </p>
                    ) : (
                        <p id={errorId} className="sn-error">
                            {result.error}
                        </p>
                    )}
                </div>
                {result.ok && (
                    <DataTable
                        columns={[{ label: "Parameter", width: "52%" }, { label: "Value" }]}
                        rows={rowsFor(result.subnet)}
                        minWidth={0}
                        labelledBy={captionId}
                    />
                )}
            </div>
        </div>
    );
}
