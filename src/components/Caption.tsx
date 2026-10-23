import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
    label: string;
    text?: string;
    note?: ReactNode;
    mobileText?: string;
    rail?: boolean;
    as?: "p" | "figcaption";
    id?: string;
    className?: string;
    fullSize?: string;
};

export default function Caption({
    label,
    text,
    note,
    mobileText,
    rail = false,
    as: Tag = "p",
    id,
    className,
    fullSize,
}: Props) {
    return (
        <Tag id={id} className={cx("cap", rail && "cap--rail", className)}>
            <b>{label}</b>
            {text && (
                <>
                    <span className="cap-sep">{"  "}</span>
                    {mobileText ? (
                        <>
                            <span className="hide-m">{text}</span>
                            <span className="hide-d">{mobileText}</span>
                        </>
                    ) : (
                        text
                    )}
                </>
            )}
            {note && <span className="cap-note">{note}</span>}
            {fullSize && (
                <>
                    <span className="cap-sep">{"  "}</span>
                    <a href={fullSize} target="_blank" rel="noopener" className="cap-open">
                        Open full size<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                </>
            )}
        </Tag>
    );
}
