import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

/**
 * Merge Tailwind classes without conflicts
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Inline style that sets the stagger delay used by `.reveal` / `.enter` (globals.css)
 */
export function delay(ms: number): CSSProperties {
    return { "--d": `${ms}ms` } as CSSProperties;
}
