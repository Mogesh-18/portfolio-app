import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    /** Section number, e.g. 2 → "02" */
    index: number;
    /** Short eyebrow label, e.g. "Experience" */
    label: string;
    /** Heading (h2) — use <Accent> for the highlighted phrase */
    title?: ReactNode;
    /** Short supporting line shown beside (desktop) or under (mobile) the heading */
    description?: ReactNode;
    /** Optional small meta line (e.g. "4 of 4 currently live") */
    meta?: ReactNode;
    /** id for the h2 so the section can be aria-labelledby it */
    titleId?: string;
    className?: string;
}

/** Shared section header: pill eyebrow + large h2 + supporting copy on the right. */
export function SectionHeader({ index, label, title, description, meta, titleId, className }: SectionHeaderProps) {
    return (
        <Reveal as="header" className={cn("mb-10 lg:mb-14", className)}>
            <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-card/70 py-1 pl-1 pr-3.5 backdrop-blur">
                <span className="rounded-full bg-[image:var(--grad-solid)] px-2 py-0.5 font-mono text-[11px] font-medium text-white">
                    {String(index).padStart(2, "0")}
                </span>
                <span className="t-label text-fg-2">{label}</span>
            </p>

            {(title || description || meta) && (
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-16">
                    {title && (
                        <h2 id={titleId} className="t-h1 text-fg text-balance max-w-3xl">
                            {title}
                        </h2>
                    )}
                    {(description || meta) && (
                        <div className="lg:pb-2">
                            {description && (
                                <p className="text-[15px] leading-relaxed text-fg-2 lg:border-l lg:border-border lg:pl-6">
                                    {description}
                                </p>
                            )}
                            {meta && <p className="t-label mt-3 text-fg-3 lg:pl-6">{meta}</p>}
                        </div>
                    )}
                </div>
            )}
        </Reveal>
    );
}
