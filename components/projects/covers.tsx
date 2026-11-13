import type { ReactNode } from "react";
import {
    Bath, BedDouble, CalendarDays, CheckCheck, ClipboardList, Factory, House, MessageCircle,
    Package, PhoneCall, Receipt, Sailboat, Scissors, ShieldCheck, Shirt, Sparkles, Sun, Truck,
} from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/*
 * Illustrated covers, one per project, drawn with plain elements so they stay
 * crisp, theme-aware and tinted by the project's --tone / --tone-2 colours.
 * Labels are generic UI words and bars are placeholders — no invented data.
 */

type CoverProps = { large: boolean };

/* ── Shared primitives ─────────────────────────────────────────────── */

function Window({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
    return (
        <div className={cn(
            "absolute flex flex-col overflow-hidden rounded-lg border border-border bg-bg-card/95 backdrop-blur",
            "shadow-[0_24px_48px_-20px_oklch(0_0_0/0.45)] transition-transform duration-700 ease-expo group-hover:-translate-y-1.5",
            className
        )}>
            <div className="flex items-center gap-1.5 border-b border-border bg-bg-2/80 px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-v-pink/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-v-amber/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-v-emerald/70" />
                <span className="ml-1.5 truncate font-mono text-[9px] text-fg-3">{title}</span>
            </div>
            <div className="relative min-h-0 flex-1">{children}</div>
        </div>
    );
}

/** Floating widget card that lifts a little more than the window on hover */
function Float({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={cn(
            "absolute rounded-lg border border-border bg-bg-card p-2 shadow-[0_18px_40px_-16px_oklch(0_0_0/0.5)]",
            "transition-transform duration-700 ease-expo group-hover:-translate-y-3",
            className
        )}>
            {children}
        </div>
    );
}

const Bar = ({ className }: { className?: string }) => <span className={cn("block h-1.5 rounded-full bg-fg-3/25", className)} />;
const Label = ({ children, className }: { children: ReactNode; className?: string }) =>
    <span className={cn("block font-mono text-[9px] leading-none text-fg-3", className)}>{children}</span>;

/* ── 1. Real estate CRM: listings + lead pipeline + call / WhatsApp ─── */

function RealEstateCover({ large }: CoverProps) {
    const listings = large ? 3 : 2;
    return (
        <>
            <Window title="Listings" className={large ? "left-5 top-5 w-[70%] h-[80%]" : "left-4 top-4 w-[68%] h-[82%]"}>
                <div className={cn("grid gap-1.5 p-2", large ? "grid-cols-3" : "grid-cols-2")}>
                    {Array.from({ length: listings }, (_, i) => (
                        <div key={i} className="overflow-hidden rounded-md border border-border bg-bg-card">
                            <div className={cn(
                                "relative grid place-items-center bg-[linear-gradient(135deg,var(--tone),var(--tone-2))]",
                                large ? "h-20" : "h-12",
                                i === 1 && "opacity-80", i === 2 && "opacity-65"
                            )}>
                                <House size={large ? 22 : 16} className="text-white" strokeWidth={1.75} />
                                <span className="absolute left-1 top-1 rounded bg-white/90 px-1 font-mono text-[8px] text-fg-2">{i === 0 ? "New" : "Hot"}</span>
                            </div>
                            <div className="space-y-1 p-1.5">
                                <Bar className="w-4/5 bg-fg-3/35" />
                                <Bar className="w-1/2 bg-(--tone)/60" />
                                <div className="flex gap-1.5 pt-0.5 text-fg-3">
                                    <BedDouble size={9} /><Bath size={9} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {large && (
                    <div className="mx-2 mb-2 grid grid-cols-3 gap-1.5 rounded-md border border-border bg-bg-2/60 p-2">
                        {["New lead", "Site visit", "Closed"].map((s, i) => (
                            <div key={s}>
                                <Label>{s}</Label>
                                <div className="mt-1.5 h-1 rounded-full bg-bg-3">
                                    <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--tone),var(--tone-2))]" style={{ width: `${[85, 55, 30][i]}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Window>

            {/* Incoming call (CTI telephony) */}
            <Float className={large ? "right-5 bottom-6 w-[38%]" : "right-3 bottom-4 w-[44%]"}>
                <div className="flex items-center gap-2">
                    <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-v-emerald text-white">
                        <span className="absolute inset-0 rounded-full bg-v-emerald/50 motion-safe:animate-ping" />
                        <PhoneCall size={13} className="relative" />
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                        <Label className="text-fg-2">Incoming call</Label>
                        <Bar className="w-3/4" />
                    </div>
                </div>
                {large && (
                    <div className="mt-2 flex gap-1.5">
                        <span className="h-4 flex-1 rounded bg-v-emerald/80" />
                        <span className="h-4 flex-1 rounded bg-v-pink/70" />
                    </div>
                )}
            </Float>

            {/* WhatsApp message */}
            {large && (
                <Float className="right-5 top-10 w-[34%]">
                    <div className="flex items-center gap-1.5">
                        <MessageCircle size={12} className="text-v-emerald" />
                        <Label>WhatsApp</Label>
                    </div>
                    <div className="mt-1.5 rounded-md rounded-tl-none bg-v-emerald/15 p-1.5 space-y-1">
                        <Bar className="w-full bg-v-emerald/40" />
                        <Bar className="w-2/3 bg-v-emerald/40" />
                    </div>
                    <CheckCheck size={11} className="ml-auto mt-1 text-v-cyan" />
                </Float>
            )}
        </>
    );
}

/* ── 2. Industrial ERP: production kanban + QuickBooks invoice ─────── */

function IndustrialErpCover({ large }: CoverProps) {
    const columns = [
        { name: "Quote", icon: ClipboardList, cards: 2 },
        { name: "Production", icon: Factory, cards: large ? 3 : 2, active: true },
        { name: "Invoiced", icon: Receipt, cards: 1 },
    ];
    return (
        <>
            <Window title="Production board" className={large ? "left-5 top-5 w-[74%] h-[82%]" : "left-4 top-4 w-[76%] h-[84%]"}>
                <div className="grid h-full grid-cols-3 gap-1.5 p-2">
                    {columns.map(col => (
                        <div key={col.name} className="flex flex-col gap-1.5 rounded-md bg-bg-2/70 p-1.5">
                            <div className="flex items-center gap-1 text-fg-3">
                                <col.icon size={10} className={col.active ? "text-(--tone)" : ""} />
                                <Label className={cn("truncate", col.active && "text-fg-2")}>{col.name}</Label>
                            </div>
                            {Array.from({ length: col.cards }, (_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "rounded border bg-bg-card p-1.5 space-y-1",
                                        col.active && i === 0 ? "border-(--tone)/60 shadow-[0_6px_16px_-8px_var(--tone)]" : "border-border"
                                    )}
                                >
                                    <Bar className={cn("w-4/5", col.active && i === 0 && "bg-(--tone)/60")} />
                                    <Bar className="w-1/2" />
                                    {col.active && (
                                        <div className="h-1 rounded-full bg-bg-3">
                                            <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--tone),var(--tone-2))]" style={{ width: `${[70, 40, 20][i]}%` }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Window>

            {/* Invoice synced to accounting */}
            <Float className={large ? "right-5 bottom-6 w-[32%]" : "right-3 bottom-3 w-[36%]"}>
                <div className="flex items-center gap-1.5">
                    <span className="grid h-5 w-5 place-items-center rounded bg-[linear-gradient(135deg,var(--tone),var(--tone-2))] text-white">
                        <Receipt size={11} />
                    </span>
                    <Label className="text-fg-2">Invoice</Label>
                </div>
                <div className="mt-2 space-y-1">
                    <Bar className="w-full" />
                    <Bar className="w-5/6" />
                    {large && <Bar className="w-2/3" />}
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border pt-1.5">
                    <Bar className="w-1/3 bg-fg-3/40" />
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-v-emerald/15 px-1.5 py-0.5 font-mono text-[8px] text-v-emerald">
                        <CheckCheck size={8} /> Synced
                    </span>
                </div>
            </Float>
        </>
    );
}

/* ── 3. Garment CRM: order stage tracker + WhatsApp update ─────────── */

function GarmentCover({ large }: CoverProps) {
    const stages = [
        { name: "Cutting", icon: Scissors },
        { name: "Stitching", icon: Shirt },
        { name: "Finishing", icon: Sparkles },
        { name: "Dispatch", icon: Truck },
    ];
    const current = 2; // index of the in-progress stage
    return (
        <>
            <Window title="Order tracking" className={large ? "left-5 top-5 w-[76%] h-[80%]" : "left-4 top-4 w-[80%] h-[80%]"}>
                <div className="p-2.5">
                    {/* Stepper */}
                    <div className="relative flex justify-between">
                        <span className="absolute left-3 right-3 top-3 h-0.5 bg-bg-3" />
                        <span
                            className="absolute left-3 top-3 h-0.5 bg-[linear-gradient(90deg,var(--tone),var(--tone-2))]"
                            style={{ width: `calc(${(current / (stages.length - 1)) * 100}% - 1.5rem)` }}
                        />
                        {stages.map((s, i) => (
                            <div key={s.name} className="relative flex flex-col items-center gap-1">
                                <span className={cn(
                                    "grid h-6 w-6 place-items-center rounded-full border-2",
                                    i < current && "border-transparent bg-[linear-gradient(135deg,var(--tone),var(--tone-2))] text-white",
                                    i === current && "border-(--tone) bg-bg-card text-(--tone) shadow-[0_0_0_3px_color-mix(in_oklch,var(--tone)_20%,transparent)]",
                                    i > current && "border-border bg-bg-card text-fg-3"
                                )}>
                                    <s.icon size={11} />
                                </span>
                                <Label className={cn(i <= current && "text-fg-2")}>{s.name}</Label>
                            </div>
                        ))}
                    </div>

                    {/* Orders */}
                    <div className="mt-3 space-y-1.5">
                        {Array.from({ length: large ? 3 : 2 }, (_, i) => (
                            <div key={i} className="flex items-center gap-2 rounded-md border border-border bg-bg-2/60 p-1.5">
                                <Package size={11} className="shrink-0 text-fg-3" />
                                <Bar className="w-1/3 bg-fg-3/35" />
                                <Bar className="w-1/5" />
                                <span className={cn(
                                    "ml-auto rounded-full px-1.5 py-0.5 font-mono text-[8px]",
                                    i === 0 ? "bg-(--tone)/15 text-(--tone)" : "bg-bg-3 text-fg-3"
                                )}>
                                    {i === 0 ? "Finishing" : i === 1 ? "Stitching" : "Cutting"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Window>

            {/* WhatsApp order update */}
            <Float className={large ? "right-5 bottom-5 w-[36%]" : "right-3 bottom-3 w-[42%]"}>
                <div className="flex items-start gap-1.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-v-emerald text-white">
                        <MessageCircle size={10} />
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                        <Label className="text-fg-2">Order update sent</Label>
                        <Bar className="w-full bg-v-emerald/30" />
                        {large && <Bar className="w-2/3 bg-v-emerald/30" />}
                    </div>
                </div>
            </Float>
        </>
    );
}

/* ── 4. Boat rental: listing + booking calendar + insurance ────────── */

function BoatRentalCover({ large }: CoverProps) {
    const days = large ? 21 : 14;
    const range = [9, 10, 11, 12];
    return (
        <>
            <Window title="Book a boat" className={large ? "left-5 top-5 w-[58%] h-[82%]" : "left-4 top-4 w-[58%] h-[84%]"}>
                {/* Scene: sky, sun, boat, waves */}
                <div className={cn("relative overflow-hidden bg-[linear-gradient(180deg,var(--tone-2),var(--tone))]", large ? "h-[58%]" : "h-[52%]")}>
                    <Sun size={large ? 18 : 13} className="absolute right-3 top-2.5 text-white/80" />
                    <Sailboat
                        size={large ? 40 : 26}
                        strokeWidth={1.5}
                        className="absolute left-1/2 bottom-[30%] -translate-x-1/2 text-white transition-transform duration-1000 ease-expo group-hover:-translate-y-1 group-hover:rotate-[-4deg]"
                    />
                    <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[38%] w-full">
                        <path d="M0 18 Q 25 8 50 18 T 100 18 T 150 18 T 200 18 V40 H0 Z" fill="white" fillOpacity=".35" />
                        <path d="M0 26 Q 25 16 50 26 T 100 26 T 150 26 T 200 26 V40 H0 Z" fill="white" fillOpacity=".6" />
                    </svg>
                </div>
                <div className="space-y-1.5 p-2">
                    <Bar className="w-3/4 bg-fg-3/35" />
                    <Bar className="w-1/2" />
                    <span className="mt-1 inline-block rounded-full bg-[linear-gradient(90deg,var(--tone),var(--tone-2))] px-2.5 py-0.5 font-mono text-[8px] text-white">Book</span>
                </div>
            </Window>

            {/* Booking calendar */}
            <Float className={large ? "right-5 top-6 w-[36%]" : "right-3 top-4 w-[38%]"}>
                <div className="flex items-center gap-1 text-fg-3">
                    <CalendarDays size={10} />
                    <Label>Dates</Label>
                </div>
                <div className="mt-1.5 grid grid-cols-7 gap-0.5">
                    {Array.from({ length: days }, (_, d) => {
                        const inRange = range.includes(d);
                        const edge = d === range[0] || d === range[range.length - 1];
                        return (
                            <span
                                key={d}
                                className={cn(
                                    "aspect-square rounded-[3px]",
                                    edge ? "bg-[linear-gradient(135deg,var(--tone),var(--tone-2))]" : inRange ? "bg-(--tone)/25" : "bg-bg-3"
                                )}
                            />
                        );
                    })}
                </div>
            </Float>

            {/* Insurance added at checkout */}
            <Float className={large ? "right-5 bottom-6 w-[36%]" : "right-3 bottom-4 w-[38%]"}>
                <div className="flex items-center gap-1.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-v-emerald/15 text-v-emerald">
                        <ShieldCheck size={12} />
                    </span>
                    <Label className="text-fg-2">Insured</Label>
                    <span className="ml-auto h-3 w-5 rounded-full bg-v-emerald p-0.5">
                        <span className="ml-auto block h-2 w-2 rounded-full bg-white" />
                    </span>
                </div>
            </Float>
        </>
    );
}

/* ── Fallback: generic dashboard (for any project without its own cover) ── */

function DashboardCover({ large, stack }: CoverProps & { stack: string[] }) {
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

const COVERS: Record<string, (props: CoverProps) => ReactNode> = {
    "real-estate-crm": RealEstateCover,
    "industrial-erp": IndustrialErpCover,
    "garment-crm": GarmentCover,
    "boat-rental": BoatRentalCover,
};

/** The illustration for a project, falling back to a generic dashboard. */
export function CoverArt({ p, large }: { p: Project; large: boolean }) {
    const Cover = COVERS[p.id];
    return Cover ? <Cover large={large} /> : <DashboardCover large={large} stack={p.techStack} />;
}
