'use client';

import { useState } from 'react';

const EMAIL = 'yashpathak1446@gmail.com';
const GITHUB = 'https://github.com/YashPathak1446';
const LINKEDIN = 'https://www.linkedin.com/in/yash-pathak-6074a1210/';

export default function Contact({ index }: { index: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <p className="sec-label">
          <span className="sec-index">{index}</span> Contact
        </p>
        <h2>
          I&apos;m looking for new grad and entry-level software roles.
        </h2>
        <p className="contact-lead">
          If you&apos;re hiring, or you just want to talk about retrieval systems and
          the infrastructure underneath them, I&apos;d like to hear from you. I reply
          to everything.
        </p>

        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <button type="button" className="btn btn-ghost" onClick={copy} aria-live="polite">
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>

        <ul className="contact-links">
          <li>
            <a href={GITHUB}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={LINKEDIN}>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href="/resume.pdf">
              Résumé <span aria-hidden="true">↓</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}