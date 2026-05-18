"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <div className={cn("w-9 h-9 rounded-full border border-border", className)} />
    );

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={cn(
                "relative w-9 h-9 rounded-full border border-border",
                "flex items-center justify-center overflow-hidden",
                "text-fg-2 hover:text-accent hover:border-accent",
                "transition-all duration-300 active:scale-90",
                className
            )}
        >
            {/* Sun — visible in dark mode */}
            <span
                className={cn(
                    "absolute transition-all duration-300",
                    isDark
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-50"
                )}
            >
                <Sun size={15} strokeWidth={2} />
            </span>

            {/* Moon — visible in light mode */}
            <span
                className={cn(
                    "absolute transition-all duration-300",
                    isDark
                        ? "opacity-0 rotate-90 scale-50"
                        : "opacity-100 rotate-0 scale-100"
                )}
            >
                <Moon size={14} strokeWidth={2} />
            </span>
        </button>
    );
}