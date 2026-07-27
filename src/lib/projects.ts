import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'content/projects');

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  repo?: string;
  demo?: string;
  date: string;
  status?: string;
  team?: string;
  cover?: string;
  coverAlt?: string;
  featured?: boolean;
  order?: number;
  body: string;
};

export function getSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}

export function getProject(slug: string): Project | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    title: data.title ?? slug,
    tagline: data.tagline ?? '',
    stack: data.stack ?? [],
    repo: data.repo || undefined,
    demo: data.demo || undefined,
    date: data.date ?? '',
    status: data.status,
    team: data.team,
    cover: data.cover || undefined,
    coverAlt: data.coverAlt,
    featured: data.featured ?? false,
    order: data.order ?? 99,
    body: content,
  };
}

export function getAllProjects(): Project[] {
  return getSlugs()
    .map(getProject)
    .filter((p): p is Project => p !== null)
    .sort((a, b) => (a.order! - b.order!) || b.date.localeCompare(a.date));
}

export function formatYear(date: string): string {
  return date?.slice(0, 4) ?? '';
}

export function getAdjacent(slug: string): { prev: Project | null; next: Project | null } {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return { prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
}