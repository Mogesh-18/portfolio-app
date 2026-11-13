import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
    sm: { box: "h-7 w-7 rounded-lg", icon: 14 },
    md: { box: "h-8 w-8 rounded-lg", icon: 15 },
    lg: { box: "h-9 w-9 rounded-xl", icon: 17 },
    xl: { box: "h-10 w-10 rounded-xl", icon: 18 },
} as const;

/**
 * Icon chip tinted by the nearest `--tone` (set with tone() from lib/tone.ts):
 * soft tone fill, tone-coloured icon and a tone ring. Decorative (aria-hidden).
 */
export function ToneIcon({ icon: Icon, size = "md", strokeWidth = 1.75, className }: {
    icon: LucideIcon;
    size?: keyof typeof sizes;
    strokeWidth?: number;
    className?: string;
}) {
    const s = sizes[size];
    return (
        <span aria-hidden className={cn("grid shrink-0 place-items-center bg-(--tone)/12 text-(--tone) ring-1 ring-(--tone)/25", s.box, className)}>
            <Icon size={s.icon} strokeWidth={strokeWidth} />
        </span>
    );
}
