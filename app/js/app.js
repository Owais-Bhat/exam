/* app.js — router, theme, shared UI helpers */
(function () {

  /* ---------- UI helpers ---------- */
  window.UI = {
    esc(s) {
      return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    },
    cleanMath(s) {
      if (s === null || s === undefined) return "";
      let str = String(s);
      // Remove double and single dollar signs
      str = str.replace(/\$\$([\s\S]*?)\$\$/g, "$1");
      str = str.replace(/\$([^\$\n]+)\$/g, "$1");
      str = str.replace(/\$/g, "");
      // Nested fractions loop
      for (let i = 0; i < 3; i++) {
        str = str.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1 / $2)");
      }
      // Strip LaTeX wrappers
      str = str.replace(/\\text\{([^\}]+)\}/g, "$1");
      str = str.replace(/\\mathbf\{([^\}]+)\}/g, "$1");
      str = str.replace(/\\mathit\{([^\}]+)\}/g, "$1");
      str = str.replace(/\\mathrm\{([^\}]+)\}/g, "$1");
      str = str.replace(/\\sqrt\{([^\}]+)\}/g, "√($1)");
      str = str.replace(/\\sqrt\[(\d+)\]\{([^\}]+)\}/g, "$1√($2)");
      str = str.replace(/\\Delta\s*([a-zA-Z])/g, "Δ$1");
      str = str.replace(/\\circ/g, "°");
      str = str.replace(/\\degree/g, "°");
      str = str.replace(/\\implies/g, " ⟶ ");
      str = str.replace(/\\iff/g, " ⟺ ");
      str = str.replace(/\\rightarrow/g, " ⟶ ");
      str = str.replace(/\\leftarrow/g, " ⟵ ");
      str = str.replace(/\\uparrow/g, " ↑ ");
      str = str.replace(/\\downarrow/g, " ↓ ");
      str = str.replace(/\\times/g, " × ");
      str = str.replace(/\\div/g, " ÷ ");
      str = str.replace(/\\cdot/g, " · ");
      str = str.replace(/\\pm/g, " ± ");
      str = str.replace(/\\ge/g, " ≥ ");
      str = str.replace(/\\le/g, " ≤ ");
      str = str.replace(/\\neq/g, " ≠ ");
      str = str.replace(/\\approx/g, " ≈ ");
      str = str.replace(/\\quad/g, " ");
      str = str.replace(/\\qquad/g, "  ");
      str = str.replace(/\\left/g, "");
      str = str.replace(/\\right/g, "");
      str = str.replace(/\\%/g, "%");
      str = str.replace(/\\_/g, "_");
      str = str.replace(/\\&/g, "&");
      str = str.replace(/\\\\/g, " ");
      str = str.replace(/\\([a-zA-Z]+)/g, "$1");
      str = str.replace(/\u200b/g, "");
      return str;
    },
    cleanText(s) {
      return this.esc(this.cleanMath(s));
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
    "/masterclass": "masterclass",
    "/ai-coach": "ai_coach",
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

  function updateTopBar() {
    const st = Store.state;
    const lvl = Gamify.level();
    const streakEl = document.getElementById("top-streak-count");
    if (streakEl) streakEl.textContent = `${st.profile.streak || 0}d`;
    const xpEl = document.getElementById("top-xp-count");
    if (xpEl) xpEl.textContent = `${lvl.xp} XP · ${lvl.name}`;
    const planEl = document.getElementById("top-active-plan");
    if (planEl && window.StudyPlan) {
      if (StudyPlan.mode() === "mock") {
        planEl.innerHTML = `<b>Active:</b> Mock phase · 100 questions · 120 minutes`;
      } else {
        const day = StudyPlan.firstIncomplete();
        const progress = StudyPlan.progress();
        planEl.innerHTML = `<b>Active:</b> Masterclass Day ${day.masterclassDay} · ${UI.esc(day.title)} · ${progress.pct}%`;
      }
    }
  }

  function navigate() {
    const { path, params } = parseHash();
    const name = routes[path] || "dashboard";
    if (name !== "masterclass") document.body.classList.remove("masterclass-focus");
    if (name !== "mock" && Views.mockAbort) Views.mockAbort();

    document.querySelectorAll(".rail-link[data-nav]").forEach(a => {
      a.classList.toggle("active", a.dataset.nav === (name === "dashboard" ? "dash" : name));
    });

    const view = document.getElementById("view");
    window.scrollTo(0, 0);
    if (typeof Views[name] === "function") {
      Views[name](view, params);
      view.focus({ preventScroll: true });
    }

    updateTopBar();

    // due badge on rail
    const badge = document.getElementById("rail-due-badge");
    if (badge) {
      const due = SRS.dueList().length;
      badge.hidden = due === 0;
      badge.textContent = due > 99 ? "99+" : due;
    }
  }

  window.addEventListener("hashchange", navigate);
  window.addEventListener("DOMContentLoaded", navigate);
  if (document.readyState !== "loading") navigate();
})();
