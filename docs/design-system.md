# Design system

All tokens are CSS variables in [`app/globals.css`](../app/globals.css):
- `:root` holds the light-theme values.
- `.dark` overrides them for dark mode.
- `@theme inline` exposes them to Tailwind utilities.

## Colour

### Neutrals and accent

| Token | Utility | Use |
|---|---|---|
| `--bg`, `--bg-2`, `--bg-3` | `bg-bg`, `bg-bg-2`, `bg-bg-3` | Page and subtle surfaces |
| `--bg-card` | `bg-bg-card` | Cards |
| `--fg`, `--fg-2`, `--fg-3` | `text-fg`, `text-fg-2`, `text-fg-3` | Primary, secondary and tertiary text |
| `--accent`, `--accent-2`, `--accent-tint` | `text-accent`, `bg-accent-t` | Indigo accent |
| `--accent-solid` | `bg-accent-solid` | Solid fills carrying white text |
| `--border`, `--border-2` | `border-border`, `border-border-2` | Translucent hairlines |
| `--shadow-1` … `--shadow-4` | `style={{ boxShadow: "var(--shadow-2)" }}` | Restrained elevation; in dark mode, an inset top highlight replaces drop shadows |

**Every text token is checked against every surface for WCAG AA (≥ 4.5:1) in both themes.** Opacity modifiers work on all tokens, for example `bg-accent/10` and `border-border/60`.

### Vibrant palette

`--v-indigo`, `--v-violet`, `--v-fuchsia`, `--v-pink`, `--v-orange`, `--v-amber`, `--v-emerald`, `--v-cyan`, `--v-blue` (utilities: `bg-v-violet/20`, `text-v-emerald`, …). Each has a brighter variant for dark mode.

| Gradient | Use |
|---|---|
| `--grad-brand` (indigo → violet → pink) | Display text, the timeline rail, glows |
| `--grad-solid` | Primary buttons and badges with white text; every stop is ≥ 4.6:1 against white |

**Rule:** vibrant colours are for icons, glows, borders, gradients and *large* display text. Small body text always stays on the `fg` tokens.

### Per-component "tone"

Cards set two CSS variables, `--tone` and `--tone-2`, and style themselves from them:

```tsx
<div style={{ "--tone": "var(--v-cyan)", "--tone-2": "var(--v-blue)" } as CSSProperties}
     className="border-(--tone)/40 bg-(--tone)/10">
  <span className="bg-[linear-gradient(135deg,var(--tone),var(--tone-2))]" />
</div>
```

The cursor spotlight (`.spotlight`) picks up `--tone` automatically. Project cards take their tone from `projectTone(p)` in `components/projects/ProjectCover.tsx`.

## Theme

- **Light by default for every first-time visitor.** The OS dark/light preference is ignored (`defaultTheme="light"`, `enableSystem={false}` in `providers/ThemeProvider.tsx`).
- The toggle (header, mobile menu, ⌘K) switches themes with a circular **View Transitions** reveal (`lib/theme-switch.ts`), and the choice is saved in `localStorage`.

## Typography

| Class / font | Use |
|---|---|
| Geist Sans (`font-sans`) | All content. Headings use weight 600 with tight tracking. |
| Geist Mono (`font-mono`, `.t-label`) | Eyebrows, labels, metadata, numbers |
| Instrument Serif italic (`font-serif`, via `<Accent>`) | The highlighted phrase in headings, in the brand gradient |
| `.t-display`, `.t-h1`, `.t-h2` | Fluid display, section and card heading sizes |

## Layout

- `.wrap`: centred container, `max-width: 1360px`, gutters `clamp(1rem, 4vw, 2.5rem)`.
- `.section-y`: vertical rhythm between sections, `clamp(2.5rem, 5vw, 4.5rem)` per side.
- The desktop navigation shows from `lg` (1024px) up. Below that, the full-screen mobile menu is used.

## Components

| Component | Type | Purpose |
|---|---|---|
| `SectionHeader` | Server | Pill eyebrow (`01 · About`), h2, supporting copy and meta |
| `Accent` | Server | Gradient serif-italic heading phrase |
| `Reveal` | Client | Fades and lifts children in on scroll. One shared IntersectionObserver for the whole page; `delay` staggers items. |
| `SpotlightGroup` | Client | Cursor-following gradient border and glow on `.spotlight` children |
| `CountUp` | Client | Counts a value ("40%", "4+") up once in view; the final value is server-rendered |
| `LocalTime` | Client | Live clock in a fixed timezone |
| `Magnetic` | Client | Pulls a CTA slightly towards the cursor (precise pointers only) |
| `CopyEmail`, `CvLink` | Client | Copy-to-clipboard and CV download, both with analytics events |
| `CommandPalette` | Client | ⌘K / Ctrl K dialog; open it from anywhere with `openCommandPalette()` |
| `ScrollTop` | Client | Floating back-to-top button with a scroll-progress ring |
| `ProjectCover` + `covers.tsx` | Server | Mesh-gradient frame and per-project illustration |

## Motion

There is no animation library.

| Effect | How |
|---|---|
| Hero entrance, name line-mask | CSS keyframes (`.enter`, `.line-mask`) that paint without JavaScript |
| Scroll reveals | `<Reveal>` sets `data-shown`; `.reveal` animates it |
| Header progress bar, timeline rail and glowing head | CSS scroll-driven animations (`animation-timeline`), as progressive enhancement |
| Theme switch | View Transitions API circular clip-path |
| Mobile menu | Circular `clip-path` reveal from the button, with staggered links (`.menu-panel`, `.menu-item`) |
| Command palette | `<dialog>` with `@starting-style` fade and scale |

**Every effect respects `prefers-reduced-motion`.** Animations collapse to instant, and the marquee, rail and progress bar stop. Content hidden for reveals is only hidden when JavaScript runs (`html.js`), so the page reads fine without it.

## Accessibility checklist

- **Landmarks and headings:** a skip link, and an `aria-labelledby` heading on every section.
- **Keyboard and focus:** visible `:focus-visible` rings, and a minimum target size of 40px.
- **Mobile menu and palette:** the mobile menu traps focus, closes on Escape, is `inert` while closed and locks page scrolling. The palette uses the ARIA combobox/listbox pattern.
- **Hidden decoration:** decorative elements are `aria-hidden`.
- **External links:** they say "(opens in a new tab)" to screen readers.

## Print

Printing the home page produces a light, resume-style document:
- Navigation, decoration and buttons are hidden.
- Cards don't split across pages.
- External link URLs are printed.

Add `data-print="hide"` to anything else that shouldn't print.
