"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { track } from "@vercel/analytics";
import { buttonVariants } from "@/components/ui/Button";
import { iconButtonVariants } from "@/components/ui/IconButton";
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
                compact ? iconButtonVariants() : buttonVariants({ variant: "secondary", className: "text-fg-2" }),
                copied && "border-v-emerald/40 bg-v-emerald/10 text-success hover:border-v-emerald/40 hover:text-success",
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
