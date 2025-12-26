import type { Metadata } from "next";
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
        description: "Junior Full-stack developer focused on modern web experiences.",
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

    viewport: {
        width: "device-width",
        initialScale: 1,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Vercel analytics */}
        <Analytics />
        <SpeedInsights />
        </body>
        </html>
    );
}
