"use client";
import { useCallback } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts a value like "40%", "4+" or "6" up from 0 once it scrolls into view.
 * The final value is server-rendered (correct without JS and for screen readers);
 * the animated digits are a visual-only layer written straight to the DOM.
 */
export function CountUp({ value, duration = 1200 }: { value: string; duration?: number }) {
    const ref = useCallback(
        (el: HTMLSpanElement | null) => {
            const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
            if (!el || !match || reducedMotion()) return;
            const [, prefix = "", num = "0", suffix = ""] = match;
            const target = Number(num);
            const decimals = num.includes(".") ? num.split(".")[1]?.length ?? 0 : 0;
            let raf = 0;

            const render = (n: number) => { el.textContent = `${prefix}${n.toFixed(decimals)}${suffix}`; };
            render(0);

            const obs = new IntersectionObserver(([entry]) => {
                if (!entry?.isIntersecting) return;
                obs.disconnect();
                const start = performance.now();
                const tick = (now: number) => {
                    const t = Math.min(1, (now - start) / duration);
                    render(target * (1 - Math.pow(1 - t, 3))); // ease-out cubic
                    if (t < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            }, { threshold: 0.6 });
            obs.observe(el);

            return () => { obs.disconnect(); cancelAnimationFrame(raf); render(target); };
        },
        [value, duration]
    );

    return (
        <>
            <span ref={ref} aria-hidden className="tabular-nums">{value}</span>
            <span className="sr-only">{value}</span>
        </>
    );
}
