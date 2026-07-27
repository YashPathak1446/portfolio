'use client';

import { useEffect, useState } from 'react';

type Mode = 'light' | 'dark';

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Mode | null;
    const system: Mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setMode(stored ?? system);
  }, []);

  function toggle() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={mode === 'dark'}
    >
      <span aria-hidden="true">{mode === 'dark' ? 'light' : 'dark'}</span>
    </button>
  );
}