import { footnotes, homeFootnoteNumbers, identity, intro } from "@/content/site";
import FootnoteRef from "../FootnoteRef";
import Footnotes from "../Footnotes";

export default function Intro() {
    const fn = homeFootnoteNumbers[intro.taglineFn]!;

    return (
        <section id="top" aria-labelledby="mk-title">
            <div className="intro-head">
                <h1 id="mk-title" className="intro-title">
                    {identity.device}
                </h1>
                <p className="intro-name">{identity.name}</p>
                <p className="intro-tagline">
                    {intro.tagline}
                    <FootnoteRef n={fn} />
                </p>
            </div>

            <dl className="facts">
                {intro.facts.map((f) => (
                    <div key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                    </div>
                ))}
            </dl>

            <div className="row features">
                <h2 className="rail features-title">{intro.featuresTitle}</h2>
                <ul className="main features-list">
                    {intro.features.map((f) => (
                        <li key={f.lead}>
                            <b>{f.lead}</b> {f.text}
                        </li>
                    ))}
                </ul>
            </div>

            <Footnotes items={[{ n: fn, text: footnotes[intro.taglineFn] }]} />
        </section>
    );
}
