export type SocialId = "linkedin" | "github";

export interface SocialLink {
    id: SocialId;
    label: string;
    href: string;
    /** Short visible text, e.g. the profile handle */
    handle: string;
}

/**
 * Social profiles in display order. GitHub only appears when set.
 * Pure function (no data import), so client components can use it with their props.
 */
export function socialLinks(c: { linkedin: string; linkedinHandle?: string; github?: string }): SocialLink[] {
    return [
        {
            id: "linkedin", label: "LinkedIn", href: c.linkedin,
            handle: c.linkedinHandle ?? c.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, ""),
        },
        ...(c.github
            ? [{ id: "github", label: "GitHub", href: c.github, handle: c.github.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "") } satisfies SocialLink]
            : []),
    ];
}
