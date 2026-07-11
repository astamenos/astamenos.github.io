# Personal Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild astamenos.github.io as a personal portfolio with the "Observatory" visual identity, replacing the firm design system stylesheet and firm copy with vault-sourced personal content.

**Architecture:** One new Jekyll-compiled stylesheet (`personal.scss`) replaces the firm's compiled `main.css`. Existing layouts and includes are kept but restyled; firm-only sections and nav items are removed. Copy is ported from the Second-Brain vault, with drafted prose going through outline-then-approve.

**Tech Stack:** Jekyll (github-pages gem), SCSS via Jekyll's built-in pipeline, vanilla JS, Liquid.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-11-personal-site-redesign-design.md`. Read it before starting.
- Firm site at `/Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io` is read-only. Never modify.
- Vault root: `/Users/apostolos/Library/Mobile Documents/iCloud~md~obsidian/Documents/Second-Brain` (call it `$VAULT`).
- Palette: ground `#0b1220` family; accent glacial cyan `#7dd3fc`; secondary oxide red `#e06c5a` only on the whistleblowing page. Brightness rises with hierarchy.
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (data), Lora (book page only).
- No `card--formula` visuals anywhere. Hairline rules and elevation gradients instead.
- No em dashes in any copy. Dingbats over emoji. Voice: short sentences, no filler.
- Whistleblowing page: advocacy framing ONLY. Zero case specifics, zero UMN references, nothing sourced from `$VAULT/Personal/Legal/UMN`.
- Drafted prose (bio, interests, book, whistleblowing) requires user approval of an outline before final copy ships. CV transcription from `AS_Resume.tex` does not.
- WCAG AA contrast; respect `prefers-reduced-motion`; keep disclaimer bar; all iframes titled.
- Verify each task with `bundle exec jekyll build` (must exit 0). Commit at the end of every task.

---

### Task 1: Observatory stylesheet + swap in default.html

**Files:**
- Create: `assets/css/personal.scss`
- Modify: `_layouts/default.html` (font link ~line 54-56, stylesheet link ~line 58)
- Delete: `assets/css/main.css`, `assets/css/main.scss`

**Interfaces:**
- Produces: compiled `/assets/css/personal.css` styling every existing class the site markup uses (nav, hero, sections, values flip-cards, testimonials carousel, footer, page-title banner, foundation/mission layouts, CV classes). Later tasks assume these classes keep their names.

- [ ] **Step 1: Create `assets/css/personal.scss`** with Jekyll front matter (two `---` lines) so Jekyll compiles it. Token system:

```scss
---
---
// Observatory identity — astamenos.github.io personal site.
// Replaces the firm design system (main.css). Self-contained; no npm imports.

:root {
  --bg0: #0b1220;          // ground
  --bg1: #0f1a2e;          // section elevation
  --bg2: #16233d;          // panel
  --bg3: #1d2d4d;          // raised panel
  --border: #24334f;
  --hairline: rgba(125, 211, 252, 0.18);
  --text: #cbd5e1;
  --bright: #f1f5f9;
  --subdued: #94a3b8;
  --muted: #64748b;
  --accent: #7dd3fc;       // glacial cyan — where the firm used gold
  --accent-dim: rgba(125, 211, 252, 0.5);
  --oxide: #e06c5a;        // advocacy pages only
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-serif: "Lora", Georgia, serif;
}

@media (prefers-color-scheme: light) {
  :root {
    --bg0: #eef2f7; --bg1: #e5ebf3; --bg2: #dbe3ee; --bg3: #cfd9e8;
    --border: #b6c3d6; --hairline: rgba(12, 74, 110, 0.25);
    --text: #24344d; --bright: #0b1220; --subdued: #4a5c78; --muted: #64748b;
    --accent: #0369a1; --accent-dim: rgba(3, 105, 161, 0.5);
  }
}
```

Then, in this order, style each component group against the EXISTING markup class names (do not rename classes in HTML):

1. **Base:** `body` on `--bg0` with a faint star-field (two `radial-gradient` dots layers + `repeating-linear-gradient` grain at ≤3% opacity, disabled in light mode), `--font-body`, `--text`. Headings in `--font-display`, tracking tight, color `--bright`. Links `--accent`, underline on hover only. `::selection` accent on dark.
2. **Section rhythm:** every top-level `section` gets `padding: 5rem clamp(1.5rem, 6vw, 6rem)` and a top `border-top: 1px solid var(--hairline)`. `.section-label` = mono, uppercase, letter-spacing 0.2em, `--accent`, prefixed tick via `&::before { content: "// "; }`.
3. **Nav:** `.nav-shell` sticky, `--bg1` with backdrop blur, hairline bottom border. `.nav-logo-text` in `--font-display` (NOT Garamond). `.nav-card`/`.nav-card__interior` flatten to plain flex buttons: no borders, no card look; hover = `--accent` text. Secondary nav `.nav-sec-card`: mono small-caps-free uppercase labels, active state = accent underline (2px offset), no boxes. Hamburger + dropdown behavior styles preserved (`.nav-secondary--open` block display on mobile).
4. **Hero:** style existing `hero.html` classes; name lines in `--font-display` at `clamp(3rem, 9vw, 6.5rem)`, eyebrow in mono accent, tagline `--subdued` max-width 42ch. Vertical tick-mark ornament via `::before` border-left on the hero container.
5. **Values flip-cards:** keep `.values-card` 3D flip mechanics (`.values-card__inner` transform, `.is-flipped`), restyle surfaces: `--bg2` front, `--bg3` back, 1px `--border`, radius 4px (sharp, instrument-like), icon in `--accent`. No gold, no ornate borders. Under `prefers-reduced-motion`: replace rotation with opacity crossfade.
6. **Testimonials carousel:** keep `.carousel*` mechanics classes; slides become borderless blocks on `--bg1` with a left 2px accent rule; `cite` in mono `--muted`. Buttons/dots: minimal, accent on active.
7. **Footer:** flatten `card--formula` children in footer to plain icon links (style `.footer-social` directly: `--subdued`, hover `--accent`), since footer markup nests them (Task 2 removes the wrappers). `.disclaimer-bar`: mono 0.6875rem, `--muted`, `--bg1`, hairline top border. Keep visible.
8. **Page-title banner:** `.page-title-banner` on `--bg1`, title in `--font-display`, eyebrow mono accent.
9. **Foundation/mission layout classes:** grep `_layouts/foundation.html` and `_layouts/mission.html` for their class names and give each a minimal, legible Observatory treatment (backgrounds from the bg scale, headings display font, body text `--text`). Mission layout (`ouroboros.md`) additionally sets its prose in `--font-serif`.
10. **CV classes:** `.cv-header`, `.cv-name`, `.cv-contact` + new classes defined in Task 5 (`.cv-section`, `.cv-entry`, `.cv-entry__meta`, `.cv-entry__title`, `.cv-tags`). Entries use mono for dates/metadata, display font for org names.
11. **Utility:** `.fade-in` (opacity/translate transition, `.visible` resolves it; no-op under reduced motion). `.btn`/CTA links: 1px accent border, transparent fill, accent text; hover inverts.

- [ ] **Step 2: Trim fonts and swap stylesheet in `_layouts/default.html`.** Replace the Google Fonts `<link>` with:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap"
  rel="stylesheet" />
```

Replace `href="{{ '/assets/css/main.css' | relative_url }}"` with `href="{{ '/assets/css/personal.css' | relative_url }}"`.

- [ ] **Step 3: Delete `assets/css/main.css` and `assets/css/main.scss`** (`git rm`).

- [ ] **Step 4: Verify.** Run: `bundle exec jekyll build` → exit 0 and `_site/assets/css/personal.css` exists. Run: `grep -rn "main.css" _layouts _includes _pages index.html` → no hits. Serve and eyeball `/` and `/causes/` for unstyled markup.

- [ ] **Step 5: Commit.** `git commit -m "feat: replace firm design system with Observatory stylesheet"`

### Task 2: Strip firm chrome — nav, footer, JS, config

**Files:**
- Modify: `_data/nav.yml` (full rewrite), `_includes/nav.html`, `_includes/footer.html`, `assets/js/main.js`, `_config.yml`

**Interfaces:**
- Produces: nav entries for `/cv/`, `/interests/`, `/ouroboros/`, `/whistleblowing/`, `/reading/`, `/listening/` (pages created in Tasks 4-8; nav links may 404 until then — acceptable for prototype).

- [ ] **Step 1: Rewrite `_data/nav.yml`:**

```yaml
- title: CV
  url: /cv/

- title: Interests
  url: /interests/

- title: OUROBOROS
  url: /ouroboros/

- title: Whistleblowing
  url: /whistleblowing/

- title: Reading
  url: /reading/

- title: Listening
  url: /listening/
```

- [ ] **Step 2: Edit `_includes/nav.html`.** Delete the four `nav-button` blocks (quick-exit, CMD/CTRL which targets nonexistent `/del-cmd-ctrl/`, News which targets nonexistent `/announcements`, Contact which targets removed `/intake`) — the whole `<div class="nav-buttons">…</div>`. Keep logo, search form, hamburger.

- [ ] **Step 3: Edit `_includes/footer.html`.** Unwrap each social link from its `card--formula` wrappers (keep the bare `<a class="footer-social">…</a>` elements in a plain `<div class="footer-links">`). Delete the `/intake` Contact link entirely. Keep tutoring/substack links (URLs are empty strings in config; hide them with Liquid: wrap each in `{% if site.tutoring_url != "" %}` / `{% if site.substack_url != "" %}`). Keep logo, copyright, disclaimer bar untouched.

- [ ] **Step 4: Edit `assets/js/main.js`.** Delete the entire `initSafetyExit` IIFE (the `// ── Safety / Quick-exit` block, ~lines 109-136). Nothing else changes.

- [ ] **Step 5: Edit `_config.yml`.** Delete the whole `services:` list and the whole `case_studies:` list. Replace `description:` with:

```yaml
description: >
  Apostolos Stamenos. Statistician, federal technologist, writer.
  Personal site: CV, research interests, the OUROBOROS book, and advocacy.
```

- [ ] **Step 6: Verify.** `bundle exec jekyll build` → exit 0. `grep -rn "safety-exit\|intake\|del-cmd-ctrl\|announcements" _includes _layouts _data assets/js index.html` → only hits allowed are none. Serve: nav shows 6 entries, no Exit button, footer icons render flat.

- [ ] **Step 7: Commit.** `git commit -m "feat: strip firm chrome from nav, footer, js, config"`

### Task 3: Homepage rebuild

**Files:**
- Modify: `_layouts/home.html`, `index.html`, `_data/values.yml`, `_data/testimonials.yml`

**Interfaces:**
- Consumes: hero include (unchanged), values/testimonials data shapes (`title`, `icon`, `description` / `title`, `description`, `reference`).

- [ ] **Step 1: Rewrite `index.html` front matter** (hero copy; final wording user-approved at review):

```yaml
---
layout: home
name_line1: Apostolos
name_line2: Stamenos
eyebrow: Statistics. Systems. Stories.
tagline: >
  Statistician and federal technologist. PhD student.
  I study how institutions fail people, and how to prove it.
cta_label: Read the CV
cta_url: /cv/
cta2_label: The Book
cta2_url: /ouroboros/
---
```

- [ ] **Step 2: Rewrite `_layouts/home.html`.** Keep: hero include, `#values` section (flip-cards, unchanged markup), `#testimonials` section (carousel, unchanged markup but rewrite the italic context line to reference federal and academic work, and remove the inline `style` attribute in favor of a `.testimonials-context` rule in `personal.scss`). Delete: `#audience` section, commented-out `#about` stats block, `#services` section, `#work` case-studies section. Add two new sections:

```html
<!-- ── Bio ──────────────────────────────────────────────────────────────── -->
<section id="bio">
  <p class="section-label">Who I Am</p>
  <div class="bio-body">
    {{ site.data.bio | markdownify }}
  </div>
</section>

<!-- ── Interests teaser ─────────────────────────────────────────────────── -->
<section id="interests-teaser">
  <p class="section-label">What I Think About</p>
  <div class="interests-grid">
    {% for i in site.data.interests %}
    <a class="interest-tile" href="/interests/#{{ i.slug }}">
      <span class="interest-tile__name">{{ i.title }}</span>
      <span class="interest-tile__hint">{{ i.hint }}</span>
    </a>
    {% endfor %}
  </div>
</section>
```

Create `_data/interests.yml` with five entries (`title`, `slug`, `hint` one-liner) for statistics, psychopathology, cybernetics, mathematics, technology — hints drafted from `$VAULT/Gnosis/` folder names/notes, approved with the homepage review. The bio lives in `index.html` front matter as a `bio:` key (Jekyll `_data` does not take markdown files); the `#bio` section renders `{{ page.bio | markdownify }}`, so change `site.data.bio` in the snippet above to `page.bio`.

- [ ] **Step 3: Draft bio (~120 words) from `$VAULT/_Firm/Operations/AS_Resume.tex` summary paragraph**, rewritten first-person in voice profile. Present bio + hero copy + interest hints to user for approval before committing.

- [ ] **Step 4: Rework `_data/values.yml`** descriptions into personal principles (source: existing entries, reworded person-first, not firm-first). Rework `_data/testimonials.yml`: check `$VAULT/Work/Tutoring/Tutoring.md` for endorsements; if none usable, set the file to an empty list `[]` and wrap the `#testimonials` section in `{% if site.data.testimonials.size > 0 %}`.

- [ ] **Step 5: Verify.** `bundle exec jekyll build` → exit 0. Serve `/`: hero, bio, interests grid, values flip-cards work, testimonials hidden-or-populated correctly. No services/case-studies remnants: `grep -n "site.services\|site.case_studies" _layouts/home.html` → no hits.

- [ ] **Step 6: Commit.** `git commit -m "feat: rebuild homepage as personal portfolio"`

### Task 4: CV page from AS_Resume.tex

**Files:**
- Modify: `_pages/cv.html` (full rewrite)
- Source: `$VAULT/_Firm/Operations/AS_Resume.tex` (read-only)

- [ ] **Step 1: Rewrite `_pages/cv.html`.** Front matter:

```yaml
---
layout: default
title: Curriculum Vitae
permalink: /cv/
description: CV of Apostolos Stamenos — statistics, federal technology, research.
---
```

Transcribe from the resume, in this order: summary line, Experience (UMN School of Public Health GA; OUROBOROS Consulting founder; HHS IT Specialist with the HHS Protect / Vaccines.gov transition bullets; HHS Data & Analytics Intern), Education (UMN PhD expected May 2028; NC State MS Statistics 2023; Penn State BS 2021), Research projects (Bayesian spatiotemporal neuroimaging 2025; Bayesian multiomics 2023-2024), Skills/Platforms (Palantir Foundry, Git, SQL, PySpark, ArcGIS Pro, FedRAMP environments), Awards/Service as present in the .tex. Markup pattern per entry:

```html
<section class="cv-section">
  <h2 class="cv-section__title">Experience</h2>
  <article class="cv-entry">
    <div class="cv-entry__meta"><span>Aug 2021 · Jul 2023</span><span>Washington, D.C.</span></div>
    <h3 class="cv-entry__title">U.S. Department of Health &amp; Human Services</h3>
    <p class="cv-entry__role">IT Specialist, Data Consultant</p>
    <ul class="cv-entry__bullets">
      <li>…bullets transcribed from the .tex, LaTeX markup stripped, links kept…</li>
    </ul>
  </article>
</section>
```

Transcription is mechanical: no editorializing, no invented facts, dates and names exactly as the resume states. Replace any em dashes in transcribed text with periods or commas.

- [ ] **Step 2: Verify.** `bundle exec jekyll build` → exit 0. Serve `/cv/`: every resume section present; spot-check three facts against the .tex; page renders in mono/display type per Task 1 styles.

- [ ] **Step 3: Commit.** `git commit -m "feat: rebuild CV page from resume source"`

### Task 5: Interests page

**Files:**
- Create: `_pages/interests.md`
- Source: `$VAULT/Gnosis/` (Statistics, Psychopathology, Cybernetics, Mathematics, Technology folders)

- [ ] **Step 1: Read 2-3 representative notes per Gnosis discipline folder.** Draft an outline: for each of the five disciplines, one heading + 2-3 candidate angles for its paragraph (what he finds interesting, in his framing, from his notes).

- [ ] **Step 2: Present outline to user for approval.** Blocking checkpoint — do not write final copy first.

- [ ] **Step 3: Write `_pages/interests.md`** after approval:

```yaml
---
layout: default
title: Interests
permalink: /interests/
description: What I think about — statistics, psychopathology, cybernetics, mathematics, technology.
---
```

Body: five sections, each `<h2 id="{slug}">` matching the homepage teaser anchors (statistics, psychopathology, cybernetics, mathematics, technology), one approved paragraph each.

- [ ] **Step 4: Verify.** `bundle exec jekyll build` → exit 0. Anchors from homepage teaser tiles resolve (`/interests/#statistics` etc.).

- [ ] **Step 5: Commit.** `git commit -m "feat: add interests page from Gnosis notes"`

### Task 6: OUROBOROS book page refresh

**Files:**
- Modify: `_pages/ouroboros.md`
- Source: `$VAULT/Writing/OUROBOROS/Book-Proposal.md` (and `_Proposal/` if the main file is thin)

- [ ] **Step 1: Read the book proposal's overview/premise sections.** Draft an outline for the page: premise (2-3 sentences, no case specifics beyond what the proposal itself frames publicly), status line, what-it-is/what-it-is-not, optional epigraph. Flag to the user anything in the existing page copy ("whistleblower memoir…") that intersects the legal constraint, and recommend keeping the page at the proposal's public framing.

- [ ] **Step 2: Present outline to user for approval.** Blocking checkpoint.

- [ ] **Step 3: Rewrite `_pages/ouroboros.md`** after approval. Keep `layout: mission`, keep `permalink` if present or set `permalink: /ouroboros/`. This page is the only serif (Lora) page, which Task 1's mission-layout styles provide.

- [ ] **Step 4: Verify.** Build exit 0; page renders serif; no em dashes; no legal-surface content beyond approved framing.

- [ ] **Step 5: Commit.** `git commit -m "feat: refresh OUROBOROS book page"`

### Task 7: Whistleblowing advocacy page

**Files:**
- Create: `_pages/whistleblowing.md`
- Source: `$VAULT/_Ontology/Orgs/Whistleblowers of America.md`, Freyd-related notes (`$VAULT/Freyd Post.md`), institutional-betrayal research notes in Gnosis/Psychopathology
- FORBIDDEN source: `$VAULT/Personal/Legal/UMN/` — do not open these files during this task.

- [ ] **Step 1: Draft outline:** (a) what institutional betrayal is (Freyd's research framing, cited); (b) why whistleblowers matter and what retaliation research shows (general literature, cited); (c) resources — orgs with links (Whistleblowers of America, plus any others in `_Ontology/Orgs`); (d) a personal stance paragraph that is values-level only ("I believe…", no events, no institutions named as adversaries, no allegations). Oxide-red accent styling hook: the page body wraps its content in `<div class="advocacy" markdown="1">` (shown in Step 3) and `personal.scss` styles `.advocacy` accents (section labels, links, rules) with `--oxide`. No `extra_css`, no layout changes.

- [ ] **Step 2: Present outline to user for approval, restating the legal constraint.** Blocking checkpoint.

- [ ] **Step 3: Write `_pages/whistleblowing.md`** after approval:

```yaml
---
layout: default
title: Whistleblowing
permalink: /whistleblowing/
description: Institutional betrayal, whistleblower advocacy, and resources.
---
<div class="advocacy" markdown="1">
…approved sections…
</div>
```

- [ ] **Step 4: Self-check against constraint.** `grep -in "UMN\|University of Minnesota\|Minnesota" _pages/whistleblowing.md` → zero hits (the UMN GA line lives only in the CV, stated as employment fact, which is fine there). No dates of dispute, no named adversaries, no allegations anywhere in the file.

- [ ] **Step 5: Verify + commit.** Build exit 0. `git commit -m "feat: add whistleblowing advocacy page"`

### Task 8: Reading and Listening pages

**Files:**
- Create: `_pages/reading.md`, `_pages/listening.md`
- Modify (if data stale): `_data/reading.yml`, `_data/listening.yml`, `_data/playlists.yml`
- Source: existing `_data/*.yml`; `$VAULT/Personal/Music/Index.md` for playlist/album freshness; `$VAULT/Reading/` is empty — reading.yml is the source of record.

- [ ] **Step 1: Create `_pages/reading.md`** — front matter `layout: default`, `title: Reading`, `permalink: /reading/`; body loops `site.data.reading` into a simple list (title, author, one-line note per the YAML's existing keys — inspect the YAML first and match its actual schema).

- [ ] **Step 2: Create `_pages/listening.md`** — same pattern for `site.data.listening`, plus `{% include playlist-carousel.html %}` beneath. Keep every iframe `title` attribute the include already sets.

- [ ] **Step 3: Freshness pass:** diff `_data/playlists.yml` and `_data/listening.yml` against `$VAULT/Personal/Music/Index.md`; list stale/missing entries for the user rather than silently rewriting taste data.

- [ ] **Step 4: Verify + commit.** Build exit 0; both pages render; carousel lazy-load works. `git commit -m "feat: add reading and listening pages"`

### Task 9: CLAUDE.md, memory, and final sweep

**Files:**
- Modify: `CLAUDE.md` (repo), memory file `project_scss-strategy.md`, `MEMORY.md` pointer if description changes
- Possibly delete: `_layouts/service.html`, `_layouts/announcement.html`, `_layouts/psa.html`, `_layouts/essays.html` (only if unreferenced)

- [ ] **Step 0: Assess `_pages/causes.md` and `_pages/healthdata.ego.md`** (spec requirement). causes.md overlaps the whistleblowing page's advocacy territory; healthdata.ego.md is `published: false`. Recommend to the user: keep both as-is (causes linked from footer/none, healthdata.ego stays unpublished) or fold causes content into `/whistleblowing/`. Do not delete either without the user's answer.

- [ ] **Step 1: Layout retirement check.** Run: `grep -rn "layout: service\|layout: announcement\|layout: psa\|layout: essays" --include="*.md" --include="*.html" . --exclude-dir=_site --exclude-dir=_layouts` and `grep -rn "essays\|psa" _includes _layouts/default.html`. Delete only layouts with zero references. Keep `foundation`, `mission`, `dashboard`, `home`, `default`.

- [ ] **Step 2: Rewrite repo `CLAUDE.md`:** new single-stylesheet architecture (`personal.scss` Jekyll-compiled + `dashboard.scss`), Observatory identity tokens and font stack, page inventory, quick-exit REMOVED by owner decision (delete the never-remove rule), keep disclaimer-bar rule, add the whistleblowing legal constraint verbatim: "The /whistleblowing/ page carries zero case specifics. Nothing on it may reference or source Personal/Legal/UMN vault content. Expansion beyond advocacy framing requires attorney review first." Note the pre-existing uncommitted CLAUDE.md modification in git status: diff it first and fold in whatever the user already changed rather than clobbering it.

- [ ] **Step 3: Update memory** `project_scss-strategy.md`: main.scss/main.css deleted; personal.scss is the compiled stylesheet; firm site still read-only reference. Update the MEMORY.md index line to match. Update `project_missing-pages.md`: services/case-studies/about/intake links no longer exist to 404; note nav now targets real pages.

- [ ] **Step 4: Full verification sweep** (spec's verification section):
  1. `bundle exec jekyll build` → exit 0.
  2. `grep -rn "main.css" . --exclude-dir=_site --exclude-dir=docs --exclude-dir=.git` → no hits.
  3. `grep -rn "card--formula" _includes _layouts _pages index.html` → no hits outside dashboard-only contexts.
  4. Serve; check every nav page + `/causes/` + light mode (OS toggle or DevTools emulation) + reduced-motion.
  5. Contrast spot-checks: `--text` on `--bg0`, `--accent` on `--bg1`, `--muted` on `--bg1` (must pass AA for its usage size).

- [ ] **Step 5: Commit.** `git commit -m "chore: update CLAUDE.md and retire unused layouts"`
