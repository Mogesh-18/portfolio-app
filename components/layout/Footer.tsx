import { contact } from "@/data/resume";

export function Footer() {
    return (
        <footer className="border-t border-border py-8">
            <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-fg-2">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-fg">{contact.name}</span>
                </p>
                
                <div className="flex items-center gap-6">
                    <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-fg-2 hover:text-accent transition-colors duration-200"
                    >
                        {contact.email}
                    </a>

                    <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-fg-2 hover:text-accent transition-colors duration-200"
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </div>
        </footer>
    );
}
