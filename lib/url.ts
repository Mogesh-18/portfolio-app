/** "mogesh.dev/" → "https://mogesh.dev"; blank or missing → undefined */
export function normalizeUrl(value: string | undefined): string | undefined {
    const v = value?.trim().replace(/\/+$/, "");
    if (!v) return undefined;
    return /^https?:\/\//.test(v) ? v : `https://${v}`;
}
