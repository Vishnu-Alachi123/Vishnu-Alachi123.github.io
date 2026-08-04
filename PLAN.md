# PLAN — GitHub-style Profile Page

## Goal
A new section of the existing single-page site that closely matches the visual
and interaction language of a real GitHub user profile (left profile column +
right content column, pinned-repo cards, two contribution heatmaps, expandable
detail views, a settings-style customize panel) — populated with this site's
real project and experience data instead of GitHub's own.

## Scope: full replacement, not an addition
This **replaces** the current site (blueprint-themed Hero / Work / About /
Experience / Contact / canvas Backdrop) entirely. The GitHub-style profile
becomes the whole site. `App.tsx` renders only the new profile page.

Consequences of "closely match GitHub, not GitHub-inspired":
- The blueprint aesthetic (grid background, cyan accent, corner-tick panels,
  scroll-reveal animation, ambient canvas backdrop) is removed — GitHub's UI
  has none of these. Design tokens in `index.css` are replaced with GitHub's
  actual light/dark color values.
- The top nav becomes a GitHub profile **tab bar** (Overview / Repositories
  / Experience / Contact) instead of the previous generic nav — this is what
  real GitHub profiles use for in-page sections.
- Content is still single-page with anchor scrolling (no router — see
  "Detail view pattern" below), since GitHub's own tab bar on a *user*
  profile is anchor/query-based navigation within one view, not full
  separate pages either.
- The contact form is **kept** (real functionality worth preserving) but
  reskinned into a GitHub-card-styled section rather than dropped, since
  GitHub itself has no equivalent — documented as an intentional deviation.
- Files belonging only to the old design (Hero, Work, About, Experience,
  Contact, Backdrop, ProjectCard, ProjectPreview, Counter, Reveal,
  ScrollProgress, and their CSS) are deleted, not left as dead code.

## Data model — single source of truth, no duplication
The site already has two content sources; the profile page **reuses them**
via adapters rather than re-authoring content:

- **Repos** ← `src/data/projects.tsx` (`Project[]`, already has id, title,
  description body, tags, `featured`, links). An adapter in
  `src/data/githubProfile.ts` maps `Project → RepoCardData` (primary
  "language" = first tag, mapped to a GitHub-style color via
  `src/data/languageColors.ts`; `featured` → `pinned`).
- **Experience** ← `src/data/resume.json` `roles[]` (already fetched live
  from GitHub raw by `useResume`). Schema gets one additive, optional field:
  `dates`. Existing consumers (`Experience.tsx`) are unaffected.
- **Contributions (Graph A — real GitHub activity)**: fetched at
  **build/update time**, not from the browser. See below.
- **Contributions (Graph B — professional experience)**: hand-authored,
  `src/data/contributionsExperience.json`, same shape as Graph A so one
  component renders either.

```ts
interface ContributionDay { date: string; count: number; level: 0|1|2|3|4 }
interface ContributionCalendar { totalContributions: number; weeks: ContributionDay[][] }
```

## GitHub API integration — auth, caching, rate limits
The classic green contribution calendar is only available via the **GraphQL**
API's `user.contributionsCollection`, which requires an authenticated token
with `read:user` scope. That token must never reach the browser, and a
static GitHub Pages site has no server to hide it behind at request time —
so the fetch happens **out-of-band, in CI**, not client-side:

1. `scripts/fetch-contributions.mjs` (Node, no dependencies) calls the
   GraphQL API for `Vishnu-Alachi123`'s public contribution calendar, buckets
   counts into levels 0–4, and writes `public/data/contributions-real.json`.
2. `.github/workflows/contributions.yml` runs this script **daily** (cron)
   and on demand (`workflow_dispatch`), using a **repo secret**
   `CONTRIB_GH_TOKEN` (a classic PAT with `read:user` scope — the default
   Actions token cannot be granted this OAuth scope, so a PAT is required;
   this is a one-time setup step for the repo owner). If the file changed,
   the workflow commits it back to `main`, which triggers the existing
   `deploy.yml` and republishes.
3. The browser only ever does `fetch('/data/contributions-real.json')` — a
   same-origin static file, no token, no rate limit, cached like any other
   asset.
4. **Missing/failed token**: the script catches the error and writes
   `{ "available": false }` instead of crashing the workflow. The component
   renders a clearly-labeled "not synced yet" empty state rather than
   breaking. A placeholder file with `available:false` is committed now so
   the page works correctly before the secret is ever configured.

## Detail view pattern: expand-in-place, not page navigation
Both repo and experience cards use the same **expand-in-place** interaction
(an `ExpandableCard` primitive), rather than mixing in real page navigation:
introducing a router for one page of a small static site is disproportionate
complexity, and GitHub's own repo/detail pages don't map cleanly onto
existing content anyway. To still satisfy "shareable link to a specific
card" (the practical reason to want navigation), each card gets a URL hash
id (e.g. `#profile-repo-findr`); loading that hash auto-scrolls to and
expands the matching card. This is documented as a deliberate scope
decision, not an oversight.

## Settings / customize panel
A slide-over panel (gear icon in the profile header) backed by
`useProfileSettings` (localStorage-persisted): theme (light/dark, via a new
`[data-theme="light"]` CSS-variable override block — the design system is
already token-driven, so this is additive, not a rewrite), which repos are
pinned, and repo display order. No backend, no fake settings that don't do
anything.

## Components
```
src/components/profile/
  ProfileSection.tsx        container, id="profile", two-column GitHub layout
  ProfileHeader.module.css  avatar / name / bio / stats column
  ProfileHeader.tsx
  ExpandableCard.tsx        shared expand/collapse + hash-deeplink primitive
  RepoList.tsx / RepoCard.tsx
  ExperienceList.tsx / ExperienceCard.tsx
  ContributionGraph.tsx     shared, parameterized by {calendar, label}
  SettingsPanel.tsx
src/data/
  githubProfile.ts          Project → RepoCardData adapter, stats calc
  languageColors.ts         tag → GitHub-style color dot
  contributionsExperience.json
src/hooks/
  useGithubContributions.ts fetches public/data/contributions-real.json
  useProfileSettings.ts     localStorage-backed theme/pins/order
scripts/
  fetch-contributions.mjs
.github/workflows/
  contributions.yml
public/data/
  contributions-real.json   generated; placeholder committed up front
```

## Open questions / assumptions (resolved with reasonable defaults)
- **Employment dates**: not previously in `resume.json`. Adding a `dates`
  field per role but leaving it as an explicit placeholder
  (`"TODO: add exact dates"`) rather than fabricating them — flagged in
  `NOTES.md` for the real values.
- **"Stats row" numbers**: using real, meaningful counts already computed
  elsewhere on the site (project count, live demo count) rather than
  GitHub's follower-style vanity metrics, per the original spec.
- **Graph B intensity**: hand-authored with a plausible weekday-weighted
  pattern across each role's date range; explicitly marked as placeholder
  pending real dates from the point above.
- **CONTRIB_GH_TOKEN**: requires the repo owner to create a classic PAT
  (scope: `read:user`) and add it as a repository secret. This is called out
  as a required manual step, the same category as the earlier Pages source
  setting — it is the one thing in this feature I cannot do myself, because
  creating a personal access token requires the account owner.
