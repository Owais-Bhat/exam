/* dashboard.js — home: readiness dial (signature), quota, streak, sections */
(function () {

  function dialSVG(score) {
    const filled = Math.max(0, Math.min(100, Math.round(score / 2)));
    const hitTarget = score >= 190;
    const cx = 125, cy = 125;
    const start = 135, sweep = 270, steps = 50;
    let bubbles = "";
    for (let i = 0; i < 100; i++) {
      const step = Math.floor(i / 2), ring = i % 2;
      const ang = (start + step * (sweep / (steps - 1))) * Math.PI / 180;
      const R = ring === 0 ? 91 : 106;
      const x = cx + R * Math.cos(ang), y = cy + R * Math.sin(ang);
      const willFill = i < filled ? ` data-on="${hitTarget ? "key" : "1"}"` : "";
      const delay = (i * 8) + "ms";
      bubbles += `<circle class="db"${willFill} style="transition-delay:${delay}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.1"/>`;
    }
    // target tick at 95% of sweep (score 190)
    const tAng = (start + 0.95 * sweep) * Math.PI / 180;
    const x1 = cx + 78 * Math.cos(tAng), y1 = cy + 78 * Math.sin(tAng);
    const x2 = cx + 119 * Math.cos(tAng), y2 = cy + 119 * Math.sin(tAng);
    const xt = cx + 68 * Math.cos(tAng), yt = cy + 68 * Math.sin(tAng);
    return `<svg class="dial-svg" viewBox="0 0 250 250" role="img" aria-label="Predicted score ${score} of 200">
      <g id="dial-bubbles">${bubbles}</g>
      <line class="dial-target-line" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>
      <text class="dial-target-text" x="${xt.toFixed(1)}" y="${yt.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">190</text>
      <text class="dial-center-num" x="125" y="122" text-anchor="middle">${score}</text>
      <text class="dial-center-sub" x="125" y="146" text-anchor="middle">PREDICTED / 200</text>
    </svg>`;
  }

  function quotaBubbles(done, quota) {
    const n = 13; // 13 bubbles ≈ 10 questions each
    const per = quota / n;
    let s = "";
    for (let i = 0; i < n; i++) s += `<span class="bubble${done >= (i + 1) * per ? " fill" : ""}"></span>`;
    return `<div class="bubble-row" aria-hidden="true">${s}</div>`;
  }

  function weekOf() {
    const s = Store.state.startDate;
    if (!s) return 1;
    const days = Math.floor((Date.now() - new Date(s + "T00:00:00").getTime()) / 86400000);
    return Math.min(8, Math.floor(days / 7) + 1);
  }

  const PLAN = [
    ["W1", "Learn: lessons for Quant + Math basics · 80 practice Q/day, focus C & E (10th-level, easiest 60 marks)"],
    ["W2", "Learn: Reasoning tricks + Computer · 100 Q/day · first mock on the weekend"],
    ["W3", "Learn: English grammar + GA (history, polity, J&K) · 120 Q/day · clear all due revisions daily"],
    ["W4", "Drill: weak topics from stats · 130 Q/day · mock every 4 days"],
    ["W5", "Drill: GA current affairs + J&K special · 140 Q/day · mock every 3 days"],
    ["W6", "Drill: accuracy — stop guessing, skip unsure · 140 Q/day · mock every 3 days"],
    ["W7", "Mock week: mock every 2 days, deep review of every error, revision queue to zero"],
    ["W8", "Taper: daily revision deck + 1 mock every 2 days · top-up current affairs manually"]
  ];

  function render(root) {
    const r = Gamify.readiness();
    const lvl = Gamify.level();
    const st = Store.state;
    const due = SRS.dueList().length;
    const doneToday = st.daily[Store.today()] || 0;
    const quota = 130;
    const wk = weekOf();
    const answeredAll = Gamify.totalAnswered();

    root.innerHTML = `
      <span class="eyebrow">JKSSB Sub-Inspector · J&K Police · Home Department</span>
      <h1>${answeredAll === 0 ? "Report for duty." : "Back on duty."}</h1>

      <div class="grid grid-2" style="margin-top:18px">
        <section class="card">
          <span class="eyebrow">Readiness — each bubble is one exam question</span>
          <div class="dial-wrap">
            ${dialSVG(r.score)}
            <div class="dial-side">
              <p class="big" style="margin-bottom:10px">${r.score >= 190 ? "Target zone. Hold accuracy." : `<b class="num">${190 - r.score}</b> marks to target`}</p>
              ${["A","B","C","D","E","F"].map(sec => {
                const p = r.per[sec], acc = p.acc;
                const pct = acc === null ? 0 : Math.round(acc * 100);
                const cls = acc === null ? "" : pct >= 85 ? "good" : pct < 60 ? "bad" : "";
                return `<div class="sec-row">
                  <span>${Engine.SEC_NAMES[sec]}</span>
                  <span class="sec-bar"><i class="${cls}" style="width:${pct}%"></i></span>
                  <span class="num">${acc === null ? "—" : pct + "%"}</span>
                </div>`;
              }).join("")}
              <p style="font-size:.78rem;color:var(--muted);margin-top:8px">Prediction assumes you attempt all 100 with −0.5 negative marking.</p>
            </div>
          </div>
        </section>

        <div class="grid" style="grid-template-rows:auto auto 1fr">
          <section class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <div>
                <span class="eyebrow">Today's drill · ${quota} questions</span>
                <span class="num" style="font-size:1.5rem;font-weight:700">${doneToday}<span style="color:var(--muted);font-size:.95rem"> / ${quota}</span></span>
              </div>
              <div class="${st.profile.streak > 0 ? "streak-on" : ""}" style="text-align:center" title="Daily streak">
                <svg class="streak-leaf" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C9 7 5 9 5 14a7 7 0 0 0 14 0c0-5-4-7-7-12zm0 18a4 4 0 0 1-4-4c0-2.5 1.8-3.8 4-6.5 2.2 2.7 4 4 4 6.5a4 4 0 0 1-4 4z"/></svg>
                <div class="num" style="font-weight:700">${st.profile.streak}<span style="font-size:.7rem;color:var(--muted)"> day${st.profile.streak === 1 ? "" : "s"}</span></div>
              </div>
            </div>
            <div style="margin-top:10px">${quotaBubbles(doneToday, quota)}</div>
            <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
              <a class="btn btn-primary" href="#/practice">Start practice</a>
              <a class="btn ${due ? "btn-ink" : ""}" href="#/revise">Revise due <span class="num">(${due})</span></a>
              <a class="btn" href="#/mock">Full mock</a>
            </div>
          </section>

          <section class="card">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
              <div><span class="eyebrow">Rank</span><b>${lvl.name}</b> <span class="chip chip-amber num">LVL ${lvl.n}</span></div>
              <span class="num" style="color:var(--muted);font-size:.8rem">${lvl.xp} XP${lvl.next ? " / " + lvl.next : ""}</span>
            </div>
            <div class="sec-bar" style="margin-top:10px"><i style="width:${lvl.next ? Math.round((lvl.xp - lvl.prev) / (lvl.next - lvl.prev) * 100) : 100}%;background:var(--chinar)"></i></div>
          </section>

          <section class="card">
            <span class="eyebrow">Plan · week ${wk} of 8</span>
            ${PLAN.map((w, i) => `<div class="plan-week${i + 1 === wk ? " now" : ""}"><span class="w-tag">${w[0]}</span><span>${w[1]}</span></div>`).join("")}
          </section>
        </div>
      </div>
    `;

    // cascade the dial fill after paint
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.querySelectorAll(".db[data-on]").forEach(b => {
        b.classList.add("on");
        if (b.dataset.on === "key") b.classList.add("zone-key");
      });
    }));
  }

  window.Views = window.Views || {};
  Views.dashboard = render;
})();
