"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { switchTheme } from "@/lib/theme-switch";

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration guard
    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <div aria-hidden className={cn("w-10 h-10 rounded-full border border-border", className)} />
    );

    const isDark = resolvedTheme === "dark";

    const toggle = (e: MouseEvent<HTMLButtonElement>) => {
        // Keyboard activation has no pointer position — reveal from the button centre
        const rect = e.currentTarget.getBoundingClientRect();
        const origin = e.detail === 0
            ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
            : { x: e.clientX, y: e.clientY };
        switchTheme(isDark ? "light" : "dark", setTheme, origin);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className={cn(
                "relative w-10 h-10 rounded-full border border-border",
                "flex items-center justify-center overflow-hidden",
                "text-fg-2 hover:text-accent hover:border-accent",
                "transition-colors duration-200 active:scale-90",
                className
            )}
        >
            {isDark
                ? <Sun size={15} strokeWidth={2} aria-hidden />
                : <Moon size={14} strokeWidth={2} aria-hidden />}
        </button>
    );
}
