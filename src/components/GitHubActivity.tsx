import { getRecentRepos, relativeTime } from '@/lib/github';

export default async function GitHubActivity() {
  const repos = await getRecentRepos(5);
  if (repos.length === 0) return null;

  return (
    <section id="activity">
      <div className="section-rule">
        <span>Recent activity</span>
        <a className="section-aside" href="https://github.com/YashPathak1446">
          github.com/YashPathak1446 ↗
        </a>
      </div>
      <ul className="repos">
        {repos.map((r) => (
          <li key={r.name}>
            <a href={r.url} target="_blank" rel="noreferrer">
              <span className="repo-name">{r.name}</span>
              {r.description && <span className="repo-desc">{r.description}</span>}
              <span className="repo-meta">
                {r.language && <span className="repo-lang">{r.language}</span>}
                <span>pushed {relativeTime(r.pushedAt)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}