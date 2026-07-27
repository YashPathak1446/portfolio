import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProject, getSlugs, formatYear, getAdjacent } from '@/lib/projects';
import { getHeadings, slugify } from '@/lib/toc';

function textOf(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in (node as any))
    return textOf((node as any).props?.children);
  return '';
}

const mdxComponents = {
  h2: (props: any) => <h2 id={slugify(textOf(props.children))} {...props} />,
};

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
  const headings = getHeadings(p.body);

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

      <div className="reading">
        {headings.length > 2 && (
          <aside className="toc" aria-label="On this page">
            <p className="toc-label">On this page</p>
            <ol>
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </aside>
        )}
        <article className="prose">
          <MDXRemote source={p.body} components={mdxComponents} />
        </article>
      </div>

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