/* srs.js — spaced repetition (SM-2 lite) for wrong answers */
(function () {
  const DAY = 86400000;
  // interval ladder in days; ease shifts position
  const LADDER = [1, 3, 7, 16, 35];

  function now() { return Date.now(); }

  // called after answering a question anywhere
  function onResult(q, correct) {
    const s = Store.qstat(q.id);
    if (!correct) {
      // enters / resets revision queue
      const lapses = s.srs ? (s.srs.lapses + 1) : 1;
      s.srs = { due: now() + DAY, step: 0, lapses };
    } else if (s.srs) {
      // graduating step
      s.srs.step++;
      if (s.srs.step >= LADDER.length) {
        s.srs = null; // mastered — leaves the queue
      } else {
        s.srs.due = now() + LADDER[s.srs.step] * DAY;
      }
    }
    Store.save();
  }

  function dueList() {
    const t = now();
    const ids = Object.keys(Store.state.q).filter(id => {
      const s = Store.state.q[id];
      return s.srs && s.srs.due <= t && !Store.state.reported.includes(id);
    });
    return ids.map(id => BANK_INDEX[id]).filter(Boolean);
  }

  function queueSize() {
    return Object.values(Store.state.q).filter(s => s.srs).length;
  }

  // topic weakness score: lower accuracy + more attempts = weaker
  function weakTopics(limit = 6) {
    const rows = Object.entries(Store.state.topics)
      .filter(([, v]) => v.a >= 4)
      .map(([topic, v]) => ({ topic, acc: v.c / v.a, a: v.a }))
      .sort((x, y) => x.acc - y.acc);
    return rows.slice(0, limit);
  }

  window.SRS = { onResult, dueList, queueSize, weakTopics };
})();
