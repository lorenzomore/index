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
// Load every file listed in window.PROJECT_FILES (assets/config.js)
// from assets/projects/. Each file is a plain HTML fragment — it's
// fetched as raw text and injected as-is, no parsing at all. It
// already inherits every class defined in style.css (.gallery,
// figure/figcaption, p, ul, etc.) just by using those tags/classes
// directly in the file.
//
// Uses fetch(), so this requires a local server during development —
// opening index.html directly via file:// will not load projects.
// Run `python3 -m http.server` from the project root and visit
// http://localhost:8000 instead. See README for details.
// ------------------------------------------------------------
async function loadProjects() {
  const entries = window.PROJECT_FILES || [];
  const results = [];

  for (const entry of entries) {
    try {
      const res = await fetch(`assets/projects/${entry.file}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      results.push({ title: entry.title || entry.file, bodyHtml: html });
    } catch (err) {
      console.error(`Could not load assets/projects/${entry.file}`, err);
      results.push({
        title: entry.title || entry.file,
        bodyHtml: `<p class="muted">Could not load this project file (${entry.file}). If you opened this page directly from disk, run a local server instead — see README.</p>`
      });
    }
  }

  window.PROJECTS = results;
}

// ------------------------------------------------------------
// Build sidebar project list from window.PROJECTS
// ------------------------------------------------------------
function buildNavList() {
  const projects = window.PROJECTS || [];
  const navList = document.getElementById("nav-projects");
  if (!navList) return;

  navList.innerHTML = "";
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
// Render a single project's full detail view — just drops its
// fetched HTML straight in, unmodified.
// ------------------------------------------------------------
function renderProjectDetail(index) {
  const project = (window.PROJECTS || [])[index];
  const container = document.getElementById("project-detail");
  if (!container || !project) return;

  container.innerHTML = project.bodyHtml;
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
document.addEventListener("DOMContentLoaded", async () => {
  renderSiteInfo();
  await loadProjects();
  buildNavList();
  route();
});
