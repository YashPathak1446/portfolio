import fs from 'fs';
import path from 'path';

export type Role = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlight?: string;
  stack: string[];
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function getExperience(): Role[] {
  const file = path.join(process.cwd(), 'content/experience.json');
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function formatSpan(start: string, end: string): string {
  const fmt = (d: string) => {
    if (!d) return 'Present';
    const [y, m] = d.split('-');
    return `${MONTHS[Number(m) - 1]} ${y}`;
  };
  return `${fmt(start)} — ${fmt(end)}`;
}
