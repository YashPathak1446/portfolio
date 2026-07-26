import { getAllProjects, formatYear } from '@/lib/projects';

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Irvine, CA</p>
        <h1>I build the plumbing underneath AI systems.</h1>
        <p>
          Retrieval pipelines, agent orchestration, and the cloud infrastructure
          that keeps both of them running when something upstream fails.
        </p>
      </section>

      <section id="work">
        <div className="section-rule">
          <span>Selected work</span>
        </div>
        <ul className="index">
          {featured.map((p) => (
            <li key={p.slug}>
              <a className="entry" href={`/projects/${p.slug}`}>
                <span className="entry-head">
                  <span className="entry-key">{p.slug}</span>
                  <span className="entry-title">{p.title}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="entry-year">{formatYear(p.date)}</span>
                  <span className="seek" aria-hidden="true">→</span>
                </span>
                <p className="entry-line">{p.tagline}</p>
                <ul className="stack">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>

        {rest.length > 0 && (
          <>
            <div className="section-rule" style={{ marginTop: '3.5rem' }}>
              <span>Also built</span>
            </div>
            <ul className="index">
              {rest.map((p) => (
                <li key={p.slug}>
                  <a className="entry" href={`/projects/${p.slug}`}>
                    <span className="entry-head">
                      <span className="entry-key">{p.slug}</span>
                      <span className="entry-title">{p.title}</span>
                      <span className="leader" aria-hidden="true" />
                      <span className="entry-year">{formatYear(p.date)}</span>
                      <span className="seek" aria-hidden="true">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section id="about" className="about">
        <h2>About</h2>
        <p>
          I graduated from UC Irvine with a B.S. in Computer Science and spent the
          last two years split between cloud infrastructure and applied machine
          learning — building CI/CD and observability pipelines on AWS, and a
          retrieval-augmented system over a 36-million-article corpus.
        </p>
        <p>
          The thread connecting them is that models are the easy part. Whatever
          makes them reachable, fast, and still standing after an upstream 503 is
          the work I keep coming back to.
        </p>
      </section>
    </main>
  );
}
