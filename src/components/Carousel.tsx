"use client";

import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
    images,
    alt = "",
    priority = false,
}: {
    images: string[];
    alt?: string;
    priority?: boolean;
}) {
    const [current, setCurrent] = useState(0);
    const dragStartX = useRef<number | null>(null);

    const total = images.length;

    const go = useCallback(
        (delta: number) => setCurrent((prev) => (prev + delta + total) % total),
        [total]
    );

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
        }
    }

    function handlePointerDown(e: React.PointerEvent) {
        dragStartX.current = e.clientX;
    }

    function handlePointerUp(e: React.PointerEvent) {
        if (dragStartX.current === null) return;
        const delta = e.clientX - dragStartX.current;
        dragStartX.current = null;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    }

    if (total === 0) return null;

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={alt || "Project gallery"}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5B7CFA]/50 rounded-2xl"
        >
            <div
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => (dragStartX.current = null)}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] touch-pan-y"
            >
                <div
                    style={{ transform: `translateX(-${current * 100}%)` }}
                    className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                    {images.map((src, i) => (
                        <div key={src} className="relative h-full w-full shrink-0">
                            <Image
                                src={src}
                                alt={total > 1 ? `${alt} — image ${i + 1} of ${total}` : alt}
                                fill
                                draggable={false}
                                priority={priority && i === 0}
                                sizes="(max-width: 768px) 100vw, 1024px"
                                className="pointer-events-none object-cover"
                            />
                        </div>
                    ))}
                </div>

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={() => go(-1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-[#0D0D0C]/70 text-[#E8E8E2] backdrop-blur-md transition-all hover:border-white/30 hover:bg-[#0D0D0C]/90 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={() => go(1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-[#0D0D0C]/70 text-[#E8E8E2] backdrop-blur-md transition-all hover:border-white/30 hover:bg-[#0D0D0C]/90 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <ChevronRight size={18} />
                        </button>

                        <p
                            className="absolute right-4 top-4 rounded-full border border-white/[0.08] bg-[#0D0D0C]/70 px-3 py-1 text-[10px] tracking-[0.2em] text-[#6B6B65] uppercase backdrop-blur-md"
                            translate="no"
                        >
                            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </p>
                    </>
                )}
            </div>

            {total > 1 && (
                <div className="mt-5 flex justify-center gap-2">
                    {images.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            aria-label={`Go to image ${i + 1}`}
                            aria-current={i === current}
                            onClick={() => setCurrent(i)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                                i === current
                                    ? "w-10 bg-[#5B7CFA]"
                                    : "w-5 bg-white/10 hover:bg-white/25"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}