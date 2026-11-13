const OPEN_EVENT = "open-command-palette";

/** Open the palette from anywhere (header button, mobile menu, …) without importing the component. */
export function openCommandPalette() {
    window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Subscribe to open requests; returns the unsubscribe function. */
export function onOpenCommandPalette(handler: () => void) {
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
}
