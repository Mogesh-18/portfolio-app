import type { ReactNode } from "react";
import { ArrowUpRight, Briefcase, FileText, Handshake, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accent } from "@/components/ui/Accent";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Magnetic } from "@/components/ui/Magnetic";
import { ContactForm } from "@/components/ui/ContactForm";
import { LocalTime } from "@/components/ui/LocalTime";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { contact } from "@/data/resume";
import { cn } from "@/lib/utils";

type Channel = { label: string; val: string; href: string; icon: ReactNode; ext?: boolean };

const OPEN_TO = [
    { label: "Full-time roles", icon: Briefcase },
    { label: "Contract engagements", icon: FileText },
    { label: "Technical consulting", icon: Handshake },
];

function ChannelCards({ channels }: { channels: Channel[] }) {
    return (
        <ul className="grid gap-3">
            {channels.map(({ label, val, href, icon, ext }) => (
                <li key={label}>
                    <a
                        href={href}
                        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 rounded-xl border border-border bg-bg-2/60 p-4 transition-[border-color,background-color,translate] duration-300 ease-expo hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg-card"
                    >
                        <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-card text-fg-2 transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent-t group-hover:text-accent">
                            {icon}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="t-label block text-fg-3">{label}</span>
                            <span className="mt-0.5 block truncate text-sm font-medium text-fg group-hover:text-accent transition-colors duration-200">{val}</span>
                        </span>
                        <ArrowUpRight
                            size={18}
                            aria-hidden
                            className="shrink-0 text-fg-3 transition-all duration-300 ease-expo group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        {ext && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function Contact() {
    // The form only renders once a Resend API key is configured (Vercel env var)
    const formEnabled = Boolean(process.env.RESEND_API_KEY);

    const channels: Channel[] = [
        { label: "LinkedIn", val: contact.linkedinHandle, href: contact.linkedin, icon: <LinkedInIcon size={17} />, ext: true },
        ...(contact.github
            ? [{
                label: "GitHub", val: contact.github.replace(/^https?:\/\/(www\.)?github\.com\//, ""),
                href: contact.github, icon: <GitHubIcon size={17} />, ext: true,
            }]
            : []),
        { label: "Phone", val: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, icon: <Phone size={17} strokeWidth={1.75} /> },
    ];

    return (
        <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

            <div className="wrap relative">
                <SectionHeader
                    index={5}
                    label="Contact"
                    titleId="contact-title"
                    title={<>Have a project in mind? <Accent>Let&apos;s talk.</Accent></>}
                    description="Hiring, building something, or need a second pair of eyes on an architecture — I'd like to hear about it."
                />

                <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-bg-card/60 backdrop-blur" style={{ boxShadow: "var(--shadow-3)" }}>
                    {/* Panel decoration: top hairline glow + masked dot grid */}
                    <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-v-violet/80 to-transparent" />
                    <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-50" />

                    <div className="relative grid lg:grid-cols-[1.15fr_1fr]">
                        {/* Left: pitch + email */}
                        <div className="min-w-0 p-6 sm:p-10">
                            <ul className="flex flex-wrap gap-2">
                                {OPEN_TO.map(({ label, icon: Icon }) => (
                                    <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-2 px-3 py-1.5 text-xs font-medium text-fg-2">
                                        <Icon size={13} aria-hidden className="text-accent" />
                                        {label}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-6 text-base sm:text-lg text-fg-2 max-w-lg leading-relaxed">
                                {formEnabled
                                    ? "Tell me about the product, the team, or the role — send a message or email me directly."
                                    : "Tell me about the product, the team, or the role. Email is the fastest way to reach me."}
                            </p>

                            <a href={`mailto:${contact.email}`} className="group mt-8 inline-block max-w-full">
                                <span
                                    className="block font-semibold text-fg leading-none break-all border-b-2 border-border-2 pb-2 transition-colors duration-300 group-hover:text-accent group-hover:border-accent"
                                    style={{ fontSize: "clamp(1.5rem, 4.4vw, 3.25rem)", letterSpacing: "-0.045em" }}
                                >
                                    {contact.email}
                                </span>
                            </a>

                            <div data-print="hide" className="mt-8 flex flex-wrap items-center gap-3">
                                <Magnetic>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[image:var(--grad-solid)] text-white font-semibold text-sm transition-[filter] duration-300 hover:brightness-110 shadow-[0_10px_30px_-10px_var(--v-violet)]"
                                    >
                                        <Mail size={15} strokeWidth={2} aria-hidden />
                                        Email me
                                    </a>
                                </Magnetic>
                                <CopyEmail email={contact.email} source="contact" />
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6">
                                <p className="inline-flex items-center gap-2">
                                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                                        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="t-label text-emerald-700 dark:text-emerald-400">{contact.availability}</span>
                                </p>
                                <p className="font-mono text-xs text-fg-3">
                                    {contact.locationShort} · <LocalTime timeZone={contact.timezone} label={contact.timezoneLabel} />
                                </p>
                            </div>

                            {/* With the form on the right, the channels sit here as compact cards */}
                            {formEnabled && (
                                <div className="mt-8">
                                    <ChannelCards channels={channels} />
                                </div>
                            )}
                        </div>

                        {/* Right: form, or channel cards */}
                        <div className={cn("min-w-0 border-t border-border bg-bg-card/80 p-6 sm:p-10 lg:border-t-0 lg:border-l")}>
                            {formEnabled ? (
                                <div data-print="hide">
                                    <h3 className="font-semibold tracking-tight text-fg text-xl">Send a message</h3>
                                    <p className="mt-1 mb-6 text-sm text-fg-2">Goes straight to my inbox.</p>
                                    <ContactForm />
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-semibold tracking-tight text-fg text-xl">Elsewhere</h3>
                                    <p className="mt-1 mb-6 text-sm text-fg-2">Prefer another channel? Reach me here.</p>
                                    <ChannelCards channels={channels} />
                                </>
                            )}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
