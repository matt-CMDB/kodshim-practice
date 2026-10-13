// Quiz run: question components (mc / tap / cloze / match / sort / tf), the
// feedback card with explanation + source, hearts, streak, and the run
// screen that strings them together for Prove, Master and Review.
(() => {
  const { useState, useEffect, useMemo, useCallback } = React;
  const K = () => window.KODSHIM;

  function shuffle(arr) { return K().shuffle(arr); }

  /* ─── Multiple-choice, tap-Hebrew, cloze ───────────────────────────── */
  function MCQuestion({ item, onAnswer, tap, cloze }) {
    const [picked, setPicked] = useState(null);
    const locked = picked !== null;
    const letters = ["A", "B", "C", "D", "E"];
    const choose = (i) => { if (locked) return; setPicked(i); onAnswer(i === item.answer, { picked: i }); };
    useEffect(() => {
      const onKey = (e) => {
        if (locked) return;
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= item.options.length) { e.preventDefault(); choose(n - 1); }
        const li = letters.indexOf(e.key.toUpperCase());
        if (li >= 0 && li < item.options.length) { e.preventDefault(); choose(li); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }); // eslint-disable-line
    const promptNode = cloze
      ? item.prompt.split(/_{3,}/).reduce((acc, part, i, arr) => {
          acc.push(<span key={"p" + i}>{part}</span>);
          if (i < arr.length - 1) acc.push(<span key={"b" + i} className={"cloze-blank" + (locked ? (picked === item.answer ? " ok" : " bad") : "")}>{locked ? item.options[item.answer] : "____"}</span>);
          return acc;
        }, [])
      : item.prompt;
    return (
      <>
        <h2 className="q-prompt">{promptNode}</h2>
        <div className="q-sub">{tap ? "Tap the right Hebrew word" : cloze ? "Pick the word that completes the halacha" : "Pick the correct answer"}</div>
        <div className={"mc-grid" + (tap ? " tap" : "")}>
          {item.options.map((opt, i) => {
            let cls = "mc-option";
            if (tap) cls += " tap-style";
            if (locked && i === item.answer) cls += " correct";
            else if (locked && i === picked) cls += " wrong";
            return (
              <button key={i} className={cls} disabled={locked} onClick={() => choose(i)}>
                {!tap && <span className="mc-key">{letters[i]}</span>}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </>
    );
  }

  /* ─── True / false ("Kosher or pasul?") ────────────────────────────── */
  function TFQuestion({ item, onAnswer }) {
    const [picked, setPicked] = useState(null);
    const locked = picked !== null;
    const kosher = /kosher or pasul/i.test(item.prompt);
    const body = item.prompt.replace(/^kosher or pasul\?\s*/i, "");
    const choose = (v) => { if (locked) return; setPicked(v); onAnswer(v === item.answer, { picked: v }); };
    useEffect(() => {
      const onKey = (e) => {
        if (locked) return;
        if (e.key === "ArrowLeft" || e.key === "1" || e.key.toLowerCase() === "t" || e.key.toLowerCase() === "k") { e.preventDefault(); choose(true); }
        if (e.key === "ArrowRight" || e.key === "2" || e.key.toLowerCase() === "f" || e.key.toLowerCase() === "p") { e.preventDefault(); choose(false); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }); // eslint-disable-line
    const cls = (v) => "tf-btn " + (v ? "yes" : "no") + (locked ? (v === item.answer ? " correct" : v === picked ? " wrong" : " dim") : "");
    return (
      <>
        {kosher && <div className="q-kicker">Kosher or pasul?</div>}
        <h2 className="q-prompt">{body}</h2>
        <div className="q-sub">{kosher ? "Is this valid?" : "True or false?"}</div>
        <div className="tf-row">
          <button type="button" className={cls(true)} disabled={locked} onClick={() => choose(true)}>
            <span className="tf-mark">✓</span>
            <span className="tf-label">{kosher ? "Kosher" : "True"}</span>
            {kosher && <span className="tf-he">כָּשֵׁר</span>}
          </button>
          <button type="button" className={cls(false)} disabled={locked} onClick={() => choose(false)}>
            <span className="tf-mark">✕</span>
            <span className="tf-label">{kosher ? "Pasul" : "False"}</span>
            {kosher && <span className="tf-he">פָּסוּל</span>}
          </button>
        </div>
      </>
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
      if (selHe === selEn) {
        K().sfx.tap();
        setMatched((m) => ({ ...m, [selHe]: true })); setSelHe(null); setSelEn(null);
      } else {
        setWrong({ he: selHe, en: selEn }); setErrs((n) => n + 1);
        const t = setTimeout(() => { setWrong(null); setSelHe(null); setSelEn(null); }, 450);
        return () => clearTimeout(t);
      }
    }, [selHe, selEn]);
    useEffect(() => {
      if (!done && Object.keys(matched).length === item.pairs.length) {
        setDone(true);
        // No cleanup here on purpose: the re-render caused by setDone would
        // otherwise cancel this timer before it fires.
        setTimeout(() => onAnswer(errs === 0, { errors: errs }), 350);
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
      <>
        <h2 className="q-prompt">{item.prompt}</h2>
        <div className="q-sub">Tap a Hebrew word, then tap its meaning{errs > 0 && <span className="q-errs"> · {errs} slip{errs === 1 ? "" : "s"}</span>}</div>
        <div className="match-grid">
          <div>
            <div className="match-col-title">Hebrew</div>
            <div className="match-stack">
              {heOrder.map((idx) => <button key={"h" + idx} className={cls(idx, "he")} onClick={() => !matched[idx] && setSelHe(idx)}>{item.pairs[idx].hebrew}</button>)}
            </div>
          </div>
          <div>
            <div className="match-col-title">Meaning</div>
            <div className="match-stack">
              {enOrder.map((idx) => <button key={"e" + idx} className={cls(idx, "en")} onClick={() => !matched[idx] && setSelEn(idx)}>{item.pairs[idx].english}</button>)}
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ─── Sort into buckets (drag, or tap chip then tap bucket) ────────── */
  function SortQuestion({ item, onAnswer }) {
    const order = useMemo(() => shuffle(item.items.map((_, i) => i)), [item]);
    const [place, setPlace] = useState(() => Object.fromEntries(item.items.map((_, i) => [i, null])));
    const [dragId, setDragId] = useState(null);
    const [over, setOver] = useState(null);
    const [held, setHeld] = useState(null);     // tap-to-place for touch / keyboard
    const [checked, setChecked] = useState(false);
    const remaining = order.filter((i) => place[i] === null);
    const allPlaced = remaining.length === 0;

    const put = (i, bid) => { setPlace((p) => ({ ...p, [i]: bid })); setDragId(null); setOver(null); setHeld(null); K().sfx.tap(); };
    const check = () => {
      if (!allPlaced || checked) return;
      setChecked(true);
      const right = item.items.every((it, i) => place[i] === it.bucket);
      setTimeout(() => onAnswer(right, { wrong: item.items.filter((it, i) => place[i] !== it.bucket).map((it) => it.hebrew) }), 500);
    };
    const chipCls = (i) => {
      let c = "sort-chip";
      if (dragId === i) c += " dragging";
      if (held === i) c += " held";
      if (checked) c += place[i] === item.items[i].bucket ? " correct" : " wrong";
      return c;
    };
    const Chip = ({ i }) => (
      <div className={chipCls(i)} draggable={!checked} onDragStart={() => setDragId(i)} onDragEnd={() => { setDragId(null); setOver(null); }}
        onClick={() => !checked && setHeld((h) => (h === i ? null : i))} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setHeld((h) => (h === i ? null : i)); } }}>
        <span className="he">{item.items[i].hebrew}</span>
        {item.items[i].translit && <span className="tl">{item.items[i].translit}</span>}
      </div>
    );
    return (
      <>
        <h2 className="q-prompt">{item.prompt}</h2>
        <div className="q-sub">Drag each chip into its bucket — or tap a chip, then tap a bucket</div>
        <div className="sort-wrap">
          <div className={"sort-bank" + (held !== null ? " target" : "")} onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); if (dragId !== null) put(dragId, null); }}
            onClick={() => { if (held !== null && place[held] !== null) put(held, null); }}>
            {remaining.length === 0 && <span className="sort-bank-empty">All placed — press Check</span>}
            {remaining.map((i) => <Chip key={i} i={i} />)}
          </div>
          <div className="sort-buckets" style={{ "--n": item.buckets.length }}>
            {item.buckets.map((b) => (
              <div key={b.id} className={"sort-bucket" + (over === b.id ? " over" : "") + (held !== null ? " target" : "")}
                onDragOver={(e) => { e.preventDefault(); setOver(b.id); }} onDragLeave={() => setOver((v) => (v === b.id ? null : v))}
                onDrop={(e) => { e.preventDefault(); if (dragId !== null) put(dragId, b.id); }}
                onClick={() => { if (held !== null) put(held, b.id); }}>
                <div className="sort-bucket-title"><span className="en">{b.en}</span><span className="he">{b.he}</span></div>
                <div className="sort-bucket-items">
                  {item.items.map((it, i) => (place[i] === b.id ? <Chip key={i} i={i} /> : null))}
                </div>
              </div>
            ))}
          </div>
          <div className="sort-actions">
            <button className="btn gold" disabled={!allPlaced || checked} onClick={check}>Check answer →</button>
          </div>
        </div>
      </>
    );
  }

  /* ─── Feedback card ────────────────────────────────────────────────── */
  function correctAnswerText(item) {
    switch (item.kind) {
      case "mc": case "tap": case "cloze": return item.options[item.answer];
      case "tf": return item.answer ? (/kosher or pasul/i.test(item.prompt) ? "Kosher" : "True") : (/kosher or pasul/i.test(item.prompt) ? "Pasul" : "False");
      case "match": return item.pairs.map((p) => `${p.hebrew} — ${p.english}`).join(" · ");
      case "sort": return item.buckets.map((b) => `${b.en}: ${item.items.filter((it) => it.bucket === b.id).map((it) => it.hebrew).join(", ")}`).join(" · ");
      default: return "";
    }
  }
  function Feedback({ item, ok, streak, onContinue, onAsk, onSource }) {
    const src = item.cite ? sourceFor(item.cite) : null;
    useEffect(() => {
      const onKey = (e) => { if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") { e.preventDefault(); onContinue(); } };
      window.addEventListener("keydown", onKey, true);
      return () => window.removeEventListener("keydown", onKey, true);
    }, [onContinue]);
    return (
      <div className={"feedback " + (ok ? "ok" : "bad")} role="status">
        <div className="fb-head">
          <span className="fb-mark">{ok ? "✓" : "✕"}</span>
          <span className="fb-title">{ok ? (streak >= 3 ? `Correct — ${streak} in a row` : "Correct.") : "Not quite."}</span>
          {!ok && <span className="fb-answer">Answer: <b>{correctAnswerText(item)}</b></span>}
        </div>
        <p className="fb-explain"><Inline text={item.explain} /></p>
        <div className="fb-foot">
          <div className="fb-left">
            {src && <button type="button" className="source-link sm" onClick={() => onSource(src)}><span className="src-label">Source</span><span className="src-cite">{src.cite}</span><span className="src-arrow">↗</span></button>}
            {onAsk && <button type="button" className="link-btn" onClick={() => onAsk(item, ok)}>Ask the kohen</button>}
          </div>
          <button type="button" className={"btn primary " + (ok ? "" : "")} onClick={onContinue}><span>Continue</span><span className="arrow">→</span></button>
        </div>
      </div>
    );
  }

  /* ─── The run ──────────────────────────────────────────────────────── */
  const MODE_LABEL = { prove: "Prove", master: "Master", review: "Review" };
  function QuizRun({ mode, levelNum, items, onFinish, onExit, onSwitchStage, onAsk, onAnswer: onAnswerProp }) {
    const [idx, setIdx] = useState(0);
    const [hearts, setHearts] = useState(mode === "review" ? Infinity : 3);
    const [correct, setCorrect] = useState(0);
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(0);
    const [fb, setFb] = useState(null);         // { ok }
    const [source, setSource] = useState(null);
    const [heartPop, setHeartPop] = useState(false);
    const item = items[idx];
    const total = items.length;
    window.__currentItem = item; // debug hook for the browser driver

    const onAnswer = useCallback((ok, detail) => {
      K().recordAnswer(item.id, ok);
      if (onAnswerProp) onAnswerProp(item, ok, detail);
      let h = hearts, s = streak;
      if (ok) { s += 1; setCorrect((c) => c + 1); setStreak(s); if (s > best) setBest(s); (s >= 3 ? K().sfx.streak : K().sfx.correct)(); }
      else { s = 0; setStreak(0); if (mode !== "review") { h = hearts - 1; setHearts(h); setHeartPop(true); setTimeout(() => setHeartPop(false), 700); } K().sfx.wrong(); }
      setFb({ ok, hearts: h, streak: s });
    }, [item, hearts, streak, best, mode]);

    const next = useCallback(() => {
      if (!fb) return;
      const h = fb.hearts;
      const c = correct;
      setFb(null); setSource(null);
      if (h <= 0 || idx + 1 >= total) { onFinish({ correct: c, total, hearts: h === Infinity ? 3 : h, streak: best, outOfHearts: h <= 0 }); return; }
      setIdx(idx + 1);
    }, [fb, idx, total, correct, best, onFinish]);

    const pct = ((idx + (fb ? 1 : 0)) / total) * 100;
    const stage = mode === "review" ? "review" : "prove";
    return (
      <div className={"quiz mode-" + mode}>
        <TopBar levelNum={levelNum} stage={stage} onStageChange={onSwitchStage} onExit={onExit} onAsk={onAsk ? () => onAsk(item, null) : null} />
        <div className="quiz-top">
          {mode === "review"
            ? <div className="quiz-mode-tag">Review · no hearts</div>
            : <div className={"quiz-hearts-wrap" + (heartPop ? " pop" : "")}><HeartRow hearts={hearts} /></div>}
          <div className="quiz-progress">
            <div className="quiz-bar"><div className="quiz-bar-fill" style={{ width: pct + "%" }} /></div>
            <span className="quiz-count"><b>{K().pad2(idx + 1)}</b> / {K().pad2(total)}</span>
          </div>
          <div className={"quiz-streak" + (streak >= 3 ? " hot" : "") + (streak === 0 ? " zero" : "")} aria-label={`Streak ${streak}`} title="Streak">
            <span className="qs-fire" aria-hidden="true">🔥</span>
            <span className="qs-n">{streak}</span>
          </div>
        </div>

        <div className="quiz-body" key={item.id}>
          <div className="quiz-eyebrow-row">
            <span className="quiz-mode">{MODE_LABEL[mode]}{mode === "master" && item.level !== levelNum ? ` · from Level ${item.level}` : ""}{mode === "review" ? ` · Level ${item.level}` : ""}</span>
            <span className="quiz-kind">{{ mc: "Multiple choice", tap: "Tap the Hebrew", cloze: "Complete the halacha", match: "Match", sort: "Sort", tf: "Kosher or pasul" }[item.kind]}</span>
          </div>
          {item.kind === "mc" && <MCQuestion item={item} onAnswer={onAnswer} />}
          {item.kind === "tap" && <MCQuestion item={item} onAnswer={onAnswer} tap />}
          {item.kind === "cloze" && <MCQuestion item={item} onAnswer={onAnswer} cloze />}
          {item.kind === "tf" && <TFQuestion item={item} onAnswer={onAnswer} />}
          {item.kind === "match" && <MatchQuestion item={item} onAnswer={onAnswer} />}
          {item.kind === "sort" && <SortQuestion item={item} onAnswer={onAnswer} />}
        </div>

        <div className="quiz-foot">
          {!fb && (
            <span className="quiz-hint">
              {item.kind === "sort" ? "Place every chip, then press Check." : item.kind === "match" ? "A slip costs the card, not a heart — until you finish." : mode === "review" ? "No hearts in review. Just remember." : "One wrong answer costs a heart."}
              {["mc", "tap", "cloze"].includes(item.kind) && <span className="quiz-keys"> · keys 1–{item.options.length} answer</span>}
              {item.kind === "tf" && <span className="quiz-keys"> · ← true · → false</span>}
            </span>
          )}
        </div>

        {fb && <Feedback item={item} ok={fb.ok} streak={fb.streak} onContinue={next} onAsk={onAsk} onSource={(s) => setSource(s)} />}
        {source && <SourceScroll sources={[source]} onClose={() => setSource(null)} />}
      </div>
    );
  }

  Object.assign(window, { MCQuestion, TFQuestion, MatchQuestion, SortQuestion, Feedback, QuizRun });
})();
