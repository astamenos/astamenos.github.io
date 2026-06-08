# Jekyll Local Build Setup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `Gemfile` and `_config.yml` so the site can be previewed locally with `bundle exec jekyll serve`.

**Architecture:** Two root-level files only. `Gemfile` pins deps via the `github-pages` metagem for CI parity. `_config.yml` provides site metadata and social URL variables already referenced in `_includes/footer.html` and `_includes/nav.html`.

**Tech Stack:** Jekyll (via `github-pages` gem), Bundler, Ruby 3+

---

### Task 1: Create Gemfile

**Files:**
- Create: `Gemfile`

- [ ] **Step 1: Create `Gemfile` at repo root**

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "webrick"
```

`webrick` is required on Ruby 3+ — it was removed from stdlib in 3.0 and Jekyll 3.x doesn't declare it as a dependency.

- [ ] **Step 2: Verify Bundler can resolve**

```bash
bundle install
```

Expected: Bundler resolves and installs `github-pages` and its transitive dependencies with no errors. A `Gemfile.lock` is created locally (it is `.gitignore`d and should not be committed).

- [ ] **Step 3: Commit**

```bash
git add Gemfile
git commit -m "chore: add Gemfile with github-pages gem for local Jekyll builds"
```

---

### Task 2: Create _config.yml

**Files:**
- Create: `_config.yml`

- [ ] **Step 1: Create `_config.yml` at repo root**

```yaml
title: Apostolos Stamenos
author: Apostolos Stamenos
description: >
  Independent consulting for survivors, senior citizens, veterans,
  and institutionally betrayed populations.

url: "https://astamenos.github.io"
baseurl: ""

# Social URLs — referenced in _includes/footer.html as site.<key>
github_url: "https://github.com/astamenos"
linkedin_url: "https://linkedin.com/in/astamenos"
tutoring_url: ""
substack_url: ""

exclude:
  - Gemfile
  - Gemfile.lock
  - vendor/
  - docs/
  - LICENSE
  - README.md
```

- [ ] **Step 2: Verify Jekyll builds without errors**

```bash
bundle exec jekyll serve --livereload
```

Expected: Jekyll starts, outputs `Server address: http://127.0.0.1:4000/`, no `Liquid` warnings or build errors. Site is browseable at `http://localhost:4000`.

Note: With no `_layouts/` or root pages yet, Jekyll will produce an empty `_site/`. That is expected at this stage.

- [ ] **Step 3: Commit**

```bash
git add _config.yml
git commit -m "chore: add _config.yml with site metadata and social URL variables"
```
