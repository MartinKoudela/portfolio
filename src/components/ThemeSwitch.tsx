"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { cx } from "@/lib/cx";
import { currentTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

const positions: { value: Theme; label: string; name: string }[] = [
    { value: "auto", label: "AUTO", name: "Auto, follow system setting" },
    { value: "light", label: "LIGHT", name: "Light" },
    { value: "dark", label: "DARK", name: "Dark" },
];

export default function ThemeSwitch({ compact = false }: { compact?: boolean }) {
    const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "auto" as Theme);
    const id = useId();
    const labelId = `${id}-label`;
    const [pointer, setPointer] = useState(false);

    return (
        <div className={cx("sw", compact && "sw--compact")}>
            <div
                role="radiogroup"
                aria-labelledby={labelId}
                className={cx("sw-group", pointer && "sw-group--pointer")}
                onPointerDown={() => setPointer(true)}
                onKeyDown={() => setPointer(false)}
            >
                {positions.map((p) => (
                    <label key={p.value} className={cx("sw-pos", theme === p.value && "on")}>
                        <input
                            type="radio"
                            name={`${id}-theme`}
                            value={p.value}
                            checked={theme === p.value}
                            onChange={() => setTheme(p.value)}
                            aria-label={p.name}
                            className="sr-only"
                        />
                        <span className="sw-seg" aria-hidden="true" />
                        <span className="sw-label mono" aria-hidden="true">
                            {p.label}
                        </span>
                    </label>
                ))}
            </div>
            <span id={labelId} className="sw-name">
                Theme
            </span>
        </div>
    );
}
