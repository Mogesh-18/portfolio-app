import type { ReactNode } from "react";
import { Check, Copy, Download, FolderGit2, Hash, Mail, Moon, Sun } from "lucide-react";
import { NAV_LINKS } from "@/config/nav";
import type { ClientData } from "@/data/client";
import { SOCIAL_ICON } from "@/components/ui/BrandIcons";
import { socialLinks } from "@/lib/social";

export type Group = "Navigate" | "Case studies" | "Actions" | "Elsewhere";
export const GROUPS: Group[] = ["Navigate", "Case studies", "Actions", "Elsewhere"];

/** What selecting an item does — handled in one switch in CommandPalette (keeps items plain data). */
export type Action =
    | { type: "go"; href: string }
    | { type: "open"; url: string }
    | { type: "copy-email" }
    | { type: "email" }
    | { type: "theme" }
    | { type: "cv"; href: string };

export interface Item {
    id: string;
    group: Group;
    label: string;
    icon: ReactNode;
    keywords?: string;
    action: Action;
}

/** All palette entries, in display order. */
export function buildItems(data: ClientData, state: { isDark: boolean; copied: boolean }): Item[] {
    const { contact, projects } = data;
    const { isDark, copied } = state;
    return [
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
        ...socialLinks(contact).map(({ id, label, href }): Item => {
            const Icon = SOCIAL_ICON[id];
            return { id, group: "Elsewhere", label, icon: <Icon size={15} />, keywords: id === "github" ? "code source" : undefined, action: { type: "open", url: href } };
        }),
    ];
}
