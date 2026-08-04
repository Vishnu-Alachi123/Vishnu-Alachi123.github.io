import type { ReactNode } from 'react';
import { projects, type Project, type ProjectLink, type StatusKind } from './projects';
import type { Role } from './resume';
import { languageColor } from './languageColors';

export interface RepoCardData {
  id: string;
  name: string;
  summary: string;
  detail: ReactNode;
  language: string;
  languageColor: string;
  topics: string[];
  pinned: boolean;
  statusKind: StatusKind;
  statusLabel: string;
  homepage?: string;
  links: ProjectLink[];
  note?: string;
}

function projectToRepoCard(p: Project): RepoCardData {
  const [language, ...topics] = p.tags;
  return {
    id: p.id,
    name: p.title,
    summary: p.summary,
    detail: p.body,
    language: language ?? 'Code',
    languageColor: languageColor(language ?? ''),
    topics,
    pinned: Boolean(p.featured),
    statusKind: p.status.kind,
    statusLabel: p.status.label,
    homepage: p.preview,
    links: p.links ?? [],
    note: p.note,
  };
}

/** Repos, GitHub-order: pinned first, then the rest in existing catalog order. */
export const repoCards: RepoCardData[] = [...projects]
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  .map(projectToRepoCard);

export interface ExperienceCardData {
  id: string;
  company: string;
  role: string;
  dates: string;
  summary: string;
  detail: string[];
}

export function roleToExperienceCard(r: Role, index: number): ExperienceCardData {
  return {
    id: `${r.org}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    company: r.org,
    role: r.title,
    dates: r.dates ?? 'Dates unavailable',
    summary: r.points[0] ?? '',
    detail: r.points,
  };
}
