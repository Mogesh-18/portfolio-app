import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "Mogesh Umapathi — Full Stack Developer & Technical Lead",
    description: "Senior Full Stack Developer with 4 years building production ERP, CRM, and SaaS applications in Laravel, React JS, MySQL, and REST APIs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
