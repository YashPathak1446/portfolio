import type { Metadata } from 'next';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/site';


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yash Pathak — software engineer',
    template: '%s',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: 'Yash Pathak — software engineer',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Yash Pathak',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Yash Pathak', description: SITE_DESCRIPTION },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: SITE_NAME,
              url: SITE_URL,
              email: `mailto:${EMAIL}`,
              jobTitle: 'Software Engineer',
              description: SITE_DESCRIPTION,
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'University of California, Irvine',
              },
              knowsAbout: [
                'AI infrastructure',
                'Retrieval-augmented generation',
                'Distributed systems',
                'Cloud infrastructure',
                'Machine learning',
              ],
              sameAs: [GITHUB_URL, LINKEDIN_URL],
            }),
          }}
        />
        <div className="shell">
          <header className="masthead">
            <a href="/" className="wordmark">Yash Pathak</a>
            <nav>
              <a href="/#work">Work</a>
              <a href="/#experience">Experience</a>
              <a href="/#about">About</a>
              <a href="/#resume">Résumé</a>
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