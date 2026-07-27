import { getAllProjects, formatYear } from '@/lib/projects';
import { getExperience, formatSpan } from '@/lib/experience';
import EmbeddingField from '@/components/EmbeddingField';
import Contact from '@/components/Contact';
import Resume from '@/components/Resume';
import GitHubActivity from '@/components/GitHubActivity';

export default function Home() {
  const projects = getAllProjects();
  const roles = getExperience();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main>
      <section className="hero">
        <div className="hero-text">
        <p className="eyebrow">Bay Area, CA</p>
        <h1>I build the plumbing underneath AI systems.</h1>
        <p>
          Retrieval pipelines, agent orchestration, and the cloud infrastructure
          that keeps both of them running when something upstream fails.
        </p>

        <dl className="record">
          <div><dt>focus</dt><dd>AI infrastructure, backend systems</dd></div>
          <div><dt>recently</dt><dd>AWS + Terraform at Sorenson, RAG over 36M articles at 101gen</dd></div>
          <div><dt>education</dt><dd>B.S. Computer Science, UC Irvine</dd></div>
          <div><dt>status</dt><dd className="open">open to new grad and entry-level roles</dd></div>
        </dl>
        </div>
        <EmbeddingField />
      </section>

      <section id="work">
        <div className="section-rule">
          <span>Selected work</span>
        </div>
        <ul className="work-grid">
          {featured.map((p) => (
            <li className="card reveal" key={p.slug}>
              {p.cover && (
                <div className="card-media">
                  <img src={p.cover} alt={p.coverAlt ?? ''} loading="lazy" />
                </div>
              )}
              <div className="card-body">
                <span className="card-meta">
                  <span className="card-key">{p.slug}</span>
                  <span className="card-year">{formatYear(p.date)}</span>
                </span>
                <h3>
                  <a className="card-link" href={`/projects/${p.slug}`}>
                    {p.title}
                  </a>
                </h3>
                <p>{p.tagline}</p>
                <ul className="stack">
                  {p.stack.slice(0, 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {(p.repo || p.demo) && (
                  <div className="card-links">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer">
                        Source <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        {p.demoLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
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

      <section id="experience" className="band">
        <div className="section-rule" style={{ marginTop: '3.5rem' }}>
          <span>Experience</span>
        </div>
        <ul className="log">
          {roles.map((r) => (
            <li className="role" key={`${r.org}-${r.start}`}>
              <div className="role-when">
                {formatSpan(r.start, r.end)}
                <span className="role-where">{r.location}</span>
              </div>
              <div>
                <h3>
                  {r.role} <span className="role-org">· {r.org}</span>
                </h3>
                <p>{r.summary}</p>
                {r.highlight && <p className="role-highlight">{r.highlight}</p>}
                {r.stack.length > 0 && (
                  <ul className="stack">
                    {r.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <GitHubActivity />

      <section id="about" className="about">
        <h2>About</h2>
        <div className="bio">
          <img className="portrait" src="/images/yash_pathak.jpeg" alt="Yash Pathak" />
          <div>
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
          </div>
        </div>
      </section>

      <Resume />

      <Contact />
    </main>
  );
}