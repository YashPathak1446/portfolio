import type { Metadata } from 'next';
import './globals.css';

const SITE = 'https://vercel.com/yashpathak1446/portfolio'; // TODO: your domain
const DESCRIPTION =
  'Software engineer working on AI infrastructure: retrieval pipelines, agent orchestration, and the cloud plumbing underneath both.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Yash Pathak — software engineer',
    template: '%s',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'Yash Pathak — software engineer',
    description: DESCRIPTION,
    url: SITE,
    siteName: 'Yash Pathak',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Yash Pathak', description: DESCRIPTION },
  icons: { icon: '/favicon.svg' },
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
              <a href="/#experience">Experience</a>
              <a href="/#about">About</a>
              <a href="/resume.pdf">Résumé</a>
              <a href="https://github.com/YashPathak1446">GitHub</a>
            </nav>
          </header>
          {children}
          <footer className="foot">
            <a href="mailto:yashpathak1446@gmail.com">Email</a>
            <a href="https://github.com/YashPathak1446">GitHub</a>
            <a href="https://www.linkedin.com/in/yash-pathak-6074a1210/">LinkedIn</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
