"use client";
import { useReveal } from "@/hooks/useScrollAnimation";
import { skillGroups } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { SkillGroup } from "@/types";

const CAT_COLORS: Record<string, string> = {
    "Backend": "#4F46E5",
    "Frontend": "#0D9488",
    "Database": "#EA580C",
    "Integrations": "#9333EA",
    "Mobile & CMS": "#DB2777",
    "DevOps & Tools": "#D97706",
    "Leadership": "#16A34A",
};

function SkillRow({ g, index }: { g: SkillGroup; index: number }) {
    const { ref, visible } = useReveal({ threshold: 0.08 });
    const color = CAT_COLORS[g.category] ?? "var(--accent)";

    return (
        <div ref={ref}
            className={cn(
                "reveal grid sm:grid-cols-[160px_1fr] gap-3 sm:gap-6",
                "px-5 sm:px-6 py-5 border-b border-border last:border-0",
                "hover:bg-bg-2 transition-colors duration-200",
                visible && "in"
            )}
            style={{ transitionDelay: `${index * 55}ms` }}
        >
            <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-[3px] h-4 rounded-sm shrink-0" style={{ background: color }} />
                <span className="font-bold text-sm truncate" style={{ color }}>{g.category}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {g.skills.map(skill => (
                    <span key={skill}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-border bg-bg-2 text-fg-2 hover:border-border-2 hover:text-fg cursor-default transition-colors duration-150"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Skills() {
    const { ref: rH, visible: vH } = useReveal();

    return (
        <section id="skills" className="section-y">
            <div className="wrap">
                <div ref={rH} className={cn("reveal mb-10", vH && "in")}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="t-label text-accent">04</span>
                        <div className="h-px w-10 bg-accent" />
                        <span className="t-label text-fg-3">Stack & Expertise</span>
                    </div>
                    <h2 className="t-h1 text-fg">Technical Skills</h2>
                </div>

                <div className="rounded-2xl border border-border bg-bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-2)" }} >
                    {skillGroups.map((g, i) => (
                        <SkillRow key={g.category} g={g} index={i} />
                    ))}
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-bg-card px-5 sm:px-6 py-6 overflow-hidden" style={{ boxShadow: "var(--shadow-1)" }} >
                    <p className="t-label text-fg-3 mb-5">6 Production API Integrations Shipped</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { name: "Ozonetel", note: "VoIP / CTI", color: "#4F46E5" },
                            { name: "Twilio", note: "WhatsApp", color: "#0D9488" },
                            { name: "SendGrid", note: "Email", color: "#EA580C" },
                            { name: "QuickBooks", note: "Invoicing", color: "#16A34A" },
                            { name: "AskEva", note: "WA Notifications", color: "#9333EA" },
                            { name: "Buoy", note: "Insurance API", color: "#DB2777" },
                        ].map(({ name, note, color }) => (
                            <div key={name} className="flex flex-col gap-1.5 p-3 rounded-xl border border-border bg-bg-2 hover:border-border-2 transition-colors duration-200 min-w-0" >
                                <div className="h-1 w-8 rounded-full shrink-0" style={{ background: color }} />
                                <p className="font-bold text-sm text-fg truncate">{name}</p>
                                <p className="text-xs text-fg-3 truncate">{note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
