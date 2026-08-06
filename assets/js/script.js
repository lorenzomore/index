// ------------------------------------------------------------
// Clock / day
// ------------------------------------------------------------
function updateClock() {
  const now = new Date();
  const dayEl = document.getElementById("clock-day");
  const timeEl = document.getElementById("clock-time");
  if (dayEl) {
    dayEl.textContent = now.toLocaleDateString(undefined, { weekday: "long" });
  }
  if (timeEl) {
    const pad = (n) => String(n).padStart(2, "0");
    timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// ------------------------------------------------------------
// Load featured items from assets/content.json
// Edit that file to add/remove/change entries — no HTML editing needed.
// ------------------------------------------------------------
async function loadProjects() {
  const container = document.getElementById("projects");
  if (!container) return;

  try {
    const res = await fetch("assets/content.json");
    const items = await res.json();

    items.forEach((item) => {
      const project = document.createElement("article");
      project.className = "project";

      const mediaWrap = document.createElement("div");
      mediaWrap.className = "project-media";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.alt || "";
      mediaWrap.appendChild(img);

      if (item.link) {
        const a = document.createElement("a");
        a.href = item.link;
        a.target = "_blank";
        a.rel = "noopener";
        a.appendChild(mediaWrap);
        project.appendChild(a);
      } else {
        project.appendChild(mediaWrap);
      }

      const meta = document.createElement("div");
      meta.className = "project-meta";
      meta.innerHTML = `
        <div class="col-a">
          <b>${item.title || ""}</b><br>${item.year || ""}
        </div>
        <div class="col-b">
          <div class="subtitle">${(item.subtitle || "").replace(/\n/g, "<br>")}</div>
          <div class="description">${item.description || ""}</div>
        </div>
      `;
      project.appendChild(meta);

      container.appendChild(project);
    });
  } catch (err) {
    console.error("Could not load assets/content.json", err);
  }
}
loadProjects();
