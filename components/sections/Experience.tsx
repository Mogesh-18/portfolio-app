import { Fragment } from "react";
import { Briefcase, CalendarClock, MapPin, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accent } from "@/components/ui/Accent";
import { experiences } from "@/data/resume";
import { formatRange, formatTenure } from "@/lib/dates";

/** Emphasise numbers ("30%", "4+", "6") inside a highlight sentence. */
function withMetrics(text: string) {
    return text.split(/(\d+(?:\.\d+)?\+?%?)/g).map((part, i) =>
        i % 2 === 1
            ? <strong key={i} className="font-mono font-medium text-fg">{part}</strong>
            : <Fragment key={i}>{part}</Fragment>
    );
}

/** "Webtrendz Technologies" → "WT" */
const monogram = (name: string) =>
    name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join("");

export function Experience() {
    return (
        <section id="experience" aria-labelledby="experience-title" className="section-y">
            <div className="wrap">
                <SectionHeader
                    index={2}
                    label="Experience"
                    titleId="experience-title"
                    title={<>Building, leading, <Accent>shipping.</Accent></>}
                    description="Four-plus years at one company, from writing the first schema to leading the team that ships on it."
                />

                <ol className="space-y-16">
                    {experiences.map(exp => {
                        const isCurrent = !exp.endDate;
                        return (
                            <li key={exp.id} className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-16">
                                {/* Role card — sticks while the highlights scroll past */}
                                <Reveal className="lg:sticky lg:top-28 self-start">
                                    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-6" style={{ boxShadow: "var(--shadow-2)" }}>
                                        <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

                                        <div className="relative flex items-center gap-3">
                                            <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-t font-mono text-sm font-medium text-accent">
                                                {monogram(exp.company)}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="font-semibold tracking-tight text-fg leading-snug">{exp.company}</p>
                                                {isCurrent && (
                                                    <p className="mt-1 inline-flex items-center gap-1.5 t-label text-emerald-700 dark:text-emerald-400">
                                                        <span className="relative flex h-1.5 w-1.5" aria-hidden>
                                                            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        </span>
                                                        Current role
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <h3 className="relative mt-6 t-h2 text-fg">{exp.role}</h3>
                                        <p className="relative mt-1 text-sm text-fg-2">{exp.companyFull}</p>

                                        <dl className="relative mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                                            {[
                                                { icon: CalendarClock, label: "Dates", value: `${formatRange(exp.startDate, exp.endDate)} · ${formatTenure(exp.startDate, exp.endDate)}` },
                                                { icon: Briefcase, label: "Type", value: exp.type },
                                                { icon: MapPin, label: "Location", value: exp.location },
                                                ...(exp.team ? [{ icon: Users, label: "Team", value: exp.team }] : []),
                                            ].map(({ icon: Icon, label, value }) => (
                                                <div key={label} className="flex items-start gap-3">
                                                    <dt className="flex items-center gap-2 pt-px text-fg-3">
                                                        <Icon size={14} aria-hidden />
                                                        <span className="sr-only">{label}</span>
                                                    </dt>
                                                    <dd className="text-fg-2">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>

                                        <ul className="relative mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                                            {exp.tags.map(tag => (
                                                <li key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md border border-border bg-bg-2 text-fg-2">
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>

                                {/* Timeline: the rail draws in and a glowing head rides its tip as
                                    the list scrolls through the viewport (CSS scroll-driven animations) */}
                                <div className="timeline relative pl-10 sm:pl-12">
                                    <span aria-hidden className="absolute left-[9px] top-3 bottom-3 w-px bg-border" />
                                    <span aria-hidden className="rail-fill absolute left-[8px] top-3 bottom-3 w-[3px] rounded-full bg-[linear-gradient(to_bottom,var(--v-indigo),var(--v-violet)_50%,var(--v-pink))]" />
                                    <span aria-hidden className="absolute left-[9px] top-3 bottom-3 w-px">
                                        <span className="rail-head absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-v-pink shadow-[0_0_0_4px_color-mix(in_oklch,var(--v-pink)_22%,transparent),0_0_22px_6px_color-mix(in_oklch,var(--v-violet)_55%,transparent)]" />
                                    </span>

                                    <p className="t-label mb-5 text-fg-3">Key achievements</p>

                                    <ul className="space-y-3">
                                        {exp.highlights.map((h, i) => (
                                            <Reveal as="li" key={i} delay={i * 70} className="relative">
                                                <span
                                                    aria-hidden
                                                    className="tl-dot absolute -left-10 sm:-left-12 top-5 h-[19px] w-[19px] rounded-full border-[4px] border-bg bg-v-violet ring-1 ring-border shadow-[0_0_0_5px_color-mix(in_oklch,var(--v-violet)_14%,transparent)]"
                                                />
                                                <div className="group rounded-xl border border-transparent p-4 sm:p-5 transition-colors duration-300 hover:border-border hover:bg-bg-card">
                                                    <p className="flex gap-4 text-[15px] text-fg-2 leading-relaxed">
                                                        <span aria-hidden className="font-mono text-xs pt-1 bg-[image:var(--grad-brand)] bg-clip-text text-transparent font-medium">{String(i + 1).padStart(2, "0")}</span>
                                                        <span>{withMetrics(h)}</span>
                                                    </p>
                                                </div>
                                            </Reveal>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
