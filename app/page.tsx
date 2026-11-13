import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { contact, currentRole, skillGroups, summary, type SkillCategory } from "@/data/resume";
import { siteUrl } from "@/config/site";

/** Skill categories listed as `knowsAbout` in the JSON-LD */
const KNOWS_ABOUT: SkillCategory[] = ["Backend", "Frontend", "Database"];

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.name,
    url: siteUrl,
    jobTitle: currentRole?.role ?? contact.title,
    description: summary,
    email: `mailto:${contact.email}`,
    worksFor: currentRole && { "@type": "Organization", name: currentRole.companyFull },
    address: {
        "@type": "PostalAddress",
        addressLocality: contact.address.locality,
        addressRegion: contact.address.region,
        addressCountry: contact.address.country,
    },
    sameAs: [contact.linkedin, contact.github].filter(Boolean),
    knowsAbout: skillGroups
        .filter(g => KNOWS_ABOUT.includes(g.category))
        .flatMap(g => g.skills),
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
            />
            <main id="main" tabIndex={-1}>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Skills />
                <Contact />
            </main>
        </>
    );
}
