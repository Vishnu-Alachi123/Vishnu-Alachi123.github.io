# NOTES — GitHub-style profile page

Assumptions made, deliberate deviations from a literal GitHub clone, and
what still needs real data or a decision from the repo owner.

## Latest round
- **Reverted the accent color back to GitHub's actual blue** (was
  temporarily shifted to teal for differentiation, per earlier feedback —
  now walked back per "make it look pretty similar to GitHub" instead).
  Kept the plain "VA" monogram (not GitHub's octocat) and the footer
  disclaimer, since those don't conflict with "look similar" and are cheap
  insurance against anyone genuinely mistaking this for github.com.
- **Added an explicit "View on GitHub ↗" link** in the sidebar (and made the
  `@handle` under the name clickable too) — goes to the real
  github.com/Vishnu-Alachi123.
- **Open Source Activity graph**: clicking a day now also shows a
  "View on GitHub ↗" link in the detail panel, deep-linking to
  `github.com/Vishnu-Alachi123?tab=overview&from=<date>&to=<date>` — GitHub's
  own date-filtered activity view, so clicking a square shows the *real*
  detail (what repos/commits) rather than anything fabricated here.
- **Professional Experience notes shortened** — was a full sentence
  describing the work; now just `"Software Development Intern @ Oracle"`
  (and `"(return intern)"` for the 2026 stint), per feedback that the long
  version was more than wanted.
- **Blog is now data-driven**: `src/data/posts.json` — add a post object and
  it renders automatically (newest first, same expand-in-place pattern as
  repos/experience). Still empty for now, so the empty state still shows.
- **Added a "Log what you were doing" helper** in the settings panel (gear
  icon): a small form (date range, level, note) that generates a
  ready-to-paste JSON entry for `experienceLog.json`, with a direct link to
  that file's GitHub editor. This is a **client-side generator, not a
  write-capable backend** — see below for why, and what a real one would
  involve.

## Deferred: automated backend (GitHub/Gmail/Calendar auto-sync)
You asked about the graph updating itself automatically by checking GitHub,
Gmail, and/or Calendar in the background, plus a real "just add stuff"
interface. I did **not** build this, on purpose — it's a meaningfully
different and bigger project than everything else in this round, for
reasons worth spelling out rather than guessing at:

- **No backend exists today.** This site is fully static (GitHub Pages).
  Adding real write capability — either "click save and it commits" or
  "auto-detect from Gmail/Calendar" — needs an actual server somewhere
  (even a small serverless function), which is new infrastructure to build,
  host, and maintain.
- **Auth is the hard part.** A write-capable tool can't ship a GitHub token
  to every visitor's browser (anyone could then edit your site). It needs
  you specifically to be authenticated — realistically a GitHub OAuth login
  gate in front of any editing UI.
- **Gmail/Calendar access is a bigger decision than it sounds.** That's
  OAuth into your actual personal email/calendar, with real privacy
  stakes about what data a public portfolio site's backend touches, plus
  deciding what "counts" as portfolio-worthy activity from a calendar of
  personal events.
- **The GitHub half is arguably already automatic** — that's exactly what
  the existing `contributions.yml` + `CONTRIB_GH_TOKEN` pipeline does
  (daily, no manual step). The open question is really about the
  *non-GitHub* work (internships, etc.), which by definition isn't visible
  to a GitHub-only integration anyway.

What shipped instead (the `LogEntryHelper` above) gets you most of the
day-to-day value — form in, JSON out, one paste, no code-writing — without
any of that infrastructure or auth risk. If you do want to go further, worth
deciding explicitly: which platform(s) specifically, and whether "generate
a snippet to paste" is actually the ceiling you want, or if a real
authenticated write flow (GitHub OAuth + a small serverless function) is
worth building as its own project.

## Needs your input
- **Certifications**: `resume.json`'s `certifications` array is still empty.
- **Blog posts**: `posts.json` is still empty — add entries whenever.
- **The backend-integration question above**, whenever you've had a chance
  to think about scope.

## Deliberate deviations from GitHub (with reasoning)
- **No router / no real page navigation** for repo or experience detail —
  everything expands in place, with a URL hash (e.g. `#profile-repo-findr`)
  so a specific card is still shareable/linkable. See PLAN.md "Detail view
  pattern."
- **Contact form kept**, reskinned into GitHub-card styling, even though
  GitHub profiles have no equivalent — real, working functionality
  (FormSubmit-backed, validated) worth preserving.
- **Settings panel** is a genuine, working "customize how this displays"
  panel (theme, pinned repos, repo order, log-entry helper) — not a copy of
  GitHub's actual account settings UI.
- **Two contribution graphs**, one shared component — "Open Source Activity"
  (real GitHub data, links out to the real thing) vs "Professional
  Experience" (hand-authored, editable, interactive with local notes) —
  intentionally not what real GitHub profiles show.

## Verification performed
- `npm run build` and `npm run lint` pass clean.
- Manually exercised in a headless browser: accent-color revert (dark +
  light), the new "View on GitHub" links (sidebar, handle, and the
  Open Source Activity detail panel) confirmed pointing at the right URLs,
  Professional Experience note text confirmed shortened, Blog empty state
  still renders correctly with the new data-driven posts.json, and the
  settings-panel log-entry helper renders and its fields work.
