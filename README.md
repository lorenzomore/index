# Welcome page template

A minimal front page:
- fixed top navbar (site name + tagline, live clock, thin border underneath)
- fixed left sidebar listing your projects
- home page is just a centered image + a bit of text + a couple of links — nothing else
- each project is its own simple page: title, subtitle, an image gallery, a description
- no separate "About" page — if you want one, just add it to the project list like anything else

Pure HTML/CSS/JS — no build step, no framework, works straight from
`file://` (no local server needed).

## Structure

```
src/index.html            page skeleton — navbar/sidebar/home-view/project-view
src/assets/content.js       site name, tagline, homepage image/text/links, footer copyright
src/assets/content.js      the array of projects — this is what you edit most
src/assets/css/style.css   all styling; variables at the top control fonts/sizes/greys/layout
src/assets/js/script.js    clock + routing + renders content.js into the page
src/assets/img/            put your images here
src/assets/fonts/          your font files
```

## Editing the homepage

Edit `src/assets/content.js`:

```js
window.SITE_INFO = {
  siteName: "Site Name",
  tagline: "tagline",

  homeImage: { src: "assets/img/your-photo.jpg", alt: "" },
  homeText: "Short intro text goes here.",
  homeLinks: [
    { label: "Email", href: "mailto:you@example.com" },
    { label: "Instagram", href: "https://instagram.com/you" }
  ],

  copyright: "©2026 Site Name."
};
```

`homeLinks` can be any mix of `mailto:`, external URLs, or internal
links (e.g. `"#project-0"` to point at a specific project).

## Editing projects

Edit `src/assets/content.js` — an array on `window.PROJECTS`. Each
entry becomes one sidebar link + one page:

```js
{
  title: "Project Name",
  subtitle: "Short subtitle line",       // optional
  images: [
    { src: "assets/img/photo.jpg", alt: "...", caption: "..." }
  ],
  description: "A couple of sentences.",
  link: ""  // optional external URL, shown as "Visit ↗"
}
```

Want an About page? Just add an entry titled `"About"` with your bio
as the `description` — it'll show up in the sidebar and render like
any other project.

Both `content.js` and `content.js` assign directly to a `window.`
property (`window.SITE_INFO`, `window.PROJECTS`) rather than using
`const`. This matters: top-level `const`/`let` in a plain `<script>`
do **not** become `window` properties in the browser — only `var` or
an explicit `window.x = ...` does. Keep that pattern if you add more
files, or the page will silently read back empty.

## How switching works

Each project gets a URL fragment: `#project-0`, `#project-1`, etc.
`script.js` listens for `hashchange` and shows either the home view
(`#`, or nothing) or that project's page — never both. The sidebar
underlines whichever project is open. Clicking the site name in the
navbar always returns to home.

## Fonts

Wired up from `src/assets/fonts/` (ABC Diatype trial family):
regular/medium/bold for body text, mono for the clock and sidebar
list. To swap in your own font, replace the files and update the
`@font-face` blocks at the top of `style.css`.

## Images

Put photos in `src/assets/img/` and reference them by relative path.
No build/optimize step, so pre-resize large photos before adding them
(long edge ~2000px is plenty for web).

## Colors

Black/white/grey only, by design — no accent color anywhere. All
greys live in `:root` in `style.css` if you want to adjust contrast.

## Running locally

Just open `src/index.html` directly in a browser — no server needed.
Content loads via plain `<script>` includes, not `fetch()`, so
everything (including routing) works from `file://` with zero setup.

## Deploying to GitHub Pages

1. Push the contents of `src/` to a GitHub repo (as the repo root, or
   inside a `/docs` folder).
2. In the repo: **Settings → Pages → Source**, pick the branch (and
   `/docs` folder if used).
3. Save — GitHub publishes at `https://<username>.github.io/<repo>/`.

No build step required.
