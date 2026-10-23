import type { SpecRow } from "@/content/site";
import { cx } from "@/lib/cx";
import { rich } from "./Rich";

type Props = { rows: SpecRow[]; columns?: 1 | 2; footnote: (row: SpecRow) => number | undefined };

export default function SpecList({ rows, columns = 1, footnote }: Props) {
    return (
        <dl className={cx("sp-list", columns === 2 && "sp-list--2")}>
            {rows.map((row) => {
                const n = footnote(row);
                return (
                    <div key={row.label} className={cx("sp", row.wide && "sp--wide")}>
                        <dt>{row.label}</dt>
                        <dd>
                            {row.href ? <a href={row.href}>{row.value}</a> : rich(row.value)}
                            {n && <sup>{n}</sup>}
                        </dd>
                    </div>
                );
            })}
        </dl>
    );
}
