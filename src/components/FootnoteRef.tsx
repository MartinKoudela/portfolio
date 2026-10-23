export default function FootnoteRef({ n }: { n: number }) {
    return (
        <sup>
            <a href={`#fn-${n}`} className="fn-ref" aria-label={`Footnote ${n}`}>
                {n}
            </a>
        </sup>
    );
}
