/* store.js — localStorage persistence layer */
(function () {
  const KEY = "siprep.v1";

  const DEFAULT = {
    profile: { xp: 0, streak: 0, bestStreak: 0, lastActive: null, badges: [] },
    // per-question: { a: attempts, c: correct, srs: {due, ivl, ease, lapses}, seenInMock: bool }
    q: {},
    // rolling recent results per section: array of 0/1 (last 40)
    recent: { A: [], B: [], C: [], D: [], E: [], F: [] },
    topics: {},          // topicId -> {a, c}
    mocks: [],           // {date, score, max, secStats, timeUsed}
    daily: {},           // 'YYYY-MM-DD' -> answered count
    reported: [],        // question ids flagged bad
    startDate: null,     // first day of use (planner anchor)
    settings: { theme: "dark" }
  };

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(DEFAULT);
      const parsed = JSON.parse(raw);
      return Object.assign(structuredClone(DEFAULT), parsed);
    } catch (e) {
      console.warn("store: reset after parse error", e);
      return structuredClone(DEFAULT);
    }
  }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(state)); }
      catch (e) { console.error("store: save failed", e); }
    }, 120);
  }

  function today() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function touchDay() {
    if (!state.startDate) state.startDate = today();
    const t = today();
    if (state.profile.lastActive !== t) {
      // streak logic: consecutive day?
      const y = new Date(); y.setDate(y.getDate() - 1);
      const yest = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
      state.profile.streak = (state.profile.lastActive === yest) ? state.profile.streak + 1 : 1;
      state.profile.bestStreak = Math.max(state.profile.bestStreak, state.profile.streak);
      state.profile.lastActive = t;
    }
    save();
  }

  function qstat(id) {
    if (!state.q[id]) state.q[id] = { a: 0, c: 0, srs: null };
    return state.q[id];
  }

  function recordAnswer(q, correct) {
    touchDay();
    const s = qstat(q.id);
    s.a++; if (correct) s.c++;
    const r = state.recent[q.sec] || (state.recent[q.sec] = []);
    r.push(correct ? 1 : 0);
    if (r.length > 40) r.shift();
    const t = state.topics[q.topic] || (state.topics[q.topic] = { a: 0, c: 0 });
    t.a++; if (correct) t.c++;
    const d = today();
    state.daily[d] = (state.daily[d] || 0) + 1;
    save();
  }

  window.Store = {
    get state() { return state; },
    save, today, touchDay, qstat, recordAnswer,
    reset() { state = structuredClone(DEFAULT); save(); },
    export() { return JSON.stringify(state); }
  };
})();
