/* taxonomy.js — exam structure, derived from graphify-out/graph.json (syllabus) */
window.BANK = [];
window.BANK_INDEX = {};
window.registerBank = function (arr) {
  for (const q of arr) {
    window.BANK.push(q);
    window.BANK_INDEX[q.id] = q;
  }
};

window.TAXONOMY = {
  A: { name: "General Intelligence & Reasoning", marks: 40, q: 20, level: "Graduation", topics: {
    analogies: "Analogies", classification: "Classification", series: "Series",
    coding: "Coding & Decoding", problem_solving: "Problem Solving & Word Building",
    operations: "Numerical & Symbolic Operations", space: "Space Orientation & Visualization",
    venn: "Venn Diagrams", inference: "Syllogism & Statement Conclusion",
    folding: "Paper Folding & Punched Holes", embedded: "Embedded Figures & Completion",
    matching: "Matching & Coded Classification", critical: "Critical / Emotional / Social Intelligence",
    memory: "Visual Memory & Observation", arith_reasoning: "Arithmetical Reasoning & Trends"
  }},
  B: { name: "General Awareness", marks: 40, q: 20, level: "Graduation", topics: {
    history: "History (India + J&K)", culture: "Culture (India + J&K)",
    geography: "Geography (India + J&K)", economics: "Economics & Policy",
    polity: "Polity & Constitution", jk: "J&K Special (UT, Reorganisation)",
    sports: "Sports", science: "Science & Research",
    people: "People in News", current: "Current Affairs 2025–26"
  }},
  C: { name: "Quantitative Aptitude", marks: 30, q: 15, level: "10th standard", topics: {
    numbers: "Number System", percentage: "Percentage", ratio: "Ratio & Proportion",
    sqroots: "Square Roots", averages: "Averages", interest: "Interest (SI & CI)",
    profit: "Profit, Loss & Discount", partnership: "Partnership",
    mixture: "Mixture & Alligation", tsd: "Time & Distance", work: "Time & Work"
  }},
  D: { name: "English Comprehension", marks: 30, q: 15, level: "Graduation", topics: {
    vocab: "Synonyms · Antonyms · Homonyms", grammar: "Grammar & Structure",
    error: "Spot the Error & Improvement", blanks: "Fill in the Blanks",
    spelling: "Spellings", idioms: "Idioms & One-Word Substitution",
    voice: "Active / Passive Voice", narration: "Direct / Indirect Speech",
    shuffling: "Sentence Rearrangement", cloze: "Cloze Passage", comprehension: "Reading Comprehension"
  }},
  E: { name: "Mathematical Abilities", marks: 30, q: 15, level: "10th standard", topics: {
    algebra: "Algebra & Surds", geometry: "Geometry",
    mensuration: "Mensuration", trigonometry: "Trigonometry",
    statistics: "Statistics & Probability"
  }},
  F: { name: "Computer Proficiency", marks: 30, q: 15, level: "10th standard", topics: {
    basics: "Computer Basics & Hardware", software: "Windows & MS Office",
    internet: "Internet, E-mail & e-Banking", security: "Networking & Cyber Security"
  }}
};
