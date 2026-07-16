/* practice.js — topic picker + shared quiz runner (also used by revise) */
(function () {

  /* ---------- shared quiz runner ----------
     opts: { questions, mode: 'practice'|'revise', title, onDone } */
  function quizRunner(root, opts) {
    const qs = opts.questions;
    let i = 0, correctN = 0, xpEarned = 0;
    const wrongQs = [];

    function progressBubbles() {
      let s = "";
      for (let k = 0; k < qs.length; k++) {
        const cls = k < i ? " fill" : "";
        s += `<span class="bubble${cls}"></span>`;
      }
      return `<div class="bubble-row">${s}</div>`;
    }

    function renderQ() {
      const q = qs[i];
      const secName = Engine.SEC_NAMES[q.sec];
      const topicName = (TAXONOMY[q.sec].topics[q.topic]) || q.topic;
      root.innerHTML = `
        <div class="quiz-top">
          <div>
            <span class="eyebrow">${opts.title}</span>
            <span class="num" style="font-size:.85rem;color:var(--muted)">${i + 1} / ${qs.length}</span>
          </div>
          <div class="quiz-progress">${progressBubbles()}</div>
          <a class="btn btn-sm btn-ghost" href="${opts.exitHref || (opts.mode === "revise" ? "#/revise" : "#/practice")}">Exit</a>
        </div>
        <div class="card">
          <div class="q-meta">
            <span class="chip chip-ink">${secName}</span>
            <span class="chip">${topicName}</span>
            <span class="chip num">${q.id}</span>
            <span class="chip">${"●".repeat(q.diff)}${"○".repeat(3 - q.diff)}</span>
            ${q.real ? '<span class="chip chip-amber">★ Asked in JKSSB 2022</span>' : ""}
          </div>
          <p class="q-stem">${UI.esc(q.q)}</p>
          <div id="opts">
            ${q.opts.map((o, k) => `
              <button class="opt" data-k="${k}">
                <span class="opt-bubble">${"ABCD"[k]}</span>
                <span>${UI.esc(o)}</span>
              </button>`).join("")}
          </div>
          <div id="explain-slot"></div>
          <div id="next-slot" style="margin-top:16px;display:flex;justify-content:space-between;align-items:center"></div>
        </div>
      `;
      root.querySelectorAll(".opt").forEach(btn => {
        btn.addEventListener("click", () => answer(parseInt(btn.dataset.k, 10)));
      });
    }

    function answer(k) {
      const q = qs[i];
      const correct = k === q.ans;
      if (correct) correctN++; else wrongQs.push(q);

      Store.recordAnswer(q, correct);
      SRS.onResult(q, correct);
      const xp = Gamify.award(correct, opts.mode);
      xpEarned += xp;

      const optBtns = root.querySelectorAll(".opt");
      optBtns.forEach(b => { b.disabled = true; });
      const chosen = optBtns[k], right = optBtns[q.ans];
      right.classList.add("correct");
      if (!correct) {
        chosen.classList.add("wrong");
        chosen.insertAdjacentHTML("beforeend", `<span class="neg-float">−0.5</span>`);
      } else {
        chosen.insertAdjacentHTML("beforeend", `<span class="plus-float">+${xp} XP</span>`);
      }

      const lesson = (window.LESSONS || []).find(l => l.sec === q.sec && l.drill === q.topic);
      root.querySelector("#explain-slot").innerHTML =
        `<div class="explain"><b>${correct ? "Correct." : "Answer: " + "ABCD"[q.ans] + "."}</b> ${UI.esc(q.exp)}
        ${lesson ? `<div style="margin-top:8px"><a class="btn btn-sm" href="#/lessons?id=${lesson.id}">📺 Watch: ${lesson.title}</a></div>` : ""}</div>`;

      root.querySelector("#next-slot").innerHTML = `
        <button class="btn btn-sm btn-ghost" id="report-q" title="Flag a bad question — it will be excluded">Report question</button>
        <button class="btn btn-primary" id="next-q">${i + 1 < qs.length ? "Next question" : "Finish"}</button>
      `;
      root.querySelector("#next-q").addEventListener("click", next);
      root.querySelector("#report-q").addEventListener("click", () => {
        if (!Store.state.reported.includes(q.id)) {
          Store.state.reported.push(q.id); Store.save();
          UI.toast("Question " + q.id + " reported & excluded");
        }
        next();
      });
      root.querySelector("#next-q").focus();

      const fresh = Gamify.checkBadges();
      if (fresh.length) UI.badgePop(fresh[0]);
    }

    function next() {
      i++;
      if (i < qs.length) renderQ();
      else finish();
    }

    function finish() {
      const acc = qs.length ? Math.round(correctN / qs.length * 100) : 0;
      root.innerHTML = `
        <div class="card" style="text-align:center;max-width:560px;margin:40px auto">
          <span class="eyebrow">${opts.title} · complete</span>
          <div class="verdict-score">${acc}<small>%</small></div>
          <p style="color:var(--muted)"><span class="num">${correctN}/${qs.length}</span> correct · <span class="num" style="color:var(--chinar)">+${xpEarned} XP</span></p>
          ${wrongQs.length ? `<p style="font-size:.86rem">${wrongQs.length} wrong answer${wrongQs.length > 1 ? "s" : ""} added to your revision queue — they'll return tomorrow.</p>` : `<p style="font-size:.86rem;color:var(--key)">Clean sheet. Nothing enters the revision queue.</p>`}
          <div style="display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap">
            ${opts.againLabel ? `<button class="btn btn-primary" id="again">${opts.againLabel}</button>` : ""}
            <a class="btn" href="#/">Dashboard</a>
          </div>
        </div>
      `;
      const again = root.querySelector("#again");
      if (again && opts.onAgain) again.addEventListener("click", opts.onAgain);
      if (opts.onDone) opts.onDone();
    }

    renderQ();
  }

  /* ---------- practice picker ---------- */
  function render(root, params) {
    if (params.real === "1" && params.go) {
      const n = parseInt(params.n, 10) || 20;
      const set = Engine.practiceSet({ sec: params.sec || null, n, realOnly: true });
      if (!set.length) { root.innerHTML = `<div class="card">No real-exam questions tagged in this scope.</div>`; return; }
      quizRunner(root, {
        questions: set, mode: "practice",
        title: "Real exam questions · JKSSB 2022",
        againLabel: "Another round",
        onAgain: () => render(root, params)
      });
      return;
    }

    if (params.sec && params.go) {
      const n = parseInt(params.n, 10) || 10;
      const set = Engine.practiceSet({ sec: params.sec, topic: params.topic || null, n, realOnly: params.real === "1" });
      if (!set.length) { root.innerHTML = `<div class="card">No questions available here yet.</div>`; return; }
      quizRunner(root, {
        questions: set, mode: "practice",
        title: "Practice · " + Engine.SEC_NAMES[params.sec],
        againLabel: "Another round",
        onAgain: () => render(root, params)
      });
      return;
    }

    const sec = params.sec || "A";
    const t = TAXONOMY[sec];
    const topics = Engine.topicsOf(sec);
    const weak = SRS.weakTopics(3).map(w => w.topic);

    const realN = Engine.realCount();
    root.innerHTML = `
      <span class="eyebrow">Practice</span>
      <h1>Pick your battlefield</h1>
      ${realN ? `
      <div class="card" style="border-color:var(--chinar);margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
          <div>
            <span class="eyebrow">★ Verified from the real JKSSB 2022 SI paper</span>
            <p style="margin:0">These ${realN} questions are pulled directly (or near-verbatim) from the actual exam — highest-priority drilling.</p>
          </div>
          <a class="btn btn-primary" href="#/practice?real=1&go=1&n=${realN}">Drill all ${realN}</a>
        </div>
      </div>` : ""}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 20px">
        ${Object.keys(TAXONOMY).map(s => `
          <a href="#/practice?sec=${s}" class="btn btn-sm ${s === sec ? "btn-primary" : ""}">
            ${Engine.SEC_NAMES[s]} <span class="num" style="opacity:.7">${TAXONOMY[s].marks}M</span>
          </a>`).join("")}
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px">
          <h2 style="margin:0">${t.name}</h2>
          <span class="chip">${t.q} questions · ${t.marks} marks · ${t.level} level</span>
        </div>
        <div style="display:flex;gap:10px;margin:16px 0;flex-wrap:wrap">
          <a class="btn btn-primary" href="#/practice?sec=${sec}&go=1&n=10">Quick 10</a>
          <a class="btn" href="#/practice?sec=${sec}&go=1&n=25">Set of 25</a>
          <a class="btn" href="#/practice?sec=${sec}&go=1&n=50">Marathon 50</a>
        </div>
        <span class="eyebrow" style="margin-top:10px">Or drill one topic</span>
        ${topics.map(({ topic, n }) => {
          const tp = Store.state.topics[topic];
          const acc = tp && tp.a >= 3 ? Math.round(tp.c / tp.a * 100) : null;
          const isWeak = weak.includes(topic);
          return `<div class="list-row">
            <span>${t.topics[topic] || topic} ${isWeak ? '<span class="chip chip-neg">weak</span>' : ""}</span>
            <span style="display:flex;gap:10px;align-items:center">
              <span class="num" style="color:var(--muted);font-size:.78rem">${acc === null ? n + " Q" : acc + "%"}</span>
              <a class="btn btn-sm" href="#/practice?sec=${sec}&topic=${topic}&go=1&n=10">Drill</a>
            </span>
          </div>`;
        }).join("")}
      </div>
    `;
  }

  window.Views = window.Views || {};
  Views.practice = render;
  Views.quizRunner = quizRunner;
})();
