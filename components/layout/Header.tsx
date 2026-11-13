"use client";
import { useState, useEffect, useLayoutEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { openCommandPalette } from "@/components/features/command-palette/events";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/config/nav";
import { ThemeToggle } from "@/components/features/theme/ThemeToggle";
import { buttonVariants } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { useActiveSection } from "@/components/layout/useActiveSection";
import type { ClientData } from "@/data/client";

const noop = () => () => {};
/** Modifier key label: "⌘" on Apple devices, "Ctrl" elsewhere */
function useModifierKey() {
    return useSyncExternalStore(
        noop,
        () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
        () => "Ctrl"
    );
}

const kbd =
    "inline-grid h-6 min-w-6 place-items-center rounded-md border border-border bg-bg-2 px-1.5 " +
    "font-mono text-2xs leading-none text-fg-2 shadow-[inset_0_-1px_0_var(--border)]";

export function Header({ data }: { data: ClientData }) {
    const mod = useModifierKey();
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    /* The menu is open for the route it was opened on, so Back/Forward
       navigation closes it (and releases the scroll lock) automatically. */
    const [openOn, setOpenOn] = useState<string | null>(null);
    const open = openOn === pathname;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const pillRef = useRef<HTMLSpanElement>(null);
    const active = useActiveSection();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        fn();
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    /* Close the mobile menu if the viewport grows past the `lg` breakpoint
       (e.g. rotating a tablet) — the panel is display:none there, but the
       scroll lock would otherwise stay on. */
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 64rem)");
        const fn = (e: MediaQueryListEvent) => { if (e.matches) setOpenOn(null); };
        mq.addEventListener("change", fn);
        return () => mq.removeEventListener("change", fn);
    }, []);

    /* Slide the indicator pill under the active link (written straight to the DOM) */
    useLayoutEffect(() => {
        const nav = navRef.current;
        const pill = pillRef.current;
        if (!nav || !pill) return;
        const place = () => {
            const link = nav.querySelector<HTMLElement>(`[data-id="${active}"]`);
            if (!link) { pill.style.opacity = "0"; return; }
            pill.style.opacity = "1";
            pill.style.width = `${link.offsetWidth}px`;
            pill.style.transform = `translateX(${link.offsetLeft}px)`;
        };
        place();
        window.addEventListener("resize", place);
        return () => window.removeEventListener("resize", place);
    }, [active]);

    /** restoreFocus=false when closing because a link was followed (focus moves to the target) */
    const closeMenu = useCallback((restoreFocus = true) => {
        setOpenOn(null);
        if (restoreFocus) triggerRef.current?.focus();
    }, []);

    /* Wordmark: scroll to top on the home page, navigate home elsewhere */
    const onWordmark = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0 });
        }
    };

    return (
        <>
            <header data-print="hide" className="fixed inset-x-0 top-0 z-30 pt-3 sm:pt-4 pointer-events-none">
                {/* Reading progress (CSS scroll-driven; hidden where unsupported) */}
                <span aria-hidden className="scroll-progress absolute inset-x-0 top-0 h-[2px] bg-accent" />

                <div className="wrap">
                    <div
                        className={cn(
                            "pointer-events-auto flex items-center justify-between gap-4 rounded-full border py-2 pl-5 pr-2",
                            "transition-[background-color,border-color,box-shadow] duration-300",
                            scrolled
                                ? "bg-bg/75 backdrop-blur-xl border-border shadow-float"
                                : "bg-transparent border-transparent"
                        )}
                    >
                        <Link
                            href="/"
                            onClick={onWordmark}
                            aria-label={`${data.contact.name} — home`}
                            className="group font-semibold text-15 tracking-tight text-fg hover:text-accent transition-colors duration-200 shrink-0"
                        >
                            {data.contact.firstName}
                            <span className="text-accent transition-transform duration-200 inline-block group-hover:rotate-12">.</span>
                        </Link>

                        {/* Desktop nav — sliding pill marks the section in view */}
                        <nav ref={navRef} className="relative hidden lg:flex items-center" aria-label="Primary">
                            <span
                                ref={pillRef}
                                aria-hidden
                                className="absolute left-0 top-0 h-full rounded-full bg-accent/10 opacity-0 transition-[transform,width,opacity] duration-500 ease-expo"
                            />
                            {NAV_LINKS.map(({ label, id, href }) => (
                                <Link
                                    key={id}
                                    href={href}
                                    data-id={id}
                                    aria-current={active === id ? "location" : undefined}
                                    className={cn(
                                        "relative t-label px-3.5 lg:px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200",
                                        active === id ? "text-accent" : "text-fg-2 hover:text-fg"
                                    )}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={openCommandPalette}
                                aria-label={`Search the site (${mod}+K)`}
                                aria-keyshortcuts="Control+K Meta+K"
                                className={cn(
                                    "group/search hidden sm:inline-flex items-center gap-2.5 h-10 rounded-full border border-border bg-bg-card/60 pl-3.5 pr-2",
                                    "text-fg-3 transition-colors duration-200 hover:text-fg hover:border-v-violet/40 xl:w-52"
                                )}
                            >
                                <Search size={15} aria-hidden className="shrink-0 transition-colors group-hover/search:text-v-violet" />
                                <span className="hidden xl:inline mr-auto text-13">Search…</span>
                                <span className="hidden md:inline-flex items-center gap-1" aria-hidden>
                                    <kbd className={kbd}>{mod}</kbd>
                                    <kbd className={kbd}>K</kbd>
                                </span>
                            </button>
                            <ThemeToggle />
                            <Link
                                href="/#contact"
                                className={buttonVariants({ size: "sm", className: "hidden lg:inline-flex" })}
                            >
                                Hire Me
                            </Link>
                            <button
                                ref={triggerRef}
                                type="button"
                                onClick={() => setOpenOn(pathname)}
                                aria-label="Open menu"
                                aria-haspopup="dialog"
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                className={cn(
                                    "lg:hidden relative w-10 h-10 rounded-full border flex flex-col items-center justify-center gap-[5px]",
                                    "transition-colors duration-200 hover:border-accent hover:bg-accent/5 active:scale-95",
                                    open ? "border-accent bg-accent/5" : "border-border"
                                )}
                            >
                                <span className="w-[16px] h-[1.5px] bg-fg rounded-full block" />
                                <span className="w-[10px] h-[1.5px] bg-fg-2 rounded-full block self-end mr-[11px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <MobileNav data={data} open={open} onClose={closeMenu} active={active} />
        </>
    );
}
