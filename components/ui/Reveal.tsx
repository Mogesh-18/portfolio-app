"use client";
import { useCallback, type CSSProperties, type ReactNode } from "react";
import { cn, delay as delayStyle } from "@/lib/utils";

/*
 * One IntersectionObserver shared by every <Reveal> on the page.
 * When an element scrolls into view it gets `data-shown`, which triggers the
 * `.reveal` animation in globals.css, and is then unobserved (reveal once).
 * Writing a data attribute (not React state) means no re-render per element.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
    observer ??= new IntersectionObserver(
        entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                entry.target.setAttribute("data-shown", "");
                observer?.unobserve(entry.target);
            }
        },
        // Fire once the element's top passes ~92% of the viewport height
        { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    return observer;
}

type RevealTag = "div" | "article" | "li" | "ul" | "header" | "aside";

interface RevealProps {
    as?: RevealTag;
    /** Stagger delay in ms */
    delay?: number;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

export function Reveal({ as: Tag = "div", delay = 0, className, style, children }: RevealProps) {
    /* React 19 callback ref with cleanup: observe on mount, unobserve on unmount */
    const observe = useCallback((el: HTMLElement | null) => {
        if (!el) return;
        const obs = getObserver();
        obs.observe(el);
        return () => obs.unobserve(el);
    }, []);

    return (
        <Tag
            ref={observe}
            className={cn("reveal", className)}
            style={delay ? { ...delayStyle(delay), ...style } : style}
        >
            {children}
        </Tag>
    );
}
