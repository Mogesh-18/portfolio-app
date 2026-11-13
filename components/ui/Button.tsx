import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
    "transition-[filter,color,background-color,border-color,scale] duration-200 active:scale-[0.98] " +
    "disabled:cursor-wait disabled:opacity-70";

const variants: Record<Variant, string> = {
    /* Brand gradient carrying white text (every stop ≥ 4.6:1) */
    primary: "bg-grad-solid text-white shadow-[0_10px_30px_-10px_var(--v-violet)] hover:brightness-110",
    secondary: "border border-border bg-bg-card/70 backdrop-blur text-fg hover:border-accent hover:text-accent",
    ghost: "text-fg-2 hover:text-accent",
};

const sizes: Record<Size, string> = {
    sm: "t-label px-4 py-2.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-sm px-5 py-3",
};

/** Class names for a button-styled element (use on <a>, <Link>, <button>, or client links like CvLink). */
export function buttonVariants({ variant = "primary", size = "md", className }: {
    variant?: Variant;
    size?: Size;
    className?: string;
} = {}) {
    return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
    href: string;
    variant?: Variant;
    size?: Size;
};

/** Button-styled link: next/link for internal paths ("/…", "#…"), a plain <a> otherwise (mailto:, https:). */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
    const cls = buttonVariants({ variant, size, className });
    if (href.startsWith("/") || href.startsWith("#")) return <Link href={href} className={cls} {...rest}>{children}</Link>;
    return <a href={href} className={cls} {...rest}>{children}</a>;
}

/** A <button> with the shared button styles. */
export function Button({ variant, size, className, type = "button", ...rest }: ComponentProps<"button"> & {
    variant?: Variant;
    size?: Size;
}) {
    return <button type={type} className={buttonVariants({ variant, size, className })} {...rest} />;
}
