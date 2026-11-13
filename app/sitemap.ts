import type { MetadataRoute } from "next";
import { projects } from "@/data/resume";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    return [
        { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
        ...projects.map(p => ({
            url: `${siteUrl}/projects/${p.id}`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.7,
        })),
    ];
}
