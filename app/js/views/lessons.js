/* lessons.js — animated lesson player */
(function () {
  function render(root, params) {
    if (params.id) return renderPlayer(root, params.id);

    const done = Store.state.lessonsDone || [];
    const bySec = {};
    for (const l of window.LESSONS) (bySec[l.sec] = bySec[l.sec] || []).push(l);

    root.innerHTML = `
      <span class="eyebrow">Lessons</span>
      <h1>Watch the trick, then own it.</h1>
      ${window.LESSONS.length === 0 ? `<div class="card">Lessons are being prepared.</div>` :
        Object.entries(bySec).map(([sec, ls]) => `
        <div class="card" style="margin-top:14px">
          <span class="eyebrow">Section ${sec} · ${Engine.SEC_NAMES[sec]}</span>
          ${ls.map(l => `
            <div class="list-row">
              <span>${done.includes(l.id) ? "✅ " : ""}${l.title} ${l.real ? '<span class="chip chip-amber">★ 2022 paper</span>' : ""} <span class="num" style="color:var(--muted);font-size:.72rem">${l.steps.length} steps</span></span>
              <a class="btn btn-sm ${done.includes(l.id) ? "" : "btn-ink"}" href="#/lessons?id=${l.id}">${done.includes(l.id) ? "Replay" : "Learn"}</a>
            </div>`).join("")}
        </div>`).join("")}
    `;
  }

  function renderPlayer(root, id) {
    const lesson = window.LESSONS.find(l => l.id === id);
    if (!lesson) { location.hash = "#/lessons"; return; }
    let step = 0;

    function draw() {
      const s = lesson.steps[step];
      root.innerHTML = `
        <div class="quiz-top">
          <div><span class="eyebrow">Lesson · ${Engine.SEC_NAMES[lesson.sec]}</span><b>${lesson.title}</b></div>
          <a class="btn btn-sm btn-ghost" href="#/lessons">Exit</a>
        </div>
        <div class="card">
          <div class="lesson-stage" id="stage">${s.svg}</div>
          <p class="lesson-caption">${s.text}</p>
          <div class="lesson-nav">
            <button class="btn btn-sm" id="l-prev" ${step === 0 ? "disabled" : ""}>Back</button>
            <div class="lesson-dots">
              ${lesson.steps.map((_, k) => `<span class="bubble${k <= step ? " fill" : ""}" data-s="${k}"></span>`).join("")}
            </div>
            <button class="btn btn-sm btn-primary" id="l-next">${step === lesson.steps.length - 1 ? "Finish" : "Next"}</button>
          </div>
        </div>
      `;
      root.querySelector("#l-prev").addEventListener("click", () => { if (step > 0) { step--; draw(); } });
      root.querySelector("#l-next").addEventListener("click", () => {
        if (step < lesson.steps.length - 1) { step++; draw(); }
        else runCheck();
      });
      root.querySelectorAll(".lesson-dots .bubble").forEach(d =>
        d.addEventListener("click", () => { step = parseInt(d.dataset.s, 10); draw(); }));
    }

    function runCheck() {
      const checkQs = lesson.drill ? Engine.practiceSet({ sec: lesson.sec, topic: lesson.drill, n: 2 }) : [];
      if (checkQs.length < 2) { finishLesson(); return; }
      Views.quizRunner(root, {
        questions: checkQs, mode: "practice",
        title: "Quick check · " + lesson.title,
        exitHref: "#/lessons?id=" + lesson.id,
        onDone: finishLesson
      });
    }

    function finishLesson() {
      const done = Store.state.lessonsDone || (Store.state.lessonsDone = []);
      let xp = 0;
      if (!done.includes(lesson.id)) {
        done.push(lesson.id);
        Store.state.profile.xp += (xp = 25);
        Store.save();
      }
      root.innerHTML = `
        <div class="card" style="text-align:center;max-width:520px;margin:50px auto">
          <span class="eyebrow">Lesson complete</span>
          <h2>${lesson.title}</h2>
          ${xp ? `<p class="num" style="color:var(--chinar);font-weight:700">+${xp} XP</p>` : ""}
          <p style="font-size:.9rem;color:var(--muted)">Now prove it — drill the topic while it's fresh.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            ${lesson.drill ? `<a class="btn btn-primary" href="#/practice?sec=${lesson.sec}&topic=${lesson.drill}&go=1&n=10">Drill this topic</a>` : ""}
            <a class="btn" href="#/lessons">More lessons</a>
          </div>
        </div>
      `;
    }

    draw();
  }

  window.Views = window.Views || {};
  Views.lessons = render;
})();
