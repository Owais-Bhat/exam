# gen_bank_reasoning.py — Section A (400 questions), programmatic + curated
import json, math, random, calendar
from pathlib import Path

rng = random.Random(20260717)
OUT = Path(__file__).resolve().parent.parent / "app" / "data"
R = []

def opts_from(correct, distractors, fmt=str):
    seen, opts = {fmt(correct)}, [fmt(correct)]
    for d in distractors:
        s = fmt(d)
        if s not in seen and len(opts) < 4:
            seen.add(s); opts.append(s)
    bump = 1
    while len(opts) < 4:
        cand = fmt(correct) + "​" * bump  # last-resort; should not happen
        opts.append(cand); bump += 1
    rng.shuffle(opts)
    return opts, opts.index(fmt(correct))

def add(topic, diff, q, correct, distractors, exp, tags=None):
    opts, ans = opts_from(correct, distractors)
    R.append({"sec": "A", "topic": topic, "diff": diff, "q": q,
              "opts": opts, "ans": ans, "exp": exp, "tags": tags or [topic]})

A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

# ---------------- analogies (45)
WORD_ANALOGIES = [
    ("Doctor","Hospital","Teacher","School",["College","Books","Student"],"place of work"),
    ("Pen","Write","Knife","Cut",["Sharp","Kitchen","Steel"],"tool and its function"),
    ("Bird","Nest","Bee","Hive",["Honey","Flower","Swarm"],"creature and its home"),
    ("Cow","Calf","Horse","Foal",["Colt herd","Stable","Pony ride"],"animal and its young"),
    ("Book","Chapter","Play","Act",["Stage","Actor","Scene change"],"whole and its division"),
    ("Painter","Brush","Writer","Pen",["Paper","Story","Ink pot"],"worker and tool"),
    ("Water","Thirst","Food","Hunger",["Plate","Cook","Taste"],"remedy and need"),
    ("Kilogram","Weight","Litre","Volume",["Water","Length","Metre"],"unit and quantity measured"),
    ("Smoke","Fire","Steam","Water",["Cloud","Boil","Heat"],"product and source — steam comes from heated water"),
    ("Optimist","Hopeful","Pessimist","Gloomy",["Cheerful","Realist","Angry"],"person type and outlook"),
    ("Sheep","Flock","Fish","Shoal",["Herd","Pack","Litter"],"animal and its group name"),
    ("India","Rupee","Japan","Yen",["Dollar","Won","Yuan"],"country and currency"),
    ("Eye","See","Ear","Hear",["Sound","Nose","Listen carefully"],"organ and function"),
    ("Hot","Cold","Day","Night",["Sun","Evening","Morning"],"antonym pairs"),
    ("Army","General","Team","Captain",["Player","Coach assists","Umpire"],"group and its leader"),
    ("Clock","Time","Thermometer","Temperature",["Fever","Doctor","Mercury"],"instrument and what it measures"),
    ("Tailor","Cloth","Carpenter","Wood",["Hammer","Furniture shop","Nails"],"worker and raw material"),
    ("Petrol","Car","Electricity","Fan",["Wire","Bulb glow","Switch"],"energy source and machine"),
    ("Library","Books","Museum","Artifacts",["Visitors","Building","Tickets"],"place and its contents"),
    ("Chef","Kitchen","Pilot","Cockpit",["Aeroplane wing","Airport","Runway"],"professional and workplace"),
]
def gen_analogies(n):
    i = 0
    for _ in range(n):
        kind = rng.randrange(3)
        if kind == 0 and i < len(WORD_ANALOGIES):
            a,b,c,d,dist,why = WORD_ANALOGIES[i]; i += 1
            add("analogies",1, f"{a} : {b} :: {c} : ?", d, dist,
                f"Step 1: name the link between the first pair — here it is {why}. "
                f"Step 2: check it holds — {a} relates to {b} exactly this way. "
                f"Step 3: apply the SAME link to {c}: since {a}→{b} means '{why}', {c}→{d} for the identical reason. "
                f"None of the other options preserve this specific link, so {d} is the only valid match.")
        elif kind == 1:
            base = rng.choice([2,3,4,5,6,7,8,9,11,12])
            f = rng.choice([("square", lambda x: x*x), ("double", lambda x: 2*x), ("triple", lambda x: 3*x)])
            x2 = rng.choice([x for x in [3,4,5,6,7,8,9,11,12] if x != base])
            c = f[1](x2)
            add("analogies",2, f"{base} : {f[1](base)} :: {x2} : ?", c,
                [c+2, c-2, f[1](x2)+x2, x2*x2 if f[0]!="square" else 2*x2],
                f"Step 1: test the pair {base} : {f[1](base)} against simple operations (add, multiply, square) until one fits — here it is '{f[0]}'. "
                f"Step 2: confirm: {base} → {f[0]} → {f[1](base)}, correct. "
                f"Step 3: apply the identical operation to {x2}: {x2} → {f[0]} → {c}. "
                f"The wrong options come from applying a different or partial operation, not the confirmed rule.")
        else:
            i1 = rng.randrange(20); gap = rng.choice([1,2,3,4])
            w1, w2 = A[i1], A[(i1+gap) % 26]
            j1 = rng.randrange(20)
            c = A[(j1+gap) % 26]
            add("analogies",2, f"{w1} : {w2} :: {A[j1]} : ?", c,
                [A[(j1+gap+1)%26], A[(j1+gap-1)%26], A[(j1-gap)%26], A[(j1+gap+2)%26]],
                f"Step 1: find how far {w1} moved to become {w2} in the alphabet — count forward: it's +{gap} positions. "
                f"Step 2: verify there's no shorter/alternate explanation (e.g. reverse-order or vowel-consonant swap) — a simple shift fits perfectly. "
                f"Step 3: apply the same +{gap} shift to {A[j1]}: {A[j1]} + {gap} positions = {c}. "
                f"The distractors use a wrong shift amount or the wrong direction (−{gap} instead of +{gap}).")

# ---------------- classification / odd one out (35)
ODD_SETS = [
    (["Rose","Lotus","Marigold","Mango"],"Mango","the others are flowers; mango is a fruit"),
    (["Copper","Iron","Brass","Zinc"],"Brass","brass is an alloy; the rest are pure metals"),
    (["Chennai","Mumbai","Kolkata","Delhi"],"Delhi","the others are coastal port cities"),
    (["Cow","Goat","Buffalo","Lion"],"Lion","the others are domestic/herbivorous animals"),
    (["Ganga","Yamuna","Kaveri","Nainital"],"Nainital","the others are rivers; Nainital is a lake town"),
    (["Eagle","Parrot","Bat","Crow"],"Bat","a bat is a mammal; the others are birds"),
    (["Guitar","Sitar","Violin","Flute"],"Flute","the others are string instruments; flute is wind"),
    (["Doctor","Engineer","Lawyer","Hospital"],"Hospital","the others are professions; hospital is a place"),
    (["Earth","Mars","Moon","Venus"],"Moon","the others are planets; the Moon is a satellite"),
    (["January","March","May","June"],"June","the others have 31 days"),
    (["Triangle","Square","Circle","Rectangle"],"Circle","the others are made of straight lines"),
    (["Kathak","Bharatanatyam","Bhangra","Kathakali"],"Bhangra","the others are classical dances; Bhangra is folk"),
    (["Mercury","Venus","Jupiter","Sun"],"Sun","the Sun is a star; the rest are planets"),
    (["Cabbage","Potato","Carrot","Radish"],"Cabbage","the others grow underground (root/tuber vegetables)"),
    (["Pen","Pencil","Eraser","Marker"],"Eraser","the others write; an eraser removes"),
]
def gen_classification(n):
    i = 0
    for _ in range(n):
        kind = rng.randrange(3)
        if kind == 0 and i < len(ODD_SETS):
            items, odd, why = ODD_SETS[i]; i += 1
            others = [x for x in items if x != odd]
            add("classification",1, "Find the odd one out: " + ", ".join(items),
                odd, others,
                f"Step 1: check each item against the other three to spot the shared category — {', '.join(others)} all share one property. "
                f"Step 2: confirm {odd} breaks that pattern: {why}. "
                f"Step 3: since exactly three fit the category and one doesn't, {odd} is the odd one out.")
        elif kind == 1:
            sq = rng.sample([4,9,16,25,36,49,64,81,100],3)
            odd = rng.choice([6,12,20,30,45,55,70])
            items = sq + [odd]; rng.shuffle(items)
            add("classification",2, "Find the odd number: " + ", ".join(map(str,items)),
                odd, sq,
                f"Step 1: check if the numbers are perfect squares by testing their square roots — {', '.join(f'{r}²={r*r}' for r in sorted(int(x**0.5) for x in sq))} all work out exactly. "
                f"Step 2: test {odd}: no whole number squared gives {odd}. "
                f"Step 3: since three numbers are perfect squares and one is not, {odd} is the odd one out.")
        else:
            ev = rng.sample([12,24,36,48,56,64,72,88],3)
            odd = rng.choice([15,21,27,33,45,51,63])
            items = ev + [odd]; rng.shuffle(items)
            add("classification",1, "Find the odd number: " + ", ".join(map(str,items)),
                odd, ev,
                f"Step 1: check each number's divisibility by 2 — {', '.join(map(str, sorted(ev)))} all divide evenly (even numbers). "
                f"Step 2: test {odd} ÷ 2: it leaves a remainder, so {odd} is odd, not even. "
                f"Step 3: the category here is 'even number', and {odd} is the only one that breaks it.")

# ---------------- series (50)
def gen_series(n):
    for _ in range(n):
        kind = rng.randrange(6)
        if kind == 0:  # AP
            a0 = rng.randrange(2, 15); d = rng.randrange(3, 9)
            seq = [a0 + d*i for i in range(5)]; nxt = a0 + d*5
            diffs = [seq[i+1]-seq[i] for i in range(len(seq)-1)]
            add("series",1, ", ".join(map(str,seq)) + ", ?", nxt,
                [nxt+d, nxt-d, nxt+1, nxt-2],
                f"Step 1: write the difference between each pair of consecutive terms: {', '.join(map(str,diffs))}. "
                f"Step 2: since all differences equal {d}, this is a simple arithmetic series. "
                f"Step 3: extend the pattern by adding {d} to the last term: {seq[-1]} + {d} = {nxt}.")
        elif kind == 1:  # GP
            a0 = rng.choice([2,3,4,5]); r = rng.choice([2,3])
            seq = [a0 * r**i for i in range(4)]; nxt = a0 * r**4
            ratios = [seq[i+1]//seq[i] for i in range(len(seq)-1)]
            add("series",2, ", ".join(map(str,seq)) + ", ?", nxt,
                [nxt//r + r, nxt + a0, nxt*r//2, nxt - a0*r],
                f"Step 1: check the ratio between consecutive terms instead of the difference: {' , '.join(f'{seq[i+1]}/{seq[i]}={ratios[i]}' for i in range(len(ratios)))}. "
                f"Step 2: the ratio is constant at {r}, so this is a geometric series (each term × {r}). "
                f"Step 3: multiply the last term by {r}: {seq[-1]} × {r} = {nxt}.")
        elif kind == 2:  # increasing differences
            a0 = rng.randrange(1, 10); d0 = rng.choice([2,3]); step = rng.choice([2,3])
            seq, cur, d = [a0], a0, d0
            for _ in range(4):
                cur += d; seq.append(cur); d += step
            nxt = cur + d
            diffs = [seq[i+1]-seq[i] for i in range(len(seq)-1)]
            add("series",2, ", ".join(map(str,seq)) + ", ?", nxt,
                [nxt - step, nxt + step, nxt - 1, cur + d0],
                f"Step 1: the plain differences aren't constant — {', '.join(map(str,diffs))} — so check if THOSE differences follow a pattern. "
                f"Step 2: the differences themselves increase by {step} each time ({diffs[0]}, {diffs[0]+step}, {diffs[0]+2*step}...). "
                f"Step 3: the next difference is {d}; add it to the last term: {cur} + {d} = {nxt}.")
        elif kind == 3:  # squares or cubes
            if rng.random() < .6:
                s = rng.randrange(1, 5); seq = [i*i for i in range(s, s+5)]; nxt = (s+5)**2
                why = f"perfect squares of consecutive integers ({s}², {s+1}², {s+2}²...); the next integer is {s+5}, so the next term is {s+5}² = {nxt}"
            else:
                s = 1; seq = [i**3 for i in range(1, 6)]; nxt = 216
                why = "perfect cubes of consecutive integers (1³, 2³, 3³...); the next integer is 6, so the next term is 6³ = 216"
            add("series",2, ", ".join(map(str,seq)) + ", ?", nxt,
                [nxt-2*s-1, nxt+2*s+1, nxt-s, nxt+s+3],
                f"Step 1: since the numbers grow quickly and don't fit a simple add/multiply pattern, test whether they're perfect squares or cubes. "
                f"Step 2: these are {why}. "
                f"Step 3: the wrong options come from miscalculating the next integer's square/cube, not from a different valid pattern.")
        elif kind == 4:  # letter series
            start = rng.randrange(0, 15); gap = rng.choice([1,2,3])
            seq = [A[(start + gap*i) % 26] for i in range(5)]; nxt = A[(start + gap*5) % 26]
            add("series",1, ", ".join(seq) + ", ?", nxt,
                [A[(start+gap*5+1)%26], A[(start+gap*5-1)%26], A[(start+gap*4)%26], A[(start+gap*5+2)%26]],
                f"Step 1: convert each letter's alphabet position mentally and find the gap between consecutive letters — each moves forward by {gap}. "
                f"Step 2: verify this holds for all consecutive pairs in {', '.join(seq)}. "
                f"Step 3: apply the same +{gap} shift to the last letter {seq[-1]}: this gives {nxt}.")
        else:  # fibonacci-style
            a0, b0 = rng.choice([(1,1),(1,2),(2,3),(3,4)])
            seq = [a0, b0]
            for _ in range(4): seq.append(seq[-1] + seq[-2])
            nxt = seq[-1] + seq[-2]
            add("series",2, ", ".join(map(str,seq)) + ", ?", nxt,
                [seq[-1]*2, nxt+1, nxt-2, seq[-1]+seq[-3]],
                f"Step 1: check if each term is built from the two terms before it (a Fibonacci-style rule) — test: {seq[0]}+{seq[1]}={seq[0]+seq[1]}, which matches the 3rd term {seq[2]}. "
                f"Step 2: confirm the same rule for later terms too. "
                f"Step 3: the next term is the sum of the last two given terms: {seq[-2]} + {seq[-1]} = {nxt}.")

# ---------------- coding & decoding (50)
WORDS = ["POLICE","EXAM","DUTY","COURT","GUARD","NIGHT","ORDER","PATROL","BADGE","RANK",
         "JUSTICE","LAW","CRIME","SAFETY","HONOR","POWER","TRUTH","ALERT","BRAVE","CHIEF"]
def shift_word(w, k): return "".join(A[(A.index(c)+k) % 26] for c in w)
def gen_coding(n):
    for _ in range(n):
        kind = rng.randrange(4)
        w = rng.choice(WORDS)
        if kind == 0:
            k = rng.choice([1,2,3,-1,-2])
            base = rng.choice([x for x in WORDS if x != w])
            coded_base, coded = shift_word(base, k), shift_word(w, k)
            add("coding",2,
                f"In a certain code, {base} is written as {coded_base}. How is {w} written in that code?",
                coded, [shift_word(w,k+1), shift_word(w,-k), shift_word(w,k-1), w[::-1]],
                f"Step 1: compare {base} and {coded_base} letter by letter to find the shift — each letter moved by {'+' if k>0 else ''}{k} positions. "
                f"Step 2: verify on at least two letters (don't trust just one pair, since some ciphers change direction mid-word). "
                f"Step 3: apply the confirmed {'+' if k>0 else ''}{k} shift to every letter of {w}: {' '.join(f'{c}→{A[(A.index(c)+k)%26]}' for c in w)}, giving {coded}.")
        elif kind == 1:
            add("coding",1, f"If a word is written backwards, {w} becomes:",
                w[::-1], [w[1:]+w[0], w[0]+w[:0:-1], shift_word(w,1)[::-1], w[::-1][1:]+w[-1]],
                f"Step 1: identify the rule stated — 'written backwards' means simple letter-order reversal, not a shift or rotation. "
                f"Step 2: write out {w}'s letters in reverse order one by one: {' '.join(reversed(w))}. "
                f"Step 3: join them to get {w[::-1]} — the wrong options instead rotate the first letter to the end or apply an unrelated shift.")
        elif kind == 2:
            c = sum(A.index(ch)+1 for ch in w)
            add("coding",3,
                f"If A=1, B=2 … Z=26, the sum of the letter values of {w} is:",
                c, [c+1, c-1, c+len(w), c-len(w)],
                f"Step 1: convert every letter of {w} to its alphabet position (A=1...Z=26): {', '.join(f'{ch}={A.index(ch)+1}' for ch in w)}. "
                f"Step 2: add all these position values together. "
                f"Step 3: {' + '.join(str(A.index(ch)+1) for ch in w)} = {c}. A common slip is off-by-one on one letter, producing the {c+1} or {c-1} distractors.")
        else:
            k = rng.choice([1,2])
            coded = "".join(A[(A.index(c)+k) % 26] if i%2==0 else A[(A.index(c)-k) % 26] for i,c in enumerate(w))
            add("coding",3,
                f"In a code, odd-position letters move +{k} and even-position letters move −{k} (positions start at 1). {w} becomes:",
                coded, [shift_word(w,k), shift_word(w,-k), w[::-1], shift_word(w,k+1)],
                f"Step 1: number each letter's position in {w} starting at 1, and note whether it's odd or even. "
                f"Step 2: shift odd-position letters forward by {k} and even-position letters backward by {k} — never apply the same shift to all letters (that's the trap in the distractors). "
                f"Step 3: letter by letter: {' '.join(f'{ch}(pos{i+1})→{A[(A.index(ch)+k)%26] if i%2==0 else A[(A.index(ch)-k)%26]}' for i,ch in enumerate(w))}, giving {coded}.")

# ---------------- operations (30)
def gen_operations(n):
    for _ in range(n):
        kind = rng.randrange(3)
        if kind == 0:
            a, b = rng.randrange(4, 15), rng.randrange(2, 9)
            c = a * b
            add("operations",2,
                f"If '+' means '×' and '−' means '÷', then {a} + {b} = ?",
                c, [a+b, a-b if a>b else b-a, c+b, c-a],
                f"Step 1: rewrite the expression using the REAL operation each symbol stands for — here '+' secretly means '×'. "
                f"Step 2: the expression {a} + {b} becomes {a} × {b} once rewritten. "
                f"Step 3: calculate: {a} × {b} = {c}. The distractor {a+b} comes from forgetting to swap the symbol and adding normally instead.")
        elif kind == 1:
            a, b, c_ = rng.randrange(6, 20), rng.randrange(2, 6), rng.randrange(2, 9)
            val = a + b * c_
            add("operations",2,
                f"Using BODMAS, {a} + {b} × {c_} = ?",
                val, [(a+b)*c_, a*b+c_, val+b, val-c_],
                f"Step 1: apply BODMAS — Multiplication happens before Addition, regardless of left-to-right order in the sentence. "
                f"Step 2: compute the multiplication first: {b} × {c_} = {b*c_}. "
                f"Step 3: now add: {a} + {b*c_} = {val}. The distractor {(a+b)*c_} comes from wrongly adding first, then multiplying.")
        else:
            a, b = rng.randrange(10, 30), rng.randrange(2, 10)
            val = a - b + b*2
            add("operations",3,
                f"If '−' means '+', '+' means '×2 of the second number added', solve mentally: interchange '×' and '+' in  {a} × {b} = ?  (i.e., compute {a} + {b})",
                a+b, [a*b, a-b, a+b+2, a+b-1],
                f"Step 1: interchange the operations exactly as instructed — swap what '×' and '+' represent in this question. "
                f"Step 2: after interchanging, the required calculation reduces to a straightforward addition: {a} + {b}. "
                f"Step 3: {a} + {b} = {a+b}. The distractor {a*b} comes from forgetting to interchange and multiplying directly instead.")

# ---------------- space / directions (20)
DIRS = ["North","East","South","West"]
def gen_space(n):
    for _ in range(n):
        kind = rng.randrange(2)
        if kind == 0:
            start = rng.randrange(4); turns = rng.randrange(1, 4)
            seq, cur = [], start
            for _ in range(turns):
                t = rng.choice(["left","right"])
                cur = (cur - 1) % 4 if t == "left" else (cur + 1) % 4
                seq.append(t)
            c = DIRS[cur]
            steps_txt = []
            pos = start
            for t in seq:
                pos = (pos - 1) % 4 if t == "left" else (pos + 1) % 4
                steps_txt.append(f"{t} turn → now facing {DIRS[pos]}")
            add("space",2,
                f"A man faces {DIRS[start]}. He turns {', then '.join(seq)}. Which direction does he face now?",
                c, [d for d in DIRS if d != c],
                f"Step 1: sketch the compass ring N→E→S→W→N. A right turn moves one step forward in this ring; a left turn moves one step backward. "
                f"Step 2: starting at {DIRS[start]}, apply each turn in order: {'; '.join(steps_txt)}. "
                f"Step 3: after all turns, he faces {c}.")
        else:
            d1, d2 = rng.choice([(3,4,5),(6,8,10),(5,12,13),(9,12,15)])[:2]
            hyp = int(math.hypot(d1, d2))
            dir1, dir2 = rng.choice([("North","East"),("South","West"),("North","West"),("South","East")])
            add("space",2,
                f"Riya walks {d1} km {dir1}, then {d2} km {dir2}. How far is she from the start (straight line)?",
                f"{hyp} km", [f"{d1+d2} km", f"{abs(d2-d1)} km", f"{hyp+1} km", f"{hyp-1} km"],
                f"Step 1: since {dir1} and {dir2} are perpendicular directions, the two legs of the walk form a right angle — draw them as two sides of a right triangle. "
                f"Step 2: the straight-line distance back to start is the hypotenuse: use Pythagoras, √({d1}² + {d2}²) = √{d1*d1+d2*d2}. "
                f"Step 3: √{d1*d1+d2*d2} = {hyp} km. Simply adding the two legs ({d1+d2} km) ignores that she isn't walking in a straight line.")

# ---------------- venn (20)
VENN = [
    ("Doctors, Men, Fathers","Three intersecting circles",["Concentric circles","Separate circles","One inside another"],"the three groups partially overlap each other"),
    ("Fruits, Mangoes, Apples","Two separate circles inside one big circle",["Three intersecting circles","Concentric circles","Three separate circles"],"mangoes and apples are both fruits but no mango is an apple"),
    ("Animals, Dogs, Pets","Dogs inside Animals, Pets intersecting both",["Three separate circles","Concentric circles","Pets inside Dogs"],"all dogs are animals; some dogs and some other animals are pets"),
    ("Teachers, Women, Mothers","Three intersecting circles",["Concentric circles","Separate circles","Women inside Mothers"],"each pair can overlap without containment"),
    ("Vehicles, Cars, Scooters","Cars and Scooters as separate circles inside Vehicles",["Three intersecting circles","Concentric circles","Cars inside Scooters"],"cars and scooters are disjoint types of vehicles"),
    ("Living beings, Plants, Trees","Trees inside Plants inside Living beings (concentric)",["Three intersecting circles","Three separate circles","Trees intersecting Plants"],"every tree is a plant and every plant is a living being"),
    ("Students, Cricketers, Girls","Three intersecting circles",["Concentric circles","Separate circles","Cricketers inside Girls"],"each pair overlaps partially"),
    ("Months, Years, Weeks","Three separate circles",["Three intersecting circles","Concentric circles","Weeks inside Months"],"as units they are distinct categories, none contains another as a set of members"),
]
def gen_venn(n):
    i = 0
    for _ in range(n):
        if i < len(VENN):
            items, c, dist, why = VENN[i]; i += 1
            add("venn",2, f"Which diagram best represents: {items}?", c, dist,
                f"Step 1: check each pair of groups in '{items}' for one of three relations — fully contains, partially overlaps, or is completely separate. "
                f"Step 2: here, {why}. "
                f"Step 3: draw circles matching exactly that relation: {c.lower()}. Any diagram showing full containment where only partial overlap exists (or vice versa) is wrong.")
        else:
            g1, tot = rng.choice([(25,40),(30,50),(18,30),(24,45)])
            both = rng.choice([8,10,12])
            g2 = tot - g1 + both
            add("venn",3,
                f"In a class of {tot}, {g1} like tea and {g2} like coffee. Everyone likes at least one. How many like both?",
                both, [both+2, both-2 if both>2 else both+4, g2-g1 if g2>g1 else g1-g2, tot-g1],
                f"Step 1: use the two-set union formula n(A∪B) = n(A) + n(B) − n(A∩B), since everyone likes at least one drink, n(A∪B) equals the whole class. "
                f"Step 2: substitute the known values: {tot} = {g1} + {g2} − both. "
                f"Step 3: solve for 'both': both = {g1} + {g2} − {tot} = {both}. This overlap region is exactly the lens-shaped zone from the Venn diagram lesson.")

# ---------------- inference / syllogism (40)
SYLLO = [
    ("All keys are locks. All locks are doors.","All keys are doors.","Some doors are keys.","Both follow",
     "Keys ⊂ locks ⊂ doors gives conclusion I; conversion of I gives II."),
    ("All pens are books. Some books are red.","All pens are red.","Some pens are books.","Only conclusion II follows",
     "Pens being books doesn't make them red (the red books may be others). II is direct from statement 1."),
    ("Some cats are dogs. All dogs are birds.","Some cats are birds.","All birds are dogs.","Only conclusion I follows",
     "The cats that are dogs must be birds (I). II illegally reverses 'all dogs are birds'."),
    ("No man is immortal. Ram is a man.","Ram is immortal.","Ram is not immortal.","Only conclusion II follows",
     "If no man is immortal and Ram is a man, Ram cannot be immortal."),
    ("All soldiers are brave. Some soldiers are tall.","Some brave people are tall.","All tall people are soldiers.","Only conclusion I follows",
     "The tall soldiers are brave, so some brave are tall. II reverses illegally."),
    ("Some books are pens. Some pens are pencils.","Some books are pencils.","Some pencils are pens.","Only conclusion II follows",
     "Two 'some' statements never chain (I invalid). II is just conversion of statement 2."),
    ("All roses are flowers. No flower is black.","No rose is black.","Some roses are black.","Only conclusion I follows",
     "Roses ⊂ flowers and flowers exclude black → roses exclude black."),
    ("All students play chess. Mohan does not play chess.","Mohan is not a student.","Mohan is a teacher.","Only conclusion I follows",
     "Contrapositive: not chess → not student. Nothing says he's a teacher."),
]
STMT = [
    ("The government has banned single-use plastic bags.","People will completely stop using all plastic.","Shopkeepers must find alternative packaging.","Only conclusion II follows",
     "A ban on one type doesn't stop all plastic use; but sellers must adapt."),
    ("This train stops only at major stations.","The train stops at every station.","Small stations will be skipped.","Only conclusion II follows",
     "'Only major stations' directly implies skipping the small ones."),
    ("All applicants must be graduates.","A person with only 10th pass can apply.","A graduate may apply.","Only conclusion II follows",
     "Graduation is required, so a 10th-pass cannot apply; a graduate can."),
    ("Wearing helmets reduces head injuries in accidents.","Helmets should be worn while riding.","Accidents never injure helmet wearers.","Only conclusion I follows",
     "Reduction ≠ elimination; 'never' is too strong. Advice to wear follows."),
]
def gen_inference(n):
    i = j = 0
    for _ in range(n):
        if rng.random() < .65 and i < len(SYLLO)*3:
            s = SYLLO[i % len(SYLLO)]; i += 1
            stmts, c1, c2, correct, why = s
            add("inference",2,
                f"Statements: {stmts}\nConclusion I: {c1} Conclusion II: {c2}",
                correct, [x for x in ["Only conclusion I follows","Only conclusion II follows","Both follow","Neither follows"] if x != correct],
                f"Step 1: translate the statements into set relations (All/Some/No) and check if they chain together logically. "
                f"Step 2: test conclusion I against the statements, then test conclusion II separately — never assume both stand or fall together. "
                f"Step 3: {why} That's why the answer is '{correct}'.")
        elif j < len(STMT)*2:
            s = STMT[j % len(STMT)]; j += 1
            stmt, c1, c2, correct, why = s
            add("inference",2,
                f"Statement: {stmt}\nConclusion I: {c1} Conclusion II: {c2}",
                correct, [x for x in ["Only conclusion I follows","Only conclusion II follows","Both follow","Neither follows"] if x != correct],
                f"Step 1: read the statement literally — don't assume anything beyond exactly what it says. "
                f"Step 2: check each conclusion strictly against that literal meaning, not against general assumptions about the topic. "
                f"Step 3: {why} That's why the answer is '{correct}'.")

# ---------------- matching / address checking (30)
NAMES = ["Mohd Ashraf Bhat","Rakesh Kumar Sharma","Shabir Ahmad Dar","Anita Devi Gupta","Tariq Hussain Mir",
         "Suresh Chander Singh","Farhana Akhter Wani","Vikram Raj Slathia","Nusrat Jan Khan","Deepak Verma Gupta"]
ADDR = ["H.No 42, Sec 3, Trikuta Nagar, Jammu 180012","Lane 7, Rajbagh, Srinagar 190008",
        "Ward 5, Udhampur 182101","Mohalla Kalan, Baramulla 193101","Sec 1, Channi Himmat, Jammu 180015"]
def corrupt(s):
    i = rng.randrange(len(s))
    ch = s[i]
    if ch.isdigit(): rep = str((int(ch)+rng.randrange(1,9)) % 10)
    elif ch.isalpha(): rep = rng.choice([c for c in (A if ch.isupper() else A.lower()) if c != ch])
    else: return corrupt(s)
    return s[:i] + rep + s[i+1:]
def gen_matching(n):
    for _ in range(n):
        base = rng.choice(NAMES) + ", " + rng.choice(ADDR)
        wrongs = set()
        while len(wrongs) < 3:
            w = corrupt(base)
            if w != base: wrongs.add(w)
        add("matching",2,
            f"Exactly ONE of the four options matches the given text perfectly. Find it.\nGiven: {base}",
            base, list(wrongs),
            "Step 1: split the text into chunks (name, street, city, PIN code) rather than reading it as one block. "
            "Step 2: compare each chunk of every option against the given text, one chunk at a time. "
            "Step 3: the three wrong options each have exactly ONE character changed (a swapped digit or letter, often hidden in the PIN code) — the option with zero changes anywhere is the match.")

# ---------------- arithmetical reasoning (45)
def gen_arith_reasoning(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            fs = rng.choice([24,28,30,32,36,40]); ratio = rng.choice([2,3,4])
            son = fs // (ratio + 1) if fs % (ratio+1)==0 else None
            if son is None:
                fs, ratio = 36, 2
                son = 12
            dad = fs - son
            add("arith_reasoning",2,
                f"A father is {ratio} times as old as his son. The sum of their ages is {fs} years. The son's age is:",
                f"{son} years", [f"{dad} years", f"{son+2} years", f"{son-2} years", f"{fs//2} years"],
                f"Step 1: let the son's age be x; then the father's age is {ratio}x (since he is {ratio} times as old). "
                f"Step 2: their sum is given as {fs}, so write the equation: x + {ratio}x = {fs}, i.e. {ratio+1}x = {fs}. "
                f"Step 3: solve for x: x = {fs} ÷ {ratio+1} = {son}. The son is {son} years old (and the father is {dad}).")
        elif kind == 1:
            hens = rng.randrange(3, 12); cows = rng.randrange(2, 8)
            heads, legs = hens + cows, hens*2 + cows*4
            add("arith_reasoning",3,
                f"A farm has hens and cows: {heads} heads and {legs} legs in all. How many cows are there?",
                cows, [hens, cows+1, cows-1 if cows>1 else cows+2, heads-1],
                f"Step 1: assume ALL {heads} animals were hens (2 legs each) — that would give {heads*2} legs total. "
                f"Step 2: the actual leg count is {legs}, which is {legs-heads*2} MORE than the all-hens assumption — this excess comes from cows having 2 extra legs each. "
                f"Step 3: number of cows = excess legs ÷ 2 = {legs-heads*2} ÷ 2 = {cows}.")
        elif kind == 2:
            h = rng.randrange(1, 13); m = rng.choice([0, 30])
            angle = abs(30*h - 5.5*m)
            if angle > 180: angle = 360 - angle
            add("arith_reasoning",3,
                f"The angle between the hands of a clock at {h}:{m:02d} is:",
                f"{angle:g}°", [f"{angle+15:g}°", f"{abs(angle-15):g}°", f"{angle+30:g}°", f"{angle/2:g}°"],
                f"Step 1: use the clock-angle formula: angle = |30×Hour − 5.5×Minute|. "
                f"Step 2: substitute H={h}, M={m}: |30×{h} − 5.5×{m}| = |{30*h} − {5.5*m:g}|. "
                f"Step 3: {30*h} − {5.5*m:g} = {30*h - 5.5*m:g}, so the angle is {angle:g}° (taking the smaller angle if it exceeds 180°).")
        else:
            y = rng.choice([2024, 2020, 2016, 2028])
            add("arith_reasoning",2,
                f"Which of these is true about the year {y}?",
                "It is a leap year with 366 days",
                ["It has 365 days","February has 28 days in it","It is not divisible by 4"],
                f"Step 1: apply the leap-year rule: a year is a leap year if divisible by 4, EXCEPT century years (divisible by 100) which must also be divisible by 400. "
                f"Step 2: {y} ÷ 4 = {y//4} exactly, and {y} is not a century year, so no further check is needed. "
                f"Step 3: {y} is a leap year — it has 366 days, with February getting 29 (not 28) days.")

# ---------------- problem solving / word building (20)
WORDBUILD = [
    ("EXAMINATION","NATION",["MINUTE","ANIMAL","EXTREME"],"N-A-T-I-O-N can all be found in EXAMINATION; the others need letters it lacks"),
    ("CONSTABLE","STABLE",["CASTLE ROCK","CANNOT","BOTTLE"],"S-T-A-B-L-E are all present; others need letters not in CONSTABLE"),
    ("DEPARTMENT","PARENT",["MOMENT","TRADEMARK","PANDIT"],"P-A-R-E-N-T all occur in DEPARTMENT"),
    ("INSPECTOR","PROTEIN",["SPECTACLE","INTEREST","PAINTER"],"P-R-O-T-E-I-N can be formed; the others need extra letters"),
    ("KASHMIR","SHIRK",["MARSH GAS","SMIRKS","HAMMER"],"S-H-I-R-K uses letters of KASHMIR once each"),
]
def gen_problem_solving(n):
    i = 0
    for _ in range(n):
        if i < len(WORDBUILD):
            big, c, dist, why = WORDBUILD[i]; i += 1
            add("problem_solving",2,
                f"Which word can be formed using only the letters of {big}?",
                c, dist,
                f"Step 1: list the letters available in {big}, noting how many times each repeats. "
                f"Step 2: check each option letter by letter, confirming every letter it needs is available in {big} WITHOUT exceeding how many times that letter repeats there. "
                f"Step 3: {why}. The wrong options each need at least one letter that {big} doesn't provide (or doesn't provide enough copies of).")
        else:
            total = rng.choice([30, 36, 45, 50])
            r = rng.choice([2, 3, 4])
            part = total*r//(r+1)
            add("problem_solving",2,
                f"In a queue of {total} people, Ravi is at such a position that {r} times as many people stand ahead of him as behind him. How many stand ahead of him?",
                part - (1 if (total - 1) % (r+1) else 0) if (total-1)%(r+1)==0 else (total-1)*r//(r+1),
                [total//2, (total-1)//(r+1), total-r, (total-1)*r//(r+1) + 1],
                f"Step 1: excluding Ravi himself, the remaining {total-1} people split into 'ahead' and 'behind' groups in the ratio {r}:1. "
                f"Step 2: total parts = {r}+1 = {r+1}; each part = {total-1} ÷ {r+1}. "
                f"Step 3: people ahead = {r} parts = {r}/{r+1} × {total-1} = {(total-1)*r//(r+1)}.")

# ---------------- critical / EI (15)
CRITICAL = [
    ("During a heated argument between two colleagues, the most emotionally intelligent first response is to:",
     "Stay calm and listen to both sides before responding",
     ["Take the side of your closer friend","Raise your voice to end the argument","Walk away and complain to others"],
     "Emotional intelligence starts with self-regulation and empathy — listen first, react later."),
    ("You receive harsh criticism from a senior on work you did carefully. The best response is to:",
     "Ask specifically what can be improved and note it",
     ["Argue back immediately to defend yourself","Ignore the feedback completely","Complain about the senior to teammates"],
     "Seeking specifics converts criticism into usable feedback — a hallmark of emotional maturity."),
    ("A teammate repeatedly misses deadlines, hurting the whole team. The most constructive step is to:",
     "Speak to them privately to understand the reason",
     ["Publicly blame them in a meeting","Report them without any conversation","Do their work silently forever"],
     "Private, empathetic conversation addresses causes without humiliation."),
    ("While on duty, an officer sees a crowd turning aggressive. The FIRST priority should be to:",
     "De-escalate calmly and call for backup",
     ["Charge into the crowd alone","Leave the spot quietly","Start filming for evidence only"],
     "De-escalation plus backup protects lives — solo heroics escalate risk."),
    ("You feel intense frustration just before an important exam. The best strategy is to:",
     "Take slow deep breaths and refocus on one question at a time",
     ["Quit the exam hall for relief","Rush through all answers quickly","Keep thinking about the frustration"],
     "Controlled breathing lowers arousal; refocusing restores working memory — practical self-regulation."),
]
def gen_critical(n):
    for i in range(min(n, len(CRITICAL))):
        qt, c, dist, why = CRITICAL[i]
        add("critical",1, qt, c, dist, why)

# ---------------- memory/observation (text-adapted) (10)
def gen_memory(n):
    for _ in range(n):
        letters = "".join(rng.sample(A, 8))
        pos = rng.randrange(2, 7)
        c = letters[pos]
        add("memory",2,
            f"In the arrangement  {' '.join(letters)}  which letter is exactly {pos+1}th from the LEFT?",
            c, [x for x in letters if x != c][:3] + [letters[-(pos+1)]],
            f"Step 1: re-read the question carefully to confirm the direction — 'from the LEFT', not from the right. "
            f"Step 2: number each letter's position starting at 1 from the left: {', '.join(f'{ltr}={idx+1}' for idx, ltr in enumerate(letters[:pos+1]))}. "
            f"Step 3: position {pos+1} holds the letter {c}. Counting from the wrong end would instead point to {letters[-(pos+1)]}.")

PLAN = [
    (gen_analogies, 45), (gen_classification, 35), (gen_series, 50), (gen_coding, 50),
    (gen_operations, 30), (gen_space, 20), (gen_venn, 20), (gen_inference, 40),
    (gen_matching, 30), (gen_arith_reasoning, 45), (gen_problem_solving, 20),
    (gen_critical, 5), (gen_memory, 10),
]

for fn, cnt in PLAN: fn(cnt)

# dedupe + top-up
seen, out = set(), []
for q in R:
    if q["q"] not in seen:
        seen.add(q["q"]); out.append(q)
guard = 0
TOPUP = [gen_series, gen_coding, gen_arith_reasoning, gen_matching, gen_space, gen_analogies, gen_operations]
while len(out) < 400 and guard < 4000:
    before = len(R)
    rng.choice(TOPUP)(1)
    for q in R[before:]:
        if q["q"] not in seen:
            seen.add(q["q"]); out.append(q)
    guard += 1
out = out[:400]

for i, q in enumerate(out): q["id"] = f"R{i+1:03d}"
js = ",\n".join(json.dumps(r, ensure_ascii=False) for r in out)
(OUT / "bank-reasoning.js").write_text(
    f"/* bank-reasoning.js — Section A General Intelligence & Reasoning · {len(out)} questions */\n"
    f"registerBank([\n{js}\n]);\n", encoding="utf-8")

for r in out:
    assert len(r["opts"]) == 4 and len(set(r["opts"])) == 4 and 0 <= r["ans"] <= 3, r
    assert "​" not in "".join(r["opts"]), ("filler leaked", r)
print(f"bank-reasoning.js: {len(out)} questions, integrity OK")
from collections import Counter
print(Counter(q["topic"] for q in out))
