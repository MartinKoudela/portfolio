import type { Metadata, Viewport} from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Martin Koudela | Full-stack Developer",
    description: "Junior Full-stack developer focused on modern software solutions.",

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
        title: "Martin Koudela | Full-stack Developer",
        description: "Junior Full-stack developer focused on modern software solutions.",
        url: "https://martinkoudela.com",
        siteName: "Martin Koudela",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                alt: "Martin Koudela – Full-stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Martin Koudela | Full-stack Developer",
        description: "Junior Full-stack developer focused on modern software solutions.",
        images: ["/og-image.png"],
    },


    keywords: [
        "Martin Koudela",
        "Full-stack developer",
        "Web developer",
        "Laravel developer",
        "Next.js developer",
        "Software engineer",
        "Coder",

    ],

    authors: [{ name: "Martin Koudela", url: "https://martinkoudela.com" }],
    creator: "Martin Koudela",
    publisher: "Martin Koudela",

    alternates: {
        canonical: "https://martinkoudela.com",
    },

};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#050505",
};

const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Martin Koudela",
    url: "https://martinkoudela.com",
    jobTitle: "Full-stack Developer",
    description: "Junior Full-stack developer focused on modern software solutions.",
    image: "https://martinkoudela.com/og-image.png",
    sameAs: [
        "https://www.linkedin.com/in/martin-koudela-a5b645343/",
        "https://github.com/martinkoudela",
        "https://www.instagram.com/koudy_martin/",
    ],
};


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(personStructuredData),
            }}
        />
        {children}

        {/* Vercel analytics */}
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    );
}
