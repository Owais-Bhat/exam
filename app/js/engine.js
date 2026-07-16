/* engine.js — question selection, quiz + mock composition */
(function () {
  const SEC_NAMES = {
    A: "Reasoning", B: "General Awareness", C: "Quantitative Aptitude",
    D: "English", E: "Mathematical Abilities", F: "Computer"
  };
  const SEC_Q = { A: 20, B: 20, C: 15, D: 15, E: 15, F: 15 };

  function pool() {
    const rep = new Set(Store.state.reported);
    return window.BANK.filter(q => !rep.has(q.id));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* practice set: topic- or section-scoped.
     Weighting: unseen first, then weak (low accuracy), then rest. */
  function practiceSet({ sec = null, topic = null, n = 10, realOnly = false }) {
    let qs = pool();
    if (sec) qs = qs.filter(q => q.sec === sec);
    if (topic) qs = qs.filter(q => q.topic === topic);
    if (realOnly) qs = qs.filter(q => q.real);
    const unseen = [], weak = [], rest = [];
    for (const q of qs) {
      const s = Store.state.q[q.id];
      if (!s || s.a === 0) unseen.push(q);
      else if (s.c / s.a < 0.7) weak.push(q);
      else rest.push(q);
    }
    const out = shuffle(unseen).concat(shuffle(weak), shuffle(rest)).slice(0, n);
    return shuffle(out);
  }

  /* full mock: exact section weights, prefer unseen-in-mock questions */
  function mockSet() {
    const qs = pool();
    const out = [];
    for (const sec of ["A", "B", "C", "D", "E", "F"]) {
      const secQ = qs.filter(q => q.sec === sec);
      const freshQ = secQ.filter(q => !(Store.state.q[q.id] && Store.state.q[q.id].seenInMock));
      const chosen = shuffle(freshQ.length >= SEC_Q[sec] ? freshQ : secQ).slice(0, SEC_Q[sec]);
      out.push(...chosen);
    }
    return out; // ordered by section like the real paper
  }

  function markSeenInMock(qs) {
    for (const q of qs) { Store.qstat(q.id).seenInMock = true; }
    Store.save();
  }

  /* score a mock: +2 correct, −0.5 wrong, 0 skip */
  function scoreMock(qs, answers) {
    let score = 0, correct = 0, wrong = 0, skipped = 0;
    const secStats = {};
    for (const sec of Object.keys(SEC_Q)) secStats[sec] = { c: 0, w: 0, s: 0, marks: 0 };
    qs.forEach((q, i) => {
      const st = secStats[q.sec];
      if (answers[i] === null || answers[i] === undefined) { skipped++; st.s++; }
      else if (answers[i] === q.ans) { correct++; st.c++; score += 2; st.marks += 2; }
      else { wrong++; st.w++; score -= 0.5; st.marks -= 0.5; }
    });
    return { score: Math.round(score * 10) / 10, correct, wrong, skipped, secStats, max: 200 };
  }

  function realCount() {
    return pool().filter(q => q.real).length;
  }

  function topicsOf(sec) {
    const seen = new Map();
    for (const q of pool()) {
      if (q.sec !== sec) continue;
      if (!seen.has(q.topic)) seen.set(q.topic, 0);
      seen.set(q.topic, seen.get(q.topic) + 1);
    }
    return [...seen.entries()].map(([t, n]) => ({ topic: t, n }));
  }

  window.Engine = { SEC_NAMES, SEC_Q, pool, practiceSet, mockSet, markSeenInMock, scoreMock, topicsOf, shuffle, realCount };
})();
