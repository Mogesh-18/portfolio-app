import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/config/nav";

/** Hero section id — while it is in view, no nav link is active. */
const HOME_ID = "home";

/**
 * Returns the id of the section currently in the middle of the viewport
 * ("" at the top, and on pages without these sections).
 * Re-attaches on every route change.
 */
export function useActiveSection() {
    const pathname = usePathname();
    // Tagged with the route it was measured on, so a stale id from the previous
    // page never shows while the new page's observer attaches.
    const [state, setState] = useState({ path: pathname, id: "" });

    useEffect(() => {
        const ids = [HOME_ID, ...NAV_LINKS.map(l => l.id)];
        const els = ids
            .map(id => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (!els.length) return;

        const obs = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) setState({ path: pathname, id: e.target.id === HOME_ID ? "" : e.target.id });
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [pathname]);

    return state.path === pathname ? state.id : "";
}
