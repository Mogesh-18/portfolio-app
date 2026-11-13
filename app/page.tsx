import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { contact, experiences, skillGroups, summary } from "@/data/resume";
import { siteUrl } from "@/lib/site";

/* Rebuild the static page daily so computed values (years, tenure, © year) stay current. */
export const revalidate = 86400;

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.name,
    url: siteUrl,
    jobTitle: experiences[0]?.role ?? contact.title,
    description: summary,
    email: `mailto:${contact.email}`,
    worksFor: experiences[0] && { "@type": "Organization", name: experiences[0].companyFull },
    address: {
        "@type": "PostalAddress",
        addressLocality: "Tiruvannamalai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
    },
    sameAs: [contact.linkedin, contact.github].filter(Boolean),
    knowsAbout: skillGroups
        .filter(g => ["Backend", "Frontend", "Database"].includes(g.category))
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
