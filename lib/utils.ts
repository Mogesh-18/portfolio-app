import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** 
 * Merge Tailwind classes without conflicts 
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** 
 * Format a number with ordinal suffix 
 */
export function toOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/** 
 * Pad a number with leading zeros 
 */
export function zeroPad(n: number, digits = 2): string {
    return String(n).padStart(digits, "0");
}

/** 
 * Truncate a string to a max length 
 */
export function truncate(str: string, max = 120): string {
    if (str.length <= max) return str;
    return str.slice(0, max).trimEnd() + "…";
}
