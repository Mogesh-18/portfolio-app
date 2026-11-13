import { Window, Bar, type CoverProps } from "./primitives";
import { cn } from "@/lib/utils";

/* ── Fallback: generic dashboard (for any project without its own cover) ── */

export function DashboardCover({ large, stack }: CoverProps & { stack: string[] }) {
    const bars = [38, 62, 48, 80, 56, 92, 70, 84];
    return (
        <Window title="Dashboard" className={large ? "left-5 top-5 w-[76%] h-[80%]" : "left-4 top-4 w-[80%] h-[82%]"}>
            <div className="flex h-full flex-col gap-2 p-2.5">
                <div className="grid grid-cols-3 gap-1.5">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="rounded-md border border-border bg-bg-2/70 p-1.5 space-y-1">
                            <Bar className="w-6" />
                            <Bar className={cn("h-2", i === 0 ? "w-8 bg-(--tone)" : i === 1 ? "w-6 bg-(--tone-2)" : "w-7")} />
                        </div>
                    ))}
                </div>
                <div className="flex min-h-0 flex-1 items-end gap-1 rounded-md border border-border bg-bg-2/50 p-2">
                    {bars.map((h, i) => (
                        <span key={i} className="flex-1 rounded-t-sm bg-[linear-gradient(to_top,var(--tone),var(--tone-2))]" style={{ height: `${h}%`, opacity: 0.45 + (i / bars.length) * 0.55 }} />
                    ))}
                </div>
                <div className="flex flex-wrap gap-1">
                    {stack.slice(0, 3).map(t => <span key={t} className="rounded border border-border bg-bg-card px-1.5 py-0.5 font-mono text-[9px] text-fg-2">{t}</span>)}
                </div>
            </div>
        </Window>
    );
}

/* Keyed by project id — a typo'd or removed id fails typecheck (covers are optional per project) */
