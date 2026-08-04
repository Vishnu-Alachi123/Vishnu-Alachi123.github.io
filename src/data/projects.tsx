import type { ReactNode } from 'react';

export type StatusKind = 'live' | 'prod' | 'dev' | 'done';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  sub: string;
  /** one-line, plain-text description (GitHub repo-list style) — distinct from `body`, which is the full detail */
  summary: string;
  status: { kind: StatusKind; label: string };
  featured?: boolean;
  /** live URL embedded as a preview in the card media area */
  preview?: string;
  body: ReactNode;
  tags: string[];
  links?: ProjectLink[];
  note?: string;
}

export const projects: Project[] = [
  {
    id: 'findr',
    index: '01 / FINDR',
    title: 'Findr',
    sub: 'findr.page · founder',
    summary: 'Campus-first discovery app for events, communities, gigs, and resources near you.',
    status: { kind: 'live', label: 'Live · Beta soon' },
    featured: true,
    preview: 'https://findr.page',
    body: (
      <>
        A campus-first discovery app I built and now run end to end, live at{' '}
        <a href="https://findr.page" target="_blank" rel="noopener noreferrer">
          findr.page
        </a>
        . Findr helps students <em>find what&apos;s actually around them</em> — events, communities,
        gigs, and resources — in one place, replacing the scattered mix of group chats, flyers, and
        social posts students rely on today, with a third-party mapping API underneath the location
        layer. San Luis Obispo doesn&apos;t yet have a dedicated product built for this, and closing
        that gap is the goal. The app is currently in a full UI/UX redesign ahead of beta testing at
        Cal&nbsp;Poly.
      </>
    ),
    tags: ['Full-stack', 'Product', 'UI/UX'],
    links: [{ label: 'Visit live site ↗', href: 'https://findr.page' }],
  },
  {
    id: 'ops',
    index: '02 / ORACLE-OPS',
    title: 'AI Operations Agent',
    sub: 'Codex-native infrastructure automation',
    summary: 'AI agent that turns plain-English requests into approved internal operations via MCP.',
    status: { kind: 'prod', label: 'In production' },
    body: (
      <>
        An AI operations layer, not a chatbot wrapper. It lets an agent (Codex) turn plain-English
        requests like &quot;is DITA up?&quot; or &quot;reserve a DIT&quot; into <em>approved</em>{' '}
        internal operations — no dashboards, no copied scripts, no leaked credentials. A thin Codex
        plugin talks to a Python MCP server that exposes business-level tools, validates and routes
        each request, and returns clean, structured results. I designed it to be safe by
        construction: signed stateless status handles for async jobs, credential redaction, and
        owner-scoped polling — all covered by unit and evaluator tests.
      </>
    ),
    tags: ['Python', 'MCP', 'Automation', 'AI Agents'],
    note: 'Internal Oracle project — source not public.',
  },
  {
    id: 'robot',
    index: '03 / ROBOT-ARM',
    title: 'Robot Arm + ML',
    sub: 'Applied machine learning & computer vision',
    summary: 'Training a robotic arm to see, grip, and eventually coordinate with a second arm.',
    status: { kind: 'dev', label: 'Building' },
    body: (
      <>
        An ongoing project applying machine learning to an existing robotic arm — training it to
        refine its motion and to detect and pick up objects using computer vision. The longer-term
        goal is coordinating two robotic arms on shared tasks. It combines hands-on mechanical work
        with applied ML: perception, control, and getting hardware to do something useful in the
        physical world.
      </>
    ),
    tags: ['Machine Learning', 'Computer Vision', 'Robotics'],
  },
  {
    id: 'poker',
    index: '04 / POKER-AI',
    title: 'Poker AI',
    sub: "Texas Hold'em agent · CSC 480",
    summary: "Monte Carlo Texas Hold'em bot with opponent modeling and a playable pygame UI.",
    status: { kind: 'done', label: 'Complete' },
    body: (
      <>
        A Texas Hold&apos;em bot built on <code>pypokerengine</code> that reasons under uncertainty.
        A Monte Carlo engine estimates win probability from thousands of simulated rollouts, an
        opponent-modeling layer tracks how each player behaves over time, and a pot-odds module ties
        it into disciplined betting decisions. I built a benchmark suite that pits agent variants
        against each other to measure exactly how much each feature adds — plus a pygame UI so you
        can sit down and play against it.
      </>
    ),
    tags: ['Python', 'Monte Carlo', 'Game AI'],
    links: [{ label: 'View repo ↗', href: 'https://github.com/Vishnu-Alachi123/CSC480' }],
  },
  {
    id: 'leetswipe',
    index: '05 / LEETSWIPE',
    title: 'LeetSwipe',
    sub: 'Swipe your way through interview prep',
    summary: 'Turns LeetCode practice into a swipeable card feed, backed by an LLM question pipeline.',
    status: { kind: 'live', label: 'Live demo' },
    preview: 'https://vishnu-alachi123.github.io/Leetswipe/',
    body: (
      <>
        Interview grinding, reimagined as a feed. LeetSwipe turns LeetCode practice into a swipeable
        card format — flick through questions, tap to check your answer with an explanation, and save
        the ones worth revisiting. The React&nbsp;Native app is paired with a Python pipeline that
        uses an LLM (with structured output) to generate conceptual multiple-choice questions from
        real problems, backed by MongoDB.
      </>
    ),
    tags: ['React Native', 'AI Agents', 'MongoDB', 'Python'],
    links: [
      { label: 'Live demo ↗', href: 'https://vishnu-alachi123.github.io/Leetswipe/' },
      { label: 'View repo ↗', href: 'https://github.com/Vishnu-Alachi123/Leetswipe' },
    ],
  },
  {
    id: 'focusday',
    index: '06 / FOCUS-DAY',
    title: 'Focus Day',
    sub: 'A planner built for a distractible brain',
    summary: 'A calm, single-day planner with voice input, built for people who get overwhelmed by lists.',
    status: { kind: 'live', label: 'Live demo' },
    preview: 'https://vishnu-alachi123.github.io/focus-day/',
    body: (
      <>
        Traditional to-do apps made focus harder for me — endless backlogs, notifications, and guilt
        over unfinished lists. Focus Day takes the opposite approach: instead of an infinite list, it
        forces a small, prioritized plan for <em>today</em>, color-coded by urgency in a calm
        interface designed to reduce overwhelm. It even includes a <strong>voice mode</strong> —
        describe your day out loud and it
        parses your words into scheduled tasks. What started as a personal fix is becoming a genuine
        productivity tool for students who think the way I do.
      </>
    ),
    tags: ['JavaScript', 'Speech-to-Text', 'Productivity', 'ADHD-friendly'],
    links: [
      { label: 'Live demo ↗', href: 'https://vishnu-alachi123.github.io/focus-day/' },
      { label: 'View repo ↗', href: 'https://github.com/Vishnu-Alachi123/focus-day' },
    ],
  },
];
