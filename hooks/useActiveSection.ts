"use client";
import { useEffect, useState } from "react";

const SECTIONS = ["about", "experience", "projects", "skills", "education", "contact"];

export function useActiveSection() {
    const [active, setActive] = useState("");
    useEffect(() => {
        const obs: IntersectionObserver[] = [];
        SECTIONS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const o = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setActive(id); },
                { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
            );
            o.observe(el); obs.push(o);
        });
        return () => obs.forEach(o => o.disconnect());
    }, []);
    return active;
}
