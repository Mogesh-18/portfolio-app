import type { ReactNode } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accent } from "@/components/ui/Accent";
import { CopyEmail } from "@/components/features/contact/CopyEmail";
import { Magnetic } from "@/components/ui/Magnetic";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { LocalTime } from "@/components/ui/LocalTime";
import { SOCIAL_ICON } from "@/components/ui/BrandIcons";
import { buttonVariants } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { LiveDot } from "@/components/ui/LiveDot";
import { socialLinks } from "@/lib/social";
import { contact, openTo } from "@/data/resume";
import { OPEN_TO_ICON } from "@/config/icons";
import { cn } from "@/lib/utils";

type Channel = { label: string; val: string; href: string; icon: ReactNode; ext?: boolean };

function ChannelCards({ channels }: { channels: Channel[] }) {
    return (
        <ul className="grid gap-3">
            {channels.map(({ label, val, href, icon, ext }) => {
                const A = ext ? ExternalLink : "a";
                return (
                <li key={label}>
                    <A
                        href={href}
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
                    </A>
                </li>
                );
            })}
        </ul>
    );
}

export function Contact() {
    // The form only renders once a Resend API key is configured (Vercel env var)
    const formEnabled = Boolean(process.env.RESEND_API_KEY);

    const channels: Channel[] = [
        ...socialLinks(contact).map(({ id, label, href, handle }): Channel => {
            const Icon = SOCIAL_ICON[id];
            return { label, val: handle, href, icon: <Icon size={17} />, ext: true };
        }),
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

                <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-bg-card/60 backdrop-blur shadow-elev-3">
                    {/* Panel decoration: top hairline glow + masked dot grid */}
                    <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-v-violet/80 to-transparent" />
                    <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-50" />

                    <div className="relative grid lg:grid-cols-[1.15fr_1fr]">
                        {/* Left: pitch + email */}
                        <div className="min-w-0 p-6 sm:p-10">
                            <ul className="flex flex-wrap gap-2">
                                {openTo.map(({ kind, label }) => {
                                    const Icon = OPEN_TO_ICON[kind];
                                    return (
                                    <li key={kind} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-2 px-3 py-1.5 text-xs font-medium text-fg-2">
                                        <Icon size={13} aria-hidden className="text-accent" />
                                        {label}
                                    </li>
                                    );
                                })}
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
                                        className={buttonVariants()}
                                    >
                                        <Mail size={15} strokeWidth={2} aria-hidden />
                                        Email me
                                    </a>
                                </Magnetic>
                                <CopyEmail email={contact.email} source="contact" />
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6">
                                <p className="inline-flex items-center gap-2">
                                    <LiveDot />
                                    <span className="t-label text-success">{contact.availability}</span>
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
