import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { identity, siteMeta } from "@/content/site";
import { themeScript } from "@/lib/theme";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const archivoLatin = localFont({
    src: [{ path: "../fonts/archivo-latin.woff2", weight: "100 900", style: "normal" }],
    variable: "--font-archivo-latin",
    display: "swap",
    adjustFontFallback: false,
    declarations: [
        { prop: "font-stretch", value: "62% 125%" },
        {
            prop: "unicode-range",
            value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
        },
    ],
});

const archivoLatinExt = localFont({
    src: [{ path: "../fonts/archivo-latin-ext.woff2", weight: "100 900", style: "normal" }],
    variable: "--font-archivo-latin-ext",
    display: "swap",
    declarations: [
        { prop: "font-stretch", value: "62% 125%" },
        {
            prop: "unicode-range",
            value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
        },
    ],
});

const plexMonoLatin = localFont({
    src: [
        { path: "../fonts/plex-mono-400-latin.woff2", weight: "400", style: "normal" },
        { path: "../fonts/plex-mono-500-latin.woff2", weight: "500", style: "normal" },
    ],
    variable: "--font-plex-mono-latin",
    display: "swap",
    adjustFontFallback: false,
    declarations: [
        {
            prop: "unicode-range",
            value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
        },
    ],
});

const plexMonoLatinExt = localFont({
    src: [
        { path: "../fonts/plex-mono-400-latin-ext.woff2", weight: "400", style: "normal" },
        { path: "../fonts/plex-mono-500-latin-ext.woff2", weight: "500", style: "normal" },
    ],
    variable: "--font-plex-mono-latin-ext",
    display: "swap",
    declarations: [
        {
            prop: "unicode-range",
            value: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
        },
    ],
});

const textSymbols = localFont({
    src: "../fonts/text-symbols.woff",
    variable: "--font-text-symbols",
    display: "swap",
    adjustFontFallback: false,
    declarations: [{ prop: "unicode-range", value: "U+2190, U+2192, U+2126, U+03A9" }],
});

const monoSymbols = localFont({
    src: "../fonts/mono-symbols.woff",
    variable: "--font-mono-symbols",
    display: "swap",
    adjustFontFallback: false,
    declarations: [{ prop: "unicode-range", value: "U+2190, U+2192, U+2126, U+03A9" }],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteMeta.url),

    title: {
        default: siteMeta.title,
        template: "%s | Martin Koudela",
    },
    description: siteMeta.description,

    robots: {
        index: true,
        follow: true,
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
    },

    manifest: "/site.webmanifest",

    openGraph: {
        title: siteMeta.shareTitle,
        description: siteMeta.description,
        locale: "en_US",
        url: siteMeta.url,
        siteName: "Martin Koudela",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteMeta.shareTitle,
        description: siteMeta.description,
    },

    keywords: siteMeta.keywords,

    authors: [{ name: identity.name, url: siteMeta.url }],
    creator: identity.name,
    publisher: identity.name,

    alternates: {
        canonical: siteMeta.url,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: siteMeta.themeColor.light },
        { media: "(prefers-color-scheme: dark)", color: siteMeta.themeColor.dark },
    ],
};

const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    url: siteMeta.url,
    email: identity.email,
    jobTitle: siteMeta.jobTitle,
    worksFor: { "@type": "Organization", name: siteMeta.worksFor },
    knowsAbout: siteMeta.knowsAbout,
    description: siteMeta.description,
    image: `${siteMeta.url}/opengraph-image`,
    sameAs: [
        "https://www.linkedin.com/in/martin-koudela-a5b645343/",
        "https://github.com/martinkoudela",
        "https://www.instagram.com/koudy_martin/",
    ],
};

const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteMeta.url,
    name: siteMeta.shareTitle,
    alternateName: identity.name,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${archivoLatin.variable} ${archivoLatinExt.variable} ${plexMonoLatin.variable} ${plexMonoLatinExt.variable} ${textSymbols.variable} ${monoSymbols.variable}`} suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteStructuredData),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personStructuredData),
                }}
            />
        </head>
        <body>

        {children}

        {/* Vercel analytics */}
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    );
}
