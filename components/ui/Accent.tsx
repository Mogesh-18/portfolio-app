import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The accent phrase in a heading: Instrument Serif italic in the brand gradient.
 * Large display text only (gradient stops are ≥3:1 for large text).
 */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                "font-serif italic font-normal tracking-[-0.01em] text-[1.08em] leading-none",
                "bg-grad-brand bg-clip-text text-transparent",
                // room for the italic overhang so the last glyph isn't clipped by bg-clip
                "pr-[0.06em] [box-decoration-break:clone]",
                "print:bg-none print:text-fg",
                className
            )}
        >
            {children}
        </span>
    );
}
