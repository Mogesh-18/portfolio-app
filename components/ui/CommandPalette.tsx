"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { track } from "@vercel/analytics";
import {
    ArrowUpDown, Check, Copy, CornerDownLeft, Download, FileText, FolderGit2, Hash, Mail, Moon, Search, Sun,
} from "lucide-react";
import { NAV_LINKS } from "@/config/nav";
import { contact, projects } from "@/data/resume";
import { switchTheme } from "@/lib/theme-switch";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const OPEN_EVENT = "open-command-palette";

/** Open the palette from anywhere (header button, mobile menu, …). */
export function openCommandPalette() {
    window.dispatchEvent(new Event(OPEN_EVENT));
}

type Group = "Navigate" | "Case studies" | "Actions" | "Elsewhere";
type Action =
    | { type: "go"; href: string }
    | { type: "open"; url: string }
    | { type: "copy-email" }
    | { type: "email" }
    | { type: "theme" }
    | { type: "cv"; href: string };
type Item = {
    id: string;
    group: Group;
    label: string;
    icon: ReactNode;
    keywords?: string;
    action: Action;
};

const GROUPS: Group[] = ["Navigate", "Case studies", "Actions", "Elsewhere"];

const noop = () => () => {};
/** false during SSR + hydration, true afterwards (avoids theme-dependent hydration mismatches) */
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

export function CommandPalette() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useMounted();
    const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const open = useCallback(() => {
        const d = dialogRef.current;
        if (!d || d.open) return;
        clearTimeout(closeTimer.current);
        delete d.dataset.instant;
        setQuery("");
        setActive(0);
        setCopied(false);
        d.showModal();
        track("command_palette_open");
    }, []);
    const close = useCallback(() => dialogRef.current?.close(), []);

    /* ⌘K (Apple) / Ctrl+K (elsewhere) toggles; custom event opens.
       On macOS Ctrl+K is "delete to end of line" in text fields, so leave it alone there. */
    useEffect(() => {
        const apple = /Mac|iPhone|iPad/.test(navigator.userAgent);
        const onKey = (e: KeyboardEvent) => {
            if ((apple ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                if (dialogRef.current?.open) close();
                else open();
            }
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener(OPEN_EVENT, open);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener(OPEN_EVENT, open);
            clearTimeout(closeTimer.current);
        };
    }, [open, close]);

    const isDark = mounted && resolvedTheme === "dark";

    const items = useMemo<Item[]>(() => [
        { id: "top", group: "Navigate", label: "Home", icon: <Hash size={16} />, keywords: "top hero start", action: { type: "go", href: "/" } },
        ...NAV_LINKS.map((l): Item => ({
            id: `nav-${l.id}`, group: "Navigate", label: l.label, icon: <Hash size={16} />, action: { type: "go", href: l.href },
        })),
        ...projects.map((p): Item => ({
            id: `project-${p.id}`, group: "Case studies", label: p.title, icon: <FolderGit2 size={16} />,
            keywords: p.techStack.join(" "), action: { type: "go", href: `/projects/${p.id}` },
        })),
        {
            id: "copy-email", group: "Actions", label: copied ? "Copied to clipboard!" : "Copy email address",
            icon: copied ? <Check size={16} /> : <Copy size={16} />, keywords: contact.email, action: { type: "copy-email" },
        },
        { id: "email", group: "Actions", label: "Send an email", icon: <Mail size={16} />, keywords: "contact hire mail", action: { type: "email" } },
        {
            id: "theme", group: "Actions", label: `Switch to ${isDark ? "light" : "dark"} mode`,
            icon: isDark ? <Sun size={16} /> : <Moon size={16} />, keywords: "theme dark light appearance", action: { type: "theme" },
        },
        ...(contact.resumeUrl
            ? [{ id: "cv", group: "Actions", label: "Download CV", icon: <Download size={16} />, keywords: "resume pdf", action: { type: "cv", href: contact.resumeUrl } } satisfies Item]
            : []),
        { id: "linkedin", group: "Elsewhere", label: "LinkedIn", icon: <LinkedInIcon size={15} />, action: { type: "open", url: contact.linkedin } },
        ...(contact.github
            ? [{ id: "github", group: "Elsewhere", label: "GitHub", icon: <GitHubIcon size={15} />, keywords: "code source", action: { type: "open", url: contact.github } } satisfies Item]
            : []),
    ], [isDark, copied]);

    /* Every query word must appear in the label, keywords or group */
    const results = useMemo(() => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        if (!words.length) return items;
        return items.filter(i => {
            const hay = `${i.label} ${i.keywords ?? ""} ${i.group}`.toLowerCase();
            return words.every(w => hay.includes(w));
        });
    }, [items, query]);

    const activeIndex = Math.min(active, Math.max(0, results.length - 1));
    const activeItem = results[activeIndex];

    /* Keep the highlighted option in view */
    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    /* Single event handler for every item (keeps render data free of ref-capturing closures) */
    const run = (item: Item | undefined) => {
        if (!item) return;
        const { action } = item;
        switch (action.type) {
            case "go":
                close();
                router.push(action.href);
                return;
            case "open":
                close();
                window.open(action.url, "_blank", "noopener,noreferrer");
                return;
            case "email":
                close();
                window.location.href = `mailto:${contact.email}`;
                return;
            case "theme":
                // Close instantly (no fade-out) so the view-transition snapshot doesn't include the palette
                if (dialogRef.current) dialogRef.current.dataset.instant = "";
                close();
                requestAnimationFrame(() => switchTheme(isDark ? "light" : "dark", setTheme));
                return;
            case "cv": {
                close();
                track("download_cv", { source: "command_palette" });
                const a = document.createElement("a");
                a.href = action.href;
                a.download = "";
                a.click();
                return;
            }
            case "copy-email":
                // Stay open briefly to show "Copied"
                navigator.clipboard.writeText(contact.email)
                    .then(() => {
                        setCopied(true);
                        track("copy_email", { source: "command_palette" });
                        closeTimer.current = setTimeout(close, 700);
                    })
                    .catch(() => { window.location.href = `mailto:${contact.email}`; });
                return;
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!results.length) return;
        if (e.key === "ArrowDown") { e.preventDefault(); setActive((activeIndex + 1) % results.length); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActive((activeIndex - 1 + results.length) % results.length); }
        else if (e.key === "Home") { e.preventDefault(); setActive(0); }
        else if (e.key === "End") { e.preventDefault(); setActive(results.length - 1); }
        else if (e.key === "Enter") { e.preventDefault(); run(activeItem); }
    };

    return (
        <dialog
            ref={dialogRef}
            aria-label="Command palette"
            data-print="hide"
            onClick={e => { if (e.target === e.currentTarget) close(); }}
            className="cmdk mx-auto mt-[12vh] w-[min(620px,calc(100%-2rem))] max-h-[min(560px,76vh)] overflow-hidden rounded-2xl border border-border bg-bg-card p-0 text-fg shadow-[0_24px_80px_-20px_oklch(0_0_0/0.55)]"
        >
            <div className="flex h-full max-h-[inherit] flex-col">
                <div className="flex items-center gap-3 border-b border-border px-4">
                    <Search size={17} className="shrink-0 text-fg-3" aria-hidden />
                    <input
                        autoFocus
                        value={query}
                        onChange={e => { setQuery(e.target.value); setActive(0); }}
                        onKeyDown={onKeyDown}
                        placeholder="Search sections, projects, actions…"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="cmdk-list"
                        aria-activedescendant={activeItem ? `cmdk-${activeItem.id}` : undefined}
                        aria-autocomplete="list"
                        className="h-14 w-full bg-transparent text-[15px] text-fg placeholder:text-fg-3 outline-none focus-visible:outline-none"
                    />
                    <kbd className="hidden sm:inline-flex t-label rounded-md border border-border px-1.5 py-0.5 text-fg-3">Esc</kbd>
                </div>

                <p className="sr-only" aria-live="polite" aria-atomic="true">
                    {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : ""}
                </p>

                <ul ref={listRef} id="cmdk-list" role="listbox" aria-label="Results" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
                    {results.length === 0 && (
                        <li role="presentation" className="px-3 py-10 text-center text-sm text-fg-3">
                            No results for “{query}”
                        </li>
                    )}
                    {GROUPS.map(group => {
                        const groupItems = results.filter(i => i.group === group);
                        if (!groupItems.length) return null;
                        return (
                            <li key={group} role="presentation">
                                <p className="t-label px-3 pb-1.5 pt-3 text-fg-3" aria-hidden>{group}</p>
                                <ul role="group" aria-label={group}>
                                    {groupItems.map(item => {
                                        const index = results.indexOf(item);
                                        const isActive = index === activeIndex;
                                        return (
                                            <li
                                                key={item.id}
                                                id={`cmdk-${item.id}`}
                                                role="option"
                                                aria-selected={isActive}
                                                data-index={index}
                                                onMouseMove={() => { if (!isActive) setActive(index); }}
                                                onClick={() => run(item)}
                                                className={cn(
                                                    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-100",
                                                    isActive ? "bg-accent/10 text-fg" : "text-fg-2"
                                                )}
                                            >
                                                <span aria-hidden className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-md border", isActive ? "border-accent/30 text-accent" : "border-border text-fg-3")}>
                                                    {item.icon}
                                                </span>
                                                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                                                {isActive && <CornerDownLeft size={14} className="shrink-0 text-fg-3" aria-hidden />}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>

                <div className="hidden sm:flex items-center gap-4 border-t border-border px-4 py-2.5 text-xs text-fg-3">
                    <span className="inline-flex items-center gap-1.5"><ArrowUpDown size={12} aria-hidden /> Navigate</span>
                    <span className="inline-flex items-center gap-1.5"><CornerDownLeft size={12} aria-hidden /> Open</span>
                    <span className="ml-auto inline-flex items-center gap-1.5"><FileText size={12} aria-hidden /> {contact.name}</span>
                </div>
            </div>
        </dialog>
    );
}
