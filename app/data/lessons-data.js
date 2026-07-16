/* lessons-data.js — animated step-through lessons. Each step: {svg, text}. */
window.LESSONS = [];

// ---------- helper builders (kept local to this file) ----------
function svgWrap(inner, vb) { return `<svg viewBox="${vb || "0 0 400 260"}" width="100%" style="max-width:420px">${inner}</svg>`; }

window.LESSONS.push({
  id: "venn-basics", sec: "A", title: "Venn Diagrams: reading overlaps", drill: "venn",
  steps: [
    { svg: svgWrap(`<circle class="draw-in" cx="150" cy="130" r="80" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <text x="150" y="60" text-anchor="middle" fill="var(--text)" font-size="16">Doctors</text>`),
      text: "Start with one circle: it represents a group — say, all Doctors." },
    { svg: svgWrap(`<circle cx="150" cy="130" r="80" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <text x="150" y="60" text-anchor="middle" fill="var(--text)" font-size="16">Doctors</text>
      <circle class="draw-in" cx="230" cy="130" r="80" fill="none" stroke="var(--chinar)" stroke-width="3"/>
      <text x="290" y="60" text-anchor="middle" fill="var(--text)" font-size="16">Fathers</text>`),
      text: "Add a second circle for 'Fathers'. Where the circles overlap = doctors who are also fathers." },
    { svg: svgWrap(`<circle cx="150" cy="130" r="80" fill="var(--ink)" fill-opacity=".12" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="230" cy="130" r="80" fill="var(--chinar)" fill-opacity=".12" stroke="var(--chinar)" stroke-width="3"/>
      <text x="150" y="60" text-anchor="middle" fill="var(--text)" font-size="16">Doctors</text>
      <text x="290" y="60" text-anchor="middle" fill="var(--text)" font-size="16">Fathers</text>
      <text class="pop-in" x="190" y="135" text-anchor="middle" fill="var(--key)" font-size="14" font-weight="700">overlap</text>`),
      text: "The shaded lens shape is the KEY zone in every exam question — it means 'both'. Circle-only regions mean 'only one', never both." },
    { svg: svgWrap(`<circle cx="130" cy="120" r="70" fill="var(--ink)" fill-opacity=".1" stroke="var(--ink)" stroke-width="2.5"/>
      <circle cx="200" cy="120" r="70" fill="var(--chinar)" fill-opacity=".1" stroke="var(--chinar)" stroke-width="2.5"/>
      <circle cx="165" cy="180" r="70" fill="var(--key)" fill-opacity=".1" stroke="var(--key)" stroke-width="2.5"/>
      <text x="90" y="55" font-size="13" fill="var(--text)">Doctors</text>
      <text x="220" y="55" font-size="13" fill="var(--text)">Men</text>
      <text x="140" y="245" font-size="13" fill="var(--text)">Fathers</text>`),
      text: "For THREE groups (e.g. Doctors, Men, Fathers), draw three overlapping circles. The exam usually asks: which small region = 'both A and C but not B'? Trace only that lens." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" fill="var(--chinar)" font-size="18" font-weight="700">Exam rule of thumb</text>
      <text x="30" y="100" fill="var(--text)" font-size="14">• All A are B → smaller circle fully INSIDE bigger one</text>
      <text x="30" y="135" fill="var(--text)" font-size="14">• Some A are B → circles PARTIALLY overlap</text>
      <text x="30" y="170" fill="var(--text)" font-size="14">• No A is B → circles are SEPARATE</text>
      <text x="30" y="205" fill="var(--text)" font-size="14">• 3 unrelated categories → 3 separate circles</text>`),
      text: "Memorise these four shapes — every Venn question in the syllabus reduces to picking one of them." }
  ]
});

window.LESSONS.push({
  id: "coding-shift", sec: "A", title: "Coding-Decoding: the letter-shift trick", drill: "coding",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="20" fill="var(--text)" font-weight="700">CAT → DBU</text>
      <text x="200" y="110" text-anchor="middle" font-size="14" fill="var(--muted)">Each letter moved forward by 1</text>`),
      text: "In letter-coding, every letter usually shifts by a fixed number of positions in the alphabet." },
    { svg: svgWrap(`<text x="30" y="60" font-size="18" fill="var(--ink)">C</text><text x="60" y="60" font-size="18" fill="var(--muted)">→</text><text x="90" y="60" font-size="18" fill="var(--key)">D</text>
      <text x="30" y="100" font-size="18" fill="var(--ink)">A</text><text x="60" y="100" font-size="18" fill="var(--muted)">→</text><text x="90" y="100" font-size="18" fill="var(--key)">B</text>
      <text x="30" y="140" font-size="18" fill="var(--ink)">T</text><text x="60" y="140" font-size="18" fill="var(--muted)">→</text><text x="90" y="140" font-size="18" fill="var(--key)">U</text>
      <text x="180" y="100" font-size="14" fill="var(--chinar)">+1 to every letter</text>`),
      text: "Find the shift from ONE given pair first (here: C→D is +1). Confirm it with a second letter before trusting it." },
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="18" fill="var(--text)">Now code EXAM with the same +1 shift:</text>
      <text x="60" y="120" font-size="20" fill="var(--ink)">E X A M</text>
      <text x="60" y="160" font-size="20" fill="var(--key)" class="fade-step">F Y B N</text>`),
      text: "Apply the SAME shift to the new word, letter by letter: E→F, X→Y, A→B, M→N = FYBN." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">Watch for these variants</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">• Reverse-shift: some letters +k, alternate ones −k</text>
      <text x="20" y="130" font-size="13" fill="var(--text)">• Whole-word reversal before/after shifting</text>
      <text x="20" y="165" font-size="13" fill="var(--text)">• Numeric coding: A=1...Z=26, then add/subtract</text>
      <text x="20" y="200" font-size="13" fill="var(--text)">Always verify your rule on BOTH given words before answering.</text>`),
      text: "Exam setters like to disguise the same trick — verify your rule twice, then apply once." }
  ]
});

window.LESSONS.push({
  id: "series-patterns", sec: "A", title: "Number Series: 4 pattern families", drill: "series",
  steps: [
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">1. Arithmetic (constant difference)</text>
      <text x="60" y="100" font-size="20" fill="var(--text)">3   6   9   12   ?</text>
      <text x="60" y="140" font-size="14" fill="var(--ink)">+3  +3  +3   +3</text>`),
      text: "First, always write the differences BETWEEN consecutive terms. If they're constant, it's arithmetic — just add the same gap again." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">2. Growing differences</text>
      <text x="60" y="100" font-size="20" fill="var(--text)">2   4   8   14   ?</text>
      <text x="60" y="140" font-size="14" fill="var(--ink)">+2  +4  +6   +8</text>`),
      text: "If differences themselves form a pattern (here: +2,+4,+6...), extend THAT pattern first, then add it to the last term." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">3. Geometric (constant ratio)</text>
      <text x="60" y="100" font-size="20" fill="var(--text)">3   6   12   24   ?</text>
      <text x="60" y="140" font-size="14" fill="var(--ink)">×2  ×2  ×2   ×2</text>`),
      text: "If each term is a fixed MULTIPLE of the last, it's geometric — multiply again for the next term." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">4. Squares / cubes hidden in disguise</text>
      <text x="60" y="100" font-size="20" fill="var(--text)">1   4   9   16   ?</text>
      <text x="60" y="140" font-size="14" fill="var(--ink)">1² 2² 3² 4²  5²=25</text>`),
      text: "If numbers look 'random' but grow fast, check if they're perfect squares or cubes in order." },
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="15" fill="var(--text)">Exam strategy: try in this order —</text>
      <text x="40" y="105" font-size="14" fill="var(--text)">1) constant diff → 2) changing diff</text>
      <text x="40" y="135" font-size="14" fill="var(--text)">3) constant ratio → 4) squares/cubes</text>
      <text x="40" y="165" font-size="14" fill="var(--text)">5) alternate/Fibonacci-style sums</text>`),
      text: "Run through these five checks in order — one of them will click within seconds on almost every series question." }
  ]
});

window.LESSONS.push({
  id: "percentage-shortcuts", sec: "C", title: "Percentage: the mental-math shortcut", drill: "percentage",
  steps: [
    { svg: svgWrap(`<text x="200" y="70" text-anchor="middle" font-size="20" fill="var(--text)" font-weight="700">x% of y = y% of x</text>
      <text x="200" y="110" text-anchor="middle" font-size="14" fill="var(--muted)">Same answer, pick whichever is easier to compute</text>`),
      text: "The most useful percentage identity: x% of y always equals y% of x. Swap them to make the arithmetic easier." },
    { svg: svgWrap(`<text x="60" y="60" font-size="18" fill="var(--text)">Find 8% of 25</text>
      <text x="60" y="110" font-size="18" fill="var(--muted)">Hard way: 25 × 8 ÷ 100 = 2</text>
      <text x="60" y="150" font-size="18" fill="var(--key)">Easy way: 25% of 8 = 2</text>`),
      text: "Example: 8% of 25 is awkward, but 25% of 8 (a quarter of 8) is instant mental math — both give 2." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Memorise these fraction equivalents</text>
      <text x="30" y="80" font-size="14" fill="var(--text)">50% = 1/2      25% = 1/4      12.5% = 1/8</text>
      <text x="30" y="110" font-size="14" fill="var(--text)">33.3% = 1/3    20% = 1/5      10% = 1/10</text>
      <text x="30" y="140" font-size="14" fill="var(--text)">75% = 3/4      66.6% = 2/3</text>`),
      text: "Converting a percentage to its fraction is almost always faster than multiplying decimals under exam pressure." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Successive % change formula</text>
      <text x="30" y="95" font-size="15" fill="var(--ink)">Net change = a + b + (a×b)/100</text>
      <text x="30" y="135" font-size="13" fill="var(--muted)">Use negative sign for a decrease.</text>
      <text x="30" y="165" font-size="13" fill="var(--muted)">E.g. +10% then −10% → 10 − 10 − 1 = −1% (a net LOSS, not zero!)</text>`),
      text: "Never just add two successive percentage changes — the cross term (a×b)/100 always makes the answer different from a simple sum." }
  ]
});

window.LESSONS.push({
  id: "profit-loss-map", sec: "C", title: "Profit & Loss: the CP-SP-MP triangle", drill: "profit",
  steps: [
    { svg: svgWrap(`<polygon class="draw-in" points="200,40 90,200 310,200" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <text x="200" y="30" text-anchor="middle" font-size="15" fill="var(--chinar)">MP (Marked Price)</text>
      <text x="70" y="220" font-size="15" fill="var(--ink)">CP (Cost Price)</text>
      <text x="270" y="220" font-size="15" fill="var(--key)">SP (Selling Price)</text>`),
      text: "Every profit-loss question connects three values: Cost Price (what the shop paid), Marked Price (the sticker), and Selling Price (what the customer actually pays)." },
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="17" fill="var(--text)">SP = MP − Discount</text>
      <text x="200" y="110" text-anchor="middle" font-size="17" fill="var(--text)">SP = CP + Profit</text>
      <text x="200" y="160" text-anchor="middle" font-size="14" fill="var(--muted)">Discount % is always on MP. Profit % is always on CP.</text>`),
      text: "The single most common exam trap: discount percentage is calculated on MP, but profit percentage is calculated on CP — never mix the two bases." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">Quick formulas</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">SP = CP × (100 + profit%) / 100</text>
      <text x="30" y="130" font-size="14" fill="var(--text)">CP = SP × 100 / (100 + profit%)</text>
      <text x="30" y="165" font-size="14" fill="var(--text)">SP = MP × (100 − discount%) / 100</text>`),
      text: "These three formulas cover almost every direct profit/loss/discount question in the paper." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Successive discounts trap</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">10% then 10% ≠ 20% discount</text>
      <text x="30" y="130" font-size="14" fill="var(--key)">Real effect = 10+10 − (10×10)/100 = 19%</text>`),
      text: "Two successive discounts never simply add up — use the same 'a + b − ab/100' rule from the percentage lesson." }
  ]
});

window.LESSONS.push({
  id: "time-work-pipes", sec: "C", title: "Time & Work: think in 'rate per day'", drill: "work",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="17" fill="var(--text)">A finishes a job in 12 days.</text>
      <text x="200" y="110" text-anchor="middle" font-size="20" fill="var(--key)" font-weight="700">A's 1-day rate = 1/12 of the job</text>`),
      text: "The golden rule: convert 'total days' into 'work done per day' — a fraction of the whole job." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)">A: 1/12 per day    B: 1/24 per day</text>
      <text x="200" y="100" text-anchor="middle" font-size="18" fill="var(--ink)" class="fade-step">Together: 1/12 + 1/24 = 3/24 = 1/8 per day</text>
      <text x="200" y="150" text-anchor="middle" font-size="18" fill="var(--key)" font-weight="700">Time together = 8 days</text>`),
      text: "To combine workers, ADD their daily rates — never add the number of days directly." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">Pipes & leaks work the same way</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">A filling pipe: positive rate (+1/f)</text>
      <text x="30" y="125" font-size="14" fill="var(--text)">A leak/emptying pipe: negative rate (−1/e)</text>
      <text x="30" y="160" font-size="14" fill="var(--key)">Net rate = 1/f − 1/e</text>`),
      text: "Pipes-and-cisterns questions are identical to work questions — just give leaks a negative rate." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">M×D = M×D shortcut</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">Men₁ × Days₁ = Men₂ × Days₂</text>
      <text x="30" y="130" font-size="13" fill="var(--muted)">(assuming the same total work and equal individual efficiency)</text>`),
      text: "For 'more workers, fewer days' questions, this single cross-multiplication solves it in one line." }
  ]
});

window.LESSONS.push({
  id: "circle-theorems", sec: "E", title: "Circle Geometry: the 3 facts that answer everything", drill: "geometry",
  steps: [
    { svg: svgWrap(`<circle class="draw-in" cx="200" cy="130" r="90" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <line x1="200" y1="130" x2="290" y2="130" stroke="var(--chinar)" stroke-width="3"/>
      <line x1="290" y1="130" x2="330" y2="80" stroke="var(--key)" stroke-width="3"/>
      <text x="310" y="70" font-size="20" fill="var(--key)">90°</text>`),
      text: "Fact 1: A tangent is always perpendicular (90°) to the radius at the point where it touches the circle." },
    { svg: svgWrap(`<circle cx="200" cy="130" r="90" fill="none" stroke="var(--line)" stroke-width="2"/>
      <line x1="110" y1="130" x2="290" y2="130" stroke="var(--ink)" stroke-width="3"/>
      <line x1="110" y1="130" x2="200" y2="60" stroke="var(--chinar)" stroke-width="2.5"/>
      <line x1="290" y1="130" x2="200" y2="60" stroke="var(--chinar)" stroke-width="2.5"/>
      <text x="185" y="45" font-size="18" fill="var(--key)" font-weight="700">90°</text>`),
      text: "Fact 2: Any angle drawn in a semicircle (from the two ends of a diameter to any point on the circle) is always 90°." },
    { svg: svgWrap(`<circle cx="200" cy="130" r="90" fill="none" stroke="var(--line)" stroke-width="2"/>
      <line x1="150" y1="60" x2="200" y2="130" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4"/>
      <line x1="250" y1="60" x2="200" y2="130" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4"/>
      <line x1="150" y1="60" x2="150" y2="210" stroke="var(--chinar)" stroke-width="2.5"/>
      <line x1="250" y1="60" x2="150" y2="210" stroke="var(--chinar)" stroke-width="2.5"/>
      <text x="185" y="120" font-size="15" fill="var(--key)" font-weight="700">2×</text>
      <text x="130" y="245" font-size="15" fill="var(--ink)">1×</text>`),
      text: "Fact 3: The angle an arc makes at the CENTRE is always double the angle it makes at any point on the remaining circumference." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Bonus: tangent-length rule</text>
      <text x="30" y="100" font-size="14" fill="var(--text)">Two tangents from the SAME external point</text>
      <text x="30" y="130" font-size="14" fill="var(--text)">to a circle are always EQUAL in length.</text>`),
      text: "These four facts alone answer the vast majority of J&K SI circle-geometry questions." }
  ]
});

window.LESSONS.push({
  id: "trig-table", sec: "E", title: "Trigonometry: build the table, don't memorise it", drill: "trigonometry",
  steps: [
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Step 1: write 0,1,2,3,4 under sin</text>
      <text x="40" y="90" font-size="16" fill="var(--text)">sin:   0   1   2   3   4</text>`),
      text: "Trick: write the numbers 0,1,2,3,4 in a row — these become the 'sin' row after one small step." },
    { svg: svgWrap(`<text x="40" y="60" font-size="16" fill="var(--text)">sin:  √0/2  √1/2  √2/2  √3/2  √4/2</text>
      <text x="40" y="100" font-size="16" fill="var(--key)">    =  0    1/2   1/√2  √3/2   1</text>`),
      text: "Step 2: divide each by 4 and take the square root — that gives sin 0°,30°,45°,60°,90° exactly." },
    { svg: svgWrap(`<text x="40" y="60" font-size="15" fill="var(--text)">cos = reverse of sin row:</text>
      <text x="40" y="100" font-size="16" fill="var(--ink)">cos: 1   √3/2   1/√2   1/2   0</text>`),
      text: "Step 3: cos values are just the sin row written backwards — 90°'s sin becomes 0°'s cos, and so on." },
    { svg: svgWrap(`<text x="40" y="60" font-size="16" fill="var(--text)">tan = sin ÷ cos</text>
      <text x="40" y="100" font-size="16" fill="var(--key)">tan: 0   1/√3   1   √3   undefined</text>`),
      text: "Step 4: tan is simply sin divided by cos at each angle. tan 90° is undefined because cos 90° = 0." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Why memorise the build, not the table?</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">If you forget one value under exam pressure,</text>
      <text x="30" y="125" font-size="14" fill="var(--text)">you can rebuild the whole table in 20 seconds</text>
      <text x="30" y="155" font-size="14" fill="var(--text)">using just this 0-1-2-3-4 trick.</text>`),
      text: "This method is more reliable than rote memorisation because you can regenerate any forgotten value instantly." }
  ]
});

window.LESSONS.push({
  id: "memory-hierarchy", sec: "F", title: "Computer Memory: the speed-vs-size ladder", drill: "basics",
  steps: [
    { svg: svgWrap(`<rect x="130" y="30" width="140" height="30" fill="var(--neg)" fill-opacity=".25" stroke="var(--neg)"/>
      <text x="200" y="50" text-anchor="middle" font-size="13" fill="var(--text)">CPU Registers — fastest, tiniest</text>
      <rect x="110" y="70" width="180" height="30" fill="var(--chinar)" fill-opacity=".2" stroke="var(--chinar)"/>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--text)">Cache Memory</text>
      <rect x="90" y="110" width="220" height="30" fill="var(--ink)" fill-opacity=".2" stroke="var(--ink)"/>
      <text x="200" y="130" text-anchor="middle" font-size="13" fill="var(--text)">RAM (volatile)</text>
      <rect x="60" y="150" width="280" height="30" fill="var(--key)" fill-opacity=".2" stroke="var(--key)"/>
      <text x="200" y="170" text-anchor="middle" font-size="13" fill="var(--text)">Hard Disk / SSD (secondary storage)</text>`),
      text: "Picture memory as a pyramid: the smaller and faster the level, the closer it sits to the CPU. Registers > Cache > RAM > Disk." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">The exam's favourite trap</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">RAM = volatile → wiped on power loss</text>
      <text x="30" y="130" font-size="14" fill="var(--text)">ROM / Hard disk / SSD = non-volatile → survives power loss</text>`),
      text: "Nearly every 'what happens when power goes off' question tests exactly this one distinction." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Unit ladder (each ×1024 of the last)</text>
      <text x="40" y="95" font-size="15" fill="var(--ink)">Bit → Byte(8 bits) → KB → MB → GB → TB</text>`),
      text: "Remember: each unit is 1024× the previous one, not 1000× — a common wrong-option trap in the exam." }
  ]
});

window.LESSONS.push({
  id: "lcm-hcf", sec: "C", title: "LCM & HCF: the factor-tree method", drill: "numbers",
  steps: [
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="16" fill="var(--text)">Find LCM and HCF of 12 and 18</text>
      <text x="60" y="90" font-size="16" fill="var(--ink)">12 = 2 × 2 × 3</text>
      <text x="60" y="130" font-size="16" fill="var(--chinar)">18 = 2 × 3 × 3</text>`),
      text: "Step 1: break both numbers into their prime factors." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">HCF = product of COMMON prime factors (lowest power)</text>
      <text x="60" y="90" font-size="16" fill="var(--text)">Common: one 2, one 3</text>
      <text x="60" y="130" font-size="18" fill="var(--key)" font-weight="700">HCF = 2 × 3 = 6</text>`),
      text: "HCF takes only the factors BOTH numbers share, at their lowest common power." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">LCM = product of ALL prime factors (highest power)</text>
      <text x="60" y="90" font-size="16" fill="var(--text)">All factors seen: 2² , 3²</text>
      <text x="60" y="130" font-size="18" fill="var(--key)" font-weight="700">LCM = 4 × 9 = 36</text>`),
      text: "LCM takes every prime factor that appears in EITHER number, at its highest power." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Instant cross-check</text>
      <text x="40" y="95" font-size="16" fill="var(--ink)">LCM × HCF = Product of the two numbers</text>
      <text x="40" y="130" font-size="15" fill="var(--muted)">36 × 6 = 216 = 12 × 18 ✓</text>`),
      text: "Always verify with this identity — if LCM × HCF ≠ the product of the two numbers, you made an arithmetic slip." }
  ]
});

window.LESSONS.push({
  id: "analogies-map", sec: "A", title: "Analogies: name the relationship first", drill: "analogies",
  steps: [
    { svg: svgWrap(`<text x="200" y="70" text-anchor="middle" font-size="20" fill="var(--text)" font-weight="700">Book : Library :: Curd : ?</text>
      <text x="200" y="110" text-anchor="middle" font-size="14" fill="var(--muted)">Don't guess the answer first — name the LINK.</text>`),
      text: "Every analogy hides a relationship. Before looking at options, ask: 'how does Book connect to Library?'" },
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--chinar)" font-weight="700">Link: 'is stored/found in'</text>
      <text x="200" y="110" text-anchor="middle" font-size="17" fill="var(--key)">Curd is stored/found in → Dairy</text>`),
      text: "A Book is found in a Library. Apply the SAME link to Curd: where is curd found? A Dairy." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">The 8 common relationship types</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">1. Part-Whole (Wheel : Car)</text>
      <text x="20" y="105" font-size="13" fill="var(--text)">2. Function (Pen : Write)</text>
      <text x="20" y="130" font-size="13" fill="var(--text)">3. Cause-Effect (Fire : Smoke)</text>
      <text x="20" y="155" font-size="13" fill="var(--text)">4. Category (Rose : Flower)</text>
      <text x="220" y="80" font-size="13" fill="var(--text)">5. Degree (Warm : Hot)</text>
      <text x="220" y="105" font-size="13" fill="var(--text)">6. Antonym (Day : Night)</text>
      <text x="220" y="130" font-size="13" fill="var(--text)">7. Worker-Tool (Painter : Brush)</text>
      <text x="220" y="155" font-size="13" fill="var(--text)">8. Group name (Sheep : Flock)</text>`),
      text: "Almost every analogy question in the syllabus falls into one of these 8 buckets. Recognising the bucket instantly narrows your options." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Number/letter analogies: find the operation</text>
      <text x="60" y="100" font-size="18" fill="var(--ink)">4 : 16 :: 5 : ?</text>
      <text x="60" y="140" font-size="16" fill="var(--key)">Operation = 'square' → 5² = 25</text>`),
      text: "For number pairs, test simple operations in order: +/−, ×/÷, then square/cube. One of them always fits both pairs." }
  ]
});

window.LESSONS.push({
  id: "classification-odd", sec: "A", title: "Classification: find what breaks the pattern", drill: "classification",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="18" fill="var(--text)">Rose, Lotus, Marigold, Mango</text>
      <text x="200" y="105" text-anchor="middle" font-size="14" fill="var(--muted)">Three share a category. One doesn't.</text>`),
      text: "Classification (odd-one-out) always has 3 items sharing a hidden category and 1 that breaks it." },
    { svg: svgWrap(`<text x="90" y="70" font-size="16" fill="var(--key)">Rose</text>
      <text x="200" y="70" font-size="16" fill="var(--key)">Lotus</text>
      <text x="300" y="70" font-size="16" fill="var(--key)">Marigold</text>
      <text x="200" y="110" font-size="14" fill="var(--chinar)">↑ all FLOWERS</text>
      <text x="200" y="160" font-size="18" fill="var(--neg)" font-weight="700">Mango = FRUIT (odd one)</text>`),
      text: "Rose, Lotus, Marigold are all flowers — Mango is a fruit. That's the break." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Categories to check, in order</text>
      <text x="30" y="80" font-size="13" fill="var(--text)">1. Living-thing type (animal/plant/mineral)</text>
      <text x="30" y="105" font-size="13" fill="var(--text)">2. Function or use</text>
      <text x="30" y="130" font-size="13" fill="var(--text)">3. Man-made vs natural</text>
      <text x="30" y="155" font-size="13" fill="var(--text)">4. For numbers: odd/even, prime, square, multiple-of-N</text>`),
      text: "If the category isn't obvious immediately, run through this checklist — one of them will click." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Number classification example</text>
      <text x="60" y="100" font-size="18" fill="var(--text)">4, 9, 16, 20</text>
      <text x="60" y="140" font-size="16" fill="var(--key)">4=2², 9=3², 16=4² are squares — 20 is not</text>`),
      text: "For numbers, always test 'are these perfect squares/cubes/multiples of the same number' before anything else." }
  ]
});

window.LESSONS.push({
  id: "problem-solving-wordbuild", sec: "A", title: "Word Building: hunt inside the big word", drill: "problem_solving",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="18" fill="var(--text)" font-weight="700">EXAMINATION</text>
      <text x="200" y="100" text-anchor="middle" font-size="14" fill="var(--muted)">Which word can be built using only these letters?</text>`),
      text: "Word-building questions give a long word and ask which option can be formed using ONLY its letters (each letter used at most as many times as it appears)." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)">Option: NATION</text>
      <text x="60" y="100" font-size="16" fill="var(--ink)">N-A-T-I-O-N</text>
      <text x="60" y="140" font-size="15" fill="var(--key)">Check each letter exists in EXAMINATION ✓</text>`),
      text: "Go letter by letter through the candidate word and confirm each one appears in the source word — including repeats." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">The trap: repeated letters</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">EXAMINATION has TWO 'N's and TWO 'A's —</text>
      <text x="30" y="125" font-size="14" fill="var(--text)">a candidate word needing THREE 'N's is invalid</text>
      <text x="30" y="155" font-size="14" fill="var(--text)">even if 'N' appears in the source word.</text>`),
      text: "The most common wrong-answer trap: a word needs a letter MORE times than the source word provides it. Always count, don't just check presence." }
  ]
});

window.LESSONS.push({
  id: "operations-bodmas", sec: "A", title: "Symbol Swap: solve with BODMAS discipline", drill: "operations",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="17" fill="var(--text)">If '+' means '×' and '−' means '÷', find 8 + 4</text>
      <text x="200" y="105" text-anchor="middle" font-size="15" fill="var(--muted)">Don't compute yet — first REWRITE the expression</text>`),
      text: "Symbol-swap questions replace operators with different meanings. The #1 rule: rewrite the whole expression with real symbols FIRST, then calculate." },
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="18" fill="var(--ink)">8 + 4  →  rewritten as  8 × 4</text>
      <text x="200" y="110" text-anchor="middle" font-size="18" fill="var(--key)" font-weight="700">= 32</text>`),
      text: "Since '+' actually means '×' here, the expression becomes 8 × 4 = 32. Never mix up which symbol maps to which." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">BODMAS still applies AFTER rewriting</text>
      <text x="30" y="85" font-size="14" fill="var(--text)">Brackets → Of → Division → Multiplication</text>
      <text x="30" y="115" font-size="14" fill="var(--text)">→ Addition → Subtraction</text>
      <text x="30" y="150" font-size="13" fill="var(--muted)">Multi-operator swaps still follow this order once rewritten.</text>`),
      text: "Once symbols are swapped to their real meaning, solve strictly in BODMAS order — the swap doesn't change operator precedence." }
  ]
});

window.LESSONS.push({
  id: "space-direction", sec: "A", title: "Direction Sense: draw the compass", drill: "space",
  steps: [
    { svg: svgWrap(`<line x1="200" y1="40" x2="200" y2="220" stroke="var(--line)" stroke-width="2"/>
      <line x1="90" y1="130" x2="310" y2="130" stroke="var(--line)" stroke-width="2"/>
      <text x="200" y="30" text-anchor="middle" font-size="14" fill="var(--text)">N</text>
      <text x="200" y="240" text-anchor="middle" font-size="14" fill="var(--text)">S</text>
      <text x="320" y="135" font-size="14" fill="var(--text)">E</text>
      <text x="75" y="135" font-size="14" fill="var(--text)">W</text>`),
      text: "First, always sketch a simple compass cross: N up, S down, E right, W left. This takes 5 seconds and prevents every direction mistake." },
    { svg: svgWrap(`<line x1="200" y1="130" x2="200" y2="60" stroke="var(--ink)" stroke-width="3"/>
      <text x="210" y="60" font-size="13" fill="var(--ink)">start: faces North</text>
      <line x1="200" y1="130" x2="270" y2="130" stroke="var(--chinar)" stroke-width="3" class="draw-in"/>
      <text x="280" y="135" font-size="13" fill="var(--chinar)">turns right → faces East</text>`),
      text: "A RIGHT turn from any direction rotates you 90° clockwise on the compass. A LEFT turn rotates 90° counter-clockwise." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Clockwise order (memorise this ring)</text>
      <text x="200" y="90" text-anchor="middle" font-size="18" fill="var(--text)">N → E → S → W → N</text>
      <text x="200" y="130" text-anchor="middle" font-size="13" fill="var(--muted)">Right turn = move forward one step in this ring</text>
      <text x="200" y="155" text-anchor="middle" font-size="13" fill="var(--muted)">Left turn = move backward one step in this ring</text>`),
      text: "Instead of redrawing a compass every time, just remember this ring — right turn moves forward, left turn moves backward." },
    { svg: svgWrap(`<line x1="80" y1="200" x2="80" y2="100" stroke="var(--ink)" stroke-width="3"/>
      <line x1="80" y1="100" x2="220" y2="100" stroke="var(--chinar)" stroke-width="3"/>
      <line x1="80" y1="200" x2="220" y2="100" stroke="var(--key)" stroke-width="2" stroke-dasharray="5"/>
      <text x="60" y="150" font-size="12" fill="var(--ink)">3 km</text>
      <text x="150" y="90" font-size="12" fill="var(--chinar)">4 km</text>
      <text x="160" y="155" font-size="12" fill="var(--key)">= 5 km (3-4-5 triangle)</text>`),
      text: "For 'shortest distance from start' questions, the path forms a right triangle — use Pythagoras. 3-4-5, 6-8-10, and 5-12-13 are the most common triples in these questions." }
  ]
});

window.LESSONS.push({
  id: "syllogism-rules", sec: "A", title: "Syllogism: the 3-rule shortcut", drill: "inference",
  steps: [
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">All A are B. All B are C.</text>
      <text x="200" y="95" text-anchor="middle" font-size="17" fill="var(--key)">→ All A are C (always follows)</text>`),
      text: "Rule 1 — chain rule: 'All A are B' + 'All B are C' always gives 'All A are C'. This is the most reliable syllogism pattern." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">All A are B.</text>
      <text x="200" y="95" text-anchor="middle" font-size="17" fill="var(--key)">→ Some B are A (conversion — always valid)</text>
      <text x="200" y="135" text-anchor="middle" font-size="15" fill="var(--neg)">✗ 'All B are A' does NOT follow</text>`),
      text: "Rule 2 — conversion: 'All A are B' only lets you flip to 'SOME B are A', never 'All B are A'. This is the #1 trap in the syllogism section." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Some A are B. Some B are C.</text>
      <text x="200" y="95" text-anchor="middle" font-size="16" fill="var(--neg)">→ NOTHING follows about A and C</text>`),
      text: "Rule 3 — the 'two somes' trap: two 'Some' statements NEVER combine into a valid conclusion about the outer terms. If you see 'Some...Some', be suspicious of any conclusion connecting the first and last term." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Quick decision table</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">All+All (chained) → All follows</text>
      <text x="20" y="105" font-size="13" fill="var(--text)">All+Some → Some follows (not All)</text>
      <text x="20" y="130" font-size="13" fill="var(--text)">Some+Some → usually nothing follows</text>
      <text x="20" y="155" font-size="13" fill="var(--text)">No+All → 'No' follows for the outer terms</text>`),
      text: "Memorise this 4-row table — it resolves roughly 80% of syllogism questions in seconds, without drawing any diagram." }
  ]
});

window.LESSONS.push({
  id: "paper-folding", sec: "A", title: "Paper Folding & Punched Holes: mirror logic", drill: "folding",
  steps: [
    { svg: svgWrap(`<rect x="120" y="60" width="160" height="140" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
      <line x1="200" y1="60" x2="200" y2="200" stroke="var(--chinar)" stroke-width="2" stroke-dasharray="6"/>
      <text x="200" y="45" text-anchor="middle" font-size="13" fill="var(--chinar)">fold line</text>`),
      text: "A folded paper always creates a mirror line. Any hole punched after folding will appear on BOTH sides of that mirror line when unfolded." },
    { svg: svgWrap(`<rect x="120" y="60" width="80" height="140" fill="none" stroke="var(--ink)" stroke-width="2"/>
      <circle cx="160" cy="100" r="6" fill="var(--key)"/>
      <text x="90" y="230" font-size="12" fill="var(--muted)">Punch a hole on the folded (single-layer visible) side</text>`),
      text: "The question shows the paper AFTER folding, with a hole punched through the folded layers." },
    { svg: svgWrap(`<rect x="60" y="60" width="280" height="140" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
      <line x1="200" y1="60" x2="200" y2="200" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="4"/>
      <circle cx="160" cy="100" r="6" fill="var(--key)"/>
      <circle cx="240" cy="100" r="6" fill="var(--key)" class="pop-in"/>
      <text x="200" y="220" text-anchor="middle" font-size="12" fill="var(--chinar)">mirrored across the fold line, same distance</text>`),
      text: "When unfolded, that hole reflects to the mirror-image position on the other half — same distance from the fold line, opposite side." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Multiple folds = multiple mirror lines</text>
      <text x="30" y="95" font-size="13" fill="var(--text)">Fold twice → up to 4 copies of each hole appear</text>
      <text x="30" y="125" font-size="13" fill="var(--text)">Unfold in REVERSE order of folding, one step at a time</text>`),
      text: "For 2+ folds, mentally unfold one layer at a time in reverse order — mirroring the holes across each fold line as you go." }
  ]
});

window.LESSONS.push({
  id: "embedded-figures", sec: "A", title: "Embedded Figures: trace, don't stare", drill: "embedded",
  steps: [
    { svg: svgWrap(`<polygon points="150,60 250,60 280,150 200,210 120,150" fill="none" stroke="var(--muted)" stroke-width="2"/>
      <text x="200" y="240" text-anchor="middle" font-size="13" fill="var(--muted)">A complex figure hides a simpler shape inside</text>`),
      text: "Embedded figure questions hide a small simple shape (triangle, specific pattern) somewhere inside a busier, more complex figure." },
    { svg: svgWrap(`<polygon points="150,60 250,60 280,150 200,210 120,150" fill="none" stroke="var(--line)" stroke-width="1.5"/>
      <polygon class="draw-in" points="150,60 250,60 200,140" fill="none" stroke="var(--chinar)" stroke-width="3"/>`),
      text: "Trace the target shape (e.g. a triangle) with your finger/eye directly onto the complex figure — don't just 'look' for it, actively trace each edge." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">3-step method</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">1. Study the target shape's exact proportions/angles first</text>
      <text x="20" y="125" font-size="13" fill="var(--text)">2. Scan the complex figure corner by corner, not center-out</text>
      <text x="20" y="155" font-size="13" fill="var(--text)">3. Confirm ALL edges match — partial matches are traps</text>`),
      text: "Never confirm a match on 2 out of 3 edges — the examiner deliberately includes near-misses where one edge doesn't line up." }
  ]
});

window.LESSONS.push({
  id: "matching-address", sec: "A", title: "Address/Code Matching: scan in chunks", drill: "matching",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="15" fill="var(--text)">H.No 42, Sector 3, Jammu 180012</text>
      <text x="200" y="100" text-anchor="middle" font-size="15" fill="var(--chinar)">H.No 42, Sector 3, Jammu 180021</text>
      <text x="200" y="140" text-anchor="middle" font-size="13" fill="var(--neg)">↑ last 2 digits swapped — NOT a match</text>`),
      text: "Matching questions hide ONE tiny change (a swapped digit, a changed letter) among near-identical text blocks." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Scan in chunks, not the whole line</text>
      <text x="30" y="85" font-size="13" fill="var(--text)">Chunk 1: House/door number</text>
      <text x="30" y="115" font-size="13" fill="var(--text)">Chunk 2: Street/sector name</text>
      <text x="30" y="145" font-size="13" fill="var(--text)">Chunk 3: City name</text>
      <text x="30" y="175" font-size="13" fill="var(--text)">Chunk 4: PIN code (check digit by digit — errors hide here most often)</text>`),
      text: "Reading the whole line at once causes you to skim past small errors. Break it into 4 chunks and verify each separately — PIN codes hide the most errors." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Speed tip</text>
      <text x="30" y="95" font-size="13" fill="var(--text)">Cover the given text with a finger/ruler and</text>
      <text x="30" y="120" font-size="13" fill="var(--text)">reveal ONE chunk at a time next to each option's</text>
      <text x="30" y="145" font-size="13" fill="var(--text)">matching chunk — never compare full blocks visually.</text>`),
      text: "This chunk-by-chunk comparison technique is far faster and more accurate than eyeballing two full paragraphs side by side." }
  ]
});

window.LESSONS.push({
  id: "critical-thinking-ei", sec: "A", title: "Emotional Intelligence: the calm-first rule", drill: "critical",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="15" fill="var(--text)">A crowd is turning aggressive during your duty.</text>
      <text x="200" y="105" text-anchor="middle" font-size="15" fill="var(--muted)">What's the FIRST priority?</text>`),
      text: "EI/critical-thinking questions describe a workplace or duty scenario and ask for the BEST first response — not the most dramatic one." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Eliminate extreme options first</text>
      <text x="30" y="95" font-size="13" fill="var(--neg)">✗ Charge in alone / lose temper / walk away</text>
      <text x="30" y="130" font-size="13" fill="var(--key)">✓ De-escalate calmly + call for backup</text>`),
      text: "The correct answer almost always combines CALM + a SYSTEMATIC step (call backup, ask specifics, listen first) — never an extreme, solo, or emotional reaction." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">The pattern behind every correct answer</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">1. Stay calm / regulate yourself first</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">2. Listen / gather facts before acting</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">3. Choose the least escalatory, most systematic action</text>`),
      text: "These 3 steps appear in nearly every correct answer to EI scenario questions — use them as a filter when two options seem equally 'reasonable'." }
  ]
});

window.LESSONS.push({
  id: "visual-memory", sec: "A", title: "Visual Memory: count from a fixed anchor", drill: "memory",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="18" fill="var(--text)">Q W E R T Y U I</text>
      <text x="200" y="105" text-anchor="middle" font-size="14" fill="var(--muted)">Which letter is 5th from the left?</text>`),
      text: "Observation/memory questions ask you to count position in a sequence — the trap is miscounting under time pressure." },
    { svg: svgWrap(`<text x="90" y="80" font-size="16" fill="var(--muted)">1</text><text x="90" y="120" font-size="18" fill="var(--text)">Q</text>
      <text x="140" y="80" font-size="16" fill="var(--muted)">2</text><text x="140" y="120" font-size="18" fill="var(--text)">W</text>
      <text x="190" y="80" font-size="16" fill="var(--muted)">3</text><text x="190" y="120" font-size="18" fill="var(--text)">E</text>
      <text x="240" y="80" font-size="16" fill="var(--muted)">4</text><text x="240" y="120" font-size="18" fill="var(--text)">R</text>
      <text x="290" y="80" font-size="16" fill="var(--chinar)" font-weight="700">5</text><text x="290" y="120" font-size="18" fill="var(--key)" font-weight="700">T</text>`),
      text: "Physically number each position 1,2,3... under the sequence as you count — never count in your head alone. The 5th position is T." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Two counting traps to watch for</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">1. 'From the left' vs 'from the right' — always re-read this</text>
      <text x="20" y="125" font-size="13" fill="var(--text)">2. 'Position N' vs 'N-th from a given letter' are different counts</text>`),
      text: "Misreading direction (left vs right) is the single most common error in this topic — always double-check which end you're counting from." }
  ]
});

window.LESSONS.push({
  id: "arith-reasoning-ages", sec: "A", title: "Age & Ratio Puzzles: let x be the unit", drill: "arith_reasoning",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)">Father is 3× as old as son. Sum of ages = 36.</text>
      <text x="200" y="105" text-anchor="middle" font-size="15" fill="var(--muted)">Find the son's age.</text>`),
      text: "Age puzzles almost always describe a RATIO between two people plus a total. Convert the ratio into a single unknown 'x'." },
    { svg: svgWrap(`<text x="200" y="55" text-anchor="middle" font-size="17" fill="var(--ink)">Son = x, Father = 3x</text>
      <text x="200" y="100" text-anchor="middle" font-size="17" fill="var(--text)">x + 3x = 36 → 4x = 36</text>
      <text x="200" y="145" text-anchor="middle" font-size="18" fill="var(--key)" font-weight="700">x = 9 → Son is 9 years old</text>`),
      text: "Set the smaller quantity as x, express everything else as a multiple of x, then solve the single equation." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Same trick for other 'puzzle' types</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Clock angle: angle = |30H − 5.5M|</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">Hens & cows: extra legs ÷ 2 = number of cows</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">Queue position: ahead + behind = total − 1</text>`),
      text: "Arithmetical reasoning is really just algebra in disguise — translate the words into one equation with a single unknown, every time." }
  ]
});

window.LESSONS.push({
  id: "voice-active-passive", sec: "D", title: "Active ↔ Passive: the 3-step swap", drill: "voice",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="18" fill="var(--text)" font-weight="700">Active: She writes a letter.</text>
      <text x="200" y="110" text-anchor="middle" font-size="14" fill="var(--muted)">Subject does the action → Object receives it</text>`),
      text: "Active voice: subject-verb-object, in that order. The subject is the 'doer'. Every passive conversion starts from here." },
    { svg: svgWrap(`<text x="60" y="60" font-size="16" fill="var(--ink)">She</text><text x="140" y="60" font-size="16" fill="var(--chinar)">writes</text><text x="240" y="60" font-size="16" fill="var(--key)">a letter</text>
      <text x="60" y="140" font-size="16" fill="var(--key)">A letter</text><text x="180" y="140" font-size="16" fill="var(--chinar)">is written</text><text x="300" y="140" font-size="16" fill="var(--ink)">by her</text>
      <text x="20" y="190" font-size="13" fill="var(--muted)">Step 1: object → new subject</text>`),
      text: "Step 1: the OBJECT of the active sentence ('a letter') becomes the new SUBJECT of the passive sentence." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Step 2: pick be + past participle</text>
      <text x="30" y="95" font-size="14" fill="var(--text)">writes → is written    wrote → was written</text>
      <text x="30" y="125" font-size="14" fill="var(--text)">will write → will be written</text>
      <text x="30" y="155" font-size="14" fill="var(--text)">has written → has been written</text>`),
      text: "Step 2: change the verb to 'be' (matching the original tense) + past participle. The tense of 'be' must match the original verb's tense exactly." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Step 3: old subject → 'by ...'</text>
      <text x="30" y="100" font-size="15" fill="var(--text)">She → by her     They → by them</text>
      <text x="30" y="135" font-size="13" fill="var(--muted)">Drop 'by + agent' if the doer is obvious/unimportant ('by people', 'by someone').</text>`),
      text: "Step 3: the old subject moves to the end as 'by + object pronoun'. In exams, 'by someone/people/them' is usually dropped entirely." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Watch for these traps</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">• Imperatives: "Open the door" → "Let the door be opened"</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">• Modal verbs: "can solve" → "can be solved"</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">• Two objects: keep the direct object as new subject, indirect stays after "to"</text>`),
      text: "Imperatives and modal-verb sentences follow the same 3 steps but with a special opening phrase — memorise these two patterns separately." }
  ]
});

window.LESSONS.push({
  id: "jk-reorganisation-timeline", sec: "B", title: "J&K Reorganisation: the timeline that gets asked every year", drill: "jk",
  steps: [
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">5 August 2019</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">Article 370's special provisions revoked by Presidential Order</text>`),
      text: "Start with the trigger date: 5 Aug 2019 — a Presidential Order (C.O. 272) applied the whole Constitution to J&K, ending Article 370's special-status provisions." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">6 August 2019</text>
      <text x="200" y="85" text-anchor="middle" font-size="14" fill="var(--muted)">J&K Reorganisation Act, 2019 passed by Parliament</text>
      <rect class="draw-in" x="60" y="140" width="130" height="60" fill="none" stroke="var(--chinar)" stroke-width="2.5"/>
      <text x="125" y="175" text-anchor="middle" font-size="13" fill="var(--text)">J&K</text>
      <rect class="draw-in" x="220" y="140" width="130" height="60" fill="none" stroke="var(--key)" stroke-width="2.5"/>
      <text x="285" y="175" text-anchor="middle" font-size="13" fill="var(--text)">Ladakh</text>`),
      text: "The Act split the state into TWO Union Territories: Jammu & Kashmir (with a legislature) and Ladakh (without a legislature)." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">31 October 2019</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">Reorganisation formally takes effect</text>
      <text x="200" y="130" text-anchor="middle" font-size="13" fill="var(--key)">(chosen for Sardar Patel's birth anniversary — National Unity Day)</text>`),
      text: "31 Oct 2019 is the appointed day the two UTs actually came into existence — deliberately picked as Rashtriya Ekta Diwas, Sardar Patel's birth anniversary." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Two Lieutenant Governors appointed</text>
      <text x="30" y="90" font-size="14" fill="var(--text)">J&K UT: has its own Legislative Assembly (like Delhi/Puducherry model)</text>
      <text x="30" y="125" font-size="14" fill="var(--text)">Ladakh UT: administered directly, no legislature (like Chandigarh)</text>`),
      text: "Remember the structural difference: J&K UT got a legislature, Ladakh did not — this distinction is a favourite one-mark question." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam-ready recap</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">5 Aug 2019 → Art. 370 provisions revoked (Presidential Order)</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">6 Aug 2019 → J&K Reorganisation Act passed</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">31 Oct 2019 → J&K + Ladakh UTs formally created</text>`),
      text: "Chain the three dates together in order — GA questions on this topic almost always test whether you can match date → event correctly." }
  ]
});

window.LESSONS.push({
  id: "ga-history-timeline", sec: "B", title: "History: the exact-fact traps", drill: "history", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Kalinga War, 261 BCE</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">Fought in present-day ODISHA — transformed Ashoka into a Buddhist patron of peace</text>`),
      text: "★ Asked in JKSSB 2022: the Kalinga War (which changed Ashoka) was fought in present-day Odisha — not Bengal or Bihar, the common wrong guesses." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Gandhara School of Art</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">Flourished under the KUSHANA dynasty (Greco-Buddhist style)</text>`),
      text: "★ Asked in JKSSB 2022: Gandhara art (Greek + Buddhist fusion, famous Buddha statues) flourished under the Kushanas — a favourite pairing to memorise." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Freedom movement figures = newspaper pairs</text>
      <text x="30" y="90" font-size="13" fill="var(--text)">Annie Besant → Commonweal & New India</text>
      <text x="30" y="120" font-size="13" fill="var(--text)">Gandhi → Young India & Harijan</text>
      <text x="30" y="150" font-size="13" fill="var(--text)">Tilak → Kesari & Mahratta</text>`),
      text: "★ Asked in JKSSB 2022: Annie Besant published Commonweal and New India. GA loves matching a freedom-movement figure to the newspaper(s) they founded — build this pairing table." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Constituent Assembly after Partition</text>
      <text x="30" y="95" font-size="15" fill="var(--text)">389 members (original) → 299 members (after Partition)</text>`),
      text: "★ Asked in JKSSB 2022: the Constituent Assembly started with 389 members; after Partition it was reduced to 299 — remember both numbers, exams flip which one they ask for." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam strategy for History</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Build small pairing tables: person↔work, event↔place, event↔year</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">J&K-specific history questions appear almost every year — prioritise them</text>`),
      text: "History in this exam rewards pairing memory over narrative — for every fact, ask 'what is it paired with?' and drill that pair." }
  ]
});

window.LESSONS.push({
  id: "ga-geography-physical", sec: "B", title: "Physical Geography: map-anchor facts", drill: "geography", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Karakoram Range</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--muted)">Lies in Northern J&K and Ladakh — home to K2, India's highest peak</text>`),
      text: "★ Asked in JKSSB 2022: the Karakoram range lies in Northern J&K and Ladakh. Since this exam is J&K-specific, always double-check local-geography facts first." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Tropic of Cancer (23.5° N)</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">Passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WEST BENGAL, Tripura, Mizoram</text>`),
      text: "★ Asked in JKSSB 2022: West Bengal is one of the 8 states the Tropic of Cancer passes through — memorise the full list west→east, it recurs often." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">River origins — a common confusion</text>
      <text x="30" y="90" font-size="14" fill="var(--text)">Godavari → originates in MAHARASHTRA (Trimbakeshwar, Nashik)</text>
      <text x="30" y="120" font-size="13" fill="var(--muted)">Not Andhra Pradesh — that's just where it meets the sea</text>`),
      text: "★ Asked in JKSSB 2022: the Godavari originates in Maharashtra, not the state where it's most famous or largest — origin state ≠ most-associated state." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam strategy for Geography</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">For every river: memorise origin state, mouth, and 2 states it flows through</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">For every range/plateau: memorise which states/UTs it touches</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">J&K physical features (Karakoram, Pir Panjal, Zanskar) are always high-priority</text>`),
      text: "Geography questions here are 'anchor facts' — one specific number or name per feature. Build a small fact-card per river/range rather than reading full chapters." }
  ]
});

window.LESSONS.push({
  id: "ga-polity-structure", sec: "B", title: "Polity: Constitution structure & UT rules", drill: "polity", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">How the President is elected</text>
      <text x="30" y="90" font-size="14" fill="var(--text)">By an ELECTORAL COLLEGE (MPs + MLAs)</text>
      <text x="30" y="120" font-size="13" fill="var(--muted)">Method: proportional representation by means of a single transferable vote</text>`),
      text: "★ Asked in JKSSB 2022: the President is elected by an electoral college through proportional representation — not by direct public vote (that's a common trap)." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Oath of office — who administers it?</text>
      <text x="30" y="90" font-size="13" fill="var(--text)">President → Chief Justice of India</text>
      <text x="30" y="120" font-size="13" fill="var(--text)">Governor → Chief Justice of the State High Court</text>
      <text x="30" y="150" font-size="13" fill="var(--key)" font-weight="700">Lieutenant Governor of a UT → also the Chief Justice of the High Court</text>`),
      text: "★ Asked in JKSSB 2022: an LG's oath is administered by the Chief Justice of the High Court, mirroring the Governor's rule — pair these two together." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">Article 239A</text>
      <text x="30" y="90" font-size="13" fill="var(--text)">Provides for creating a LEGISLATURE (and/or Council of Ministers) for certain Union Territories</text>
      <text x="30" y="120" font-size="13" fill="var(--muted)">This is the constitutional basis for J&K UT having its own Assembly</text>`),
      text: "★ Asked in JKSSB 2022: Article 239A is the enabling provision behind J&K's Legislative Assembly as a UT — connect it directly to what you learned in the Reorganisation lesson." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam strategy for Polity</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Learn 'who does what' triples: office → elected/appointed by → oath by</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">Know every Article number connected to J&K's special/UT status by heart</text>`),
      text: "Polity questions test structure, not opinion — build a clean table of offices, and always tie J&K-specific articles back to the Reorganisation timeline." }
  ]
});

window.LESSONS.push({
  id: "eng-error-spotting", sec: "D", title: "Spot the Error: the 5 recurring traps", drill: "error", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">Neither of the boys have finished their homework.</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--key)" font-weight="700">has finished — not "have"</text>`),
      text: "★ Asked in JKSSB 2022: 'Neither of the boys' is singular (neither = not one, not both) — the verb must be 'has', not 'have'. This exact trap repeats across exams." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Trap 1: hidden singular subjects</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">each, either, neither, everyone, nobody → always singular verb</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">"Each of the students HAS a book" (not have)</text>`),
      text: "Any sentence starting with each/either/neither/every- is a singular-verb trap — check the verb agreement first, ignore the plural noun that follows 'of'." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Trap 2: preposition pairing</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">"married with" ✗ → "married TO" ✓</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">"good in" ✗ → "good AT" ✓</text>`),
      text: "Certain verbs/adjectives always pair with one fixed preposition — memorise the common wrong-pairing list, since these are the easiest marks to lose." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Trap 3, 4, 5</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">3. Tense mismatch across clauses ("He said he IS coming" ✗)</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">4. Comparative degree ("more better" ✗, "taller than him" needs "he")</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">5. Redundant words ("return back", "repeat again")</text>`),
      text: "In the exam, scan each underlined part against these 5 traps in order — most 'spot the error' items fail on exactly one of them." }
  ]
});

window.LESSONS.push({
  id: "eng-vocab-strategy", sec: "D", title: "Synonyms & Antonyms: root-word attack", drill: "vocab", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">IMMINENT ≈ IMPENDING</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">Both mean: about to happen very soon</text>`),
      text: "★ Asked in JKSSB 2022: IMMINENT's synonym is IMPENDING — both describe something about to happen. When unsure, think of the word in a headline: 'Danger is imminent/impending'." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">JEOPARDY ↔ SAFETY</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">Jeopardy = danger/risk, so its antonym is Safety</text>`),
      text: "★ Asked in JKSSB 2022: JEOPARDY means danger/risk, so its antonym is SAFETY — for antonym questions, first nail the exact meaning, then negate it." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Root-word attack (for unknown words)</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">bene- = good (benefit, benevolent)   mal- = bad (malice, malfunction)</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">-phobia = fear   -cide = killing   -logy = study of</text>`),
      text: "When a word is completely unfamiliar, break it into prefix/root/suffix — Latin/Greek roots give away the general meaning even if you've never seen the exact word." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam strategy</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Eliminate the 2 most-obviously-unrelated options first</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">Between the last two, pick by TONE (positive/negative/neutral) matching the word</text>`),
      text: "Vocabulary questions are won on elimination, not perfect definitions — narrow to two options, then use tone/connotation as the final tiebreaker." }
  ]
});

window.LESSONS.push({
  id: "eng-idioms-common", sec: "D", title: "Idioms & One-Word Substitution: pattern groups", drill: "idioms", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">AMATEUR</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">One who engages in an activity for pleasure, not payment</text>`),
      text: "★ Asked in JKSSB 2022: 'one who does something for pleasure, not payment' = AMATEUR (opposite of professional) — a very common one-word-substitution pattern." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">One-word substitution: group by pattern</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">"One who..." → amateur, philatelist, misogynist, connoisseur</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">"Fear of..." → claustrophobia, xenophobia, acrophobia</text>
      <text x="20" y="145" font-size="13" fill="var(--text)">"Study of..." → ornithology, entomology, etymology</text>`),
      text: "Don't memorise one-word substitutions as a flat list — group them by sentence pattern ('one who...', 'fear of...', 'study of...') so a new example still feels familiar." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Idioms: guess from the picture, not the words</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">"Spill the beans" — literal words are useless, meaning = reveal a secret</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">Never translate an idiom word-by-word — always ask "what situation is this used in?"</text>`),
      text: "Idioms cannot be reasoned out from individual words — build a small deck of 40-50 high-frequency idioms with their single-line meaning and revise it like flashcards." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="13" fill="var(--chinar)" font-weight="700">Exam strategy</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">If two options both look plausible, pick the one matching the exact TONE of the phrase (formal/negative/positive)</text>`),
      text: "When stuck between two idiom options, tone match wins — idioms rarely have a completely neutral flavour." }
  ]
});

window.LESSONS.push({
  id: "cs-internet-protocols", sec: "F", title: "Internet & E-mail: protocol cheat-sheet", drill: "internet", real: true,
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">POP3</text>
      <text x="200" y="90" text-anchor="middle" font-size="14" fill="var(--text)">Used for RECEIVING/downloading e-mail to one device</text>`),
      text: "★ Asked in JKSSB 2022: POP3 (Post Office Protocol) is used for receiving e-mail — it typically downloads mail and removes it from the server, unlike IMAP which syncs across devices." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">The 3 e-mail protocols, side by side</text>
      <text x="20" y="90" font-size="13" fill="var(--text)">SMTP → SENDING e-mail (Simple Mail Transfer Protocol)</text>
      <text x="20" y="120" font-size="13" fill="var(--text)">POP3 → RECEIVING, downloads & removes from server</text>
      <text x="20" y="150" font-size="13" fill="var(--text)">IMAP → RECEIVING, keeps mail synced on the server across devices</text>`),
      text: "Group these three together: SMTP sends, POP3 downloads-and-deletes, IMAP syncs. Almost every 'which protocol does X' question maps to one of these three." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--chinar)" font-weight="700">IPv6 address length</text>
      <text x="200" y="90" text-anchor="middle" font-size="16" fill="var(--key)" font-weight="700">128 bits</text>
      <text x="200" y="120" text-anchor="middle" font-size="13" fill="var(--muted)">vs IPv4 = 32 bits</text>`),
      text: "★ Asked in JKSSB 2022: an IPv6 address is 128 bits long (vs IPv4's 32 bits) — that jump is exactly why IPv6 supports vastly more unique addresses." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="13" fill="var(--chinar)" font-weight="700">Exam strategy</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Build one small table: protocol/term → one-line function → key number (if any)</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">HTTP(S), FTP, DNS, URL, ISP all deserve the same 1-line treatment</text>`),
      text: "Computer Proficiency rewards precise short facts over deep understanding — a one-line cheat-sheet per term outperforms reading long explanations." }
  ]
});

window.LESSONS.push({
  id: "cs-security-basics", sec: "F", title: "Cyber Security: threats vs defences", drill: "security",
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Threats (the attacks)</text>
      <text x="20" y="90" font-size="13" fill="var(--text)">Virus → attaches to files, needs a host to spread</text>
      <text x="20" y="120" font-size="13" fill="var(--text)">Worm → spreads on its own across a network, no host needed</text>
      <text x="20" y="150" font-size="13" fill="var(--text)">Phishing → fake e-mails/sites tricking you into giving data</text>`),
      text: "The virus-vs-worm distinction is tested constantly: a virus needs a host file to travel, a worm replicates and spreads by itself over a network." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Defences (the protections)</text>
      <text x="20" y="90" font-size="13" fill="var(--text)">Firewall → filters incoming/outgoing network traffic</text>
      <text x="20" y="120" font-size="13" fill="var(--text)">Antivirus → detects/removes malicious software already present</text>
      <text x="20" y="150" font-size="13" fill="var(--text)">Encryption → scrambles data so only the key-holder can read it</text>`),
      text: "Pair each threat with its typical defence: firewall blocks network-level attacks, antivirus cleans infected files, encryption protects data in transit or storage." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">HTTPS vs HTTP</text>
      <text x="20" y="90" font-size="13" fill="var(--text)">HTTPS = HTTP + SSL/TLS encryption (the padlock icon)</text>
      <text x="20" y="120" font-size="13" fill="var(--muted)">Banking/e-mail sites must use HTTPS — a common 'which is safer' question</text>`),
      text: "HTTPS is just HTTP with an encryption layer (SSL/TLS) added — the padlock icon in a browser signals this, and it's a frequent exam giveaway question." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="13" fill="var(--chinar)" font-weight="700">Exam strategy</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Sort every new term into: is this an attack, or a defence?</text>`),
      text: "Whenever you meet a new security term, first classify it as attack or defence — that alone eliminates half the wrong options in most questions." }
  ]
});

window.LESSONS.push({
  id: "math-algebra-basics", sec: "E", title: "Algebra: factorising fast", drill: "algebra",
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">a² − b² = (a+b)(a−b)</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">The single most useful identity in this section</text>`),
      text: "The difference-of-squares identity turns hard-looking subtraction problems into simple multiplication — always check if an expression is a² − b² first." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--text)">Example: 97 × 103</text>
      <text x="200" y="90" text-anchor="middle" font-size="15" fill="var(--key)" font-weight="700">= (100−3)(100+3) = 100² − 3² = 9991</text>`),
      text: "Recognise 97×103 as (100−3)(100+3) — using a²−b² mentally is far faster than long multiplication under exam time pressure." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Other identities worth memorising</text>
      <text x="20" y="90" font-size="14" fill="var(--text)">(a+b)² = a² + 2ab + b²</text>
      <text x="20" y="120" font-size="14" fill="var(--text)">(a−b)² = a² − 2ab + b²</text>
      <text x="20" y="150" font-size="14" fill="var(--text)">a³+b³ = (a+b)(a²−ab+b²)</text>`),
      text: "These three identities cover almost every algebra question in this exam's syllabus — practise spotting which one a question is hiding." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="13" fill="var(--chinar)" font-weight="700">Exam strategy</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Before solving directly, check if the numbers were CHOSEN to fit an identity</text>`),
      text: "Exam setters deliberately pick numbers close to round values (like 97, 103) so an identity applies — always scan for that shortcut before grinding through arithmetic." }
  ]
});

window.LESSONS.push({
  id: "math-mensuration-shapes", sec: "E", title: "Mensuration: the formula wall", drill: "mensuration",
  steps: [
    { svg: svgWrap(`<rect class="draw-in" x="120" y="80" width="160" height="90" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <text x="200" y="60" text-anchor="middle" font-size="14" fill="var(--text)">Rectangle</text>
      <text x="200" y="200" text-anchor="middle" font-size="14" fill="var(--key)">Area = l×b   Perimeter = 2(l+b)</text>`),
      text: "Start from the rectangle: Area = length × breadth, Perimeter = 2(length + breadth). Every other 2D formula in this topic builds on this base idea." },
    { svg: svgWrap(`<circle class="draw-in" cx="200" cy="130" r="70" fill="none" stroke="var(--chinar)" stroke-width="3"/>
      <text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--text)">Circle</text>
      <text x="200" y="220" text-anchor="middle" font-size="14" fill="var(--key)">Area = πr²   Circumference = 2πr</text>`),
      text: "Circle: Area = πr², Circumference = 2πr. Mixing these two up (using 2πr where πr² is needed) is the single most common mensuration mistake." },
    { svg: svgWrap(`<polygon class="draw-in" points="200,50 100,210 300,210" fill="none" stroke="var(--key)" stroke-width="3"/>
      <text x="200" y="240" text-anchor="middle" font-size="14" fill="var(--text)">Triangle: Area = ½×base×height</text>`),
      text: "Triangle area always needs the perpendicular HEIGHT, not a slanted side — a common trap gives you two sides and asks for area, hoping you'll multiply the wrong pair." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">3D shortcuts</text>
      <text x="20" y="90" font-size="13" fill="var(--text)">Cube: Volume = a³, Surface area = 6a²</text>
      <text x="20" y="120" font-size="13" fill="var(--text)">Cylinder: Volume = πr²h, Curved surface = 2πrh</text>`),
      text: "For 3D shapes, always separate volume (3D space) from surface area (2D wrapping) — read the question word-by-word to see which one it's actually asking for." }
  ]
});

window.LESSONS.push({
  id: "quant-interest-si-ci", sec: "C", title: "Simple vs Compound Interest: the gap trick", drill: "interest",
  steps: [
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">SI = (P × R × T) / 100</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">Same amount of interest added every year</text>`),
      text: "Simple Interest grows in a straight line — the exact same interest amount is added each year, calculated always on the original principal." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--text)" font-weight="700">CI = P(1 + R/100)ⁿ − P</text>
      <text x="200" y="90" text-anchor="middle" font-size="13" fill="var(--muted)">Interest is calculated on principal + all previous interest</text>`),
      text: "Compound Interest grows faster each year because interest earns interest too — for 2 years, a shortcut is CI − SI = P×(R/100)²." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">2-year difference shortcut</text>
      <text x="30" y="90" font-size="15" fill="var(--ink)">CI − SI (for 2 years) = P × (R/100)²</text>
      <text x="30" y="125" font-size="13" fill="var(--muted)">E.g. P=10000, R=10% → difference = 10000×0.01 = ₹100</text>`),
      text: "When a question gives you the DIFFERENCE between CI and SI over 2 years, this one formula solves it instantly without computing either interest fully." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="13" fill="var(--chinar)" font-weight="700">Exam strategy</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Read carefully: "interest" alone often means SI; "compounded annually/half-yearly" means CI</text>`),
      text: "Half your marks on this topic come from correctly identifying SI vs CI in the wording — misreading this is the #1 cause of wrong answers here." }
  ]
});

console.log("Lessons loaded:", window.LESSONS.length);
