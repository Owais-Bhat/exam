/* dashboard.js — Home command center: Masterclass Hero, Readiness Gauge, 6-Section Mastery, and AI Coach quick bar */
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
      const delay = (i * 6) + "ms";
      bubbles += `<circle class="db"${willFill} style="transition-delay:${delay}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2"/>`;
    }
    // target tick at 95% of sweep (score 190)
    const tAng = (start + 0.95 * sweep) * Math.PI / 180;
    const x1 = cx + 78 * Math.cos(tAng), y1 = cy + 78 * Math.sin(tAng);
    const x2 = cx + 119 * Math.cos(tAng), y2 = cy + 119 * Math.sin(tAng);
    const xt = cx + 66 * Math.cos(tAng), yt = cy + 66 * Math.sin(tAng);
    return `<svg class="dial-svg" viewBox="0 0 250 250" role="img" aria-label="Predicted score ${score} of 200">
      <g id="dial-bubbles">${bubbles}</g>
      <line class="dial-target-line" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>
      <text class="dial-target-text" x="${xt.toFixed(1)}" y="${yt.toFixed(1)}" text-anchor="middle" dominant-baseline="middle">190</text>
      <text class="dial-center-num" x="125" y="118" text-anchor="middle">${score}</text>
      <text class="dial-center-sub" x="125" y="144" text-anchor="middle">PREDICTED / 200</text>
    </svg>`;
  }

  function quotaBubbles(done, quota) {
    const n = 13;
    const per = quota / n;
    let s = "";
    for (let i = 0; i < n; i++) s += `<span class="bubble${done >= (i + 1) * per ? " fill" : ""}"></span>`;
    return `<div class="bubble-row" aria-hidden="true">${s}</div>`;
  }

  function render(root) {
    const r = Gamify.readiness();
    const lvl = Gamify.level();
    const st = Store.state;
    const due = SRS.dueList().length;
    const doneToday = st.daily[Store.today()] || 0;
    const quota = 130;
    const planDay = StudyPlan.firstIncomplete();
    const planDrill = Store.state.masterclass?.completedDrills?.[`${planDay.id}_drill`];
    const isPlanDayDone = !!planDrill && planDrill.maxScore >= 40;
    const planProgress = StudyPlan.progress();
    const mockMode = StudyPlan.mode() === "mock";

    root.innerHTML = `
      ${mockMode ? `<div class="masterclass-hero-card" style="margin-bottom:18px;border-color:var(--key)">
        <div class="mh-glow"></div><div class="mh-content">
          <div class="mh-badge-row"><span class="chip chip-key">MOCK PHASE ACTIVE · FROM 11 NOVEMBER</span></div>
          <h2 class="mh-title">Daily exam simulation + error repair</h2>
          <p class="mh-desc">Take one 100-question mock in 120 minutes, spend 45 minutes analysing every wrong or skipped answer, then clear the due revision queue. Repeat with a sectional drill in your weakest subject.</p>
          <div class="mh-actions"><a class="btn btn-primary btn-glow" href="#/mock">Start Today's Full Mock</a><a class="btn btn-ghost" href="#/revise">Repair Wrong Answers</a><a class="btn btn-ghost" href="#/stats">Check Weak Sections</a></div>
        </div></div>` : ""}
      <!-- TOP ANNOUNCEMENT BANNER: ACTIVE MASTERCLASS -->
      <div class="masterclass-hero-card" style="margin-bottom:24px">
        <div class="mh-glow"></div>
        <div class="mh-content">
          <div class="mh-badge-row">
            <span class="chip chip-glow-amber">🚀 Masterclass Day ${planDay.masterclassDay} · ${planProgress.pct}% of sprint complete</span>
            <span class="chip chip-glow-cyan">🤖 Gemini + OpenAI Coach</span>
            ${isPlanDayDone ? `<span class="chip chip-key">✅ Drill Done (${planDrill.score}/${planDrill.maxScore})</span>` : '<span class="chip chip-amber">⚠️ Daily drill pending (20 Qs)</span>'}
          </div>
          <h2 class="mh-title">${UI.esc(planDay.title)}</h2>
          <p class="mh-desc">${UI.esc(planDay.focus)} · Four progressive levels, full worked explanations, examiner traps, and a 20-question daily test drill—matching your Day 13 format. Deadline: 10 November.</p>
          <div class="mh-actions">
            <a class="btn btn-primary btn-glow" href="#/masterclass?day=${planDay.day}&tab=study">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Open Masterclass Notes
            </a>
            <a class="btn ${isPlanDayDone ? 'btn-ghost' : 'btn-ink'}" href="#/masterclass?day=${planDay.day}&tab=drill">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              ${isPlanDayDone ? 'Review Drill Score' : 'Take 20-Question Drill'}
            </a>
            <a class="btn btn-ghost" href="#/ai-coach?prompt=${encodeURIComponent(`Teach me Masterclass Day ${planDay.masterclassDay}: ${planDay.title} with full Level 1 to Level 4 solved examples.`)}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Ask AI Coach
            </a>
          </div>
        </div>
      </div>

      <!-- QUICK ASK AI BAR -->
      <div class="card glass-card" style="margin-bottom:24px;padding:14px 18px">
        <form id="dash-quick-ask" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <span style="font-size:1.2rem">🤖</span>
          <input type="text" id="dash-ask-input" class="modern-input" placeholder="Ask your AI Coach anything about today's syllabus..." style="flex:1;min-width:240px">
          <button type="submit" class="btn btn-primary btn-glow btn-sm">Ask Coach</button>
        </form>
      </div>

      <!-- MAIN METRICS GRID -->
      <div class="grid grid-2" style="gap:20px">
        <!-- READINESS GAUGE -->
        <section class="card glass-card">
          <div class="card-header-flex">
            <div>
              <span class="eyebrow">Exam Readiness Index</span>
              <h3 style="margin:2px 0">200-Mark Score Predictor</h3>
            </div>
            <span class="chip ${r.score >= 190 ? 'chip-key' : 'chip-amber'}">${r.score >= 190 ? 'Target Hit (95%)' : 'Climbing'}</span>
          </div>

          <div class="dial-wrap" style="margin-top:10px">
            ${dialSVG(r.score)}
            <div class="dial-side">
              <p class="big" style="margin-bottom:12px">
                ${r.score >= 190 ? '<span style="color:var(--key)">Target Zone! Maintain consistency.</span>' : `<b class="num" style="color:var(--chinar);font-size:1.6rem">${190 - r.score}</b> marks to 95% target`}
              </p>
              <div class="sec-stat-list">
                ${["A","B","C","D","E","F"].map(sec => {
                  const p = r.per[sec], acc = p.acc;
                  const pct = acc === null ? 0 : Math.round(acc * 100);
                  const cls = acc === null ? "" : pct >= 85 ? "good" : pct < 60 ? "bad" : "";
                  return `
                    <div class="sec-row">
                      <span style="font-size:.85rem">${Engine.SEC_NAMES[sec]}</span>
                      <span class="sec-bar"><i class="${cls}" style="width:${pct}%"></i></span>
                      <span class="num">${acc === null ? "—" : pct + "%"}</span>
                    </div>
                  `;
                }).join("")}
              </div>
              <p style="font-size:.76rem;color:var(--muted);margin-top:10px">Accounts for 100 questions, +2 marks correct, -0.5 negative penalty.</p>
            </div>
          </div>
        </section>

        <!-- DRILL & PROGRESS TILES -->
        <div class="grid" style="grid-template-rows:auto auto 1fr;gap:20px">
          <!-- Daily Quota & Streak -->
          <section class="card glass-card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
              <div>
                <span class="eyebrow">Daily Target · 130 Questions</span>
                <span class="num" style="font-size:1.6rem;font-weight:750">${doneToday}<span style="color:var(--muted);font-size:.95rem"> / ${quota}</span></span>
              </div>
              <div class="streak-badge-container ${st.profile.streak > 0 ? "streak-active" : ""}">
                <span class="streak-icon">🔥</span>
                <div>
                  <div class="num" style="font-weight:750;font-size:1.2rem">${st.profile.streak}</div>
                  <div style="font-size:.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em">Day Streak</div>
                </div>
              </div>
            </div>
            <div style="margin-top:12px">${quotaBubbles(doneToday, quota)}</div>
            <div style="display:flex;gap:10px;margin-top:18px;flex-wrap:wrap">
              <a class="btn btn-primary btn-sm" href="#/practice">Start Practice</a>
              <a class="btn ${due ? "btn-ink" : "btn-ghost"} btn-sm" href="#/revise">Revise Due <span class="num">(${due})</span></a>
              <a class="btn btn-ghost btn-sm" href="#/mock">Full Mock (120m)</a>
            </div>
          </section>

          <!-- Rank & Level Progression -->
          <section class="card glass-card">
            <div style="display:flex;justify-content:space-between;align-items:baseline">
              <div>
                <span class="eyebrow">Officer Rank</span>
                <b style="font-size:1.15rem">${lvl.name}</b> <span class="chip chip-amber num">LVL ${lvl.n}</span>
              </div>
              <span class="num" style="color:var(--muted);font-size:.85rem">${lvl.xp} XP${lvl.next ? " / " + lvl.next : ""}</span>
            </div>
            <div class="sec-bar" style="margin-top:12px;height:8px"><i style="width:${lvl.next ? Math.round((lvl.xp - lvl.prev) / (lvl.next - lvl.prev) * 100) : 100}%;background:linear-gradient(90deg, var(--chinar), var(--gold))"></i></div>
          </section>

          <!-- Quick Syllabus Section Jump -->
          <section class="card glass-card">
            <span class="eyebrow">Syllabus Breakdown (6 Sections · 100 MCQs)</span>
            <div class="grid grid-3" style="gap:10px;margin-top:8px">
              <a href="#/practice?sec=A" class="dash-mini-card">
                <b>Reasoning</b>
                <span>40 Marks · 20 Qs</span>
              </a>
              <a href="#/practice?sec=B" class="dash-mini-card">
                <b>General Awareness</b>
                <span>40 Marks · 20 Qs</span>
              </a>
              <a href="#/practice?sec=C" class="dash-mini-card">
                <b>Quantitative</b>
                <span>30 Marks · 15 Qs</span>
              </a>
              <a href="#/practice?sec=D" class="dash-mini-card">
                <b>English</b>
                <span>30 Marks · 15 Qs</span>
              </a>
              <a href="#/practice?sec=E" class="dash-mini-card">
                <b>Math Abilities</b>
                <span>30 Marks · 15 Qs</span>
              </a>
              <a href="#/practice?sec=F" class="dash-mini-card">
                <b>Computer</b>
                <span>30 Marks · 15 Qs</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    `;

    // Cascade dial animation
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.querySelectorAll(".db[data-on]").forEach(b => {
        b.classList.add("on");
        if (b.dataset.on === "key") b.classList.add("zone-key");
      });
    }));

    // Quick ask form handler
    root.querySelector("#dash-quick-ask")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = root.querySelector("#dash-ask-input")?.value?.trim();
      if (val) {
        location.hash = `#/ai-coach?prompt=${encodeURIComponent(val)}`;
      }
    });
  }

  window.Views = window.Views || {};
  Views.dashboard = render;
})();
