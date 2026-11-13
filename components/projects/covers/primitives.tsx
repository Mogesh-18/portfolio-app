import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Illustrated covers, one per project, drawn with plain elements so they stay
 * crisp, theme-aware and tinted by the project's --tone / --tone-2 colours.
 * Labels are generic UI words and bars are placeholders — no invented data.
 */

export type CoverProps = { large: boolean };

/* ── Shared primitives ─────────────────────────────────────────────── */

export function Window({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
    return (
        <div className={cn(
            "absolute flex flex-col overflow-hidden rounded-lg border border-border bg-bg-card/95 backdrop-blur",
            "shadow-[0_24px_48px_-20px_oklch(0_0_0/0.45)] transition-transform duration-700 ease-expo group-hover:-translate-y-1.5",
            className
        )}>
            <div className="flex items-center gap-1.5 border-b border-border bg-bg-2/80 px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-v-pink/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-v-amber/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-v-emerald/70" />
                <span className="ml-1.5 truncate font-mono text-[9px] text-fg-3">{title}</span>
            </div>
            <div className="@container relative min-h-0 flex-1">{children}</div>
        </div>
    );
}

/** Floating widget card that lifts a little more than the window on hover */
export function Float({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={cn(
            "absolute rounded-lg border border-border bg-bg-card p-2 shadow-[0_18px_40px_-16px_oklch(0_0_0/0.5)]",
            "transition-transform duration-700 ease-expo group-hover:-translate-y-3",
            className
        )}>
            {children}
        </div>
    );
}

export const Bar = ({ className }: { className?: string }) => <span className={cn("block h-1.5 rounded-full bg-fg-3/25", className)} />;
export const Label = ({ children, className }: { children: ReactNode; className?: string }) =>
    <span className={cn("block font-mono text-[9px] leading-none text-fg-3", className)}>{children}</span>;
