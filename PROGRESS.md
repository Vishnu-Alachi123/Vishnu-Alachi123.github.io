# PROGRESS.md — GitHub-Style Profile Page

This file is the single source of truth for what's done, what's in
progress, and what's next. Every routine run reads this FIRST, and
updates it before finishing. Do not rely on memory of past runs —
rely on this file and the actual repo state.

## Current Phase
`research`

Phases, in order: `research` → `planning` → `implementation` → `polish` → `done`

## Phase Log

### research — not started
- [ ] Study github.com/<any-user> profile page layout via browser tool
- [ ] Study an individual repo page layout (for the repo-detail view)
- [ ] Capture: header/bio layout, repo list card structure, contribution
      graph structure (grid, legend, tooltip behavior), spacing/typography
      patterns, color tokens (light + dark mode if visible)
- [ ] Save findings to `RESEARCH.md` in repo root

### planning — not started
- [ ] Read RESEARCH.md
- [ ] Produce PLAN.md: component breakdown, file structure, data model
      (repos, experience, contributionsReal, contributionsExperience),
      GitHub API integration approach (auth, caching, rate limits)
- [ ] List open questions/assumptions

### implementation — not started
- [ ] Profile header / bio component
- [ ] Repositories section (card list + detail/expand view)
- [ ] Experience section (same card style, work history content)
- [ ] Contribution graph component (shared, parameterized by data source)
- [ ] Graph A: real GitHub API data wiring
- [ ] Graph B: hand-authored experience/internship data (JSON) wiring
- [ ] Settings/customize panel (theme toggle, section visibility, reorder)
- [ ] Hover states, tooltips, expand/collapse transitions

### polish — not started
- [ ] Visual QA against RESEARCH.md reference notes
- [ ] Responsive check (mobile/tablet)
- [ ] API error/rate-limit graceful degradation
- [ ] Lint/build/test pass
- [ ] Resolve remaining TODOs or list them clearly for the user

## Last Run Summary
(Each run appends a dated entry here — do not delete prior entries.)

- **[unfilled — first run will populate this]**

## Open Questions For The User
(Anything a run couldn't resolve on its own goes here, so the human can
answer it between runs rather than the routine guessing.)

- (none yet)

## Notes / Assumptions Made
(Running log of judgment calls made when something wasn't specified.)

- (none yet)
