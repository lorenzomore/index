// ------------------------------------------------------------
// Clock
// ------------------------------------------------------------
function updateClock() {
  const timeEl = document.getElementById("clock-time");
  if (!timeEl) return;
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
updateClock();
setInterval(updateClock, 1000);

// ------------------------------------------------------------
// Site-level info + homepage content (assets/config.js -> window.SITE_INFO)
// ------------------------------------------------------------
function renderSiteInfo() {
  const info = window.SITE_INFO || {};

  const nameNode = document.querySelector("#site-home-link");
  if (nameNode && nameNode.firstChild) {
    nameNode.firstChild.textContent = (info.siteName || "Site Name") + "\n";
  }
  const taglineEl = document.getElementById("topbar-tagline");
  if (taglineEl) taglineEl.textContent = info.tagline || "";

  const imageEl = document.getElementById("home-image");
  if (imageEl && info.homeImage) {
    imageEl.src = info.homeImage.src || "";
    imageEl.alt = info.homeImage.alt || "";
  }

  const textEl = document.getElementById("home-text");
  if (textEl) textEl.textContent = info.homeText || "";

  const linksEl = document.getElementById("home-links");
  if (linksEl && Array.isArray(info.homeLinks)) {
    info.homeLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href || "#";
      a.textContent = link.label || "";
      if (/^https?:\/\//.test(link.href || "")) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      linksEl.appendChild(a);
    });
  }

  const footerEl = document.getElementById("footer-copyright");
  if (footerEl) footerEl.textContent = info.copyright || "";

  document.title = info.siteName || document.title;
}

// ------------------------------------------------------------
// Build sidebar project list (assets/content.js -> window.PROJECTS)
// ------------------------------------------------------------
function buildNavList() {
  const projects = window.PROJECTS || [];
  const navList = document.getElementById("nav-projects");
  if (!navList) return;

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#project-${index}`;
    a.textContent = project.title || "Untitled";
    a.dataset.projectIndex = index;
    li.appendChild(a);
    navList.appendChild(li);
  });
}

// ------------------------------------------------------------
// Render a single project's full detail view
// ------------------------------------------------------------
function renderProjectDetail(index) {
  const project = (window.PROJECTS || [])[index];
  const container = document.getElementById("project-detail");
  if (!container || !project) return;

  container.innerHTML = "";

  const heading = document.createElement("div");
  heading.className = "project-heading";
  heading.innerHTML = `
    <b>${project.title || ""}</b>
    ${project.subtitle ? `<br><span class="subtitle">${project.subtitle}</span>` : ""}
  `;
  container.appendChild(heading);

  if (Array.isArray(project.images) && project.images.length) {
    const gallery = document.createElement("div");
    gallery.className = "gallery";
    project.images.forEach((image) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.alt || "";
      figure.appendChild(img);
      if (image.caption) {
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = image.caption;
        figure.appendChild(figcaption);
      }
      gallery.appendChild(figure);
    });
    container.appendChild(gallery);
  }

  const description = document.createElement("div");
  description.className = "project-description";
  description.innerHTML = `${project.description || ""}`;
  if (project.link) {
    description.innerHTML += ` [<a class="view-link" href="${project.link}" target="_blank" rel="noopener">Visit ↗</a>]`;
  }
  container.appendChild(description);
}

// ------------------------------------------------------------
// Routing: #project-N shows that project, anything else shows home.
// ------------------------------------------------------------
function parseProjectIndexFromHash() {
  const hash = window.location.hash.replace("#", "");
  const match = hash.match(/^project-(\d+)$/);
  if (!match) return null;
  const index = parseInt(match[1], 10);
  const projects = window.PROJECTS || [];
  return index >= 0 && index < projects.length ? index : null;
}

function setActiveNavLink(index) {
  document.querySelectorAll("#nav-projects a").forEach((a) => {
    a.classList.toggle("active", Number(a.dataset.projectIndex) === index);
  });
}

function route() {
  const homeView = document.getElementById("view-home");
  const projectView = document.getElementById("view-project");
  const index = parseProjectIndexFromHash();

  if (index !== null) {
    renderProjectDetail(index);
    setActiveNavLink(index);
    homeView.hidden = true;
    projectView.hidden = false;
  } else {
    setActiveNavLink(null);
    homeView.hidden = false;
    projectView.hidden = true;
  }
  window.scrollTo(0, 0);
}

// "Site Name" in the top navbar always returns to the home view.
document.addEventListener("click", (e) => {
  const homeLink = e.target.closest("#site-home-link");
  if (homeLink) {
    e.preventDefault();
    if (window.location.hash) {
      window.location.hash = "";
    } else {
      route();
    }
  }
});

window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", () => {
  renderSiteInfo();
  buildNavList();
  route();
});
