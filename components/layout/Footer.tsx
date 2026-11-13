import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { contact } from "@/data/resume";
import { NAV_LINKS } from "@/config/nav";
import { LocalTime } from "@/components/ui/LocalTime";

export function Footer() {
    const elsewhere = [
        { label: "Email", href: `mailto:${contact.email}`, ext: false },
        { label: "LinkedIn", href: contact.linkedin, ext: true },
        ...(contact.github ? [{ label: "GitHub", href: contact.github, ext: true }] : []),
    ];

    return (
        <footer data-print="hide" className="relative overflow-hidden border-t border-border">
            <div className="wrap pt-14 pb-8">
                <div className="grid gap-10 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
                    <div>
                        <p className="font-semibold tracking-tight text-fg text-lg">
                            {contact.name}<span className="text-accent">.</span>
                        </p>
                        <p className="mt-1 text-sm text-fg-2">{contact.title} &amp; Technical Lead</p>
                        <p className="mt-4 font-mono text-xs text-fg-3">
                            {contact.locationShort} · <LocalTime timeZone={contact.timezone} label={contact.timezoneLabel} />
                        </p>
                    </div>

                    <nav aria-label="Footer">
                        <h2 className="t-label text-fg-3 mb-3">Navigate</h2>
                        <ul className="space-y-2">
                            {NAV_LINKS.map(l => (
                                <li key={l.id}>
                                    <Link href={l.href} className="text-sm text-fg-2 hover:text-accent transition-colors duration-200">{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="t-label text-fg-3 mb-3">Elsewhere</h2>
                        <ul className="space-y-2">
                            {elsewhere.map(({ label, href, ext }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className="text-sm text-fg-2 hover:text-accent transition-colors duration-200"
                                    >
                                        {label}
                                        {ext && <><span aria-hidden> ↗</span><span className="sr-only"> (opens in a new tab)</span></>}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
                    <p className="font-mono text-xs text-fg-3">
                        © {new Date().getFullYear()} {contact.name} · Built with Next.js &amp; Tailwind CSS
                    </p>
                    <a
                        href="#top"
                        className="group inline-flex items-center gap-2 t-label text-fg-2 hover:text-accent transition-colors duration-200"
                    >
                        Back to top
                        <ArrowUp size={14} aria-hidden className="transition-transform duration-300 ease-expo group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>

            {/* Oversized clipped wordmark */}
            <p
                aria-hidden
                className="pointer-events-none select-none -mb-[0.22em] text-center font-semibold leading-[0.8] tracking-[-0.06em] text-fg/[0.05] whitespace-nowrap"
                style={{ fontSize: "clamp(5rem, 24vw, 22rem)" }}
            >
                {contact.firstName}
            </p>
        </footer>
    );
}
