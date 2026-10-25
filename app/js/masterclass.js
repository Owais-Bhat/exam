/* masterclass.js — strategy note manager, parser, and drill extractor */
(function () {
  const LESSON_FORMAT_VERSION = 7;
  const DAILY_DRILL_SIZE = 20;
  const DEFAULT_STRATEGY = `### 🚀 DAY 13 MASTERCLASS: Boats & Streams, Direction Sense Test, and J&K Hydrography

Following your established rule, both the Quantitative Aptitude and Reasoning sections are structured with **4 Progressive Difficulty Levels (Level 1 to Level 4)** featuring detailed step-by-step worked examples, key shortcut formulas, and examiner traps.

---

### Section 1: Quantitative Aptitude — Boats & Streams

#### 1. Core Mathematical Framework
Motion in water involves two distinct velocities acting simultaneously:
* **Speed of Boat in Still Water (u):** The intrinsic speed of the boat or swimmer propelled by engine or muscular effort without any external water resistance.
* **Speed of Stream / Current (v):** The velocity of the flowing water body.
* **Downstream Speed (D):** Motion in the direction of the stream: D = u + v
* **Upstream Speed (U):** Motion against the direction of the stream: U = u - v (where u > v)

#### 2. Fundamental Transformation Formulas & Shortcuts
u = (D + U) / 2,     v = (D - U) / 2
* **Time-Speed Inversion Shortcut:** For a fixed distance (d):
Time_upstream / Time_downstream = D / U = (u + v) / (u - v)
* **Average Speed for a Round Trip over Equal Distance:**
Average Speed = (2 × D × U) / (D + U) = (u² - v²) / u

---

#### 4-Level Deep-Dive Solved Examples

##### Level 1: Basic Component Resolution
* **Problem:** A motorboat travels 45 km downstream in 3 hours and covers 25 km upstream in 5 hours. Calculate the speed of the boat in still water (u) and the speed of the stream (v).
* **Step-by-Step Solution:**
1. Downstream speed: D = 45 / 3 = 15 km/h
2. Upstream speed: U = 25 / 5 = 5 km/h
3. Speed in still water: u = (15 + 5)/2 = 10 km/h
4. Speed of stream: v = (15 - 5)/2 = 5 km/h

##### Level 2: Upstream vs. Downstream Time Difference (Ratio Method)
* **Problem:** A person swims at 10 km/h in still water in a river where current is 2 km/h. It takes him 4 hours longer to row upstream to a point than downstream. Find the distance.
* **Step-by-Step Solution:**
1. D = 10 + 2 = 12 km/h, U = 10 - 2 = 8 km/h
2. Speed Ratio D:U = 12:8 = 3:2 ⟶ Time Ratio TD:TU = 2:3
3. Difference = 3 - 2 = 1 unit = 4 hours
4. TD = 2 × 4 = 8 hours ⟶ Distance = 12 × 8 = 96 km

##### Level 3: Total Journey Time / Round-Trip Equations
* **Problem:** A motorboat operates at 15 km/h in still water. Current is 3 km/h. Returns downstream and upstream in total 5 hours. Find one-way distance.
* **Step-by-Step Solution:**
1. D = 18 km/h, U = 12 km/h
2. d/18 + d/12 = 5 ⟶ 5d/36 = 5 ⟶ d = 36 km

##### Level 4: Advanced Examiner's Trap — Ratio Equations
* **Problem:** A boat takes three times as long upstream as downstream over the same distance. Find ratio of speed in still water to current (u : v).
* **Step-by-Step Solution:**
1. TU / TD = 3/1 ⟶ D / U = 3/1 ⟶ (u + v)/(u - v) = 3/1
2. u + v = 3u - 3v ⟶ 4v = 2u ⟶ u / v = 2 / 1 = 2:1

---

### Section 2: General Intelligence & Reasoning — Direction Sense Test

#### 1. Fundamental Quadrants & Spatial Mechanics
* Four Cardinal Directions: North, South, East, West
* Rotation: Right turn = 90° Clockwise, Left turn = 90° Counter-Clockwise

---

#### 4-Level Deep-Dive Solved Examples

##### Level 1: Basic Path Tracking
* **Problem:** Walks 10m North, turns Right (15m), turns Right (10m), turns Left (5m). Current facing?
* **Solution:** North ⟶ Right (East) ⟶ Right (South) ⟶ Left (East). Facing: East.

##### Level 2: Shortest Distance via Pythagorean Triplets
* **Problem:** Walks 12km South, turns West (5km). Distance and direction from start?
* **Solution:** Δy = -12 km, Δx = -5 km. Distance = √(12² + 5²) = 13 km (South-West).

##### Level 3: Net Angular Turning Method
* **Problem:** Facing North-East (+45°). Turns 90° Clockwise, 135° Counter-Clockwise, 180° Clockwise. Current facing?
* **Solution:** Net Turn = +90 - 135 + 180 = +135° Clockwise. 45° + 135° = 180° (South).

##### Level 4: Shadow Mechanics (Morning & Evening Rules)
* **Problem:** Morning after sunrise. Aman and Vikram talk face-to-face. Vikram's shadow falls to Aman's Right. Aman's facing?
* **Master Rule:** Morning sun = East, all shadows = West. Aman's Right = West ⟶ Aman is facing South (Vikram faces North).

---

### Section 3: General Awareness — J&K Hydrography (Rivers & Lakes)
* **Jhelum (Vitasta / Vyeth):** Origin: Verinag Spring (Anantnag). Flows through Wular Lake, Baramulla gorge into Pakistan. Tributaries: Lidder, Sind, Vishaw, Rambiara, Pohru. Projects: Uri-I, Uri-II, Lower Jhelum, Kishanganga.
* **Chenab (Asikni / Chandrabhaga):** Origin: Tandi (H.P., confluence of Chandra & Bhaga). Enters J&K at Padder (Kishtwar). Projects: Salal (Reasi), Baglihar (Ramban), Dul Hasti, Ratle, Pakal Dul.
* **Tawi (Surya Putri):** Origin: Kailash Kund (Bhaderwah). Flows through Jammu City (Bahu Fort).
* **Lakes:** Wular (Bandipora, largest freshwater in India, Ramsar), Dal (Srinagar, 4 basins), Manasbal (Ganderbal, deepest freshwater), Mansar & Surinsar (Jammu, composite Ramsar).

---

### Day 13 — Test Drill (5 Questions)
* Marking: +2 correct, -0.5 wrong, 0 skip. Target: 10 / 10 marks.

**Q1. Quantitative Aptitude (Boats & Streams: Stream Speed)**
A boat travels 40 km downstream in 2 hours and covers the exact same distance upstream in 5 hours. What is the speed of the stream?
A) 4 km/h
B) 6 km/h
C) 7 km/h
D) 8 km/h

**Q2. Quantitative Aptitude (Boats & Streams: Distance Determination)**
A man's speed with the current is 16 km/h, and the speed of the current is 4 km/h. If he takes a total of 6 hours to row to an outpost and return to his starting dock, find the one-way distance to that outpost.
A) 28 km
B) 32 km
C) 36 km
D) 40 km

**Q3. General Intelligence & Reasoning (Direction Sense: Radial Displacement)**
A patrolling officer starts from his station and drives 16 km West, turns South and drives 10 km, turns East and drives 8 km, and finally turns North and drives 4 km. How far is he from his initial police station in a straight line?
A) 8 km
B) 10 km
C) 12 km
D) 14 km

**Q4. General Intelligence & Reasoning (Direction Sense: Evening Shadow Trap)**
One evening just before sunset, Danish and Farooq were standing face-to-face talking to each other. If Danish observed that his own shadow fell exactly to his left, which direction was Farooq facing?
A) North
B) South
C) East
D) West

**Q5. General Awareness (J&K Hydrography: Infrastructure)**
The 900 MW Baglihar Hydroelectric Power Project, located in the Ramban district of Jammu & Kashmir, is constructed on which river?
A) Jhelum
B) Indus
C) Chenab
D) Ravi
`;

  let rawContent = DEFAULT_STRATEGY;
  let isServerAvailable = false;
  let lastMtime = 0;

  // Pre-configured structured metadata for Day 13
  const DAY13_DRILL = {
    id: "day13_drill",
    day: 13,
    title: "Day 13 — Masterclass Test Drill",
    description: "Boats & Streams, Direction Sense Test, and J&K Hydrography",
    targetScore: 10,
    questions: [
      {
        id: "D13_Q1",
        sec: "C",
        topic: "Boats & Streams: Stream Speed",
        q: "A boat travels 40 km downstream in 2 hours and covers the exact same distance upstream in 5 hours. What is the speed of the stream?",
        opts: ["4 km/h", "6 km/h", "7 km/h", "8 km/h"],
        ans: 1, // B
        exp: "Downstream speed D = 40/2 = 20 km/h. Upstream speed U = 40/5 = 8 km/h. Stream speed v = (D - U)/2 = (20 - 8)/2 = 6 km/h."
      },
      {
        id: "D13_Q2",
        sec: "C",
        topic: "Boats & Streams: Round Trip Distance",
        q: "A man's speed with the current is 16 km/h, and the speed of the current is 4 km/h. If he takes a total of 6 hours to row to an outpost and return to his starting dock, find the one-way distance to that outpost.",
        opts: ["28 km", "32 km", "36 km", "40 km"],
        ans: 1, // B
        exp: "Downstream D = 16 km/h, current v = 4 km/h => still water u = 16 - 4 = 12 km/h. Upstream U = 12 - 4 = 8 km/h. Total time: d/16 + d/8 = 6 => 3d/16 = 6 => d = (6 * 16)/3 = 32 km."
      },
      {
        id: "D13_Q3",
        sec: "A",
        topic: "Direction Sense: Radial Displacement",
        q: "A patrolling officer starts from his station and drives 16 km West, turns South and drives 10 km, turns East and drives 8 km, and finally turns North and drives 4 km. How far is he from his initial police station in a straight line?",
        opts: ["8 km", "10 km", "12 km", "14 km"],
        ans: 1, // B
        exp: "Net West-East displacement: 16 km West - 8 km East = 8 km West. Net South-North displacement: 10 km South - 4 km North = 6 km South. Straight-line distance d = √(8² + 6²) = √(64 + 36) = √100 = 10 km (Pythagorean 6-8-10 triplet)."
      },
      {
        id: "D13_Q4",
        sec: "A",
        topic: "Direction Sense: Evening Shadow Trap",
        q: "One evening just before sunset, Danish and Farooq were standing face-to-face talking to each other. If Danish observed that his own shadow fell exactly to his left, which direction was Farooq facing?",
        opts: ["North", "South", "East", "West"],
        ans: 0, // A
        exp: "In the evening, the Sun is in the West, so shadows fall toward the East. Danish's shadow is to his Left => Danish's Left = East. Facing South gives Right=West, Left=East. So Danish is facing South. Since Farooq is face-to-face with Danish, Farooq is facing North."
      },
      {
        id: "D13_Q5",
        sec: "B",
        topic: "J&K Hydrography: Infrastructure",
        q: "The 900 MW Baglihar Hydroelectric Power Project, located in the Ramban district of Jammu & Kashmir, is constructed on which river?",
        opts: ["Jhelum", "Indus", "Chenab", "Ravi"],
        ans: 2, // C
        exp: "The Baglihar Dam and 900 MW run-of-the-river power project is built on the Chenab River in Ramban district, Jammu & Kashmir."
      }
    ]
  };

  const DAY3_DRILL = {
    id: "day3_drill",
    day: 3,
    title: "Day 3 — Masterclass Test Drill",
    description: "Time & Work (LCM Method), Direction Sense (Shortest Path), Treaty of Amritsar",
    targetScore: 10,
    questions: [
      {
        id: "D3_Q1",
        sec: "C",
        topic: "Time & Work (LCM Unit Method)",
        q: "Rahul can complete a piece of work in 12 days, and Sahil can complete the same work in 24 days. If they work together, in how many days will they complete the total work?",
        opts: ["6 days", "8 days", "9 days", "12 days"],
        ans: 1, // B
        exp: "Total Work = LCM(12, 24) = 24 units. Rahul efficiency = 24 / 12 = 2 units/day. Sahil efficiency = 24 / 24 = 1 unit/day. Combined rate = 2 + 1 = 3 units/day. Days required = 24 / 3 = 8 days."
      },
      {
        id: "D3_Q2",
        sec: "C",
        topic: "Time & Work (Efficiency & LCM)",
        q: "A, B, and C can complete a task in 10, 12, and 15 days respectively. What is their 'Total Work' unit value (the LCM of their completion days)?",
        opts: ["30 units", "120 units", "60 units", "90 units"],
        ans: 2, // C
        exp: "LCM of 10, 12, and 15 is 60. Efficiencies: A = 60/10 = 6 u/d, B = 60/12 = 5 u/d, C = 60/15 = 4 u/d. Total = 15 u/d (together they finish in 60 / 15 = 4 days)."
      },
      {
        id: "D3_Q3",
        sec: "A",
        topic: "Direction Sense (Pythagorean Triplets)",
        q: "Ravi walks 6 km towards the East. He then takes a left turn and walks 8 km towards the North. What is the shortest straight-line distance between his current position and his starting point?",
        opts: ["10 km", "14 km", "12 km", "15 km"],
        ans: 0, // A
        exp: "Shortest distance = √(6² + 8²) = √(36 + 64) = √100 = 10 km (classic 6-8-10 Pythagorean triplet)."
      },
      {
        id: "D3_Q4",
        sec: "B",
        topic: "J&K History (Treaty of Amritsar Date)",
        q: "The historic Treaty of Amritsar, which established Dogra rule in Jammu and Kashmir, was signed on which exact date?",
        opts: ["March 16, 1846", "August 15, 1847", "October 26, 1947", "March 16, 1857"],
        ans: 0, // A
        exp: "The Treaty of Amritsar was executed on March 16, 1846 between the British East India Company and Maharaja Gulab Singh."
      },
      {
        id: "D3_Q5",
        sec: "B",
        topic: "J&K History (Treaty of Amritsar Amount)",
        q: "Under the Treaty of Amritsar, Maharaja Gulab Singh acquired the Kashmir territory from the British East India Company for what financial compensation?",
        opts: ["50 Lakh Nanakshahi Rupees", "75 Lakh Nanakshahi Rupees", "1 Crore Nanakshahi Rupees", "100 Lakh British Pounds"],
        ans: 1, // B
        exp: "Article 3 of the Treaty of Amritsar stipulated payment of 75 Lakh Nanakshahi Rupees (7.5 million rupees) to the British government."
      }
    ]
  };

  const DAY2_DRILL = {
    id: "day2_drill",
    day: 2,
    title: "Day 2 — Masterclass Test Drill",
    description: "Successive Discounts, Dishonest Dealer Traps, Buy X Get Y Free, and J&K Reorganisation",
    targetScore: 10,
    questions: [
      {
        id: "D2_Q1",
        sec: "C",
        topic: "3 Successive Discounts",
        q: "Find the single equivalent discount percentage for three successive discounts of 20%, 25%, and 10%.",
        opts: ["55.0%", "46.0%", "45.0%", "50.0%"],
        ans: 1, // B
        exp: "Effective price = 100 × (1 - 0.20) × (1 - 0.25) × (1 - 0.10) = 100 × 0.8 × 0.75 × 0.9 = 54. Single equivalent discount = 100 - 54 = 46.0%."
      },
      {
        id: "D2_Q2",
        sec: "C",
        topic: "Dishonest Dealer False Weights",
        q: "A dishonest shopkeeper professes to sell his goods at cost price, but he uses a false weight of 800 g instead of a 1 kg weight. What is his actual profit percentage?",
        opts: ["20.0%", "25.0%", "11.11%", "33.33%"],
        ans: 1, // B
        exp: "Gain % = (Error / (True Value - Error)) × 100 = (200 / 800) × 100 = (1 / 4) × 100 = 25.0%. Trap: divide by the goods actually given (800g), not 1000g."
      },
      {
        id: "D2_Q3",
        sec: "C",
        topic: "Buy X Get Y Free Traps",
        q: "A footwear brand offers a sale: 'Buy 5 Pairs, Get 3 Pairs Free'. What is the actual discount percentage given to the customer?",
        opts: ["60.0%", "40.0%", "37.5%", "33.33%"],
        ans: 2, // C
        exp: "Discount % = (Free Items / Total Items) × 100 = (3 / (5 + 3)) × 100 = (3 / 8) × 100 = 37.5%."
      },
      {
        id: "D2_Q4",
        sec: "A",
        topic: "Syllogisms (Minimal Overlap Rule)",
        q: "In categorical syllogisms, which diagramming rule must strictly be followed to test whether a conclusion definitely follows?",
        opts: ["Draw the maximum overlap diagram", "Draw the minimal overlap diagram", "Assume all possibilities are facts", "Ignore negative statements"],
        ans: 1, // B
        exp: "Always draw the minimal overlap diagram. A definite conclusion must be valid in the minimal case; if it requires an unstated assumption, it is false."
      },
      {
        id: "D2_Q5",
        sec: "B",
        topic: "J&K Reorganisation Act (Section 3)",
        q: "Under Section 3 of the Jammu and Kashmir Reorganisation Act 2019, which Union Territory was established without a Legislative Assembly?",
        opts: ["Jammu & Kashmir", "Ladakh", "Chandigarh", "Puducherry"],
        ans: 1, // B
        exp: "Section 3 created the Union Territory of Ladakh (Kargil and Leh districts) without a legislature. Section 4 created the Union Territory of Jammu and Kashmir with a legislative assembly."
      }
    ]
  };

  const DAY1_DRILL = {
    id: "day1_drill",
    day: 1,
    title: "Day 1 — Micro-Quiz (Quantitative & Reasoning)",
    description: "Profit/Loss Fractions, Successive Discounts, and Reverse Coding",
    targetScore: 10,
    questions: [
      {
        id: "D1_Q1",
        sec: "C",
        topic: "Profit & Loss (Fraction Shortcut)",
        q: "An article is sold at a profit of 12.5%. If the cost price of the article is ₹560, what is the selling price?",
        opts: ["₹620", "₹630", "₹640", "₹650"],
        ans: 1, // B
        exp: "12.5% = 1/8. Profit = 560 × 1/8 = ₹70. Selling Price = ₹560 + ₹70 = ₹630."
      },
      {
        id: "D1_Q2",
        sec: "C",
        topic: "Successive Discount Shortcut",
        q: "A shopkeeper announces two successive discounts of 15% and 10% on a product. What is the single equivalent discount percentage?",
        opts: ["22.5%", "23.5%", "24.5%", "25%"],
        ans: 1, // B
        exp: "Equivalent discount = a + b - (ab/100) = 15 + 10 - (150/100) = 25 - 1.5 = 23.5%."
      },
      {
        id: "D1_Q3",
        sec: "A",
        topic: "Letter Coding (Reverse Alphabet)",
        q: "If CAT is coded as XZG in a certain code, how will DOG be coded?",
        opts: ["WLT", "WLS", "VLT", "WKS"],
        ans: 0, // A
        exp: "Opposite letters sum to 27: D(4) → W(23), O(15) → L(12), G(7) → T(20). So DOG → WLT."
      },
      {
        id: "D1_Q4",
        sec: "B",
        topic: "J&K Reorganisation Timeline",
        q: "On which date did the Jammu and Kashmir Reorganisation Act 2019 officially come into force?",
        opts: ["August 5, 2019", "August 9, 2019", "October 31, 2019", "January 26, 2020"],
        ans: 2, // C
        exp: "The Act received Presidential assent on August 9, 2019, and officially came into force on October 31, 2019 (National Unity Day, birth anniversary of Sardar Vallabhbhai Patel)."
      },
      {
        id: "D1_Q5",
        sec: "A",
        topic: "Coding Shift Pattern",
        q: "If MASTER is coded as OCUVGT in a certain code language, how will DOCTOR be coded?",
        opts: ["FQEVQT", "FQEVSV", "EPEVSV", "FQDVQT"],
        ans: 1, // B
        exp: "Shift pattern is +2 for every letter: D(+2)→F, O(+2)→Q, C(+2)→E, T(+2)→V, O(+2)→Q... wait: O(+2)→Q, R(+2)→T. So DOCTOR → FQEVQT."
      }
    ]
  };

  async function syncFromServer() {
    try {
      const res = await fetch("/api/strategy");
      if (res.ok) {
        const data = await res.json();
        if (data.content && data.content.trim().length > 0) {
          rawContent = data.content;
          lastMtime = data.mtime;
          isServerAvailable = true;
          return rawContent;
        }
      }
    } catch (e) {
      // Local server not running or file:// mode
      isServerAvailable = false;
    }
    return rawContent;
  }

  async function saveToServer(content) {
    rawContent = content;
    try {
      const res = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });
      if (res.ok) {
        isServerAvailable = true;
        return { success: true, localOnly: false };
      }
    } catch (e) {
      // Server offline
    }
    return { success: true, localOnly: true };
  }

  function getDrill(drillId) {
    const planDay = StudyPlan?.DAYS?.find(d => drillId === d.id || drillId === `${d.id}_drill` || drillId === `day${d.day}`);
    if (planDay) return buildPlanDrill(planDay);
    if (drillId === "day1_drill" || drillId === "day1") return DAY1_DRILL;
    if (drillId === "day2_drill" || drillId === "day2") return DAY2_DRILL;
    if (drillId === "day3_drill" || drillId === "day3") return DAY3_DRILL;
    return DAY13_DRILL;
  }

  function getAllDrills() {
    if (window.StudyPlan) return StudyPlan.DAYS.map(buildPlanDrill);
    return [DAY13_DRILL, DAY3_DRILL, DAY2_DRILL, DAY1_DRILL];
  }

  function stableNumber(value) {
    let h = 2166136261;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function buildPlanDrill(day) {
    const wantedSections = Object.keys(day.sections);
    const wantedTopics = new Set(Object.values(day.sections).flat());
    const picked = [];
    const baseQuota = Math.floor(DAILY_DRILL_SIZE / wantedSections.length);
    const remainder = DAILY_DRILL_SIZE % wantedSections.length;

    wantedSections.forEach((sec, index) => {
      const quota = baseQuota + (index < remainder ? 1 : 0);
      const sectionPool = window.BANK
        .filter(q => q.sec === sec)
        .sort((a, b) => {
          const aExact = wantedTopics.has(a.topic) ? 0 : 1;
          const bExact = wantedTopics.has(b.topic) ? 0 : 1;
          return aExact - bExact || stableNumber(`${day.id}:${a.id}`) - stableNumber(`${day.id}:${b.id}`);
        });
      for (const question of sectionPool) {
        if (picked.filter(item => item.sec === sec).length >= quota) break;
        if (!picked.includes(question)) picked.push(question);
      }
    });

    if (picked.length < DAILY_DRILL_SIZE) {
      const fill = window.BANK
        .filter(q => wantedSections.includes(q.sec) && !picked.includes(q))
        .sort((a, b) => stableNumber(`${day.id}:fill:${a.id}`) - stableNumber(`${day.id}:fill:${b.id}`));
      picked.push(...fill.slice(0, DAILY_DRILL_SIZE - picked.length));
    }

    const maxScore = picked.length * 2;
    return {
      id: `${day.id}_drill`, day: day.day, date: day.date,
      title: `Masterclass Day ${day.masterclassDay || day.day} — ${day.title} Drill`,
      description: day.focus,
      targetScore: Math.round(maxScore * 0.9),
      questions: picked
    };
  }

  function fallbackLesson(day) {
    const sections = StudyPlan.labels(day).map((line, i) => `### Section ${i + 1}: ${line}\n\n**Core concept:** Learn the definitions and rules first, then connect them to common JKSSB question patterns.\n\n**Quick method:** Write the minimum working steps, eliminate impossible options, and protect marks under negative marking.\n\n**Level 1 → Level 4:** Start with direct recall, progress to one-step application, then mixed application, and finish with an examiner-trap question.\n\n**Examiner trap:** Do not answer from familiarity alone; verify the exact condition in the question.`).join("\n\n---\n\n");
    return `### 🚀 DAY ${day.masterclassDay || day.day} MASTERCLASS: ${day.title}\n\nToday's skill sections follow 4 Progressive Difficulty Levels with detailed step-by-step examples, shortcut formulas, and examiner traps.\n\n${sections}\n\n---\n\n### Day ${day.masterclassDay || day.day} — Test Drill (20 Questions)\n\n* **Marking Scheme:** **+2 marks** correct, **-0.5 marks** incorrect, **0 marks** skipped.\n\n* **Target:** **36 / 40 marks**.`;
  }

  async function getLesson(day, force = false) {
    const cache = Store.state.masterclass.lessonCache || (Store.state.masterclass.lessonCache = {});
    const cached = cache[day.id];
    if (!force && cached && cached.version === LESSON_FORMAT_VERSION && cached.text) {
      return { success: true, text: cached.text, cached: true, provider: cached.provider, model: cached.model, researchStatus: cached.researchStatus, warning: cached.warning };
    }
    try {
      const settings = Store.state.aiSettings || {};
      const requestDay = { ...day, topicLabels: StudyPlan.labels(day) };
      const res = await fetch("/api/masterclass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: requestDay, provider: "openai", model: settings.model?.startsWith("gpt-") ? settings.model : "" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      const lessonText = data.text;
      cache[day.id] = {
        version: LESSON_FORMAT_VERSION, text: lessonText, provider: data.provider, model: data.model,
        researchStatus: data.researchStatus, warning: data.warning, generatedAt: Date.now()
      };
      Store.save();
      return { success: true, text: lessonText, provider: data.provider, model: data.model, researchStatus: data.researchStatus, warning: data.warning };
    } catch (error) {
      const text = fallbackLesson(day);
      return { success: false, text, error: error.message };
    }
  }

  function recordDrillScore(drillId, score, answers, maxScore = 10) {
    const st = Store.state;
    if (!st.masterclass) st.masterclass = { completedDrills: {}, activeDay: 13 };
    
    st.masterclass.completedDrills[drillId] = {
      score,
      maxScore,
      answers,
      date: Store.today(),
      timestamp: Date.now()
    };

    const match = window.StudyPlan?.DAYS?.find(d => `${d.id}_drill` === drillId);
    if (match) st.masterclass.activeDay = Math.min(StudyPlan.DAYS.length, match.day + 1);

    // Award XP: 10 XP per mark earned
    const xp = Math.max(5, Math.round(score * 10));
    st.profile.xp = (st.profile.xp || 0) + xp;
    Store.touchDay();
    Store.save();
    return xp;
  }

  window.Masterclass = {
    get rawContent() { return rawContent; },
    get isServerAvailable() { return isServerAvailable; },
    get lastMtime() { return lastMtime; },
    syncFromServer,
    saveToServer,
    getDrill,
    getAllDrills,
    buildPlanDrill,
    getLesson,
    fallbackLesson,
    recordDrillScore,
    DAY13_DRILL,
    DAY1_DRILL
  };

  // Initial sync attempt
  syncFromServer();
})();
