import { contact, yearsOfExperience } from "@/data/resume";

/**
 * Canonical site URL.
 * - Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
 * - Otherwise falls back to Vercel's production URL (set automatically at build time).
 */
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000");

export const siteTitle = `${contact.name} — ${contact.title} & Technical Lead`;

export const siteDescription = `Senior Full Stack Developer with ${yearsOfExperience}+ years building production ERP, CRM, and SaaS applications in Laravel, React JS, MySQL, and REST APIs.`;
