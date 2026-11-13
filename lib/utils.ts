import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

/*
 * tailwind-merge only knows Tailwind's default scale. Register the project's
 * custom utilities, otherwise e.g. `text-2xs` is read as a text *colour* and
 * silently dropped next to `text-fg-2`.
 */
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ["2xs", "13", "15"],
            shadow: ["elev-1", "elev-2", "elev-3", "float"],
        },
        classGroups: {
            "bg-image": [{ bg: ["tone-grad", "tone-grad-x", "tone-solid", "grad-brand", "grad-solid"] }],
        },
    },
});

/**
 * Merge Tailwind classes without conflicts
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Inline style that sets the stagger delay used by `.reveal` / `.enter` (styles/components.css)
 */
export function delay(ms: number): CSSProperties {
    return { "--d": `${ms}ms` };
}
