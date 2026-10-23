import { footnotes, forensics, homeFootnoteNumbers, projectsIn, section } from "@/content/site";
import Caption from "../Caption";
import DataTable, { cell } from "../DataTable";
import Footnotes from "../Footnotes";
import AppNote from "./AppNote";
import SectionHead from "./SectionHead";

export default function Security() {
    const s = section("eth3");
    const captionId = "table-4-caption";

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />
            {projectsIn("security").map((p) => (
                <AppNote key={p.slug} project={p} />
            ))}

            <div className="row note">
                <Caption id={captionId} label={forensics.label} text={forensics.caption} rail className="rail" />
                <div className="main">
                    <DataTable
                        columns={forensics.columns.map((label, i) => ({ label, width: i < 2 ? "32%" : undefined }))}
                        rows={forensics.rows.map((r) => ({
                            cells: r.map((text, i) => cell(text, { mono: i === forensics.monoColumn })),
                        }))}
                        minWidth={600}
                        labelledBy={captionId}
                    />
                </div>
            </div>

            <Footnotes
                ruled
                items={[
                    { n: homeFootnoteNumbers.esp32Datasheet!, text: footnotes.esp32Datasheet },
                    { n: homeFootnoteNumbers.authorised!, text: footnotes.authorised },
                ]}
            />
        </section>
    );
}
