// Small shared UI pieces used by the map, lessons, quiz and tutor.
(() => {
  const { useEffect } = React;

  // Inline markup: {{he:עוֹלָה}} -> Hebrew span, **bold** -> <b>.
  function Inline({ text }) {
    if (text == null) return null;
    const parts = [];
    const re = /\{\{he:([^}]+)\}\}|\*\*([^*]+)\*\*/g;
    let last = 0, m, k = 0;
    while ((m = re.exec(text))) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      if (m[1] !== undefined) parts.push(<span className="he-inline" key={k++}>{m[1]}</span>);
      else parts.push(<b key={k++}>{m[2]}</b>);
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
  }

  function Stars({ n, max = 3, size = "md" }) {
    return (
      <span className={"stars " + size} aria-label={`${n} of ${max} stars`}>
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={"star" + (i < n ? " on" : "")}>★</span>
        ))}
      </span>
    );
  }

  // Centered modal with backdrop; Escape closes.
  function Modal({ onClose, className, children, label }) {
    useEffect(() => {
      const onKey = (e) => { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); onClose && onClose(); } };
      window.addEventListener("keydown", onKey, true);
      return () => window.removeEventListener("keydown", onKey, true);
    }, [onClose]);
    return (
      <div className="intro-overlay modal-overlay" onClick={onClose} role="presentation">
        <div className={"intro-modal " + (className || "")} onClick={(e) => e.stopPropagation()} role="dialog" aria-label={label}>
          {onClose && <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>}
          {children}
        </div>
      </div>
    );
  }

  // Resolve a cite string to a source record (Hebrew/English) if we have it.
  function sourceFor(cite) {
    const S = window.KODSHIM_SOURCES || {};
    const s = S[cite];
    if (!s) return { cite, he: null, en: null, heTitle: null };
    return { cite, he: s.he || null, en: s.en || null, heTitle: s.heTitle || null, book: s.book };
  }

  function HeartRow({ hearts, max = 3 }) {
    return (
      <div className="quiz-hearts" aria-label={`${hearts} hearts remaining`}>
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={"quiz-heart" + (i >= hearts ? " lost" : "")} />
        ))}
      </div>
    );
  }

  Object.assign(window, { Inline, Stars, Modal, sourceFor, HeartRow });
})();
