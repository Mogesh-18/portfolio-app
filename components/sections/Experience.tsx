"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { experiences } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Experience() {
    const { ref: rH, visible: vH } = useReveal();
    const { ref: rC, visible: vC } = useReveal({ threshold: 0.06 });
    const exp = experiences[0];

    return (
        <section id="experience" className="section-y">
            <div className="wrap">
                <div ref={rH} className={cn("reveal mb-10", vH && "in")}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="t-label text-accent">02</span>
                        <div className="h-px w-10 bg-accent" />
                        <span className="t-label text-fg-3">Experience</span>
                    </div>
                    <h2 className="t-h1 text-fg">Professional History</h2>
                </div>

                <div ref={rC} className={cn("reveal", vC && "in")}>
                    <div
                        className="rounded-2xl overflow-hidden border border-border bg-bg-card"
                        style={{ boxShadow: "var(--shadow-3)" }}
                    >
                        <div className="grid sm:grid-cols-[1fr_auto] items-start gap-4 px-5 sm:px-8 py-6 border-b border-border bg-bg-2">
                            <div className="min-w-0">
                                <p className="t-label text-accent mb-2">Full-time · {exp.location}</p>
                                <h3 className="t-h2 text-fg break-words">{exp.companyFull}</h3>
                                <p className="text-base font-semibold text-fg-2 mt-1">{exp.role}</p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                                <span className="t-label px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
                                    ● Currently Active
                                </span>
                                <span className="text-sm text-fg-2 font-medium whitespace-nowrap">{exp.duration}</span>
                                <span className="t-label text-fg-3">{exp.tenure}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-border border-b border-border">
                            {[
                                { value: "4+", sub: "ERP/CRM apps shipped" },
                                { value: "30%", sub: "Redux boilerplate cut" },
                                { value: "40%", sub: "PR rework reduced" },
                                { value: "6", sub: "APIs integrated" },
                            ].map(({ value, sub }) => (
                                <div key={sub} className="px-4 sm:px-5 py-4 sm:py-5 hover:bg-bg-2 transition-colors duration-200">
                                    <p className="font-extrabold text-xl sm:text-2xl text-accent leading-none">{value}</p>
                                    <p className="text-xs text-fg-2 font-medium mt-1.5 leading-snug">{sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="px-5 sm:px-8 py-6 sm:py-7">
                            <p className="t-label text-fg-3 mb-5">Key Achievements</p>
                            <ul className="space-y-5">
                                {exp.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-3 sm:gap-4 group min-w-0">
                                        <div className="mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-accent-t border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                                            <span className="font-bold text-[10px] text-accent group-hover:text-white transition-colors duration-300">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <p className="text-sm text-fg-2 leading-relaxed flex-1 min-w-0">{h}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-7 pt-6 border-t border-border flex flex-wrap gap-2">
                                {exp.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-t text-accent border border-accent/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
