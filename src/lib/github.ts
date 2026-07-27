const USER = 'YashPathak1446';

export type Repo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  stars: number;
};

type ApiRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
};

/**
 * Recently pushed public repos, forks and archived excluded.
 * Fetched at build time and revalidated hourly. Returns [] on any failure so a
 * GitHub outage or rate limit degrades the section away instead of failing the build.
 */
export async function getRecentRepos(limit = 5): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?sort=pushed&per_page=30`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return (data as ApiRepo[])
      .filter((r) => !r.fork && !r.archived)
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        pushedAt: r.pushed_at,
        stars: r.stargazers_count,
      }));
  } catch {
    return [];
  }
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}