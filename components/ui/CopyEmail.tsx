"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

/** Copies the email address to the clipboard and confirms it inline (announced to screen readers). */
export function CopyEmail({ email, source, className, compact = false }: {
    email: string;
    /** Where the button lives — sent with the analytics event */
    source: string;
    className?: string;
    /** Icon-only round button */
    compact?: boolean;
}) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            track("copy_email", { source });
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    const label = copied ? "Copied!" : "Copy email";

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={compact ? label : undefined}
            className={cn(
                "inline-flex items-center justify-center gap-2 border font-semibold text-sm transition-colors duration-200",
                compact ? "h-11 w-11 rounded-full" : "px-5 py-2.5 rounded-xl",
                copied
                    ? "border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10"
                    : "border-border bg-bg-card text-fg-2 hover:text-accent hover:border-accent",
                className
            )}
        >
            {copied ? <Check size={15} strokeWidth={2.2} aria-hidden /> : <Copy size={15} strokeWidth={2} aria-hidden />}
            {compact
                ? <span aria-live="polite" className="sr-only">{copied ? "Copied!" : ""}</span>
                : <span aria-live="polite">{label}</span>}
        </button>
    );
}
