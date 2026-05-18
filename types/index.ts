export interface ContactInfo {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    openToRelocate: boolean;
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
    duration: string;
    tenure: string;
    type: string;
    highlights: string[];
    tags: string[];
}

export interface Project {
    id: string;
    index: number;
    title: string;
    status: "Live" | "Archived" | "In Progress";
    description: string;
    techStack: string[];
    highlights: string[];
    color: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    board: string;
    duration: string;
    grade: string;
}

export interface ResumeData {
    contact: ContactInfo;
    summary: string;
    stats: StatItem[];
    skillGroups: SkillGroup[];
    experiences: Experience[];
    projects: Project[];
    additionalWork: string[];
    education: Education[];
}

export type NavLink = { label: string; href: string };
