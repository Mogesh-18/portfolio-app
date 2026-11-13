import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { contact, integrations, projects } from "@/data/resume";
import { delay } from "@/lib/utils";

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Reveal as="div" className="grid gap-4 border-t border-border py-10 md:grid-cols-[220px_1fr] md:gap-10">
            <h2 className="t-label text-fg-3 pt-1">{title}</h2>
            <div className="min-w-0">{children}</div>
        </Reveal>
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

    const facts: { label: string; value: React.ReactNode }[] = [
        { label: "Status", value: <StatusBadge p={p} /> },
        ...(p.role ? [{ label: "Role", value: p.role }] : []),
        ...(p.year ? [{ label: "Year", value: p.year }] : []),
        { label: "Stack", value: p.techStack.join(", ") },
    ];

    return (
        <main id="main" tabIndex={-1} className="pt-32 sm:pt-40 pb-20">
            <article className="wrap">
                <Link
                    href="/#projects"
                    className="enter group inline-flex items-center gap-2 t-label text-fg-2 hover:text-accent transition-colors duration-200"
                >
                    <ArrowLeft size={14} aria-hidden className="transition-transform duration-300 ease-expo group-hover:-translate-x-0.5" />
                    All projects
                </Link>

                <header className="mt-10 max-w-4xl">
                    <p className="enter t-label flex items-center gap-3" style={delay(60)}>
                        <span className="text-accent">[{String(p.index).padStart(2, "0")}]</span>
                        <span aria-hidden className="h-px w-10 bg-border-2" />
                        <span className="text-fg-3">Case study</span>
                    </p>
                    <h1 className="enter mt-5 t-h1 text-fg text-balance" style={delay(120)}>{p.title}</h1>
                    <p className="enter mt-6 text-lg text-fg-2 leading-relaxed text-pretty" style={delay(180)}>
                        {p.description}
                    </p>
                    {p.url && (
                        <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="enter mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-solid hover:bg-accent-solid-2 text-white font-semibold text-sm transition-colors duration-200"
                            style={delay(240)}
                        >
                            Visit live site <ArrowUpRight size={15} aria-hidden />
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    )}
                </header>

                <dl className="enter mt-10 flex flex-wrap gap-px overflow-hidden rounded-xl border border-border bg-border" style={delay(240)}>
                    {facts.map(f => (
                        <div key={f.label} className="flex-1 basis-56 bg-bg-card px-5 py-4">
                            <dt className="t-label text-fg-3">{f.label}</dt>
                            <dd className="mt-2 text-sm text-fg">{f.value}</dd>
                        </div>
                    ))}
                </dl>

                <div className="enter mt-6" style={delay(300)}>
                    <ProjectCover p={p} large className="h-64 sm:h-96" />
                </div>

                <div className="mt-14">
                    {p.problem && (
                        <Section title="The problem">
                            <p className="text-base text-fg-2 leading-relaxed max-w-2xl">{p.problem}</p>
                        </Section>
                    )}

                    <Section title="What I built">
                        <ul className="space-y-4 max-w-2xl">
                            {p.highlights.map((h, j) => (
                                <li key={j} className="flex gap-4 text-base text-fg-2 leading-relaxed">
                                    <span className="font-mono text-xs text-accent pt-1.5">{String(j + 1).padStart(2, "0")}</span>
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    {p.outcome && (
                        <Section title="Outcome">
                            <p className="text-xl font-medium tracking-tight text-fg leading-snug max-w-2xl">{p.outcome}</p>
                        </Section>
                    )}

                    {usedIntegrations.length > 0 && (
                        <Section title="Integrations">
                            <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border grid-cols-2 sm:grid-cols-3 max-w-2xl">
                                {usedIntegrations.map(x => (
                                    <li key={x.name} className="bg-bg-card px-4 py-3">
                                        <p className="font-semibold text-sm text-fg">{x.name}</p>
                                        <p className="font-mono text-[11px] text-fg-3">{x.note}</p>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    <Section title="Tech stack">
                        <ul className="flex flex-wrap gap-2">
                            {p.techStack.map(t => (
                                <li key={t} className="px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-bg-2 text-fg-2">{t}</li>
                            ))}
                        </ul>
                    </Section>
                </div>

                {/* CTA */}
                <Reveal className="mt-6 rounded-xl border border-border bg-bg-card p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={{ boxShadow: "var(--shadow-2)" }}>
                    <div>
                        <p className="t-h2 text-fg">Need something similar?</p>
                        <p className="mt-2 text-fg-2">I build and lead end-to-end ERP, CRM and SaaS projects.</p>
                    </div>
                    <a
                        href={`mailto:${contact.email}?subject=${encodeURIComponent(`About: ${p.title}`)}`}
                        className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-solid hover:bg-accent-solid-2 text-white font-semibold text-sm transition-colors duration-200"
                    >
                        Get in touch <ArrowRight size={15} aria-hidden />
                    </a>
                </Reveal>

                {/* Prev / next */}
                {prev && next && projects.length > 1 && (
                    <nav aria-label="More projects" className="mt-10 grid gap-3 sm:grid-cols-2">
                        {[{ dir: "Previous", item: prev }, { dir: "Next", item: next }].map(({ dir, item }) => (
                            <Link
                                key={dir}
                                href={`/projects/${item.id}`}
                                className={`group rounded-xl border border-border bg-bg-card p-5 transition-colors duration-200 hover:border-border-2 ${dir === "Next" ? "sm:text-right" : ""}`}
                            >
                                <span className="t-label text-fg-3">{dir}</span>
                                <span className="mt-2 block font-semibold tracking-tight text-fg group-hover:text-accent transition-colors duration-200">{item.title}</span>
                            </Link>
                        ))}
                    </nav>
                )}
            </article>
        </main>
    );
}
