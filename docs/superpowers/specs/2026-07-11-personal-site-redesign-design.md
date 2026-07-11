# Personal Site Redesign — Design Spec

**Date:** 2026-07-11
**Repo:** astamenos.github.io (personal site)
**Approved by:** Apostolos, section by section, in brainstorming session

## Goal

Turn astamenos.github.io from a reskinned copy of the OUROBOROS Consulting site into a distinct personal portfolio. Two mandates: visually distinct from the firm site, copy sourced from the Second-Brain vault.

The firm site (`/Users/apostolos/Claude/Code/OUROBOROS/OUROBOROS-Consulting.github.io`) is read-only reference. Never modify it.

## Identity: personal portfolio

The site presents the person, not the firm. Bio, CV, intellectual interests, the book, advocacy stance, culture pages. The firm gets a link, not the spotlight.

## Visual identity: "Observatory"

The firm site is a candlelit library (warm black, gold, Garamond). The personal site is a night observatory: cool, precise, instrument-like. Dark, but a different key.

- **Palette:** deep blue-slate ground (`#0b1220` family) layered upward through slate panels to a bright cold foreground. Brightness increases up the information hierarchy. Primary accent: glacial cyan (`#7dd3fc` family) everywhere the firm uses gold. Secondary accent: oxide red, used sparingly, reserved for the advocacy page.
- **Type:** Space Grotesk (headings, identity), Inter (body), JetBrains Mono (data, CV entries, badges). Lora appears only on the OUROBOROS book page to mark literary territory. Google Fonts load trimmed to these four.
- **Structure:** no `card--formula` boxes. Full-bleed sections separated by hairline rules and generous vertical rhythm. Content sits on subtle elevation gradients, not bordered cards. Thin technical rules and tick marks as ornament.
- **Texture:** faint star-field/grain on the ground layer.
- **Modes:** light mode honored via `prefers-color-scheme` (cool gray-paper inversion). WCAG AA contrast minimums. `prefers-reduced-motion` respected.
- No em dashes anywhere in copy. Dingbats over emoji.

## Site structure

| Page | Content | Vault source |
|---|---|---|
| `/` | Hero (name, one-line identity), short bio, interests teaser, values flip-cards, testimonials, outbound links (firm, LinkedIn, GitHub) | `_Firm/Operations/AS_Resume.tex` for bio facts; hero copy drafted fresh in voice profile |
| `/cv/` | Full CV: education, federal work, research, skills | `_Firm/Operations/AS_Resume.tex` |
| `/interests/` | "What I think about": statistics, psychopathology, cybernetics, mathematics, technology; a paragraph each | `Gnosis/` discipline notes |
| `/ouroboros/` | The book: premise, status. Serif-styled | `Writing/OUROBOROS` |
| `/whistleblowing/` | Advocacy framing only: institutional betrayal in academia, the research, resources and orgs | `_Ontology/Orgs/Whistleblowers of America.md`, Freyd-related notes |
| `/reading/`, `/listening/` | Refreshed culture pages; playlist carousel kept | `Reading/`, `Personal/Music`, existing `_data` YAML |

`_pages/causes.md` and `_pages/healthdata.ego.md`: assess during implementation, fold in or keep; do not delete without asking.

## Whistleblowing page: legal constraint

Active legal matter exists (`Personal/Legal/UMN/` in vault). The page carries **zero case specifics**: no UMN allegations, no timeline, no characterizations of any party. Advocacy framing only — the phenomenon, the research, the resources. Nothing from `Personal/Legal/UMN` is sourced. If the treatment ever expands beyond advocacy framing, attorney review is required first. This constraint is recorded in CLAUDE.md.

## Removed / kept components

**Removed:** services grid, case studies (`_config.yml` blocks deleted), `/intake` CTA, quick-exit button (nav.html element + ESC handler in main.js). Quick-exit removal is a deliberate owner decision; CLAUDE.md updated to match.

**Kept:** footer disclaimer bar, testimonials carousel (rewordable from `Work/Tutoring` endorsements; section hidden until real quotes exist), values flip-cards (principles reworded from vault notes), playlist carousel. Kept components keep their behavior but are restyled into the Observatory language; none retain `card--formula` visuals.

## Technical design

- **Stylesheet:** new `assets/css/personal.scss` with front matter, Jekyll-compiled to `personal.css`. `default.html` references it instead of `main.css`. Delete `main.css` and `main.scss`. `dashboard.scss` untouched. Update the SCSS-strategy memory file.
- **Layouts:** keep `default`, `home`, `dashboard`. Retire `service`, `foundation`, `mission`, `announcement`, `psa` only if a front-matter grep confirms nothing references them after the page purge.
- **Nav:** rewrite `_data/nav.yml` for the six pages. Remove quick-exit from `nav.html`.
- **Config:** remove `services:` and `case_studies:`; reword `description:` to personal.
- **CLAUDE.md:** update for new architecture, single-stylesheet system, quick-exit removal, whistleblowing legal constraint.

## Copy workflow

No final copy drafted unilaterally. Each page gets an outline plus recommended copy sourced from the vault; Apostolos approves before it ships. Voice per `voice-profile.md`: authoritative, warm, direct, short sentences, no filler.

## Verification

1. `bundle exec jekyll serve` builds with zero errors.
2. Every page renders; no reference to `main.css` remains (grep).
3. No orphaned layout/include references (grep front matter and includes).
4. Contrast spot-checks on new palette meet WCAG AA.
5. Light mode and reduced-motion render correctly.

## Risks

- Deleting `main.css` breaks any missed dependency on firm classes; the grep sweep is the guard.
- Removing quick-exit changes the repo's stated accessibility posture; deliberate and documented.
