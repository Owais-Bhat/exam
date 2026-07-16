# gen_bank_ga.py — assemble Section B (General Awareness, 400 questions) from curated facts
import json, random, sys
from pathlib import Path

TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
OUT = TOOLS.parent / "app" / "data"

rng = random.Random(20260718)

import importlib
facts1 = importlib.import_module("ga_facts_1").FACTS
facts2 = importlib.import_module("ga_facts_2").FACTS
facts3 = importlib.import_module("ga_facts_3").FACTS
facts4 = importlib.import_module("ga_facts_4").FACTS

ALL = facts1 + facts2 + facts3 + facts4
print(f"Loaded {len(ALL)} curated GA facts")

out = []
seen_q = set()
for topic, diff, q, correct, dist, exp in ALL:
    key = (q, correct)
    if key in seen_q:
        continue
    seen_q.add(key)
    opts = [correct] + list(dist)
    # ensure exactly 4 unique options
    opts = list(dict.fromkeys(opts))  # dedupe preserving order
    while len(opts) < 4:
        opts.append(opts[0] + " ")  # should not trigger; safety only
    opts = opts[:4]
    rng.shuffle(opts)
    ans = opts.index(correct)
    out.append({"sec": "B", "topic": topic, "diff": diff, "q": q, "opts": opts, "ans": ans, "exp": exp, "tags": [topic]})

print(f"After dedupe: {len(out)} unique questions")

from collections import Counter
counts = Counter(q["topic"] for q in out)
print("By topic:", dict(counts))

if len(out) < 400:
    print(f"WARNING: only {len(out)} questions — below the 400 target. Add more facts to ga_facts_*.py.")

out = out[:400]
for i, q in enumerate(out):
    q["id"] = f"G{i+1:03d}"

js = ",\n".join(json.dumps(r, ensure_ascii=False) for r in out)
(OUT / "bank-ga.js").write_text(
    f"/* bank-ga.js — Section B General Awareness · {len(out)} questions (curated, static-heavy + current affairs 2025-26) */\n"
    f"registerBank([\n{js}\n]);\n", encoding="utf-8")

for r in out:
    assert len(r["opts"]) == 4 and len(set(r["opts"])) == 4, ("bad opts", r["q"])
    assert 0 <= r["ans"] <= 3
print(f"bank-ga.js: {len(out)} questions, integrity OK")
