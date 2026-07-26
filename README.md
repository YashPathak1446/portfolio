# Portfolio

Next.js 15 (App Router) + MDX. No Tailwind — styling is plain CSS with custom
properties in `src/app/globals.css`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Adding a project

1. Drop a `.mdx` file in `content/projects/`. The filename becomes the URL:
   `content/projects/jobscout.mdx` -> `/projects/jobscout`.
2. Put images in `public/images/projects/<slug>/`.
   `public/` is stripped from the URL, so
   `public/images/projects/fabflix/cover.png` is referenced as
   `/images/projects/fabflix/cover.png`.

No code changes needed. The homepage reads every file's frontmatter automatically.

## Frontmatter

```yaml
---
title: "Fabflix"
tagline: "One sentence. Shows on the homepage and under the title."
stack: ["Java", "MySQL", "Kubernetes"]
repo: "https://github.com/..."     # omit or leave "" to hide the link
demo: "https://..."                 # same
date: "2025-01"                     # YYYY-MM, used for the year label
status: "Complete"
team: "Two-person team"             # optional, omit for solo work
featured: true                      # true = full entry, false = compact row
order: 2                            # homepage sort, lower is higher
cover: "/images/projects/fabflix/cover.png"
coverAlt: "Fabflix login page"
---
```

## Images inside a write-up

```markdown
![Checkout with three items in the cart](/images/projects/fabflix/checkout.png)
```

Replace the `> TODO — screenshot goes here` blockquotes with these.

## Before deploying

- `src/app/layout.tsx` — replace the placeholder email and LinkedIn URL
- `public/resume.pdf` — add it, the nav already links there
- `src/app/page.tsx` — the hero and About copy are a starting point, rewrite in your voice
- Deploy: push to GitHub, import at vercel.com, no configuration needed
