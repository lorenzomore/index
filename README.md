# Site template

Plain HTML/CSS/JS, no build step, no framework. Deploys directly to GitHub Pages.
No content is filled in — everything renders empty until you edit `content.js`.

```
index.html     structure (nav, hero, entries, info panel, footer)
style.css      design tokens (fonts, colors, spacing) up top
script.js      renders content.js into the DOM — holds no content itself
content.js     ← fill this in
fonts/         drop your font files here
```

## Structure

Mirrors a typical index/portfolio layout:

- **NAV** — top bar links
- **HERO** — eyebrow line, title, subtitle
- **ENTRIES** — repeating content blocks (the main list — projects, links,
  posts, whatever)
- **INFO PANEL** — sidebar: short bio + optional grouped lists (e.g.
  Education, Press — rename as needed)
- **FOOTER** — social/contact links

## Filling in content

Everything is in `content.js`, as five arrays/objects: `NAV`, `HERO`,
`ENTRIES`, `INFO`, `SOCIAL`. Each has commented-out example objects showing
the shape — uncomment and fill in, or add as many as you want. Nothing in
`index.html` or `script.js` needs to change.

## Fonts

Put files in `fonts/`, then edit the two `@font-face` blocks at the top of
`style.css` (`src: url(...)`) and set `font-family` to whatever name you
want. `--font-display` / `--font-body` in `:root` already reference those
names everywhere else in the file — a system fallback keeps things looking
fine before you add real files.

## Colors / spacing

Also in `style.css`, under `:root`. Currently black/white/greyscale
placeholders — change `--color-bg`, `--color-ink`, `--color-accent`, etc.

## Running locally

```
python3 -m http.server 8000
```
then open `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a repo (root, or a `/docs` folder).
2. Repo **Settings → Pages → Source** → pick the branch (and `/docs` if used).
3. Live at `https://<username>.github.io/<repo>/` shortly after.
