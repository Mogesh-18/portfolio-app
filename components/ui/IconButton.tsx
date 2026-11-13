import { cn } from "@/lib/utils";

/**
 * Round icon-only control (social links, copy, theme toggle).
 * md = 40px (header), lg = 44px (touch targets in content and the mobile menu).
 */
export function iconButtonVariants({ size = "lg", className }: { size?: "md" | "lg"; className?: string } = {}) {
    return cn(
        "grid shrink-0 place-items-center rounded-full border border-border bg-bg-card/70 backdrop-blur text-fg-2",
        "transition-[color,border-color,background-color,scale] duration-200 hover:border-accent hover:text-accent active:scale-95",
        size === "md" ? "h-10 w-10" : "h-11 w-11",
        className
    );
}
