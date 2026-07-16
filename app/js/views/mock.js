/* mock.js — full 100Q / 120min exam simulator with OMR palette */
(function () {
  let live = null; // {qs, answers[], marked[], i, endAt, timerId}

  function render(root, params) {
    if (live) return renderRunner(root);
    root.innerHTML = `
      <span class="eyebrow">Mock examination</span>
      <h1>Exam conditions. No mercy.</h1>
      <div class="card" style="max-width:640px">
        <div class="list-row"><span>Questions</span><b class="num">100</b></div>
        <div class="list-row"><span>Duration</span><b class="num">120 min</b></div>
        <div class="list-row"><span>Correct answer</span><b class="num" style="color:var(--key)">+2.0</b></div>
        <div class="list-row"><span>Wrong answer</span><b class="num" style="color:var(--neg)">−0.5</b></div>
        <div class="list-row"><span>Skipped</span><b class="num">0</b></div>
        <div class="list-row"><span>Sections</span><span class="num" style="font-size:.8rem">A·20 B·20 C·15 D·15 E·15 F·15</span></div>
        <p style="margin-top:14px;font-size:.88rem;color:var(--muted)">Your target is <b class="num" style="color:var(--key)">190/200</b> — that allows at most 4 wrong answers if you attempt everything. When unsure, remember: a skip costs 2 marks at most, a wrong guess costs 2.5.</p>
        <button class="btn btn-primary" id="start-mock" style="margin-top:6px">Begin mock</button>
      </div>
      ${Store.state.mocks.length ? `
      <div class="card" style="max-width:640px;margin-top:16px">
        <span class="eyebrow">Previous mocks</span>
        ${Store.state.mocks.slice(-8).reverse().map(m => `
          <div class="list-row">
            <span class="num" style="font-size:.8rem;color:var(--muted)">${m.date}</span>
            <b class="num" style="color:${m.score >= 190 ? "var(--key)" : m.score >= 160 ? "var(--chinar)" : "var(--text)"}">${m.score}</b>
          </div>`).join("")}
      </div>` : ""}
    `;
    root.querySelector("#start-mock").addEventListener("click", () => {
      const qs = Engine.mockSet();
      if (qs.length < 30) { UI.toast("Not enough questions in the bank yet"); return; }
      live = {
        qs, answers: new Array(qs.length).fill(null),
        marked: new Array(qs.length).fill(false),
        i: 0, endAt: Date.now() + 120 * 60000, timerId: null
      };
      Engine.markSeenInMock(qs);
      renderRunner(root);
    });
  }

  function fmtTime(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }

  function renderRunner(root) {
    const L = live;
    const q = L.qs[L.i];
    root.innerHTML = `
      <div class="mock-layout">
        <div>
          <div class="quiz-top">
            <div>
              <span class="eyebrow">Section ${q.sec} · ${Engine.SEC_NAMES[q.sec]}</span>
              <span class="num" style="font-size:.9rem">Q ${L.i + 1} / ${L.qs.length}</span>
            </div>
            <div class="mock-timer num" id="mock-timer">--:--:--</div>
          </div>
          <div class="card">
            <p class="q-stem">${UI.esc(q.q)}</p>
            <div id="opts">
              ${q.opts.map((o, k) => `
                <button class="opt${L.answers[L.i] === k ? " sel" : ""}" data-k="${k}">
                  <span class="opt-bubble">${"ABCD"[k]}</span><span>${UI.esc(o)}</span>
                </button>`).join("")}
            </div>
            <div style="display:flex;gap:9px;margin-top:14px;flex-wrap:wrap">
              <button class="btn btn-sm" id="clear-a">Clear choice</button>
              <button class="btn btn-sm ${L.marked[L.i] ? "btn-ink" : ""}" id="mark-a">${L.marked[L.i] ? "Unmark" : "Mark for review"}</button>
              <span style="flex:1"></span>
              <button class="btn btn-sm" id="prev-q" ${L.i === 0 ? "disabled" : ""}>Prev</button>
              <button class="btn btn-sm btn-primary" id="next-q">${L.i === L.qs.length - 1 ? "Last question" : "Save & next"}</button>
            </div>
          </div>
        </div>
        <aside class="omr-panel card">
          <span class="eyebrow">OMR palette</span>
          <div style="display:flex;gap:12px;font-size:.7rem;color:var(--muted);flex-wrap:wrap">
            <span><i class="bubble fill-key" style="display:inline-block"></i> done</span>
            <span><i class="bubble" style="display:inline-block;border-color:var(--chinar)"></i> marked</span>
          </div>
          <div class="omr-grid">
            ${L.qs.map((_, k) => `
              <button class="omr-cell num${L.answers[k] !== null ? " answered" : ""}${L.marked[k] ? " marked" : ""}${k === L.i ? " current" : ""}" data-j="${k}">${k + 1}</button>`).join("")}
          </div>
          <button class="btn btn-primary" id="submit-mock" style="width:100%;margin-top:14px">Submit paper</button>
        </aside>
      </div>
    `;

    root.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => {
      L.answers[L.i] = parseInt(b.dataset.k, 10);
      renderRunner(root);
    }));
    root.querySelector("#clear-a").addEventListener("click", () => { L.answers[L.i] = null; renderRunner(root); });
    root.querySelector("#mark-a").addEventListener("click", () => { L.marked[L.i] = !L.marked[L.i]; renderRunner(root); });
    root.querySelector("#prev-q").addEventListener("click", () => { if (L.i > 0) { L.i--; renderRunner(root); } });
    root.querySelector("#next-q").addEventListener("click", () => { if (L.i < L.qs.length - 1) { L.i++; renderRunner(root); } });
    root.querySelectorAll(".omr-cell").forEach(c => c.addEventListener("click", () => { L.i = parseInt(c.dataset.j, 10); renderRunner(root); }));
    root.querySelector("#submit-mock").addEventListener("click", () => confirmSubmit(root));

    tickTimer(root);
  }

  function tickTimer(root) {
    const L = live;
    if (!L) return;
    clearInterval(L.timerId);
    L.timerId = setInterval(() => {
      const el = document.getElementById("mock-timer");
      if (!el || !live) { clearInterval(L.timerId); return; }
      const left = L.endAt - Date.now();
      el.textContent = fmtTime(left);
      if (left < 10 * 60000) el.classList.add("low");
      if (left <= 0) { clearInterval(L.timerId); finish(root, true); }
    }, 500);
    const el = document.getElementById("mock-timer");
    if (el) el.textContent = fmtTime(L.endAt - Date.now());
  }

  function confirmSubmit(root) {
    const L = live;
    const unanswered = L.answers.filter(a => a === null).length;
    if (!confirm(`Submit paper? ${unanswered} question${unanswered === 1 ? "" : "s"} unanswered.`)) return;
    finish(root, false);
  }

  function finish(root, timedOut) {
    const L = live;
    clearInterval(L.timerId);
    const res = Engine.scoreMock(L.qs, L.answers);
    const timeUsed = Math.min(120, Math.round((Date.now() - (L.endAt - 120 * 60000)) / 60000));

    // record into stats + SRS
    L.qs.forEach((q, i) => {
      if (L.answers[i] !== null) {
        const c = L.answers[i] === q.ans;
        Store.recordAnswer(q, c);
        SRS.onResult(q, c);
        Gamify.award(c, "mock");
      }
    });
    Store.state.mocks.push({ date: Store.today(), score: res.score, max: 200, secStats: res.secStats, timeUsed });
    Store.save();
    const fresh = Gamify.checkBadges();
    if (fresh.length) UI.badgePop(fresh[0]);

    const verdictColor = res.score >= 190 ? "var(--key)" : res.score >= 160 ? "var(--chinar)" : "var(--neg)";
    const verdictText = res.score >= 190 ? "Target achieved. This is exam-day form."
      : res.score >= 160 ? "Strong — now close the accuracy gap. Every wrong answer costs 2.5 swing."
      : "Below the line. Check the section table: drill the red rows before the next mock.";

    root.innerHTML = `
      <span class="eyebrow">${timedOut ? "Time expired — auto-submitted" : "Paper submitted"}</span>
      <h1>Result</h1>
      <div class="grid grid-2">
        <div class="card" style="text-align:center">
          <div class="verdict-score" style="color:${verdictColor}">${res.score}<small> / 200</small></div>
          <p style="margin-top:6px"><span class="chip chip-key num">✓ ${res.correct}</span> <span class="chip chip-neg num">✗ ${res.wrong} (−${(res.wrong * 0.5).toFixed(1)})</span> <span class="chip num">skip ${res.skipped}</span></p>
          <p style="font-size:.9rem;color:var(--muted)">${verdictText}</p>
          <p class="num" style="font-size:.8rem;color:var(--muted)">time used: ${timeUsed} min</p>
        </div>
        <div class="card">
          <span class="eyebrow">Section analysis</span>
          ${Object.entries(res.secStats).map(([sec, s]) => {
            const total = Engine.SEC_Q[sec];
            const pct = Math.round(s.c / total * 100);
            return `<div class="sec-row">
              <span>${Engine.SEC_NAMES[sec]}</span>
              <span class="sec-bar"><i class="${pct >= 85 ? "good" : pct < 60 ? "bad" : ""}" style="width:${pct}%"></i></span>
              <span class="num">${s.marks.toFixed(1)}/${total * 2}</span>
            </div>`;
          }).join("")}
          <div style="display:flex;gap:10px;margin-top:14px">
            <button class="btn btn-primary" id="review-btn">Review answers</button>
            <a class="btn" href="#/">Dashboard</a>
          </div>
        </div>
      </div>
      <div id="review-holder"></div>
    `;
    root.querySelector("#review-btn").addEventListener("click", () => {
      const holder = root.querySelector("#review-holder");
      holder.innerHTML = `<div class="card" style="margin-top:16px">
        <span class="eyebrow">Full review — wrong & skipped first</span>
        ${L.qs.map((q, i) => ({ q, i, given: L.answers[i] }))
          .sort((a, b) => {
            const rank = x => x.given === null ? 1 : (x.given === x.q.ans ? 2 : 0);
            return rank(a) - rank(b);
          })
          .map(({ q, i, given }) => {
            const ok = given === q.ans;
            const state = given === null ? `<span class="chip num">skipped</span>`
              : ok ? `<span class="chip chip-key num">+2</span>`
              : `<span class="chip chip-neg num">−0.5</span>`;
            return `<div class="review-q">
              <div class="rq-head"><span class="num" style="color:var(--muted)">Q${i + 1} · ${q.id}</span> ${state} ${q.real ? '<span class="chip chip-amber">★ Asked in JKSSB 2022</span>' : ""}</div>
              <p style="margin:6px 0 4px;font-weight:550">${UI.esc(q.q)}</p>
              <p style="font-size:.86rem;margin:0">
                ${given !== null && !ok ? `<span style="color:var(--neg)">You: ${"ABCD"[given]}. ${UI.esc(q.opts[given])}</span><br>` : ""}
                <span style="color:var(--key)">Answer: ${"ABCD"[q.ans]}. ${UI.esc(q.opts[q.ans])}</span>
              </p>
              <p style="font-size:.85rem;color:var(--muted);margin:5px 0 0">${UI.esc(q.exp)}</p>
            </div>`;
          }).join("")}
      </div>`;
      root.querySelector("#review-btn").remove();
    });

    live = null;
  }

  window.Views = window.Views || {};
  Views.mock = render;
  Views.mockAbort = function () { if (live) { clearInterval(live.timerId); live = null; } };
})();
