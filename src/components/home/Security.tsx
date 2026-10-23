import { analysis, footnotes, homeFootnoteNumbers, offensiveTooling, projectsIn, section } from "@/content/site";
import Caption from "../Caption";
import DataTable, { cell } from "../DataTable";
import Footnotes from "../Footnotes";
import AppNote from "./AppNote";
import SectionHead from "./SectionHead";

export default function Security() {
    const s = section("eth3");
    const analysisId = "table-analysis-caption";
    const toolingId = "table-tooling-caption";
    const noteFn = homeFootnoteNumbers[offensiveTooling.noteFn]!;

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />
            {projectsIn("security").map((p) => (
                <AppNote key={p.slug} project={p} />
            ))}

            <div className="note">
                <div className="row">
                    <Caption id={analysisId} label={analysis.label} text={analysis.caption} rail className="rail" />
                    <div className="main">
                        <DataTable
                            columns={analysis.columns.map((label, i) => ({
                                label,
                                width: i < 2 ? "32%" : undefined,
                            }))}
                            rows={analysis.rows.map((r) => ({
                                cells: r.map((text, i) => cell(text, { mono: i === analysis.monoColumn })),
                            }))}
                            minWidth={600}
                            labelledBy={analysisId}
                        />
                    </div>
                </div>

                <div className="row tbl-row">
                    <Caption
                        id={toolingId}
                        label={offensiveTooling.label}
                        text={offensiveTooling.caption}
                        note={
                            <>
                                {offensiveTooling.note}
                                <sup>
                                    <a href={`#fn-${noteFn}`}>{noteFn}</a>
                                </sup>
                            </>
                        }
                        rail
                        className="rail"
                    />
                    <div className="main">
                        <DataTable
                            columns={offensiveTooling.columns.map((label, i) => ({
                                label,
                                width: i === 0 ? "32%" : undefined,
                            }))}
                            rows={offensiveTooling.rows.map((r) => ({
                                cells: r.map((text, i) => cell(text, { mono: i === offensiveTooling.monoColumn })),
                            }))}
                            minWidth={480}
                            mobileMinWidth={0}
                            labelledBy={toolingId}
                        />
                    </div>
                </div>
            </div>

            <Footnotes
                ruled
                items={[
                    {
                        n: homeFootnoteNumbers.esp32Datasheet!,
                        text: footnotes.esp32Datasheet,
                    },
                    { n: noteFn, text: footnotes.authorised },
                ]}
            />
        </section>
    );
}
