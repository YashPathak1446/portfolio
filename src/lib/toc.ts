export type Heading = { text: string; id: string };

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Pulls level-2 headings out of raw MDX, skipping fenced code blocks. */
export function getHeadings(source: string): Heading[] {
  const out: Heading[] = [];
  let inFence = false;

  for (const line of source.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      const text = m[1].replace(/[`*_]/g, '');
      out.push({ text, id: slugify(text) });
    }
  }
  return out;
}