"use server";
import { contact } from "@/data/resume";

export type ContactField = "name" | "email" | "message";

export type ContactState = {
    status: "idle" | "success" | "error";
    message?: string;
    errors?: Partial<Record<ContactField, string>>;
    /** Echo the values back so the form keeps them after a validation error */
    values?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;

/**
 * Sends the contact form via Resend's REST API.
 * Env: RESEND_API_KEY (required), CONTACT_TO (defaults to the resume email),
 *      CONTACT_FROM (defaults to Resend's shared test sender).
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
    // Spam guards: hidden honeypot field + minimum time on the form
    if (formData.get("company")) return { status: "success" };
    const started = Number(formData.get("started"));
    if (!started || Date.now() - started < MIN_FILL_MS) {
        return { status: "error", message: "That was quick — please try again in a moment." };
    }

    const values = {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
    };

    const errors: ContactState["errors"] = {};
    if (!values.name || values.name.length > 100) errors.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Please enter a valid email address.";
    if (values.message.length < 10) errors.message = "Please write at least a sentence or two.";
    else if (values.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
    if (Object.keys(errors).length) return { status: "error", errors, values };

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
        });
        if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } catch (err) {
        console.error("Contact form send failed:", err);
        return { status: "error", message: "Couldn't send right now — please email me directly.", values };
    }

    return { status: "success" };
}
