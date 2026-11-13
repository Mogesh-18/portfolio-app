import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/features/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/features/command-palette/CommandPalette";
import { ScrollTop } from "@/components/ui/ScrollTop";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { contact } from "@/data/resume";
import { siteUrl, siteTitle, siteDescription } from "@/config/site";
import { clientData } from "@/data/client";
import "@/app/globals.css";

const sans = Geist({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist-sans",
});

const mono = Geist_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist-mono",
});

/* Display serif for the italic accent phrase in headings */
const serif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-instrument",
});

/* Rebuild every static route daily so computed values (years, tenure, © year)
   stay current. Set on the root layout so all pages inherit it. */
export const revalidate = 86400;

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: `%s · ${contact.name}`,
    },
    description: siteDescription,
    applicationName: contact.name,
    authors: [{ name: contact.name, url: siteUrl }],
    creator: contact.name,
    keywords: [
        contact.title, contact.secondaryTitle, "Laravel Developer", "React JS Developer",
        "PHP", "MySQL", "REST API", "ERP", "CRM", "SaaS", contact.name, "India",
    ],
    alternates: { canonical: "/" },
    openGraph: {
        type: "profile",
        url: "/",
        siteName: contact.name,
        title: siteTitle,
        description: siteDescription,
        locale: "en_IN",
        firstName: contact.firstName,
        lastName: contact.lastName,
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    robots: { index: true, follow: true },
};

/* The site opens in light mode regardless of the OS preference, so the
   browser UI colour matches the light theme. */
export const viewport: Viewport = {
    themeColor: "#FFFFFF",
    colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
            <head>
                {/* Marks JS as available before first paint so scroll-reveal
                    content is only hidden when it can actually be revealed. */}
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
            </head>
            <body>
                <ThemeProvider>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-accent-solid focus:text-white focus:font-semibold focus:text-sm"
                    >
                        Skip to content
                    </a>
                    <Header data={clientData} />
                    {children}
                    <Footer />
                    <ScrollTop />
                    <CommandPalette data={clientData} />
                </ThemeProvider>
                {/* Vercel Web Analytics + Speed Insights (enable both in the Vercel dashboard) */}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
