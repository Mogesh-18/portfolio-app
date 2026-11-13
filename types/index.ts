type Month = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
/** "YYYY-MM", e.g. "2022-06". Typos such as "2022-13" or "June 2022" fail typecheck. */
export type YearMonth = `${number}-${Month}`;

export interface ContactInfo {
    name: string;
    firstName: string;
    lastName: string;
    /** Main title, e.g. "Full Stack Developer" */
    title: string;
    /** Second title shown after "&", e.g. "Technical Lead" (see `headline` in data/resume.ts) */
    secondaryTitle: string;
    email: string;
    phone: string;
    linkedin: string;
    /** Display text for the LinkedIn link */
    linkedinHandle: string;
    /** Optional — renders GitHub links when set */
    github?: string;
    /** Optional — path or URL to a PDF; renders "Download CV" buttons when set */
    resumeUrl?: string;
    /** Structured address, used for JSON-LD */
    address: {
        locality: string;
        region: string;
        /** ISO 3166-1 alpha-2, e.g. "IN" */
        country: string;
    };
    /** Short location for compact UI, e.g. "Tiruvannamalai, IN" */
    locationShort: string;
    /** IANA timezone for the live local-time display */
    timezone: string;
    /** Label shown after the time, e.g. "IST" */
    timezoneLabel: string;
    /** Short status line shown in the Hero and Contact badges */
    availability: string;
    /** Relocation note, e.g. "Open to relocate" */
    relocation: string;
}

/** Kinds of work you're open to — each kind has an icon (config/icons.ts) */
export type OpenToKind = "full-time" | "contract" | "consulting";
export interface OpenTo {
    kind: OpenToKind;
    label: string;
}

export interface StatItem {
    /** Stable key for the tile's icon and colour (STAT_STYLE in About.tsx) */
    id: string;
    value: string;
    label: string;
}

export interface SkillGroup {
    category: string;
    skills: string[];
}

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";

export interface Experience {
    id: string;
    role: string;
    company: string;
    companyFull: string;
    location: string;
    /** Duration and tenure are computed from these */
    startDate: YearMonth;
    /** Omit for your current role */
    endDate?: YearMonth;
    type: EmploymentType;
    /** e.g. "Leading a team of 4 developers" */
    team?: string;
    highlights: string[];
    tags: string[];
}

export interface Project {
    /** Also the URL slug: /projects/<id> */
    id: string;
    /** Displayed number (01, 02, …). Display order is the array order. */
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

/** Side work — `kind` picks the icon and colour in the About tile */
export type SideWorkKind = "web" | "mobile" | "cms" | "other";
export interface SideWork {
    kind: SideWorkKind;
    text: string;
}

export interface Education {
    id: string;
    degree: string;
    /** Compact form for tiles, e.g. "B.Sc. Mathematics" (defaults to `degree`) */
    shortDegree?: string;
    institution: string;
    board: string;
    duration: string;
    /** Not displayed on the site */
    grade?: string;
}

/** `id` is the section id on the home page; `href` works from any page ("/#about") */
export type NavLink = { label: string; id: string; href: string };
