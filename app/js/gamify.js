/* gamify.js — XP, levels, badges, readiness meter */
(function () {
  const LEVELS = [0, 100, 260, 500, 850, 1300, 1900, 2700, 3700, 5000, 6600, 8500, 11000, 14000, 18000];
  const LEVEL_NAMES = ["Recruit", "Cadet", "Constable", "Head Constable", "ASI-II", "ASI-I", "SI Aspirant", "SI Contender",
    "SI Finalist", "Section Officer", "Inspector Track", "Ace", "Topper", "Rank Holder", "Sub-Inspector"];

  const BADGES = [
    { id: "first10",   icon: "🎯", name: "First Ten",        test: s => totalAnswered() >= 10 },
    { id: "century",   icon: "💯", name: "Century",          test: s => totalAnswered() >= 100 },
    { id: "fivehundo", icon: "🏋️", name: "500 Club",         test: s => totalAnswered() >= 500 },
    { id: "grinder",   icon: "⚙️", name: "1000 Questions",   test: s => totalAnswered() >= 1000 },
    { id: "streak3",   icon: "🔥", name: "3-Day Streak",     test: s => s.profile.streak >= 3 },
    { id: "streak7",   icon: "🌶️", name: "7-Day Streak",     test: s => s.profile.streak >= 7 },
    { id: "streak21",  icon: "🚀", name: "21-Day Streak",    test: s => s.profile.streak >= 21 },
    { id: "mock1",     icon: "📝", name: "First Mock",       test: s => s.mocks.length >= 1 },
    { id: "mock10",    icon: "📚", name: "Ten Mocks",        test: s => s.mocks.length >= 10 },
    { id: "mock160",   icon: "🥉", name: "Crossed 160",      test: s => s.mocks.some(m => m.score >= 160) },
    { id: "mock175",   icon: "🥈", name: "Crossed 175",      test: s => s.mocks.some(m => m.score >= 175) },
    { id: "mock190",   icon: "🥇", name: "Target 190 Hit",   test: s => s.mocks.some(m => m.score >= 190) },
    { id: "quota",     icon: "✅", name: "Daily Quota",      test: s => (s.daily[Store.today()] || 0) >= 130 },
    { id: "mastered50",icon: "🧠", name: "50 Mastered Lapses", test: s => Object.values(s.q).filter(x => x.srs === null && x.a > 1 && x.c > 1).length >= 50 }
  ];

  function totalAnswered() {
    return Object.values(Store.state.q).reduce((n, s) => n + s.a, 0);
  }

  function level() {
    const xp = Store.state.profile.xp;
    let li = 0;
    for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i]) li = i;
    const next = LEVELS[li + 1] || null;
    return { n: li + 1, name: LEVEL_NAMES[li], xp, next, prev: LEVELS[li] };
  }

  function award(correct, mode) {
    const p = Store.state.profile;
    let xp = correct ? 10 : 2;
    if (mode === "revise" && correct) xp = 14;      // clearing a lapse pays more
    if (p.streak >= 7) xp = Math.round(xp * 1.25);  // streak multiplier
    else if (p.streak >= 3) xp = Math.round(xp * 1.1);
    p.xp += xp;
    Store.save();
    return xp;
  }

  function checkBadges() {
    const s = Store.state;
    const fresh = [];
    for (const b of BADGES) {
      if (!s.profile.badges.includes(b.id) && b.test(s)) {
        s.profile.badges.push(b.id);
        fresh.push(b);
      }
    }
    if (fresh.length) Store.save();
    return fresh;
  }

  /* Readiness: predicted exam score out of 200.
     Per section: recent accuracy p (last 40 answers).
     Expected marks per question = p*2 − (1−p)*0.5 (attempt everything model).
     Unpracticed sections count at a floor of 25% accuracy. */
  const SEC_Q = { A: 20, B: 20, C: 15, D: 15, E: 15, F: 15 };

  function sectionAccuracy(sec) {
    const r = Store.state.recent[sec] || [];
    if (r.length === 0) return null;
    return r.reduce((a, b) => a + b, 0) / r.length;
  }

  function readiness() {
    let score = 0;
    const per = {};
    for (const sec of Object.keys(SEC_Q)) {
      const accRaw = sectionAccuracy(sec);
      const acc = accRaw === null ? 0.25 : accRaw;
      const perQ = Math.max(0, acc * 2 - (1 - acc) * 0.5);
      const marks = perQ * SEC_Q[sec];
      per[sec] = { acc: accRaw, marks: Math.round(marks * 10) / 10, max: SEC_Q[sec] * 2 };
      score += marks;
    }
    return { score: Math.round(score), per, target: 190 };
  }

  window.Gamify = { level, award, checkBadges, readiness, BADGES, totalAnswered, sectionAccuracy, SEC_Q };
})();
