import { cn } from "@/lib/utils";

interface SectionLabelProps {
    index?: string;
    label: string;
    className?: string;
}

/**
 * A monospaced eyebrow label with an optional numeric index.
 * Used above each section heading.
 */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {index && (
                <span className="label-sm text-fg-subtle">{index}</span>
            )}
            
            <span className="label-sm text-accent" aria-label={label} >
                {label}
            </span>
        </div>
    );
}
