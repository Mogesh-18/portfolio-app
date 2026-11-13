import { ArrowRight, Download } from "lucide-react";
import { contact, experiences, marqueeStack, primaryStack, yearsOfExperience } from "@/data/resume";
import { formatTenure } from "@/lib/dates";
import { delay } from "@/lib/utils";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/ui/Magnetic";
import { CvLink } from "@/components/ui/CvLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

/* Full-width marquee with faded edges; pauses on hover/focus and under reduced motion */
function Marquee() {
    const doubled = [...marqueeStack, ...marqueeStack];
    return (
        <div className="marquee edge-mask relative overflow-hidden border-y border-border py-4">
            <div className="marquee-track" aria-hidden>
                {doubled.map((s, i) => (
                    <span key={i} className="flex items-center gap-6 px-3">
                        <span className="whitespace-nowrap font-mono text-[13px] text-fg-2">{s}</span>
                        <span className="text-fg-3/60 text-xs shrink-0">/</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

const iconBtn =
    "grid h-11 w-11 place-items-center rounded-full border border-border bg-bg-card/70 backdrop-blur text-fg-2 " +
    "transition-colors duration-200 hover:text-accent hover:border-accent";

export function Hero() {
    const current = experiences[0];
    const initials = `${contact.firstName[0] ?? ""}${contact.lastName[0] ?? ""}`;

    return (
        <section id="home" aria-label="Introduction" className="relative min-h-[100svh] flex flex-col overflow-hidden">
            {/* Backdrop: masked dot grid + soft accent glows */}
            <div aria-hidden className="bg-dots pointer-events-none absolute inset-0" />
            <div aria-hidden className="pointer-events-none absolute -top-48 right-[-10%] h-[560px] w-[760px] rounded-full bg-v-violet/20 blur-[120px]" />
            <div aria-hidden className="pointer-events-none absolute bottom-0 -left-40 h-[360px] w-[520px] rounded-full bg-v-pink/10 blur-[120px]" />

            <div className="wrap relative flex flex-1 items-center pt-28 pb-12 sm:pt-32">
                <div className="grid w-full gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-24 items-center">
                    <div className="min-w-0">
                        <p className="enter inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-bg-card/70 backdrop-blur mb-7 max-w-full">
                            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="t-label text-fg-2 truncate">{contact.availability}</span>
                        </p>

                        <h1>
                            <span className="line-mask t-display text-fg">
                                <span style={delay(60)}>{contact.firstName}</span>
                            </span>{" "}
                            <span className="line-mask t-display bg-[image:var(--grad-brand)] bg-clip-text text-transparent print:bg-none print:text-fg">
                                <span style={delay(160)}>{contact.lastName}</span>
                            </span>
                        </h1>

                        <p className="enter mt-6 text-lg sm:text-2xl font-medium tracking-tight text-fg leading-snug" style={delay(320)}>
                            {contact.title} <span className="text-fg-3">&amp;</span> Technical Lead
                            <span className="block mt-2 font-mono text-[13px] font-normal tracking-normal text-fg-3">
                                {primaryStack.slice(0, 4).join(" · ")} · {yearsOfExperience}+ yrs
                            </span>
                        </p>

                        <p className="enter mt-5 text-[15px] sm:text-base text-fg-2 leading-relaxed max-w-xl" style={delay(400)}>
                            I build production ERP, CRM, and SaaS applications end-to-end — owning API
                            architecture, database design, React dashboards, and CI/CD pipelines.
                        </p>

                        <div data-print="hide" className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(480)}>
                            <Magnetic>
                                <a
                                    href="#projects"
                                    className="group inline-flex items-center gap-2 px-5 py-3 bg-[image:var(--grad-solid)] text-white font-semibold text-sm rounded-full transition-[filter] duration-300 hover:brightness-110 shadow-[0_10px_30px_-10px_var(--v-violet)]"
                                >
                                    See my work
                                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
                                </a>
                            </Magnetic>

                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-5 py-3 border border-border hover:border-accent bg-bg-card/70 backdrop-blur text-fg hover:text-accent font-semibold text-sm rounded-full transition-colors duration-200"
                            >
                                Get in touch
                            </a>

                            {contact.resumeUrl && (
                                <CvLink
                                    href={contact.resumeUrl}
                                    source="hero"
                                    className="inline-flex items-center gap-2 px-4 py-3 text-fg-2 hover:text-accent font-semibold text-sm rounded-full transition-colors duration-200"
                                >
                                    <Download size={15} strokeWidth={2} aria-hidden />
                                    Download CV
                                </CvLink>
                            )}

                            <span aria-hidden className="mx-1 hidden h-6 w-px bg-border sm:block" />

                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={iconBtn}>
                                <LinkedInIcon size={16} />
                            </a>
                            {contact.github && (
                                <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className={iconBtn}>
                                    <GitHubIcon size={16} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* "Now" status panel */}
                    {current && (
                        <aside
                            aria-label="Current status"
                            className="enter relative w-full min-w-0 rounded-2xl border border-border bg-bg-card/80 backdrop-blur p-5 sm:p-6"
                            style={{ ...delay(560), boxShadow: "var(--shadow-3)" }}
                        >
                            {/* top hairline glow */}
                            <span aria-hidden className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-v-violet/70 to-transparent" />

                            <div className="flex items-center gap-4">
                                <div className="relative shrink-0" aria-hidden>
                                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--grad-solid)] font-semibold tracking-tight text-lg text-white shadow-[0_8px_24px_-10px_var(--accent-solid)]">
                                        {initials}
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-bg-card bg-emerald-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="t-label text-fg-3">Now</p>
                                    <p className="mt-1 font-semibold tracking-tight text-fg leading-snug">{current.role}</p>
                                    <p className="text-sm text-fg-2 truncate">@ {current.company}</p>
                                </div>
                            </div>

                            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border pt-5 text-sm">
                                <div>
                                    <dt className="t-label text-fg-3">Tenure</dt>
                                    <dd className="mt-1 font-mono text-fg">{formatTenure(current.startDate, current.endDate)}</dd>
                                </div>
                                <div>
                                    <dt className="t-label text-fg-3">Local time</dt>
                                    <dd className="mt-1 font-mono text-fg">
                                        <LocalTime timeZone={contact.timezone} label={contact.timezoneLabel} />
                                    </dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="t-label text-fg-3">Based in</dt>
                                    <dd className="mt-1 text-fg">{contact.locationShort} · open to relocate</dd>
                                </div>
                                {current.team && (
                                    <div className="col-span-2">
                                        <dt className="t-label text-fg-3">Team</dt>
                                        <dd className="mt-1 text-fg">{current.team}</dd>
                                    </div>
                                )}
                            </dl>

                            <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-5" aria-label="Primary stack">
                                {primaryStack.map(s => (
                                    <li key={s} className="rounded-md border border-accent/20 bg-accent-t px-2 py-0.5 text-xs font-medium text-accent">{s}</li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </div>
            </div>

            <Marquee />
        </section>
    );
}
