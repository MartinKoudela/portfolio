import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martin Koudela | full-stack developer",
  description: "Junior Full-stack developer focused on modern web experiences.",
    icons: {
        icon: "/favicon.png", // This points to public/favicon.png
    },
};

/**
 * Root Layout Component
 * 
 * This component wraps all pages in the application. It defines:
 * - HTML structure and metadata (title, description, icons)
 * - Global font variables (Geist Sans and Geist Mono)
 * - Common body styling (antialiasing)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
