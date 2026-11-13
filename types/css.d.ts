import "react";

/* Allow CSS custom properties in `style` props without `as CSSProperties` casts:
   style={{ "--tone": "var(--v-cyan)" }} */
declare module "react" {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}
