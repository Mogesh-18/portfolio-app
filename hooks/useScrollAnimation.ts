"use client";
import { useEffect, useRef, useState } from "react";

interface Options {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
    const { threshold = 0.12, rootMargin = "0px 0px -48px 0px", once = true } = opts;
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setVisible(true); if (once) obs.unobserve(el); }
                else if (!once) setVisible(false);
            },
            { threshold, rootMargin }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold, rootMargin, once]);

    return { ref, visible };
}

export function stagger(i: number, base = 80) {
    return `${i * base}ms`;
}
