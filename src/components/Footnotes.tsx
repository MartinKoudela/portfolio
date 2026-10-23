import type { ReactNode } from "react";
import { footnoteLinks } from "@/content/site";
import { cx } from "@/lib/cx";

export type FootnoteItem = { n: number; text: string };

function withLinks(text: string): ReactNode {
    const link = footnoteLinks
        .filter((l) => text.includes(l.text))
        .sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text))[0];
    if (!link) return text;
    const at = text.indexOf(link.text);
    return (
        <>
            {text.slice(0, at)}
            <a href={link.href} target="_blank" rel="noopener">
                {link.text}
                <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {withLinks(text.slice(at + link.text.length))}
        </>
    );
}

export default function Footnotes({ items, ruled = false }: { items: FootnoteItem[]; ruled?: boolean }) {
    return (
        <div className={cx("row fn", ruled && "fn--ruled")}>
            <div className="rail">
                {items.map((item) => (
                    <p key={item.n} id={`fn-${item.n}`} className="cap">
                        <sup>{item.n}</sup> {withLinks(item.text)}
                    </p>
                ))}
            </div>
        </div>
    );
}
