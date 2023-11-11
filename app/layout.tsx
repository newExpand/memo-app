import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ExpandMemo",
    description: "간단하고 빠르게 메모하는 앱",
    icons: {
        icon: [
            {
                media: "(prefers-color-scheme: light)",
                url: "/logo.png",
                href: "/logo.png",
            },
            {
                media: "(prefers-color-scheme: dark)",
                url: "/logo-dark.png",
                href: "/logo-dark.png",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="memo-theme"
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
