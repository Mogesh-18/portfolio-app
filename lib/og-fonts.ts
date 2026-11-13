type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700; style: "normal" };

/**
 * Fetch a Google Font as TTF for next/og (Satori can't read woff2).
 * Without a browser User-Agent, Google Fonts serves TrueType.
 */
async function loadGoogleFont(family: string, weight: OgFont["weight"]): Promise<ArrayBuffer> {
    const css = await fetch(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`
    ).then(r => r.text());
    const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
    if (!url) throw new Error(`No TTF source for ${family} ${weight}`);
    return fetch(url).then(r => r.arrayBuffer());
}

/**
 * Geist 400 + 600 for generated images. Images are rendered at build time,
 * so if the fetch fails we fall back to next/og's built-in font rather than
 * failing the deploy.
 */
export async function geistFonts(): Promise<OgFont[]> {
    try {
        const [regular, semibold] = await Promise.all([
            loadGoogleFont("Geist", 400),
            loadGoogleFont("Geist", 600),
        ]);
        return [
            { name: "Geist", data: regular, weight: 400, style: "normal" },
            { name: "Geist", data: semibold, weight: 600, style: "normal" },
        ];
    } catch {
        return [];
    }
}
