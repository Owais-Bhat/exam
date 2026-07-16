# Graph Report - E:/exam  (2026-07-15)

## Corpus Check
- Corpus is ~15 words - fits in a single context window. You may not need a graph.

## Summary
- 66 nodes · 85 edges · 6 communities
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.85)
- Token cost: 6,000 input · 4,500 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Reasoning & Intelligence|Reasoning & Intelligence]]
- [[_COMMUNITY_General Awareness & Current Affairs|General Awareness & Current Affairs]]
- [[_COMMUNITY_English Language|English Language]]
- [[_COMMUNITY_Quantitative Aptitude|Quantitative Aptitude]]
- [[_COMMUNITY_Computer Proficiency|Computer Proficiency]]
- [[_COMMUNITY_Mathematical Abilities|Mathematical Abilities]]

## God Nodes (most connected - your core abstractions)
1. `A. General Intelligence & Reasoning (20Q/40M)` - 17 edges
2. `C. Quantitative Aptitude (15Q/30M)` - 14 edges
3. `D. English Comprehension (15Q/30M)` - 13 edges
4. `B. General Awareness (20Q/40M)` - 11 edges
5. `JKSSB Sub-Inspector Exam (J&K Police)` - 8 edges
6. `E. Mathematical Abilities (15Q/30M)` - 7 edges
7. `F. Computer Proficiency (15Q/30M)` - 6 edges
8. `Graduation Level (Parts A, B, D)` - 3 edges
9. `10th Standard Level (Parts C, E, F)` - 3 edges
10. `Current Affairs` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Graduation Level (Parts A, B, D)` --references--> `A. General Intelligence & Reasoning (20Q/40M)`  [EXTRACTED]
  Syllabus_SI_Home_Department_26122024.pdf → Syllabus_SI_Home_Department_26122024.pdf  _Bridges community 1 → community 0_
- `Graduation Level (Parts A, B, D)` --references--> `D. English Comprehension (15Q/30M)`  [EXTRACTED]
  Syllabus_SI_Home_Department_26122024.pdf → Syllabus_SI_Home_Department_26122024.pdf  _Bridges community 1 → community 2_
- `10th Standard Level (Parts C, E, F)` --references--> `C. Quantitative Aptitude (15Q/30M)`  [EXTRACTED]
  Syllabus_SI_Home_Department_26122024.pdf → Syllabus_SI_Home_Department_26122024.pdf  _Bridges community 4 → community 3_
- `10th Standard Level (Parts C, E, F)` --references--> `E. Mathematical Abilities (15Q/30M)`  [EXTRACTED]
  Syllabus_SI_Home_Department_26122024.pdf → Syllabus_SI_Home_Department_26122024.pdf  _Bridges community 4 → community 5_

## Hyperedges (group relationships)
- **Graduation-Level Sections (A, B, D)** — syllabus_sec_reasoning, syllabus_sec_ga, syllabus_sec_english [EXTRACTED 1.00]
- **10th-Standard-Level Sections (C, E, F)** — syllabus_sec_quant, syllabus_sec_math, syllabus_sec_computer [EXTRACTED 1.00]
- **Numeracy Cluster (60 marks of math-adjacent scoring)** — syllabus_sec_quant, syllabus_sec_math, syllabus_r_arith_reasoning [INFERRED 0.85]

## Communities (6 total, 0 thin omitted)

### Community 0 - "Reasoning & Intelligence"
Cohesion: 0.14
Nodes (15): Analogies (Semantic/Symbolic/Number/Figural), Classification (Semantic/Symbolic/Figural), Coding & Decoding, Critical Thinking / Emotional & Social Intelligence, Embedded Figures & Pattern Completion, Punched Hole / Pattern Folding & Unfolding, Drawing Inferences / Statement Conclusion / Syllogism, Matching (Address, Date & City, Centre Codes) (+7 more)

### Community 1 - "General Awareness & Current Affairs"
Cohesion: 0.18
Nodes (12): Comprehension Passages (story + current-affairs editorials), Culture (India + J&K), Current Affairs, Economics & General Policy (India + J&K), Geography (India + J&K), History (India + J&K), J&K Special Reference (UT-specific GK), People in News (+4 more)

### Community 2 - "English Language"
Cohesion: 0.22
Nodes (11): Fill in the Blanks, Cloze Passage, Spot the Error / Sentence Improvement, Grammar & Sentence Structure, Idioms & Phrases / One Word Substitution, Direct/Indirect Narration, Sentence & Para Shuffling, Spellings / Mis-spelt Words (+3 more)

### Community 3 - "Quantitative Aptitude"
Cohesion: 0.27
Nodes (11): Interest (Simple & Compound), Mixture & Alligation, Partnership Business, Percentage, Profit & Loss, Discount, Ratio & Proportion, Square Roots, Time & Distance (+3 more)

### Community 4 - "Computer Proficiency"
Cohesion: 0.25
Nodes (9): Computer Basics (CPU, Memory, I/O, Ports, Shortcuts), Internet & E-mail (Browsing, e-Banking), Networking & Cyber Security (Threats, Prevention), Software (Windows OS, MS Word/Excel/PowerPoint), Exam Pattern: 100 MCQs / 200 Marks / 120 min, 10th Standard Level (Parts C, E, F), Negative Marking −0.5 per wrong answer, F. Computer Proficiency (15Q/30M) (+1 more)

### Community 5 - "Mathematical Abilities"
Cohesion: 0.32
Nodes (8): Algebra (Identities, Surds, Linear Graphs), Geometry (Triangles, Circles, Tangents), Mensuration (2D & 3D Solids), Statistics & Probability (Graphs, Central Tendency), Trigonometry (Ratios, Heights & Distances), Averages, Number System (Whole/Decimals/Fractions), E. Mathematical Abilities (15Q/30M)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `JKSSB Sub-Inspector Exam (J&K Police)` connect `Computer Proficiency` to `Reasoning & Intelligence`, `General Awareness & Current Affairs`, `English Language`, `Quantitative Aptitude`, `Mathematical Abilities`?**
  _High betweenness centrality (0.596) - this node is a cross-community bridge._
- **Why does `A. General Intelligence & Reasoning (20Q/40M)` connect `Reasoning & Intelligence` to `General Awareness & Current Affairs`, `Quantitative Aptitude`, `Computer Proficiency`?**
  _High betweenness centrality (0.402) - this node is a cross-community bridge._
- **Why does `C. Quantitative Aptitude (15Q/30M)` connect `Quantitative Aptitude` to `Computer Proficiency`, `Mathematical Abilities`?**
  _High betweenness centrality (0.320) - this node is a cross-community bridge._
- **What connects `Exam Pattern: 100 MCQs / 200 Marks / 120 min`, `Negative Marking −0.5 per wrong answer`, `Analogies (Semantic/Symbolic/Number/Figural)` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Reasoning & Intelligence` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._