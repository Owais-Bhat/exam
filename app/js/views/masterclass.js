/* masterclass view — dated syllabus sprint, AI lessons, and completion drills */
(function () {
  let activeTab = "study";
  let activeDay = null;
  let drillAnswers = {};
  let readingScale = 1;

  function selectedDay(params = {}) {
    const requested = Number(params.day || activeDay || Store.state.masterclass?.activeDay || StudyPlan.currentDay().day);
    const today = StudyPlan.currentDay();
    const firstOpen = StudyPlan.firstIncomplete();
    const value = Number.isFinite(requested) ? requested : firstOpen.day;
    return StudyPlan.DAYS[Math.max(0, Math.min(StudyPlan.DAYS.length - 1, value - 1))] || today;
  }

  function render(root, params = {}) {
    if (params.tab) activeTab = params.tab;
    const day = selectedDay(params);
    activeDay = day.day;
    Store.state.masterclass.activeDay = day.day;
    Store.save();
    const progress = StudyPlan.progress();
    const savedCompletion = Store.state.masterclass.completedDrills?.[`${day.id}_drill`];
    const completed = savedCompletion?.maxScore >= 40 ? savedCompletion : null;
    const mockMode = StudyPlan.mode() === "mock";

    root.innerHTML = `
      <div class="view-header">
        <div>
          <span class="eyebrow">17-Day Syllabus Mission · Deadline 10 November 2026</span>
          <h1 class="view-title">Masterclass Day ${day.masterclassDay}: ${UI.esc(day.title)}</h1>
          <p class="view-subtitle">${UI.esc(day.date)} · ${UI.esc(day.focus)}</p>
        </div>
        <div class="view-actions">
          <span class="chip chip-key">${progress.done}/${progress.total} days complete</span>
          <span class="chip chip-amber">${StudyPlan.daysRemaining()} days left</span>
          <a class="btn btn-glow" href="#/ai-coach?prompt=${encodeURIComponent(`Teach me Masterclass Day ${day.masterclassDay}: ${day.title}. Follow the full four-level masterclass format with solved examples.`)}">Ask AI Coach</a>
        </div>
      </div>

      ${mockMode ? `
        <div class="card glass-card" style="margin:16px 0;border-color:var(--key)">
          <span class="chip chip-key">MOCK PHASE ACTIVE</span>
          <h2 style="margin:10px 0 6px">The syllabus deadline has passed. Start exam simulation now.</h2>
          <p style="color:var(--muted)">Finish any missed masterclass below, then take a 100-question, 120-minute mock and repair mistakes from the revision queue.</p>
          <a class="btn btn-primary" href="#/mock">Start Full Mock Drill</a>
        </div>` : ""}

      <div class="card glass-card sprint-overview" style="margin:16px 0">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap">
          <div><b>Syllabus completion</b><div style="color:var(--muted);font-size:.85rem">Complete each daily drill to advance.</div></div>
          <b class="num">${progress.pct}%</b>
        </div>
        <div class="progress-track" style="margin:10px 0 14px"><span style="width:${progress.pct}%"></span></div>
        <div class="sprint-day-strip" style="display:flex;gap:7px;overflow-x:auto;padding-bottom:5px">
          ${StudyPlan.DAYS.map(d => {
            const done = StudyPlan.isComplete(d);
            return `<button class="btn btn-sm ${d.day === day.day ? "btn-primary" : "btn-ghost"} sprint-day-btn" data-day="${d.day}" title="Masterclass Day ${d.masterclassDay}: ${UI.esc(d.title)}">${done ? "✓ " : ""}${d.masterclassDay}</button>`;
          }).join("")}
        </div>
      </div>

      <div class="view-actions" style="margin:0 0 18px">
        <button class="btn ${activeTab === "study" ? "btn-primary" : "btn-ghost"} tab-btn" data-tab="study">Study Masterclass</button>
        <button class="btn ${activeTab === "drill" ? "btn-primary" : "btn-ghost"} tab-btn" data-tab="drill">Daily Drill ${completed ? `✓ ${completed.score}/${completed.maxScore}` : ""}</button>
        <button class="btn ${activeTab === "plan" ? "btn-primary" : "btn-ghost"} tab-btn" data-tab="plan">Full Plan</button>
        <button class="btn ${activeTab === "raw" ? "btn-primary" : "btn-ghost"} tab-btn" data-tab="raw">Google Notes</button>
      </div>
      <div id="masterclass-content"></div>`;

    root.querySelectorAll(".sprint-day-btn").forEach(btn => btn.addEventListener("click", () => {
      activeDay = Number(btn.dataset.day); render(root, { day: activeDay });
    }));
    root.querySelectorAll(".tab-btn").forEach(btn => btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab; render(root, { day: activeDay, tab: activeTab });
    }));
    renderTab(root, day);
  }

  function renderTab(root, day) {
    const container = root.querySelector("#masterclass-content");
    if (activeTab === "study") renderStudy(container, day);
    else {
      document.body.classList.remove("masterclass-focus");
      if (activeTab === "drill") renderDrill(container, day, root);
      else if (activeTab === "plan") renderPlan(container, root);
      else renderRaw(container);
    }
  }

  async function renderStudy(container, day) {
    const topicCards = Object.entries(day.sections).map(([sec, topics]) => `
      <div class="fact-card">
        <span class="chip chip-ink">${UI.esc(TAXONOMY[sec].name)}</span>
        <h3 style="margin:10px 0 6px">${topics.map(t => UI.esc(StudyPlan.topicName(sec, t))).join(" · ")}</h3>
        <p class="f-sub">Core idea → shortcut → four difficulty levels → examiner traps → timed questions</p>
      </div>`).join("");
    container.innerHTML = `
      <div class="grid grid-3" style="gap:14px;margin-bottom:18px">${topicCards}</div>
      <div class="lesson-shell">
        <div class="card-header-flex">
          <div><span class="chip chip-amber">OPENAI-FIRST DEEP MASTERCLASS</span><h2 style="margin:8px 0 4px">Full explanation · Level 1 → Level 4 · Examiner traps</h2><p style="color:var(--muted)">OpenAI researches syllabus topics with web search and builds fully solved progressive examples. The result is cached for this day.</p></div>
          <button class="btn btn-ghost btn-sm" id="regenerate-lesson">Research & Regenerate</button>
        </div>
        <div class="reading-toolbar" aria-label="Reading controls">
          <span class="reading-toolbar-label">TEXTBOOK READER</span>
          <span class="research-mode-badge" id="research-mode-badge">Preparing sources…</span>
          <button class="reader-control" id="font-down" title="Smaller text">A−</button>
          <button class="reader-control" id="font-up" title="Larger text">A+</button>
          <button class="reader-control focus-control" id="focus-reading">${document.body.classList.contains("masterclass-focus") ? "Exit Focus" : "Focus Mode"}</button>
        </div>
        <div id="lesson-body" class="masterclass-markdown textbook-page" style="--reader-scale:${readingScale}"><div class="thinking-bubble">Preparing Day ${day.day} lesson…</div></div>
      </div>`;
    const lessonBody = container.querySelector("#lesson-body");
    const load = async force => {
      lessonBody.innerHTML = `<div class="thinking-bubble">${force ? "Researching again" : "OpenAI-first research in progress"} for Masterclass Day ${day.masterclassDay}… A full Level 1–4 class can take up to a minute.</div>`;
      const result = await Masterclass.getLesson(day, force);
      lessonBody.innerHTML = formatMarkdown(result.text);
      const statusBadge = container.querySelector("#research-mode-badge");
      if (statusBadge) {
        if (result.researchStatus === "openai_web") {
          statusBadge.className = "research-mode-badge research-live";
          statusBadge.textContent = "● OpenAI web research";
        } else if (result.researchStatus === "live_google") {
          statusBadge.className = "research-mode-badge research-live";
          statusBadge.textContent = "● Live Google research";
        } else if (result.researchStatus === "openai_fallback") {
          statusBadge.className = "research-mode-badge research-saved";
          statusBadge.textContent = "● OpenAI credits empty · Gemini fallback";
          statusBadge.title = result.warning || "Add OpenAI API credits to enable OpenAI generation.";
        } else if (result.researchStatus === "saved_google_notes") {
          statusBadge.className = "research-mode-badge research-saved";
          statusBadge.textContent = "● Saved Google notes";
          statusBadge.title = result.warning || "Live Search is currently unavailable.";
        } else {
          statusBadge.className = "research-mode-badge research-model";
          statusBadge.textContent = "● Gemini knowledge";
          statusBadge.title = result.warning || "Live Search is currently unavailable.";
        }
      }
      if (!result.success) UI.toast(`AI unavailable; showing the built-in lesson outline. ${result.error || ""}`);
    };
    container.querySelector("#regenerate-lesson").addEventListener("click", () => load(true));
    container.querySelector("#font-down").addEventListener("click", () => {
      readingScale = Math.max(.88, Math.round((readingScale - .08) * 100) / 100);
      lessonBody.style.setProperty("--reader-scale", readingScale);
    });
    container.querySelector("#font-up").addEventListener("click", () => {
      readingScale = Math.min(1.28, Math.round((readingScale + .08) * 100) / 100);
      lessonBody.style.setProperty("--reader-scale", readingScale);
    });
    container.querySelector("#focus-reading").addEventListener("click", e => {
      document.body.classList.toggle("masterclass-focus");
      e.currentTarget.textContent = document.body.classList.contains("masterclass-focus") ? "Exit Focus" : "Focus Mode";
      lessonBody.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    await load(false);
  }

  function formatInline(text) {
    return UI.esc(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, '<code class="textbook-inline-code">$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Render model-generated exponent notation as a real raised power.
      // Supports both LaTeX-style 7^{105} and compact forms such as 7^2 or x^-1.
      .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
      .replace(/\^([+-]?[A-Za-z0-9]+)/g, "<sup>$1</sup>");
  }

  function formatMarkdown(text) {
    const lines = UI.cleanMath(text || "").replace(/\r/g, "").split("\n");
    const html = [];
    let paragraph = [];
    let list = null;
    let levelOpen = false;

    const closeParagraph = () => {
      if (!paragraph.length) return;
      html.push(`<p>${formatInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    };
    const closeList = () => {
      if (!list) return;
      html.push(`</${list}>`);
      list = null;
    };
    const closeLevel = () => {
      if (!levelOpen) return;
      closeParagraph(); closeList(); html.push("</section>"); levelOpen = false;
    };
    const flush = () => { closeParagraph(); closeList(); };

    for (const raw of lines) {
      const line = raw.trim();
      if (!line) { flush(); continue; }
      if (/^---+$/.test(line)) { flush(); closeLevel(); html.push("<hr>"); continue; }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        flush();
        const depth = heading[1].length;
        const title = heading[2];
        const levelMatch = title.match(/^Level\s*([1-4])\s*[:—-]?\s*(.*)$/i);
        if (levelMatch) {
          closeLevel();
          const level = Number(levelMatch[1]);
          html.push(`<section class="textbook-level textbook-level-${level}"><div class="textbook-level-kicker">LEVEL ${level}</div><h4>${formatInline(levelMatch[2] || title)}</h4>`);
          levelOpen = true;
        } else {
          if (depth <= 4) closeLevel();
          const tag = depth <= 2 ? "h1" : depth === 3 ? "h2" : "h3";
          const cls = /^Section\s+\d+/i.test(title) ? ' class="textbook-section-title"' : "";
          html.push(`<${tag}${cls}>${formatInline(title)}</${tag}>`);
        }
        continue;
      }

      const quote = line.match(/^>\s*(.+)$/);
      if (quote) { flush(); html.push(`<aside class="textbook-note">${formatInline(quote[1])}</aside>`); continue; }

      const bullet = line.match(/^[-*]\s+(.+)$/);
      if (bullet) {
        closeParagraph();
        if (list !== "ul") { closeList(); html.push('<ul class="textbook-list">'); list = "ul"; }
        html.push(`<li>${formatInline(bullet[1])}</li>`);
        continue;
      }

      const numbered = line.match(/^\d+[.)]\s+(.+)$/);
      if (numbered) {
        closeParagraph();
        if (list !== "ol") { closeList(); html.push('<ol class="textbook-list textbook-steps">'); list = "ol"; }
        html.push(`<li>${formatInline(numbered[1])}</li>`);
        continue;
      }

      if (/^[A-Za-z][A-Za-z0-9_ ()/:.+-]{0,45}\s=\s.+/.test(line)) {
        flush(); html.push(`<div class="textbook-formula">${formatInline(line)}</div>`); continue;
      }

      closeList();
      paragraph.push(line);
    }
    flush(); closeLevel();
    return `<article class="textbook-content">${html.join("")}</article>`;
  }

  function renderDrill(container, day, root) {
    const drill = Masterclass.buildPlanDrill(day);
    const savedCompletion = Store.state.masterclass.completedDrills?.[drill.id];
    const completed = savedCompletion?.maxScore === drill.questions.length * 2 ? savedCompletion : null;
    const submitted = !!completed;
    drillAnswers = completed?.answers || drillAnswers[drill.id] || {};
    container.innerHTML = `
      <div class="card glass-card">
        <div class="card-header-flex">
          <div><span class="chip chip-amber">20-QUESTION DAILY TEST DRILL</span><span class="chip chip-key" style="margin-left:6px">+2 / -0.5</span><h2 style="margin:9px 0 4px">Masterclass Day ${day.masterclassDay} Drill</h2><p style="color:var(--muted)">20 questions · Target ${drill.targetScore}/${drill.questions.length * 2}. Submit once to mark this syllabus day complete.</p></div>
          ${completed ? `<div class="drill-score-badge"><span class="sb-label">SCORE</span><span class="sb-num ${completed.score >= drill.targetScore ? "good" : "warn"}">${completed.score}<small>/${completed.maxScore}</small></span></div>` : ""}
        </div>
        <div style="margin-top:18px">${drill.questions.map((q, idx) => questionHTML(q, idx, drillAnswers, submitted)).join("")}</div>
        <div class="drill-footer" style="margin-top:20px;display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap">
          ${submitted ? `<button class="btn btn-ghost" id="retake-drill">Retake</button>${day.day < StudyPlan.DAYS.length ? `<button class="btn btn-primary" id="next-masterclass">Open Masterclass Day ${day.masterclassDay + 1}</button>` : `<a class="btn btn-primary" href="#/mock">Start Mock Phase</a>`}` : `<button class="btn btn-primary btn-glow" id="submit-drill">Complete Masterclass Day ${day.masterclassDay}</button>`}
        </div>
      </div>`;

    container.querySelectorAll(".dq-opt").forEach(btn => btn.addEventListener("click", () => {
      if (submitted) return;
      drillAnswers[btn.dataset.qid] = Number(btn.dataset.opt);
      const card = btn.closest(".drill-q-card");
      card.querySelectorAll(".dq-opt").forEach(x => x.classList.remove("selected"));
      btn.classList.add("selected");
    }));
    container.querySelector("#submit-drill")?.addEventListener("click", () => {
      let score = 0;
      drill.questions.forEach(q => {
        const answer = drillAnswers[q.id];
        if (answer === undefined) return;
        const correct = answer === q.ans;
        score += correct ? 2 : -0.5;
        Store.recordAnswer(q, correct);
      });
      score = Math.max(0, Math.round(score * 10) / 10);
      const xp = Masterclass.recordDrillScore(drill.id, score, drillAnswers, drill.questions.length * 2);
      drillAnswers = {};
      UI.toast(`Masterclass Day ${day.masterclassDay} complete: ${score}/${drill.questions.length * 2} · +${xp} XP`);
      render(root, { day: day.day, tab: "drill" });
    });
    container.querySelector("#retake-drill")?.addEventListener("click", () => {
      delete Store.state.masterclass.completedDrills[drill.id]; Store.save(); drillAnswers = {}; render(root, { day: day.day, tab: "drill" });
    });
    container.querySelector("#next-masterclass")?.addEventListener("click", () => {
      activeTab = "study"; activeDay = day.day + 1; render(root, { day: activeDay, tab: "study" });
    });
  }

  function questionHTML(q, idx, answers, submitted) {
    const chosen = answers[q.id];
    const correct = chosen === q.ans;
    return `<div class="drill-q-card ${submitted ? (correct ? "drill-correct" : "drill-wrong") : ""}" data-qid="${q.id}">
      <div class="dq-header"><span class="chip num">Q${idx + 1}</span><span class="chip chip-dim">${UI.esc(StudyPlan.topicName(q.sec, q.topic))}</span>${submitted ? (correct ? '<span class="chip chip-key">+2</span>' : chosen === undefined ? '<span class="chip">Skipped</span>' : '<span class="chip chip-neg">-0.5</span>') : ""}</div>
      <p class="dq-stem">${UI.cleanText(q.q)}</p><div class="dq-options">${q.opts.map((opt, n) => {
        let cls = "dq-opt" + (chosen === n ? " selected" : "");
        if (submitted && n === q.ans) cls += " opt-correct";
        else if (submitted && chosen === n) cls += " opt-wrong";
        return `<button class="${cls}" data-qid="${q.id}" data-opt="${n}" ${submitted ? "disabled" : ""}><span class="opt-label">${"ABCD"[n]}</span><span class="opt-text">${UI.cleanText(opt)}</span></button>`;
      }).join("")}</div>${submitted ? `<div class="dq-explanation"><b>${correct ? "Correct" : `Correct answer: ${"ABCD"[q.ans]}`}</b><p>${UI.cleanText(q.exp)}</p><a class="btn btn-sm btn-ghost" href="#/ai-coach?prompt=${encodeURIComponent(`Explain this question and its examiner trap: ${q.q}`)}">Ask AI Coach</a></div>` : ""}</div>`;
  }

  function renderPlan(container, root) {
    container.innerHTML = `<div class="grid grid-2" style="gap:14px">${StudyPlan.DAYS.map(day => {
      const done = StudyPlan.isComplete(day);
      return `<button class="card glass-card plan-day-card" data-day="${day.day}" style="text-align:left;cursor:pointer;border-color:${done ? "var(--key)" : "var(--border)"}"><span class="chip ${done ? "chip-key" : "chip-ink"}">${done ? "✓ COMPLETE" : `MASTERCLASS DAY ${day.masterclassDay}`} · ${day.date}</span><h3 style="margin:10px 0 5px">${UI.esc(day.title)}</h3><p style="color:var(--muted);font-size:.86rem">${UI.esc(day.focus)}</p>${StudyPlan.labels(day).map(x => `<div class="f-sub" style="margin-top:5px">${UI.esc(x)}</div>`).join("")}</button>`;
    }).join("")}</div>`;
    container.querySelectorAll(".plan-day-card").forEach(btn => btn.addEventListener("click", () => { activeTab = "study"; render(root, { day: Number(btn.dataset.day), tab: "study" }); }));
  }

  function renderRaw(container) {
    container.innerHTML = `<div class="card glass-card"><div class="card-header-flex"><div><span class="chip chip-amber">GOOGLE NOTES IMPORT</span><h2 style="margin:8px 0 4px">Existing Gemini masterclass notes</h2><p style="color:var(--muted)">Paste content from your Google conversation. It stays in docs/gemini_strategy.md and is included as coach context.</p></div><div><button class="btn btn-ghost" id="reload-notes">Reload</button> <button class="btn btn-primary" id="save-notes">Save</button></div></div><textarea id="notes-editor" class="code-editor" style="width:100%;height:440px;margin-top:16px">${UI.esc(Masterclass.rawContent)}</textarea></div>`;
    container.querySelector("#reload-notes").addEventListener("click", async () => { container.querySelector("#notes-editor").value = await Masterclass.syncFromServer(); UI.toast("Google notes reloaded"); });
    container.querySelector("#save-notes").addEventListener("click", async () => { const r = await Masterclass.saveToServer(container.querySelector("#notes-editor").value); UI.toast(r.localOnly ? "Saved in browser" : "Saved to docs/gemini_strategy.md"); });
  }

  window.Views = window.Views || {};
  Views.masterclass = render;
})();
