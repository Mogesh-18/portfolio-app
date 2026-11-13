import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProjectCover, projectTone } from "@/components/projects/ProjectCover";
import { StatusBadge } from "@/components/projects/StatusBadge";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/** Accessible stretched link: the whole card is clickable, the title is the link text. */
function CardLink({ p, className }: { p: Project; className?: string }) {
    return (
        <Link
            href={`/projects/${p.id}`}
            className={cn(
                "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
                "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-(--tone)",
                // inset ring: the card is overflow-hidden, so an outside ring would be clipped
                className
            )}
        >
            {p.title}
        </Link>
    );
}

function OpenArrow() {
    return (
        <span
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-fg-2 transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-tone-solid group-hover:text-white"
        >
            <ArrowUpRight size={17} strokeWidth={2} />
        </span>
    );
}

function Stack({ p, max }: { p: Project; max: number }) {
    return (
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {p.techStack.slice(0, max).map(t => (
                <Tag key={t} variant="mono" size="sm">{t}</Tag>
            ))}
            {p.techStack.length > max && (
                <li className="rounded-md px-1.5 py-0.5 font-mono text-2xs text-fg-3">+{p.techStack.length - max}</li>
            )}
        </ul>
    );
}

const cardBase =
    "spotlight tone-project group relative overflow-hidden rounded-3xl border border-border bg-bg-card " +
    "transition-[border-color,translate,box-shadow] duration-500 ease-expo " +
    "shadow-elev-2 hover:-translate-y-1 hover:border-(--tone)/40 hover:shadow-[0_30px_60px_-30px_var(--tone)]";

export function FeaturedCard({ p }: { p: Project }) {
    return (
        <Reveal as="article" className={cn(cardBase, "md:col-span-full grid lg:grid-cols-[1.25fr_1fr]")} style={projectTone(p)}>
            <div className="p-3 sm:p-4">
                {/* The detailed large illustration from sm up; the compact one on phones */}
                <ProjectCover p={p} large className="hidden sm:block sm:h-80 lg:h-full lg:min-h-[26rem]" />
                <ProjectCover p={p} className="h-56 sm:hidden" />
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:pl-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-tone-solid px-2.5 py-0.5 t-label text-white">Featured</span>
                    <StatusBadge p={p} />
                    {p.year && <span className="font-mono text-xs text-fg-3">{p.year}</span>}
                </div>

                <h3 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-[-0.035em] text-fg leading-[1.05] text-balance">
                    <CardLink p={p} />
                </h3>
                <p className="mt-4 text-15 text-fg-2 leading-relaxed">{p.tagline ?? p.description}</p>

                <ul className="mt-6 space-y-2.5">
                    {p.highlights.map((h, j) => (
                        <li key={j} className="flex gap-3 text-sm text-fg-2">
                            <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-(--tone)/15 text-(--tone)">
                                <Check size={12} strokeWidth={2.5} />
                            </span>
                            {h}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <Stack p={p} max={6} />
                    <OpenArrow />
                </div>
            </div>
        </Reveal>
    );
}

export function ProjectCard({ p, i, wide }: { p: Project; i: number; wide: boolean }) {
    return (
        <Reveal as="article" delay={i * 80} className={cn(cardBase, "flex flex-col", wide && "md:col-span-2 xl:col-span-1")} style={projectTone(p)}>
            <div className="p-3">
                <ProjectCover p={p} className="h-52" />
            </div>
            <div className="flex flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-fg-3">{String(p.index).padStart(2, "0")}</span>
                    <StatusBadge p={p} />
                    {p.year && <span className="font-mono text-xs text-fg-3">{p.year}</span>}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg leading-snug text-balance">
                    <CardLink p={p} />
                </h3>
                <p className="mt-2.5 text-sm text-fg-2 leading-relaxed line-clamp-3">{p.tagline ?? p.description}</p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <Stack p={p} max={3} />
                    <OpenArrow />
                </div>
            </div>
        </Reveal>
    );
}

