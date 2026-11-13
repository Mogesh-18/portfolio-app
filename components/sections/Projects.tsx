import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accent } from "@/components/ui/Accent";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { FeaturedCard, ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/resume";

export function Projects() {
    const live = projects.filter(p => p.status === "Live").length;
    const [featured, ...rest] = projects;

    return (
        <section id="projects" aria-labelledby="projects-title" className="section-y">
            <div className="wrap">
                <SectionHeader
                    index={3}
                    label="Selected Projects"
                    titleId="projects-title"
                    title={<>Production applications, <Accent>in daily use.</Accent></>}
                    description="ERP, CRM and marketplace platforms built end-to-end — APIs, databases, dashboards and the integrations that tie them together."
                    meta={`${live} of ${projects.length} currently live · open any for the case study`}
                />

                <SpotlightGroup className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {featured && <FeaturedCard p={featured} />}
                    {rest.map((p, i) => (
                        <ProjectCard key={p.id} p={p} i={i} wide={rest.length % 2 === 1 && i === rest.length - 1} />
                    ))}
                </SpotlightGroup>
            </div>
        </section>
    );
}
