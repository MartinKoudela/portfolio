import type { ReactNode } from "react";

const MARKER = /(\[(?:PLACEHOLDER|DATE)[^\]]*\])/;

export function rich(text: string): ReactNode {
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
