# arygupta.com

Plain HTML, built by one script with no packages.

    node build.mjs     # writes the site into dist/
    node serve.mjs     # serves it at http://localhost:3047, rebuilding on reload

- `data/` has the words: `blogs.mjs` (essays, in Markdown), `projects.mjs`,
  `experience.mjs`, `site.mjs` (name, links, nav).
- `build.mjs` turns them into pages. `lib/` has the Markdown converter and
  small date and image helpers.
- `static/style.css` is the whole look. `public/` holds images; keep them at
  most 1200px wide, with a 300px copy in `public/thumbs/` for /projects.

Vercel runs `node build.mjs` and serves `dist/` (see `vercel.json`).
