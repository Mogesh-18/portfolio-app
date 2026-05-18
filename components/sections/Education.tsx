"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { education } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Education as EduType } from "@/types";

function gradeStyle(g: string): string {
    const n = parseFloat(g);
    if (n >= 85)
        return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
    if (n >= 75) return "bg-accent-t text-accent border-accent/20";
    return "bg-bg-2 text-fg-2 border-border";
}

function EduCard({ edu, index }: { edu: EduType; index: number }) {
    const { ref, visible } = useReveal({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={cn(
                "reveal min-w-0",
                "flex flex-col sm:flex-row sm:items-center gap-4",
                "p-5 sm:p-6 rounded-2xl border border-border bg-bg-card",
                "hover:border-border-2 hover:shadow-md transition-all duration-300 group",
                visible && "in"
            )}
            style={{ transitionDelay: `${index * 80}ms`, boxShadow: "var(--shadow-1)" }}
        >
            <div className="flex-1 min-w-0">
                <p className="t-label text-fg-3 mb-1.5 truncate">
                    {edu.duration} · {edu.board}
                </p>
                <h3 className="font-bold text-base text-fg group-hover:text-accent transition-colors duration-300 leading-snug break-words">
                    {edu.degree}
                </h3>
                <p className="text-sm text-fg-2 font-medium mt-0.5 break-words">{edu.institution}</p>
            </div>

            <div
                className={cn(
                    "shrink-0 self-start sm:self-center flex items-center gap-1.5 px-4 py-2 rounded-xl border font-bold text-sm whitespace-nowrap",
                    gradeStyle(edu.grade)
                )}
            >
                {edu.grade}
            </div>
        </div>
    );
}

export function Education() {
    const { ref: rH, visible: vH } = useReveal();

    return (
        <section id="education" className="section-y bg-bg-2">
            <div className="wrap">
                <div ref={rH} className={cn("reveal mb-10", vH && "in")}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="t-label text-accent">05</span>
                        <div className="h-px w-10 bg-accent" />
                        <span className="t-label text-fg-3">Education</span>
                    </div>
                    <h2 className="t-h1 text-fg">Academic Background</h2>
                </div>

                <div className="space-y-4">
                    {education.map((edu, i) => (
                        <EduCard key={edu.id} edu={edu} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
