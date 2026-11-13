import { cn } from "@/lib/utils";

/** Pulsing green "live / available" dot. Decorative; the pulse stops under reduced motion. */
export function LiveDot({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
    const box = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
    return (
        <span aria-hidden className={cn("relative flex shrink-0", box, className)}>
            <span className="absolute inline-flex h-full w-full rounded-full bg-v-emerald opacity-75 motion-safe:animate-ping" />
            <span className={cn("relative inline-flex rounded-full bg-v-emerald", box)} />
        </span>
    );
}
