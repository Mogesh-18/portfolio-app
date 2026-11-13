import { Database, MonitorSmartphone, Plug, Server, Smartphone, Users, Workflow, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accent } from "@/components/ui/Accent";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { ToneIcon } from "@/components/ui/ToneIcon";
import { Tag } from "@/components/ui/Tag";
import { integrations, primaryStack, skillGroups, type CoreTech, type SkillCategory } from "@/data/resume";
import { tone, type ToneName, type TonePair } from "@/lib/tone";
import { cn } from "@/lib/utils";

/* Icon + colour pair for each category — keyed by the categories in data/resume.ts,
   so adding a category without a style fails typecheck */
const CATEGORY: Record<SkillCategory, { icon: LucideIcon; tone: TonePair }> = {
    "Backend": { icon: Server, tone: ["indigo", "violet"] },
    "Frontend": { icon: MonitorSmartphone, tone: ["cyan", "blue"] },
    "Database": { icon: Database, tone: ["amber", "orange"] },
    "Integrations": { icon: Plug, tone: ["violet", "fuchsia"] },
    "Mobile & CMS": { icon: Smartphone, tone: ["pink", "fuchsia"] },
    "DevOps & Tools": { icon: Wrench, tone: ["emerald", "cyan"] },
    "Leadership": { icon: Users, tone: ["orange", "pink"] },
};
/* Integration chips cycle through these */
const INTEGRATION_TONES: ToneName[] = ["indigo", "emerald", "cyan", "amber", "pink", "violet"];

/* Core stack tiles: colour + short label of what each is used for (one per primaryStack entry) */
const CORE: Record<CoreTech, { tone: TonePair; role: string; icon: LucideIcon }> = {
    "Laravel": { tone: ["pink", "orange"], role: "Backend & APIs", icon: Server },
    "React JS": { tone: ["cyan", "blue"], role: "Dashboards & UI", icon: MonitorSmartphone },
    "MySQL": { tone: ["amber", "orange"], role: "Schema & data", icon: Database },
    "REST API": { tone: ["violet", "fuchsia"], role: "Contracts & integrations", icon: Plug },
    "Jenkins": { tone: ["emerald", "cyan"], role: "CI/CD pipelines", icon: Workflow },
};

/** A skill counts as "primary" when it starts with one of the primary-stack names. */
const isPrimary = (skill: string) =>
    primaryStack.some(p => skill.toLowerCase().startsWith(p.toLowerCase()));

export function Skills() {
    return (
        <section id="skills" aria-labelledby="skills-title" className="section-y">
            <div className="wrap">
                <SectionHeader
                    index={4}
                    label="Stack & Expertise"
                    titleId="skills-title"
                    title={<>The toolkit, <Accent>end to end.</Accent></>}
                    description="From database schema to deployment pipeline — the tools I use daily, and the wider kit around them."
                />

                {/* Core stack */}
                <h3 className="t-label mb-4 text-fg-3">Core stack</h3>
                <SpotlightGroup className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {primaryStack.map((name, i) => {
                        const c = CORE[name];
                        const Icon = c.icon;
                        return (
                            <Reveal
                                key={name}
                                delay={i * 60}
                                style={tone(...c.tone)}
                                className={cn(
                                    "spotlight group/core relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5",
                                    "transition-[border-color,translate] duration-300 ease-expo hover:-translate-y-1 hover:border-(--tone)/45",
                                    i === primaryStack.length - 1 && "col-span-2 sm:col-span-1"
                                )}
                            >
                                <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-(--tone)/20 blur-2xl transition-opacity duration-500 opacity-70 group-hover/core:opacity-100" />
                                <span aria-hidden className="relative grid h-11 w-11 place-items-center rounded-xl bg-tone-solid text-white shadow-[0_10px_24px_-10px_var(--tone)]">
                                    <Icon size={20} strokeWidth={1.75} />
                                </span>
                                <p className="relative mt-5 text-lg font-semibold tracking-tight text-fg">{name}</p>
                                <p className="relative mt-0.5 text-xs text-fg-2">{c.role}</p>
                            </Reveal>
                        );
                    })}
                </SpotlightGroup>

                {/* All categories */}
                <h3 className="t-label mb-4 mt-12 text-fg-3">Everything else</h3>
                <SpotlightGroup className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {skillGroups.map((g, i) => {
                        const c = CATEGORY[g.category];
                        const Icon = c.icon;
                        return (
                            <Reveal
                                key={g.category}
                                delay={(i % 4) * 60}
                                style={tone(...c.tone)}
                                className={cn(
                                    "spotlight group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-6",
                                    "transition-[border-color,translate] duration-300 ease-expo hover:-translate-y-1 hover:border-(--tone)/40"
                                )}
                            >
                                {/* colour edge */}
                                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tone-grad-x opacity-80" />

                                <div className="mb-5 flex items-center gap-3">
                                    <ToneIcon
                                        icon={Icon}
                                        size="xl"
                                        className="transition-colors duration-300 group-hover/card:bg-tone-solid group-hover/card:text-white group-hover/card:ring-transparent"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-semibold tracking-tight text-fg leading-tight">{g.category}</h4>
                                        <p className="font-mono text-2xs text-fg-3">{g.skills.length} skills</p>
                                    </div>
                                </div>

                                <ul className="flex flex-wrap gap-1.5">
                                    {g.skills.map(skill => {
                                        const primary = isPrimary(skill);
                                        return (
                                            <Tag
                                                key={skill}
                                                className={cn(
                                                    "transition-colors duration-150",
                                                    primary
                                                        ? "border-(--tone)/40 bg-(--tone)/10 text-fg"
                                                        : "hover:border-(--tone)/40 hover:text-fg"
                                                )}
                                            >
                                                {primary && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-(--tone)" />}
                                                {skill}
                                                {primary && <span className="sr-only"> (core stack)</span>}
                                            </Tag>
                                        );
                                    })}
                                </ul>
                            </Reveal>
                        );
                    })}

                    {/* Integrations wall — completes the last row */}
                    <Reveal
                        style={tone("violet", "pink")}
                        className="spotlight relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-6 lg:col-span-2 xl:col-span-1"
                    >
                        <span aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-v-violet/20 blur-3xl" />
                        <div className="relative mb-5 flex items-center gap-3">
                            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-grad-solid text-white">
                                <Plug size={18} strokeWidth={1.75} />
                            </span>
                            <div>
                                <h4 className="font-semibold tracking-tight text-fg leading-tight">Shipped integrations</h4>
                                <p className="font-mono text-2xs text-fg-3">{integrations.length} production APIs</p>
                            </div>
                        </div>
                        <ul className="relative grid grid-cols-2 gap-2">
                            {integrations.map(({ name, note }, j) => (
                                <li
                                    key={name}
                                    style={tone(INTEGRATION_TONES[j % INTEGRATION_TONES.length] ?? "indigo")}
                                    className="flex items-center gap-2.5 rounded-lg border border-border bg-bg-2/70 p-2.5 min-w-0 transition-colors duration-200 hover:border-(--tone)/40"
                                >
                                    <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-(--tone)/15 font-mono text-xs font-semibold text-(--tone) ring-1 ring-(--tone)/25">
                                        {name[0]}
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block truncate text-13 font-semibold text-fg">{name}</span>
                                        <span className="block truncate font-mono text-[10px] text-fg-3">{note}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </SpotlightGroup>
            </div>
        </section>
    );
}
