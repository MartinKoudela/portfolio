import { siteMeta } from "@/content/site";

export type Theme = "auto" | "light" | "dark";

export const THEME_KEY = "mk-theme";

const colors = siteMeta.themeColor;

export const themeScript = `(function(){var c=${JSON.stringify(colors)};var t=null;try{t=localStorage.getItem(${JSON.stringify(
    THEME_KEY
)})}catch(e){}if(t!=="light"&&t!=="dark")return;document.documentElement.setAttribute("data-theme",t);function m(){var n=document.querySelectorAll('meta[name="theme-color"]');for(var i=0;i<n.length;i++)n[i].setAttribute("content",c[t])}m();document.addEventListener("DOMContentLoaded",m)})();`;

const listeners = new Set<() => void>();

function syncThemeColor(theme: Theme) {
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
        const forDark = (meta.getAttribute("media") ?? "").includes("dark");
        meta.content = theme === "auto" ? (forDark ? colors.dark : colors.light) : colors[theme];
    });
}

function apply(theme: Theme) {
    if (theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    syncThemeColor(theme);
}

function stored(): Theme {
    try {
        const value = localStorage.getItem(THEME_KEY);
        return value === "light" || value === "dark" ? value : "auto";
    } catch {
        return "auto";
    }
}

export function subscribeTheme(callback: () => void) {
    const onStorage = (e: StorageEvent) => {
        if (e.key !== THEME_KEY) return;
        apply(stored());
        callback();
    };
    listeners.add(callback);
    window.addEventListener("storage", onStorage);
    return () => {
        listeners.delete(callback);
        window.removeEventListener("storage", onStorage);
    };
}

export function currentTheme(): Theme {
    const value = document.documentElement.getAttribute("data-theme");
    return value === "light" || value === "dark" ? value : "auto";
}

function persist(theme: Theme): boolean {
    try {
        if (theme === "auto") localStorage.removeItem(THEME_KEY);
        else localStorage.setItem(THEME_KEY, theme);
        return true;
    } catch {
        return false;
    }
}

export function setTheme(theme: Theme) {
    persist(theme);
    apply(theme);
    listeners.forEach((listener) => listener());
}
