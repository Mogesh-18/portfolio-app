"use client";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

/** "Download CV" link that records an analytics event. */
export function CvLink({ href, source, className, children }: {
    href: string;
    source: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <a href={href} download onClick={() => track("download_cv", { source })} className={className}>
            {children}
        </a>
    );
}
