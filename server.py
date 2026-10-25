#!/usr/bin/env python3
"""
SI-Prep Local Server & Gemini Subscription Gateway
Runs the local exam web application, provides live sync with docs/gemini_strategy.md,
and proxies Gemini API requests securely using the subscription API key from .env.
"""

import os
import sys
import re
import json
import time
import socket
import mimetypes
import threading
import webbrowser
import urllib.request
import urllib.error
from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.join(BASE_DIR, "app")
DOCS_DIR = os.path.join(BASE_DIR, "docs")
STRATEGY_FILE = os.path.join(DOCS_DIR, "gemini_strategy.md")
ENV_FILE = os.path.join(BASE_DIR, ".env")

DEFAULT_PORT = 5050
DEFAULT_GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash-lite")
DEFAULT_OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-6-luna")
DEFAULT_MODEL = DEFAULT_GEMINI_MODEL
SUPPORTED_GEMINI_MODELS = [
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.8-flash",
]
SUPPORTED_OPENAI_MODELS = ["gpt-6-luna", "gpt-6.1-sol", "gpt-6-astra"]
SUPPORTED_MODELS = SUPPORTED_GEMINI_MODELS

def load_env_api_key():
    """Reads APIKEY from .env file"""
    if os.path.exists(ENV_FILE):
        try:
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("APIKEY=") or line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception as e:
            print(f"[WARN] Error reading .env: {e}")
    return os.environ.get("GEMINI_API_KEY") or os.environ.get("APIKEY") or ""

def load_openai_api_key():
    """Reads an OpenAI API key without ever returning it to the browser."""
    if os.path.exists(ENV_FILE):
        try:
            with open(ENV_FILE, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("OPENAI_API_KEY=") or line.startswith("OPENAIAPIKEY="):
                        return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception as e:
            print(f"[WARN] Error reading OpenAI key: {e}")
    return os.environ.get("OPENAI_API_KEY") or os.environ.get("OPENAIAPIKEY") or ""

CACHED_API_KEY = load_env_api_key()
CACHED_OPENAI_API_KEY = load_openai_api_key()

def clean_math_text(text: str) -> str:
    """Removes all distracting dollar signs, LaTeX markup, and formatting noise."""
    if not text:
        return ""
    # Strip block and inline dollars
    text = re.sub(r'\$\$([\s\S]*?)\$\$', r'\1', text)
    text = re.sub(r'\$([^\$\n]+)\$', r'\1', text)
    text = text.replace('$', '')
    # Strip LaTeX commands and nested fractions
    for _ in range(3):
        text = re.sub(r'\\frac\{([^{}]+)\}\{([^{}]+)\}', r'(\1 / \2)', text)
    text = re.sub(r'\\text\{([^{}]+)\}', r'\1', text)
    text = re.sub(r'\\mathbf\{([^{}]+)\}', r'**\1**', text)
    text = re.sub(r'\\mathit\{([^{}]+)\}', r'*\1*', text)
    text = re.sub(r'\\mathrm\{([^{}]+)\}', r'\1', text)
    text = re.sub(r'\\sqrt\{([^{}]+)\}', r'√(\1)', text)
    text = re.sub(r'\\Delta\s*([a-zA-Z])', r'Δ\1', text)
    text = text.replace(r'\times', '×').replace(r'\div', '÷').replace(r'\pm', '±')
    text = text.replace(r'\implies', '→').replace(r'\rightarrow', '→').replace(r'\leftarrow', '←')
    text = text.replace(r'\uparrow', '↑').replace(r'\downarrow', '↓')
    text = text.replace(r'\circ', '°').replace(r'\%', '%').replace(r'\_', '_')
    text = text.replace(r'\quad', ' ').replace(r'\qquad', '  ')
    text = text.replace(r'\left', '').replace(r'\right', '')
    text = re.sub(r'\\([a-zA-Z]+)', r'\1', text)
    text = text.replace('\u200b', '')
    return text

def get_strategy_content():
    """Reads gemini_strategy.md and automatically sanitizes math formatting"""
    if os.path.exists(STRATEGY_FILE):
        try:
            with open(STRATEGY_FILE, "r", encoding="utf-8") as f:
                content = clean_math_text(f.read())
                return content, os.path.getmtime(STRATEGY_FILE)
        except Exception as e:
            print(f"[WARN] Error reading {STRATEGY_FILE}: {e}")
    return "", 0

def get_saved_notes_context(section_lines, max_chars=9000):
    """Selects relevant passages from the user's saved Google masterclass notes."""
    content, _ = get_strategy_content()
    if not content:
        return ""
    stop_words = {"general", "section", "aptitude", "ability", "awareness", "english", "computer", "today", "topics"}
    terms = {
        word.lower() for word in re.findall(r"[A-Za-z][A-Za-z&-]{3,}", " ".join(section_lines))
        if word.lower() not in stop_words
    }
    blocks = [block.strip() for block in re.split(r"\n\s*\n", content) if block.strip()]
    ranked = []
    for index, block in enumerate(blocks):
        lower = block.lower()
        score = sum(1 for term in terms if term in lower)
        if score:
            ranked.append((score, -index, block))
    ranked.sort(reverse=True)
    selected, size = [], 0
    for _, _, block in ranked:
        if size + len(block) > max_chars:
            continue
        selected.append(block)
        size += len(block) + 2
        if size >= max_chars * .8:
            break
    return "\n\n".join(selected)

def save_strategy_content(content):
    """Saves sanitized content to gemini_strategy.md"""
    os.makedirs(DOCS_DIR, exist_ok=True)
    clean_content = clean_math_text(content)
    with open(STRATEGY_FILE, "w", encoding="utf-8") as f:
        f.write(clean_content)
    return len(clean_content.encode("utf-8"))

def call_gemini_api(api_key, model, messages, system_instruction=None, max_output_tokens=2048, google_search=False, timeout=120):
    """Calls Google Generative Language API"""
    if not api_key:
        raise ValueError("No Gemini API key configured. Check .env or settings.")
    
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    
    # Format messages into Gemini contents format
    contents = []
    for m in messages:
        role = "user" if m.get("role") in ("user", "human") else "model"
        contents.append({
            "role": role,
            "parts": [{"text": m.get("text", "")}]
        })
    
    payload = {
        "contents": contents,
        "generationConfig": {
            "maxOutputTokens": max_output_tokens,
        }
    }

    if google_search:
        payload["tools"] = [{"google_search": {}}]
    
    if system_instruction:
        payload["systemInstruction"] = {
            "parts": [{"text": system_instruction}]
        }
        
    data_bytes = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=data_bytes,
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req, timeout=timeout) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        candidates = res_data.get("candidates", [])
        if not candidates:
            return "No response generated by model."
        parts = candidates[0].get("content", {}).get("parts", [])
        text = "".join(p.get("text", "") for p in parts)
        if google_search:
            sources = []
            metadata = candidates[0].get("groundingMetadata", {})
            for chunk in metadata.get("groundingChunks", []):
                web = chunk.get("web") or {}
                title, uri = web.get("title"), web.get("uri")
                if title and uri and uri not in [item[1] for item in sources]:
                    sources.append((title, uri))
            if sources:
                text += "\n\n---\n\n### Google Research Sources\n\n" + "\n".join(
                    f"- [{title}]({uri})" for title, uri in sources[:10]
                )
        return text

def call_gemini_resilient(api_key, preferred_model, messages, system_instruction=None, max_output_tokens=2048, google_search=False):
    """Retries temporary overloads, 429 quota exhaustion, and rotates through configured Gemini models."""
    models = []
    # If preferred model is given, try it; then try flash-lite, 3.5-flash, 3.8-flash
    for candidate in [preferred_model, "gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-3.8-flash"]:
        if candidate and candidate not in models:
            models.append(candidate)
    last_error = None
    for model in models:
        for attempt in range(2):
            try:
                return model, call_gemini_api(
                    api_key, model, messages, system_instruction,
                    max_output_tokens=max_output_tokens, google_search=google_search
                )
            except urllib.error.HTTPError as exc:
                last_error = exc
                if exc.code == 503 and attempt == 0:
                    time.sleep(1.0)
                    continue
                if exc.code in (400, 404, 429, 503):
                    print(f"[WARN] Gemini model {model} returned HTTP {exc.code}, falling back to next available model...")
                    break
                raise
    if last_error:
        raise last_error
    raise RuntimeError("No Gemini model was available")

def call_openai_api(api_key, model, messages, system_instruction=None, max_output_tokens=3000, web_search=False):
    """Calls the OpenAI Responses API and returns plain output text."""
    if not api_key:
        raise ValueError("No OpenAI API key configured. Add OPENAI_API_KEY to .env.")
    input_messages = []
    for message in messages:
        role = "user" if message.get("role") in ("user", "human") else "assistant"
        input_messages.append({"role": role, "content": message.get("text", "")})
    payload = {
        "model": model or DEFAULT_OPENAI_MODEL,
        "instructions": system_instruction or "",
        "input": input_messages,
        "max_output_tokens": max_output_tokens
    }
    if web_search:
        payload["tools"] = [{"type": "web_search"}]
    req = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}
    )
    with urllib.request.urlopen(req, timeout=180) as response:
        data = json.loads(response.read().decode("utf-8"))
    if data.get("output_text"):
        return data["output_text"]
    parts = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            if content.get("type") == "output_text" and content.get("text"):
                parts.append(content["text"])
    return "".join(parts) or "No response generated by model."

def choose_provider(requested="auto"):
    gemini_key = load_env_api_key() or CACHED_API_KEY
    openai_key = load_openai_api_key() or CACHED_OPENAI_API_KEY
    requested = (requested or "auto").lower()
    if requested == "gemini" and gemini_key:
        return "gemini", gemini_key
    if requested == "openai" and openai_key:
        return "openai", openai_key
    if gemini_key:
        return "gemini", gemini_key
    if openai_key:
        return "openai", openai_key
    raise ValueError("No AI key configured. Add APIKEY or OPENAI_API_KEY to .env.")

def call_ai(provider, api_key, model, messages, system_instruction):
    if provider == "openai":
        chosen_model = model or DEFAULT_OPENAI_MODEL
        return chosen_model, call_openai_api(api_key, chosen_model, messages, system_instruction)
    return call_gemini_resilient(api_key, model or DEFAULT_GEMINI_MODEL, messages, system_instruction)

def call_ai_routed(requested, model, messages, system_instruction):
    """Routes explicitly or tries Gemini then OpenAI in Auto mode."""
    requested = (requested or "auto").lower()
    available = {
        "gemini": load_env_api_key() or CACHED_API_KEY,
        "openai": load_openai_api_key() or CACHED_OPENAI_API_KEY
    }
    order = [requested] if requested in ("gemini", "openai") else ["gemini", "openai"]
    errors = []
    for provider in order:
        key = available.get(provider)
        if not key:
            errors.append(f"{provider}: key missing")
            continue
        compatible_model = model
        if provider == "openai" and compatible_model and not compatible_model.startswith("gpt-"):
            compatible_model = ""
        if provider == "gemini" and compatible_model and not compatible_model.startswith("gemini-"):
            compatible_model = ""
        selected_model = compatible_model or (DEFAULT_OPENAI_MODEL if provider == "openai" else DEFAULT_GEMINI_MODEL)
        try:
            actual_model, text_reply = call_ai(provider, key, selected_model, messages, system_instruction)
            return provider, actual_model, text_reply
        except Exception as exc:
            errors.append(f"{provider}: {exc}")
            if requested in ("gemini", "openai"):
                raise
    raise RuntimeError("No AI provider succeeded (" + "; ".join(errors) + ")")

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class SIPrepHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_DIR, **kwargs)

    def log_message(self, format, *args):
        # Quieter logs for clean console
        if "/api/" in (args[0] if args else ""):
            print(f"[API] {self.command} {args[0]} -> {args[1] if len(args)>1 else ''}")

    def end_headers(self):
        # CORS & cache controls
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split("?")[0]
        
        if path == "/api/status":
            strat_content, strat_mtime = get_strategy_content()
            gemini_key = load_env_api_key() or CACHED_API_KEY
            openai_key = load_openai_api_key() or CACHED_OPENAI_API_KEY
            self.send_json({
                "status": "connected" if (gemini_key or openai_key) else "needs_key",
                "hasKey": bool(gemini_key or openai_key),
                "providers": {
                    "gemini": {"configured": bool(gemini_key), "defaultModel": DEFAULT_GEMINI_MODEL, "models": SUPPORTED_GEMINI_MODELS},
                    "openai": {"configured": bool(openai_key), "defaultModel": DEFAULT_OPENAI_MODEL, "models": SUPPORTED_OPENAI_MODELS}
                },
                "defaultProvider": "gemini" if gemini_key else "openai",
                "defaultModel": DEFAULT_GEMINI_MODEL if gemini_key else DEFAULT_OPENAI_MODEL,
                "strategyFile": "docs/gemini_strategy.md",
                "strategyExists": os.path.exists(STRATEGY_FILE),
                "strategyChars": len(strat_content),
                "strategyMtime": strat_mtime
            })
            return

        elif path == "/api/strategy":
            strat_content, strat_mtime = get_strategy_content()
            self.send_json({
                "success": True,
                "content": strat_content,
                "filename": "gemini_strategy.md",
                "mtime": strat_mtime,
                "size": len(strat_content.encode("utf-8"))
            })
            return

        # Serve static files from APP_DIR
        return super().do_GET()

    def do_POST(self):
        path = self.path.split("?")[0]
        content_length = int(self.headers.get("Content-Length", 0))
        raw_body = self.rfile.read(content_length) if content_length > 0 else b"{}"
        
        try:
            body = json.loads(raw_body.decode("utf-8"))
        except Exception:
            body = {}

        if path == "/api/strategy":
            new_content = body.get("content", "")
            bytes_written = save_strategy_content(new_content)
            self.send_json({
                "success": True,
                "message": "Strategy updated and saved to docs/gemini_strategy.md",
                "bytes": bytes_written
            })
            return

        elif path == "/api/chat":
            message = body.get("message", "").strip()
            history = body.get("history", [])
            requested_provider = body.get("provider") or "auto"
            
            if not message:
                self.send_json({"error": "Empty message"}, status=400)
                return

            strat_content, _ = get_strategy_content()
            strat_summary = strat_content[:2500] if strat_content else "No active notes loaded."

            system_instruction = (
                "You are the elite SI-Prep AI Exam Coach & Mentor for the Jammu & Kashmir Police Sub-Inspector (JKSSB SI) written exam.\n"
                "Target user goal: 95% score (190+/200 marks, max 4 incorrect out of 100 questions).\n"
                "Exam details: 100 MCQs, 200 marks (2 marks each), 120 minutes, -0.5 negative mark for wrong answer.\n"
                "Syllabus: Reasoning (40M), General Awareness (40M, deep J&K focus), Quantitative Aptitude (30M), English (30M), Math (30M), Computer (30M).\n\n"
                "Active Study Masterclass & Strategy notes from docs/gemini_strategy.md:\n"
                f"\"\"\"\n{strat_summary}\n\"\"\"\n\n"
                "Tone & Style Guidelines:\n"
                "- High-precision, structured, encouraging yet disciplined.\n"
                "- When explaining math/reasoning, provide: Core Concept -> Quick Shortcut/Ratio Method -> Step-by-Step Calculation -> Examiner Pitfall to avoid.\n"
                "- Use bolding, bullet points, and clean human-readable notation.\n"
                "- CRITICAL FORMATTING RULE: NEVER use raw LaTeX syntax, dollar signs ($ or $$), \\frac, \\text, or LaTeX hyphens. Write plain human-readable mathematical notation (e.g., '15%', '12 km/h', 'D = u + v', '4 : 1', 'd = 36 km', '√100 = 10'). The user strictly dislikes dollar signs and LaTeX formatting.\n"
                "- Always tie your advice back to maximizing score under negative marking rules."
            )

            # Build full messages array
            msgs = []
            for h in history[-8:]:  # Keep last 8 turns for context
                msgs.append({"role": h.get("role", "user"), "text": h.get("text", "")})
            
            # Append latest query
            msgs.append({"role": "user", "text": message})

            try:
                provider, model, raw_reply = call_ai_routed(requested_provider, body.get("model") or "", msgs, system_instruction)
                reply_text = clean_math_text(raw_reply)
                self.send_json({
                    "success": True,
                    "text": reply_text,
                    "model": model,
                    "provider": provider,
                    "timestamp": time.time()
                })
            except urllib.error.HTTPError as he:
                err_body = he.read().decode("utf-8", errors="ignore")
                print(f"[API ERROR] HTTP {he.code}: {err_body}")
                self.send_json({
                    "success": False,
                    "error": f"AI provider returned HTTP {he.code}",
                    "details": err_body
                }, status=he.code)
            except Exception as e:
                print(f"[API ERROR] {e}")
                self.send_json({
                    "success": False,
                    "error": str(e)
                }, status=500)
            return

        elif path == "/api/masterclass":
            day = body.get("day") or {}
            if not day.get("title") or not day.get("sections"):
                self.send_json({"error": "Invalid study-plan day"}, status=400)
                return
            section_lines = day.get("topicLabels") or []
            if not section_lines:
                for sec, topics in day.get("sections", {}).items():
                    section_lines.append(f"Section {sec}: {', '.join(topics)}")
            section_contracts = []
            for index, (sec, topics) in enumerate(day.get("sections", {}).items(), start=1):
                label = section_lines[index - 1] if index - 1 < len(section_lines) else f"Section {sec}: {', '.join(topics)}"
                if sec in ("A", "C", "D", "E"):
                    section_contracts.append(
                        f"SECTION {index} — {label}\n"
                        "Use this exact Markdown skeleton:\n"
                        f"### Section {index}: [full subject name] — [today's topics]\n"
                        "#### 1. Core [Mathematical/Grammar/Reasoning] Framework\n"
                        "Explain every definition and underlying idea in detailed bullet points.\n"
                        "#### 2. Fundamental Rules, Formulas & Shortcuts\n"
                        "Show every important rule/formula separately and explain when it applies.\n"
                        "---\n#### 4-Level Deep-Dive Solved Examples\n"
                        "##### Level 1: [Basic foundation title]\n"
                        "* **Problem:** [complete exam-style problem]\n"
                        "* **Step-by-Step Solution:**\n1. [step]\n2. [step]\n3. [step]\n4. [final calculation and answer]\n"
                        "##### Level 2: [Standard application/shortcut title]\n"
                        "* **Problem:** ...\n* **Step-by-Step Solution ([method name]):** at least four numbered steps.\n"
                        "##### Level 3: [Advanced/mixed title]\n"
                        "* **Problem:** ...\n* **Step-by-Step Solution:** at least four numbered steps.\n"
                        "##### Level 4: Advanced Examiner's Trap — [trap title]\n"
                        "* **Problem:** ...\n* **Master Logic / Step-by-Step Solution:** explain the trap and solve completely.\n"
                        "Do not add shallow summaries between levels."
                    )
                else:
                    section_contracts.append(
                        f"SECTION {index} — {label}\n"
                        "This is a factual section, matching the General Awareness section in the supplied Day 13 exemplar.\n"
                        f"### Section {index}: [full subject name] — [today's topics]\n"
                        "#### 1. [First major factual category]\n"
                        "Use detailed nested bullets. For every item include exact definition, date/place/person, significance, related facts, and likely examiner confusion.\n"
                        "#### 2. [Second major factual category]\n"
                        "Continue with complete high-yield facts and memory links. Do NOT force artificial Level 1–4 examples into this factual section."
                    )
            prompt = (
                f"Write the lesson in the SAME structure, density, and teaching style as the user's attached 'DAY 13 MASTERCLASS: Boats & Streams, Direction Sense Test, and J&K Hydrography'.\n\n"
                f"The first line MUST be:\n### 🚀 DAY {day.get('masterclassDay', day.get('day'))} MASTERCLASS: {day.get('title')}\n\n"
                "Then write one short sentence stating that skill sections use 4 Progressive Difficulty Levels with detailed step-by-step worked examples, shortcut formulas, and examiner traps.\n"
                "Insert --- before every new subject section.\n\n"
                f"Goal: {day.get('focus')}\n\n" + "\n\n".join(section_contracts) + "\n\n"
                "MANDATORY DEPTH RULES:\n"
                "- Every skill section must contain all four levels. Never omit, merge, or abbreviate a level.\n"
                "- Every Level problem must be fully written and followed by actual numbered calculations/reasoning, like the Day 13 boat examples.\n"
                "- Write equations on their own lines. Explain what each variable and transformation means.\n"
                "- Level 4 must expose a genuine examiner trap, not merely label a normal question as difficult.\n"
                "- Factual sections must use researched, detailed bullet points like the Day 13 Jhelum/Chenab/Wular notes.\n"
                "- Do not add generic study advice, a timetable, a mastery checklist, or vague filler.\n\n"
                f"Finish in exactly this style:\n---\n\n### Day {day.get('masterclassDay', day.get('day'))} — Test Drill (20 Questions)\n\n"
                "* **Marking Scheme:** **+2 marks** correct, **-0.5 marks** incorrect, **0 marks** skipped.\n"
                "* **Target:** **36 / 40 marks**.\n\n"
                "Write exactly twenty A/B/C/D multiple-choice questions distributed evenly across today's sections. Do not reveal answers. "
                "End by asking the learner to calculate carefully and submit all twenty answers in numbered A/B/C/D format."
            )
            system_instruction = (
                "You are an elite JKSSB Sub-Inspector masterclass teacher and meticulous Google researcher. The written exam has 100 MCQs, "
                "200 marks, 120 minutes, and -0.5 negative marking. Use clear Markdown and plain-text math only: "
                "never use dollar signs or LaTeX. Teach only the supplied syllabus topics. Verify factual claims with Google Search. "
                "Never invent a source or fact. Flag current-affairs facts that should be rechecked near the exam. "
                "Follow the supplied Day 13 structural contract literally. Completeness and worked detail matter more than brevity."
            )
            try:
                requested_provider = (body.get("provider") or "auto").lower()
                openai_fallback_warning = ""
                if requested_provider == "openai":
                    openai_key = load_openai_api_key() or CACHED_OPENAI_API_KEY
                    if not openai_key:
                        openai_fallback_warning = "OpenAI key missing; Gemini fallback used."
                    else:
                        openai_model = body.get("model") or ""
                        if not openai_model.startswith("gpt-"):
                            openai_model = DEFAULT_OPENAI_MODEL
                        openai_prompt = prompt
                        saved_notes = get_saved_notes_context(section_lines)
                        if saved_notes:
                            openai_prompt += "\n\nRELEVANT PASSAGES FROM THE USER'S SAVED MASTERCLASS NOTES:\n" + saved_notes
                        try:
                            raw_reply = call_openai_api(
                                openai_key, openai_model, [{"role": "user", "text": openai_prompt}], system_instruction,
                                max_output_tokens=12000, web_search=True
                            )
                            self.send_json({
                                "success": True, "text": clean_math_text(raw_reply), "provider": "openai",
                                "model": openai_model, "warning": "", "researchStatus": "openai_web"
                            })
                            return
                        except urllib.error.HTTPError as openai_error:
                            error_body = openai_error.read().decode("utf-8", errors="ignore")
                            if openai_error.code == 429 and ("credit_balance_exhausted" in error_body or "insufficient_quota" in error_body):
                                openai_fallback_warning = "OpenAI credits exhausted; Gemini fallback used."
                            else:
                                openai_fallback_warning = f"OpenAI returned HTTP {openai_error.code}; Gemini fallback used."
                        except Exception:
                            openai_fallback_warning = "OpenAI unavailable; Gemini fallback used."

                gemini_key = load_env_api_key() or CACHED_API_KEY
                if gemini_key:
                    provider = "gemini"
                    requested_model = body.get("model") or ""
                    model = requested_model if requested_model.startswith("gemini-") else DEFAULT_GEMINI_MODEL
                    grounding_warning = openai_fallback_warning
                    research_notes = ""
                    research_status = "live_google"
                    try:
                        research_prompt = (
                            "Research these JKSSB SI syllabus topics with Google Search and prepare a concise verified fact brief "
                            "for a teacher. Include exact dates, places, definitions, rules, and source links where relevant. "
                            "Do not write the lesson yet. Topics:\n" + "\n".join(section_lines)
                        )
                        research_notes = call_gemini_api(
                            gemini_key, model, [{"role": "user", "text": research_prompt}],
                            "Return a compact fact-check brief with sources.",
                            max_output_tokens=1800, google_search=True, timeout=45
                        )
                    except Exception as research_error:
                        research_status = "openai_fallback" if openai_fallback_warning else "saved_google_notes"
                        if isinstance(research_error, urllib.error.HTTPError) and research_error.code == 429:
                            if not grounding_warning:
                                grounding_warning = "Live Search quota exhausted; using your saved Google masterclass notes."
                        else:
                            if not grounding_warning:
                                grounding_warning = "Live Search unavailable; using your saved Google masterclass notes."
                    if research_notes:
                        prompt += "\n\nGOOGLE-RESEARCHED FACT BRIEF TO USE AND CITE:\n" + research_notes
                    else:
                        saved_notes = get_saved_notes_context(section_lines)
                        if saved_notes:
                            prompt += "\n\nRELEVANT PASSAGES FROM THE USER'S SAVED GOOGLE MASTERCLASS NOTES:\n" + saved_notes
                        else:
                            research_status = "openai_fallback" if openai_fallback_warning else "model_knowledge"
                            if not grounding_warning:
                                grounding_warning = "Live Search quota exhausted; using Gemini knowledge."
                    generation_model = model if requested_model.startswith("gemini-") else "gemini-3.5-flash-lite"
                    model, raw_reply = call_gemini_resilient(
                        gemini_key, generation_model, [{"role": "user", "text": prompt}], system_instruction,
                        max_output_tokens=12000, google_search=False
                    )
                else:
                    grounding_warning = "Gemini key is missing; Google Search grounding was not available."
                    research_status = "model_knowledge"
                    provider, model, raw_reply = call_ai_routed("openai", body.get("model") or "", [{"role": "user", "text": prompt}], system_instruction)
                self.send_json({
                    "success": True, "text": clean_math_text(raw_reply), "provider": provider, "model": model,
                    "warning": grounding_warning, "researchStatus": research_status
                })
            except urllib.error.HTTPError as he:
                details = he.read().decode("utf-8", errors="ignore")
                self.send_json({"success": False, "error": f"AI provider returned HTTP {he.code}", "details": details}, status=he.code)
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, status=500)
            return

        self.send_json({"error": "Not found"}, status=404)

def find_open_port(starting_port):
    port = starting_port
    while port < starting_port + 50:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
            port += 1
    return starting_port

def run_server():
    # Ensure Windows console does not crash on unicode characters
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

    mimetypes.add_type("application/javascript", ".js")
    mimetypes.add_type("text/css", ".css")
    mimetypes.add_type("image/svg+xml", ".svg")
    mimetypes.add_type("application/json", ".json")

    port = find_open_port(DEFAULT_PORT)
    server_address = ("127.0.0.1", port)
    httpd = ThreadedHTTPServer(server_address, SIPrepHandler)
    
    key = load_env_api_key()
    openai_key = load_openai_api_key()
    print("=" * 65)
    print("  [SI-PREP] EXAM STUDIO & DUAL-AI MASTERCLASS RUNNER")
    print("=" * 65)
    print(f"  * Local Web URL:     http://localhost:{port}")
    print(f"  * Active Directory:  {APP_DIR}")
    print(f"  * Strategy File:     {STRATEGY_FILE}")
    print(f"  * Gemini Key Status: {'[OK] Active (' + key[:6] + '...' + key[-4:] + ')' if key else '[!] Missing in .env'}")
    print(f"  * OpenAI Key Status: {'[OK] Active (' + openai_key[:6] + '...' + openai_key[-4:] + ')' if openai_key else '[!] Missing in .env'}")
    print(f"  * Default AI Route:  Gemini -> OpenAI fallback")
    print("=" * 65)
    print(f"  Press Ctrl+C to stop the server.")
    print("=" * 65)

    # Open only after the server has selected its actual free port.
    if os.environ.get("SI_PREP_NO_BROWSER") != "1":
        threading.Timer(0.6, lambda: webbrowser.open(f"http://localhost:{port}")).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping SI-Prep server...")
        httpd.server_close()
        sys.exit(0)

if __name__ == "__main__":
    run_server()
