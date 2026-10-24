import { specifications } from "@/content/site";
import Caption from "../Caption";
import DataTable, { cell } from "../DataTable";

export default function Specifications() {
    const specId = "table-skills-caption";

    return (
        <section id="specifications" aria-labelledby="h-spec" className="eth">
            <div className="row spec-head">
                <Caption
                    id={specId}
                    label={specifications.label}
                    text={specifications.caption}
                    rail
                    className="rail hide-m"
                />
                <div className="main">
                    <h2 id="h-spec" className="sec">
                        {specifications.title}
                    </h2>
                </div>
            </div>
            <DataTable
                className="hide-m"
                columns={[{ label: specifications.columns[0], width: "240px" }, { label: specifications.columns[1] }]}
                rows={specifications.rows.map(([label, value]) => ({
                    cells: [cell(label), cell(value, { mono: true })],
                }))}
                minWidth={720}
                labelledBy={specId}
            />
            <div className="hide-d">
                <Caption label={specifications.label} text={specifications.caption} className="m-cap" />
                <dl className="kv">
                    {specifications.rows.map(([label, value]) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
