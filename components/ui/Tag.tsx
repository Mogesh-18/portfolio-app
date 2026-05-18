import { cn } from "@/lib/utils";

interface TagProps {
    children: React.ReactNode;
    variant?: "default" | "accent" | "subtle";
    className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-sm font-mono text-xs font-medium",
                "border transition-colors duration-200",
                variant === "default" && "bg-bg-elevated border-border text-fg-muted hover:border-accent hover:text-accent",
                variant === "accent" && "bg-transparent border-accent/40 text-accent",
                variant === "subtle" && "bg-bg-elevated border-border-subtle text-fg-subtle",
                className
            )}
        >
            {children}
        </span>
    );
}
