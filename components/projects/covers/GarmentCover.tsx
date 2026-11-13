import { MessageCircle, Package, Scissors, Shirt, Sparkles, Truck } from "lucide-react";
import { Window, Float, Bar, Label, type CoverProps } from "./primitives";
import { cn } from "@/lib/utils";

/* ── 3. Garment CRM: order stage tracker + WhatsApp update ─────────── */

export function GarmentCover({ large }: CoverProps) {
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
                            className="absolute left-3 top-3 h-0.5 bg-tone-grad-x"
                            style={{ width: `calc(${(current / (stages.length - 1)) * 100}% - 1.5rem)` }}
                        />
                        {stages.map((s, i) => (
                            <div key={s.name} className="relative flex flex-col items-center gap-1">
                                <span className={cn(
                                    "grid h-6 w-6 place-items-center rounded-full border-2",
                                    i < current && "border-transparent bg-tone-grad text-white",
                                    i === current && "border-(--tone) bg-bg-card text-(--tone) shadow-[0_0_0_3px_color-mix(in_oklch,var(--tone)_20%,transparent)]",
                                    i > current && "border-border bg-bg-card text-fg-3"
                                )}>
                                    <s.icon size={11} />
                                </span>
                                {/* Labels only where there is room for all four (they overlap in narrow covers) */}
                                <Label className={cn("hidden @[15rem]:block", i <= current && "text-fg-2")}>{s.name}</Label>
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
