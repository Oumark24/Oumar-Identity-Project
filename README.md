# Identity Blueprint

A single-page site I built for my 9th-grade advisory identity project at Manhattan Hunter Science High School — three words that define me, the things that fill my cup and drain my battery, and my one-, three-, and five-year goals, presented as a designed editorial page instead of a slide deck.

**Live:** https://oumark24.github.io/Oumar-Identity-Project/

This was my first GitHub repository. The original version was a single 1,000-line HTML file uploaded through the web UI; it has since been rebuilt into a proper static site with separated concerns, semantic markup, and a deploy pipeline.

## Structure

```
index.html      markup and metadata
styles.css      design system, layout, animations, print styles
script.js       custom cursor + scroll-reveal
favicon.svg     inline-drawn mark
.nojekyll       serve files as-is on Pages
.github/workflows/static.yml   deploy to GitHub Pages on push to main
```

`oumar-identity-blueprint-2.html` is kept as the original submitted version so the before/after is visible in the repo.

## Sections

- **Part 01 — The Foundation.** Three defining words as a numbered list, plus five identity markers as cards.
- **Part 02 — The Interior.** Two columns: what fills my cup and what drains my battery.
- **Part 03 — The Expansion.** A vertical timeline of 1-year, 3-year, and 5-year goals, each with the reason behind it.
- **Part 04 — The Aesthetic.** The design rationale, the five-color palette with hex values, and the keywords behind the visual direction.

## Design and implementation notes

**Design system in CSS custom properties.** Colors (`--gold` `#c9a84c`, `--crimson` `#9b1d20`, `--black` `#0a0a0a`) and the three-typeface stack (Bebas Neue display, DM Sans body, Space Mono labels) are declared once in `:root`, so the palette shown in Part 04 and the palette used by the page are the same values.

**No frameworks, no build step.** Plain HTML, CSS, and one JavaScript file — no bundler, no dependencies to install, nothing to compile. Google Fonts is the only external request.

**Fluid type instead of breakpoint-swapped sizes.** Headings use `clamp()` (e.g. `clamp(72px, 12vw, 160px)` for the name), so they scale continuously; the single 900px breakpoint only restacks the two-column grids.

**Custom cursor that degrades.** The gold dot and trailing ring hide the native cursor, so `script.js` only enables them behind `(hover: hover) and (pointer: fine)` — on touch devices and for reduced-motion users the normal cursor stays. The ring eases toward the pointer inside one `requestAnimationFrame` loop rather than scheduling a timer on every `mousemove`.

**Scroll reveal with a real fallback.** An `IntersectionObserver` staggers each item in by its index within its parent (`index * 100`ms) and unobserves it once shown. If the API is missing or the visitor prefers reduced motion, every element is marked `visible` immediately, so content is never trapped behind an animation that won't run.

**Accessibility.** Semantic landmarks (`header` / `main` / `section` / `footer`), one `h1` with real heading levels under it, lists marked up as lists, a skip link, `:focus-visible` outlines, `aria-labelledby` on each section, `aria-hidden` on decorative graphics and emoji, and a `prefers-reduced-motion` block that flattens animations.

**Print stylesheet.** It's a school project, so printing matters: the print rules drop the decorative panels, noise overlay and cursor, invert to dark-on-white, and set `page-break-inside: avoid` on sections.

## Running it

No install step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Every push to `main` runs `.github/workflows/static.yml`, which uploads the repository as a Pages artifact and deploys it. There's nothing to build, so the deployed site is exactly what's in the repo.

## Content note

The text is my own writing from the assignment and hasn't been rewritten — only the presentation, structure, and code quality changed.
