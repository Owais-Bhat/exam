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

window.LESSONS.push({
  id: "ga-culture-heritage", sec: "B", title: "Culture: India + J&K heritage map", drill: "culture",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Culture questions = People + Place + Practice</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Every fact links a festival/dance/craft to WHERE it belongs</text>`),
      text: "Culture questions almost always test one link: which festival, dance, craft, or shrine belongs to which region or community." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">J&K specific anchors</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Dances: Rouf, Dumhal (Kashmir); Bhangra (Jammu)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Festivals: Baisakhi, Lohri, Navreh, Amarnath Yatra</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">Crafts: Pashmina, Papier-mâché, Kani shawl, Walnut wood carving</text>
      <text x="20" y="164" font-size="13" fill="var(--text)">Shrines: Vaishno Devi, Hazratbal, Amarnath, Charar-e-Sharief</text>`),
      text: "Build a fixed mental table of J&K's dances, festivals, crafts, and shrines — these repeat across papers almost every year." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">All-India anchors</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Classical dances: Bharatanatyam(TN), Kathak(N.India), Odissi(Odisha)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">UNESCO tags: identify recently added Intangible Heritage items</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">Instruments: Sitar, Santoor (Kashmiri classical), Shehnai</text>`),
      text: "For all-India culture, pair each classical dance with its home state — this one-to-one mapping covers most repeated questions." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Common trap</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Similar-sounding crafts get swapped: Pashmina (wool shawl)</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">vs Kani (woven shawl) vs Papier-mâché (painted craft, not woven)</text>`),
      text: "The exam loves swapping two similar J&K crafts as wrong options — always re-check whether the item is woven, carved, or painted before answering." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">When unsure, eliminate options clearly tied to a DIFFERENT state first —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">culture questions rarely have two correct-looking options from the same region.</text>`),
      text: "If two options belong to the same state/region, one of them is usually a distractor — narrow down by region first, then by the specific item." }
  ]
});

window.LESSONS.push({
  id: "ga-economics-policy", sec: "B", title: "Economics & Policy: the schemes-and-terms map", drill: "economics",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Two question types only</text>
      <text x="200" y="100" text-anchor="middle" font-size="13" fill="var(--muted)">1) Term definitions   2) Government scheme facts</text>`),
      text: "Economics & Policy questions split into two buckets: basic economic terms (GDP, inflation, fiscal deficit) and government scheme details (name, year, ministry, purpose)." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Core terms to fix cold</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">GDP = total value of goods/services produced in a year</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Inflation = general rise in prices (measured by CPI/WPI)</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">Fiscal deficit = govt spending − govt revenue (excl. borrowings)</text>
      <text x="20" y="164" font-size="13" fill="var(--text)">Repo rate = rate at which RBI lends to banks</text>`),
      text: "Memorise one-line definitions for these four terms — they are recycled across nearly every GA paper in some form." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Scheme flashcard format</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Scheme name → Launch year → Ministry → One-line purpose</text>
      <text x="20" y="115" font-size="13" fill="var(--text)">e.g. PM-KISAN → 2019 → Agriculture → ₹6000/yr income support to farmers</text>`),
      text: "For every scheme you read, force it into this 4-field flashcard — name, year, ministry, purpose. Half-remembered schemes cause most wrong answers." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">J&K-specific economic facts</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Key sectors: horticulture (apples/saffron), tourism, handicrafts</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">UT-specific schemes: J&K industrial policy, Back to Village, UMEED</text>`),
      text: "J&K's economy questions usually center on horticulture, tourism, and locally launched UT schemes — keep a short separate list for these." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Options often swap the YEAR or the MINISTRY of a real scheme —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">verify both fields, not just whether the scheme name sounds right.</text>`),
      text: "Never trust a familiar-sounding scheme name alone — the trap option usually keeps the name correct but changes the year or ministry." }
  ]
});

window.LESSONS.push({
  id: "ga-sports-tournaments", sec: "B", title: "Sports: tournaments, awards & J&K sportspersons", drill: "sports",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Three buckets to prepare</text>
      <text x="20" y="100" font-size="13" fill="var(--text)">1. Major tournaments (venue/host, winner)</text>
      <text x="20" y="128" font-size="13" fill="var(--text)">2. National sports awards</text>
      <text x="20" y="156" font-size="13" fill="var(--text)">3. J&K sportspersons and their sport/achievement</text>`),
      text: "Sports questions cover three separate buckets — split your revision into these three lists rather than reading news randomly." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Awards ladder (highest to lowest)</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Major Dhyan Chand Khel Ratna → highest sporting honour</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Arjuna Award → outstanding performance</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">Dronacharya Award → for COACHES, not players</text>`),
      text: "Remember the award ladder by rank AND by whom it honours — Dronacharya is the one trap that's for coaches, not athletes." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">J&K sportspersons anchor list</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Track these by name → sport → key achievement</text>
      <text x="20" y="115" font-size="13" fill="var(--muted)">e.g. cricketers, footballers, and winter-sports athletes from J&K</text>`),
      text: "Keep a running list of J&K-origin sportspersons with their sport and one headline achievement — these are asked far more often than generic national sports facts." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Tournament host-vs-winner trap</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Host country ≠ winning team — the exam frequently</text>
      <text x="20" y="113" font-size="13" fill="var(--text)">swaps these two in wrong options for the same event.</text>`),
      text: "For any tournament question, separately confirm the HOST and the WINNER — they are two different facts and the trap option usually swaps them." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Update your list every few months — sports facts (rankings,</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">latest winners) go stale faster than history/polity facts.</text>`),
      text: "Sports is the most time-sensitive GA topic — revise your anchor list closer to the exam date rather than memorising it early and forgetting to refresh." }
  ]
});

window.LESSONS.push({
  id: "ga-science-research", sec: "B", title: "Science & Research: general science + Indian bodies", drill: "science",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Two layers of Science GA</text>
      <text x="20" y="100" font-size="13" fill="var(--text)">1. School-level general science facts (physics/chem/bio basics)</text>
      <text x="20" y="128" font-size="13" fill="var(--text)">2. Indian research bodies and their recent missions/work</text>`),
      text: "Science & Research questions test basic general science AND awareness of Indian scientific institutions — prepare them as two separate short lists." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Institution → domain map</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">ISRO → space missions (satellites, Chandrayaan, Gaganyaan)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">DRDO → defence research and missile systems</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">CSIR / ICMR → industrial research / medical research</text>`),
      text: "Fix each Indian research body to its ONE domain — ISRO for space, DRDO for defence, ICMR for medicine — mixing these up is the most common wrong answer." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">General science quick facts</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Vitamin deficiency diseases (e.g. Vit C → scurvy, Vit D → rickets)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">SI units of common quantities (force=Newton, power=Watt)</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">Human body basics: largest organ (skin), blood groups</text>`),
      text: "General science questions repeat from a small pool — vitamins/deficiency diseases, SI units, and basic human-body facts cover most of them." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Recent-mission trap</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Mission NAMES get swapped between ISRO missions —</text>
      <text x="20" y="113" font-size="13" fill="var(--text)">always match mission name to its correct YEAR and PURPOSE.</text>`),
      text: "When a question names an ISRO/DRDO mission, verify both its purpose and its approximate year — similar-sounding mission names are a frequent trap." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">If an option names an institution outside its known domain</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">(e.g. ISRO doing medical research), eliminate it immediately.</text>`),
      text: "An institution acting outside its known domain is almost always the wrong option — use the domain map as your first filter." }
  ]
});

window.LESSONS.push({
  id: "ga-people-in-news", sec: "B", title: "People in News: role-first memory method", drill: "people",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Name alone is useless — anchor to ROLE + EVENT</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Who + What position/achievement + When (roughly)</text>`),
      text: "'People in News' questions test a person's current designation or a headline achievement — never memorise a name alone, always attach it to a role and event." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Priority categories</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">1. Top constitutional posts (President, CJI, CEC, CAG)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">2. J&K administrative heads (LG, DGP, Chief Secretary)</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">3. Recently appointed heads of major bodies (RBI, ISRO, Army)</text>`),
      text: "Focus your limited time on these three categories first — they are asked far more often than sportspersons or authors in this section." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">One-line flashcard format</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">[Name] — [Current post/title] — [since/appointed year]</text>
      <text x="20" y="115" font-size="13" fill="var(--muted)">e.g. keep a running notebook, update it monthly</text>`),
      text: "Write every new name as one flashcard line: name, post, year — this format is far easier to recall under exam pressure than a paragraph of news." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">The 'previous holder' trap</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Options often list the PREVIOUS post-holder as a distractor —</text>
      <text x="20" y="113" font-size="13" fill="var(--text)">always confirm you have the CURRENT (or as-of-exam-date) holder.</text>`),
      text: "The most common trap lists the immediately previous person in that post — make sure your flashcard has the latest holder, not last year's." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Revise this list LAST, closest to the exam date —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">appointments change more often than any other GA sub-topic.</text>`),
      text: "Keep People in News as your final revision topic before the exam since it goes stale the fastest of all GA sub-topics." }
  ]
});

window.LESSONS.push({
  id: "ga-current-affairs-method", sec: "B", title: "Current Affairs: how to study a moving target", drill: "current",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">This topic has no fixed facts to memorise</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">The SKILL is what matters — how you track and revise it</text>`),
      text: "Current Affairs 2025-26 changes every week, so this lesson teaches a METHOD for studying it, not a list of facts that would be outdated by exam day." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Step 1: pick ONE reliable monthly source</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">A single monthly current-affairs digest/PDF beats</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">scattered daily scrolling — consistency matters more than volume.</text>`),
      text: "Choose one trusted monthly compilation and stick to it — jumping between many sources wastes time and causes conflicting half-memories." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Step 2: sort every item into a fixed bucket</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Appointments · Schemes · Awards · Sports · Defence ·</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Reports/Rankings · J&K-specific news</text>`),
      text: "As you read news, immediately file each fact into one of these fixed buckets — this mirrors how the exam itself categorises questions, making recall faster." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Step 3: weekly 10-minute re-read, not new reading</text>
      <text x="20" y="85" font-size="13" fill="var(--text)">Spend most sessions RE-READING last month's notes,</text>
      <text x="20" y="113" font-size="13" fill="var(--text)">not just adding new items — repetition beats coverage.</text>`),
      text: "Revisit older notes weekly instead of only chasing new headlines — questions often come from events 2-4 months old, not yesterday's news." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">In the exam hall, if an option contradicts what J&K/national</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">policy generally does, eliminate it even without exact recall.</text>`),
      text: "When you can't recall the exact fact, use elimination — an option that contradicts the general direction of known policy is usually the wrong one." }
  ]
});

window.LESSONS.push({
  id: "quant-ratio-proportion", sec: "C", title: "Ratio & Proportion: keep the parts, scale together", drill: "ratio",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="17" fill="var(--text)">A : B = 2 : 3</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Means: for every 2 parts of A, there are 3 parts of B</text>`),
      text: "A ratio just compares two quantities in fixed PARTS — 2:3 means whatever the total, A always gets 2 shares for every 3 shares B gets." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)">Total = 50, A : B = 2 : 3</text>
      <text x="200" y="95" text-anchor="middle" font-size="15" fill="var(--ink)">Total parts = 2 + 3 = 5 → each part = 50/5 = 10</text>
      <text x="200" y="135" text-anchor="middle" font-size="17" fill="var(--key)" font-weight="700">A = 20, B = 30</text>`),
      text: "To split any total in a given ratio: add the parts to get total parts, divide the total by that to find the value of 1 part, then multiply back." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Combining two ratios (A:B and B:C)</text>
      <text x="30" y="85" font-size="14" fill="var(--text)">A:B = 2:3   B:C = 4:5</text>
      <text x="30" y="120" font-size="14" fill="var(--key)">Make B common (LCM of 3,4 = 12) → A:B = 8:12, B:C = 12:15</text>
      <text x="30" y="150" font-size="16" fill="var(--key)" font-weight="700">A : B : C = 8 : 12 : 15</text>`),
      text: "To chain three-way ratios, make the shared term (B here) equal by scaling both ratios to the LCM of its two given values." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Proportion rule: cross-multiply</text>
      <text x="30" y="90" font-size="16" fill="var(--ink)">a/b = c/d  ⟺  a×d = b×c</text>`),
      text: "A proportion (two equal ratios) can always be solved by cross-multiplication — this turns a fraction equation into a simple linear one." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Never add/subtract the SAME number to both parts of a ratio</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">and expect the ratio to stay the same — it changes unless it's 1:1.</text>`),
      text: "A classic trap: adding or removing an equal amount from both quantities changes the ratio — only multiplying/dividing both parts by the same number preserves it." }
  ]
});

window.LESSONS.push({
  id: "quant-square-roots-fast", sec: "C", title: "Square Roots: fast estimation without long division", drill: "sqroots",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Memorise squares 1² to 25² first</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">This single table makes root-finding almost instant</text>`),
      text: "Before any trick works, memorise the squares of 1 to 25 — most exam roots fall in this range, and recognising them on sight saves the most time." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--text)">Find √576</text>
      <text x="60" y="90" font-size="14" fill="var(--ink)">Last digit 6 → root ends in 4 or 6</text>
      <text x="60" y="125" font-size="14" fill="var(--chinar)">576 is between 20²=400 and 30²=900, closer to 24²=576</text>
      <text x="60" y="160" font-size="16" fill="var(--key)" font-weight="700">√576 = 24</text>`),
      text: "Use the last-digit trick: a perfect square ending in 6 has a root ending in 4 or 6 — combine this with bracketing between known tens to narrow it down fast." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Last-digit → possible root endings</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Square ends in 1 → root ends in 1 or 9</text>
      <text x="20" y="105" font-size="13" fill="var(--text)">Square ends in 4 → root ends in 2 or 8</text>
      <text x="20" y="130" font-size="13" fill="var(--text)">Square ends in 9 → root ends in 3 or 7</text>
      <text x="20" y="155" font-size="13" fill="var(--text)">Square ends in 5,0 → root ends in 5,0 respectively</text>`),
      text: "This last-digit table instantly cuts your guesswork in half for any perfect square — pair it with tens-bracketing to nail the exact root in seconds." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Non-perfect squares: division method shortcut</text>
      <text x="30" y="85" font-size="14" fill="var(--ink)">√50 ≈ ? → 7²=49, 8²=64, so √50 is just above 7</text>
      <text x="30" y="120" font-size="14" fill="var(--key)">Refine: 50-49=1, extra ≈ 1/(2×7) = 0.07 → √50 ≈ 7.07</text>`),
      text: "For non-perfect squares, bracket between two known squares, then refine using extra ≈ (difference)/(2 × lower root) — good enough for MCQ-level accuracy." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Check the LAST DIGIT of the options against your answer FIRST —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">it eliminates half the wrong options before you finish calculating.</text>`),
      text: "In MCQ square-root questions, matching just the last digit of your answer against the options often eliminates 2 of 4 choices instantly." }
  ]
});

window.LESSONS.push({
  id: "quant-averages-core", sec: "C", title: "Averages: the balance-point idea", drill: "averages",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="17" fill="var(--text)">Average = Sum of values ÷ Number of values</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Think of it as the 'balance point' of all the numbers</text>`),
      text: "An average is the single number that balances a set — if you replaced every value with the average, the total would stay exactly the same." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="16" fill="var(--text)">5 numbers, average = 20 → total = 100</text>
      <text x="200" y="100" text-anchor="middle" font-size="16" fill="var(--ink)">6th number added, new average = 22</text>
      <text x="200" y="140" text-anchor="middle" font-size="17" fill="var(--key)" font-weight="700">New total = 22×6=132 → 6th number = 132−100 = 32</text>`),
      text: "The core technique: convert average → total using (average × count), do the arithmetic on TOTALS, then convert back to average only at the end." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Deviation shortcut (mental math)</text>
      <text x="30" y="85" font-size="14" fill="var(--text)">Numbers: 48, 52, 55, 45 → guess average ≈ 50</text>
      <text x="30" y="120" font-size="14" fill="var(--ink)">Deviations: -2, +2, +5, -5 → sum = 0</text>
      <text x="30" y="150" font-size="16" fill="var(--key)" font-weight="700">Sum of deviations = 0 → true average = 50</text>`),
      text: "Guess a round-number average, find each value's deviation from it, and average the deviations — add that correction to your guess for the exact answer instantly." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Weighted average trap</text>
      <text x="30" y="85" font-size="14" fill="var(--text)">Two groups of DIFFERENT sizes — don't just average the two averages</text>
      <text x="30" y="120" font-size="14" fill="var(--key)">Weighted avg = (n1×avg1 + n2×avg2) / (n1+n2)</text>`),
      text: "When combining groups of different sizes, never simply average the two averages — weight each by its group size first, or you'll get the wrong answer." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">'Average age of a group' questions with people joining/leaving:</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">always work in TOTAL AGE, then divide by the new count at the end.</text>`),
      text: "For age/replacement average problems, convert everything to total age first — dividing too early is the single biggest source of errors here." }
  ]
});

window.LESSONS.push({
  id: "quant-partnership-shares", sec: "C", title: "Partnership: profit split by capital × time", drill: "partnership",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Profit share ∝ Capital invested × Time invested</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Not just capital alone — TIME matters equally</text>`),
      text: "In a partnership, profit is never split by capital alone — each partner's share depends on their capital MULTIPLIED by how long that capital stayed invested." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="15" fill="var(--text)">A invests ₹4000 for 12 months, B invests ₹6000 for 8 months</text>
      <text x="60" y="90" font-size="15" fill="var(--ink)">A's share unit = 4000×12 = 48,000</text>
      <text x="60" y="120" font-size="15" fill="var(--chinar)">B's share unit = 6000×8 = 48,000</text>
      <text x="60" y="155" font-size="17" fill="var(--key)" font-weight="700">Ratio A:B = 48,000:48,000 = 1:1 (equal share!)</text>`),
      text: "Multiply each partner's capital by their invested time to get a 'capital-month' unit — the profit ratio is simply the ratio of these units, even if capitals looked unequal." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Partner joining late / leaving early</text>
      <text x="30" y="85" font-size="14" fill="var(--text)">If total business runs 12 months but a partner joins in month 4,</text>
      <text x="30" y="115" font-size="14" fill="var(--key)">that partner's TIME = 12 − 4 = 8 months only</text>`),
      text: "Always compute each partner's ACTUAL months invested (not the full business duration) — a partner joining late gets fewer time-months in the ratio." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Working vs sleeping partner</text>
      <text x="30" y="85" font-size="14" fill="var(--text)">If a 'working partner' gets a fixed extra commission/salary first,</text>
      <text x="30" y="115" font-size="14" fill="var(--text)">deduct that from total profit BEFORE splitting the remainder by capital×time.</text>`),
      text: "When a question mentions a working partner's salary or commission, subtract that fixed amount from total profit first — only the remaining profit is split by the capital×time ratio." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Never assume equal time for all partners just because the</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">question doesn't repeat it for each — re-read for join/exit months.</text>`),
      text: "The most common trap is silently assuming everyone invested for the full period — always scan the question again for hidden 'joined later' or 'left early' clues." }
  ]
});

window.LESSONS.push({
  id: "quant-mixture-alligation", sec: "C", title: "Mixture & Alligation: the criss-cross rule", drill: "mixture",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Mixing two things of different 'strength' or 'price'</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Alligation finds the RATIO to mix them in</text>`),
      text: "Alligation answers one question type: two ingredients of different price/concentration are mixed to get a target average — in what ratio were they combined?" },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">The alligation cross</text>
      <text x="70" y="80" font-size="16" fill="var(--ink)">Cheaper: 20</text>
      <text x="280" y="80" font-size="16" fill="var(--chinar)">Dearer: 30</text>
      <text x="175" y="130" font-size="18" fill="var(--key)" font-weight="700">Mean: 25</text>
      <line x1="90" y1="90" x2="270" y2="120" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4"/>
      <line x1="270" y1="90" x2="90" y2="120" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4"/>`),
      text: "Draw the cross: cheaper value top-left, dearer value top-right, mean price in the middle — the two diagonal differences give the mixing ratio." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Reading off the ratio</text>
      <text x="30" y="85" font-size="15" fill="var(--ink)">Dearer − Mean = 30 − 25 = 5  → cheaper's share</text>
      <text x="30" y="120" font-size="15" fill="var(--chinar)">Mean − Cheaper = 25 − 20 = 5  → dearer's share</text>
      <text x="30" y="155" font-size="17" fill="var(--key)" font-weight="700">Cheaper : Dearer = 5 : 5 = 1 : 1</text>`),
      text: "The rule: cheaper's quantity ratio = (Dearer − Mean), and dearer's quantity ratio = (Mean − Cheaper) — cross the differences diagonally, never straight down." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Works for any 'mix two things' scenario</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Milk-water mixtures, two grades of rice/sugar,</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">alloys of two metals, average marks of two class sections.</text>`),
      text: "Alligation isn't just for prices — it works for any 'blend two things to hit a target average' question, including milk-water and marks-of-two-sections problems." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">The mean value MUST lie between the two given values —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">if it doesn't, you've misread which is cheaper/dearer.</text>`),
      text: "Sanity check every alligation answer: the target mean must sit strictly between the two input values — if your mean is outside that range, recheck which number is which." }
  ]
});

window.LESSONS.push({
  id: "quant-time-speed-distance", sec: "C", title: "Time & Distance: speed, relative speed, trains & boats", drill: "tsd",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="17" fill="var(--text)" font-weight="700">Speed = Distance / Time</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Every question is this triangle in disguise</text>`),
      text: "Every Time-Speed-Distance question is just this one relationship rearranged — write down which two of the three values you're given before solving." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Unit conversion — memorise this</text>
      <text x="30" y="85" font-size="16" fill="var(--ink)">km/hr → m/s: multiply by 5/18</text>
      <text x="30" y="120" font-size="16" fill="var(--ink)">m/s → km/hr: multiply by 18/5</text>`),
      text: "Almost every TSD question needs this conversion at some point — memorise 5/18 and 18/5 so you never derive them under time pressure." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Relative speed rules</text>
      <text x="20" y="80" font-size="14" fill="var(--text)">Same direction (chasing): relative speed = difference of speeds</text>
      <text x="20" y="115" font-size="14" fill="var(--text)">Opposite direction (approaching): relative speed = sum of speeds</text>`),
      text: "For two moving objects, ADD their speeds if moving towards each other, SUBTRACT if moving in the same direction — this single rule solves all overtaking/meeting problems." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Trains: use TOTAL length crossed</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Train crossing a pole: distance = train's own length</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Train crossing a platform: distance = train length + platform length</text>
      <text x="20" y="136" font-size="13" fill="var(--text)">Two trains crossing each other: distance = sum of both lengths</text>`),
      text: "For train problems, the trap is always about WHAT distance to use — a pole needs only the train's length, but a platform or another train adds their lengths together." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Boats & streams shortcut</text>
      <text x="20" y="80" font-size="14" fill="var(--text)">Downstream speed = Boat speed + Current speed</text>
      <text x="20" y="110" font-size="14" fill="var(--text)">Upstream speed = Boat speed − Current speed</text>
      <text x="20" y="145" font-size="13" fill="var(--muted)">Boat speed = (down+up)/2,  Current speed = (down−up)/2</text>`),
      text: "Boats-and-streams is relative speed applied to water current — add current going downstream, subtract going upstream, and you can always recover both speeds from these two formulas." }
  ]
});

window.LESSONS.push({
  id: "eng-grammar-structure", sec: "D", title: "Grammar & Structure: tenses and parts of speech basics", drill: "grammar",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">8 parts of speech, one job each</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Noun · Pronoun · Verb · Adjective · Adverb · Preposition · Conjunction · Interjection</text>`),
      text: "Grammar questions test whether you can identify the correct part of speech and tense for a blank or an underlined word — start by naming what job each word does in the sentence." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">The tense grid (memorise this shape)</text>
      <text x="20" y="75" font-size="13" fill="var(--text)">Present: I write / I am writing / I have written / I have been writing</text>
      <text x="20" y="103" font-size="13" fill="var(--text)">Past: I wrote / I was writing / I had written / I had been writing</text>
      <text x="20" y="131" font-size="13" fill="var(--text)">Future: I will write / I will be writing / I will have written</text>`),
      text: "Every tense follows the same 4-column pattern (simple / continuous / perfect / perfect-continuous) across present, past, and future — learn the SHAPE, not each sentence separately." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Subject-verb agreement trap</text>
      <text x="20" y="80" font-size="14" fill="var(--text)">"Each of the boys HAS (not have) a book" — 'each/every' → singular</text>
      <text x="20" y="115" font-size="14" fill="var(--text)">"Neither of them WAS (not were) present" — 'neither/either' → singular</text>`),
      text: "Words like each, every, neither, either always take a SINGULAR verb even when followed by a plural-looking phrase — this is one of the most repeated grammar traps." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Article trap (a/an/the)</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Use 'an' before a VOWEL SOUND, not vowel letter</text>
      <text x="20" y="110" font-size="13" fill="var(--text)">"an hour" (silent h) but "a university" (sounds like 'yoo')</text>`),
      text: "Article choice depends on the SOUND that follows, not the letter — 'an hour' and 'a university' both look like exceptions but follow this one sound-based rule." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Read the FULL sentence before choosing — grammar traps are</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">designed to look right if you only read up to the blank.</text>`),
      text: "Never answer based on the words immediately before a blank — always read to the end of the sentence, since the subject or tense clue is often placed after it." }
  ]
});

window.LESSONS.push({
  id: "eng-fill-blanks", sec: "D", title: "Fill in the Blanks: context-first strategy", drill: "blanks",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Read the WHOLE sentence first, blank last</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">The rest of the sentence tells you what KIND of word fits</text>`),
      text: "Before looking at any option, read the complete sentence and predict what TYPE of word (verb/noun/preposition/connector) the blank needs — this narrows 4 options to 1-2 instantly." },
    { svg: svgWrap(`<text x="200" y="45" text-anchor="middle" font-size="14" fill="var(--text)">"He succeeded ___ solving the puzzle."</text>
      <text x="60" y="90" font-size="14" fill="var(--muted)">succeed IN (fixed preposition pairing)</text>
      <text x="60" y="125" font-size="16" fill="var(--key)" font-weight="700">Answer: "in"</text>`),
      text: "Many blanks test fixed verb-preposition pairs (succeed IN, depend ON, insist ON) — memorising these common pairings solves the blank without needing to think about meaning at all." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Connector blanks need logic, not vocabulary</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">"He studied hard, ___ he failed." → needs a CONTRAST word (yet/but)</text>
      <text x="20" y="110" font-size="13" fill="var(--text)">"He studied hard, ___ he passed." → needs a RESULT word (so/hence)</text>`),
      text: "For connector blanks (but/so/because/although), first decide the LOGICAL relationship between the two clauses — contrast, cause, or result — then pick the word that matches that logic." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Double-blank sentences</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Solve the EASIER blank first — it often restricts which</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">option pair remains valid for the harder blank.</text>`),
      text: "When a sentence has two blanks, fill the one you're more confident about first — it usually eliminates 2-3 of the 4 paired options immediately." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Always re-read the completed sentence with your chosen option —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">if it sounds even slightly odd, re-check meaning, not just grammar.</text>`),
      text: "After picking an answer, plug it back in and re-read the full sentence — a grammatically correct option can still be the wrong MEANING fit." }
  ]
});

window.LESSONS.push({
  id: "eng-spelling-patterns", sec: "D", title: "Spellings: pattern-based memory tricks", drill: "spelling",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Most misspellings follow a handful of repeat patterns</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Learn the PATTERN, not each word in isolation</text>`),
      text: "Spelling errors in this exam repeat the same handful of confusable patterns — group commonly misspelled words by pattern rather than memorising a random list." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">'i before e' family</text>
      <text x="20" y="80" font-size="14" fill="var(--text)">believe, achieve, receive(exception: after 'c' use 'ei')</text>
      <text x="20" y="110" font-size="13" fill="var(--muted)">Rule: i before e, except after c</text>`),
      text: "The classic rule 'i before e, except after c' resolves believe/achieve vs receive/deceive — apply it whenever these two letters appear together." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Double-letter confusions</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">accommodate (2 c's, 2 m's), embarrass (2 r's, 2 s's)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">necessary (1 c, 2 s's), occurred (2 c's, 2 r's)</text>`),
      text: "Words with double letters are the most commonly tested — build a small personal list of exactly which letter doubles in each, since guessing here is a coin-flip." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Silent-letter words</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">psychology (silent p), foreign (silent g-sound irregularity)</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Wednesday (silent d), knowledge (silent k)</text>`),
      text: "Silent-letter words are commonly mis-typed because we don't pronounce the tricky letter — say the word slowly while spelling it out to catch the silent letter." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">When two options look almost identical, compare them</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">letter-by-letter rather than judging by 'how it looks overall'.</text>`),
      text: "For near-identical spelling options, scan letter by letter rather than trusting the overall shape of the word — that's exactly where the exam hides the single wrong letter." }
  ]
});

window.LESSONS.push({
  id: "eng-narration-speech", sec: "D", title: "Direct/Indirect Speech: the conversion checklist", drill: "narration",
  steps: [
    { svg: svgWrap(`<text x="200" y="55" text-anchor="middle" font-size="15" fill="var(--text)">Direct: He said, "I am tired."</text>
      <text x="200" y="100" text-anchor="middle" font-size="15" fill="var(--key)" font-weight="700">Indirect: He said (that) he was tired.</text>`),
      text: "Converting direct to indirect speech means removing the quotation marks and adjusting THREE things: the reporting verb tense, the pronoun, and the tense inside the quote." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Tense shifts back ONE step (if reporting verb is past)</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">am/is/are → was/were</text>
      <text x="20" y="105" font-size="13" fill="var(--text)">will → would   |   can → could   |   have → had</text>
      <text x="20" y="130" font-size="13" fill="var(--text)">simple present → simple past   |   simple past → past perfect</text>`),
      text: "If the reporting verb ('he said') is in the past, every tense inside the quote shifts back one step — memorise this backward-shift table so you never have to guess." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Pronoun swap rule</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">'I/we' → match the SUBJECT of the reporting verb</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">'you' → match the OBJECT of the reporting verb</text>`),
      text: "Pronouns inside the quote change to match who is speaking about whom — 'I' becomes whoever the subject is, 'you' becomes whoever is being addressed (the object)." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Time/place word swaps</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">now → then   |   today → that day   |   here → there</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">tomorrow → the next day   |   yesterday → the previous day</text>`),
      text: "Time and place references also shift away from the speaker's original moment — 'today' becomes 'that day', 'tomorrow' becomes 'the next day', and so on." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Questions/commands change structure too: "Did you go?" →</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">He asked if/whether he had gone. (no question mark, 'if/whether' added)</text>`),
      text: "Interrogative and imperative sentences need an extra structural change beyond tense/pronoun — questions get 'if/whether' and lose their question mark, commands use 'to' + infinitive." }
  ]
});

window.LESSONS.push({
  id: "eng-sentence-rearrangement", sec: "D", title: "Sentence Rearrangement: find the anchor sentence first", drill: "shuffling",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Don't read left-to-right — find the OPENING sentence first</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">The opener introduces the subject with no pronoun reference</text>`),
      text: "In para-jumbles, first scan for the sentence that could logically OPEN the paragraph — it introduces a subject/topic by name, without relying on 'it/he/this' pointing to something earlier." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Pronoun-chain trick</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">A sentence starting with "This/It/He/They" must FOLLOW</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">the sentence that first names that noun — never come first.</text>`),
      text: "Any sentence beginning with a pronoun (This, It, He, They) cannot be the opener — trace which earlier sentence introduces the noun that pronoun refers to, and link them." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Connector-word chain</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">"However/But" → needs a contrasting idea just before it</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">"Therefore/Thus" → needs a cause/reason just before it</text>`),
      text: "Words like 'however', 'therefore', 'moreover' are glue between two specific sentences — find which sentence logically precedes each connector to lock two pieces together." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Build pairs before building the full order</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Lock 2-3 sentences into confirmed PAIRS first</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">(via pronoun/connector links), then slot the pairs into full order.</text>`),
      text: "Don't try to solve the whole sequence at once — lock small confirmed pairs first using pronoun and connector clues, then arrange those pairs into the final order." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Once you have an order, read it top to bottom as one paragraph —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">if it doesn't flow naturally, your opener or a pair is wrong.</text>`),
      text: "Always do a final read-through of your chosen order as a continuous paragraph — a natural flow confirms it, an awkward jump means you should re-check the pairing." }
  ]
});

window.LESSONS.push({
  id: "eng-cloze-passage", sec: "D", title: "Cloze Passage: read once fully before filling any blank", drill: "cloze",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Read the ENTIRE passage first, blanks and all</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Get the overall theme before touching any single blank</text>`),
      text: "A cloze passage has multiple blanks that all serve ONE overall theme — read through the whole passage once, ignoring the blanks, to understand what it's actually about." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Fill the 'obvious' blanks first</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Grammar-only blanks (prepositions, articles, tense) don't</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">need the full theme — solve these immediately on the first pass.</text>`),
      text: "Some blanks only test grammar (a fixed preposition, an article) and can be filled without deep context — knock these out first to build confidence and save time." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Tone-matching for vocabulary blanks</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">A passage praising something won't suddenly use a</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">negative-tone word in the middle — match the passage's TONE.</text>`),
      text: "For vocabulary-choice blanks, the correct word must match the overall TONE of the passage (positive/negative/neutral) — a tone-mismatched option is almost always wrong even if it 'fits' grammatically." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Use later sentences to solve earlier blanks</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">A clue for blank #2 often sits in sentence #4 —</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">don't assume each blank is solved only from its own sentence.</text>`),
      text: "Clues for one blank are often placed in a LATER sentence, not the one containing the blank itself — if a blank feels unsolvable, keep reading forward before giving up on it." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">After filling all blanks, re-read the full passage once more —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">it should read smoothly as one coherent piece, not a patchwork.</text>`),
      text: "Do one final full re-read with all your answers in place — if the passage now flows naturally end to end, your choices are consistent; any jarring blank needs a second look." }
  ]
});

window.LESSONS.push({
  id: "eng-reading-comprehension", sec: "D", title: "Reading Comprehension: questions-first strategy", drill: "comprehension",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">Skim the QUESTIONS before reading the full passage</text>
      <text x="200" y="105" text-anchor="middle" font-size="13" fill="var(--muted)">Know what you're hunting for before you start reading</text>`),
      text: "Glance at the questions (not the options) BEFORE reading the passage in detail — this tells you which facts/names/numbers to watch for as you read, saving a second full read-through." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Answer from the passage, not from outside knowledge</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Even if you know more about the topic personally,</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">the correct answer must be traceable to a line IN the passage.</text>`),
      text: "RC answers must come from what the passage actually states or implies — never let outside knowledge override what's written, since the exam only credits passage-based reasoning." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Two answer traps to avoid</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">1. Too extreme: passage says 'some', option says 'all'</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">2. Half-right: option matches one clause, contradicts another</text>`),
      text: "Watch for options that overstate the passage (turning 'some' into 'all/always') or that are only half-correct — matching part of a sentence while contradicting the rest." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">'Main idea' vs 'detail' questions</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Main idea → look at the FIRST and LAST paragraph/sentence</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Specific detail → scan for the exact keyword from the question</text>`),
      text: "For 'main idea/title' questions, the opening and closing lines usually reveal it directly; for detail questions, scan for the exact keyword rather than re-reading the whole passage." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">If two options both seem partly supported, pick the one</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">that is fully and directly stated, not the one needing inference.</text>`),
      text: "When torn between two plausible options, favour the one directly stated in the passage over one that requires you to infer or assume — RC rewards literal accuracy." }
  ]
});

window.LESSONS.push({
  id: "math-statistics-probability", sec: "E", title: "Statistics & Probability: mean/median/mode + basic chance", drill: "statistics",
  steps: [
    { svg: svgWrap(`<text x="200" y="55" text-anchor="middle" font-size="15" fill="var(--text)">Data: 3, 5, 5, 7, 9</text>
      <text x="200" y="95" text-anchor="middle" font-size="14" fill="var(--ink)">Mean = sum/count = 29/5 = 5.8</text>
      <text x="200" y="130" text-anchor="middle" font-size="14" fill="var(--chinar)">Median = middle value (sorted) = 5</text>
      <text x="200" y="165" text-anchor="middle" font-size="14" fill="var(--key)" font-weight="700">Mode = most frequent value = 5</text>`),
      text: "Mean is the arithmetic average; median is the middle value once the data is SORTED; mode is whichever value repeats most — always sort the data first before finding median or mode." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Median: odd vs even count</text>
      <text x="20" y="80" font-size="13" fill="var(--text)">Odd count → median = the exact middle term</text>
      <text x="20" y="108" font-size="13" fill="var(--text)">Even count → median = average of the two middle terms</text>`),
      text: "The most common median mistake: with an EVEN number of values, there's no single middle term — you must average the two central values instead." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Probability = Favourable outcomes / Total outcomes</text>
      <text x="20" y="85" font-size="14" fill="var(--ink)">P(rolling a 4 on a die) = 1/6</text>
      <text x="20" y="115" font-size="14" fill="var(--ink)">P(drawing a red card from 52) = 26/52 = 1/2</text>`),
      text: "Basic probability is always favourable-outcomes divided by total-outcomes — count both carefully, especially total outcomes, which is where most errors happen." },
    { svg: svgWrap(`<text x="200" y="40" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Two events: AND vs OR</text>
      <text x="20" y="85" font-size="14" fill="var(--text)">Both happen (AND, independent) → multiply probabilities</text>
      <text x="20" y="115" font-size="14" fill="var(--text)">Either happens (OR, mutually exclusive) → add probabilities</text>`),
      text: "For two events, multiply their probabilities for 'both happen' (AND), and add them for 'either happens' (OR) — mixing up AND/OR is the most common probability error." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Probability always lies between 0 and 1 —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">if your computed answer is negative or above 1, you miscounted outcomes.</text>`),
      text: "Sanity-check every probability answer: it must fall between 0 and 1 inclusive — any value outside that range means a counting mistake, not a valid answer." }
  ]
});

window.LESSONS.push({
  id: "cs-windows-msoffice", sec: "F", title: "Windows & MS Office: the essentials map", drill: "software",
  steps: [
    { svg: svgWrap(`<text x="200" y="60" text-anchor="middle" font-size="16" fill="var(--text)" font-weight="700">One app, one job</text>
      <text x="20" y="105" font-size="13" fill="var(--text)">Word → documents/letters   Excel → numbers/tables/formulas</text>
      <text x="20" y="133" font-size="13" fill="var(--text)">PowerPoint → slide presentations   Windows OS → manages everything</text>`),
      text: "Fix each MS Office app to ONE core job first — Word for text documents, Excel for numeric tables/calculations, PowerPoint for slide presentations — most questions just test this basic mapping." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Common Windows shortcuts</text>
      <text x="20" y="75" font-size="13" fill="var(--text)">Ctrl+C copy · Ctrl+V paste · Ctrl+Z undo · Ctrl+S save</text>
      <text x="20" y="100" font-size="13" fill="var(--text)">Alt+Tab switch windows · Ctrl+Alt+Del security screen</text>
      <text x="20" y="125" font-size="13" fill="var(--text)">Windows+L lock screen · Windows+E open File Explorer</text>`),
      text: "A fixed set of Windows keyboard shortcuts gets tested repeatedly — memorise this short list rather than trying to guess shortcut meaning from the key names." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Excel basics</text>
      <text x="20" y="75" font-size="13" fill="var(--text)">Cell = intersection of a row (number) and column (letter), e.g. B5</text>
      <text x="20" y="103" font-size="13" fill="var(--text)">=SUM(A1:A5) adds a range · =AVERAGE(A1:A5) finds the mean</text>
      <text x="20" y="131" font-size="13" fill="var(--text)">Every formula STARTS with an '=' sign</text>`),
      text: "In Excel, a cell is named by its column letter + row number (like B5), and every formula must begin with '=' — SUM and AVERAGE are the two most commonly tested functions." },
    { svg: svgWrap(`<text x="200" y="35" text-anchor="middle" font-size="14" fill="var(--text)" font-weight="700">Word & PowerPoint basics</text>
      <text x="20" y="75" font-size="13" fill="var(--text)">Word: Home tab has font/paragraph tools, Insert tab adds tables/images</text>
      <text x="20" y="103" font-size="13" fill="var(--text)">PowerPoint: 'Slide Show' tab or F5 key runs the presentation</text>`),
      text: "For Word, remember which RIBBON TAB holds which tool group (Home = formatting, Insert = objects); for PowerPoint, F5 (or the Slide Show tab) starts the presentation from the beginning." },
    { svg: svgWrap(`<text x="200" y="50" text-anchor="middle" font-size="14" fill="var(--chinar)" font-weight="700">Exam rule of thumb</text>
      <text x="20" y="95" font-size="13" fill="var(--text)">Don't confuse similar-looking shortcuts across apps —</text>
      <text x="20" y="123" font-size="13" fill="var(--text)">F5 refreshes in a browser/Excel but STARTS the show in PowerPoint.</text>`),
      text: "The same key can do different things in different applications (F5 refreshes in Excel but launches the slideshow in PowerPoint) — always anchor a shortcut to its specific app, not as a universal rule." }
  ]
});

console.log("Lessons loaded:", window.LESSONS.length);
