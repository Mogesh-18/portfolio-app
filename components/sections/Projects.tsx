"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { projects } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function ProjectRow({ p }: { p: Project }) {
    const { ref, visible } = useReveal({ threshold: 0.08 });

    return (
        <article ref={ref}
            className={cn(
                "reveal group",
                "grid lg:grid-cols-[56px_1fr_auto] gap-4 lg:gap-8",
                "px-5 sm:px-6 py-7 sm:py-8",
                "border-b border-border last:border-0",
                "hover:bg-bg-2 transition-colors duration-250",
                visible && "in"
            )}
            style={{ transitionDelay: `${(p.index - 1) * 80}ms` }}
        >
            <div className="hidden lg:flex items-start pt-1 shrink-0">
                <span className="font-extrabold text-3xl leading-none transition-colors duration-300 select-none" style={{ color: visible ? p.color : "var(--fg-3)" }} >
                    {String(p.index).padStart(2, "0")}
                </span>
            </div>

            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="lg:hidden font-bold text-xs text-fg-3 shrink-0">
                        {String(p.index).padStart(2, "0")}
                    </span>

                    <span
                        className="inline-flex items-center gap-1.5 t-label px-2 py-0.5 rounded-full border shrink-0"
                        style={{
                            color: p.color,
                            background:
                                p.index === 1 ? "var(--p1-t)"
                                    : p.index === 2 ? "var(--p2-t)"
                                        : p.index === 3 ? "var(--p3-t)"
                                            : "var(--p4-t)",
                            borderColor: `${p.color}33`,
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                            style={{ background: p.color }}
                        />
                        {p.status}
                    </span>
                </div>

                <h3
                    className="t-h2 text-fg group-hover:text-accent transition-colors duration-300 leading-tight mb-3 break-words"
                >
                    {p.title}
                </h3>

                <p className="text-sm text-fg-2 leading-relaxed mb-4">{p.description}</p>

                <ul className="space-y-1.5 mb-4">
                    {p.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm text-fg-2 min-w-0">
                            <span
                                className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                                style={{ background: p.color }}
                            />
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map(t => (
                        <span
                            key={t}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-border bg-bg-2 text-fg-2 group-hover:border-border-2 transition-colors duration-200"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="hidden lg:flex items-start pt-1 shrink-0">
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-fg-3 group-hover:border-accent group-hover:text-accent transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </div>
            </div>
        </article>
    );
}

export function Projects() {
    const { ref, visible } = useReveal();

    return (
        <section id="projects" className="section-y bg-bg-2">
            <div className="wrap">
                <div ref={ref} className={cn("reveal mb-8", visible && "in")}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="t-label text-accent">03</span>
                        <div className="h-px w-10 bg-accent" />
                        <span className="t-label text-fg-3">Selected Projects</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                        <h2 className="t-h1 text-fg">Production Applications</h2>
                        <p className="text-sm font-semibold text-fg-3 shrink-0">4 of 4 currently live</p>
                    </div>
                </div>

                <div className="bg-bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-2)" }} >
                    {projects.map(p => <ProjectRow key={p.id} p={p} />)}
                </div>
            </div>
        </section>
    );
}
