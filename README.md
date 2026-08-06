# Links site

Plain HTML/CSS/JS, no build step, no framework, no dependencies. Deploys straight to GitHub Pages.

```
index.html     structure — you shouldn't need to touch this often
style.css      all design tokens (colors, fonts, spacing) at the top
script.js      renders content.js into the page — no content lives here
content.js     ← edit this to change what's on the page
fonts/         drop your font files here
```

## Editing content

Open `content.js`. Two things to edit:

- `SITE` — your name, bio, footer note.
- `LINKS` — an array of link objects, rendered in order. Add a `group: "Label"`
  field to the first item in a new group to print a section header above it
  (like "Elsewhere" / "Projects" in the starter content). Every other field:

```js
{ label: "GitHub", handle: "@you", url: "https://github.com/you" }
```

Add, remove, or reorder items freely — the page re-renders from this array.

## Adding your fonts

1. Put your font files (`.woff2` preferred) in `fonts/`.
2. Open `style.css` and update the three `@font-face` blocks near the top —
   set `src: url("fonts/yourfile.woff2")` and `font-family` to whatever name
   you want to reference.
3. That's it — `--font-display`, `--font-mono`, `--font-body` in `:root`
   already point at those family names, and every element in the page reads
   from those three variables. There's a system-font fallback in each stack,
   so the site looks fine even before you add real files.

Roles: `Display` is the name/headline and link labels, `Mono` is the small
uppercase labels/index numbers, `Body` is the bio text.

## Colors / spacing

Also in `style.css`, under `:root`. Six named values control the whole
palette; change `--color-brass` for a different accent, or the others for a
different mood entirely.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (root of the repo, or a `/docs` folder —
   your choice).
2. In the repo: **Settings → Pages → Source**, pick the branch (and `/docs`
   folder if you used one).
3. Save. Your site will be live at `https://<username>.github.io/<repo>/`
   within a minute or two.

If you want a custom domain, add a `CNAME` file at the repo root with just
your domain name in it, and point your DNS at GitHub Pages per their docs.
