type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700; style: "normal" };

const TIMEOUT_MS = 8000;

async function get(url: string): Promise<Response> {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
    return res;
}

/**
 * Fetch a Google Font as TTF for next/og (Satori can't read woff2).
 * Without a browser User-Agent, Google Fonts serves TrueType.
 */
async function loadGoogleFont(family: string, weight: OgFont["weight"]): Promise<ArrayBuffer> {
    const css = await (await get(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`
    )).text();
    const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
    if (!url) throw new Error(`No TTF source for ${family} ${weight}`);
    return (await get(url)).arrayBuffer();
}

async function load(): Promise<OgFont[] | undefined> {
    try {
        const [regular, semibold] = await Promise.all([
            loadGoogleFont("Geist", 400),
            loadGoogleFont("Geist", 600),
        ]);
        return [
            { name: "Geist", data: regular, weight: 400, style: "normal" },
            { name: "Geist", data: semibold, weight: 600, style: "normal" },
        ];
    } catch (err) {
        console.warn("OG fonts: falling back to the built-in font.", err);
        // `undefined`, not `[]`: next/og only uses its built-in font when `fonts`
        // is missing; an empty array throws "No fonts are loaded".
        return undefined;
    }
}

/* One download per build/server instance, shared by every generated image */
let cache: Promise<OgFont[] | undefined> | undefined;

/**
 * Geist 400 + 600 for generated images. Images are rendered at build time,
 * so if the fetch fails we fall back to next/og's built-in font rather than
 * failing the deploy.
 */
export function geistFonts(): Promise<OgFont[] | undefined> {
    cache ??= load();
    return cache;
}
