import type { CSSProperties } from "react";

/** The vibrant palette tokens in styles/tokens.css (`--v-<name>`) */
export type ToneName = "indigo" | "violet" | "fuchsia" | "pink" | "orange" | "amber" | "emerald" | "cyan" | "blue";

/** A tone pair: primary colour and gradient partner */
export type TonePair = readonly [ToneName, ToneName];

/**
 * Inline style that sets `--tone` / `--tone-2` from the vibrant palette.
 * Components then style themselves with `bg-(--tone)/10`, `bg-tone-solid`, etc.
 * (see docs/design-system.md › Per-component "tone").
 */
export function tone(a: ToneName, b: ToneName = a): CSSProperties {
    return { "--tone": `var(--v-${a})`, "--tone-2": `var(--v-${b})` };
}
