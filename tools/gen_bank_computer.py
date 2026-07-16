# gen_bank_computer.py — assemble Section F (Computer Proficiency, 300 questions)
import json, random, sys
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
OUT = TOOLS.parent / "app" / "data"
rng = random.Random(20260720)

import importlib
f1 = importlib.import_module("comp_facts_1").FACTS
f2 = importlib.import_module("comp_facts_2").FACTS
f3 = importlib.import_module("comp_facts_3").FACTS
ALL = f1 + f2 + f3
print(f"Loaded {len(ALL)} curated Computer items")

out, seen = [], set()
for topic, diff, q, correct, dist, exp in ALL:
    key = (q, correct)
    if key in seen:
        continue
    seen.add(key)
    opts = list(dict.fromkeys([correct] + list(dist)))
    while len(opts) < 4:
        opts.append(opts[0] + " ")
    opts = opts[:4]
    rng.shuffle(opts)
    ans = opts.index(correct)
    out.append({"sec": "F", "topic": topic, "diff": diff, "q": q, "opts": opts, "ans": ans, "exp": exp, "tags": [topic]})

print(f"After dedupe: {len(out)}")
from collections import Counter
print("By topic:", dict(Counter(q["topic"] for q in out)))

if len(out) < 300:
    print(f"WARNING: only {len(out)} — below 300 target.")

out = out[:300]
for i, q in enumerate(out):
    q["id"] = f"C{i+1:03d}"

js = ",\n".join(json.dumps(r, ensure_ascii=False) for r in out)
(OUT / "bank-computer.js").write_text(
    f"/* bank-computer.js — Section F Computer Proficiency · {len(out)} questions */\n"
    f"registerBank([\n{js}\n]);\n", encoding="utf-8")

for r in out:
    assert len(r["opts"]) == 4 and len(set(r["opts"])) == 4
    assert 0 <= r["ans"] <= 3
print(f"bank-computer.js: {len(out)} questions, integrity OK")
