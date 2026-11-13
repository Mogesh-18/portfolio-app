import { ArrowRight, Download } from "lucide-react";
import { contact, currentRole, marqueeStack, primaryStack, yearsOfExperience } from "@/data/resume";
import { formatTenure } from "@/lib/dates";
import { delay } from "@/lib/utils";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/ui/Magnetic";
import { CvLink } from "@/components/ui/CvLink";
import { SOCIAL_ICON } from "@/components/ui/BrandIcons";
import { buttonVariants } from "@/components/ui/Button";
import { iconButtonVariants } from "@/components/ui/IconButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { LiveDot } from "@/components/ui/LiveDot";
import { Tag } from "@/components/ui/Tag";
import { socialLinks } from "@/lib/social";

/* Full-width marquee with faded edges; pauses on hover/focus and under reduced motion */
function Marquee() {
    const doubled = [...marqueeStack, ...marqueeStack];
    return (
        <div className="marquee edge-mask relative overflow-hidden border-y border-border py-4">
            <div className="marquee-track" aria-hidden>
                {doubled.map((s, i) => (
                    <span key={i} className="flex items-center gap-6 px-3">
                        <span className="whitespace-nowrap font-mono text-13 text-fg-2">{s}</span>
                        <span className="text-fg-3/60 text-xs shrink-0">/</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Hero() {
    const current = currentRole;
    const initials = `${contact.firstName[0] ?? ""}${contact.lastName[0] ?? ""}`;

    return (
        <section id="home" aria-label="Introduction" className="relative flex flex-col overflow-hidden">
            {/* Backdrop: masked dot grid + soft accent glows */}
            <div aria-hidden className="bg-dots pointer-events-none absolute inset-0" />
            <div aria-hidden className="pointer-events-none absolute -top-48 right-[-10%] h-[560px] w-[760px] rounded-full bg-v-violet/20 blur-[120px]" />
            <div aria-hidden className="pointer-events-none absolute bottom-0 -left-40 h-[360px] w-[520px] rounded-full bg-v-pink/10 blur-[120px]" />

            <div className="wrap relative pt-24 pb-14 sm:pt-28 lg:pb-20">
                <div className="grid w-full gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-24 items-center">
                    <div className="min-w-0">
                        <p className="enter inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-bg-card/70 backdrop-blur mb-7 max-w-full">
                            <LiveDot />
                            <span className="t-label text-fg-2 truncate">{contact.availability}</span>
                        </p>

                        <h1>
                            <span className="line-mask t-display text-fg">
                                <span style={delay(60)}>{contact.firstName}</span>
                            </span>{" "}
                            <span className="line-mask t-display bg-grad-brand bg-clip-text text-transparent print:bg-none print:text-fg">
                                <span style={delay(160)}>{contact.lastName}</span>
                            </span>
                        </h1>

                        <p className="enter mt-6 text-lg sm:text-2xl font-medium tracking-tight text-fg leading-snug" style={delay(320)}>
                            {contact.title} <span className="text-fg-3">&amp;</span> {contact.secondaryTitle}
                            <span className="block mt-2 font-mono text-13 font-normal tracking-normal text-fg-3">
                                {primaryStack.slice(0, 4).join(" · ")} · {yearsOfExperience}+ yrs
                            </span>
                        </p>

                        <p className="enter mt-5 text-15 sm:text-base text-fg-2 leading-relaxed max-w-xl" style={delay(400)}>
                            I build production ERP, CRM, and SaaS applications end-to-end — owning API
                            architecture, database design, React dashboards, and CI/CD pipelines.
                        </p>

                        <div data-print="hide" className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(480)}>
                            <Magnetic>
                                <a
                                    href="#projects"
                                    className={buttonVariants({ size: "lg", className: "group" })}
                                >
                                    See my work
                                    <ArrowRight size={15} strokeWidth={2.2} aria-hidden className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
                                </a>
                            </Magnetic>

                            <a
                                href="#contact"
                                className={buttonVariants({ variant: "secondary", size: "lg" })}
                            >
                                Get in touch
                            </a>

                            {contact.resumeUrl && (
                                <CvLink
                                    href={contact.resumeUrl}
                                    source="hero"
                                    className={buttonVariants({ variant: "ghost", size: "lg", className: "px-4" })}
                                >
                                    <Download size={15} strokeWidth={2} aria-hidden />
                                    Download CV
                                </CvLink>
                            )}

                            <span aria-hidden className="mx-1 hidden h-6 w-px bg-border sm:block" />

                            {socialLinks(contact).map(({ id, label, href }) => {
                                const Icon = SOCIAL_ICON[id];
                                return (
                                    <ExternalLink key={id} href={href} aria-label={label} className={iconButtonVariants()}>
                                        <Icon size={16} />
                                    </ExternalLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* "Now" status panel */}
                    {current && (
                        <aside
                            aria-label="Current status"
                            className="enter relative w-full min-w-0 rounded-2xl border border-border bg-bg-card/80 backdrop-blur p-5 sm:p-6 shadow-elev-3"
                            style={delay(560)}
                        >
                            {/* top hairline glow */}
                            <span aria-hidden className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-v-violet/70 to-transparent" />

                            <div className="flex items-center gap-4">
                                <div className="relative shrink-0" aria-hidden>
                                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-grad-solid font-semibold tracking-tight text-lg text-white shadow-[0_8px_24px_-10px_var(--accent-solid)]">
                                        {initials}
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-[3px] border-bg-card bg-v-emerald" />
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
                                    <dd className="mt-1 text-fg">{contact.locationShort} · {contact.relocation.toLowerCase()}</dd>
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
                                    <Tag key={s} variant="accent" size="sm" className="text-xs">{s}</Tag>
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
