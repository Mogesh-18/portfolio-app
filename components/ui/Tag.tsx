import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "neutral" | "accent" | "mono";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
    /* Skill / tag chip */
    neutral: "border border-border bg-bg-2 font-medium text-fg-2",
    /* Highlighted stack chip */
    accent: "border border-accent/20 bg-accent-t font-medium text-accent",
    /* Tech-stack chip in mono */
    mono: "border border-border bg-bg-2 font-mono text-fg-2",
};

const sizes: Record<Size, string> = {
    sm: "px-2 py-0.5 text-2xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
};

export function tagVariants({ variant = "neutral", size = "md", className }: {
    variant?: Variant;
    size?: Size;
    className?: string;
} = {}) {
    return cn("inline-flex items-center gap-1.5 rounded-md", variants[variant], sizes[size], className);
}

/** Small chip for skills, tags and tech stacks. Renders an <li> — wrap a list of them in a <ul>. */
export function Tag({ variant, size, className, ...rest }: ComponentProps<"li"> & { variant?: Variant; size?: Size }) {
    return <li className={tagVariants({ variant, size, className })} {...rest} />;
}
