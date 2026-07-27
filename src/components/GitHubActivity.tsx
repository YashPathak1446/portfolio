import { relativeTime, type Repo } from '@/lib/github';
import SectionHeading from '@/components/SectionHeading';

export default function GitHubActivity({ repos, index }: { repos: Repo[]; index: string }) {
  if (repos.length === 0) return null;

  return (
    <section id="activity">
      <SectionHeading
        index={index}
        label="Recent activity"
        title="What I've been pushing."
        aside="github.com/YashPathak1446"
        asideHref="https://github.com/YashPathak1446"
      />
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