import type { ReactNode } from "react";
import { footnoteLinks } from "@/content/site";
import { cx } from "@/lib/cx";

export type FootnoteItem = { n: number; text: string };

function withLinks(text: string): ReactNode {
    const link = footnoteLinks.find((l) => text.includes(l.text));
    if (!link) return text;
    const [before, after] = text.split(link.text);
    return (
        <>
            {before}
            <a href={link.href} target="_blank" rel="noopener">
                {link.text}
                <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {after}
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
