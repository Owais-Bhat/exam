/* study-plan.js — dated syllabus sprint ending 10 November 2026 */
(function () {
  const DAYS = [
    { date: "2026-10-25", title: "Number System, Analogies & J&K Foundations", focus: "Build calculation speed, analogy logic, and core J&K recall", sections: { C: ["numbers", "percentage"], A: ["analogies", "coding"], B: ["jk", "history"] } },
    { date: "2026-10-26", title: "Ratio-Profit, Series & J&K Polity", focus: "Convert recurring arithmetic and pattern questions into safe marks", sections: { C: ["ratio", "profit"], A: ["series", "classification"], B: ["polity", "jk"] } },
    { date: "2026-10-27", title: "Time-Work, Inference & J&K Culture", focus: "Master LCM work methods, conclusions, and cultural facts", sections: { C: ["work", "partnership", "mixture"], A: ["operations", "inference"], B: ["history", "culture"] } },
    { date: "2026-10-28", title: "Time-Distance, Spatial Logic & J&K Geography", focus: "Connect speed formulas, direction logic, and map-based facts", sections: { C: ["tsd", "averages", "interest"], A: ["space", "venn"], B: ["geography", "jk"] } },
    { date: "2026-10-29", title: "English Grammar, Algebra & Constitution", focus: "Strengthen language accuracy, algebraic manipulation, and polity", sections: { D: ["vocab", "grammar", "error"], E: ["algebra"], B: ["polity", "current"] } },
    { date: "2026-10-30", title: "English Usage, Statistics & Computer Basics", focus: "Lock vocabulary usage, data concepts, and computer foundations", sections: { D: ["blanks", "spelling", "idioms"], E: ["statistics"], F: ["basics"] } },
    { date: "2026-10-31", title: "Voice-Narration, Geometry & J&K History", focus: "Apply grammar transformations, diagrams, and historical timelines", sections: { D: ["voice", "narration"], E: ["geometry"], B: ["history", "culture"] } },
    { date: "2026-11-01", title: "Comprehension, Mensuration & J&K Geography", focus: "Improve passage control, measurement formulas, and geographical recall", sections: { D: ["shuffling", "cloze", "comprehension"], E: ["mensuration", "trigonometry"], B: ["geography"] } },
    { date: "2026-11-02", title: "Visual Reasoning, Office Tools & Science", focus: "Solve figure questions and secure computer and science facts", sections: { A: ["folding", "embedded"], F: ["software"], B: ["science"] } },
    { date: "2026-11-03", title: "Problem Solving, Cyber Security & Economics", focus: "Master coded logic, online safety, banking, and economic basics", sections: { A: ["matching", "problem_solving"], F: ["internet", "security"], B: ["economics"] } },
    { date: "2026-11-04", title: "Advanced Reasoning, Roots & Current Personalities", focus: "Finish intelligence topics with calculation and news recall", sections: { A: ["critical", "memory", "arith_reasoning"], C: ["sqroots"], B: ["sports", "people"] } },
    { date: "2026-11-05", title: "Reasoning Lock, English Accuracy & Current Affairs", focus: "Consolidate logic and language while updating dynamic facts", sections: { A: ["inference", "space", "coding"], D: ["grammar", "error"], B: ["current", "jk"] } },
    { date: "2026-11-06", title: "Quant Lock, Geometry & Science-Economy", focus: "Run advanced mixed calculations with high-yield factual revision", sections: { C: ["percentage", "ratio", "profit", "tsd", "work"], E: ["algebra", "geometry"], B: ["economics", "science"] } },
    { date: "2026-11-07", title: "English Lock, Cyber Safety & Current Affairs", focus: "Finish comprehension and grammar with digital and current facts", sections: { D: ["voice", "narration", "cloze", "comprehension"], F: ["security"], B: ["current"] } },
    { date: "2026-11-08", title: "Math Lock, Reasoning Traps & J&K Special", focus: "Master advanced formulas, examiner traps, and J&K facts", sections: { E: ["algebra", "geometry", "mensuration", "trigonometry", "statistics"], A: ["inference", "arith_reasoning"], B: ["jk"] } },
    { date: "2026-11-09", title: "Computer Lock, Quant Speed & English Speed", focus: "Complete computer coverage and improve cross-section timing", sections: { F: ["basics", "software", "internet", "security"], C: ["averages", "interest", "mixture", "partnership"], D: ["vocab", "grammar", "shuffling"] } },
    { date: "2026-11-10", title: "Full Syllabus Lock & Grand Drill", focus: "Close every remaining gap and prove readiness for mock phase", sections: { A: ["inference", "arith_reasoning"], C: ["percentage", "ratio", "tsd", "work"], B: ["jk", "polity", "current"] } }
  ].map((d, i) => ({ ...d, day: i + 1, masterclassDay: i + 14, id: `sprint_day_${i + 1}` }));

  const START = DAYS[0].date;
  const DEADLINE = DAYS[DAYS.length - 1].date;
  const MOCK_START = "2026-11-11";

  function localISO(date = new Date()) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function topicName(sec, key) {
    return TAXONOMY[sec]?.topics?.[key] || key.replace(/_/g, " ");
  }

  function labels(day) {
    const out = [];
    Object.entries(day.sections).forEach(([sec, topics]) => {
      out.push(`${TAXONOMY[sec].name}: ${topics.map(t => topicName(sec, t)).join(", ")}`);
    });
    return out;
  }

  function completedIds() {
    return Store.state.masterclass?.completedDrills || {};
  }

  function isComplete(day) {
    const result = completedIds()[`${day.id}_drill`];
    return !!result && result.maxScore >= 40;
  }

  function firstIncomplete() {
    return DAYS.find(d => !isComplete(d)) || DAYS[DAYS.length - 1];
  }

  function currentDay(now = new Date()) {
    const iso = localISO(now);
    if (iso < START) return DAYS[0];
    if (iso > DEADLINE) return firstIncomplete();
    return DAYS.find(d => d.date === iso) || firstIncomplete();
  }

  function mode(now = new Date()) {
    const iso = localISO(now);
    if (iso >= MOCK_START) return "mock";
    return "syllabus";
  }

  function daysRemaining(now = new Date()) {
    const end = new Date(`${DEADLINE}T23:59:59`);
    return Math.max(0, Math.ceil((end - now) / 86400000));
  }

  function progress() {
    const done = DAYS.filter(isComplete).length;
    return { done, total: DAYS.length, pct: Math.round(done / DAYS.length * 100) };
  }

  window.StudyPlan = { DAYS, START, DEADLINE, MOCK_START, localISO, topicName, labels, isComplete, firstIncomplete, currentDay, mode, daysRemaining, progress };
})();
