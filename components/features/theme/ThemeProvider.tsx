"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * Light by default for every first-time visitor — the OS / browser colour-scheme
 * preference is deliberately ignored (`enableSystem={false}`). A visitor's own
 * choice from the theme toggle is remembered in localStorage ("theme").
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
}
