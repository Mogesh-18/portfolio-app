"use client";
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
    const id = setInterval(onChange, 15_000);
    return () => clearInterval(id);
};

/** Live clock in a fixed timezone, e.g. "14:32 IST". Renders "--:--" on the server. */
export function LocalTime({ timeZone, label }: { timeZone: string; label: string }) {
    const time = useSyncExternalStore(
        subscribe,
        () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date()),
        () => null
    );

    return (
        <span className="tabular-nums">
            {time ?? "--:--"} {label}
        </span>
    );
}
