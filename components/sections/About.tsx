"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { summary, additionalWork, contact } from "@/data/resume";
import { cn } from "@/lib/utils";

export function About() {
    const { ref: rH, visible: vH } = useReveal();
    const { ref: rQ, visible: vQ } = useReveal({ threshold: 0.1 });
    const { ref: rC, visible: vC } = useReveal({ threshold: 0.1 });

    return (
        <section id="about" className="section-y bg-bg-2">
            <div className="wrap">
                <div ref={rH} className={cn("reveal mb-10", vH && "in")}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="t-label text-accent">01</span>
                        <div className="h-px w-10 bg-accent" />
                        <span className="t-label text-fg-3">About Me</span>
                    </div>
                    <h2 className="t-h1 text-fg max-w-2xl text-balance">
                        Shipping production software,{" "}
                        <span className="text-fg-2 font-normal italic">
                            leading teams, owning outcomes.
                        </span>
                    </h2>
                </div>

                <div ref={rQ} className={cn("reveal mb-10", vQ && "in")}>
                    <blockquote
                        className="relative pl-5 py-1"
                        style={{ borderLeft: "3px solid var(--accent)" }}
                    >
                        <p className="text-base sm:text-lg font-medium text-fg leading-relaxed">
                            &ldquo;{summary}&rdquo;
                        </p>
                    </blockquote>
                </div>

                <div
                    ref={rC}
                    className={cn(
                        "reveal grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-14",
                        vC && "in"
                    )}
                >
                    <div className="space-y-4 text-[15px] text-fg-2 leading-relaxed min-w-0">
                        <p>
                            Based in{" "}
                            <strong className="text-fg font-semibold">{contact.location}</strong> with 4 years
                            of hands-on experience, I specialize in owning the complete lifecycle of web
                            application development — from designing relational MySQL schemas and RESTful API
                            contracts to building production React JS admin dashboards and configuring
                            Jenkins CI/CD pipelines.
                        </p>
                        <p>
                            As Technical Lead I introduced an{" "}
                            <strong className="text-fg font-semibold">Event Bus architecture</strong> across
                            React JS frontends that replaced Redux and cut boilerplate by 30%. I mentor 4
                            junior developers through structured code reviews, which reduced pull-request
                            rework by 40% and shortened sprint delivery cycles within 3 months.
                        </p>
                        <p>
                            Beyond core full stack work: custom WordPress themes and plugins for 5+ client
                            sites, Flutter/Dart features shipped to an Android app, and Joomla CMS migrations
                            completed with zero data loss.
                        </p>

                        <div className="pt-5 border-t border-border">
                            <p className="t-label text-fg-3 mb-4">Also Contributed To</p>
                            <ul className="space-y-3">
                                {additionalWork.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm min-w-0">
                                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                                        <span className="text-fg-2">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <aside className="min-w-0">
                        <div className="rounded-2xl border border-border bg-bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-1)" }} >
                            <div className="px-5 py-4 border-b border-border bg-bg-2">
                                <p className="t-label text-fg-3">Quick Facts</p>
                            </div>
                            <ul className="divide-y divide-border">
                                {[
                                    { label: "Role", val: "Senior Full Stack Dev" },
                                    { label: "Company", val: "Webtrendz Technologies" },
                                    { label: "Duration", val: "June 2022 – Present" },
                                    { label: "Tenure", val: "4 years" },
                                    { label: "Team", val: "Lead of 4 developers" },
                                    { label: "Location", val: contact.location },
                                    { label: "Relocate", val: "Open — immediately" },
                                ].map(({ label, val }) => (
                                    <li key={label} className="flex items-start gap-3 px-5 py-3 min-w-0">
                                        <span className="t-label text-fg-3 w-20 shrink-0 pt-0.5">{label}</span>
                                        <span className="text-sm font-semibold text-fg min-w-0 break-words">{val}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
