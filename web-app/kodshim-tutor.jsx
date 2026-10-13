// "Ask the kohen" — a study-partner drawer grounded in the current level.
// Calls OpenRouter from the browser with the key the player saved in Settings.
(() => {
  const { useState, useEffect, useRef } = React;
  const K = () => window.KODSHIM;

  function suggestionsFor(levelNum, seed) {
    const L = K().level(levelNum);
    const out = [];
    if (seed && seed.item) {
      out.push(`Why is the answer to "${seed.item.prompt.replace(/_{3,}/, "…").slice(0, 90)}" what it is?`);
      if (seed.item.cite) out.push(`What does ${seed.item.cite} actually say?`);
    }
    const cs = ((L && L.concepts) || []).filter((c) => /\?\s*$/.test(c.q));
    if (cs.length) {
      const pick = K().shuffle(cs).slice(0, 2);
      pick.forEach((c) => out.push(c.q));
    }
    return out.slice(0, 4);
  }

  function TutorDrawer({ levelNum, seed, onClose, onOpenSettings }) {
    const [msgs, setMsgs] = useState([]);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(false);
    const bodyRef = useRef(null);
    const hasKey = !!(K().settings.tutorKey || "").trim();
    const L = K().level(levelNum);
    const [sugg] = useState(() => suggestionsFor(levelNum, seed));

    useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, busy]);
    useEffect(() => {
      const onKey = (e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
      window.addEventListener("keydown", onKey, true);
      return () => window.removeEventListener("keydown", onKey, true);
    }, [onClose]);

    const ask = async (q) => {
      const question = (q || input).trim();
      if (!question || busy) return;
      setInput("");
      const history = msgs.filter((m) => m.role === "user" || m.role === "assistant");
      setMsgs((m) => m.concat([{ role: "user", content: question }]));
      setBusy(true);
      try {
        const answer = await K().askTutor(levelNum, history, question);
        setMsgs((m) => m.concat([{ role: "assistant", content: answer || "(no answer)" }]));
      } catch (e) {
        const msg = e.message === "NO_KEY" ? "No OpenRouter key saved yet. Add one in Settings on the map." : "The tutor could not answer: " + e.message;
        setMsgs((m) => m.concat([{ role: "error", content: msg }]));
      } finally { setBusy(false); }
    };

    return (
      <aside className="tutor" aria-label="Ask the kohen">
        <div className="tutor-head">
          <img src="assets/kohen-gadol-teaching.png" alt="" />
          <div className="t"><b>Ask the kohen</b><span>Level {K().pad2(levelNum)} · {L ? L.name : ""}</span></div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="tutor-body" ref={bodyRef}>
          {!hasKey && (
            <div className="tutor-nokey">
              The tutor needs your own OpenRouter key. It is stored only in this browser and used
              straight from here, never sent anywhere else.{" "}
              {onOpenSettings ? <button type="button" className="link-btn" onClick={onOpenSettings}>Open Settings</button> : <span>Add it under Settings on the map.</span>}
            </div>
          )}
          {msgs.length === 0 && (
            <>
              <div className="tutor-msg assistant">Ask me anything about this level — a term, a reason, what a source says. I'll keep to the material you're learning.</div>
              {sugg.length > 0 && (
                <div className="tutor-sugg">
                  {sugg.map((s, i) => <button type="button" key={i} onClick={() => ask(s)} disabled={busy}>{s}</button>)}
                </div>
              )}
            </>
          )}
          {msgs.map((m, i) => <div key={i} className={"tutor-msg " + m.role}>{m.content}</div>)}
          {busy && <div className="tutor-msg thinking">thinking…</div>}
        </div>
        <form className="tutor-form" onSubmit={(e) => { e.preventDefault(); ask(); }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question…" disabled={busy}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }} />
          <button type="submit" className="btn primary sm" disabled={busy || !input.trim()}>Ask</button>
        </form>
      </aside>
    );
  }

  Object.assign(window, { TutorDrawer });
})();
