# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Jekyll static site for GitHub Pages — **the personal site of Apostolos Stamenos** (biostatistician, federal technologist, writer). Redesigned from a repurposed firm skeleton into a personal portfolio. The design is currently **converging toward the OUROBOROS Consulting firm site** on a firm-palette baseline; a distinct color/texture identity is a planned later pass (see Design system section). Accessibility and trauma-informed framing remain non-negotiable design constraints.

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

**Section labels** — a page signature. Gold Inter observation-log labels (`.section-label`, e.g. "Observation Log 01 · Who", "Field Note 03 · Cybernetics") plus graduated tick-rule dividers rendered on top-level `<section>` via `::before`.

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

## Design system — Manuscript identity (garnet + gilt)

> **Direction (owner-confirmed):** The site converged structurally onto the OUROBOROS firm skeleton (ornament shapes, section labels, arch, boxed cards), then diverged in color and texture to a **distinct "Literary / manuscript" identity**: garnet jewel accent + aged gilt illumination on a warm black-brown ground, foxed-paper texture, illuminated drop-cap signature. Mood: a rare book under lamplight. The firm-gold convergence baseline is retired; do not reintroduce firm-gold (#C9A84C) or deep-navy hero grounds.

**Palette (manuscript):** warm black-brown grounds `--bg0` #0D0A08, hero band `--bg-hero` #1A130E, panel ramp `--bg1` #14100C / `--bg2` #1E1813 / `--bg3` #29211A. Garnet-rose `--accent` #CE6B7A for section labels, rules, ornament, buttons, hero jewel (`.hero-name-sub`). Lighter garnet `--accent-2` #D97F8B for links/interaction. Aged gilt `--gold-border` #B1935D frames boxed cards and illuminates the arch. Deep jewel `--garnet-deep` #A23B4E is **drop-cap / large-ornament only** (fails AA as small text). `--oxide` #e06c5a is advocacy/whistleblowing only.

**Accessibility note (verified on the warm-brown ramp):** accent garnet 4.5–5.6:1; link 5.5–6.9:1; text 12.4–15.5:1; subdued 6.8–8.4:1; muted (`#9C8F79`) 4.99:1 on bg3; drop-cap `--garnet-deep` 3.07:1 (large-text AA only). Light-mode: accent `#8f2f40` 6.8:1, link `#9a3b48` 5.8:1, text 13.1:1. The warm-brown grounds are load-bearing for contrast — do not lighten `--bg0`.

Font stack (loaded via Google Fonts in `default.html`):
- Lora — `--font-display` AND `--font-serif`: hero name, all headings, and body/prose (serif-first, firm-style)
- Inter — `--font-body`: section labels, eyebrows, buttons, nav, UI
- JetBrains Mono — `--font-mono`: **code, pre, kbd only**

CSS custom properties: `--bg0/1/2/3`, `--bg-hero`, `--border`, `--calloutbg`, `--hairline` (gilt), `--text` (parchment), `--bright`, `--subdued`, `--muted`, `--accent` (garnet-rose), `--accent-dim`, `--gold-ghost`, `--gold-border` (aged gilt), `--garnet-deep` (drop-cap only), `--accent-2` (lighter garnet), `--accent-2-dim`, `--oxide`, `--tick-rule`, plus `--font-display/body/mono/serif`. Full light-mode overrides (aged-paper ramp) under `@media (prefers-color-scheme: light)`.

Signature (manuscript): garnet section labels (Inter, uppercase, 0.22em) + graduated tick-rule dividers + `arch-divider.html` gilt-illuminated scalloped arch (inserted once in `home.html` after the hero) + boxed-gilt `.card--formula` (aged-gilt frame, cut corners, scallop-watermark interior) + hero on a warm-brown ground with a self-contained gilt scallop watermark + warm edge vignette + a garnet-rose hero jewel (`.hero-name-sub`). **Two distinguishing marks:** a full-body **foxing grain** (feTurbulence fractalNoise data-URI on `body`, ~5% opacity) and an **illuminated drop-cap** on the homepage bio first paragraph (`.bio-body > p:first-of-type::first-letter`, `--garnet-deep` with a gilt text-shadow).

**Nav** — converged toward the firm's tall lockup: enlarged logo mark + stacked serif wordmark (name in Lora, surname as a gold uppercase sub-line) on a taller primary bar, with the two-tier secondary nav retained below. Uses Lora, not the firm's Cormorant SC (stays within the loaded font stack).

**Deferred to a later pass (NOT yet ported):** animated Greek-key meander hero border, mahogany-framed headshot, marble/raster textures.

No em dashes. Dingbats over emoji. `var(--text)` for SVG stroke/border color.

No em dashes. Dingbats over emoji. `var(--text)` for SVG stroke/border color.

## Content conventions

Social links in footer: `site.github_url`, `site.linkedin_url`, `site.tutoring_url`, `site.substack_url` — set in `_config.yml` (tutoring/substack currently empty; footer guards on non-empty).

Hero front matter keys: `name_line1`, `name_line2`, `eyebrow`, `tagline`, `cta_url`, `cta_label`, `cta2_label`, `cta2_url`. Homepage `bio:` front matter is rendered via `markdownify`.
