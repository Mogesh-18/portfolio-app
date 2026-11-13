import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, CalendarRange, FileText, Hammer, Layers, Plug, Target, Trophy,
    type LucideIcon,
} from "lucide-react";
import { ProjectCover, projectTone } from "@/components/projects/ProjectCover";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/Accent";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { ButtonLink, buttonVariants } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Tag } from "@/components/ui/Tag";
import { ToneIcon } from "@/components/ui/ToneIcon";
import { contact, integrations, projects } from "@/data/resume";
import type { Project } from "@/types";
import { cn, delay } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
    return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const p = projects.find(x => x.id === slug);
    if (!p) return {};
    const description = p.tagline ?? p.description;
    return {
        title: p.title,
        description,
        alternates: { canonical: `/projects/${p.id}` },
        openGraph: { type: "article", url: `/projects/${p.id}`, title: p.title, description },
        twitter: { card: "summary_large_image", title: p.title, description },
    };
}

/** "Industrial Job Management ERP" → "Industrial Job Management" + <Accent>ERP</Accent> */
function AccentTitle({ title }: { title: string }) {
    const cut = title.lastIndexOf(" ");
    if (cut < 0) return <>{title}</>;
    return <>{title.slice(0, cut)} <Accent>{title.slice(cut + 1)}</Accent></>;
}

/** One chapter of the case-study timeline: a node on the rail (lights up as it scrolls into view), eyebrow, title, content */
function Chapter({ n, id, icon: Icon, label, title, children }: {
    n: string;
    id: string;
    icon: LucideIcon;
    label: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <li id={id} className="relative scroll-mt-28 pb-16 last:pb-0 sm:pb-20">
            <span
                aria-hidden
                className="tl-dot absolute -left-14 sm:-left-20 top-0 grid h-10 w-10 place-items-center rounded-full border-4 border-bg bg-(--tone) text-white ring-1 ring-border shadow-[0_0_0_6px_color-mix(in_oklch,var(--tone)_14%,transparent)]"
            >
                <Icon size={15} strokeWidth={2.2} />
            </span>
            <section aria-labelledby={`${id}-title`}>
                <Reveal className="mb-6 pt-1.5">
                    <p className="t-label flex items-center gap-2.5 text-fg-3">
                        <span aria-hidden className="font-mono">{n}</span>
                        <span aria-hidden className="h-px w-6 bg-(--tone)/50" />
                        {label}
                    </p>
                    <h2 id={`${id}-title`} className="t-h2 mt-2 text-fg text-balance">{title}</h2>
                </Reveal>
                {children}
            </section>
        </li>
    );
}

/** Previous / next project: a numbered thumbnail in the project's colours (the full cover is unreadable this small) */
function NeighbourCard({ dir, p }: { dir: "Previous" | "Next"; p: Project }) {
    const next = dir === "Next";
    return (
        <Link
            href={`/projects/${p.id}`}
            style={projectTone(p)}
            className={cn(
                "tone-project group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-bg-card p-4 shadow-elev-1",
                "transition-[border-color,translate,box-shadow] duration-300 ease-expo hover:-translate-y-0.5 hover:border-(--tone)/40 hover:shadow-[0_20px_40px_-24px_var(--tone)]",
                next && "flex-row-reverse text-right"
            )}
        >
            <span
                aria-hidden
                className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-tone-solid shadow-[0_8px_20px_-10px_var(--tone)] transition-transform duration-500 ease-expo group-hover:scale-105"
            >
                <span className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.22)_1px,transparent_1px)] bg-[size:7px_7px]" />
                <span className="relative font-mono text-base font-semibold text-white">{String(p.index).padStart(2, "0")}</span>
            </span>
            <span className="min-w-0 flex-1">
                <span className="t-label text-fg-3">{dir} project</span>
                <span className="mt-1 block font-semibold leading-snug tracking-tight text-fg transition-colors duration-200 group-hover:text-(--tone) line-clamp-2">
                    {p.title}
                </span>
            </span>
            <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-fg-2 transition-[background-color,border-color,color,translate] duration-300 ease-expo group-hover:border-transparent group-hover:bg-tone-solid group-hover:text-white"
            >
                {next
                    ? <ArrowRight size={15} className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
                    : <ArrowLeft size={15} className="transition-transform duration-300 ease-expo group-hover:-translate-x-0.5" />}
            </span>
        </Link>
    );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const i = projects.findIndex(x => x.id === slug);
    const p = projects[i];
    if (!p) notFound();

    const prev = projects[(i - 1 + projects.length) % projects.length];
    const next = projects[(i + 1) % projects.length];
    const usedIntegrations = integrations.filter(x => p.techStack.some(t => t.startsWith(x.name)));
    const num = String(p.index).padStart(2, "0");
    const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(`About: ${p.title}`)}`;

    const facts: { icon: LucideIcon; label: string; value: ReactNode }[] = [
        ...(p.role ? [{ icon: Briefcase, label: "Role", value: p.role }] : []),
        ...(p.year ? [{ icon: CalendarRange, label: "Timeline", value: p.year }] : []),
        ...(usedIntegrations.length ? [{ icon: Plug, label: "Integrations", value: usedIntegrations.map(x => x.name).join(", ") }] : []),
    ];

    /* Chapter numbers skip sections without content (problem, outcome are optional) */
    const chapterIds = ["overview", p.problem && "problem", "built", p.outcome && "outcome", "stack"].filter(Boolean);
    const chapterNo = (id: string) => String(chapterIds.indexOf(id) + 1).padStart(2, "0");

    return (
        <main id="main" tabIndex={-1} style={projectTone(p)} className="tone-project relative overflow-x-clip">
            {/* ── Hero: story on the left, "At a glance" panel on the right ── */}
            <header className="relative overflow-hidden pt-24 sm:pt-28">
                <div aria-hidden className="bg-dots pointer-events-none absolute inset-0" />
                <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full bg-(--tone)/20 blur-[120px]" />
                <div aria-hidden className="pointer-events-none absolute top-40 -left-40 h-[360px] w-[520px] rounded-full bg-(--tone-2)/12 blur-[120px]" />

                <div className="wrap relative">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="enter flex flex-wrap items-center gap-2">
                        <Link
                            href="/#projects"
                            className="group inline-flex items-center gap-2 rounded-full border border-border bg-bg-card/70 py-1.5 pl-2.5 pr-3.5 t-label text-fg-2 backdrop-blur transition-colors duration-200 hover:border-(--tone)/40 hover:text-fg"
                        >
                            <ArrowLeft size={13} aria-hidden className="transition-transform duration-300 ease-expo group-hover:-translate-x-0.5" />
                            All projects
                        </Link>
                        <span aria-hidden className="text-fg-3">/</span>
                        <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-card/70 py-1 pl-1 pr-3.5 backdrop-blur">
                            <span className="rounded-full bg-tone-solid px-2 py-0.5 font-mono text-2xs font-medium text-white">{num}</span>
                            <span className="t-label text-fg-2">Case study</span>
                        </span>
                    </nav>

                    <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-14 xl:gap-20">
                        <div className="min-w-0">
                            <h1 className="enter t-h1 text-fg text-balance" style={delay(80)}>
                                <AccentTitle title={p.title} />
                            </h1>
                            <p className="enter mt-6 max-w-2xl text-lg sm:text-xl text-fg-2 leading-relaxed text-pretty" style={delay(150)}>
                                {p.tagline ?? p.description}
                            </p>

                            <div data-print="hide" className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(220)}>
                                {p.url && (
                                    <ExternalLink href={p.url} className={buttonVariants({ size: "lg" })}>
                                        Visit live site <ArrowUpRight size={15} aria-hidden />
                                    </ExternalLink>
                                )}
                                <ButtonLink href={mailto} variant={p.url ? "secondary" : "primary"} size="lg">
                                    Discuss a similar project <ArrowRight size={15} aria-hidden />
                                </ButtonLink>
                                <ButtonLink href="#built" variant="ghost" size="lg" className="px-3">
                                    Jump to features
                                </ButtonLink>
                            </div>
                        </div>

                        {/* At a glance */}
                        <aside
                            aria-label="At a glance"
                            className="enter relative w-full min-w-0 rounded-2xl border border-border bg-bg-card/80 p-5 sm:p-6 backdrop-blur shadow-elev-3"
                            style={delay(260)}
                        >
                            <span aria-hidden className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-(--tone)/70 to-transparent" />

                            <div className="flex items-center gap-4">
                                <span aria-hidden className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-tone-solid shadow-[0_8px_24px_-10px_var(--tone)]">
                                    <span className="absolute inset-0 bg-[radial-gradient(oklch(1_0_0/0.22)_1px,transparent_1px)] bg-[size:7px_7px]" />
                                    <span className="relative font-mono text-lg font-semibold text-white">{num}</span>
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="t-label text-fg-3">At a glance</p>
                                    <div className="mt-1.5"><StatusBadge p={p} /></div>
                                </div>
                            </div>

                            <dl className="mt-5 space-y-4 border-t border-border pt-5 text-sm">
                                {facts.map(f => (
                                    <div key={f.label} className="flex gap-3">
                                        <ToneIcon icon={f.icon} size="sm" strokeWidth={2} />
                                        <div className="min-w-0">
                                            <dt className="t-label text-fg-3">{f.label}</dt>
                                            <dd className="mt-1 leading-snug text-fg">{f.value}</dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>

                            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-5" aria-label="Tech stack">
                                {p.techStack.map(t => (
                                    <Tag key={t} size="sm" className="text-xs border-(--tone)/20 bg-(--tone)/8 text-fg">{t}</Tag>
                                ))}
                            </ul>
                        </aside>
                    </div>

                    {/* Cover */}
                    <div className="enter relative mt-12" style={delay(340)}>
                        <div aria-hidden className="pointer-events-none absolute inset-x-10 -bottom-6 h-24 rounded-full bg-(--tone)/25 blur-3xl" />
                        <div className="relative rounded-3xl border border-border bg-bg-card p-2 sm:p-3 shadow-elev-3">
                            <ProjectCover p={p} large className="hidden sm:block h-[26rem] lg:h-[32rem]" />
                            <ProjectCover p={p} className="h-60 sm:hidden" />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Body: the case study as a timeline ─────────────────
                Same scroll-drawn rail + glowing head as the Experience section
                (.timeline / .rail-fill / .rail-head / .tl-dot), in the project's colours. */}
            <div className="wrap section-y">
                <div className="timeline relative max-w-5xl pl-14 sm:pl-20">
                    <span aria-hidden className="absolute left-[19px] top-5 bottom-5 w-px bg-border" />
                    <span aria-hidden className="rail-fill absolute left-[18px] top-5 bottom-5 w-[3px] rounded-full bg-[linear-gradient(to_bottom,var(--tone),var(--tone-2))]" />
                    <span aria-hidden className="absolute left-[19px] top-5 bottom-5 w-px">
                        <span className="rail-head absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--tone) shadow-[0_0_0_4px_color-mix(in_oklch,var(--tone)_22%,transparent),0_0_22px_6px_color-mix(in_oklch,var(--tone)_45%,transparent)]" />
                    </span>

                    <ol>
                        <Chapter n={chapterNo("overview")} id="overview" icon={FileText} label="Overview" title="What it is">
                            <Reveal>
                                <p className="max-w-3xl text-15 sm:text-lg text-fg-2 leading-relaxed text-pretty">{p.description}</p>
                            </Reveal>
                        </Chapter>

                        {p.problem && (
                            <Chapter n={chapterNo("problem")} id="problem" icon={Target} label="The problem" title="Why it was needed">
                                <Reveal className="relative max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg-card p-6 sm:p-8 shadow-elev-1">
                                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-tone-grad" />
                                    <p className="text-15 sm:text-lg text-fg leading-relaxed text-pretty">{p.problem}</p>
                                </Reveal>
                            </Chapter>
                        )}

                        <Chapter n={chapterNo("built")} id="built" icon={Hammer} label="What I built" title="Key features">
                            <SpotlightGroup>
                                <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
                                    {p.highlights.map((h, j) => (
                                        <Reveal
                                            as="li"
                                            key={h}
                                            delay={(j % 2) * 60}
                                            className="spotlight relative flex gap-4 rounded-2xl border border-border bg-bg-card p-5 sm:p-6 shadow-elev-1 transition-[border-color,translate] duration-300 ease-expo hover:-translate-y-0.5 hover:border-(--tone)/40"
                                        >
                                            <span aria-hidden className="font-mono text-sm font-medium bg-tone-grad bg-clip-text text-transparent pt-0.5 print:bg-none print:text-fg">
                                                {String(j + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-15 text-fg-2 leading-relaxed">{h}</span>
                                        </Reveal>
                                    ))}
                                </ul>
                            </SpotlightGroup>
                        </Chapter>

                        {p.outcome && (
                            <Chapter n={chapterNo("outcome")} id="outcome" icon={Trophy} label="Outcome" title="The result">
                                <Reveal className="relative max-w-3xl overflow-hidden rounded-2xl border border-(--tone)/30 bg-(--tone)/8 p-6 sm:p-8">
                                    <p className="text-xl sm:text-2xl font-medium tracking-tight text-fg leading-snug text-balance">{p.outcome}</p>
                                </Reveal>
                            </Chapter>
                        )}

                        <Chapter n={chapterNo("stack")} id="stack" icon={Layers} label="Stack & integrations" title="Built with">
                            {usedIntegrations.length > 0 && (
                                <ul className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-3">
                                    {usedIntegrations.map((x, j) => (
                                        <Reveal
                                            as="li"
                                            key={x.name}
                                            delay={j * 50}
                                            className="flex items-center gap-3 rounded-xl border border-border bg-bg-card p-3.5 min-w-0 shadow-elev-1"
                                        >
                                            <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-tone-solid font-mono text-sm font-semibold text-white">
                                                {x.name[0]}
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block truncate text-sm font-semibold text-fg">{x.name}</span>
                                                <span className="block truncate font-mono text-2xs text-fg-3">{x.note}</span>
                                            </span>
                                        </Reveal>
                                    ))}
                                </ul>
                            )}
                            <Reveal as="ul" className="flex flex-wrap gap-2">
                                {p.techStack.map(t => <Tag key={t} size="lg">{t}</Tag>)}
                            </Reveal>
                        </Chapter>
                    </ol>
                </div>

                {/* CTA */}
                <Reveal className="relative mt-20 overflow-hidden rounded-3xl border border-border bg-bg-card/60 backdrop-blur shadow-elev-3">
                    <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-(--tone)/80 to-transparent" />
                    <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
                    <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-(--tone)/15 blur-3xl" />
                    <div className="relative flex flex-col gap-6 p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="t-h2 text-fg text-balance">Need something <Accent>similar?</Accent></p>
                            <p className="mt-3 max-w-xl text-fg-2">I design, build and lead end-to-end ERP, CRM and SaaS platforms, from schema and APIs to dashboards and integrations.</p>
                        </div>
                        <div data-print="hide" className="flex shrink-0 flex-wrap gap-3">
                            <ButtonLink href={mailto} size="lg">Get in touch <ArrowRight size={15} aria-hidden /></ButtonLink>
                            <ButtonLink href="/#projects" variant="secondary" size="lg">More projects</ButtonLink>
                        </div>
                    </div>
                </Reveal>

                {/* Prev / next */}
                {prev && next && projects.length > 1 && (
                    <nav aria-label="More projects" data-print="hide" className="mt-6 grid gap-3 sm:grid-cols-2">
                        <NeighbourCard dir="Previous" p={prev} />
                        <NeighbourCard dir="Next" p={next} />
                    </nav>
                )}
            </div>
        </main>
    );
}
