"use client";
import { useCallback, type MouseEvent } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER = 480;

/**
 * Floating "back to top" button with a ring that fills as you scroll.
 * Scroll position is written to CSS (--p, data-show) directly — no re-renders.
 */
export function ScrollTop() {
    const ref = useCallback((btn: HTMLButtonElement | null) => {
        if (!btn) return;
        let raf = 0;

        const update = () => {
            raf = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            const show = window.scrollY > SHOW_AFTER;
            btn.style.setProperty("--p", p.toFixed(4));
            btn.dataset.show = String(show);
            btn.tabIndex = show ? 0 : -1;
            btn.setAttribute("aria-hidden", String(!show));
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    const toTop = (e: MouseEvent<HTMLButtonElement>) => {
        window.scrollTo({ top: 0 }); // smooth via CSS scroll-behavior (instant with reduced motion)
        // Keyboard users: move focus to the top of the page, since this button is about to hide
        if (e.detail === 0) document.querySelector<HTMLElement>('header a[href="/"]')?.focus({ preventScroll: true });
    };

    return (
        <button
            ref={ref}
            type="button"
            onClick={toTop}
            aria-label="Scroll to top"
            data-print="hide"
            tabIndex={-1}
            className={
                "group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 grid h-12 w-12 place-items-center rounded-full " +
                "border border-border bg-bg-card/80 text-fg backdrop-blur-xl " +
                "shadow-[0_10px_30px_-10px_oklch(0_0_0/0.45)] " +
                "opacity-0 translate-y-4 scale-90 pointer-events-none " +
                "transition-[opacity,translate,scale,border-color,color] duration-500 ease-expo " +
                "data-[show=true]:opacity-100 data-[show=true]:translate-y-0 data-[show=true]:scale-100 data-[show=true]:pointer-events-auto " +
                "hover:border-accent/50 hover:text-accent active:scale-95"
            }
        >
            {/* Progress ring */}
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
                <circle cx="24" cy="24" r="22.5" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                <circle
                    cx="24" cy="24" r="22.5" fill="none"
                    stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
                    pathLength={100} strokeDasharray="100"
                    style={{ strokeDashoffset: "calc(100 - var(--p, 0) * 100)" }}
                />
            </svg>
            <ArrowUp size={17} strokeWidth={2} aria-hidden className="relative transition-transform duration-300 ease-expo group-hover:-translate-y-0.5" />
        </button>
    );
}
