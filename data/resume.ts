import type { ContactInfo, SkillGroup, Experience, Project, Education, StatItem } from "@/types";
import { yearsSince } from "@/lib/dates";

/** First professional role ("YYYY-MM"). Years of experience everywhere is computed from this. */
export const careerStart = "2022-06";
export const yearsOfExperience = yearsSince(careerStart);

export const contact: ContactInfo = {
    name: "Mogesh Umapathi",
    firstName: "Mogesh",
    lastName: "Umapathi",
    title: "Full Stack Developer",
    email: "mogesh13@gmail.com",
    phone: "+91 82705 18820",
    linkedin: "https://www.linkedin.com/in/mogesh-umapathi-712878308",
    linkedinHandle: "mogesh-umapathi",
    github: "https://github.com/Mogesh-18",
    // Drop your CV at public/resume.pdf and uncomment to show "Download CV" buttons:
    // resumeUrl: "/resume.pdf",
    location: "Tiruvannamalai, Tamil Nadu, India",
    locationShort: "Tiruvannamalai, IN",
    timezone: "Asia/Kolkata",
    timezoneLabel: "IST",
    availability: "Available · Open to relocate",
};

export const summary = `Full Stack Developer and Technical Lead with ${yearsOfExperience}+ years of hands-on experience building production ERP, CRM, and SaaS web applications. I own the full development lifecycle — API architecture, database schema design, React JS dashboards, third-party integrations, CI/CD pipelines, and team mentorship.`;

/** Short stack line shown under the Hero title */
export const primaryStack = ["Laravel", "React JS", "MySQL", "REST API", "Jenkins"];

/** Scrolling marquee in the Hero */
export const marqueeStack = [
    "Laravel", "React JS", "MySQL", "REST API", "Jenkins", "PHP OOP",
    "Eloquent ORM", "Redux", "JWT Auth", "Git", "Agile / Scrum", "Flutter",
    "WordPress", "Twilio", "SendGrid", "QuickBooks", "cPanel", "CI/CD",
];

export const integrations = [
    { name: "Ozonetel", note: "VoIP / CTI" },
    { name: "Twilio", note: "WhatsApp" },
    { name: "SendGrid", note: "Email" },
    { name: "QuickBooks", note: "Invoicing" },
    { name: "AskEva", note: "WA Notifications" },
    { name: "Buoy", note: "Insurance API" },
];

/** Headline metrics — shown as count-up tiles in the About bento */
export const stats: StatItem[] = [
    { value: `${yearsOfExperience}+`, label: "Years shipping production software" },
    { value: "4+", label: "ERP / CRM apps built from scratch" },
    { value: String(integrations.length), label: "Third-party APIs integrated" },
    { value: "40%", label: "Less PR rework after mentoring" },
];

export const skillGroups: SkillGroup[] = [
    {
        category: "Backend",
        skills: ["Laravel", "PHP (OOP)", "RESTful API Design", "Eloquent ORM", "MVC Architecture", "Service Layer Design", "JWT Authentication", "Webhook Integration"],
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
        skills: ["Ozonetel (CTI)", "Twilio (WhatsApp)", "SendGrid (Email)", "QuickBooks (Invoicing)", "AskEva", "Buoy Insurance API"],
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
];

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
            "Integrated 6 third-party APIs across live client systems: Ozonetel (VoIP telephony), Twilio (WhatsApp messaging), SendGrid (transactional email), QuickBooks (invoicing automation), AskEva, and Buoy Insurance API.",
            "Managed CI/CD pipelines using Jenkins for automated deployment of 6+ production applications; administered cPanel hosting, DNS configuration, and SSL certificate setup and renewal.",
        ],
        tags: ["Laravel", "React JS", "MySQL", "Jenkins", "REST API", "Team Lead"],
    },
];

export const projects: Project[] = [
    {
        id: "real-estate-crm",
        index: 1,
        title: "Real Estate & Property Management CRM",
        status: "Live",
        description: "Full-featured real estate CRM for lead management, property listings, and customer communication — including a React JS admin dashboard, a Laravel-powered website, and separate REST APIs for two mobile apps.",
        techStack: ["Laravel", "React JS", "MySQL", "Ozonetel", "Twilio", "SendGrid"],
        highlights: [
            "Agent telephony via Ozonetel VoIP CTI integration",
            "WhatsApp messaging pipeline built on Twilio",
            "Automated transactional emails via SendGrid",
            "Dual REST APIs powering two separate mobile apps",
        ],
        color: "#2563EB",
    },
    {
        id: "industrial-erp",
        index: 2,
        title: "Industrial Job Management ERP",
        status: "Live",
        description: "End-to-end ERP for a metal manufacturing firm handling job quotes, production workflow cards, and fully automated invoicing via QuickBooks — built with Laravel API and a React JS dashboard.",
        techStack: ["Laravel", "React JS", "QuickBooks API"],
        highlights: [
            "Job quote and production workflow card management",
            "QuickBooks API integration for automated invoice generation",
            "Eliminated manual billing effort across the manufacturing cycle",
        ],
        color: "#0D9488",
    },
    {
        id: "garment-crm",
        index: 3,
        title: "Garment Order & Production Tracking CRM",
        status: "Live",
        description: "CRM for a garment business tracking customer orders, production job stages, and invoices — with a proforma and billing module enabling structured invoice generation and automated financial calculations.",
        techStack: ["Laravel", "React JS", "AskEva"],
        highlights: [
            "Real-time WhatsApp customer notifications via AskEva",
            "Proforma and billing module with automated totals and tax calculation",
            "End-to-end order tracking across all production stages",
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
];

export const additionalWork = [
    "Developed custom WordPress themes and plugins for 5+ client websites, delivering tailored PHP solutions aligned to branding and functional requirements.",
    "Built and shipped features for an Android mobile app using Flutter and Dart, integrating REST APIs across multiple screens and navigation flows.",
    "Performed Joomla CMS version upgrades for multiple client sites, validating backward compatibility with zero data loss.",
];

export const education: Education[] = [
    {
        id: "bsc",
        degree: "Bachelor of Science (B.Sc.) in Mathematics",
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
