import { describe, expect, it } from "vitest";
import { filterItems } from "@/components/features/command-palette/search";
import { socialLinks } from "@/lib/social";
import { normalizeUrl } from "@/lib/url";
import { cn } from "@/lib/utils";

describe("command palette search", () => {
    const items = [
        { label: "About", group: "Navigate" },
        { label: "Real Estate CRM", group: "Case studies", keywords: "Laravel React JS Twilio" },
        { label: "Industrial ERP", group: "Case studies", keywords: "Laravel QuickBooks API" },
        { label: "Switch to dark mode", group: "Actions", keywords: "theme appearance" },
    ];

    it("returns everything for an empty or blank query", () => {
        expect(filterItems(items, "")).toHaveLength(4);
        expect(filterItems(items, "   ")).toHaveLength(4);
    });

    it("matches label, keywords and group, case-insensitively", () => {
        expect(filterItems(items, "erp").map(i => i.label)).toEqual(["Industrial ERP"]);
        expect(filterItems(items, "TWILIO").map(i => i.label)).toEqual(["Real Estate CRM"]);
        expect(filterItems(items, "case studies")).toHaveLength(2);
        expect(filterItems(items, "theme").map(i => i.label)).toEqual(["Switch to dark mode"]);
    });

    it("requires every word to match", () => {
        expect(filterItems(items, "laravel quickbooks").map(i => i.label)).toEqual(["Industrial ERP"]);
        expect(filterItems(items, "laravel nothing")).toEqual([]);
    });
});

describe("socialLinks", () => {
    it("derives handles and omits GitHub when not set", () => {
        expect(socialLinks({ linkedin: "https://www.linkedin.com/in/jane-doe/" })).toEqual([
            { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/jane-doe/", handle: "jane-doe" },
        ]);
        const both = socialLinks({ linkedin: "https://linkedin.com/in/x", linkedinHandle: "Jane", github: "https://github.com/jane/" });
        expect(both.map(l => [l.id, l.handle])).toEqual([["linkedin", "Jane"], ["github", "jane"]]);
    });
});

describe("normalizeUrl", () => {
    it("adds https, trims and drops trailing slashes", () => {
        expect(normalizeUrl("mogesh.dev/")).toBe("https://mogesh.dev");
        expect(normalizeUrl("  https://example.com//  ")).toBe("https://example.com");
        expect(normalizeUrl("http://localhost:3000")).toBe("http://localhost:3000");
    });

    it("treats blank values as unset", () => {
        expect(normalizeUrl(undefined)).toBeUndefined();
        expect(normalizeUrl("")).toBeUndefined();
        expect(normalizeUrl("  /  ")).toBeUndefined();
    });
});

describe("cn (tailwind-merge with the project's custom utilities)", () => {
    it("keeps custom font sizes next to colours and merges conflicts", () => {
        expect(cn("text-2xs text-fg-2")).toBe("text-2xs text-fg-2");
        expect(cn("text-2xs text-sm")).toBe("text-sm");
        expect(cn("shadow-elev-1 shadow-float")).toBe("shadow-float");
        expect(cn("bg-tone-grad bg-tone-solid")).toBe("bg-tone-solid");
        expect(cn("bg-grad-solid bg-bg-card")).toBe("bg-grad-solid bg-bg-card");
    });
});
