# Portfolio roadmap

Grounded in what recruiters actually do: under 30 seconds on a first visit,
60%+ on mobile, and the most common failure is a site that goes stale.

## Functional

- [x] **1. Contact section with a real CTA.** Prominent, above the footer, with
      copy-to-clipboard email. The site's whole job is to get a reply.
- [ ] **2. `public/resume.pdf`.** The nav links to it and it currently 404s —
      worse than having no link at all.
- [ ] **3. Repo + live demo links on the project cards.** Currently one click
      deep in the meta bar. Recruiters scan for them; they should be scannable.
- [x] **4. Live GitHub activity.** Five most recently pushed non-fork repos,
      fetched at build time with hourly revalidation. Returns `[]` on failure
      so the section degrades away rather than breaking the build.
      *Follow-up: add `GITHUB_TOKEN` in Vercel to lift the 60/hr per-IP limit.*
- [x] **5. SEO plumbing.** JSON-LD `Person` schema, `sitemap.ts`, `robots.ts`,
      shared constants in `src/lib/site.ts`.
      *Still open: per-project OpenGraph images.*

## Non-functional

- [ ] **6. Real theme toggle UI.** A switch with icons and a sliding thumb,
      not a clickable word.
- [ ] **7. Section division.** Distinct movements rather than uniform hairline
      rules — larger headers, alternating surfaces, consistent labelling.
- [ ] **8. Mobile design pass.** Currently only verified for "doesn't
      overflow." 60% of recruiters are on phones; it deserves real attention.

## Content still owed

- [ ] Rerun the antibiotic notebook with the split before augmentation, then
      correct the resume figures
- [ ] Capture the JobScout terminal run / before-after tailoring diff
      (the `{/* TODO */}` in `jobscout.mdx`)
- [ ] Commit the JobScout benchmark script so the cache speedup is verifiable
- [ ] Rewrite hero and About copy in my own voice
- [ ] Add descriptions to GitHub repos — `portfolio`,
      `antibiotic-resistance-prediction`, `Web-Application`, `Spotify-Browser`
      have none, so they render bare in the activity feed

## Deliberately parked

- **Embedding field hero.** Looks clever, does nothing for a visitor.
  Reconsider once the contact section and GitHub feed compete for the space
  above the fold.