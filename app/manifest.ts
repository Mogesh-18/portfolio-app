import type { MetadataRoute } from "next";
import { contact } from "@/data/resume";
import { siteDescription } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${contact.name} — Portfolio`,
        short_name: contact.firstName,
        description: siteDescription,
        start_url: "/",
        display: "browser",
        background_color: "#FFFFFF",
        theme_color: "#4F46E5",
        icons: [
            { src: "/icon", sizes: "64x64", type: "image/png" },
            { src: "/apple-icon", sizes: "180x180", type: "image/png" },
        ],
    };
}
