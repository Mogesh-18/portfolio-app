"use client";
import { useCallback, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Download, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config/nav";
import type { ClientData } from "@/data/client";
import { ThemeToggle } from "@/components/features/theme/ThemeToggle";
import { CopyEmail } from "@/components/features/contact/CopyEmail";
import { CvLink } from "@/components/ui/CvLink";
import { LocalTime } from "@/components/ui/LocalTime";
import { SOCIAL_ICON } from "@/components/ui/BrandIcons";
import { buttonVariants } from "@/components/ui/Button";
import { iconButtonVariants } from "@/components/ui/IconButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { socialLinks } from "@/lib/social";
import { openCommandPalette } from "@/components/features/command-palette/events";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { releaseScrollLock, useScrollLock } from "@/hooks/useScrollLock";

interface Props {
    data: ClientData;
    open: boolean;
    /** restoreFocus=false when a link was followed */
    onClose: (restoreFocus?: boolean) => void;
    active: string;
}

/** Stagger index for the `.menu-item` entrance (styles/components.css) */
const stagger = (i: number): CSSProperties => ({ "--i": i });

/**
 * Full-screen mobile menu. Opens with a circular reveal from the menu button,
 * then the links rise in one after another. Accessible modal dialog:
 * focus moves in and is trapped, Escape closes, page scroll is locked,
 * and the panel is inert + hidden while closed.
 */
export function MobileNav({ data, open, onClose, active }: Props) {
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const escape = useCallback(() => onClose(), [onClose]);
    useScrollLock(open);
    useFocusTrap(panelRef, open, { onEscape: escape, initialFocus: closeRef, focusDelay: 150 });

    /* Following a link: unlock scrolling first so the anchor jump can happen */
    const follow = () => {
        releaseScrollLock();
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
                    <Link href="/" onClick={follow} className="font-semibold text-15 tracking-tight text-fg">
                        {data.contact.firstName}<span className="text-accent">.</span>
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
                        {data.projects.map(p => (
                            <li key={p.id}>
                                <Link
                                    href={`/projects/${p.id}`}
                                    onClick={follow}
                                    className="flex h-full items-start gap-2 rounded-xl border border-border bg-bg-card/70 p-3 text-13 font-medium leading-snug text-fg-2 backdrop-blur transition-colors active:border-accent active:text-accent"
                                >
                                    <span className="font-mono text-2xs text-fg-3 pt-px">{String(p.index).padStart(2, "0")}</span>
                                    <span className="line-clamp-2">{p.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions + contact */}
                <div className="menu-item mt-auto pt-8" style={stagger(afterLinks + 1)}>
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-v-emerald/25 bg-v-emerald/10 px-3 py-1.5">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-v-emerald" />
                        <span className="t-label text-success">{data.contact.availability}</span>
                    </p>

                    <div className="grid grid-cols-[1fr_auto] gap-2">
                        <Link
                            href="/#contact"
                            onClick={follow}
                            className={buttonVariants({ size: "lg", className: "py-3.5 text-15" })}
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

                    {data.contact.resumeUrl && (
                        <CvLink
                            href={data.contact.resumeUrl}
                            source="mobile_menu"
                            className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-2 flex text-fg-2" })}
                        >
                            <Download size={15} aria-hidden /> Download CV
                        </CvLink>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
                        <div className="min-w-0">
                            <a href={`mailto:${data.contact.email}`} className="block truncate text-sm font-medium text-fg">
                                {data.contact.email}
                            </a>
                            <p className="mt-0.5 font-mono text-xs text-fg-3">
                                {data.contact.locationShort} · <LocalTime timeZone={data.contact.timezone} label={data.contact.timezoneLabel} />
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <CopyEmail email={data.contact.email} source="mobile_menu" compact />
                            {socialLinks(data.contact).map(({ id, label, href }) => {
                                const Icon = SOCIAL_ICON[id];
                                return (
                                    <ExternalLink key={id} href={href} aria-label={label} className={iconButtonVariants({ className: "active:text-accent" })}>
                                        <Icon size={16} />
                                    </ExternalLink>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
