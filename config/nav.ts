import type { NavLink } from "@/types";

const section = (label: string, id: string): NavLink => ({ label, id, href: `/#${id}` });

export const NAV_LINKS: NavLink[] = [
    section("About", "about"),
    section("Experience", "experience"),
    section("Projects", "projects"),
    section("Skills", "skills"),
    section("Contact", "contact"),
];
