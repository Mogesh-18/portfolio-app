import { contact, projects } from "@/data/resume";

/**
 * The small slice of content the client-side chrome (Header, MobileNav,
 * CommandPalette) needs. The server layout passes it down as props, so
 * client components never import data/resume.ts and it stays out of the
 * browser bundle. Client code may only `import type` from this file.
 */
export const clientData = {
    contact: {
        name: contact.name,
        firstName: contact.firstName,
        email: contact.email,
        linkedin: contact.linkedin,
        github: contact.github,
        resumeUrl: contact.resumeUrl,
        availability: contact.availability,
        locationShort: contact.locationShort,
        timezone: contact.timezone,
        timezoneLabel: contact.timezoneLabel,
    },
    projects: projects.map(p => ({ id: p.id, index: p.index, title: p.title, techStack: p.techStack })),
};

export type ClientData = typeof clientData;
