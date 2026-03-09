import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Event Management Dashboard",
        template: "%s | Event Management Dashboard",
    },
    description:
        "Manage events, schedules, and statuses from a responsive dashboard built for event operations teams.",
    keywords: [
        "event management",
        "events dashboard",
        "schedule management",
        "react dashboard",
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Event Management Dashboard",
        description:
            "Centralize event planning and operations with a modern dashboard experience.",
        url: "/",
        siteName: "Event Management Dashboard",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Event Management Dashboard",
        description:
            "Centralize event planning and operations with a modern dashboard experience.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
