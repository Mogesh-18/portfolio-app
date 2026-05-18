"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config/nav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface Props { open: boolean; onClose: () => void; active: string; }

export function MobileNav({ open, onClose, active }: Props) {
    const firstLinkRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) setTimeout(() => firstLinkRef.current?.focus(), 250);
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    /* Close on Escape */
    useEffect(() => {
        const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", fn);
        return () => document.removeEventListener("keydown", fn);
    }, [onClose]);

    const go = (href: string) => {
        onClose();
        setTimeout(
            () => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }),
            280
        );
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                aria-hidden
                className={cn(
                    "fixed inset-0 z-40 transition-all duration-400",
                    "bg-fg/[0.08] backdrop-blur-md",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            />

            {/* Drawer */}
            <nav
                role="dialog"
                aria-modal
                aria-label="Mobile menu"
                className={cn(
                    "fixed top-0 right-0 z-50 h-full",
                    "w-[min(22rem,_92vw)]",
                    /* glass card surface */
                    "bg-bg-card/95 backdrop-blur-2xl",
                    "border-l border-border/50",
                    "flex flex-col",
                    "transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "translate-x-0 shadow-[−24px_0_80px_0_rgba(0,0,0,0.18)]" : "translate-x-full shadow-none"
                )}
            >
                {/* ── Header bar ── */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40">
                    {/* Wordmark replica */}
                    <span className="font-bold text-[15px] tracking-tight text-fg">
                        Mogesh<span className="text-accent">.</span>
                    </span>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className={cn(
                            "w-8 h-8 rounded-lg border border-border/60 flex items-center justify-center",
                            "text-fg-2 hover:text-fg hover:border-accent hover:bg-accent/5",
                            "transition-all duration-200 active:scale-90"
                        )}
                    >
                        {/* X icon drawn inline so no dependency */}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                            <line x1="1" y1="1" x2="13" y2="13" />
                            <line x1="13" y1="1" x2="1" y2="13" />
                        </svg>
                    </button>
                </div>

                {/* ── Nav links ── */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-4">
                    <ul className="flex flex-col gap-1">
                        {NAV_LINKS.map(({ label, href }, i) => {
                            const isActive = active === href.slice(1);
                            return (
                                <li key={href}>
                                    <button
                                        ref={i === 0 ? firstLinkRef : undefined}
                                        onClick={() => go(href)}
                                        className={cn(
                                            "group w-full text-left flex items-center gap-3.5 px-3 py-3.5 rounded-xl",
                                            "font-semibold text-[15px] tracking-tight",
                                            "transition-all duration-200 active:scale-[0.98]",
                                            isActive
                                                ? "bg-accent/10 text-accent"
                                                : "text-fg-2 hover:text-fg hover:bg-bg-2"
                                        )}
                                    >
                                        {/* Index pill */}
                                        <span className={cn(
                                            "w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center shrink-0 transition-colors duration-200",
                                            isActive
                                                ? "bg-accent text-white"
                                                : "bg-bg-3 text-fg-3 group-hover:bg-border group-hover:text-fg-2"
                                        )}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {label}

                                        {/* Active indicator arrow */}
                                        {isActive && (
                                            <svg
                                                className="ml-auto shrink-0 text-accent"
                                                width="16" height="16" viewBox="0 0 16 16"
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <polyline points="6 3 11 8 6 13" />
                                            </svg>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* ── CTA ── */}
                <div className="px-4 pb-3">
                    <a
                        href="#contact"
                        onClick={() => go("#contact")}
                        className={cn(
                            "flex items-center justify-center gap-2",
                            "w-full px-4 py-3.5 rounded-xl",
                            "bg-accent hover:bg-accent-2 text-white",
                            "font-bold text-[15px] tracking-tight",
                            "transition-all duration-200",
                            "shadow-[0_2px_16px_0_rgba(0,0,0,0.14)] hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.2)]",
                            "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                        )}
                    >
                        Hire Me
                        {/* Arrow icon */}
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 7.5h9M8 3l4.5 4.5L8 12" />
                        </svg>
                    </a>
                </div>

                {/* ── Footer strip ── */}
                <div className="px-5 pb-7 pt-3 border-t border-border/40 flex items-center justify-between gap-4">
                    <a
                        href="mailto:mogesh13@gmail.com"
                        className="text-[13px] font-medium text-fg-3 hover:text-accent transition-colors duration-200 truncate min-w-0"
                    >
                        mogesh13@gmail.com
                    </a>
                    <div className="shrink-0 flex items-center gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-fg-3">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>
        </>
    );
}