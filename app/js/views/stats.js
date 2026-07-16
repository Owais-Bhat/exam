/* stats.js — progress, badges, mock history, data controls */
(function () {
  function render(root) {
    const st = Store.state;
    const total = Gamify.totalAnswered();
    const totalCorrect = Object.values(st.q).reduce((n, s) => n + s.c, 0);
    const acc = total ? Math.round(totalCorrect / total * 100) : 0;
    const lvl = Gamify.level();
    const mocks = st.mocks;
    const best = mocks.length ? Math.max(...mocks.map(m => m.score)) : null;

    const topicRows = Object.entries(st.topics)
      .filter(([, v]) => v.a >= 3)
      .map(([topic, v]) => {
        let sec = null, label = topic;
        for (const [s, t] of Object.entries(TAXONOMY)) if (t.topics[topic]) { sec = s; label = t.topics[topic]; break; }
        return { topic, sec, label, acc: v.c / v.a, a: v.a };
      })
      .sort((a, b) => a.acc - b.acc);

    root.innerHTML = `
      <span class="eyebrow">Progress</span>
      <h1>The numbers don't lie.</h1>

      <div class="grid grid-3" style="margin:16px 0">
        <div class="tile"><span class="t-num">${total}</span><span class="t-label">questions answered</span></div>
        <div class="tile"><span class="t-num" style="color:${acc >= 85 ? "var(--key)" : acc < 60 ? "var(--neg)" : "var(--text)"}">${acc}%</span><span class="t-label">lifetime accuracy</span></div>
        <div class="tile"><span class="t-num" style="color:var(--chinar)">${lvl.xp}</span><span class="t-label">XP · ${lvl.name}</span></div>
        <div class="tile"><span class="t-num">${st.profile.bestStreak}</span><span class="t-label">best streak</span></div>
        <div class="tile"><span class="t-num">${mocks.length}</span><span class="t-label">mocks taken</span></div>
        <div class="tile"><span class="t-num" style="color:${best !== null && best >= 190 ? "var(--key)" : "var(--text)"}">${best === null ? "—" : best}</span><span class="t-label">best mock score</span></div>
      </div>

      ${mocks.length ? `
      <div class="card">
        <span class="eyebrow">Mock trajectory — climb to the 190 line</span>
        ${mockChart(mocks)}
      </div>` : ""}

      ${topicRows.length ? `
      <div class="card" style="margin-top:16px">
        <span class="eyebrow">Topic accuracy — weakest first</span>
        ${topicRows.slice(0, 14).map(r => `
          <div class="sec-row">
            <span style="font-size:.84rem">${r.label}</span>
            <span class="sec-bar"><i class="${r.acc >= .85 ? "good" : r.acc < .6 ? "bad" : ""}" style="width:${Math.round(r.acc * 100)}%"></i></span>
            <span class="num">${Math.round(r.acc * 100)}% <span style="opacity:.5">·${r.a}</span></span>
          </div>`).join("")}
      </div>` : ""}

      <div class="card" style="margin-top:16px">
        <span class="eyebrow">Badges · ${st.profile.badges.length}/${Gamify.BADGES.length}</span>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px">
          ${Gamify.BADGES.map(b => `
            <span class="chip ${st.profile.badges.includes(b.id) ? "chip-amber" : ""}" style="${st.profile.badges.includes(b.id) ? "" : "opacity:.38"}" title="${b.name}">
              ${b.icon} ${b.name}
            </span>`).join("")}
        </div>
      </div>

      ${st.reported.length ? `
      <div class="card" style="margin-top:16px">
        <span class="eyebrow">Reported questions (excluded)</span>
        <p class="num" style="font-size:.8rem;color:var(--muted)">${st.reported.join(", ")}</p>
        <button class="btn btn-sm" id="unreport">Restore all</button>
      </div>` : ""}

      <div class="card" style="margin-top:16px">
        <span class="eyebrow">Data</span>
        <p style="font-size:.85rem;color:var(--muted)">Everything is stored locally in this browser. Bank size: <b class="num">${window.BANK.length}</b> questions.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-sm" id="export-data">Copy backup to clipboard</button>
          <button class="btn btn-sm" id="reset-data" style="color:var(--neg)">Reset all progress</button>
        </div>
      </div>
    `;

    const un = root.querySelector("#unreport");
    if (un) un.addEventListener("click", () => { st.reported = []; Store.save(); render(root); });
    root.querySelector("#export-data").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(Store.export()); UI.toast("Backup copied to clipboard"); }
      catch { UI.toast("Clipboard unavailable — see console"); console.log(Store.export()); }
    });
    root.querySelector("#reset-data").addEventListener("click", () => {
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
      ${last.length > 1 ? `<polyline points="${pts}" fill="none" stroke="var(--chinar)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>` : ""}
      ${last.map((m, i) => `<circle cx="${xs(i)}" cy="${ys(m.score)}" r="4" fill="${m.score >= 190 ? "var(--key)" : "var(--chinar)"}"/>
        <text x="${xs(i)}" y="${ys(m.score) - 9}" text-anchor="middle" fill="var(--muted)" font-size="9.5" font-family="var(--font-mono)">${m.score}</text>`).join("")}
    </svg>`;
  }

  window.Views = window.Views || {};
  Views.stats = render;
})();
