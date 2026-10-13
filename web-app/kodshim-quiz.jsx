// Question components. Each renders only the answer surface (the prompt is
// spoken by the kohen in the scene's dialogue box) and reports
// onAnswer(ok, detail) once, when the learner commits.
(() => {
  const { useState, useEffect, useMemo } = React;
  const K = () => window.KODSHIM;
  const shuffle = (arr) => K().shuffle(arr);
  const LETTERS = ["A", "B", "C", "D", "E"];

  /* ─── Multiple-choice, tap-Hebrew, cloze ───────────────────────────── */
  function MCQuestion({ item, onAnswer, tap, cloze }) {
    const [picked, setPicked] = useState(null);
    const locked = picked !== null;
    const choose = (i) => { if (locked) return; setPicked(i); onAnswer(i === item.answer, { picked: i }); };
    useEffect(() => {
      const onKey = (e) => {
        if (locked || e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= item.options.length) { e.preventDefault(); choose(n - 1); return; }
        const li = LETTERS.indexOf(e.key.toUpperCase());
        if (li >= 0 && li < item.options.length) { e.preventDefault(); choose(li); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }); // eslint-disable-line
    return (
      <div className={"q-mc" + (tap ? " tap" : "") + (cloze ? " cloze" : "")}>
        {cloze && (
          <div className="q-cloze-line">
            {item.prompt.split(/_{3,}/).reduce((acc, part, i, arr) => {
              acc.push(<span key={"p" + i}>{part}</span>);
              if (i < arr.length - 1) acc.push(<span key={"b" + i} className={"cloze-blank" + (locked ? " ok" : "")}>{locked ? item.options[item.answer] : "____"}</span>);
              return acc;
            }, [])}
          </div>
        )}
        <div className="q-options">
          {item.options.map((opt, i) => {
            let cls = "q-opt";
            if (locked && i === item.answer) cls += " correct";
            else if (locked && i === picked) cls += " wrong";
            else if (locked) cls += " dim";
            return (
              <button key={i} type="button" className={cls} disabled={locked} onClick={() => choose(i)}>
                <span className="q-key">{LETTERS[i]}</span>
                <span className={"q-opt-text" + (tap ? " he" : "")}>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Tap the picture ──────────────────────────────────────────────── */
  function PicQuestion({ item, onAnswer }) {
    const [picked, setPicked] = useState(null);
    const locked = picked !== null;
    const choose = (i) => { if (locked) return; setPicked(i); onAnswer(i === item.answer, { picked: i }); };
    useEffect(() => {
      const onKey = (e) => { const n = parseInt(e.key, 10); if (!locked && n >= 1 && n <= item.options.length) { e.preventDefault(); choose(n - 1); } };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }); // eslint-disable-line
    return (
      <div className="q-pics">
        {item.options.map((o, i) => {
          let cls = "q-pic";
          if (locked && i === item.answer) cls += " correct";
          else if (locked && i === picked) cls += " wrong";
          else if (locked) cls += " dim";
          return (
            <button key={i} type="button" className={cls} disabled={locked} onClick={() => choose(i)}>
              <img src={o.img} alt="" />
              <span className="q-pic-label">{locked ? <span className="he">{o.label}</span> : <span className="q-key">{i + 1}</span>}</span>
            </button>
          );
        })}
      </div>
    );
  }

  /* ─── True / false ("Kosher or pasul?") ────────────────────────────── */
  function TFQuestion({ item, onAnswer }) {
    const [picked, setPicked] = useState(null);
    const locked = picked !== null;
    const kosher = /kosher or pasul/i.test(item.prompt);
    const choose = (v) => { if (locked) return; setPicked(v); onAnswer(v === item.answer, { picked: v }); };
    useEffect(() => {
      const onKey = (e) => {
        if (locked) return;
        const k = e.key.toLowerCase();
        if (e.key === "ArrowLeft" || k === "1" || k === "t" || k === "k") { e.preventDefault(); choose(true); }
        if (e.key === "ArrowRight" || k === "2" || k === "f" || k === "p") { e.preventDefault(); choose(false); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }); // eslint-disable-line
    const cls = (v) => "tf-btn " + (v ? "yes" : "no") + (locked ? (v === item.answer ? " correct" : v === picked ? " wrong" : " dim") : "");
    return (
      <div className="tf-row">
        <button type="button" className={cls(true)} disabled={locked} onClick={() => choose(true)}>
          <span className="tf-mark">✓</span><span className="tf-label">{kosher ? "Kosher" : "True"}</span>{kosher && <span className="tf-he">כָּשֵׁר</span>}
        </button>
        <button type="button" className={cls(false)} disabled={locked} onClick={() => choose(false)}>
          <span className="tf-mark">✕</span><span className="tf-label">{kosher ? "Pasul" : "False"}</span>{kosher && <span className="tf-he">פָּסוּל</span>}
        </button>
      </div>
    );
  }

  /* ─── Match pairs ──────────────────────────────────────────────────── */
  function MatchQuestion({ item, onAnswer }) {
    const heOrder = useMemo(() => shuffle(item.pairs.map((_, i) => i)), [item]);
    const enOrder = useMemo(() => shuffle(item.pairs.map((_, i) => i)), [item]);
    const [matched, setMatched] = useState({});
    const [selHe, setSelHe] = useState(null);
    const [selEn, setSelEn] = useState(null);
    const [wrong, setWrong] = useState(null);
    const [errs, setErrs] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
      if (selHe === null || selEn === null) return;
      if (selHe === selEn) { K().sfx.tap(); setMatched((m) => ({ ...m, [selHe]: true })); setSelHe(null); setSelEn(null); }
      else {
        setWrong({ he: selHe, en: selEn }); setErrs((n) => n + 1);
        const t = setTimeout(() => { setWrong(null); setSelHe(null); setSelEn(null); }, 450);
        return () => clearTimeout(t);
      }
    }, [selHe, selEn]);
    useEffect(() => {
      if (!done && Object.keys(matched).length === item.pairs.length) {
        setDone(true);
        setTimeout(() => onAnswer(errs === 0, { errors: errs }), 300); // no cleanup: setDone re-runs this effect
      }
    }, [matched, errs, item.pairs.length, onAnswer, done]);

    const cls = (idx, side) => {
      let c = "match-card" + (side === "he" ? " he" : "");
      if (matched[idx]) c += " matched";
      if (wrong && wrong[side] === idx) c += " wrong";
      if ((side === "he" ? selHe : selEn) === idx) c += " selected";
      return c;
    };
    return (
      <div className="match-grid">
        <div className="match-stack">
          {heOrder.map((idx) => <button key={"h" + idx} type="button" className={cls(idx, "he")} onClick={() => !matched[idx] && setSelHe(idx)}>{item.pairs[idx].hebrew}</button>)}
        </div>
        <div className="match-stack">
          {enOrder.map((idx) => <button key={"e" + idx} type="button" className={cls(idx, "en")} onClick={() => !matched[idx] && setSelEn(idx)}>{item.pairs[idx].english}</button>)}
        </div>
        {errs > 0 && <div className="match-errs">{errs} slip{errs === 1 ? "" : "s"}</div>}
      </div>
    );
  }

  /* ─── Sort into buckets: tap a chip, tap a bucket (drag also works) ── */
  function SortQuestion({ item, onAnswer }) {
    const order = useMemo(() => shuffle(item.items.map((_, i) => i)), [item]);
    const [place, setPlace] = useState(() => Object.fromEntries(item.items.map((_, i) => [i, null])));
    const [held, setHeld] = useState(null);
    const [dragId, setDragId] = useState(null);
    const [over, setOver] = useState(null);
    const [checked, setChecked] = useState(false);
    const remaining = order.filter((i) => place[i] === null);
    const allPlaced = remaining.length === 0;
    // Auto-hold the next chip so the learner only has to tap buckets.
    const active = held !== null ? held : remaining.length ? remaining[0] : null;

    const put = (i, bid) => { setPlace((p) => ({ ...p, [i]: bid })); setHeld(null); setDragId(null); setOver(null); K().sfx.tap(); };
    const check = () => {
      if (!allPlaced || checked) return;
      setChecked(true);
      const right = item.items.every((it, i) => place[i] === it.bucket);
      setTimeout(() => onAnswer(right, { wrong: item.items.filter((it, i) => place[i] !== it.bucket).map((it) => it.hebrew) }), 450);
    };
    useEffect(() => {
      const onKey = (e) => {
        if (checked) return;
        const n = parseInt(e.key, 10);
        if (active !== null && n >= 1 && n <= item.buckets.length) { e.preventDefault(); put(active, item.buckets[n - 1].id); }
        if (e.key === "Enter" && allPlaced) { e.preventDefault(); check(); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }); // eslint-disable-line
    const chipCls = (i) => {
      let c = "sort-chip";
      if (active === i && !checked) c += " held";
      if (dragId === i) c += " dragging";
      if (checked) c += place[i] === item.items[i].bucket ? " correct" : " wrong";
      return c;
    };
    const Chip = ({ i, small }) => (
      <div className={chipCls(i) + (small ? " sm" : "")} draggable={!checked} onDragStart={() => setDragId(i)} onDragEnd={() => { setDragId(null); setOver(null); }}
        onClick={(e) => {
          if (checked) { e.stopPropagation(); return; }
          if (place[i] === null) { e.stopPropagation(); setHeld(i); return; }           // pick up from the bank
          if (active !== null && active !== i) return;                                  // let the tap reach the bucket: place the active chip
          e.stopPropagation(); put(i, null);                                            // nothing left to place: send this chip back
        }} role="button" tabIndex={0}>
        <span className="he">{item.items[i].hebrew}</span>
        {item.items[i].translit && <span className="tl">{item.items[i].translit}</span>}
      </div>
    );
    return (
      <div className="sort-wrap">
        <div className="sort-bank" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); if (dragId !== null) put(dragId, null); }}>
          {remaining.length === 0
            ? <span className="sort-bank-empty">All placed.</span>
            : remaining.map((i) => <Chip key={i} i={i} />)}
        </div>
        <div className="sort-buckets" style={{ "--n": item.buckets.length }}>
          {item.buckets.map((b, bi) => (
            <div key={b.id} className={"sort-bucket" + (over === b.id ? " over" : "") + (active !== null && !checked ? " target" : "")}
              onDragOver={(e) => { e.preventDefault(); setOver(b.id); }} onDragLeave={() => setOver((v) => (v === b.id ? null : v))}
              onDrop={(e) => { e.preventDefault(); if (dragId !== null) put(dragId, b.id); }}
              onClick={() => { if (active !== null && !checked) put(active, b.id); }}>
              <div className="sort-bucket-title"><span className="q-key">{bi + 1}</span><span className="en">{b.en}</span><span className="he">{b.he}</span></div>
              <div className="sort-bucket-items">{item.items.map((it, i) => (place[i] === b.id ? <Chip key={i} i={i} small /> : null))}</div>
            </div>
          ))}
        </div>
        <div className="sort-actions">
          <span className="sort-hint">{checked ? "" : allPlaced ? "Tap a chip to move it back." : "Tap a bucket to place the highlighted chip."}</span>
          <button type="button" className="btn gold sm" disabled={!allPlaced || checked} onClick={check}>Check →</button>
        </div>
      </div>
    );
  }

  function QuestionBoard({ item, onAnswer }) {
    switch (item.kind) {
      case "mc": return <MCQuestion item={item} onAnswer={onAnswer} />;
      case "tap": return <MCQuestion item={item} onAnswer={onAnswer} tap />;
      case "cloze": return <MCQuestion item={item} onAnswer={onAnswer} cloze />;
      case "pic": return <PicQuestion item={item} onAnswer={onAnswer} />;
      case "tf": return <TFQuestion item={item} onAnswer={onAnswer} />;
      case "match": return <MatchQuestion item={item} onAnswer={onAnswer} />;
      case "sort": return <SortQuestion item={item} onAnswer={onAnswer} />;
      default: return null;
    }
  }

  function correctAnswerText(item) {
    switch (item.kind) {
      case "mc": case "tap": case "cloze": return item.options[item.answer];
      case "pic": return item.options[item.answer].label;
      case "tf": return item.answer ? (/kosher or pasul/i.test(item.prompt) ? "Kosher" : "True") : (/kosher or pasul/i.test(item.prompt) ? "Pasul" : "False");
      case "match": return item.pairs.map((p) => `${p.hebrew} — ${p.english}`).join(" · ");
      case "sort": return item.buckets.map((b) => `${b.en}: ${item.items.filter((it) => it.bucket === b.id).map((it) => it.hebrew).join(", ")}`).join(" · ");
      default: return "";
    }
  }

  // What the kohen says before the answer surface, by kind.
  function askLine(item) {
    switch (item.kind) {
      case "pic": return item.prompt;
      case "cloze": return "Fill in the missing word.";
      case "tap": return item.prompt;
      case "tf": return item.prompt.replace(/^kosher or pasul\?\s*/i, "Kosher or pasul? ");
      case "match": return item.prompt + " Tap a Hebrew word, then its meaning.";
      case "sort": return item.prompt;
      default: return item.prompt;
    }
  }

  Object.assign(window, { MCQuestion, PicQuestion, TFQuestion, MatchQuestion, SortQuestion, QuestionBoard, correctAnswerText, askLine });
})();
