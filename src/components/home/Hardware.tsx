import { footnotes, homeFootnoteNumbers, projectsIn, section } from "@/content/site";
import Footnotes from "../Footnotes";
import AppNote from "./AppNote";
import SectionHead from "./SectionHead";

export default function Hardware() {
    const s = section("eth2");

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <SectionHead section={s} />
            {projectsIn("hardware").map((p) => (
                <AppNote key={p.slug} project={p} />
            ))}
            <Footnotes ruled items={[{ n: homeFootnoteNumbers.piBriefs!, text: footnotes.piBriefs }]} />
        </section>
    );
}
