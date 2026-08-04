# NOTES — GitHub-style profile page

Assumptions made, deliberate deviations from a literal GitHub clone, and
what still needs real data or a one-time action from the repo owner.

## Resolved since the last round
- **Employment dates** — filled in: Oracle (`Jul 2025 – Sep 2025 · Jul 2026 –
  Present (return intern)`, from what you told me directly), Exalture
  (`Mar 2023 – May 2023`) and Theruvoram NGO (`Mar 2022 – Jul 2022`), both
  pulled from `public/Vishnu_Alachi_resume.pdf`.
  - Heads-up: that PDF also lists GPA 3.9 and "2nd year," which doesn't match
    what's already live elsewhere on the site (3.4, final year) — it looks
    like an older version of your résumé. I only used it for the two dates
    that weren't available anywhere else; didn't touch GPA/year.
- **`CONTRIB_GH_TOKEN`** — set and working; the real contribution graph is
  live (402 contributions at last sync).
- **Deploy-after-refresh bug** — the contribution-refresh workflow commits
  with the default `GITHUB_TOKEN`, and GitHub deliberately does not chain
  `push`-triggered workflows off commits made with that token (loop
  prevention), so the real data was on `main` but never actually deployed.
  Fixed with a `workflow_run` trigger on `deploy.yml`.
- **Professional Experience graph now interactive** — click any square
  (either graph) to see the date and, for the hand-authored graph, a note
  describing what was actually happening. Replaces the old hover-only
  native-title tooltip.
- **Professional Experience graph is now always current** — it's rebuilt
  from `src/data/experienceLog.json` against the real current date on every
  page load (`src/data/experienceCalendar.ts`), instead of being a
  pre-generated static file. That also fixes the earlier bug where it
  wasn't reflecting recent months.
- **Self-serve updates** — `experienceLog.json` is the file to edit going
  forward to reflect "what I'm doing right now"; see README.md's dedicated
  section. No code change or rebuild needed beyond a normal deploy.
- **Differentiation from GitHub** — accent color shifted to teal (was
  GitHub's exact blue), nav mark replaced with a plain "VA" monogram (was
  GitHub's actual octocat logo — also just safer to not use that), a
  "Personal Portfolio" label above the name, and an explicit footer line:
  "This is my personal portfolio... isn't affiliated with GitHub."
- **Cal Poly** in the bio now links to calpoly.edu.
- **"Résumé" → "Resume"** in the visible download button and nav link (kept
  the correct spelling in code comments/docs, since those aren't
  user-visible UI).
- **Bio rewritten** to be more personal/descriptive — includes what draws
  you to the work and off-the-clock interests (basketball, soccer, drawing,
  mechanical builds), not just a one-line mission statement.
- **Blog section added** (`#blog` tab) — empty-state placeholder ("Nothing
  published yet") since there's no content yet; swap in real posts later
  without touching the rest of the page.

## Needs your input
- **Certifications**: `resume.json`'s `certifications` array is still empty.
  Add entries and the panel renders them — nothing to build, just data.
- **Blog**: no posts exist yet — the section is a clearly-labeled
  placeholder, not fake content.

## Deliberate deviations from GitHub (with reasoning)
- **No router / no real page navigation** for repo or experience detail —
  everything expands in place, with a URL hash (e.g. `#profile-repo-findr`)
  so a specific card is still shareable/linkable. See PLAN.md "Detail view
  pattern."
- **Contact form kept**, reskinned into GitHub-card styling, even though
  GitHub profiles have no equivalent — real, working functionality
  (FormSubmit-backed, validated) worth preserving.
- **Settings panel** is a genuine, working "customize how this displays"
  panel (theme, pinned repos, repo order) — not a copy of GitHub's actual
  account settings UI.
- **Two contribution graphs**, one shared component — "Open Source Activity"
  (real GitHub data) vs "Professional Experience" (hand-authored, editable,
  interactive) — intentionally not what real GitHub profiles show.
- **Not a GitHub clone, on purpose**: teal accent (not GitHub's blue), a
  personal monogram instead of GitHub's logo, and an explicit disclaimer in
  the footer, specifically so a visitor doesn't mistake this for
  github.com.

## Verification performed
- `npm run build` and `npm run lint` pass clean.
- Manually exercised in a headless browser: dark/light theme (persists
  across reload), mobile layout, repo/experience card expand/collapse,
  settings panel, and — critically — the contribution-graph month-label
  alignment bug (labels drifted right relative to their columns due to a
  CSS `min-width` letting wide month names grow the flex item; fixed with a
  fixed `width`/`flex: 0 0 10px` matching the day-column width exactly) and
  the click-to-detail interaction, confirmed against the actual rendered
  DOM (not just visual screenshots, since a screenshot misread is what
  surfaced the alignment bug in the first place).
- Confirmed live on the deployed site: real contribution data synced (402
  contributions) after fixing the deploy-chaining bug above.
