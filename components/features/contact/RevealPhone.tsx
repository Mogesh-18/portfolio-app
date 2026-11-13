"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowUpRight, Eye, Loader2, Phone } from "lucide-react";
import { track } from "@vercel/analytics";
import { revealPhone } from "./actions";
import { channelCard } from "./channel-card";

/**
 * Phone channel card that only fetches the number when clicked (Server Action),
 * so it never appears in the page HTML, page data or JS bundle for scrapers.
 */
export function RevealPhone() {
    const [phone, setPhone] = useState<{ display: string; tel: string } | null>(null);
    const [error, setError] = useState(false);
    const [pending, startTransition] = useTransition();
    const linkRef = useRef<HTMLAnchorElement>(null);

    // Move focus to the revealed link so keyboard users can call straight away
    useEffect(() => {
        if (phone) linkRef.current?.focus();
    }, [phone]);

    if (phone) {
        return (
            <a ref={linkRef} href={`tel:${phone.tel}`} className={channelCard.root}>
                <span aria-hidden className={channelCard.icon}><Phone size={17} strokeWidth={1.75} /></span>
                <span className="min-w-0 flex-1">
                    <span className={channelCard.label}>Phone</span>
                    <span className={channelCard.value}>{phone.display}</span>
                </span>
                <ArrowUpRight size={18} aria-hidden className={channelCard.arrow} />
            </a>
        );
    }

    const reveal = () => startTransition(async () => {
        const res = await revealPhone();
        if (res.ok) {
            setPhone({ display: res.display, tel: res.tel });
            track("reveal_phone");
        } else {
            setError(true);
        }
    });

    return (
        <button type="button" onClick={reveal} disabled={pending} aria-live="polite" className={channelCard.root}>
            <span aria-hidden className={channelCard.icon}>
                {pending ? <Loader2 size={17} className="animate-spin" /> : <Phone size={17} strokeWidth={1.75} />}
            </span>
            <span className="min-w-0 flex-1">
                <span className={channelCard.label}>Phone</span>
                <span className={channelCard.value}>
                    {error ? "Unavailable right now — please email me" : pending ? "Loading…" : "Show phone number"}
                </span>
            </span>
            <Eye size={18} aria-hidden className={channelCard.arrow} />
        </button>
    );
}
