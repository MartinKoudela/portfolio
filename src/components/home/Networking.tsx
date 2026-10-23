import { network, section } from "@/content/site";
import Caption from "../Caption";
import DataTable, { cell } from "../DataTable";
import SectionHead from "./SectionHead";

export default function Networking() {
    const s = section("eth1");
    const diag = network.diagnostics;
    const diagId = "table-diagnostics-caption";

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />

            <div className="row tbl-row hide-m">
                <Caption id={diagId} label={diag.label} text={diag.caption} rail className="rail" />
                <div className="main">
                    <DataTable
                        columns={[{ label: diag.columns[0], width: "52%" }, { label: diag.columns[1] }]}
                        rows={diag.rows.map((r) => ({
                            cells: r.map((text, i) => cell(text, { mono: i === diag.monoColumn })),
                        }))}
                        minWidth={480}
                        labelledBy={diagId}
                    />
                </div>
            </div>

            <div className="hide-d">
                <h3 className="mdl-title">
                    {diag.label} · {diag.caption}
                </h3>
                <dl className="mdl">
                    {diag.rows.map(([fn, tools]) => (
                        <div key={fn}>
                            <dt>{fn}</dt>
                            <dd>
                                <span className="mono">{tools}</span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
