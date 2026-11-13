export interface ContactInfo {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    /** Display text for the LinkedIn link */
    linkedinHandle: string;
    /** Optional — renders GitHub links when set */
    github?: string;
    /** Optional — path or URL to a PDF; renders "Download CV" buttons when set */
    resumeUrl?: string;
    location: string;
    /** Short location for compact UI, e.g. "Tiruvannamalai, IN" */
    locationShort: string;
    /** IANA timezone for the live local-time display */
    timezone: string;
    /** Label shown after the time, e.g. "IST" */
    timezoneLabel: string;
    /** Short status line shown in the Hero and Contact badges */
    availability: string;
}

export interface StatItem {
    value: string;
    label: string;
}

export interface SkillGroup {
    category: string;
    skills: string[];
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    companyFull: string;
    location: string;
    /** "YYYY-MM" — duration and tenure are computed from these */
    startDate: string;
    /** "YYYY-MM", omit for a current role */
    endDate?: string;
    type: string;
    /** e.g. "Leading a team of 4 developers" */
    team?: string;
    highlights: string[];
    tags: string[];
}

export interface Project {
    /** Also the URL slug: /projects/<id> */
    id: string;
    index: number;
    title: string;
    status: "Live" | "Archived" | "In Progress";
    description: string;
    techStack: string[];
    highlights: string[];
    color: string;

    /* ── Optional case-study fields — each renders on /projects/<id> when set ── */
    /** One-line hook for the card, e.g. "CRM for a real-estate agency" */
    tagline?: string;
    /** Your role on the project, e.g. "Lead developer — API, schema, dashboard" */
    role?: string;
    /** Year or range, e.g. "2023" or "2023 – 2024" */
    year?: string;
    /** The client's problem / context */
    problem?: string;
    /** Measurable result, e.g. "Cut invoicing time from 2 days to 10 minutes" */
    outcome?: string;
    /** Public URL, if the client allows it */
    url?: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    board: string;
    duration: string;
    grade: string;
}

/** `id` is the section id on the home page; `href` works from any page ("/#about") */
export type NavLink = { label: string; id: string; href: string };
