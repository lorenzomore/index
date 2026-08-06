(function () {
  "use strict";

  // Header
  document.getElementById("site-name").textContent = SITE.name;
  document.getElementById("site-bio").textContent = SITE.bio;
  document.getElementById("footer-note").textContent = SITE.footerNote;

  // Link list
  const list = document.getElementById("link-list");
  const frag = document.createDocumentFragment();

  LINKS.forEach((link, i) => {
    if (link.group) {
      const groupLabel = document.createElement("li");
      groupLabel.className = "link-group-label";
      groupLabel.setAttribute("role", "presentation");
      groupLabel.textContent = link.group;
      frag.appendChild(groupLabel);
    }

    const li = document.createElement("li");
    li.className = "link-item";

    const a = document.createElement("a");
    a.href = link.url;
    if (!link.url.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    const index = document.createElement("span");
    index.className = "link-index";
    index.textContent = String(i + 1).padStart(2, "0");

    const main = document.createElement("span");
    main.className = "link-main";

    const label = document.createElement("span");
    label.className = "link-label";
    label.textContent = link.label;

    const handle = document.createElement("span");
    handle.className = "link-handle";
    handle.textContent = link.handle || "";

    main.appendChild(label);
    if (link.handle) main.appendChild(handle);

    const arrow = document.createElement("span");
    arrow.className = "link-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    a.appendChild(index);
    a.appendChild(main);
    a.appendChild(arrow);
    li.appendChild(a);
    frag.appendChild(li);
  });

  list.appendChild(frag);

  // Signature touch: quiet local-time readout in the eyebrow slot
  const clockEl = document.querySelector('[data-js="clock"]');
  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    clockEl.textContent = `Local time — ${hh}:${mm}`;
  }
  updateClock();
  setInterval(updateClock, 15000);
})();
