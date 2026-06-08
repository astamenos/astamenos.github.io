# Jekyll Local Build Setup — Design Spec
_2026-06-08_

## Goal
Add `Gemfile` and `_config.yml` to enable local Jekyll preview while maintaining exact parity with GitHub Actions deployment.

## Approach
Use the `github-pages` gem. It pins all plugins and the Jekyll version to what GitHub Actions uses — no divergence risk.

## Gemfile
- `github-pages` gem (no version pin — tracks GitHub's latest)
- `webrick` — required on Ruby 3+ (stdlib removal)
- No theme gems (site is fully custom CSS)

## _config.yml
Minimal viable keys only:

| Key | Value |
|-----|-------|
| `title` | `Apostolos Stamenos` |
| `author` | `Apostolos Stamenos` |
| `description` | placeholder — fill before launch |
| `url` | `https://astamenos.github.io` |
| `baseurl` | `""` |
| `github_url` | placeholder |
| `linkedin_url` | placeholder |
| `tutoring_url` | placeholder |
| `substack_url` | placeholder |
| `exclude` | `["Gemfile", "Gemfile.lock", "vendor/", "docs/", "LICENSE", "README.md"]` |

No `theme:` key — site uses custom CSS only.

## Local build command
```
bundle install
bundle exec jekyll serve --livereload
```

## Out of scope
- `_layouts/` and root pages (separate iteration)
- Plugin configuration beyond defaults
- Custom domain / CNAME
