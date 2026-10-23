import { Fragment, type ReactNode } from "react";
import Link from "next/link";

const MARKER = /(\[(?:PLACEHOLDER|DATE)[^\]]*\])/;
const LINK = /(\[[^\]]+\]\(\/[^)\s]*\))/;
const LINK_PARTS = /^\[([^\]]+)\]\((\/[^)\s]*)\)$/;

function markers(text: string): ReactNode {
    const parts = text.split(MARKER);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
        i % 2 === 1 ? (
            <span key={i} className="tbd">
                {part}
            </span>
        ) : (
            part
        )
    );
}

export function rich(text: string): ReactNode {
    const parts = text.split(LINK);
    if (parts.length === 1) return markers(text);
    return parts.map((part, i) => {
        const link = part.match(LINK_PARTS);
        return link ? (
            <Link key={i} href={link[2]}>
                {link[1]}
            </Link>
        ) : (
            <Fragment key={i}>{markers(part)}</Fragment>
        );
    });
}

export function plain(text: string): string {
    return text.replace(new RegExp(LINK_PARTS.source.slice(1, -1), "g"), "$1");
}
