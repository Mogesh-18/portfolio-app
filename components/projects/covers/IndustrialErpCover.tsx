import { CheckCheck, ClipboardList, Factory, Receipt } from "lucide-react";
import { Window, Float, Bar, Label, type CoverProps } from "./primitives";
import { cn } from "@/lib/utils";

/* ── 2. Industrial ERP: production kanban + Xero invoice ─────── */

export function IndustrialErpCover({ large }: CoverProps) {
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
                                            <div className="h-full rounded-full bg-tone-grad-x" style={{ width: `${[70, 40, 20][i]}%` }} />
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
                    <span className="grid h-5 w-5 place-items-center rounded bg-tone-grad text-white">
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
