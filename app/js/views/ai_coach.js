/* ai_coach.js (view) — Conversational exam coach powered by Gemini or OpenAI */
(function () {
  let pendingPrompt = null;

  function render(root, params) {
    if (params && params.prompt) {
      pendingPrompt = decodeURIComponent(params.prompt);
    }

    const model = (Store.state.aiSettings && Store.state.aiSettings.model) || "";
    const provider = (Store.state.aiSettings && Store.state.aiSettings.provider) || "auto";

    root.innerHTML = `
      <div class="view-header">
        <div>
          <span class="eyebrow">Secure Gemini + OpenAI Gateway</span>
          <h1 class="view-title">AI Exam Coach & Doubt Solver</h1>
          <p class="view-subtitle">Grounded in your <b>docs/gemini_strategy.md</b> masterclass notes and the 2,492-question JKSSB SI syllabus.</p>
        </div>
        <div class="view-actions" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <div class="sub-status-pill">
            <span class="pulse-dot"></span>
            <span id="coach-status-text">Checking AI keys…</span>
          </div>
          <select id="coach-provider-select" class="select-pill">
            <option value="auto" ${provider === "auto" ? "selected" : ""}>Auto (Gemini first)</option>
            <option value="gemini" ${provider === "gemini" ? "selected" : ""}>Google Gemini</option>
            <option value="openai" ${provider === "openai" ? "selected" : ""}>OpenAI</option>
          </select>
          <select id="coach-model-select" class="select-pill">
            <option value="" ${!model ? "selected" : ""}>Provider default model</option>
            <option value="gemini-3.5-flash" ${model === "gemini-3.5-flash" ? "selected" : ""}>Gemini 3.5 Flash (Fast)</option>
            <option value="gemini-3.8-flash" ${model === "gemini-3.8-flash" ? "selected" : ""}>Gemini 3.8 Flash (Deep)</option>
            <option value="gemini-3.5-flash-lite" ${model === "gemini-3.5-flash-lite" ? "selected" : ""}>Gemini 3.5 Flash-Lite</option>
            <option value="gpt-6-luna" ${model === "gpt-6-luna" ? "selected" : ""}>GPT-6 Luna (Cost-effective)</option>
            <option value="gpt-6.1-sol" ${model === "gpt-6.1-sol" ? "selected" : ""}>GPT-6.1 Sol (Balanced)</option>
            <option value="gpt-6-astra" ${model === "gpt-6-astra" ? "selected" : ""}>GPT-6 Astra (Highest intelligence)</option>
          </select>
          <button class="btn btn-ghost btn-sm" id="clear-chat-btn">Clear Chat</button>
        </div>
      </div>

      <!-- Quick Prompt Suggestion Chips -->
      <div class="chips-scroll-row" style="margin:16px 0;display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">
        <button class="chip-prompt" data-p="Explain the Boats & Streams Level 4 Examiner Trap from Day 13 with step-by-step ratio logic.">🚤 Boats & Streams Level 4 Trap</button>
        <button class="chip-prompt" data-p="Explain why in morning shadow questions, a shadow to the right means the person is facing South.">🧭 Morning vs Evening Shadow Rule</button>
        <button class="chip-prompt" data-p="Give me 3 high-yield questions on J&K Hydrography (Rivers and HEP projects) in JKSSB SI format.">🏔️ J&K Hydrography Practice MCQs</button>
        <button class="chip-prompt" data-p="How does the Time-Speed Inversion Shortcut work when distance is constant?">⚡ Ratio Inversion Shortcut</button>
        <button class="chip-prompt" data-p="What is the safest strategy to manage negative marking (-0.5) when I am stuck between 2 options?">🛡️ Negative Marking Tactic</button>
      </div>

      <!-- Chat Container -->
      <div class="chat-container card glass-card">
        <div id="chat-messages" class="chat-messages-box"></div>

        <!-- Chat Input Bar -->
        <div class="chat-input-bar">
          <textarea id="chat-textarea" placeholder="Ask your AI Coach anything about your syllabus, formulas, or questions..." rows="1"></textarea>
          <button id="send-chat-btn" class="btn btn-primary btn-glow">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            Send
          </button>
        </div>
      </div>
    `;

    const chatBox = root.querySelector("#chat-messages");
    const textarea = root.querySelector("#chat-textarea");
    const sendBtn = root.querySelector("#send-chat-btn");
    const clearBtn = root.querySelector("#clear-chat-btn");
    const modelSelect = root.querySelector("#coach-model-select");
    const providerSelect = root.querySelector("#coach-provider-select");

    AICoach.checkServerStatus().then(status => {
      const configured = Object.entries(status.providers || {}).filter(([, value]) => value.configured).map(([key]) => key === "openai" ? "OpenAI" : "Gemini");
      const statusText = root.querySelector("#coach-status-text");
      if (statusText) statusText.textContent = configured.length ? `${configured.join(" + ")} key${configured.length > 1 ? "s" : ""} loaded` : "Add an API key in .env";
    });

    providerSelect.addEventListener("change", () => {
      if (!Store.state.aiSettings) Store.state.aiSettings = {};
      Store.state.aiSettings.provider = providerSelect.value;
      Store.state.aiSettings.model = "";
      Store.save();
      render(root, params);
    });

    modelSelect.addEventListener("change", () => {
      if (!Store.state.aiSettings) Store.state.aiSettings = {};
      Store.state.aiSettings.model = modelSelect.value;
      if (modelSelect.value.startsWith("gpt-")) Store.state.aiSettings.provider = "openai";
      else if (modelSelect.value.startsWith("gemini-")) Store.state.aiSettings.provider = "gemini";
      Store.save();
      UI.toast(`Switched model to ${modelSelect.value}`);
      if (modelSelect.value) render(root, params);
    });

    clearBtn.addEventListener("click", () => {
      AICoach.clearHistory();
      renderMessages(chatBox);
      UI.toast("Conversation cleared");
    });

    // Auto resize textarea
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
    });

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
      }
    });

    sendBtn.addEventListener("click", submitMessage);

    root.querySelectorAll(".chip-prompt").forEach(chip => {
      chip.addEventListener("click", () => {
        textarea.value = chip.dataset.p;
        submitMessage();
      });
    });

    renderMessages(chatBox);

    // If pending prompt from navigation, trigger it
    if (pendingPrompt) {
      const p = pendingPrompt;
      pendingPrompt = null;
      textarea.value = p;
      submitMessage();
    }

    async function submitMessage() {
      const text = textarea.value.trim();
      if (!text || AICoach.isSending) return;

      textarea.value = "";
      textarea.style.height = "auto";

      // Append user bubble and temporary thinking bubble
      renderMessages(chatBox, text, true);

      const res = await AICoach.sendChatMessage(text, Masterclass.rawContent.slice(0, 3000));
      renderMessages(chatBox);
    }
  }

  function formatMarkdown(text) {
    if (!text) return "";
    let s = UI.cleanMath(text);
    s = UI.esc(s);

    // Bold
    s = s.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    // Headings
    s = s.replace(/^####\s+(.*)$/gm, '<h4 class="chat-h4">$1</h4>');
    s = s.replace(/^###\s+(.*)$/gm, '<h3 class="chat-h3">$1</h3>');
    // Code blocks
    s = s.replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>');
    // Inline code / formulas
    s = s.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    // Bullet lists
    s = s.replace(/^\s*[\*\-]\s+(.*)$/gm, '<li class="chat-li">$1</li>');
    s = s.replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="chat-ul">$1</ul>');
    // Newlines
    s = s.replace(/\n\n+/g, "<br><br>").replace(/\n/g, "<br>");
    return s;
  }

  function renderMessages(box, pendingUserText = null, isWaiting = false) {
    const history = AICoach.getHistory();
    let html = "";

    if (history.length === 0 && !pendingUserText) {
      html = `
        <div class="empty-chat-state">
          <div class="ai-avatar-large">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/><path d="M12 8v4M12 16h.01"/></svg>
          </div>
          <h2>Ready to help you clear JKSSB SI</h2>
          <p style="color:var(--muted);max-width:480px;margin:8px auto">Ask any doubt from your masterclass, test drills, syllabus topics, or ask Gemini to test you with fresh exam questions.</p>
        </div>
      `;
    } else {
      for (const m of history) {
        if (m.role === "user") {
          html += `
            <div class="msg-row user-row">
              <div class="msg-bubble user-bubble">${UI.esc(m.text)}</div>
            </div>
          `;
        } else {
          html += `
            <div class="msg-row ai-row">
              <div class="ai-avatar">🤖</div>
              <div class="msg-bubble ai-bubble">${formatMarkdown(m.text)}</div>
            </div>
          `;
        }
      }

      if (pendingUserText) {
        html += `
          <div class="msg-row user-row">
            <div class="msg-bubble user-bubble">${UI.esc(pendingUserText)}</div>
          </div>
        `;
      }

      if (isWaiting) {
        html += `
          <div class="msg-row ai-row">
            <div class="ai-avatar">🤖</div>
            <div class="msg-bubble ai-bubble thinking-bubble">
              <span class="thinking-dots"><span></span><span></span><span></span></span>
              <span style="font-size:.8rem;color:var(--muted);margin-left:8px">Gemini is analyzing with your masterclass context...</span>
            </div>
          </div>
        `;
      }
    }

    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;
  }

  window.Views = window.Views || {};
  Views.ai_coach = render;
})();
