"use client";
import { useCallback, type ReactNode } from "react";

/**
 * Pulls its child slightly towards the cursor. Only on precise pointers
 * (mouse/trackpad) and only when the user hasn't asked for reduced motion.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
    const ref = useCallback(
        (el: HTMLSpanElement | null) => {
            if (!el) return;
            const ok = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
            if (!ok.matches) return;

            const move = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - (r.left + r.width / 2)) * strength;
                const y = (e.clientY - (r.top + r.height / 2)) * strength;
                el.style.transform = `translate(${x}px, ${y}px)`;
            };
            const leave = () => { el.style.transform = ""; };

            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            return () => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", leave);
            };
        },
        [strength]
    );

    return (
        <span ref={ref} className="inline-block transition-transform duration-300 ease-expo will-change-transform">
            {children}
        </span>
    );
}
