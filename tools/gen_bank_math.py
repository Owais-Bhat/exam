# gen_bank_math.py — programmatic generator for Section C (Quant 300) and E (Math 300)
# Answers are COMPUTED, never guessed. Deterministic via seed.
import json, math, random
from fractions import Fraction
from pathlib import Path

rng = random.Random(20260716)
OUT = Path(__file__).resolve().parent.parent / "app" / "data"

def money(n):
    return f"₹{n:,}"

def opts_from(correct, distractors, fmt=str):
    """Build 4 unique options, return (opts, ans_index)."""
    seen, opts = {fmt(correct)}, [fmt(correct)]
    for d in distractors:
        s = fmt(d)
        if s not in seen:
            seen.add(s); opts.append(s)
        if len(opts) == 4: break
    bump = 1
    while len(opts) < 4:  # emergency filler
        cand = fmt(correct + bump if isinstance(correct, (int, float)) else str(correct) + "*")
        if cand not in seen:
            seen.add(cand); opts.append(cand)
        bump += rng.choice([1, 2, 3])
    rng.shuffle(opts)
    return opts, opts.index(fmt(correct))

Q = []   # section C
M = []   # section E

def add(store, sec, topic, diff, q, correct, distractors, exp, fmt=str, tags=None, real=False):
    opts, ans = opts_from(correct, distractors, fmt)
    row = {"sec": sec, "topic": topic, "diff": diff, "q": q,
           "opts": opts, "ans": ans, "exp": exp, "tags": tags or [topic]}
    if real:
        row["real"] = True
    store.append(row)

# ===================================================== verified real 2022 JKSSB SI paper (Quant)
add(Q, "C", "profit", 2,
    "Mohan gets a 5% discount on an article and thereby saves Rs 30. How much does he pay for it?",
    570, [560, 580, 550],
    "5% discount = Rs 30, so full price = 30 / 0.05 = Rs 600. Amount paid = 600 − 30 = Rs 570.",
    real=True)
add(Q, "C", "ratio", 2,
    "Which number bears the same ratio to 7/43 that 9/22 bears to 5/11?",
    "63/430", ["61/430", "63/431", "61/431"],
    "Let the number be x. x ÷ (7/43) = (9/22) ÷ (5/11) = (9/22)×(11/5) = 9/10. So x = (7/43)×(9/10) = 63/430.",
    real=True)
add(Q, "C", "percentage", 2,
    "If Rs 306 is 5/9% of the price of a sofa, find the price of the sofa.",
    55080, [64560, 5580, 75840],
    "5/9% = 5/900 as a fraction. Price = 306 ÷ (5/900) = 306 × 900/5 = Rs 55,080.",
    real=True)
add(Q, "C", "ratio", 2,
    "If x : y = 1 : 3, find the ratio (7x² + 3xy) : (2xy + y²).",
    "16:15", ["10:3", "16:5", "16:7"],
    "Put x=1, y=3. Numerator = 7(1)+3(1×3) = 7+9 = 16. Denominator = 2(1×3)+9 = 6+9 = 15. Ratio = 16:15.",
    real=True)
add(Q, "C", "averages", 2,
    "The average weight of 25 kids in a class is 24 kg. When a teacher's weight is added, the average rises by 2 kg. Find the teacher's weight.",
    76, [50, 75, 84],
    "Old total = 25×24 = 600. New average = 26, new count = 26, new total = 26×26 = 676. Teacher's weight = 676 − 600 = 76 kg.",
    real=True)
add(Q, "C", "tsd", 1,
    "Rohit leaves home at 5:40 pm. He takes 30 minutes to reach the station, 10 minutes for breakfast there, and then 40 minutes to reach office. At what time does he reach office?",
    "7:00 pm", ["6:50 pm", "7:10 pm", "7:20 pm"],
    "Total time = 30 + 10 + 40 = 80 minutes = 1 hr 20 min. 5:40 pm + 1:20 = 7:00 pm.",
    real=True)

# ============================================================ QUANT (C)
def gen_percentage(n):
    for _ in range(n):
        kind = rng.randrange(5)
        if kind == 0:
            p = rng.choice([5,10,12,15,20,25,30,40,60,75]); base = rng.choice([120,240,300,360,400,480,500,600,800,1200])
            c = base*p//100
            add(Q,"C","percentage",1, f"What is {p}% of {base}?", c, [c+base//100, c-base//100 if c>base//100 else c+2*base//100, c*2, c//2 or c+5],
                f"{p}% of {base} = {base} × {p}/100 = {c}.", str)
        elif kind == 1:
            old = rng.choice([200,250,400,500,800,1000]); p = rng.choice([10,15,20,25,30])
            new = old + old*p//100
            add(Q,"C","percentage",1, f"The price of an article rises from {money(old)} to what value after a {p}% increase?",
                money(new), [money(old+old*p//200), money(old*p//100), money(new+old//20), money(old - old*p//100)],
                f"Increase = {old}×{p}/100 = {old*p//100}; new price = {old} + {old*p//100} = {new}.", str)
        elif kind == 2:
            a = rng.choice([10,20,25,50]); b = rng.choice([10,20,25,50])
            net = a + b + a*b/100 if rng.random()<.5 else a - b - a*b/100
            up = net >= 0
            q = f"A number is increased by {a}% and then {'increased' if a+b+a*b/100==net else 'decreased'} by {b}%. The net change is:"
            c = f"{abs(net):.0f}% {'increase' if up else 'decrease'}" if net==int(net) else f"{abs(net):.1f}% {'increase' if up else 'decrease'}"
            wrongs = [f"{a+b}% increase", f"{abs(a-b)}% decrease", f"{abs(net)+5:.0f}% {'increase' if up else 'decrease'}", "No change"]
            add(Q,"C","percentage",2, q, c, wrongs,
                f"Successive change = a + b + ab/100 = {net:+.1f}%. Positive means increase.", str)
        elif kind == 3:
            total = rng.choice([400,500,600,800]); passp = rng.choice([33,35,40,45])
            marks = total*passp//100; short = rng.choice([10,15,20,25])
            got = marks - short
            add(Q,"C","percentage",2,
                f"A student needs {passp}% to pass an exam of {total} marks. He scores {got} and fails by {short} marks. The pass mark is:",
                marks, [got, marks+short, total//2, marks-short],
                f"Pass mark = {passp}% of {total} = {marks}. (He got {got}, which is {short} short.)", str)
        else:
            x = rng.choice([15,20,25,30,40]); y = rng.choice([300,400,500,600])
            c = y*100//x
            add(Q,"C","percentage",2, f"If {x}% of a number is {y}, the number is:",
                c, [y*x//100, c//2, c*2, c+y//10],
                f"Number = {y} × 100/{x} = {c}.", str)

def gen_ratio(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            a,b = rng.choice([(2,3),(3,4),(3,5),(4,5),(5,7),(2,5)])
            total = (a+b) * rng.choice([60,80,100,120,150])
            share = total*a//(a+b)
            add(Q,"C","ratio",1, f"Divide {money(total)} between A and B in the ratio {a}:{b}. A's share is:",
                money(share), [money(total*b//(a+b)), money(total//2), money(share+((total//(a+b))//2)), money(share - total//(a+b)//2)],
                f"A gets {a}/{a+b} of {total} = {share}.", str)
        elif kind == 1:
            a,b = rng.choice([(2,3),(3,4),(4,5)]); c,d = rng.choice([(5,6),(2,5),(3,7),(6,7)])
            # a:b and b:c -> a:c ; scale via lcm of b terms
            l = math.lcm(b, c)
            A, C = a*(l//b), d*(l//c)
            g = math.gcd(A, C)
            add(Q,"C","ratio",2, f"If A:B = {a}:{b} and B:C = {c}:{d}, then A:C is:",
                f"{A//g}:{C//g}", [f"{a}:{d}", f"{a*c}:{b*d if b*d != a*d else b*d+1}", f"{C//g}:{A//g}", f"{a+c}:{b+d}"],
                f"Make B equal: A:B:C = {A}:{l}:{C}, so A:C = {A//g}:{C//g}.", str)
        elif kind == 2:
            r1,r2 = rng.choice([(3,4),(4,5),(5,6),(2,3)]); yrs = rng.choice([4,5,6,8,10])
            # ages now in ratio r1:r2, after yrs ratio? pick base to make clean question reversed
            k = rng.choice([4,5,6,8])
            a_now, b_now = r1*k, r2*k
            add(Q,"C","ratio",2,
                f"The present ages of two brothers are in the ratio {r1}:{r2}. If the younger is {a_now} years old, the elder's age is:",
                b_now, [b_now+yrs, a_now+ (b_now-a_now)//2 or b_now-2, r2*rng.choice([3,7]), b_now - k],
                f"One ratio unit = {a_now}/{r1} = {k} years, so elder = {r2}×{k} = {b_now}.", str)
        else:
            m,w = rng.choice([(7,3),(9,5),(5,2),(8,3)]); total = (m+w)*rng.choice([10,20,30])
            men = total*m//(m+w)
            add(Q,"C","ratio",1, f"In a group of {total} people, men and women are in the ratio {m}:{w}. The number of women is:",
                total-men, [men, total//2, total-men+ (m-w), (total-men)-2],
                f"Women = {w}/{m+w} × {total} = {total-men}.", str)

def gen_averages(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            k = rng.choice([5,6,8,10]); avg = rng.choice([12,15,18,20,24,30])
            nums_sum = k*avg
            add(Q,"C","averages",1, f"The average of {k} numbers is {avg}. Their sum is:",
                nums_sum, [nums_sum//k, nums_sum+k, nums_sum-avg, nums_sum+avg],
                f"Sum = count × average = {k} × {avg} = {nums_sum}.", str)
        elif kind == 1:
            n0 = rng.choice([20,24,25,30]); avg = rng.choice([22,24,26,28]); rise = rng.choice([1,2,3])
            man = avg + (n0+1)*rise
            add(Q,"C","averages",2,
                f"The average weight of {n0} students is {avg} kg. When a teacher joins, the average increases by {rise} kg. The teacher's weight is:",
                f"{man} kg", [f"{avg+rise} kg", f"{man-rise} kg", f"{avg*rise+n0} kg", f"{man+rise} kg"],
                f"Teacher's weight = new average + old count × rise = {avg+rise} + {n0}×{rise} = {man} kg.", str)
        elif kind == 2:
            start = rng.choice([11,21,31,41]); k = rng.choice([5,7,9])
            c = start + k - 1  # average of k consecutive odd/any numbers spaced 2: mean = middle
            seq = [start + 2*i for i in range(k)]
            add(Q,"C","averages",2, f"The average of the consecutive odd numbers {', '.join(map(str,seq))} is:",
                sum(seq)//k, [seq[0], seq[-1], sum(seq)//k + 2, sum(seq)//k - 2],
                f"For equally spaced numbers the average is the middle term = {sum(seq)//k}.", str)
        else:
            runs = rng.choice([50,52,54,56,58]); inn = rng.choice([10,12,15,20]); new = rng.choice([90,100,110,120])
            newavg = (runs*inn + new) / (inn+1)
            newavg_i = round(newavg, 1)
            add(Q,"C","averages",2,
                f"A batsman's average after {inn} innings is {runs}. After scoring {new} in the next innings, his new average is:",
                newavg_i, [runs+2, round((runs+new)/2,1), newavg_i+1, newavg_i-1],
                f"New average = ({runs}×{inn} + {new})/{inn+1} = {newavg_i}.",
                lambda v: f"{v:g}")

def gen_interest(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            p = rng.choice([2000,4000,5000,6000,8000,10000]); r = rng.choice([4,5,6,8,10]); t = rng.choice([2,3,4,5])
            si = p*r*t//100
            add(Q,"C","interest",1, f"The simple interest on {money(p)} at {r}% p.a. for {t} years is:",
                money(si), [money(si+p*r//100), money(si-p*r//100), money(si*2), money(p*r//100)],
                f"SI = PRT/100 = {p}×{r}×{t}/100 = {si}.", str)
        elif kind == 1:
            p = rng.choice([5000,8000,10000,12000]); r = rng.choice([10,20,5])
            amt2 = p*(100+r)**2//10000
            ci = amt2 - p
            add(Q,"C","interest",2, f"The compound interest on {money(p)} at {r}% p.a. for 2 years (compounded annually) is:",
                money(ci), [money(p*r*2//100), money(ci + p*r//100), money(ci - p*r*r//10000), money(amt2)],
                f"Amount = {p}×(1+{r}/100)² = {amt2}; CI = {amt2} − {p} = {ci}.", str)
        elif kind == 2:
            p = rng.choice([4000,6000,8000,10000]); r = rng.choice([5,10,20])
            diff = p*r*r//10000
            add(Q,"C","interest",3, f"The difference between CI and SI on {money(p)} for 2 years at {r}% p.a. is:",
                money(diff), [money(diff*2), money(p*r//100), money(diff//2 or diff+10), money(diff+r)],
                f"CI − SI (2 yrs) = P(r/100)² = {p}×({r}/100)² = {diff}.", str)
        else:
            si = rng.choice([600,800,1200,1500]); r = rng.choice([4,5,6]); t = rng.choice([3,4,5])
            p = si*100//(r*t)
            add(Q,"C","interest",2, f"At {r}% p.a. simple interest, a sum earns {money(si)} in {t} years. The principal is:",
                money(p), [money(p+si), money(p//2), money(p*2), money(si*r*t//100)],
                f"P = SI×100/(R×T) = {si}×100/({r}×{t}) = {p}.", str)

def gen_profit(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            cp = rng.choice([200,250,400,500,800]); pr = rng.choice([10,15,20,25,30])
            sp = cp + cp*pr//100
            add(Q,"C","profit",1, f"An article costing {money(cp)} is sold at a profit of {pr}%. The selling price is:",
                money(sp), [money(cp - cp*pr//100), money(sp+cp//20), money(cp+pr), money(sp-cp//10)],
                f"SP = CP × (100+{pr})/100 = {sp}.", str)
        elif kind == 1:
            mp = rng.choice([500,600,800,1000,1200]); d = rng.choice([10,15,20,25])
            sp = mp - mp*d//100
            add(Q,"C","profit",1, f"After a discount of {d}% on the marked price {money(mp)}, the selling price is:",
                money(sp), [money(mp*d//100), money(sp - mp//20), money(mp + mp*d//100), money(sp + d)],
                f"SP = MP × (100−{d})/100 = {sp}.", str)
        elif kind == 2:
            d1, d2 = rng.choice([(10,20),(20,10),(10,10),(20,20),(25,20)])
            net = d1 + d2 - d1*d2/100
            add(Q,"C","profit",2, f"Successive discounts of {d1}% and {d2}% are equivalent to a single discount of:",
                f"{net:g}%", [f"{d1+d2}%", f"{net+2:g}%", f"{net-2:g}%", f"{abs(d1-d2)}%"],
                f"Net = {d1} + {d2} − {d1}×{d2}/100 = {net:g}% (always less than the sum).", str)
        else:
            sp = rng.choice([460,552,690,920]); pr = rng.choice([15,20,25])  # ensure clean cp
            cp = sp*100/(100+pr)
            if cp != int(cp):
                cp_i = round(cp); sp = cp_i*(100+pr)//100; cp = cp_i
            add(Q,"C","profit",2, f"By selling an article for {money(int(sp))}, a shopkeeper gains {pr}%. The cost price is:",
                money(int(cp)), [money(int(sp - sp*pr//100)), money(int(cp*2)), money(int(cp) + pr), money(int(sp))],
                f"CP = SP × 100/(100+{pr}) = {int(cp)}.", str)

def gen_work(n):
    for _ in range(n):
        kind = rng.randrange(3)
        if kind == 0:
            a, b = rng.choice([(12,24),(10,15),(20,30),(6,12),(8,24),(15,30)])
            t = Fraction(1,1)/(Fraction(1,a)+Fraction(1,b))
            tstr = f"{t.numerator/t.denominator:g}" if t.denominator != 1 else str(t.numerator)
            add(Q,"C","work",2, f"A finishes a work in {a} days and B in {b} days. Working together, they finish it in:",
                f"{tstr} days", [f"{(a+b)//2} days", f"{a+b} days", f"{t.numerator//t.denominator + 2} days", f"{min(a,b)} days"],
                f"Combined rate = 1/{a}+1/{b} = {Fraction(1,a)+Fraction(1,b)}; time = {tstr} days.", str)
        elif kind == 1:
            m1,d1 = rng.choice([(12,20),(15,16),(10,24),(20,15)]); m2 = rng.choice([8,10,12,6])
            d2 = m1*d1/m2
            add(Q,"C","work",2, f"{m1} men can build a wall in {d1} days. How many days will {m2} men take?",
                f"{d2:g} days", [f"{m1*d1//(m2+2):g} days", f"{d2/2:g} days", f"{d1} days", f"{d2+m2:g} days"],
                f"M₁D₁ = M₂D₂ → {m1}×{d1} = {m2}×D → D = {d2:g} days.", str)
        else:
            f_, e = rng.choice([(6,12),(4,12),(10,15),(8,24)])
            t = Fraction(1,1)/(Fraction(1,f_)-Fraction(1,e))
            add(Q,"C","work",3,
                f"A pipe fills a tank in {f_} hours; a leak empties it in {e} hours. With both open, the tank fills in:",
                f"{t.numerator/t.denominator:g} hours", [f"{f_+e} hours", f"{(f_+e)//2} hours", f"{f_} hours", f"{t.numerator/t.denominator + 2:g} hours"],
                f"Net rate = 1/{f_} − 1/{e} = {Fraction(1,f_)-Fraction(1,e)} per hour → {t.numerator/t.denominator:g} hours.", str)

def gen_tsd(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            s = rng.choice([36,45,54,60,72,90]); t = rng.choice([2,3,4,5])
            d = s*t
            add(Q,"C","tsd",1, f"A car travels at {s} km/h for {t} hours. The distance covered is:",
                f"{d} km", [f"{d//2} km", f"{d+s//2} km", f"{s*t*2} km", f"{d - t*2} km"],
                f"Distance = speed × time = {s} × {t} = {d} km.", str)
        elif kind == 1:
            s = rng.choice([36,54,72,90,108])
            ms = s*5//18
            add(Q,"C","tsd",1, f"{s} km/h expressed in metres per second is:",
                f"{ms} m/s", [f"{s*18//5} m/s", f"{ms+2} m/s", f"{s//2} m/s", f"{ms-2 if ms>2 else ms+4} m/s"],
                f"Multiply by 5/18: {s} × 5/18 = {ms} m/s.", str)
        elif kind == 2:
            L = rng.choice([120,150,180,240]); s = rng.choice([36,54,72])
            t = L/(s*5/18)
            add(Q,"C","tsd",2, f"A train {L} m long runs at {s} km/h. Time taken to cross a pole is:",
                f"{t:g} s", [f"{t*2:g} s", f"{t/2:g} s", f"{t+3:g} s", f"{L//s} s"],
                f"Speed = {s}×5/18 = {s*5/18:g} m/s; time = {L}/{s*5/18:g} = {t:g} s.", str)
        else:
            a, b = rng.choice([(40,60),(30,60),(20,30),(45,90)])
            avg = 2*a*b/(a+b)
            add(Q,"C","tsd",3,
                f"A man goes to office at {a} km/h and returns by the same route at {b} km/h. His average speed for the whole journey is:",
                f"{avg:g} km/h", [f"{(a+b)/2:g} km/h", f"{avg+4:g} km/h", f"{avg-4:g} km/h", f"{b-a} km/h"],
                f"Average speed for equal distances = 2ab/(a+b) = 2×{a}×{b}/{a+b} = {avg:g} km/h (NOT the simple mean).", str)

def gen_numbers(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            a, b = rng.choice([(12,18),(15,20),(24,36),(16,24),(14,21)])
            l, g = math.lcm(a,b), math.gcd(a,b)
            add(Q,"C","numbers",1, f"The LCM of {a} and {b} is:",
                l, [g, a*b, l//2, l+g],
                f"{a} = {g}×{a//g}, {b} = {g}×{b//g}; LCM = {g}×{a//g}×{b//g} = {l}. (LCM×HCF = product.)", str)
        elif kind == 1:
            a, b = rng.choice([(12,18),(24,36),(16,40),(45,60),(28,42)])
            g = math.gcd(a,b)
            add(Q,"C","numbers",1, f"The HCF of {a} and {b} is:",
                g, [math.lcm(a,b), g*2, g//2 or g+1, abs(a-b)],
                f"Common factors of {a} and {b}: highest is {g}.", str)
        elif kind == 2:
            s = rng.choice([45,54,63,72,81,90]); d = rng.choice([9,3])
            add(Q,"C","numbers",2, f"Which of the following numbers is exactly divisible by {d}: {s+1}, {s+d}, {s+2}, {s+d-1}?",
                s+d, [s+1, s+2, s+d-1, None],
                f"A number is divisible by {d} if its digit sum is divisible by {d}. {s+d} works: digit sum {sum(int(c) for c in str(s+d))}.", str)
        else:
            k = rng.choice([3,4,5,6]); ssum = k*(k+1)//2
            nmax = rng.choice([50,100])
            c = k
            add(Q,"C","numbers",2, f"The sum of the first {k} natural numbers is:",
                ssum, [ssum+k, k*k, ssum-1, ssum+1],
                f"Sum = n(n+1)/2 = {k}×{k+1}/2 = {ssum}.", str)

def gen_sqroots(n):
    for _ in range(n):
        kind = rng.randrange(3)
        if kind == 0:
            r = rng.choice([13,14,15,16,17,18,19,21,23,24,25])
            sq = r*r
            add(Q,"C","sqroots",1, f"The square root of {sq} is:",
                r, [r+1, r-1, r+2, r-2],
                f"{r}² = {sq}, so √{sq} = {r}.", str)
        elif kind == 1:
            a = rng.choice([2,3,5]); k = rng.choice([4,9,16,25])
            inside = k*a
            add(Q,"C","sqroots",2, f"√{inside} simplified is:",
                f"{int(math.isqrt(k))}√{a}", [f"{k}√{a}", f"{int(math.isqrt(k))+1}√{a}", f"√{inside}", f"{a}√{int(math.isqrt(k))}"],
                f"√{inside} = √({k}×{a}) = √{k}·√{a} = {int(math.isqrt(k))}√{a}.", str)
        else:
            r = rng.choice([1.2, 1.5, 2.5, 0.8, 0.6, 3.5])
            sq = round(r*r, 2)
            add(Q,"C","sqroots",2, f"√{sq:g} = ?",
                f"{r:g}", [f"{r*10:g}", f"{r/10:g}", f"{r+0.1:g}", f"{sq/2:g}"],
                f"{r:g} × {r:g} = {sq:g}. Watch the decimal: √ of a number with 2 decimal places has 1.", str)

def gen_partnership(n):
    for _ in range(n):
        kind = rng.randrange(2)
        if kind == 0:
            a, b = rng.choice([(3,5),(2,3),(4,5),(3,4)]); scale = rng.choice([1000, 2000, 5000])
            ca, cb = a*scale, b*scale
            profit = (a+b)*rng.choice([400,600,800,1000])
            sa = profit*a//(a+b)
            add(Q,"C","partnership",2,
                f"A and B invest {money(ca)} and {money(cb)} in a business. Out of a profit of {money(profit)}, A's share is:",
                money(sa), [money(profit-sa), money(profit//2), money(sa+scale//10), money(sa-scale//10)],
                f"Profit splits by capital ratio {a}:{b}. A gets {a}/{a+b} × {profit} = {sa}.", str)
        else:
            ca = rng.choice([12000, 15000, 20000]); cb = rng.choice([10000, 18000, 24000])
            ma, mb = 12, rng.choice([6, 8, 9])
            ra, rb = ca*ma, cb*mb
            g = math.gcd(ra, rb)
            add(Q,"C","partnership",3,
                f"A invests {money(ca)} for 12 months; B joins with {money(cb)} for the last {mb} months. Their profit-sharing ratio is:",
                f"{ra//g}:{rb//g}", [f"{ca//math.gcd(ca,cb)}:{cb//math.gcd(ca,cb)}", f"{rb//g}:{ra//g}", f"12:{mb}", f"{ra//g + 1}:{rb//g}"],
                f"Share ∝ capital × time: {ca}×12 : {cb}×{mb} = {ra//g}:{rb//g}.", str)

def gen_mixture(n):
    for _ in range(n):
        kind = rng.randrange(2)
        if kind == 0:
            c1, c2 = rng.choice([(20,30),(24,36),(15,25),(40,60)])
            cm = (c1+c2)//2 + rng.choice([-2, 2, 0])
            if not (c1 < cm < c2): cm = (c1+c2)//2
            r1, r2 = c2-cm, cm-c1
            g = math.gcd(r1, r2)
            add(Q,"C","mixture",3,
                f"Rice at {money(c1)}/kg is mixed with rice at {money(c2)}/kg so that the mixture costs {money(cm)}/kg. The mixing ratio (cheap:dear) is:",
                f"{r1//g}:{r2//g}", [f"{r2//g}:{r1//g}", "1:1", f"{c1}:{c2}", f"{r1//g+1}:{r2//g}"],
                f"Alligation: cheap:dear = (dear−mean):(mean−cheap) = ({c2}−{cm}):({cm}−{c1}) = {r1//g}:{r2//g}.", str)
        else:
            m, w = rng.choice([(4,1),(3,1),(7,3),(5,3)]); base = rng.choice([10, 20])
            mm, ww = m*base, w*base
            addw = rng.choice([base, 2*base])
            g = math.gcd(mm, ww+addw)
            add(Q,"C","mixture",2,
                f"A mixture of {mm+ww} L has milk and water in the ratio {m}:{w}. If {addw} L of water is added, the new ratio is:",
                f"{mm//g}:{(ww+addw)//g}", [f"{m}:{w}", f"{mm//g}:{ww//g if ww//g != (ww+addw)//g else ww//g+1}", f"{(ww+addw)//g}:{mm//g}", f"{m+1}:{w+1}"],
                f"Milk = {mm} L stays; water becomes {ww}+{addw} = {ww+addw} L. Ratio = {mm}:{ww+addw} = {mm//g}:{(ww+addw)//g}.", str)

QUANT_PLAN = [
    (gen_percentage, 50), (gen_ratio, 48), (gen_averages, 45), (gen_interest, 45),
    (gen_profit, 48), (gen_work, 42), (gen_tsd, 45), (gen_numbers, 45),
    (gen_sqroots, 38), (gen_partnership, 23), (gen_mixture, 23),
]

# ============================================================ MATH (E)
def gen_algebra(n):
    for _ in range(n):
        kind = rng.randrange(5)
        if kind == 0:
            s, p = rng.choice([(7,12),(9,20),(10,21),(8,15),(11,30),(6,8)])
            c = s*s - 2*p
            add(M,"E","algebra",2, f"If a + b = {s} and ab = {p}, then a² + b² = ?",
                c, [s*s, c+p, s*s+2*p, c-2],
                f"a²+b² = (a+b)² − 2ab = {s*s} − {2*p} = {c}.", str)
        elif kind == 1:
            x = rng.choice([3,4,5,6,7])
            c = x*x - 2  # (x + 1/x)=k -> x²+1/x² = k²-2
            add(M,"E","algebra",2, f"If x + 1/x = {x}, then x² + 1/x² = ?",
                c, [x*x, c+2, x*x+2, c-1],
                f"Square both sides: x² + 2 + 1/x² = {x*x}, so x² + 1/x² = {x*x} − 2 = {c}.", str)
        elif kind == 2:
            a, b = rng.choice([(5,3),(7,2),(6,4),(9,5),(8,3)])
            c = (a+b)*(a-b)
            add(M,"E","algebra",1, f"Using an identity, {a+b} × {a-b} = ?",
                c, [c+b*b, a*a, c-2*b, c+2*b],
                f"(a+b)(a−b) = a²−b² = {a*a} − {b*b} = {c}.", str)
        elif kind == 3:
            k, a = rng.choice([(4,3),(9,2),(16,5),(25,2),(4,7)])
            c = f"{int(math.isqrt(k))}√{a}"
            v1, v2 = k*a, int(math.isqrt(k))
            add(M,"E","algebra",2, f"√{a} + {v2-1 if v2>1 else 2}√{a} = ?",
                f"{v2}√{a}" if v2>1 else f"3√{a}",
                [f"{v2}√{2*a}", f"{v2+1}√{a}", f"√{a*v2}", f"{v2}a"],
                f"Like surds add their coefficients: 1√{a} + {v2-1 if v2>1 else 2}√{a} = {v2 if v2>1 else 3}√{a}.", str)
        else:
            m, cc = rng.choice([(2,3),(3,-2),(1,5),(4,1),(-2,4)])
            x0 = rng.choice([1,2,3])
            y0 = m*x0+cc
            add(M,"E","algebra",2, f"The point ({x0}, ?) lies on the line y = {m}x {'+' if cc>=0 else '−'} {abs(cc)}. The missing y-value is:",
                y0, [y0+m, y0-m, m*x0, y0+1],
                f"Substitute x = {x0}: y = {m}×{x0} {'+' if cc>=0 else '−'} {abs(cc)} = {y0}.", str)

def gen_geometry(n):
    facts = [
        ("The point where the medians of a triangle meet is the:", "Centroid", ["Orthocentre","Incentre","Circumcentre"], "Medians → centroid (divides each median 2:1). Altitudes → orthocentre; angle bisectors → incentre; perpendicular bisectors → circumcentre."),
        ("The point where the altitudes of a triangle meet is the:", "Orthocentre", ["Centroid","Incentre","Circumcentre"], "Altitudes meet at the orthocentre."),
        ("The centre of the circle inscribed in a triangle is the:", "Incentre", ["Centroid","Orthocentre","Circumcentre"], "The incircle touches all three sides; its centre (incentre) is where angle bisectors meet."),
        ("The centre of the circle passing through all three vertices of a triangle is the:", "Circumcentre", ["Incentre","Centroid","Orthocentre"], "The circumcircle passes through the vertices; perpendicular bisectors meet at its centre."),
        ("The angle in a semicircle is always:", "90°", ["60°","180°","45°"], "Angle subtended by a diameter at the circumference is a right angle (Thales)."),
        ("A tangent to a circle is ______ to the radius at the point of contact.", "Perpendicular", ["Parallel","Equal","Inclined at 45°"], "Tangent ⊥ radius at the point of contact — the most-used circle fact."),
        ("The angle subtended by an arc at the centre is ______ the angle at the remaining circumference.", "Double", ["Half","Equal to","Triple"], "Central angle = 2 × inscribed angle on the same arc."),
        ("Two tangents drawn to a circle from an external point are:", "Equal in length", ["Perpendicular","Parallel","Unequal"], "Tangent segments from one external point are always equal."),
        ("The sum of opposite angles of a cyclic quadrilateral is:", "180°", ["90°","360°","270°"], "Opposite angles of a cyclic quadrilateral are supplementary."),
        ("Triangles with equal corresponding angles are:", "Similar", ["Congruent","Equal in area","Isosceles"], "AAA gives similarity (same shape); congruence needs equal sides too."),
    ]
    i = 0
    for _ in range(n):
        if i < len(facts) and rng.random() < 0.5:
            qt, c, d, e = facts[i]; i += 1
            add(M,"E","geometry",1, qt, c, d, e, str)
        else:
            kind = rng.randrange(3)
            if kind == 0:
                a, b = rng.choice([(50,60),(45,75),(65,55),(40,80),(35,85)])
                c = 180-a-b
                add(M,"E","geometry",1, f"Two angles of a triangle are {a}° and {b}°. The third angle is:",
                    f"{c}°", [f"{c+10}°", f"{c-10}°", f"{180-a}°", f"{90-(a+b-90)}°" if a+b>90 else f"{c+20}°"],
                    f"Angles of a triangle sum to 180°: 180 − {a} − {b} = {c}°.", str)
            elif kind == 1:
                trip = rng.choice([(3,4,5),(6,8,10),(5,12,13),(9,12,15),(8,15,17),(7,24,25)])
                k1, k2, hyp = trip
                add(M,"E","geometry",2, f"A right triangle has legs {k1} cm and {k2} cm. Its hypotenuse is:",
                    f"{hyp} cm", [f"{k1+k2} cm", f"{hyp+1} cm", f"{hyp-1} cm", f"{k1*k2//2} cm"],
                    f"Pythagoras: √({k1}² + {k2}²) = √{k1*k1+k2*k2} = {hyp} cm.", str)
            else:
                sub = rng.randrange(4)
                if sub == 0:
                    sides = rng.choice([5,6,8,9,10,12])
                    c = (sides-2)*180
                    add(M,"E","geometry",2, f"The sum of the interior angles of a polygon with {sides} sides is:",
                        f"{c}°", [f"{c+180}°", f"{c-180}°", f"{sides*180}°", f"{360}°"],
                        f"Sum = (n−2)×180° = ({sides}−2)×180° = {c}°.", str)
                elif sub == 1:
                    a, b = rng.choice([(40,70),(55,60),(30,100),(45,65),(50,75),(35,95),(25,110)])
                    ext = a + b
                    add(M,"E","geometry",2,
                        f"In a triangle, two interior opposite angles are {a}° and {b}°. The exterior angle at the third vertex is:",
                        f"{ext}°", [f"{180-ext}°", f"{ext-10}°", f"{ext+10}°", f"{abs(a-b)}°"],
                        f"Exterior angle = sum of the two interior opposite angles = {a} + {b} = {ext}°.", str)
                elif sub == 2:
                    apex = rng.choice([40,50,60,70,80,100,110,120])
                    base = (180-apex)//2
                    add(M,"E","geometry",2,
                        f"In an isosceles triangle the vertex angle is {apex}°. Each base angle measures:",
                        f"{base}°", [f"{apex}°", f"{base+10}°", f"{base-10}°", f"{180-apex}°"],
                        f"Base angles are equal: (180 − {apex})/2 = {base}°.", str)
                else:
                    k1, k2, hyp = rng.choice([(3,4,5),(6,8,10),(5,12,13),(9,12,15),(8,15,17)])
                    d_ = rng.choice([k1, k2])
                    tang = k2 if d_ == k1 else k1
                    add(M,"E","geometry",3,
                        f"From a point {hyp} cm from the centre of a circle of radius {d_} cm, the length of the tangent to the circle is:",
                        f"{tang} cm", [f"{hyp} cm", f"{tang+2} cm", f"{hyp-d_} cm", f"{d_} cm"],
                        f"Tangent ⊥ radius, so tangent² = distance² − radius² = {hyp}² − {d_}² → {tang} cm.", str)

def gen_mensuration(n):
    for _ in range(n):
        kind = rng.randrange(6)
        if kind == 0:
            r = rng.choice([7,14,21,28,35])
            c = 22*r*r//7
            add(M,"E","mensuration",1, f"The area of a circle with radius {r} cm is: (π = 22/7)",
                f"{c} cm²", [f"{2*22*r//7} cm²", f"{c*2} cm²", f"{c//2} cm²", f"{22*r//7} cm²"],
                f"Area = πr² = 22/7 × {r} × {r} = {c} cm².", str)
        elif kind == 1:
            r, h = rng.choice([(7,10),(7,20),(14,5),(21,10),(7,15)])
            v = 22*r*r*h//7
            add(M,"E","mensuration",2, f"The volume of a cylinder with radius {r} cm and height {h} cm is: (π = 22/7)",
                f"{v} cm³", [f"{v//3} cm³", f"{v*3} cm³", f"{22*r*h//7*2} cm³", f"{v//2} cm³"],
                f"V = πr²h = 22/7 × {r}² × {h} = {v} cm³.", str)
        elif kind == 2:
            r, h = rng.choice([(7,9),(7,12),(14,9),(21,6)])
            v = 22*r*r*h//(7*3)
            add(M,"E","mensuration",2, f"The volume of a cone with radius {r} cm and height {h} cm is: (π = 22/7)",
                f"{v} cm³", [f"{v*3} cm³", f"{v//3} cm³", f"{v*2} cm³", f"{v+100} cm³"],
                f"V = (1/3)πr²h = 22/7 × {r}² × {h} ÷ 3 = {v} cm³. A cone is one-third of its cylinder.", str)
        elif kind == 3:
            a = rng.choice([3,4,5,6,7,8])
            v, s = a**3, 6*a*a
            if rng.random() < .5:
                add(M,"E","mensuration",1, f"The volume of a cube of side {a} cm is:",
                    f"{v} cm³", [f"{s} cm³", f"{a*a} cm³", f"{v+a} cm³", f"{12*a} cm³"],
                    f"V = a³ = {a}³ = {v} cm³.", str)
            else:
                add(M,"E","mensuration",1, f"The total surface area of a cube of side {a} cm is:",
                    f"{s} cm²", [f"{v} cm²", f"{4*a*a} cm²", f"{s+a} cm²", f"{12*a} cm²"],
                    f"TSA = 6a² = 6×{a}² = {s} cm².", str)
        elif kind == 4:
            l, b, h = rng.choice([(8,6,4),(10,5,4),(12,8,5),(6,5,3),(9,7,4)])
            v = l*b*h
            add(M,"E","mensuration",1, f"The volume of a cuboid {l} cm × {b} cm × {h} cm is:",
                f"{v} cm³", [f"{2*(l*b+b*h+h*l)} cm³", f"{l*b} cm³", f"{v//2} cm³", f"{l+b+h} cm³"],
                f"V = l×b×h = {l}×{b}×{h} = {v} cm³.", str)
        else:
            r = rng.choice([21, 7, 14])  # sphere volume clean-ish with 22/7 when r multiple of 21 -> use surface area instead often
            sa = 4*22*r*r//7
            add(M,"E","mensuration",2, f"The surface area of a sphere of radius {r} cm is: (π = 22/7)",
                f"{sa} cm²", [f"{sa//2} cm²", f"{sa//4} cm²", f"{sa*2} cm²", f"{22*r*r//7} cm²"],
                f"SA = 4πr² = 4 × 22/7 × {r}² = {sa} cm². (A hemisphere's curved surface is half: 2πr².)", str)

def gen_trigonometry(n):
    vals = {"sin 0°":"0","sin 30°":"1/2","sin 45°":"1/√2","sin 60°":"√3/2","sin 90°":"1",
            "cos 0°":"1","cos 30°":"√3/2","cos 45°":"1/√2","cos 60°":"1/2","cos 90°":"0",
            "tan 0°":"0","tan 30°":"1/√3","tan 45°":"1","tan 60°":"√3"}
    keys = list(vals.keys())
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            if rng.random() < .5:
                k = rng.choice(keys)
                c = vals[k]
                pool = [v for v in set(vals.values()) if v != c]
                rng.shuffle(pool)
                add(M,"E","trigonometry",1, f"The value of {k} is:",
                    c, pool[:4],
                    f"Standard table value: {k} = {c}. Memorise the 0-30-45-60-90 table.", str)
            else:
                # numeric combos that evaluate to clean numbers
                combos = [
                    ("sin 30° + cos 60°", "1", "1/2 + 1/2 = 1"),
                    ("sin 60° × cos 30°", "3/4", "(√3/2)×(√3/2) = 3/4"),
                    ("tan 45° + cot 45°", "2", "1 + 1 = 2"),
                    ("sin² 45° + cos² 45°", "1", "sin²θ + cos²θ = 1 for any θ"),
                    ("2 sin 30°", "1", "2 × 1/2 = 1"),
                    ("tan 30° × tan 60°", "1", "(1/√3)×√3 = 1"),
                    ("cos 0° + sin 90°", "2", "1 + 1 = 2"),
                    ("sin 90° − cos 90°", "1", "1 − 0 = 1"),
                    ("4 cos² 60°", "1", "4 × (1/2)² = 1"),
                    ("sin 30° × cos 60° × tan 45°", "1/4", "(1/2)×(1/2)×1 = 1/4"),
                    ("3 tan² 30°", "1", "3 × (1/√3)² = 3 × 1/3 = 1"),
                    ("sec 60°", "2", "sec 60° = 1/cos 60° = 2"),
                    ("cosec 30°", "2", "cosec 30° = 1/sin 30° = 2"),
                    ("cot 60°", "1/√3", "cot 60° = 1/tan 60° = 1/√3"),
                    ("sin² 60° + cos² 60°", "1", "The identity sin²θ + cos²θ = 1 holds for every angle"),
                    ("tan 45° − sin 90°", "0", "1 − 1 = 0"),
                ]
                expr, c, why = rng.choice(combos)
                pool = ["0","1","2","1/2","1/4","3/4","√3","1/√3","√3/2"]
                dist = [p for p in pool if p != c]
                rng.shuffle(dist)
                add(M,"E","trigonometry",2, f"The value of {expr} is:",
                    c, dist[:4], why + ".", str)
        elif kind == 1:
            th = rng.choice([10,20,25,35,40])
            add(M,"E","trigonometry",2, f"sin {th}° expressed as a cosine is:",
                f"cos {90-th}°", [f"cos {th}°", f"cos {180-th}°", f"cos {90+th}°", f"1 − cos {th}°"],
                f"Complementary angles: sin θ = cos(90° − θ), so sin {th}° = cos {90-th}°.", str)
        elif kind == 2:
            h = rng.choice([10, 15, 20, 30])
            add(M,"E","trigonometry",3,
                f"A ladder leans against a wall making 60° with the ground. If its foot is {h} m from the wall, the ladder's length is:",
                f"{2*h} m", [f"{h} m", f"{h*3} m", f"{2*h+5} m", f"{h//2 or 5} m"],
                f"cos 60° = base/hypotenuse → 1/2 = {h}/L → L = {2*h} m.", str)
        else:
            d = rng.choice([15, 30, 45, 60])
            add(M,"E","trigonometry",3,
                f"From a point {d} m from a tower's base, the top's angle of elevation is 45°. The tower's height is:",
                f"{d} m", [f"{d*2} m", f"{d//2 or 10} m", f"{d+15} m", f"{d-5} m"],
                f"tan 45° = height/distance = 1 → height = distance = {d} m.", str)

def gen_statistics(n):
    for _ in range(n):
        kind = rng.randrange(4)
        if kind == 0:
            k = rng.choice([5, 6])
            base = rng.choice([4, 6, 8, 10]); step = rng.choice([2, 3, 5])
            data = sorted(rng.sample(range(base, base + step*12), k))
            mean = sum(data)/len(data)
            add(M,"E","statistics",1, f"The mean of {', '.join(map(str, data))} is:",
                round(mean,1), [round(mean+1,1), round(mean-1,1), data[len(data)//2], max(data)],
                f"Mean = sum/count = {sum(data)}/{len(data)} = {round(mean,1):g}.",
                lambda v: f"{v:g}")
        elif kind == 1:
            k = 5
            data = sorted(rng.sample(range(3, 40), k))
            med = data[k//2]
            add(M,"E","statistics",1, f"The median of {', '.join(map(str, data))} is:",
                med, [data[1], round(sum(data)/k,1), data[3], max(data)],
                f"Arrange in order; the middle (3rd of 5) value is {med}.",
                lambda v: f"{v:g}")
        elif kind == 2:
            v = rng.choice([4, 6, 7, 9]); others = rng.sample([x for x in range(2, 12) if x != v], 3)
            data = others + [v, v, v]
            rng.shuffle(data)
            add(M,"E","statistics",1, f"The mode of {', '.join(map(str, data))} is:",
                v, [others[0], others[1], round(sum(data)/len(data),1), max(data)],
                f"Mode = most frequent value. {v} appears three times.",
                lambda vv: f"{vv:g}")
        else:
            kindp = rng.randrange(3)
            if kindp == 0:
                c = "1/6"
                add(M,"E","statistics",2, "A fair die is rolled once. The probability of getting a 4 is:",
                    c, ["1/4","1/2","1/3","4/6"],
                    "One favourable outcome out of six equally likely: 1/6.", str)
            elif kindp == 1:
                add(M,"E","statistics",2, "Two coins are tossed. The probability of getting two heads is:",
                    "1/4", ["1/2","1/3","3/4","1/8"],
                    "Outcomes: HH, HT, TH, TT → P(HH) = 1/4.", str)
            else:
                r_, b_ = rng.choice([(3,5),(4,6),(2,7),(5,7),(3,4),(4,9),(5,3),(6,4)])
                tot = r_ + b_
                g = math.gcd(r_, tot)
                add(M,"E","statistics",2,
                    f"A bag has {r_} red and {b_} blue balls. A ball drawn at random is red with probability:",
                    f"{r_//g}/{tot//g}", [f"{b_}/{tot}", f"{r_}/{b_}", f"1/{tot}", "1/2"],
                    f"P(red) = favourable/total = {r_}/{tot}" + (f" = {r_//g}/{tot//g}" if g > 1 else "") + ".", str)

MATH_PLAN = [
    (gen_algebra, 90), (gen_geometry, 90), (gen_mensuration, 93),
    (gen_trigonometry, 87), (gen_statistics, 90),
]

# ============================================================ run
def run(plan, store, want):
    for fn, cnt in plan:
        fn(cnt)
    # dedupe by question text
    seen, out = set(), []
    for q in store:
        if q["q"] not in seen:
            seen.add(q["q"]); out.append(q)
    # top up if dedupe removed some — capped per topic so a high-diversity
    # generator (e.g. statistics) can't crowd out low-diversity ones
    from collections import Counter
    topic_count = Counter(q["topic"] for q in out)
    # statistics has a much larger combinatorial space than the other Math
    # topics (mean/median over near-unlimited number sets) — cap it tighter
    # so it can't crowd out low-diversity topics like algebra/mensuration.
    topic_cap = {fn.__name__[4:]: (int(cnt * 1.4) if fn.__name__[4:] == "statistics" else cnt * 2) for fn, cnt in plan}
    guard = 0
    while len(out) < want and guard < 4000:
        fn, _ = rng.choice(plan)
        topic = fn.__name__[4:]
        if topic_count.get(topic, 0) >= topic_cap.get(topic, 10**9):
            guard += 1
            continue
        before = len(store)
        fn(1)
        for q in store[before:]:
            if q["q"] not in seen:
                seen.add(q["q"]); out.append(q)
                topic_count[q["topic"]] = topic_count.get(q["topic"], 0) + 1
        guard += 1
    return out[:want]

quant = run(QUANT_PLAN, Q, 450)
mathq = run(MATH_PLAN, M, 450)

def write_bank(rows, prefix, fname, label):
    for i, q in enumerate(rows):
        q["id"] = f"{prefix}{i+1:03d}"
    js = ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows)
    (OUT / fname).write_text(
        f"/* {fname} — {label} · {len(rows)} questions · generated {__import__('datetime').date.today()} */\n"
        f"registerBank([\n{js}\n]);\n", encoding="utf-8")
    print(f"{fname}: {len(rows)} questions")

write_bank(quant, "Q", "bank-quant.js", "Section C Quantitative Aptitude")
write_bank(mathq, "M", "bank-math.js", "Section E Mathematical Abilities")

# integrity check
for rows in (quant, mathq):
    for r in rows:
        assert len(r["opts"]) == 4, r
        assert 0 <= r["ans"] <= 3, r
        assert len(set(r["opts"])) == 4, ("dup opts", r)
print("integrity OK")
