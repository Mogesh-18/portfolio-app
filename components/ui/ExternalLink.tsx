import type { ComponentProps } from "react";

const NOTE = "(opens in a new tab)";

/**
 * Link that opens in a new tab and says so to screen readers.
 * With `aria-label` (icon-only links) the note is appended to the label;
 * otherwise it is added as visually hidden text.
 */
export function ExternalLink({ children, "aria-label": label, ...rest }: ComponentProps<"a"> & { href: string }) {
    return (
        <a target="_blank" rel="noopener noreferrer" aria-label={label ? `${label} ${NOTE}` : undefined} {...rest}>
            {children}
            {!label && <span className="sr-only"> {NOTE}</span>}
        </a>
    );
}
