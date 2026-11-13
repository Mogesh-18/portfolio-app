import { describe, expect, it } from "vitest";
import {
    additionalWork, careerStart, contact, currentRole, education, experiences, openTo, primaryStack,
    projects, skillGroups, stats,
} from "@/data/resume";
import { clientData } from "@/data/client";
import { NAV_LINKS } from "@/config/nav";
import { monthsBetween } from "@/lib/dates";

/* Content checks the type system can't express: uniqueness, formats, ordering. */

const unique = (xs: readonly unknown[]) => new Set(xs).size === xs.length;

describe("data/resume.ts integrity", () => {
    it("projects have unique, URL-safe ids and sequential indexes", () => {
        const ids = projects.map(p => p.id);
        expect(unique(ids)).toBe(true);
        for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        expect(projects.map(p => p.index)).toEqual(projects.map((_, i) => i + 1));
    });

    it("projects have a valid colour, a description and at least one highlight", () => {
        for (const p of projects) {
            expect(p.color, p.id).toMatch(/^#[0-9a-fA-F]{6}$/);
            expect(p.description.length, p.id).toBeGreaterThan(20);
            expect(p.highlights.length, p.id).toBeGreaterThan(0);
            expect(p.techStack.length, p.id).toBeGreaterThan(0);
            if (p.url) expect(p.url, p.id).toMatch(/^https:\/\//);
        }
    });

    it("experience dates are valid, ordered, and exactly one role is current", () => {
        expect(() => monthsBetween(careerStart)).not.toThrow();
        for (const e of experiences) {
            expect(() => monthsBetween(e.startDate, e.endDate), e.id).not.toThrow();
            if (e.endDate) expect(monthsBetween(e.startDate, e.endDate), e.id).toBeGreaterThanOrEqual(0);
        }
        expect(experiences.filter(e => !e.endDate)).toHaveLength(1);
        expect(currentRole).toBeDefined();
        expect(unique(experiences.map(e => e.id))).toBe(true);
    });

    it("lists and keys are unique", () => {
        expect(unique(stats.map(s => s.id))).toBe(true);
        expect(unique(skillGroups.map(g => g.category))).toBe(true);
        expect(unique(openTo.map(o => o.kind))).toBe(true);
        expect(unique(primaryStack)).toBe(true);
        expect(unique(additionalWork.map(w => w.text))).toBe(true);
        expect(unique(education.map(e => e.id))).toBe(true);
        expect(unique(NAV_LINKS.map(l => l.id))).toBe(true);
    });

    it("contact details are well-formed", () => {
        expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(contact.linkedin).toMatch(/^https:\/\//);
        if (contact.github) expect(contact.github).toMatch(/^https:\/\/github\.com\//);
        expect(contact.address.country).toMatch(/^[A-Z]{2}$/);
        expect(() => new Intl.DateTimeFormat("en", { timeZone: contact.timezone })).not.toThrow();
    });

    it("nav links point at home-page sections", () => {
        for (const l of NAV_LINKS) expect(l.href).toBe(`/#${l.id}`);
    });
});

describe("data/client.ts (shipped to the browser)", () => {
    it("only contains what the client chrome needs", () => {
        expect(Object.keys(clientData.contact).sort()).toEqual(
            ["availability", "email", "firstName", "github", "linkedin", "locationShort", "name", "resumeUrl", "timezone", "timezoneLabel"]
        );
        // No phone number or long-form content in the browser bundle
        expect(JSON.stringify(clientData)).not.toContain(contact.phone);
        expect(Object.keys(clientData.projects[0] ?? {}).sort()).toEqual(["id", "index", "techStack", "title"]);
    });
});
