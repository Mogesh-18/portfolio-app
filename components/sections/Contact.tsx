"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { contact } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Contact() {
    const { ref: rH, visible: vH } = useReveal({ threshold: 0.1 });
    const { ref: rE, visible: vE } = useReveal({ threshold: 0.1 });
    const { ref: rC, visible: vC } = useReveal({ threshold: 0.1 });

    return (
        <section id="contact" className="section-y overflow-x-hidden">
            <div className="wrap">
                <div ref={rH} className={cn("reveal mb-8", vH && "in")}>
                    <div className="flex items-center gap-3">
                        <span className="t-label text-accent">06</span>
                        <div className="h-px w-10 bg-accent" />
                        <span className="t-label text-fg-3">Contact</span>
                    </div>
                </div>

                <div ref={rE} className={cn("reveal mb-8", vE && "in")}>
                    <h2 className="t-h1 text-fg max-w-2xl leading-tight text-balance">
                        Have a project in mind?{" "}
                        <span className="text-fg-2 font-normal italic">Let&apos;s talk.</span>
                    </h2>
                    <p className="mt-4 text-base text-fg-2 max-w-lg leading-relaxed">
                        Open to full-time roles, contract engagements, and technical consulting.
                        Fastest way to reach me — email.
                    </p>
                </div>

                <div ref={rC} className={cn("reveal", vC && "in")}>
                    <a
                        href={`mailto:${contact.email}`}
                        className="group inline-block max-w-full"
                        aria-label={`Email ${contact.email}`}
                    >
                        <div
                            className="font-extrabold text-fg leading-none tracking-tight break-all
                         border-b-2 border-fg-3 pb-2 transition-colors duration-300
                         group-hover:text-accent group-hover:border-accent"
                            style={{
                                fontSize: "clamp(1.375rem, 4.5vw, 3.25rem)",
                                letterSpacing: "-0.025em",
                            }}
                        >
                            {contact.email}
                        </div>
                    </a>

                    <div className="mt-10 grid sm:grid-cols-3 gap-4">
                        {[
                            {
                                label: "Phone",
                                val: contact.phone,
                                href: `tel:${contact.phone.replace(/\s/g, "")}`,
                                ext: false,
                            },
                            {
                                label: "LinkedIn",
                                val: "mogesh-umapathi",
                                href: contact.linkedin,
                                ext: true,
                            },
                            {
                                label: "Location",
                                val: contact.location,
                                href: "#",
                                ext: false,
                            },
                        ].map(({ label, val, href, ext }) => (
                            <div
                                key={label}
                                className="p-5 rounded-2xl border border-border bg-bg-card hover:border-accent/40 transition-all duration-300 hover:shadow-md group min-w-0"
                                style={{ boxShadow: "var(--shadow-1)" }}
                            >
                                <p className="t-label text-fg-3 mb-2">{label}</p>
                                <a
                                    href={href}
                                    {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="text-sm font-semibold text-fg group-hover:text-accent transition-colors duration-200 leading-snug break-words block"
                                >
                                    {val}
                                    {ext && <span className="ml-0.5 text-fg-3 group-hover:text-accent"> ↗</span>}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="t-label text-emerald-700 dark:text-emerald-400">
                                Available now · Open to relocate immediately
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
