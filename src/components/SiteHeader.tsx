"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { identity, sections, section, type SectionId } from "@/content/site";
import PortIcon from "./PortIcon";

type Props = { home: true } | { home?: false; current?: SectionId };

export default function SiteHeader(props: Props) {
    const [observed, setObserved] = useState<SectionId>("eth1");
    const [open, setOpen] = useState(false);
    const active = props.home ? observed : props.current;
    const prefix = props.home ? "" : "/";

    useEffect(() => {
        if (!props.home) return;

        const targets = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => el !== null);
        const end = document.getElementById("page-end");
        let atEnd = false;

        const pick = () => {
            if (atEnd) {
                setObserved("console");
                return;
            }
            const line = window.innerHeight * 0.3;
            let current: SectionId = "eth1";
            for (const el of targets) {
                if (el.getBoundingClientRect().top <= line) current = el.id as SectionId;
            }
            setObserved(current);
        };

        const sectionObserver = new IntersectionObserver(pick, { rootMargin: "0px 0px -70% 0px" });
        targets.forEach((el) => sectionObserver.observe(el));

        const endObserver = new IntersectionObserver(([entry]) => {
            atEnd = entry.isIntersecting;
            pick();
        });
        if (end) endObserver.observe(end);

        return () => {
            sectionObserver.disconnect();
            endObserver.disconnect();
        };
    }, [props.home]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    const current = section(active ?? "eth1");

    return (
        <header className="hdr">
            <div className="hdr-in">
                <div className="hdr-d">
                    <p className="hdr-brand">
                        {props.home ? (
                            <b>{identity.device}</b>
                        ) : (
                            <Link href="/" className="plain">
                                <b>{identity.device}</b>
                            </Link>
                        )}
                        &nbsp;&nbsp;|&nbsp;&nbsp;{identity.name}
                    </p>
                    <nav aria-label="Sections" className="panel">
                        {sections.map((s) => {
                            const on = s.id === active;
                            return (
                                <a
                                    key={s.id}
                                    className="port"
                                    href={`${prefix}#${s.id}`}
                                    aria-current={on ? "location" : undefined}
                                >
                                    <PortIcon console={s.id === "console"} />
                                    <span className="port-code">
                                        {on && <span className="led" aria-hidden="true" />}
                                        <span className="mono">{s.code}</span>
                                    </span>
                                    <span className="pname">{s.port}</span>
                                </a>
                            );
                        })}
                    </nav>
                </div>

                <div className="hdr-m">
                    <div className="hdr-m-bar">
                        <a href={props.home ? "#top" : "/"} className="hdr-m-brand plain">
                            {identity.device}
                        </a>
                        <button
                            type="button"
                            className="hdr-m-toggle"
                            aria-expanded={open}
                            aria-controls="m-nav"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <>
                                    <span className="t13">Close</span>
                                    <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                                        <path d="M1 5 L5 1 L9 5" />
                                    </svg>
                                </>
                            ) : (
                                <>
                                    {active && <span className="led" aria-hidden="true" />}
                                    <span className="mono t10">{current.code}</span>
                                    <span className="t13">{current.label}</span>
                                    <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                                        <path d="M1 1 L5 5 L9 1" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                    {open && (
                        <nav id="m-nav" aria-label="Sections">
                            {sections.map((s) => {
                                const on = s.id === active;
                                return (
                                    <a
                                        key={s.id}
                                        className="mrow"
                                        href={`${prefix}#${s.id}`}
                                        aria-current={on ? "location" : undefined}
                                        onClick={() => setOpen(false)}
                                    >
                                        <PortIcon console={s.id === "console"} compact />
                                        <span className="mrow-code mono">{s.code}</span>
                                        <span className={on ? "mrow-label on" : "mrow-label"}>{s.label}</span>
                                        {on && <span className="led led-m" aria-hidden="true" />}
                                    </a>
                                );
                            })}
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
}
