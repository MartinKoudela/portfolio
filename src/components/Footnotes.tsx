import { cx } from "@/lib/cx";

export type FootnoteItem = { n: number; text: string };

export default function Footnotes({ items, ruled = false }: { items: FootnoteItem[]; ruled?: boolean }) {
    return (
        <div className={cx("row fn", ruled && "fn--ruled")}>
            <div className="rail">
                {items.map((item) => (
                    <p key={item.n} className="cap">
                        <sup>{item.n}</sup> {item.text}
                    </p>
                ))}
            </div>
        </div>
    );
}
