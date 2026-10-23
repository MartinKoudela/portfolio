import type { Section } from "@/content/site";

export default function SectionHead({ section }: { section: Section }) {
    return (
        <div className="row sec-head">
            <p className="rail mono sec-code">{section.code}</p>
            <div className="main">
                <h2 id={`h-${section.id}`} className="sec">
                    {section.title}
                </h2>
                {section.summary && <p className="sum">{section.summary}</p>}
            </div>
        </div>
    );
}
