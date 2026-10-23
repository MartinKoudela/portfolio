import type { CSSProperties, ReactNode } from "react";
import type { SpecRow } from "@/content/site";
import { cx } from "@/lib/cx";
import FootnoteRef from "./FootnoteRef";
import { rich } from "./Rich";

export type Column = { label: string; width?: string; mobileWidth?: string; srOnly?: boolean };
export type Cell = { content: ReactNode; mono?: boolean; muted?: boolean };
export type Row = { cells: Cell[]; muted?: boolean } | { group: string };

type Props = {
    columns: Column[];
    rows: Row[];
    minWidth: number;
    mobileMinWidth?: number;
    labelledBy: string;
    className?: string;
};

export function cell(text: string, options: Omit<Cell, "content"> = {}): Cell {
    return { content: rich(text), ...options };
}

export function specRows(rows: SpecRow[], columns: number, footnote: (row: SpecRow) => number | undefined): Row[] {
    return rows.map((row) => {
        if (row.group) return { group: row.label };
        const n = footnote(row);
        const sup = n ? <FootnoteRef n={n} /> : null;
        const value: Cell = {
            content: (
                <>
                    {row.href ? <a href={row.href}>{row.value}</a> : rich(row.value)}
                    {columns === 2 && sup}
                </>
            ),
            mono: !row.plain,
        };
        const cells: Cell[] = [cell(row.label), value];
        if (columns === 3) {
            cells.push({
                content: (
                    <>
                        {row.note ? rich(row.note) : null}
                        {sup}
                    </>
                ),
            });
        }
        return { cells, muted: row.muted };
    });
}

export default function DataTable({ columns, rows, minWidth, mobileMinWidth, labelledBy, className }: Props) {
    return (
        <div className={cx("scroll", className)} role="region" tabIndex={0} aria-labelledby={labelledBy}>
            <table
                className="tbl"
                aria-labelledby={labelledBy}
                style={{ "--min": `${minWidth}px`, "--min-m": `${mobileMinWidth ?? minWidth}px` } as CSSProperties}
            >
                <thead>
                    <tr>
                        {columns.map((c, i) => (
                            <th
                                key={i}
                                scope="col"
                                style={{ "--w": c.width, "--w-m": c.mobileWidth ?? c.width } as CSSProperties}
                            >
                                {c.srOnly ? <span className="sr-only">{c.label}</span> : c.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) =>
                        "group" in row ? (
                            <tr key={i} className="grp">
                                <td colSpan={columns.length}>{row.group}</td>
                            </tr>
                        ) : (
                            <tr key={i} className={row.muted ? "muted" : undefined}>
                                {row.cells.map((c, j) => (
                                    <td key={j} className={cx(c.mono && "v", c.muted && "muted")}>
                                        {c.content}
                                    </td>
                                ))}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
