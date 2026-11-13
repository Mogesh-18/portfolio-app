import { flushSync } from "react-dom";

type Theme = "light" | "dark";

/**
 * Switch theme with a circular View Transition reveal from `origin`
 * (defaults to the viewport centre). Falls back to an instant switch where
 * the API is unsupported or the user prefers reduced motion.
 */
export function switchTheme(next: Theme, setTheme: (t: string) => void, origin?: { x: number; y: number }) {
    const apply = () => {
        // Update the DOM synchronously so the transition snapshots the new theme
        const root = document.documentElement;
        root.classList.toggle("dark", next === "dark");
        root.style.colorScheme = next;
        setTheme(next);
    };

    if (
        typeof document.startViewTransition !== "function" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        apply();
        return;
    }

    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? innerHeight / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
        .then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
                { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
            );
        })
        .catch(() => { /* transition skipped — theme is already applied */ });
}
