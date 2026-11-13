"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Download, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config/nav";
import { contact, projects } from "@/data/resume";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { CvLink } from "@/components/ui/CvLink";
import { LocalTime } from "@/components/ui/LocalTime";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { openCommandPalette } from "@/components/ui/CommandPalette";

interface Props {
    open: boolean;
    /** restoreFocus=false when a link was followed */
    onClose: (restoreFocus?: boolean) => void;
    active: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Stagger index for the `.menu-item` entrance (globals.css) */
const stagger = (i: number) => ({ "--i": i } as CSSProperties);

/**
 * Full-screen mobile menu. Opens with a circular reveal from the menu button,
 * then the links rise in one after another. Accessible modal dialog:
 * focus moves in and is trapped, Escape closes, page scroll is locked,
 * and the panel is inert + hidden while closed.
 */
export function MobileNav({ open, onClose, active }: Props) {
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    /* Lock page scroll (on <html>, the actual scroller) + move focus into the menu */
    useEffect(() => {
        if (!open) return;
        const root = document.documentElement;
        root.style.overflow = "hidden";
        const t = setTimeout(() => closeRef.current?.focus(), 150);
        return () => {
            clearTimeout(t);
            root.style.overflow = "";
        };
    }, [open]);

    /* Escape closes, Tab is trapped inside the menu */
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
            }
            if (e.key !== "Tab" || !panelRef.current) return;
            const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
            const first = items[0];
            const last = items.at(-1);
            if (!first || !last) return;
            const current = document.activeElement;
            if (e.shiftKey && (current === first || !panelRef.current.contains(current))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && current === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    /* Following a link: unlock scrolling first so the anchor jump can happen */
    const follow = () => {
        document.documentElement.style.overflow = "";
        onClose(false);
    };

    const search = () => {
        follow();
        requestAnimationFrame(openCommandPalette);
    };

    const afterLinks = NAV_LINKS.length; // stagger index for the blocks after the links

    return (
        <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            inert={!open}
            data-open={open}
            data-print="hide"
            className="menu-panel lg:hidden fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-bg"
        >
            {/* Backdrop texture */}
            <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60" />
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-v-violet/25 blur-[100px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-72 w-72 rounded-full bg-v-pink/15 blur-[100px]" />

            {/* Top bar — mirrors the header so the button appears to morph in place */}
            <div className="wrap relative pt-3">
                <div className="flex items-center justify-between rounded-full border border-border bg-bg-card/60 py-2 pl-5 pr-2 backdrop-blur">
                    <Link href="/" onClick={follow} className="font-semibold text-[15px] tracking-tight text-fg">
                        Mogesh<span className="text-accent">.</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={() => onClose()}
                            aria-label="Close menu"
                            className="grid h-10 w-10 place-items-center rounded-full border border-accent bg-accent/10 text-fg transition-transform duration-300 active:scale-90"
                        >
                            <X
                                size={18}
                                strokeWidth={2}
                                aria-hidden
                                className={cn("transition-transform duration-500 ease-expo", open ? "rotate-0 scale-100" : "-rotate-90 scale-50")}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="wrap relative flex flex-1 flex-col pt-8 pb-8">
                {/* Primary links */}
                <nav aria-label="Mobile">
                    <ul>
                        {NAV_LINKS.map(({ label, id, href }, n) => {
                            const isActive = active === id;
                            return (
                                <li key={id} className="menu-item" style={stagger(n)}>
                                    <Link
                                        href={href}
                                        onClick={follow}
                                        aria-current={isActive ? "location" : undefined}
                                        className="group flex items-center gap-4 border-b border-border py-3.5"
                                    >
                                        <span className={cn("font-mono text-xs w-6", isActive ? "text-accent" : "text-fg-3")}>
                                            {String(n + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                            className={cn(
                                                "flex-1 text-[2rem] font-semibold leading-none tracking-[-0.04em] transition-colors duration-200",
                                                isActive ? "text-accent" : "text-fg group-active:text-accent"
                                            )}
                                        >
                                            {label}
                                        </span>
                                        {isActive && <span aria-hidden className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />}
                                        <ArrowRight
                                            size={20}
                                            aria-hidden
                                            className="text-fg-3 transition-transform duration-300 ease-expo group-hover:translate-x-1 group-active:translate-x-1"
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Case studies */}
                <div className="menu-item mt-8" style={stagger(afterLinks)}>
                    <p className="t-label text-fg-3 mb-3">Case studies</p>
                    <ul className="grid grid-cols-2 gap-2">
                        {projects.map(p => (
                            <li key={p.id}>
                                <Link
                                    href={`/projects/${p.id}`}
                                    onClick={follow}
                                    className="flex h-full items-start gap-2 rounded-xl border border-border bg-bg-card/70 p-3 text-[13px] font-medium leading-snug text-fg-2 backdrop-blur transition-colors active:border-accent active:text-accent"
                                >
                                    <span className="font-mono text-[11px] text-fg-3 pt-px">{String(p.index).padStart(2, "0")}</span>
                                    <span className="line-clamp-2">{p.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions + contact */}
                <div className="menu-item mt-auto pt-8" style={stagger(afterLinks + 1)}>
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="t-label text-emerald-700 dark:text-emerald-400">{contact.availability}</span>
                    </p>

                    <div className="grid grid-cols-[1fr_auto] gap-2">
                        <Link
                            href="/#contact"
                            onClick={follow}
                            className="flex items-center justify-center gap-2 rounded-full bg-[image:var(--grad-solid)] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_var(--v-violet)] transition-[filter] hover:brightness-110 active:scale-[0.98]"
                        >
                            Hire me <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
                        </Link>
                        <button
                            type="button"
                            onClick={search}
                            aria-label="Search the site"
                            className="grid h-full w-[3.25rem] place-items-center rounded-full border border-border bg-bg-card text-fg-2 transition-colors active:border-accent active:text-accent"
                        >
                            <Search size={18} aria-hidden />
                        </button>
                    </div>

                    {contact.resumeUrl && (
                        <CvLink
                            href={contact.resumeUrl}
                            source="mobile_menu"
                            className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-fg-2 transition-colors active:border-accent active:text-accent"
                        >
                            <Download size={15} aria-hidden /> Download CV
                        </CvLink>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                        <div className="min-w-0">
                            <a href={`mailto:${contact.email}`} className="block truncate text-sm font-medium text-fg">
                                {contact.email}
                            </a>
                            <p className="mt-0.5 font-mono text-xs text-fg-3">
                                {contact.locationShort} · <LocalTime timeZone={contact.timezone} label={contact.timezoneLabel} />
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <CopyEmail email={contact.email} source="mobile_menu" compact />
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn (opens in a new tab)"
                                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-bg-card text-fg-2 transition-colors active:text-accent"
                            >
                                <LinkedInIcon size={16} />
                            </a>
                            {contact.github && (
                                <a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub (opens in a new tab)"
                                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-bg-card text-fg-2 transition-colors active:text-accent"
                                >
                                    <GitHubIcon size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
