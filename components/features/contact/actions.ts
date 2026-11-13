"use server";
import { headers } from "next/headers";
import { contact } from "@/data/resume";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
    status: "idle" | "success" | "error";
    message?: string;
    errors?: Partial<Record<ContactField, string>>;
    /** Echo the values back so the form keeps them after an error */
    values?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;
const SEND_TIMEOUT_MS = 10_000;

/*
 * Best-effort rate limit: 5 messages per IP per 10 minutes.
 * In-memory, so it is per server instance (Vercel may run several) — it stops
 * a single script hammering the form, not a distributed attack. For a hard
 * limit, add a Vercel Firewall rate-limit rule on POST /.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
    const limited = recent.length >= RATE_LIMIT;
    if (!limited) recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 1000) {
        // Drop idle entries so the map can't grow without bound
        for (const [key, times] of hits) if (times.every(t => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
    return limited;
}

/**
 * Sends the contact form via Resend's REST API.
 * Env: RESEND_API_KEY (required), CONTACT_TO (defaults to the resume email),
 *      CONTACT_FROM (defaults to Resend's shared test sender).
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
    const values = {
        // Single line: the name goes into the email subject
        name: String(formData.get("name") ?? "").replace(/[\r\n]+/g, " ").trim(),
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
    };

    // Spam guards: hidden honeypot field + minimum time on the form.
    // Bots get a fake success so they don't retry.
    if (formData.get("cf_trap")) return { status: "success" };
    const started = Number(formData.get("started"));
    if (!started || Date.now() - started < MIN_FILL_MS) {
        return { status: "error", message: "That was quick — please try again in a moment.", values };
    }

    const errors: ContactState["errors"] = {};
    if (!values.name || values.name.length > 100) errors.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Please enter a valid email address.";
    if (values.message.length < 10) errors.message = "Please write at least a sentence or two.";
    else if (values.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
    if (Object.keys(errors).length) return { status: "error", errors, values };

    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
        return { status: "error", message: "Too many messages — please try again later, or email me directly.", values };
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) return { status: "error", message: "The form isn't configured — please email me directly.", values };

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
                to: [process.env.CONTACT_TO ?? contact.email],
                reply_to: values.email,
                subject: `Portfolio enquiry from ${values.name}`,
                text: `${values.message}\n\n— ${values.name} <${values.email}>`,
            }),
            signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
        });
        if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text().catch(() => "")}`);
    } catch (err) {
        console.error("Contact form send failed:", err);
        return { status: "error", message: "Couldn't send right now — please email me directly.", values };
    }

    return { status: "success" };
}
