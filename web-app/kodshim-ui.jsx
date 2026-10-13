// Small shared UI pieces used by the map, lessons, quiz and tutor.
(() => {
  const { useEffect, useState, useMemo } = React;

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

  /* ─── Source scroll (parchment drawer) ─────────────────────────────── */
  function SourceScroll({ sources, onClose }) {
    const [idx, setIdx] = useState(0);
    const total = sources ? sources.length : 0;
    useEffect(() => {setIdx(0);}, [sources]);
  
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === "Escape") {e.preventDefault();onClose();}
        if (e.key === "ArrowLeft" && idx > 0) {e.preventDefault();setIdx(idx - 1);}
        if (e.key === "ArrowRight" && idx < total - 1) {e.preventDefault();setIdx(idx + 1);}
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [idx, total, onClose]);
  
    if (!sources || sources.length === 0) return null;
    const cur = sources[idx];
  
    return (
      <div className="drawer-back" onClick={onClose} role="presentation">
        <div
          className="scroll"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label={"Source: " + cur.cite}>
          
          <div className="rod" aria-hidden="true" />
          <div className="parchment">
            <button
              type="button"
              className="parchment-close"
              onClick={onClose}
              aria-label="Close">
              ×</button>
            <div className="parchment-eyebrow">Source</div>
            <h3 className="parchment-cite">{cur.cite}</h3>
            <div className="parchment-body">
              <div className="parchment-en">{cur.en}</div>
              <div className="parchment-divider" />
              <div className="parchment-he">{cur.he}</div>
            </div>
            {total > 1 &&
            <div className="parchment-paging">
                <button
                type="button"
                className="paging-arrow"
                onClick={() => setIdx(idx - 1)}
                disabled={idx === 0}
                aria-label="Previous source">
                ←</button>
                <div className="paging-dots">
                  {sources.map((s, i) =>
                <button
                  key={i}
                  type="button"
                  className={"paging-dot" + (i === idx ? " current" : "")}
                  onClick={() => setIdx(i)}
                  aria-label={"Source " + (i + 1) + ": " + s.cite} />
  
                )}
                </div>
                <button
                type="button"
                className="paging-arrow"
                onClick={() => setIdx(idx + 1)}
                disabled={idx === total - 1}
                aria-label="Next source">
                →</button>
                <span className="paging-count">
                  <b>{idx + 1}</b> of {total}
                </span>
              </div>
            }
          </div>
          <div className="rod" aria-hidden="true" />
        </div>
      </div>);
  
  }
  

  /* ─── Confetti ─────────────────────────────────────────────────────── */
  function Confetti() {
    const COLORS = ["#D4A046", "#6B8A3F", "#B85A3D", "#4A7CB5", "#8B5E9C", "#D46B46", "#4BAF82"];
    const pieces = useMemo(() =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        dur: 2.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        w: 7 + Math.random() * 9,
        h: 5 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 120,
      })), []);
  
    return (
      <div className="confetti-wrap" aria-hidden="true">
        {pieces.map(p => (
          <div
            key={p.id}
            className="confetti-piece"
            style={{
              "--x": p.x + "%",
              "--w": p.w + "px",
              "--h": p.h + "px",
              "--color": p.color,
              "--delay": p.delay + "s",
              "--dur": p.dur + "s",
              "--drift": p.drift + "px",
            }}
          />
        ))}
      </div>
    );
  }
  

  Object.assign(window, { Inline, Stars, Modal, sourceFor, HeartRow, SourceScroll, Confetti });
})();
