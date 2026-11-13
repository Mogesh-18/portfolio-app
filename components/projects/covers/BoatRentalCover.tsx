import { CalendarDays, Sailboat, ShieldCheck, Sun } from "lucide-react";
import { Window, Float, Bar, Label, type CoverProps } from "./primitives";
import { cn } from "@/lib/utils";

/* ── 4. Boat rental: listing + booking calendar + insurance ────────── */

export function BoatRentalCover({ large }: CoverProps) {
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
                    <span className="mt-1 inline-block rounded-full bg-tone-grad-x px-2.5 py-0.5 font-mono text-[8px] text-white">Book</span>
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
                                    edge ? "bg-tone-grad" : inRange ? "bg-(--tone)/25" : "bg-bg-3"
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
