# NOTES — GitHub-style profile page

Assumptions made, deliberate deviations from a literal GitHub clone, and
what still needs real data or a one-time action from the repo owner.

## Needs your input
- **Employment dates** (`src/data/resume.json` → each role's `dates`
  field) are placeholders: `"TODO: add exact dates"`. Fill in real ranges
  (e.g. `"Jun 2025 – Sep 2025"`) whenever convenient — the Experience
  section renders whatever string is there.
- **`CONTRIB_GH_TOKEN` repository secret** — required for the real GitHub
  contribution graph to populate. See README.md "Real GitHub contribution
  graph" section for the exact steps. Until it's set, that graph shows a
  clearly-labeled empty state; nothing is broken or misleading.
- **Graph B (Professional Experience) intensity** is placeholder data
  (`src/data/contributionsExperience.json`, hand-generated with a script,
  not committed) standing in for internship activity, since real dates
  weren't available yet. Once employment dates are filled in above, this
  should be regenerated to actually align with them — right now the
  "active" stretches are arbitrary offsets from today, not real dates.
- **Certifications**: `resume.json`'s `certifications` array is empty (as
  it was before this change). Add entries and the About/profile page
  renders them — nothing to build, just data.

## Deliberate deviations from GitHub (with reasoning)
- **No router / no real page navigation** for repo or experience detail —
  everything expands in place, with a URL hash (e.g.
  `#profile-repo-findr`) so a specific card is still shareable/linkable.
  Introducing a router for one page of a small static site was judged
  disproportionate. See PLAN.md "Detail view pattern."
- **Contact form kept**, reskinned into GitHub-card styling, even though
  GitHub profiles have no equivalent — the working form (FormSubmit-backed,
  validated) was real functionality worth preserving rather than dropping
  for fidelity's sake.
- **Tab-bar underline uses the accent (blue) color**, not GitHub's literal
  orange `UnderlineNav` selected-state color — kept consistent with this
  site's single accent token rather than introducing a second one for one
  element.
- **Settings panel** is a genuine, working "customize how this displays"
  panel (theme, pinned repos, repo order) — not a copy of GitHub's actual
  account settings UI, since none of that applies to a static portfolio.
- **Two contribution graphs** intentionally break from real GitHub (which
  only has one) per the original spec — labeled "Open Source Activity" vs
  "Professional Experience" so the distinction is unambiguous.

## Verification performed
- `npm run build` and `npm run lint` both pass clean.
- Manually exercised in a headless browser: dark mode, light mode (and that
  the toggle persists across reload via localStorage), mobile layout
  (390px), repo card expand/collapse, settings panel open/close/theme
  switch/pin/reorder, and the graceful "not synced yet" state for the real
  contribution graph (expected in this environment, since GitHub's API
  isn't reachable from the build sandbox).
- Not verified: the actual CI-fetched contribution graph rendering with
  real data (requires `CONTRIB_GH_TOKEN` to be set on the real repo, which
  only the owner can do), and the avatar/live repo-count fetch from
  `github.com`/`api.github.com` (blocked by this environment's egress
  proxy for browser traffic — confirmed via curl that the endpoints
  themselves are fine; this is a sandbox limitation, not an app bug).
