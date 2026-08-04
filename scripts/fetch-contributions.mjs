#!/usr/bin/env node
/**
 * Fetches the real GitHub contribution calendar via the GraphQL API and
 * writes public/data/contributions-real.json in the shape the site expects
 * (see src/data/contributions.ts — ContributionCalendar).
 *
 * Requires a classic PAT with `read:user` scope in CONTRIB_GH_TOKEN — the
 * default Actions token cannot be granted that OAuth scope. If the token is
 * missing or the request fails, this writes { available: false } instead of
 * throwing, so the site degrades gracefully rather than failing the build.
 *
 * Usage: node scripts/fetch-contributions.mjs
 * Env:   CONTRIB_GH_TOKEN (required), GITHUB_USERNAME (optional, defaults below)
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const USERNAME = process.env.GITHUB_USERNAME || 'Vishnu-Alachi123';
const TOKEN = process.env.CONTRIB_GH_TOKEN;
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data', 'contributions-real.json');

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

/** Keep in sync with levelForCount() in src/data/contributions.ts */
function levelForCount(count) {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

async function writeResult(data) {
  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(data, null, 2) + '\n');
}

async function main() {
  if (!TOKEN) {
    console.warn('[fetch-contributions] CONTRIB_GH_TOKEN not set — writing unavailable placeholder.');
    await writeResult({ available: false, totalContributions: 0, weeks: [] });
    return;
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': `${USERNAME}-portfolio-contrib-fetch`,
    },
    body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
  });

  if (!res.ok) {
    console.error(`[fetch-contributions] GitHub API responded ${res.status} ${res.statusText}`);
    await writeResult({ available: false, totalContributions: 0, weeks: [] });
    return;
  }

  const json = await res.json();
  if (json.errors) {
    console.error('[fetch-contributions] GraphQL errors:', JSON.stringify(json.errors));
    await writeResult({ available: false, totalContributions: 0, weeks: [] });
    return;
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    console.error('[fetch-contributions] Unexpected response shape:', JSON.stringify(json));
    await writeResult({ available: false, totalContributions: 0, weeks: [] });
    return;
  }

  const weeks = calendar.weeks.map((w) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: levelForCount(d.contributionCount),
    })),
  );

  await writeResult({
    available: true,
    totalContributions: calendar.totalContributions,
    weeks,
  });
  console.log(`[fetch-contributions] Wrote ${weeks.length} weeks, ${calendar.totalContributions} total contributions.`);
}

main().catch(async (err) => {
  console.error('[fetch-contributions] Unexpected error:', err);
  await writeResult({ available: false, totalContributions: 0, weeks: [] });
  // Do not exit non-zero — a failed fetch should not fail the workflow/build.
});
