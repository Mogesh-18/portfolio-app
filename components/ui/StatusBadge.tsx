import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "Live" | "Archived" | "In Progress";
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 label-sm px-2 py-0.5 rounded-full border",
                status === "Live" && "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30",
                status === "Archived" && "text-fg-muted border-border bg-bg-elevated",
                status === "In Progress" && "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30",
                className
            )}
        >
            <span
                className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    status === "Live" && "bg-emerald-500 animate-pulse",
                    status === "Archived" && "bg-fg-subtle",
                    status === "In Progress" && "bg-amber-500 animate-pulse"
                )}
            />
            {status}
        </span>
    );
}
