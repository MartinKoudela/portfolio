import { network, section } from "@/content/site";
import { cx } from "@/lib/cx";
import Caption from "../Caption";
import DataTable, { specRows } from "../DataTable";
import FigureView from "../FigureView";
import SectionHead from "./SectionHead";

export default function Networking() {
    const s = section("eth1");
    const table = network.segments;
    const captionId = "table-1-caption";

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />

            <FigureView figure={network.topology} className="net-fig" />

            <div className="row tbl-row hide-m">
                <Caption id={captionId} label={table.label} text={table.caption} rail className="rail" />
                <div className="main">
                    <DataTable
                        columns={[
                            { label: table.columns[0], width: "22%" },
                            { label: table.columns[1], width: "30%" },
                            { label: table.columns[2] },
                        ]}
                        rows={specRows(table.rows, 3, () => undefined)}
                        minWidth={600}
                        labelledBy={captionId}
                    />
                </div>
            </div>

            <div className="hide-d">
                <h3 className="mdl-title">
                    {table.label} · {table.caption}
                </h3>
                <dl className="mdl">
                    {table.rows.map((row) => (
                        <div key={row.label} className={cx(row.muted && "muted")}>
                            <dt>{row.label}</dt>
                            <dd>
                                <span className="mono">{row.value}</span> · {row.note}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
