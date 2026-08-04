# Vishnu Alachi — Portfolio (GitHub-profile styled)

A single-page portfolio built with **React + TypeScript + Vite**, laid out in
the style of a GitHub user profile — pinned/full repo list, two interactive
contribution heatmaps, an expandable experience timeline, and a
customize/settings panel — populated with real project and résumé data. It's
a personal portfolio modeled on that layout, not github.com (see the footer
disclaimer and the accent color, which is deliberately not GitHub's blue).
Deployed to GitHub Pages via GitHub Actions.

[Visit it here →](https://vishnu-alachi123.github.io)

See **`PLAN.md`** for the full architecture writeup and **`NOTES.md`** for
assumptions made and things that still need real data or a one-time setup
step from the repo owner.

## Stack

- **React 18 + TypeScript**, **Vite**, **CSS Modules**
- Design tokens mirror GitHub's actual Primer color values (dark default +
  light theme, toggle persisted in localStorage)
- No router: single page, anchor-scroll tabs (Overview / Repositories /
  Experience / Blog / Contact), with hash deep-links to auto-expand a
  specific card
- No client-side GitHub API calls — the real contribution graph is fetched
  in CI and committed as a static JSON file (see below)

## Develop

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # type-check + production build to dist/
npm run preview # preview the production build locally
npm run lint    # eslint
```

## Updating content (no code needed)

- **Résumé** (experience, education, skills, coursework, certifications,
  "currently learning"): edit **`src/data/resume.json`** on GitHub — the
  site fetches it live from `main` at runtime. The Experience section
  renders each role's `dates` field verbatim.
- **Projects / repos**: edit **`src/data/projects.tsx`** — this is the one
  source of truth for both the repo cards and their expanded detail; there's
  no separate "repos" file to keep in sync.
- **"Professional Experience" heatmap** (the hand-authored contribution
  graph): edit **`src/data/experienceLog.json`** — see the dedicated section
  below. This is the "update what I'm doing right now" file.
- **Pinned repos, display order, theme**: available live via the gear icon
  in the profile header — no code change needed, persisted per-visitor in
  their browser.

## Updating the "Professional Experience" heatmap

`src/data/experienceLog.json` is a small, hand-editable list of active date
ranges. The calendar is rebuilt from it **at page-load time against the
actual current date** (`src/data/experienceCalendar.ts`), so it never goes
stale the way a pre-generated file would — add a range and it's reflected
immediately on next load, no rebuild needed beyond a normal deploy.

Each entry:

```json
{
  "from": "2026-07-15",
  "to": "present",
  "weekdaysOnly": true,
  "level": 4,
  "note": "What I was actually doing during this stretch."
}
```

- `to` can be a date or the literal string `"present"` (extends through
  today, recomputed on every visit).
- `weekdaysOnly: true` skips weekends — use this for a normal work week.
- `level` is 0–4, matching the same intensity scale as the real GitHub
  graph.
- `note` is exactly what appears when someone clicks a square in that date
  range — write it like you're telling someone what you were doing.
- Later entries in the array win where ranges overlap, so you can add a new
  entry to override part of an existing one (e.g. a single specific day)
  without editing the original range.

To just extend what you're currently doing, edit the existing entry's `to`
value, or add a new entry with `"from"` set to today and `"to": "present"`.

## Real GitHub contribution graph — one-time setup

The classic contribution calendar requires the GitHub **GraphQL** API with
an authenticated token (`read:user` scope), which must never reach the
browser. So it's fetched in CI, not client-side:

1. Create a classic PAT at github.com/settings/tokens with the `read:user`
   scope only.
2. Add it as a repository secret named **`CONTRIB_GH_TOKEN`**
   (Settings → Secrets and variables → Actions).
3. `.github/workflows/contributions.yml` runs daily (and on demand) via
   `scripts/fetch-contributions.mjs`, writes
   `public/data/contributions-real.json`, and commits it if it changed —
   which triggers a redeploy automatically.

Until the secret is set, the graph shows a clearly-labeled "hasn't synced
yet" state rather than breaking.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
app and publishes `dist/` to GitHub Pages.

## Structure

```
src/
  components/
    Nav, Footer                 profile-style tab bar + footer (with the
                                 "not affiliated with GitHub" disclaimer)
    profile/                    the profile page itself
      ProfilePage, ProfileHeader
      RepoList, RepoCard, ExperienceList, ExperienceCard, ExpandableCard
      ContributionGraph          interactive: click a square for detail
      BlogSection, SettingsPanel, ContactCard
  data/
    projects.tsx                repos — single source of truth
    resume.json / resume.ts     résumé data (fetched live) + types
    githubProfile.ts            Project/Role → card-data adapters
    contributions.ts            shared contribution-calendar types
    experienceLog.json          hand-editable "professional" activity log
    experienceCalendar.ts       builds the calendar from the log, live
    languageColors.ts
  hooks/
    useResume, useRepoCount, useScrollSpy
    useGithubContributions      fetches the static, CI-generated calendar
    useProfileSettings          theme / pins / order (localStorage)
scripts/fetch-contributions.mjs   run by contributions.yml in CI
public/
  data/contributions-real.json  generated; placeholder committed up front
  Vishnu_Alachi_resume.pdf, favicon, 404 redirect
```
