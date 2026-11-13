import { contact, currentRole, headline, yearsOfExperience } from "@/data/resume";
import { normalizeUrl } from "@/lib/url";

/**
 * Canonical site URL (no trailing slash).
 * - Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
 * - Otherwise falls back to Vercel's production URL (set automatically at build time).
 * - Outside Vercel with neither set, it is localhost — set NEXT_PUBLIC_SITE_URL
 *   for any other production host.
 */
export const siteUrl =
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    "http://localhost:3000";

export const siteTitle = `${contact.name} — ${headline}`;

export const siteDescription = `${currentRole?.role ?? contact.title} with ${yearsOfExperience}+ years building production ERP, CRM, and SaaS applications in Laravel, React JS, MySQL, and REST APIs.`;
