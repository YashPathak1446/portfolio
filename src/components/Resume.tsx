import SectionHeading from '@/components/SectionHeading';

export default function Resume({ index }: { index: string }) {
  return (
    <section id="resume" className="band">
      <SectionHeading
        index={index}
        label="Résumé"
        title="One page, kept current."
        aside="open PDF"
        asideHref="/resume.pdf"
      />

      <div className="resume">
        <a className="resume-sheet" href="/resume.pdf" target="_blank" rel="noreferrer">
          <img
            src="/images/resume-preview.jpg"
            alt="First page of Yash Pathak's résumé"
            loading="lazy"
            width={1200}
            height={1553}
          />
        </a>

        <div className="resume-side">
          <p>
            Backend and AI infrastructure — serverless APIs on AWS, retrieval
            pipelines over a 36-million-article corpus, and multi-agent systems.
            Every project listed here has a write-up on this site and source on
            GitHub.
          </p>
          <div className="resume-actions">
            <a className="btn btn-primary" href="/resume.pdf" download="Yash_Pathak_Resume.pdf">
              Download PDF
            </a>
            <a className="btn btn-ghost" href="/resume.pdf" target="_blank" rel="noreferrer">
              Open in browser
            </a>
          </div>
          <p className="resume-note">PDF · 112 KB · updated July 2026</p>
        </div>
      </div>
    </section>
  );
}