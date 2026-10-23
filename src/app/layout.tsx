import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { identity, siteMeta } from "@/content/site";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
    variable: "--font-archivo",
    subsets: ["latin", "latin-ext"],
    axes: ["wdth"],
    display: "swap",
});

const plexMono = IBM_Plex_Mono({
    variable: "--font-plex-mono",
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500"],
    display: "swap",
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
        images: [
            {
                url: "/og-image.png",
                alt: siteMeta.imageAlt,
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteMeta.shareTitle,
        description: siteMeta.description,
        images: ["/og-image.png"],
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
    image: `${siteMeta.url}/og-image.png`,
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
        <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
        <head>
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
