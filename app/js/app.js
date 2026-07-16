/* app.js — router, theme, shared UI helpers */
(function () {

  /* ---------- UI helpers ---------- */
  window.UI = {
    esc(s) {
      return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    },
    toast(msg, ms = 2600) {
      const holder = document.getElementById("toast-holder");
      const t = document.createElement("div");
      t.className = "toast";
      t.innerHTML = msg;
      holder.appendChild(t);
      setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 450); }, ms);
    },
    badgePop(badge) {
      const d = document.createElement("div");
      d.className = "badge-pop";
      d.innerHTML = `<div class="badge-pop-card">
        <div class="b-icon">${badge.icon}</div>
        <span class="eyebrow">Badge unlocked</span>
        <h2 style="margin:0">${badge.name}</h2>
        <button class="btn btn-primary btn-sm" style="margin-top:16px">Carry on</button>
      </div>`;
      document.body.appendChild(d);
      const close = () => d.remove();
      d.addEventListener("click", e => { if (e.target === d) close(); });
      d.querySelector("button").addEventListener("click", close);
      setTimeout(close, 4200);
    }
  };

  /* ---------- theme ---------- */
  const savedTheme = Store.state.settings.theme || "dark";
  document.documentElement.dataset.theme = savedTheme;
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    Store.state.settings.theme = next;
    Store.save();
  });

  /* ---------- router ---------- */
  const routes = {
    "": "dashboard", "/": "dashboard",
    "/practice": "practice", "/mock": "mock", "/revise": "revise",
    "/lessons": "lessons", "/stats": "stats"
  };

  function parseHash() {
    const h = location.hash.replace(/^#/, "");
    const [path, qs] = h.split("?");
    const params = {};
    if (qs) for (const kv of qs.split("&")) {
      const [k, v] = kv.split("=");
      params[decodeURIComponent(k)] = decodeURIComponent(v || "");
    }
    return { path: path || "/", params };
  }

  function navigate() {
    const { path, params } = parseHash();
    const name = routes[path] || "dashboard";
    if (name !== "mock" && Views.mockAbort) Views.mockAbort();

    document.querySelectorAll(".rail-link[data-nav]").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === (name === "dashboard" ? "dash" : name));
    });

    const view = document.getElementById("view");
    window.scrollTo(0, 0);
    Views[name](view, params);
    view.focus({ preventScroll: true });

    // due badge on rail
    const badge = document.getElementById("rail-due-badge");
    const due = SRS.dueList().length;
    badge.hidden = due === 0;
    badge.textContent = due > 99 ? "99+" : due;
  }

  window.addEventListener("hashchange", navigate);
  window.addEventListener("DOMContentLoaded", navigate);
  if (document.readyState !== "loading") navigate();
})();
