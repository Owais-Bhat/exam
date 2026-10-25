/* ai_coach.js — secure Gemini/OpenAI server bridge and conversational engine */
(function () {
  let chatHistory = [];
  let isSending = false;

  async function checkServerStatus() {
    try {
      const res = await fetch("/api/status");
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // offline / file protocol
    }
    return {
      status: "direct",
      hasKey: false,
      providers: {},
      defaultModel: "gemini-3.5-flash"
    };
  }

  async function sendChatMessage(prompt, extraContext = "") {
    if (!prompt || isSending) return null;
    isSending = true;

    const model = (Store.state.aiSettings && Store.state.aiSettings.model) || "";
    const provider = (Store.state.aiSettings && Store.state.aiSettings.provider) || "auto";

    // Append to local history
    chatHistory.push({ role: "user", text: prompt });

    try {
      // Attempt local proxy endpoint first
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          history: chatHistory.slice(-6),
          context: extraContext,
          model: model,
          provider: provider
        })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.text || "No response received.";
        chatHistory.push({ role: "model", text: reply });
        isSending = false;
        return { success: true, text: reply, model: data.model || model, provider: data.provider || provider };
      }

      // If backend returned error, parse message
      const errData = await res.json().catch(() => ({}));
      isSending = false;
      const errMsg = errData.error || `Server responded with HTTP ${res.status}`;
      chatHistory.push({ role: "model", text: `⚠️ **AI Error:** ${errMsg}` });
      return {
        success: false,
        error: errMsg,
        details: errData.details
      };
    } catch (netErr) {
      isSending = false;
      const netMsg = "Could not connect to server. Make sure `start.bat` or `py server.py` is running locally.";
      chatHistory.push({ role: "model", text: `⚠️ **Connection Error:** ${netMsg}` });
      return {
        success: false,
        error: netMsg
      };
    }
  }

  function getHistory() {
    return chatHistory;
  }

  function clearHistory() {
    chatHistory = [];
  }

  window.AICoach = {
    get isSending() { return isSending; },
    checkServerStatus,
    sendChatMessage,
    getHistory,
    clearHistory
  };
})();
