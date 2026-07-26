import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yash Pathak — software engineer',
  description:
    'Software engineer working on AI infrastructure: retrieval pipelines, agent orchestration, and the cloud plumbing underneath both.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="masthead">
            <a href="/" className="wordmark">Yash Pathak</a>
            <nav>
              <a href="/#work">Work</a>
              <a href="/#about">About</a>
              <a href="/resume.pdf">Résumé</a>
              <a href="https://github.com/YashPathak1446">GitHub</a>
            </nav>
          </header>
          {children}
          <footer className="foot">
            <a href="mailto:you@example.com">you@example.com</a>
            <a href="https://github.com/YashPathak1446">GitHub</a>
            <a href="https://linkedin.com/in/">LinkedIn</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
