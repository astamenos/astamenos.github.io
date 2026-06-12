# Session: CSS/SCSS Copy + Homepage Content

**Date:** 2026-06-12
**Repo:** astamenos.github.io

---

## What was done

### SCSS source files copied from firm site

Two files added to `assets/css/`:

- `dashboard.scss` — copied as-is with Jekyll front-matter intact. Self-contained (no npm imports). Jekyll compiles it to `dashboard.css` on deploy.
- `main.scss` — copied WITHOUT front-matter. Jekyll ignores it; the existing compiled `main.css` remains the served stylesheet. The file is a source reference only. The npm `@import "@ouroboros-consulting/ouroboros-design/scss/index"` stays in the file but is never executed.

**Constraint enforced:** Firm site at `/Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io` was not modified.

**Why the split approach:** `main.scss` imports an npm package that GitHub Pages cannot resolve. Stripping front-matter prevents Jekyll from attempting compilation. When diverging `main.scss` from the firm site later, the npm import must be removed (or inlined) before adding front-matter back.

---

### Homepage content updates (prior session, confirmed)

- `index.html` eyebrow: `Technology. Research. Advocacy.`
- `index.html` tagline: outcome-first, voice-compliant, institutions-failed framing
- `_config.yml` Research description: HiTOP training from University of Minnesota added
- `_layouts/home.html` audience card 3: "navigating" construction removed

---

## Outstanding work (not done)

- Services pages: `/services/technology/`, `/services/advocacy/`, `/services/research/`, `/services/education/` — all 404
- Case study pages: `/case-studies/hhs-migration/`, `/case-studies/ocdo/` — all 404
- `/about/` and `/intake` pages missing
- 5th audience card (pro se litigants) — discussed, not added
