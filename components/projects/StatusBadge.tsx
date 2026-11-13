import type { CSSProperties } from "react";
import type { Project } from "@/types";

/** "● Live" pill tinted with the project colour; text stays on theme tokens for AA contrast. */
export function StatusBadge({ p }: { p: Project }) {
    return (
        <span
            className="inline-flex items-center gap-1.5 t-label px-2 py-0.5 rounded-full border text-fg-2 bg-(--c)/10 border-(--c)/30"
            style={{ "--c": p.color } as CSSProperties}
        >
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-(--c)" />
            {p.status}
        </span>
    );
}
