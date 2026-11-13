const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function parseYm(ym: string) {
    const match = /^(\d{4})-(\d{2})$/.exec(ym);
    if (!match) throw new Error(`Expected a "YYYY-MM" date, got "${ym}"`);
    return { y: Number(match[1]), m: Number(match[2]) };
}

function nowYm() {
    const d = new Date();
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1 };
}

/** Whole months between two "YYYY-MM" dates (end defaults to the current month). */
export function monthsBetween(start: string, end?: string): number {
    const s = parseYm(start);
    const e = end ? parseYm(end) : nowYm();
    return Math.max(0, (e.y - s.y) * 12 + (e.m - s.m));
}

/** Completed years since a "YYYY-MM" date. */
export function yearsSince(start: string): number {
    return Math.floor(monthsBetween(start) / 12);
}

/** "4 yrs 5 mos" */
export function formatTenure(start: string, end?: string): string {
    const total = monthsBetween(start, end);
    const y = Math.floor(total / 12);
    const m = total % 12;
    const parts: string[] = [];
    if (y) parts.push(`${y} ${y === 1 ? "yr" : "yrs"}`);
    if (m || !y) parts.push(`${m} ${m === 1 ? "mo" : "mos"}`);
    return parts.join(" ");
}

/** "June 2022 – Present" */
export function formatRange(start: string, end?: string): string {
    const fmt = (ym: string) => {
        const { y, m } = parseYm(ym);
        return `${MONTHS[m - 1]} ${y}`;
    };
    return `${fmt(start)} – ${end ? fmt(end) : "Present"}`;
}
