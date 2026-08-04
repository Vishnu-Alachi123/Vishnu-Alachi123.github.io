# Vishnu Alachi — Portfolio (GitHub-profile style)

A single-page portfolio built with **React + TypeScript + Vite**, styled to
closely match a real GitHub user profile — pinned/full repo list, two
contribution heatmaps, an expandable experience timeline, and a
customize/settings panel — populated with real project and résumé data.
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
  Experience / Contact), with hash deep-links to auto-expand a specific card
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
  site fetches it live from `main` at runtime. Employment `dates` fields are
  currently placeholders (`"TODO: add exact dates"`); fill in real ones
  when known — the Experience section renders `dates` verbatim.
- **Projects / repos**: edit **`src/data/projects.tsx`** — this is the one
  source of truth for both the (deleted) old project cards and the new
  GitHub-style repo list; there is no separate "repos" file to keep in sync.
- **Pinned repos, display order, theme**: available live via the gear icon
  in the profile header — no code change needed, persisted per-visitor in
  their browser.

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
    Nav, Footer                 GitHub-style tab bar + footer
    profile/                    the profile page itself
      ProfilePage, ProfileHeader
      RepoList, RepoCard, ExperienceList, ExperienceCard, ExpandableCard
      ContributionGraph, SettingsPanel, ContactCard
  data/
    projects.tsx                repos — single source of truth
    resume.json / resume.ts     résumé data (fetched live) + types
    githubProfile.ts            Project/Role → card-data adapters
    contributions.ts            shared contribution-calendar types
    contributionsExperience.json  hand-authored "professional" heatmap
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
