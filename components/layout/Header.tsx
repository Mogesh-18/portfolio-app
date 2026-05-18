"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config/nav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const active = useActiveSection();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-30 transition-all duration-500",
                    scrolled
                        ? "bg-bg/90 backdrop-blur-2xl border-b border-border/60 py-3 shadow-[0_1px_24px_0_rgba(0,0,0,0.06)]"
                        : "bg-transparent py-5 sm:py-6"
                )}
            >
                <div className="wrap flex items-center justify-between gap-4">

                    {/* Wordmark */}
                    <a
                        href="#"
                        onClick={e => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group font-sans font-bold text-[15px] tracking-tight text-fg hover:text-accent transition-colors duration-200 shrink-0"
                    >
                        Mogesh
                        <span className="text-accent transition-transform duration-200 inline-block group-hover:rotate-12">.</span>
                    </a>

                    {/* Desktop nav — only shown md+ */}
                    <nav className="hidden md:flex items-center gap-7 lg:gap-9 min-w-0" aria-label="Primary">
                        {NAV_LINKS.map(({ label, href }) => {
                            const isActive = active === href.slice(1);
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={e => go(e, href)}
                                    className={cn(
                                        "relative t-label transition-colors duration-200 whitespace-nowrap py-1",
                                        "after:absolute after:bottom-0 after:left-0 after:h-px after:rounded-full after:transition-all after:duration-300",
                                        isActive
                                            ? "text-accent after:w-full after:bg-accent"
                                            : "text-fg-2 hover:text-fg after:w-0 after:bg-accent hover:after:w-full"
                                    )}
                                >
                                    {label}
                                </a>
                            );
                        })}
                        <div className="w-px h-4 bg-border shrink-0" />
                        <ThemeToggle />
                        <a
                            href="#contact"
                            onClick={e => go(e, "#contact")}
                            className="t-label px-5 py-2 bg-accent hover:bg-accent-2 text-white rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 shadow-[0_2px_12px_0_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_0_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Hire Me
                        </a>
                    </nav>

                    {/* Mobile controls */}
                    <div className="md:hidden flex items-center gap-2 shrink-0">
                        <ThemeToggle />
                        <button
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            className={cn(
                                "relative w-9 h-9 rounded-xl border flex flex-col items-center justify-center gap-[5px]",
                                "transition-all duration-200",
                                "hover:border-accent hover:bg-accent/5 active:scale-95",
                                open ? "border-accent bg-accent/5" : "border-border"
                            )}
                        >
                            <span className="w-[17px] h-[1.5px] bg-fg rounded-full block transition-all duration-300" />
                            <span className="w-[11px] h-[1.5px] bg-fg-2 rounded-full block self-end mr-[4px] transition-all duration-300" />
                        </button>
                    </div>
                </div>
            </header>

            <MobileNav open={open} onClose={() => setOpen(false)} active={active} />
        </>
    );
}