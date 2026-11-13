/** Shared look of the Contact section's channel cards (links and the phone reveal button). */
export const channelCard = {
    root:
        "group flex w-full items-center gap-4 rounded-xl border border-border bg-bg-2/60 p-4 text-left " +
        "transition-[border-color,background-color,translate] duration-300 ease-expo hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg-card",
    icon:
        "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-bg-card text-fg-2 " +
        "transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent-t group-hover:text-accent",
    label: "t-label block text-fg-3",
    value: "mt-0.5 block truncate text-sm font-medium text-fg group-hover:text-accent transition-colors duration-200",
    arrow: "shrink-0 text-fg-3 transition-all duration-300 ease-expo group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
};
