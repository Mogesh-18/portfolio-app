import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/config/nav";

/** Hero section id — while it is in view, no nav link is active. */
const HOME_ID = "home";

/**
 * Returns the id of the section currently in the middle of the viewport
 * ("" at the top, and on pages without these sections).
 */
export function useActiveSection() {
    const [active, setActive] = useState("");

    useEffect(() => {
        const ids = [HOME_ID, ...NAV_LINKS.map(l => l.id)];
        const els = ids
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (!els.length) return;

        const obs = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) setActive(e.target.id === HOME_ID ? "" : e.target.id);
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return active;
}
