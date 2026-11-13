import { useEffect } from "react";

/** Lock page scrolling while `locked` (on <html>, the page's actual scroller). */
export function useScrollLock(locked: boolean) {
    useEffect(() => {
        if (!locked) return;
        const root = document.documentElement;
        root.style.overflow = "hidden";
        return () => { root.style.overflow = ""; };
    }, [locked]);
}

/** Release the lock immediately, e.g. right before following an in-page anchor. */
export function releaseScrollLock() {
    document.documentElement.style.overflow = "";
}
