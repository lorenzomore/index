// Site-level info + homepage content. Edit these values directly —
window.SITE_INFO = {
  siteName: "moresk",
  tagline: "my digital front page",

  // Homepage: one centered image + a bit of text/links. Nothing else.
  homeImage: { src: "assets/img/SAM_3293.webp", alt: "" },
  homeText: "see you space cowboy...",
  homeLinks: [
    { label: "instagram", href: "https://instagram.com/mrskarchive" },
    { label: "blog", href: "https://mrskarchive.tumblr.com" },
    { label: "portfolio", href: "https://xmrskkx.tumblr.com" },
  ],

  copyright: "©2026 lm"
};

// Which project files to load, and in what order they appear in the
// sidebar. Add a new .html file to assets/projects/ and list it here.
// "title" is only used for the sidebar link and the page's URL
// fragment (#project-0, #project-1, ...) — the file itself is
// otherwise fully in control of its own content.
window.PROJECT_FILES = [
  { title: "Desk setup", file: "desk-setup.html" },
  { title: "About", file: "about.html" }
];