(function () {
  "use strict";

  // ---- Nav -------------------------------------------------------
  const navEl = document.querySelector(".nav-links");
  NAV.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.label;
    navEl.appendChild(a);
  });

  // ---- Hero --------------------------------------------------------
  document.querySelector(".hero-eyebrow").textContent = HERO.eyebrow;
  document.querySelector(".hero-title").textContent = HERO.title;
  document.querySelector(".hero-sub").textContent = HERO.sub;

  // ---- Entries -----------------------------------------------------
  const entriesEl = document.getElementById("entries");
  ENTRIES.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "entry";

    const wrap = entry.url ? document.createElement("a") : document.createElement("div");
    if (entry.url) {
      wrap.href = entry.url;
      wrap.className = "entry-link";
    }

    if (entry.title) {
      const title = document.createElement("h3");
      title.className = "entry-title";
      title.textContent = entry.title;
      wrap.appendChild(title);
    }
    if (entry.meta) {
      const meta = document.createElement("p");
      meta.className = "entry-meta";
      meta.textContent = entry.meta;
      wrap.appendChild(meta);
    }
    if (entry.body) {
      const body = document.createElement("p");
      body.className = "entry-body";
      body.textContent = entry.body;
      wrap.appendChild(body);
    }

    article.appendChild(wrap);
    entriesEl.appendChild(article);
  });

  // ---- Info panel ----------------------------------------------------
  document.querySelector(".info-heading").textContent = INFO.heading;
  document.getElementById("info-body").textContent = INFO.body;

  const groupsEl = document.getElementById("info-groups");
  (INFO.groups || []).forEach((group) => {
    const wrap = document.createElement("div");
    wrap.className = "info-group";

    const label = document.createElement("p");
    label.className = "info-group-label";
    label.textContent = group.label;
    wrap.appendChild(label);

    (group.items || []).forEach((item) => {
      const row = document.createElement("div");
      row.className = "info-item";
      row.textContent = item.title;
      if (item.meta) {
        const meta = document.createElement("span");
        meta.className = "info-item-meta";
        meta.textContent = " — " + item.meta;
        row.appendChild(meta);
      }
      wrap.appendChild(row);
    });

    groupsEl.appendChild(wrap);
  });

  // ---- Footer social ---------------------------------------------
  const socialEl = document.getElementById("footer-social");
  SOCIAL.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.url;
    a.textContent = item.label;
    socialEl.appendChild(a);
  });
})();
