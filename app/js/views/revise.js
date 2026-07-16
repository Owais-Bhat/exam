/* revise.js — spaced-repetition revision deck */
(function () {
  function render(root, params) {
    const due = SRS.dueList();

    if (params.go && due.length) {
      const deck = Engine.shuffle(due).slice(0, 30);
      Views.quizRunner(root, {
        questions: deck, mode: "revise",
        title: "Revision deck",
        againLabel: SRS.dueList().length > 30 ? "Next deck" : null,
        onAgain: () => render(root, params)
      });
      return;
    }

    const learning = SRS.queueSize();
    const lapsed = Object.values(Store.state.q).filter(s => s.srs && s.srs.lapses >= 2).length;
    const weak = SRS.weakTopics(6);

    root.innerHTML = `
      <span class="eyebrow">Revision — spaced repetition</span>
      <h1>${due.length ? "Debts to clear." : "Queue is clear."}</h1>
      <div class="grid grid-3" style="margin:16px 0">
        <div class="tile"><span class="t-num" style="color:${due.length ? "var(--neg)" : "var(--key)"}">${due.length}</span><span class="t-label">due now</span></div>
        <div class="tile"><span class="t-num">${learning}</span><span class="t-label">in learning</span></div>
        <div class="tile"><span class="t-num" style="color:var(--chinar)">${lapsed}</span><span class="t-label">repeat offenders</span></div>
      </div>
      <div class="card">
        <p style="font-size:.92rem">Every question you get wrong comes back on day <b class="num">1</b>, then <b class="num">3</b>, <b class="num">7</b>, <b class="num">16</b>, <b class="num">35</b>. Answer it correctly each time and it graduates out of the queue — that's mastery, not luck.</p>
        ${due.length
          ? `<a class="btn btn-primary" href="#/revise?go=1">Start revision deck <span class="num">(${Math.min(30, due.length)})</span></a>`
          : `<p style="color:var(--key);font-weight:600">Nothing due. Go practice — the queue only grows when you make mistakes.</p><a class="btn btn-primary" href="#/practice">Go practice</a>`}
      </div>
      ${weak.length ? `
      <div class="card" style="margin-top:16px">
        <span class="eyebrow">Your weakest topics — drill these</span>
        ${weak.map(w => {
          let secOfTopic = null;
          for (const [sec, t] of Object.entries(TAXONOMY)) if (t.topics[w.topic]) { secOfTopic = sec; break; }
          const label = secOfTopic ? TAXONOMY[secOfTopic].topics[w.topic] : w.topic;
          return `<div class="list-row">
            <span>${label} <span class="num" style="color:var(--muted);font-size:.75rem">(${Math.round(w.acc * 100)}% over ${w.a})</span></span>
            ${secOfTopic ? `<a class="btn btn-sm" href="#/practice?sec=${secOfTopic}&topic=${w.topic}&go=1&n=10">Drill 10</a>` : ""}
          </div>`;
        }).join("")}
      </div>` : ""}
    `;
  }

  window.Views = window.Views || {};
  Views.revise = render;
})();
