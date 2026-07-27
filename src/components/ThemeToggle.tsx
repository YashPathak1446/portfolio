'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Mode | null;
    const system: Mode = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setMode(stored ?? system);
    setReady(true);
  }, []);

  function toggle() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  const dark = mode === 'dark';

  return (
    <button
      type="button"
      className="switch"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={toggle}
      data-ready={ready}
    >
      <span className="switch-track">
        <span className="switch-icon switch-sun" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="8" cy="8" r="3.1" />
            <path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1M12.9 12.9l-1.1-1.1M4.2 4.2L3.1 3.1" />
          </svg>
        </span>
        <span className="switch-icon switch-moon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M13.2 9.6A5.8 5.8 0 0 1 6.4 2.8a5.8 5.8 0 1 0 6.8 6.8Z" />
          </svg>
        </span>
        <span className="switch-thumb" aria-hidden="true" />
      </span>
    </button>
  );
}