# Welcome page template

A minimal, wireframe-style "front door" page: fixed header/footer,
a live clock, a scrolling list of featured items, and an about
section. Pure HTML/CSS/JS — no build step, no framework.

## Structure

```
index.html              page markup (edit text directly here: tagline, about, links)
assets/content.json      list of featured items (photos/links/articles) — edit this, not the HTML
assets/css/style.css     all styling; variables at the top control fonts/sizes/greys
assets/js/script.js      clock + loads content.json into the page
assets/img/              put your images here
assets/fonts/            put custom font files here (optional, see below)
```

## Editing content

- **Header tagline, About section, footer links** — edit the text directly in `index.html`.
- **Featured items** (photos/links/short pieces) — edit `assets/content.json`. Each entry:

```json
{
  "image": "assets/img/your-photo.jpg",
  "alt": "Description for accessibility",
  "title": "Project Name",
  "year": "2026",
  "subtitle": "Line one\nLine two\nLine three",
  "description": "A couple of sentences.",
  "link": "https://example.com"   // optional, leave "" for no link
}
```

Add or remove objects from the array to add/remove items — the page
rebuilds itself from this file on load, no HTML editing needed.

## Fonts

By default the page falls back to system fonts (Helvetica/Arial for
body, monospace for the clock-style bits) so it works with zero setup.

To use your own font:
1. Drop the font file(s) in `assets/fonts/`.
2. Add an `@font-face` rule at the top of `assets/css/style.css` pointing to it.
3. Update the `--font-body` / `--font-mono` / `--font-heading` variables in `:root`.

## Images

Put photos in `assets/img/` and reference them by relative path in
`content.json` (e.g. `"assets/img/photo-01.jpg"`). Keep filenames
lowercase-with-hyphens for portability. There's no build/optimization
step, so pre-resize large photos before adding them (long edge
~2000px is plenty for web).

## Colors

Intentionally black/white/grey only, matching the wireframe reference.
All greys live in `:root` in `style.css` (`--c-text`, `--c-text-muted`,
`--c-line`, etc.) if you ever want to adjust contrast — but no accent
color is used anywhere by design.

## Running locally

Just open `index.html` in a browser — or, since `fetch()` needs a
server for the `content.json` load to work in some browsers, run a
tiny local server from the project root:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder's contents to a GitHub repo (e.g. as the repo root,
   or inside a `/docs` folder).
2. In the repo: **Settings → Pages → Source**, pick the branch (and
   `/docs` folder if used).
3. Save — GitHub will publish at `https://<username>.github.io/<repo>/`.

No build step required since everything is static HTML/CSS/JS.
