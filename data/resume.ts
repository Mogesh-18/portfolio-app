import type {
    ContactInfo, SkillGroup, Experience, Project, Education, StatItem, OpenTo, SideWork, YearMonth,
} from "@/types";
import { yearsSince } from "@/lib/dates";

/*
 * These helpers keep a key field (project id, skill category, stat id) as a
 * literal union type, so the style maps keyed by it in components are checked:
 * add a category here without giving it a colour and typecheck fails.
 */
const defineProjects = <Id extends string>(items: (Project & { id: Id })[]) => items;
const defineSkillGroups = <C extends string>(items: (SkillGroup & { category: C })[]) => items;
const defineStats = <Id extends string>(items: (StatItem & { id: Id })[]) => items;

/** First professional role. Years of experience everywhere is computed from this. */
export const careerStart: YearMonth = "2022-06";
export const yearsOfExperience = yearsSince(careerStart);

export const contact: ContactInfo = {
    name: "Mogesh Umapathi",
    firstName: "Mogesh",
    lastName: "Umapathi",
    title: "Full Stack Developer",
    secondaryTitle: "Technical Lead",
    email: "mogesh13@gmail.com",
    phone: "+91 82705 18820",
    linkedin: "https://www.linkedin.com/in/mogesh-umapathi-712878308",
    linkedinHandle: "mogesh-umapathi",
    github: "https://github.com/Mogesh-18",
    // CV at public/resume.pdf — shows "Download CV" in the Hero, mobile menu and ⌘K palette
    resumeUrl: "/resume.pdf",
    address: { locality: "Tiruvannamalai", region: "Tamil Nadu", country: "IN" },
    locationShort: "Tiruvannamalai, IN",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST",
    availability: "Available · Open to relocate",
    relocation: "Open to relocate",
};

/** "Full Stack Developer & Technical Lead" — page title, footer, social images */
export const headline = `${contact.title} & ${contact.secondaryTitle}`;

/** Kinds of work you're open to (About › Summary, Contact). Icons: config/icons.ts */
export const openTo: OpenTo[] = [
    { kind: "full-time", label: "Full-time roles" },
    { kind: "contract", label: "Contract work" },
    { kind: "consulting", label: "Technical consulting" },
];

export const summary = `Full Stack Developer and Technical Lead with ${yearsOfExperience}+ years of hands-on experience building production ERP, CRM, and SaaS web applications. I own the full development lifecycle — API architecture, database schema design, React JS dashboards, third-party integrations, CI/CD pipelines, and team mentorship.`;

/** Core stack: Hero, About and the Skills › Core stack tiles (each needs an entry in CORE in Skills.tsx) */
export const primaryStack = ["Laravel", "React JS", "MySQL", "REST API", "Jenkins"] as const;
export type CoreTech = (typeof primaryStack)[number];

/** Scrolling marquee in the Hero */
export const marqueeStack = [
    "Laravel", "React JS", "MySQL", "REST API", "Jenkins", "PHP OOP",
    "Eloquent ORM", "Redux", "JWT Auth", "Git", "Agile / Scrum", "Flutter",
    "WordPress", "Twilio", "SendGrid", "Xero", "AiSensy", "CI/CD",
];

/** Shipped third-party integrations (Skills wall, project pages — matched against each project's techStack) */
export const integrations = [
    { name: "Ozonetel", note: "VoIP / CTI" },
    { name: "Twilio", note: "WhatsApp / SMS" },
    { name: "AiSensy", note: "WhatsApp chat" },
    { name: "SendGrid", note: "Email" },
    { name: "Xero", note: "Accounting" },
    { name: "Meta Ads", note: "Lead sync" },
    { name: "AskEva", note: "WA Notifications" },
    { name: "Buoy", note: "Insurance API" },
];

/** Headline metrics — count-up tiles in the About bento (each id needs an entry in STAT_STYLE in About.tsx) */
export const stats = defineStats([
    { id: "years", value: `${yearsOfExperience}+`, label: "Years shipping production software" },
    { id: "apps", value: "4+", label: "ERP / CRM apps built from scratch" },
    { id: "integrations", value: String(integrations.length), label: "Third-party APIs integrated" },
    { id: "mentoring", value: "40%", label: "Less PR rework after mentoring" },
]);
export type StatId = (typeof stats)[number]["id"];

/** Skill categories (each category needs an entry in CATEGORY in Skills.tsx) */
export const skillGroups = defineSkillGroups([
    {
        category: "Backend",
        skills: ["Laravel", "PHP (OOP)", "RESTful API Design", "Eloquent ORM", "MVC Architecture", "Service Layer Design", "JWT Authentication", "Role-Based Permissions", "Webhook Integration", "Scheduled Jobs"],
    },
    {
        category: "Frontend",
        skills: ["React JS", "JavaScript (ES6+)", "Redux", "React Hooks", "Event Bus Pattern", "HTML5", "CSS3", "Bootstrap 5", "Responsive UI"],
    },
    {
        category: "Database",
        skills: ["MySQL", "Database Schema Design", "Query Optimisation", "Indexing", "Relational Database Management"],
    },
    {
        category: "Integrations",
        skills: ["Ozonetel (CTI)", "Twilio (WhatsApp)", "AiSensy (WhatsApp)", "SendGrid (Email)", "Xero (Accounting)", "QuickBooks → Xero Migration", "Meta Ads Lead Sync", "AskEva", "Buoy Insurance API", "AWS S3"],
    },
    {
        category: "Mobile & CMS",
        skills: ["Flutter", "Dart", "Android Development", "WordPress (Custom Themes & Plugins)", "Joomla"],
    },
    {
        category: "DevOps & Tools",
        skills: ["Git", "GitHub", "Jenkins (CI/CD)", "Agile / Scrum", "Sprint Planning", "cPanel Deployment", "SSL Configuration", "Code Review"],
    },
    {
        category: "Leadership",
        skills: ["Technical Mentoring", "Team Lead (4 devs)", "Architecture Decision-Making", "Cross-functional Collaboration"],
    },
]);
export type SkillCategory = (typeof skillGroups)[number]["category"];

export const experiences: Experience[] = [
    {
        id: "webtrendz",
        role: "Senior Full Stack Developer",
        company: "Webtrendz Technologies",
        companyFull: "Webtrendz Technologies India Private Limited",
        location: "Tiruvannamalai, Tamil Nadu",
        startDate: careerStart,
        type: "Full-time",
        team: "Leading a team of 4 developers",
        highlights: [
            "Designed and delivered 4+ production ERP and CRM web applications from scratch using Laravel — owning RESTful API design, business logic, Eloquent ORM, and MySQL database schema across 10+ relational modules per project.",
            "Introduced an Event Bus architecture in React JS to replace Redux for cross-component state management, reducing boilerplate code by 30%; adopted as the standard pattern across all subsequent full stack frontends.",
            "Led and mentored a team of 4 junior full stack developers in Laravel MVC, Git branching workflows, and React JS component patterns — reducing average pull-request rework by 40% and shortening sprint delivery cycles within 3 months.",
            `Integrated ${integrations.length} third-party APIs across live client systems — Ozonetel (VoIP telephony), Twilio and AiSensy (WhatsApp), SendGrid (email), Xero (accounting), Meta Ads (lead sync), AskEva and Buoy Insurance — including migrating a live ERP's invoicing from QuickBooks to Xero.`,
            "Built QR-based shop-floor workflows — job scanning by employee code, stage tracking and 75×50 mm label printing — and granular role-based permission systems across ERP products.",
            "Managed CI/CD pipelines using Jenkins for automated deployment of 6+ production applications; administered cPanel hosting, DNS configuration, and SSL certificate setup and renewal.",
        ],
        tags: ["Laravel", "React JS", "MySQL", "Jenkins", "REST API", "Team Lead"],
    },
];

/** The role without an `endDate` (Hero › Now, About › Currently, JSON-LD) */
export const currentRole = experiences.find(e => !e.endDate);

/** Display order is the array order; the first project is the featured card. */
export const projects = defineProjects([
    {
        id: "real-estate-crm",
        index: 1,
        title: "Real Estate & Property Management CRM",
        status: "Live",
        tagline: "Lead-to-plot-sale platform for a land developer: CRM, admin dashboard, public website and mobile app APIs.",
        role: "Lead developer — Laravel APIs, React admin dashboard, integrations",
        year: "2022 – present",
        description: "A real estate platform covering the full sales cycle — capturing leads from ads and calls, assigning and following them up, booking plots on interactive layout maps, and tracking sales through EMI instalments — with a React JS admin dashboard, a Laravel public website, and REST APIs for customer and broker mobile apps.",
        problem: "Leads arrived from ad campaigns, phone calls and the website, while plot availability, bookings and instalment payments were tracked separately. The sales team needed one system from first enquiry to final payment.",
        techStack: ["Laravel", "React JS", "MySQL", "Ozonetel", "AiSensy", "Twilio", "SendGrid", "Meta Ads", "Firebase", "AWS S3", "Mailchimp"],
        highlights: [
            "Lead pipeline with auto-assignment, follow-ups, reminders and analytics; leads flow in from Meta Ads (multi-tab Google Sheets sync) and Google Ads webhooks",
            "Lead activity comments with seen-by receipts, delivered as push or WhatsApp notifications",
            "Interactive plot layout maps (Konva) for booking, sales, resales and EMI instalments, plus land-purchase tracking with map polygons",
            "Agent telephony via Ozonetel CTI with call history and call reports",
            "WhatsApp via AiSensy (chat widget and webhooks) and Twilio, email via SendGrid, push via Firebase, media on AWS S3",
            "REST APIs for customer and broker mobile apps: plots, broker offer groups, loyalty points and documents",
            "Staff task management, attendance and procurement modules with scheduled reports",
        ],
        color: "#2563EB",
    },
    {
        id: "industrial-erp",
        index: 2,
        title: "Industrial Job Management ERP",
        status: "Live",
        tagline: "Quote-to-invoice ERP for a metal manufacturer: job cards, machine scheduling, shop-floor clocking and accounting sync.",
        role: "Lead developer — Laravel API, React web app, accounting integrations",
        year: "2024 – present",
        description: "An ERP for a metal manufacturing firm in Australia that runs the whole job lifecycle — quotes and revisions, job cards, machine schedules, purchase orders and shop-floor time tracking — and pushes invoices to Xero, after migrating the accounting integration from QuickBooks. Built as a Laravel API with a React JS (MUI) web app.",
        problem: "Quotes, production job cards and billing were handled in separate tools and inboxes, so the team had no single view of a job from enquiry to invoice.",
        techStack: ["Laravel", "React JS", "MySQL", "Xero API", "Firebase"],
        highlights: [
            "Quotes with revisions, PDF generation and email; incoming quote emails pulled in automatically over IMAP",
            "Job cards with items, files and checklists, plus machine scheduling on a calendar",
            "Invoicing migrated from QuickBooks to Xero: OAuth2 connection, invoice push and background contact sync, throttled to stay within API rate limits",
            "Shop-floor job clocking with a floating timer, idle and threshold alerts; attendance kept in the client's time zone with missed check-out checks",
            "Daily end-of-day and user performance reports, job card reports and flags",
            "Granular permission system across every page and API, with activity logs and push notifications",
        ],
        color: "#0D9488",
    },
    {
        id: "garment-crm",
        index: 3,
        title: "Garment Order & Production Tracking CRM",
        status: "Live",
        tagline: "Order, measurement and production tracking for a boutique — from proforma to stitched garment to invoice.",
        role: "Sole developer — Laravel API and React web app, end to end",
        year: "2025 – present",
        description: "A boutique management system that records customer measurements, turns orders into production jobs tracked stage by stage across departments, and handles proformas, invoices and thermal-printed receipts — with a companion mobile app API for QR-based stage updates on the shop floor and WhatsApp updates to customers.",
        problem: "Orders, measurements and stitching progress were tracked on paper, so customers had to call to check on their orders and invoices were calculated by hand.",
        techStack: ["Laravel", "React JS", "MySQL", "AskEva", "Vite"],
        highlights: [
            "Mobile app API for staff: scan a job's QR code and move it to the next stage, identified by employee code",
            "Job pipeline with stage start and finish timestamps, bulk stage moves and live order tracking",
            "Possible-delivery-date report that forecasts due dates from stitching and embroidery workload",
            "Proformas with design media and discounts, signed estimate PDF links, and invoice cancellation that frees the proforma for re-billing",
            "Thermal-printer receipts plus 75×50 mm job tickets and employee QR cards, via an in-house print package",
            "Customer profiles with measurements per garment type and bulk Excel import",
            "WhatsApp updates via AskEva; sales, pending-order and production-performance reports with exports",
        ],
        color: "#EA580C",
    },
    {
        id: "boat-rental",
        index: 4,
        title: "Boat Rental Booking Marketplace",
        status: "Live",
        description: "Marketplace platform where operators manage boat listings and complete bookings end-to-end, with Buoy Insurance API integrated directly into the booking flow for on-demand rental coverage.",
        techStack: ["Laravel", "Buoy Insurance API"],
        highlights: [
            "Operator-facing listing and booking management",
            "Buoy Insurance embedded at the point of booking",
            "On-demand rental coverage for customers",
        ],
        color: "#7C3AED",
    },
]);
export type ProjectId = (typeof projects)[number]["id"];

/** About › "Also contributed to". `kind` picks the icon and colour. */
export const additionalWork: SideWork[] = [
    { kind: "web", text: "Developed custom WordPress themes and plugins for 5+ client websites, delivering tailored PHP solutions aligned to branding and functional requirements." },
    { kind: "mobile", text: "Built and shipped features for an Android mobile app using Flutter and Dart, integrating REST APIs across multiple screens and navigation flows." },
    { kind: "cms", text: "Performed Joomla CMS version upgrades for multiple client sites, validating backward compatibility with zero data loss." },
];

export const education: Education[] = [
    {
        id: "bsc",
        degree: "Bachelor of Science (B.Sc.) in Mathematics",
        shortDegree: "B.Sc. Mathematics",
        institution: "Kalaignar Karunanidhi Government Arts and Science College",
        board: "Thiruvalluvar University, Tamil Nadu",
        duration: "June 2017 – May 2020",
        grade: "69%",
    },
    // {
    //   id: "hsc",
    //   degree: "Higher Secondary Certificate (HSC) — Class XII",
    //   institution: "Danish Mission HR Secondary School, Tiruvannamalai",
    //   board: "Tamil Nadu State Board",
    //   duration: "March 2017",
    //   grade: "82.58%",
    // },
    // {
    //   id: "sslc",
    //   degree: "Secondary School Leaving Certificate (SSLC) — Class X",
    //   institution: "Danish Mission HR Secondary School, Tiruvannamalai",
    //   board: "Tamil Nadu State Board",
    //   duration: "March 2015",
    //   grade: "85.6%",
    // },
];
