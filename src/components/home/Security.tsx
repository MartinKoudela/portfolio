import { footnotes, homeFootnoteNumbers, projectsIn, section, tooling } from "@/content/site";
import Caption from "../Caption";
import DataTable, { cell } from "../DataTable";
import FootnoteRef from "../FootnoteRef";
import Footnotes from "../Footnotes";
import AppNote from "./AppNote";
import SectionHead from "./SectionHead";

export default function Security() {
    const s = section("eth3");
    const toolingId = "table-tooling-caption";
    const noteFn = homeFootnoteNumbers[tooling.noteFn]!;

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />
            {projectsIn("security").map((p) => (
                <AppNote key={p.slug} project={p} />
            ))}

            <div className="row note">
                <Caption
                    id={toolingId}
                    label={tooling.label}
                    text={tooling.caption}
                    note={
                        <>
                            {tooling.note}
                            <FootnoteRef n={noteFn} />
                        </>
                    }
                    rail
                    className="rail"
                />
                <div className="main">
                    <DataTable
                        columns={tooling.columns.map((label, i) => ({
                            label,
                            width: i === 0 ? "32%" : undefined,
                        }))}
                        rows={tooling.rows.map((r) => ({
                            cells: r.map((text, i) => cell(text, { mono: i === tooling.monoColumn })),
                        }))}
                        minWidth={480}
                        mobileMinWidth={0}
                        labelledBy={toolingId}
                    />
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
