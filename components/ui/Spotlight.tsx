"use client";
import { useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tracks the pointer over a group of `.spotlight` cards and writes the cursor
 * position (relative to each card) into --mx / --my, which drive the gradient
 * border + glow in globals.css. Neighbouring cards light up at their edges too.
 */
export function SpotlightGroup({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useCallback((el: HTMLDivElement | null) => {
        if (!el || !window.matchMedia("(pointer: fine)").matches) return;
        let raf = 0;

        const move = (e: PointerEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                for (const card of el.querySelectorAll<HTMLElement>(".spotlight")) {
                    const r = card.getBoundingClientRect();
                    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    card.style.setProperty("--my", `${e.clientY - r.top}px`);
                }
            });
        };

        el.addEventListener("pointermove", move);
        return () => {
            el.removeEventListener("pointermove", move);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div ref={ref} className={cn("spotlight-group", className)}>
            {children}
        </div>
    );
}
