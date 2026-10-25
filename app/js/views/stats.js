/* stats.js — progress, masterclass drills, weak areas, and analytics */
(function () {
  function render(root) {
    const st = Store.state;
    const total = Gamify.totalAnswered();
    const totalCorrect = Object.values(st.q).reduce((n, s) => n + s.c, 0);
    const acc = total ? Math.round(totalCorrect / total * 100) : 0;
    const lvl = Gamify.level();
    const mocks = st.mocks;
    const best = mocks.length ? Math.max(...mocks.map(m => m.score)) : null;

    const completedDrills = st.masterclass?.completedDrills || {};
    const drillKeys = Object.keys(completedDrills);

    const topicRows = Object.entries(st.topics)
      .filter(([, v]) => v.a >= 2)
      .map(([topic, v]) => {
        let sec = null, label = topic;
        for (const [s, t] of Object.entries(TAXONOMY)) if (t.topics[topic]) { sec = s; label = t.topics[topic]; break; }
        return { topic, sec, label, acc: v.c / v.a, a: v.a };
      })
      .sort((a, b) => a.acc - b.acc);

    const weakestTopics = topicRows.slice(0, 5).map(t => t.label).join(", ");

    root.innerHTML = `
      <div class="view-header">
        <div>
          <span class="eyebrow">Performance Intelligence</span>
          <h1 class="view-title">Progress & Exam Analytics</h1>
          <p class="view-subtitle">Accurate breakdown of lifetime attempts, masterclass drills, and weak areas.</p>
        </div>
        <div class="view-actions">
          <a class="btn btn-glow" href="#/ai-coach?prompt=${encodeURIComponent('Based on my practice, analyze how to improve my accuracy in my weakest topics (' + (weakestTopics || 'Quant & Reasoning') + ') under negative marking.')}">
            🤖 Ask Gemini Weakness Analysis
          </a>
        </div>
      </div>

      <div class="grid grid-3" style="margin:20px 0;gap:16px">
        <div class="tile glass-tile"><span class="t-num">${total}</span><span class="t-label">questions answered</span></div>
        <div class="tile glass-tile"><span class="t-num" style="color:${acc >= 85 ? "var(--key)" : acc < 60 ? "var(--neg)" : "var(--text)"}">${acc}%</span><span class="t-label">lifetime accuracy</span></div>
        <div class="tile glass-tile"><span class="t-num" style="color:var(--chinar)">${lvl.xp}</span><span class="t-label">XP · ${lvl.name}</span></div>
        <div class="tile glass-tile"><span class="t-num">${st.profile.bestStreak}</span><span class="t-label">best streak (days)</span></div>
        <div class="tile glass-tile"><span class="t-num">${drillKeys.length}</span><span class="t-label">masterclass drills passed</span></div>
        <div class="tile glass-tile"><span class="t-num" style="color:${best !== null && best >= 190 ? "var(--key)" : "var(--text)"}">${best === null ? "—" : best}</span><span class="t-label">best mock score (/200)</span></div>
      </div>

      <!-- MASTERCLASS DRILLS STATUS CARD -->
      <div class="card glass-card" style="margin-bottom:20px">
        <div class="card-header-flex">
          <div>
            <span class="eyebrow">Gemini Strategy Drills</span>
            <h3 style="margin:4px 0">Masterclass Drill Completions</h3>
          </div>
          <a href="#/masterclass?tab=drill" class="btn btn-sm btn-ghost">View All Drills</a>
        </div>
        <div style="margin-top:14px;display:flex;gap:12px;flex-wrap:wrap">
          ${(window.Masterclass?.getAllDrills ? Masterclass.getAllDrills() : []).map(d => {
            const cd = completedDrills[d.id];
            const max = d.questions.length * 2;
            return `
              <div class="drill-mini-badge ${cd ? 'badge-done' : ''}">
                <div class="dmb-title">Day ${d.day} Drill (${d.questions.length} Qs)</div>
                <div class="dmb-stat">
                  ${cd ? `<b>${cd.score} / ${max} Marks</b> · Passed` : 'Pending Attempt'}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      ${mocks.length ? `
      <div class="card glass-card" style="margin-bottom:20px">
        <span class="eyebrow">Mock trajectory — climb to 190 target</span>
        ${mockChart(mocks)}
      </div>` : ""}

      ${topicRows.length ? `
      <div class="card glass-card" style="margin-bottom:20px">
        <div class="card-header-flex">
          <div>
            <span class="eyebrow">Topic Accuracy — Weakest First</span>
            <h3 style="margin:4px 0">Target Drills for Lowest Accuracy</h3>
          </div>
        </div>
        <div style="margin-top:12px">
          ${topicRows.slice(0, 10).map(r => `
            <div class="sec-row">
              <span style="font-size:.85rem;min-width:200px">${r.label}</span>
              <span class="sec-bar"><i class="${r.acc >= .85 ? "good" : r.acc < .6 ? "bad" : ""}" style="width:${Math.round(r.acc * 100)}%"></i></span>
              <span class="num">${Math.round(r.acc * 100)}% <span style="opacity:.5">· ${r.a} attempts</span></span>
            </div>`).join("")}
        </div>
      </div>` : ""}

      <div class="card glass-card" style="margin-bottom:20px">
        <span class="eyebrow">Badges Unlocked · ${st.profile.badges.length}/${Gamify.BADGES.length}</span>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
          ${Gamify.BADGES.map(b => `
            <span class="chip ${st.profile.badges.includes(b.id) ? "chip-amber" : ""}" style="${st.profile.badges.includes(b.id) ? "" : "opacity:.38"}" title="${b.name}">
              ${b.icon} ${b.name}
            </span>`).join("")}
        </div>
      </div>

      <div class="card glass-card">
        <span class="eyebrow">Local Data & Subscription Storage</span>
        <p style="font-size:.85rem;color:var(--muted);margin-top:6px">All metrics, drill attempts, and history are saved locally in your browser. Total question bank: <b class="num">${window.BANK?.length || 2492}</b> questions.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
          <button class="btn btn-sm btn-ghost" id="export-data">Copy Backup JSON</button>
          <button class="btn btn-sm btn-ghost" id="reset-data" style="color:var(--neg)">Reset All Progress</button>
        </div>
      </div>
    `;

    root.querySelector("#export-data")?.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(Store.export()); UI.toast("Backup copied to clipboard"); }
      catch { UI.toast("Clipboard unavailable — see console"); console.log(Store.export()); }
    });
    root.querySelector("#reset-data")?.addEventListener("click", () => {
      if (confirm("Erase ALL progress, XP, streaks and mock history? This cannot be undone.")) {
        Store.reset(); location.hash = "#/"; location.reload();
      }
    });
  }

  function mockChart(mocks) {
    const last = mocks.slice(-12);
    const W = 560, H = 150, pad = 26;
    const xs = i => pad + i * ((W - pad * 2) / Math.max(1, last.length - 1));
    const ys = v => H - pad - (v / 200) * (H - pad * 2);
    const pts = last.map((m, i) => `${xs(i).toFixed(1)},${ys(m.score).toFixed(1)}`).join(" ");
    return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="Mock score trend">
      <line x1="${pad}" y1="${ys(190)}" x2="${W - pad}" y2="${ys(190)}" stroke="var(--key)" stroke-dasharray="5 5" stroke-width="1.4"/>
      <text x="${W - pad}" y="${ys(190) - 5}" text-anchor="end" fill="var(--key)" font-size="10" font-family="var(--font-mono)">target 190</text>
      <line x1="${pad}" y1="${ys(0)}" x2="${W - pad}" y2="${ys(0)}" stroke="var(--line)" stroke-width="1"/>
      <polyline points="${pts}" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round"/>
      ${last.map((m, i) => `<circle cx="${xs(i).toFixed(1)}" cy="${ys(m.score).toFixed(1)}" r="3.5" fill="var(--ink)"/>`).join("")}
    </svg>`;
  }

  window.Views = window.Views || {};
  Views.stats = render;
})();
