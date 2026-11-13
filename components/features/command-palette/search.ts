/** Anything the palette can search: label, optional keywords and its group heading. */
export interface Searchable {
    label: string;
    keywords?: string;
    group: string;
}

/**
 * Every whitespace-separated word of the query must appear (case-insensitive)
 * somewhere in the item's label, keywords or group. An empty query returns all items.
 */
export function filterItems<T extends Searchable>(items: T[], query: string): T[] {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items;
    return items.filter(i => {
        const hay = `${i.label} ${i.keywords ?? ""} ${i.group}`.toLowerCase();
        return words.every(w => hay.includes(w));
    });
}
