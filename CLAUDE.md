# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Jekyll static site for GitHub Pages — **OUROBOROS Consulting**. Serves survivors, senior citizens, veterans, and institutionally betrayed populations. Accessibility and trauma-informed framing are non-negotiable design constraints.

## Build and deploy

No local build is configured yet (`_config.yml` and `Gemfile` are absent). All builds run via GitHub Actions:

- Push to `main` → `jekyll-build-pages@v1` → GitHub Pages deploy
- Workflow: `.github/workflows/jekyll-gh-pages.yml`

To enable local preview, you need to add a `Gemfile` and `_config.yml`. Until then, validate by inspecting Liquid syntax and YAML structure directly.

## Architecture

```
_includes/     Liquid partials (hero, nav, footer, banner, campaign, playlist-carousel)
_data/         YAML files that feed Liquid templates
assets/js/     Vanilla JS for interactive components
```

No `_layouts/` or `_pages/` exist yet — these will need to be created.

## Component patterns

**Card system** — the design atom. Every interactive or content block uses:
```html
<div class="card--formula">
  <div class="card--formula__interior">
    <!-- content -->
  </div>
</div>
```

**Data-driven components** — add entries to `_data/*.yml`, reference in Liquid with `site.data.<filename>`. Example: `_data/playlists.yml` → `{% include playlist-carousel.html %}`.

**Banner** — driven by `site.data.banner`. Expects a `_data/banner.yml` with keys: `visible`, `type` (`announcement` | `tagline` | `brand`), `text`, and optional `url`.

**Playlist carousel** — lazy-loads Apple Music iframes via `data-src` swap on slide activation. Add playlists to `_data/playlists.yml`. Supports optional `height` override (default 450; use 175 for single-album).

## Accessibility requirements

- **Quick-exit button** is always visible in `nav.html`. It redirects to a neutral page (Google Weather) and is keyboard-accessible via double-tap ESC. Never remove or disable it.
- All iframes must have a `title` attribute.
- All decorative SVGs must have `aria-hidden="true"`.
- Interactive controls need `aria-label` when there is no visible text label.

## Design system

- Dark, elegant, typographically hierarchical. Dimensional — different textures and brightness levels per hierarchy tier. Progressive brightness toward high-priority content.
- No em dashes. Dingbats over emoji.
- CSS custom property `var(--text)` for stroke/border color in SVG ornaments.

## Content conventions

- Disclaimer bar (in `footer.html`) is boilerplate — never remove it.
- Social links in footer come from `site.github_url`, `site.linkedin_url`, `site.tutoring_url`, `site.substack_url` — these live in `_config.yml` (to be created).
- Hero front matter keys: `name_line1`, `name_line2`, `eyebrow`, `tagline`, `cta_url`, `cta_label`, `cta2_label`, `cta2_url`.
