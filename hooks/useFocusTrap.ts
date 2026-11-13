import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`: Tab / Shift+Tab cycle inside `container`, and Escape calls `onEscape`.
 * Optionally moves focus to `initialFocus` after `focusDelay` ms (to let an entrance
 * animation start first).
 */
export function useFocusTrap(
    container: RefObject<HTMLElement | null>,
    active: boolean,
    { onEscape, initialFocus, focusDelay = 0 }: {
        onEscape?: () => void;
        initialFocus?: RefObject<HTMLElement | null>;
        focusDelay?: number;
    } = {}
) {
    useEffect(() => {
        if (!active) return;
        const t = initialFocus ? setTimeout(() => initialFocus.current?.focus(), focusDelay) : undefined;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && onEscape) {
                e.preventDefault();
                onEscape();
                return;
            }
            const root = container.current;
            if (e.key !== "Tab" || !root) return;
            const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
            const first = items[0];
            const last = items.at(-1);
            if (!first || !last) return;
            const current = document.activeElement;
            if (e.shiftKey && (current === first || !root.contains(current))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && current === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => {
            clearTimeout(t);
            document.removeEventListener("keydown", onKey);
        };
    }, [active, container, onEscape, initialFocus, focusDelay]);
}
