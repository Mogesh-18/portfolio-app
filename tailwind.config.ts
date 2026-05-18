import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./providers/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font)", "sans-serif"],
            },
            colors: {
                bg: "var(--bg)",
                "bg-2": "var(--bg-2)",
                "bg-3": "var(--bg-3)",
                "bg-tint": "var(--bg-tint)",
                "bg-card": "var(--bg-card)",
                fg: "var(--fg)",
                "fg-2": "var(--fg-2)",
                "fg-3": "var(--fg-3)",
                accent: "var(--accent)",
                "accent-2": "var(--accent-2)",
                "accent-t": "var(--accent-tint)",
                border: "var(--border)",
                "border-2": "var(--border-2)",
            },
            transitionTimingFunction: {
                expo: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
        },
    },
    plugins: [],
};
export default config;
