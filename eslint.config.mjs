import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        // Unused code is an error here rather than via tsconfig's noUnused* flags:
        // those also type-check Next's generated .next/dev/types files, which
        // contain unused imports and would break local builds.
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" }],
            // Accessibility: the strict jsx-a11y set (the plugin is already registered by eslint-config-next)
            ...jsxA11y.flatConfigs.strict.rules,
        },
    },
    {
        // Type-aware rules
        files: ["**/*.{ts,tsx,mts}"],
        languageOptions: {
            parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
        },
        rules: {
            "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
            // A new union member (e.g. a palette Action) must be handled in every switch
            "@typescript-eslint/switch-exhaustiveness-check": ["error", { considerDefaultExhaustiveForUnions: true }],
        },
    },
    {
        // ARIA combobox with aria-activedescendant: keyboard handling lives on the
        // input, options take mouse clicks only, <ul role="listbox"> is the correct
        // pattern, and focusing the input when the modal dialog opens is intended.
        files: ["components/features/command-palette/CommandPalette.tsx"],
        rules: {
            "jsx-a11y/click-events-have-key-events": "off",
            "jsx-a11y/no-noninteractive-element-interactions": "off",
            "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
            "jsx-a11y/no-autofocus": "off",
        },
    },
    {
        // Client components get content as props (data/client.ts) so the
        // whole of data/resume.ts never ships to the browser.
        files: [
            "components/layout/Header.tsx", "components/layout/MobileNav.tsx", "components/layout/useActiveSection.ts",
            "components/ui/**/*.tsx", "components/features/command-palette/**", "components/features/theme/**",
            "components/features/contact/ContactForm.tsx", "components/features/contact/CopyEmail.tsx",
            "hooks/**/*.ts",
        ],
        rules: {
            "@typescript-eslint/no-restricted-imports": ["error", {
                paths: [
                    { name: "@/data/resume", message: "Client code: receive content as props instead (see data/client.ts).", allowTypeImports: true },
                    { name: "@/data/client", message: "Client code: use `import type` only.", allowTypeImports: true },
                    { name: "@/config/site", message: "Server-only: it imports data/resume.ts." },
                ],
            }],
        },
    },
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
