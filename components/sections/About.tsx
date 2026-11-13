import type { CSSProperties, ReactNode } from "react";
import {
    Briefcase, CalendarClock, FileText, Globe, GitPullRequest, GraduationCap, Handshake,
    Layers, MapPin, Plug, RefreshCw, Smartphone, Sparkles, type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accent } from "@/components/ui/Accent";
import { CountUp } from "@/components/ui/CountUp";
import { LocalTime } from "@/components/ui/LocalTime";
import { SpotlightGroup } from "@/components/ui/Spotlight";
import { summary, additionalWork, contact, education, experiences, primaryStack, stats } from "@/data/resume";
import { formatRange, formatTenure } from "@/lib/dates";
import { cn } from "@/lib/utils";

/** Colour for a tile: drives its icon chip, spotlight glow and accents via --tone / --tone-2 */
const tone = (a: string, b = a) => ({ "--tone": `var(--v-${a})`, "--tone-2": `var(--v-${b})` } as CSSProperties);

function Tile({ className, delay, children, label, icon: Icon, toneStyle }: {
    className?: string;
    delay?: number;
    children: ReactNode;
    label?: string;
    icon?: LucideIcon;
    toneStyle: CSSProperties;
}) {
    return (
        <Reveal
            delay={delay}
            className={cn(
                "spotlight group/tile relative overflow-hidden rounded-2xl border border-border bg-bg-card p-5 sm:p-6 flex flex-col min-w-0",
                "transition-[border-color,translate] duration-300 ease-expo hover:-translate-y-1 hover:border-(--tone)/40",
                className
            )}
            style={{ ...toneStyle, boxShadow: "var(--shadow-1)" }}
        >
            {/* tone glow in the corner */}
            <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-(--tone)/15 blur-3xl transition-opacity duration-500 opacity-60 group-hover/tile:opacity-100" />
            {label && (
                <h3 className="relative t-label mb-4 flex items-center gap-2.5 text-fg-3">
                    {Icon && (
                        <span aria-hidden className="grid h-7 w-7 place-items-center rounded-lg bg-(--tone)/12 text-(--tone) ring-1 ring-(--tone)/25">
                            <Icon size={14} strokeWidth={2} />
                        </span>
                    )}
                    {label}
                </h3>
            )}
            <div className="relative flex flex-1 flex-col">{children}</div>
        </Reveal>
    );
}

/* Per-metric icon + colour pair, in the order of `stats` */
const STAT_STYLE: { icon: LucideIcon; tone: [string, string] }[] = [
    { icon: CalendarClock, tone: ["indigo", "violet"] },
    { icon: Layers, tone: ["violet", "fuchsia"] },
    { icon: Plug, tone: ["cyan", "blue"] },
    { icon: GitPullRequest, tone: ["pink", "orange"] },
];

/* Side-work icon + colour by keyword */
function workStyle(text: string): { icon: LucideIcon; tone: string } {
    if (/wordpress/i.test(text)) return { icon: Globe, tone: "cyan" };
    if (/flutter|android/i.test(text)) return { icon: Smartphone, tone: "emerald" };
    if (/joomla|upgrade|migrat/i.test(text)) return { icon: RefreshCw, tone: "orange" };
    return { icon: Sparkles, tone: "violet" };
}

const OPEN_TO = [
    { label: "Full-time roles", icon: Briefcase },
    { label: "Contract work", icon: FileText },
    { label: "Technical consulting", icon: Handshake },
];

export function About() {
    const current = experiences[0];
    const edu = education[0];

    return (
        <section id="about" aria-labelledby="about-title" className="section-y">
            <div className="wrap">
                <SectionHeader
                    index={1}
                    label="About"
                    titleId="about-title"
                    title={<>Shipping production software, <Accent>leading teams, owning outcomes.</Accent></>}
                    description="A snapshot of who I am, what I'm working on now, and the numbers behind the work."
                />

                <SpotlightGroup className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-12">
                    {/* Summary — the hero tile, with a brand-gradient mesh */}
                    <Tile className="sm:col-span-2 lg:col-span-7 lg:row-span-2" label="Summary" icon={Sparkles} toneStyle={tone("violet", "pink")}>
                        <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-v-indigo/15 blur-3xl" />
                        <p className="relative text-lg sm:text-xl text-fg leading-relaxed text-pretty tracking-[-0.01em]">{summary}</p>

                        <div className="relative mt-auto pt-8 space-y-5">
                            <div>
                                <p className="t-label text-fg-3 mb-2.5">Open to</p>
                                <ul className="flex flex-wrap gap-2">
                                    {OPEN_TO.map(({ label, icon: Icon }, i) => (
                                        <li
                                            key={label}
                                            style={tone(["indigo", "violet", "pink"][i] ?? "indigo")}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-(--tone)/30 bg-(--tone)/10 px-3 py-1.5 text-xs font-medium text-fg"
                                        >
                                            <Icon size={13} aria-hidden className="text-(--tone)" />
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="t-label text-fg-3 mb-2.5">Primary stack</p>
                                <ul className="flex flex-wrap gap-1.5">
                                    {primaryStack.map(s => (
                                        <li key={s} className="rounded-md border border-border bg-bg-2 px-2.5 py-1 font-mono text-xs text-fg">
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Tile>

                    {/* Currently */}
                    {current && (
                        <Tile className="sm:col-span-2 lg:col-span-5" delay={60} label="Currently" icon={Briefcase} toneStyle={tone("indigo", "violet")}>
                            <div className="flex items-start gap-4">
                                <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--grad-solid)] font-mono text-sm font-medium text-white shadow-[0_10px_24px_-10px_var(--v-violet)]">
                                    {current.company.split(/\s+/).slice(0, 2).map(w => w[0]).join("")}
                                </span>
                                <div className="min-w-0">
                                    <p className="font-semibold tracking-tight text-fg text-lg leading-snug">{current.role}</p>
                                    <p className="text-sm text-fg-2">@ {current.company}</p>
                                </div>
                            </div>
                            <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border">
                                <span className="pt-4 text-sm text-fg-2">{current.team}</span>
                                <span className="pt-4 font-mono text-xs text-fg-3">
                                    {formatRange(current.startDate, current.endDate)} · <span className="text-fg">{formatTenure(current.startDate, current.endDate)}</span>
                                </span>
                            </div>
                        </Tile>
                    )}

                    {/* Location + live time */}
                    <Tile className="sm:col-span-2 lg:col-span-5" delay={120} label="Based in" icon={MapPin} toneStyle={tone("emerald", "cyan")}>
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="font-semibold tracking-tight text-fg text-lg">{contact.locationShort}</p>
                                <p className="mt-1 text-sm text-fg-2">Open to relocate — immediately</p>
                            </div>
                            <p className="text-right">
                                <span className="block font-mono text-3xl tracking-tight text-fg leading-none">
                                    <LocalTime timeZone={contact.timezone} label="" />
                                </span>
                                <span className="mt-1 inline-flex items-center gap-1.5 t-label text-fg-3">
                                    <span className="relative flex h-1.5 w-1.5" aria-hidden>
                                        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-v-emerald opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-v-emerald" />
                                    </span>
                                    Local · {contact.timezoneLabel}
                                </span>
                            </p>
                        </div>
                    </Tile>

                    {/* Metrics — each in its own colour; number in a gradient, counts up in view */}
                    {stats.map((s, i) => {
                        const st = STAT_STYLE[i] ?? STAT_STYLE[0]!;
                        const Icon = st.icon;
                        const pct = s.value.endsWith("%") ? parseFloat(s.value) : null;
                        return (
                            <Tile key={s.label} delay={i * 60} className="lg:col-span-3 gap-6" toneStyle={tone(...st.tone)}>
                                <div className="flex items-start justify-between gap-3">
                                    <p className="font-mono font-medium text-5xl tracking-tighter leading-none bg-[linear-gradient(135deg,var(--tone),var(--tone-2))] bg-clip-text text-transparent print:bg-none print:text-fg">
                                        <CountUp value={s.value} />
                                    </p>
                                    <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-(--tone)/12 text-(--tone) ring-1 ring-(--tone)/25">
                                        <Icon size={17} strokeWidth={1.75} />
                                    </span>
                                </div>
                                <div className="mt-auto">
                                    <div aria-hidden className="mb-3 h-1.5 overflow-hidden rounded-full bg-bg-3">
                                        <div
                                            className="h-full rounded-full bg-[linear-gradient(90deg,var(--tone),var(--tone-2))]"
                                            style={{ width: `${pct ?? 100}%`, opacity: pct === null ? 0.35 : 1 }}
                                        />
                                    </div>
                                    <p className="text-sm text-fg-2 leading-snug">{s.label}</p>
                                </div>
                            </Tile>
                        );
                    })}

                    {/* Education */}
                    {edu && (
                        <Tile className="sm:col-span-2 lg:col-span-4" label="Education" icon={GraduationCap} toneStyle={tone("amber", "orange")}>
                            <p className="font-semibold tracking-tight text-fg text-lg leading-snug">
                                {edu.degree.replace(/^Bachelor of Science \(B\.Sc\.\) in /, "B.Sc. ")}
                            </p>
                            <p className="mt-1 text-sm text-fg-2 leading-snug">{edu.institution}</p>
                            <p className="mt-auto pt-5 font-mono text-xs text-fg-3">{edu.board} · {edu.duration}</p>
                        </Tile>
                    )}

                    {/* Side work */}
                    <Tile className="sm:col-span-2 lg:col-span-8" label="Also contributed to" icon={Layers} toneStyle={tone("cyan", "emerald")}>
                        <ul className="grid gap-3 md:grid-cols-3">
                            {additionalWork.map((item, i) => {
                                const ws = workStyle(item);
                                const Icon = ws.icon;
                                return (
                                    <li
                                        key={i}
                                        style={tone(ws.tone)}
                                        className="group/item rounded-xl border border-border bg-bg-2/60 p-4 text-sm text-fg-2 leading-relaxed min-w-0 transition-colors duration-300 hover:border-(--tone)/40"
                                    >
                                        <span aria-hidden className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-(--tone)/12 text-(--tone) ring-1 ring-(--tone)/25">
                                            <Icon size={15} strokeWidth={1.75} />
                                        </span>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </Tile>
                </SpotlightGroup>
            </div>
        </section>
    );
}
