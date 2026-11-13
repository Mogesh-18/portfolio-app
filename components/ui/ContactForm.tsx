"use client";
import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { track } from "@vercel/analytics";
import { sendContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

const input =
    "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-3 " +
    "transition-colors duration-200 hover:border-border-2 focus:border-accent focus:outline-none focus-visible:outline-none " +
    "focus:ring-2 focus:ring-accent/25 aria-invalid:border-red-500/70";

export function ContactForm() {
    const [state, action, pending] = useActionState(sendContact, initial);
    const startedRef = useRef<HTMLInputElement>(null);

    // Timestamp for the server-side minimum-fill-time spam check
    useEffect(() => {
        if (startedRef.current) startedRef.current.value = String(Date.now());
    }, []);

    useEffect(() => {
        if (state.status === "success") track("contact_form_sent");
    }, [state.status]);

    if (state.status === "success") {
        return (
            <div role="status" className="flex flex-col items-start gap-3 py-6">
                <CheckCircle2 size={28} className="text-emerald-500" aria-hidden />
                <p className="t-h2 text-fg">Message sent.</p>
                <p className="text-sm text-fg-2">Thanks for reaching out — I&apos;ll reply within a day or two.</p>
            </div>
        );
    }

    const field = (name: ContactField, label: string, el: React.ReactNode) => (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={`cf-${name}`} className="t-label text-fg-3">{label}</label>
            {el}
            {state.errors?.[name] && (
                <p id={`cf-${name}-error`} className="text-xs text-red-600 dark:text-red-400">{state.errors[name]}</p>
            )}
        </div>
    );
    const a11y = (name: ContactField) => ({
        id: `cf-${name}`,
        name,
        "aria-invalid": Boolean(state.errors?.[name]) || undefined,
        "aria-describedby": state.errors?.[name] ? `cf-${name}-error` : undefined,
        defaultValue: state.values?.[name],
    });

    return (
        <form action={action} noValidate className="flex flex-col gap-4">
            {field("name", "Name", <input {...a11y("name")} type="text" autoComplete="name" required maxLength={100} className={input} placeholder="Your name" />)}
            {field("email", "Email", <input {...a11y("email")} type="email" autoComplete="email" required maxLength={200} className={input} placeholder="you@company.com" />)}
            {field("message", "Message", <textarea {...a11y("message")} required rows={5} maxLength={5000} className={cn(input, "resize-y min-h-28")} placeholder="What are you working on?" />)}

            {/* Spam guards — hidden from people, visible to bots. The honeypot's name and
                label must not look like a real field ("company", "website", …) or browser
                autofill fills it and real messages get dropped as spam. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Leave this empty <input name="cf_trap" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" /></label>
            </div>
            <input ref={startedRef} type="hidden" name="started" />

            {state.status === "error" && state.message && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
            )}

            <button
                type="submit"
                disabled={pending}
                className="mt-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-solid hover:bg-accent-solid-2 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-70 disabled:cursor-wait"
            >
                {pending
                    ? <><Loader2 size={15} className="animate-spin" aria-hidden /> Sending…</>
                    : <><Send size={15} strokeWidth={2} aria-hidden /> Send message</>}
            </button>
        </form>
    );
}
