"use client";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { Sun, Moon } from "lucide-react";
import { iconButtonVariants } from "@/components/ui/IconButton";
import { useMounted } from "@/hooks/useMounted";
import { switchTheme } from "@/components/features/theme/theme-switch";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    // The theme is only known in the browser: render a placeholder until then
    const mounted = useMounted();

    if (!mounted) return <div aria-hidden className={iconButtonVariants({ size: "md", className })} />;

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
            className={iconButtonVariants({ size: "md", className: cn("bg-transparent backdrop-blur-none", className) })}
        >
            {isDark
                ? <Sun size={15} strokeWidth={2} aria-hidden />
                : <Moon size={14} strokeWidth={2} aria-hidden />}
        </button>
    );
}
