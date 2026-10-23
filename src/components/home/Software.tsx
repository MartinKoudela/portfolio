import Link from "next/link";
import { otherSoftware, projectsIn, section } from "@/content/site";
import Caption from "../Caption";
import DataTable, { cell } from "../DataTable";
import AppNote from "./AppNote";
import SectionHead from "./SectionHead";

export default function Software() {
    const s = section("eth4");
    const captionId = "table-6-caption";
    const [name, description, stack, link] = otherSoftware.columns;

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />
            {projectsIn("software").map((p) => (
                <AppNote key={p.slug} project={p} />
            ))}

            <div className="row note">
                <Caption id={captionId} label={otherSoftware.label} text={otherSoftware.caption} rail className="rail" />
                <div className="main">
                    <DataTable
                        columns={[
                            { label: name, width: "20%" },
                            { label: description },
                            { label: stack, width: "22%" },
                            { label: link, width: "9%", srOnly: true },
                        ]}
                        rows={projectsIn("compact").map((p) => ({
                            cells: [
                                { content: <b>{p.name}</b> },
                                cell(p.row!.description),
                                cell(p.row!.stack, { mono: true }),
                                { content: <Link href={`/project/${p.slug}`}>Note</Link> },
                            ],
                        }))}
                        minWidth={680}
                        labelledBy={captionId}
                    />
                </div>
            </div>
        </section>
    );
}
