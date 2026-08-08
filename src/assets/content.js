// Site-level info + homepage content. Edit these values directly —
// this is the only place they live.
window.SITE_INFO = {
  siteName: "lorenzo moreschi",
  tagline: "my digital front page",

  // Homepage: one centered image + a bit of text/links. Nothing else.
  homeImage: { src: "assets/img/IMG_7003.jpg", alt: "" },
  homeText: "see you space cowboy...",
  homeLinks: [
    { label: "instagram", href: "https://instagram.com/mrskarchive" },
    { label: "blog", href: "mrskarchive.tumblr.com" },
    { label: "portfolio", href: "xmrskkx.tumblr.com" },
  ],

  copyright: "©2026 lm"
};


// Projects — edit this array to add/remove/change entries.
// Each one becomes a sidebar entry + its own page (title, subtitle,
// image gallery, description). There's no separate "About" page in
// this template — just add an entry here named "About" if you want one.
//
// IMPORTANT: assigned directly to window.PROJECTS (not "const PROJECTS = ...")
// because top-level const/let in a plain <script> do NOT become
// window properties in the browser — only assigning to window. does.
window.PROJECTS = [
  {
    title: "Project Name",
    subtitle: "Short subtitle line",
    images: [
      { src: "assets/img/placeholder.svg", alt: "Image one", caption: "Caption for image one." },
      { src: "assets/img/placeholder.svg", alt: "Image two", caption: "Caption for image two." }
    ],
    description: "A couple of sentences describing this project, piece, or article.",
    link: "" // optional external URL, shown as an extra "Visit ↗" on the page
  },
  {
    title: "About",
    subtitle: "",
    images: [
      { src: "assets/img/placeholder.svg", alt: "Portrait", caption: "" }
    ],
    description: "A short bio or about text goes here — this is just a regular entry in the list above, styled the same as any other project.",
    link: ""
  }
];
