import type { Metadata } from 'next';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

const SITE = 'https://portfolio-sigma-nine-qz39oyo8ii.vercel.app'; // TODO: your domain
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}",
          }}
        />
      </head>
      <body>
        <div className="shell">
          <header className="masthead">
            <a href="/" className="wordmark">Yash Pathak</a>
            <nav>
              <a href="/#work">Work</a>
              <a href="/#experience">Experience</a>
              <a href="/#about">About</a>
              <a href="/#contact">Contact</a>
              <a href="https://github.com/YashPathak1446">GitHub</a>
              <ThemeToggle />
            </nav>
          </header>
          {children}
          <footer className="foot">
            <span>© {new Date().getFullYear()} Yash Pathak</span>
            <a href="/#contact">Get in touch</a>
          </footer>
        </div>
      </body>
    </html>
  );
}