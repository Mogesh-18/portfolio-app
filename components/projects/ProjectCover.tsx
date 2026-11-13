import type { CSSProperties } from "react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { CoverArt } from "@/components/projects/covers";

/* A second vibrant colour per project for the mesh gradient, by index */
const PAIRS = ["var(--v-cyan)", "var(--v-emerald)", "var(--v-pink)", "var(--v-fuchsia)"] as const;

/**
 * Project colours as CSS variables. Pair with the `tone-project` class, which
 * turns --p into --tone and lifts it for dark mode (styles/utilities.css).
 */
export const projectTone = (p: Project): CSSProperties =>
    ({ "--p": p.color, "--tone-2": PAIRS[(p.index - 1) % PAIRS.length] ?? PAIRS[0] });

/**
 * Cover art frame: a vibrant mesh gradient in the project's colours, a dot grid
 * and a large index, with a project-specific illustration on top (covers/).
 * Swap for a real screenshot later if a client allows it.
 */
export function ProjectCover({ p, className, large = false }: { p: Project; className?: string; large?: boolean }) {
    return (
        <div
            aria-hidden
            data-print="hide"
            className={cn("tone-project relative isolate overflow-hidden rounded-xl border border-border bg-bg-2", className)}
            style={projectTone(p)}
        >
            {/* Mesh gradient + dot grid */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_0%_0%,var(--tone),transparent_65%),radial-gradient(70%_70%_at_100%_100%,var(--tone-2),transparent_65%)] opacity-40 dark:opacity-45 transition-opacity duration-500 group-hover:opacity-60" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border-2)_1px,transparent_1px)] bg-[size:18px_18px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

            {/* Big index */}
            <span className={cn(
                "absolute -bottom-[0.2em] left-4 font-mono font-medium leading-none tracking-tighter select-none text-fg/[0.07] dark:text-white/10",
                large ? "text-[10rem]" : "text-[7rem]"
            )}>
                {String(p.index).padStart(2, "0")}
            </span>

            <CoverArt p={p} large={large} />
        </div>
    );
}
