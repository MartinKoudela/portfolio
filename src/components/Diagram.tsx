import { Fragment } from "react";
import type { DiagramMedia, MobileCard, MobileNode } from "@/content/site";
import { cx } from "@/lib/cx";

export function Diagram({ id, diagram }: { id: string; diagram: DiagramMedia }) {
    return (
        <div className="dg" style={{ width: diagram.width, height: diagram.height }}>
            {diagram.frames?.map((f, i) => (
                <div
                    key={i}
                    className={cx("dg-frame", f.tint && "tint")}
                    style={{ left: f.x, top: f.y, width: f.w, height: f.h }}
                />
            ))}
            {diagram.arrows.map((a, i) => {
                const marker = `${id}-head-${i}`;
                return (
                    <svg
                        key={i}
                        className={cx("arr", a.thin && "thin", a.muted && "muted", a.dashed && "dashed")}
                        width={a.w}
                        height={a.h}
                        viewBox={`0 0 ${a.w} ${a.h}`}
                        preserveAspectRatio="none"
                        style={{ left: a.x, top: a.y }}
                        aria-hidden="true"
                    >
                        {a.head && (
                            <defs>
                                <marker
                                    id={marker}
                                    orient="auto"
                                    markerWidth="5"
                                    markerHeight="5"
                                    refX="2"
                                    refY="2"
                                    overflow="visible"
                                >
                                    <path d="M0 0 L4 2 L0 4 Z" className="arr-head" />
                                </marker>
                            </defs>
                        )}
                        <path d={a.d} markerEnd={a.head ? `url(#${marker})` : undefined} />
                    </svg>
                );
            })}
            {diagram.cards.map((c, i) => (
                <div
                    key={i}
                    className={cx("card", c.tint && "tint", c.planned && "planned", c.center && "center")}
                    style={{ left: c.x, top: c.y, width: c.w, height: c.h, padding: c.pad }}
                >
                    <span>
                        {c.title && <b>{c.title}</b>}
                        {c.lines?.map((line, j) => (
                            <Fragment key={j}>
                                {(c.title || j > 0) && <br />}
                                {line}
                            </Fragment>
                        ))}
                    </span>
                </div>
            ))}
            {diagram.texts?.map((t, i) => (
                <div
                    key={i}
                    className={t.label ? "lbl" : "dg-note"}
                    style={{
                        left: t.x,
                        top: t.y,
                        width: t.w,
                        textAlign: t.center ? "center" : undefined,
                        fontSize: t.size?.[0],
                        lineHeight: t.size ? `${t.size[1]}px` : undefined,
                    }}
                >
                    {t.text}
                </div>
            ))}
        </div>
    );
}

function MCard({ card, className }: { card: MobileCard; className?: string }) {
    return (
        <div className={cx("mcard", card.tint && "tint", card.planned && "planned", className)}>
            <b>{card.title}</b>
            {card.lines &&
                (card.inline ? (
                    <> · {card.lines.join(" ")}</>
                ) : (
                    card.lines.map((line, i) => (
                        <Fragment key={i}>
                            <br />
                            {card.mono ? <span className="mono mcard-mono">{line}</span> : line}
                        </Fragment>
                    ))
                ))}
        </div>
    );
}

function DownArrow({ size = 24 }: { size?: number }) {
    return (
        <svg className="marr" width="8" height={size} viewBox={`0 0 8 ${size}`} aria-hidden="true">
            <path d={`M4 0 L4 ${size - 7}`} />
            <path d={`M1 ${size - 8} L4 ${size - 1} L7 ${size - 8} Z`} className="marr-head" />
        </svg>
    );
}

function Nodes({ nodes }: { nodes: MobileNode[] }) {
    return nodes.map((node, i) => {
        switch (node.t) {
            case "card":
                return <MCard key={i} card={node.card} />;
            case "arrow":
                return <DownArrow key={i} size={node.size} />;
            case "grid":
                return (
                    <div key={i} className="mgrid">
                        {node.cards.map((c, j) => (
                            <MCard key={j} card={c} />
                        ))}
                    </div>
                );
            case "band":
                return (
                    <div key={i} className={cx("band", node.tint && "tint")}>
                        <p className="blbl">{node.label}</p>
                        <Nodes nodes={node.nodes} />
                        {node.note && <p className="band-note">{node.note}</p>}
                    </div>
                );
            case "note":
                return (
                    <p key={i} className="mdg-note">
                        {node.text}
                    </p>
                );
            case "pair":
                return (
                    <div key={i} className="mpair">
                        <MCard card={node.left} className="mpair-l" />
                        <svg className="marr" width="38" height="18" viewBox="0 0 38 18" aria-hidden="true">
                            <path d="M3 5 L31 5" />
                            <path d="M30 2 L36 5 L30 8 Z" className="marr-head" />
                            <path d="M35 13 L7 13" />
                            <path d="M8 10 L2 13 L8 16 Z" className="marr-head" />
                        </svg>
                        <MCard card={node.right} className="mpair-r" />
                    </div>
                );
            case "narrow":
                return (
                    <div key={i} className="mnarrow">
                        <Nodes nodes={node.nodes} />
                    </div>
                );
        }
    });
}

export function MobileDiagram({ diagram }: { diagram: DiagramMedia }) {
    return (
        <div className="mdg" style={{ gap: diagram.mobileGap }}>
            <Nodes nodes={diagram.mobile} />
        </div>
    );
}
