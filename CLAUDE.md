# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Jekyll static site for GitHub Pages — **the personal site of Apostolos Stamenos** (biostatistician, federal technologist, writer). Redesigned from a repurposed firm skeleton into a personal portfolio under the **Observatory** visual identity. It is deliberately visually distinct from the OUROBOROS Consulting firm site. Accessibility and trauma-informed framing remain non-negotiable design constraints.

**Legal surface:** Some content touches an ongoing personal legal matter. Public pages carry **zero case specifics, zero named adversaries, and no University of Minnesota / Minnesota framing as adversary.** The whistleblowing page is advocacy and education only. Never source from any `Personal/Legal/` vault files. Any expansion beyond advocacy framing requires attorney review first.

## Build and deploy

```bash
bundle exec jekyll serve            # local preview at localhost:4000
bundle exec jekyll serve --livereload
```

CI: push to `main` → `jekyll-build-pages@v1` → GitHub Pages deploy (`.github/workflows/jekyll-gh-pages.yml`).

`_site/` is build output — never edit directly, not tracked in git.

## Architecture

```
_layouts/      HTML shells (default, home, foundation, mission, dashboard)
_includes/     Liquid partials (hero, nav, footer, banner, playlist-carousel, toc)
_data/         YAML: nav, values, interests, banner, testimonials, playlists, reading, listening, timeline
_pages/        Standalone pages (cv, interests, ouroboros, whistleblowing, reading, listening)
assets/css/    Two compiled files: personal.css, dashboard.css (see CSS section)
assets/js/     main.js (carousel, flip cards, cursor spotlight, fade-in), playlist-carousel.js
```

`default.html` is the HTML shell. All other layouts extend it via `layout: default`.

`_pages/` files are processed because `_config.yml` sets `include: [_pages]`. Each file sets its own `permalink`. Without that include, `_pages` (leading underscore) is excluded from the build and every page 404s.

## CSS architecture

Two-file system:

| File | Front matter | Output |
|---|---|---|
| `assets/css/personal.scss` | `---` present | `personal.css` (compiled by Jekyll) |
| `assets/css/dashboard.scss` | `---` present | `dashboard.css` (compiled by Jekyll) |

`personal.scss` is the **Observatory** design system: self-contained, no npm imports. It replaces the retired firm stylesheet (`main.css`/`main.scss`). Loaded on every page in `default.html`.

`dashboard.css` loads only on `layout: dashboard` pages (conditional in `default.html`). For any other page-specific CSS, set `extra_css: <filename>` in front matter — loads `/assets/css/<filename>.css`.

## Data sources

- `site.data.*` — standard Jekyll data from `_data/` (nav, values, interests, banner, testimonials, playlists, reading, listening, timeline)
- The firm site's `site.services` and `site.case_studies` (`_config.yml`) have been removed.

## Layout conventions

**Page-title-banner** — auto-rendered in `default.html` when `page.title` is set AND layout is not `home`/`foundation`/`mission` AND `page.banner != false`. Adds `has-title-banner` class to `<body>`.

**Meta description priority**: `page.lede` → `page.description` → fallback string.

**JSON-LD** (Schema.org) injected on homepage only.

**`search.js`** is referenced in `default.html` but does not exist yet — do not remove the reference.

## Secondary nav

Driven by `_data/nav.yml`. Supports nested `children` arrays for dropdowns. Use `active_paths` array on an entry to highlight it across multiple URL prefixes.

## Component patterns

**Section labels** — the Observatory signature. Mono observation-log labels (`.section-label`, e.g. "Observation Log 01 · Who", "Field Note 03 · Cybernetics") plus graduated tick-rule dividers rendered on top-level `<section>` via `::before`.

**Card system** — `card--formula` still exists but is flattened to a left-accent-border panel (no boxed firm look). Legacy markup:
```html
<div class="card--formula">
  <div class="card--formula__interior"><!-- content --></div>
</div>
```

**Banner** — `_data/banner.yml` keys: `visible`, `type` (`announcement` | `tagline` | `brand`), `text`, optional `url`.

**Playlist carousel** — lazy-loads Apple Music iframes via `data-src` swap. Add to `_data/playlists.yml`. Optional `height` key (default 450; use 175 for single-album view).

**Values cards** — flip-card pattern (`.values-card__front` / `.values-card__back`). Click toggles `.is-flipped` via `main.js`. Crossfades (opacity) under reduced-motion.

**Interest tiles** — `.interests-grid` / `.interest-tile` on the homepage teaser; each links to `/interests/#slug`. Slugs must match the `id`s of the `<section>`s on the interests page.

**Testimonials carousel** — `#testimonials`, auto-advances every 7s, pauses on hover. Initialized by `initCarousel()` in `main.js`. Rendered only when `site.data.testimonials.size > 0`.

**Advocacy accent** — `.advocacy` wrapper (whistleblowing page only) recolors labels/headings/links to `--oxide` and adds a left rule.

## Accessibility requirements

- Disclaimer bar in `footer.html` is boilerplate — never remove it.
- All iframes must have a `title` attribute.
- All decorative SVGs must have `aria-hidden="true"`.
- Interactive controls without visible text labels need `aria-label`.
- Respect `prefers-reduced-motion` (fade-ins, flip cards) and `prefers-color-scheme` (full light-mode token set).

> **Note:** The firm site's quick-exit button was deliberately removed by the owner for this personal site. This is an intentional owner override of the firm-site rule, not an oversight.

## Design system — Observatory

Ground: dark blue-slate (`--bg0` #0b1220 family). Accent: glacial cyan `--accent` (#7dd3fc). `--oxide` (#e06c5a) is reserved for the advocacy/whistleblowing surface only.

Font stack (loaded via Google Fonts in `default.html`):
- Space Grotesk — display, hero name, headings
- Inter — body, UI
- JetBrains Mono — section labels, data, badges
- Lora — serif editorial (OUROBOROS book page)

CSS custom properties: `--bg0/1/2/3`, `--border`, `--hairline`, `--text`, `--bright`, `--subdued`, `--muted`, `--accent`, `--accent-dim`, `--oxide`, `--tick-rule`, plus `--font-display/body/mono/serif`. Full light-mode overrides under `@media (prefers-color-scheme: light)`.

Signature: observation-log mono section labels + graduated tick-rule dividers + faint star-field body texture + telescope-beam cursor glow (`--cx/--cy` set by `main.js`).

No em dashes. Dingbats over emoji. `var(--text)` for SVG stroke/border color.

## Content conventions

Social links in footer: `site.github_url`, `site.linkedin_url`, `site.tutoring_url`, `site.substack_url` — set in `_config.yml` (tutoring/substack currently empty; footer guards on non-empty).

Hero front matter keys: `name_line1`, `name_line2`, `eyebrow`, `tagline`, `cta_url`, `cta_label`, `cta2_label`, `cta2_url`. Homepage `bio:` front matter is rendered via `markdownify`.
