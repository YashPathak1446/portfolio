import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProject, getSlugs, formatYear, getAdjacent } from '@/lib/projects';

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.title} — Yash Pathak`, description: p.tagline };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const { prev, next } = getAdjacent(slug);

  return (
    <main className="article">
      <a className="back" href="/#work">← All work</a>

      <header>
        <p className="eyebrow" style={{ margin: 0 }}>{formatYear(p.date)}</p>
        <h1>{p.title}</h1>
        <p className="tagline">{p.tagline}</p>

        <div className="meta">
          <span>{p.stack.join(' · ')}</span>
          {p.team && <span>{p.team}</span>}
          {p.repo && <a href={p.repo}>Source ↗</a>}
          {p.demo && <a href={p.demo}>Demo ↗</a>}
        </div>
      </header>

      {p.cover && (
        <figure className="cover prose" style={{ padding: 0 }}>
          <img src={p.cover} alt={p.coverAlt ?? ''} />
        </figure>
      )}

      <article className="prose">
        <MDXRemote source={p.body} />
      </article>

      <nav className="pager">
        {prev ? (
          <a href={`/projects/${prev.slug}`}>
            <span>Previous</span>
            <strong>{prev.title}</strong>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a className="next" href={`/projects/${next.slug}`}>
            <span>Next</span>
            <strong>{next.title}</strong>
          </a>
        )}
      </nav>
    </main>
  );
}