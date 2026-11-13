import { Bath, BedDouble, CheckCheck, House, MessageCircle, PhoneCall } from "lucide-react";
import { Window, Float, Bar, Label, type CoverProps } from "./primitives";
import { cn } from "@/lib/utils";

/* ── 1. Real estate CRM: listings + lead pipeline + call / WhatsApp ─── */

export function RealEstateCover({ large }: CoverProps) {
    const listings = large ? 3 : 2;
    return (
        <>
            <Window title="Listings" className={large ? "left-5 top-5 w-[70%] h-[80%]" : "left-4 top-4 w-[68%] h-[82%]"}>
                <div className={cn("grid gap-1.5 p-2", large ? "grid-cols-3" : "grid-cols-2")}>
                    {Array.from({ length: listings }, (_, i) => (
                        <div key={i} className="overflow-hidden rounded-md border border-border bg-bg-card">
                            <div className={cn(
                                "relative grid place-items-center bg-tone-grad",
                                large ? "h-20" : "h-12",
                                i === 1 && "opacity-80", i === 2 && "opacity-65"
                            )}>
                                <House size={large ? 22 : 16} className="text-white" strokeWidth={1.75} />
                                <span className="absolute left-1 top-1 rounded bg-bg-card/90 px-1 font-mono text-[8px] text-fg-2">{i === 0 ? "New" : "Hot"}</span>
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
                                    <div className="h-full rounded-full bg-tone-grad-x" style={{ width: `${[85, 55, 30][i]}%` }} />
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
