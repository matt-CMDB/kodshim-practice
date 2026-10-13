// The scene: the kohen gadol teaches in the courtyard, one idea per tap.
// A script is a list of steps: { t: "say", text, board } or { t: "ask", item }.
// Learn scenes interleave teaching with checks; Prove/Master/Review scenes
// are checks only, with hearts.
(() => {
  const { useState, useEffect, useCallback, useRef, useMemo } = React;
  const K = () => window.KODSHIM;

  /* ─── Script building ─────────────────────────────────────────────── */
  function sentences(text) {
    return (text || "").replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+(?=[A-Zא-ת"'(])/).filter(Boolean);
  }
  // Group sentences into bubbles of at most ~200 characters / 2 sentences.
  function bubbles(text) {
    const out = [];
    let cur = "";
    sentences(text).forEach((s) => {
      if (cur && (cur.length + s.length > 200 || cur.split(/[.!?]\s/).length >= 2)) { out.push(cur); cur = s; }
      else cur = cur ? cur + " " + s : s;
    });
    if (cur) out.push(cur);
    return out;
  }
  const stripInline = (s) => (s || "").replace(/\{\{he:([^}]+)\}\}/g, "$1").replace(/\*\*/g, "");

  function blockSteps(b) {
    const steps = [];
    const say = (text, board) => steps.push({ t: "say", text, board });
    switch (b.type) {
      case "cards":
        b.items.forEach((it, i) => {
          const name = it.tl ? `${it.tl.charAt(0).toUpperCase() + it.tl.slice(1)}${it.en ? ", " + it.en : ""}` : (it.en || it.he);
          say(`${name}. ${it.text || ""}`.trim(), { type: "cards", items: b.items, focus: i });
        });
        break;
      case "cast":
        b.items.forEach((it, i) => say(it.caption || it.name, { type: "cast", items: b.items, focus: i }));
        break;
      case "steps":
        b.items.forEach((it, i) => say(`${it.title}. ${it.text}`, { type: "steps", items: b.items, upto: i }));
        break;
      case "table":
        say(b.caption ? `${b.caption}. Take a look.` : "Here is how they compare.", { type: "table", ...b });
        break;
      case "compare":
        say(`On one side, ${b.left.title.toLowerCase()}. On the other, ${b.right.title.toLowerCase()}.`, { type: "compare", ...b });
        break;
      case "callout":
        say(b.text, { type: "callout", title: b.title, text: b.text });
        break;
      case "list":
        say(b.title ? `${b.title}.` : "Here is the list.", { type: "list", ...b });
        break;
      case "terms":
        say("A few words to keep.", { type: "terms", ...b });
        break;
      case "figure":
        say(b.caption || "", { type: "figure", ...b });
        break;
      default:
        break;
    }
    return steps;
  }

  function buildLearnScript(levelNum, lessonIdx) {
    const L = K().level(levelNum);
    const lesson = L.lessons[lessonIdx];
    const checks = ((L.checks || {})[lesson.id] || []).map((id) => K().quizById(id)).filter(Boolean);
    const steps = [];
    const title = { type: "title", num: levelNum, idx: lessonIdx, total: L.lessons.length, title: lesson.title, dek: lesson.dek };
    steps.push({ t: "say", text: lesson.dek || lesson.title, board: title });
    lesson.intro.forEach((p) => bubbles(p).forEach((txt) => steps.push({ t: "say", text: txt, board: title })));
    const queue = checks.slice();
    const nBlocks = lesson.blocks.length;
    // Spread the checks across the blocks: after each block, ask ceil(remaining / blocksLeft).
    lesson.blocks.forEach((b, bi) => {
      steps.push(...blockSteps(b));
      const blocksLeft = nBlocks - bi;
      const n = Math.ceil(queue.length / blocksLeft);
      for (let k = 0; k < n && queue.length; k++) steps.push({ t: "ask", item: queue.shift() });
    });
    while (queue.length) steps.push({ t: "ask", item: queue.shift() });
    steps.push({ t: "say", text: lessonIdx + 1 < L.lessons.length ? "That's the lesson. Ready for the next one?" : "That's the last lesson of the level. When you're ready, prove it.", board: { type: "lessonDone", num: levelNum, idx: lessonIdx, total: L.lessons.length, title: lesson.title, next: L.lessons[lessonIdx + 1] ? L.lessons[lessonIdx + 1].title : null } });
    return steps;
  }

  const INTRO = {
    prove: (L) => `Ten cards on ${L.name.toLowerCase()}. Three hearts. Seventy percent passes. Take your time.`,
    master: (L) => `Harder this time: ten cards, some from earlier levels, leaning on what you've missed. Eighty-five percent.`,
    review: () => `Your review deck. No hearts, nothing to lose. Just remember.`,
  };
  function buildRunScript(mode, levelNum, items) {
    const L = K().level(levelNum) || { name: "" };
    const steps = [{ t: "say", text: INTRO[mode](L), board: { type: "runIntro", mode, num: levelNum, count: items.length } }];
    items.forEach((item) => steps.push({ t: "ask", item }));
    return steps;
  }

  const RIGHT = ["Right.", "Yes.", "Exactly.", "Good.", "That's it.", "Correct."];
  const WRONG = ["Not quite.", "Not this time.", "Close, but no.", "Have another look."];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* ─── Boards ──────────────────────────────────────────────────────── */
  function Board({ board }) {
    const tl = K().settings.showTranslit;
    if (!board) return null;
    switch (board.type) {
      case "title":
        return (
          <div className="bd bd-title">
            <div className="bd-eyebrow">Level {K().pad2(board.num)} · Lesson {board.idx + 1} of {board.total}</div>
            <h2>{board.title}</h2>
            {board.dek && <p>{board.dek}</p>}
          </div>
        );
      case "lessonDone":
        return (
          <div className="bd bd-title done">
            <div className="bd-eyebrow">Lesson {board.idx + 1} of {board.total} · complete</div>
            <h2>{board.title}</h2>
            <div className="bd-dots">{Array.from({ length: board.total }, (_, i) => <span key={i} className={"dot" + (i <= board.idx ? " on" : "")} />)}</div>
            {board.next && <p>Next: {board.next}</p>}
          </div>
        );
      case "runIntro":
        return (
          <div className="bd bd-title">
            <div className="bd-eyebrow">{board.mode === "review" ? "Review" : `Level ${K().pad2(board.num)} · ${board.mode === "master" ? "Master" : "Prove"}`}</div>
            <h2>{board.count} cards</h2>
            <p>{board.mode === "review" ? "Due cards first, then the ones you find hardest." : "Multiple choice, sorting, matching, kosher or pasul."}</p>
          </div>
        );
      case "cards":
        return (
          <div className={"bd bd-cards n" + Math.min(board.items.length, 4)}>
            {board.items.map((it, i) => (
              <div className={"term-card" + (i === board.focus ? " focus" : i < board.focus ? " seen" : " later")} key={i}>
                {it.img && <img src={it.img} alt="" />}
                <span className="he">{it.he}</span>
                {tl && it.tl && <span className="tl">{it.tl}</span>}
                {it.en && <span className="en">{it.en}</span>}
              </div>
            ))}
          </div>
        );
      case "cast":
        return (
          <div className={"bd bd-cast n" + Math.min(board.items.length, 4)}>
            {board.items.map((it, i) => (
              <figure className={"cast-card" + (i === board.focus ? " focus" : i < board.focus ? " seen" : " later")} key={i}>
                <img src={it.src} alt="" />
                <figcaption>{it.he && <span className="he">{it.he}</span>}{it.name && <span className="name">{it.name}</span>}</figcaption>
              </figure>
            ))}
          </div>
        );
      case "steps":
        return (
          <ol className="bd bd-steps">
            {board.items.map((it, i) => (
              <li key={i} className={i === board.upto ? "focus" : i < board.upto ? "seen" : "later"}>
                <span className="st-num">{i + 1}</span>
                <div className="st-body"><div className="st-title">{it.title}{it.he && <span className="he">{it.he}</span>}</div><p><Inline text={it.text} /></p></div>
              </li>
            ))}
          </ol>
        );
      case "table":
        return (
          <div className="bd bd-table">
            {board.caption && <div className="tbl-caption">{board.caption}</div>}
            <table>
              <thead><tr>{board.cols.map((c, i) => <th key={i}><Inline text={c} /></th>)}</tr></thead>
              <tbody>{board.rows.map((r, i) => <tr key={i}>{r.map((c, j) => j === 0 ? <th scope="row" key={j}><Inline text={c} /></th> : <td key={j}><Inline text={c} /></td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      case "compare":
        return (
          <div className="bd bd-compare">
            {[board.left, board.right].map((side, i) => (
              <div className={"cmp-col " + (i === 0 ? "l" : "r")} key={i}>
                <header>{side.he && <span className="he">{side.he}</span>}<span className="en">{side.title}</span></header>
                <ul>{side.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>
              </div>
            ))}
          </div>
        );
      case "callout":
        return <div className="bd bd-callout">{board.title && <div className="co-title">{board.title}</div>}<p><Inline text={board.text} /></p></div>;
      case "list":
        return <div className="bd bd-list">{board.title && <div className="ls-title">{board.title}</div>}<ul>{board.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ul></div>;
      case "terms":
        return <div className="bd bd-terms">{board.items.map((it, i) => <span className="term-chip" key={i}><span className="he">{it.he}</span>{tl && it.tl && <span className="tl">{it.tl}</span>}{it.en && <span className="en">{it.en}</span>}</span>)}</div>;
      case "figure":
        return <figure className="bd bd-figure"><img src={board.src} alt="" />{board.caption && <figcaption><Inline text={board.caption} /></figcaption>}</figure>;
      case "result":
        return <ResultBoard r={board} />;
      default:
        return null;
    }
  }

  function ResultBoard({ r }) {
    return (
      <div className={"bd bd-result" + (r.passed ? " passed" : "")}>
        <div className="bd-eyebrow">{r.mode === "review" ? "Review" : `Level ${K().pad2(r.num)} · ${r.mode === "master" ? "Master" : "Prove"}`}</div>
        <h2>{r.title}</h2>
        {r.stars > 0 && <Stars n={r.stars} size="lg" />}
        <div className="bd-stats">
          <span><b>{r.correct}/{r.total}</b> correct</span>
          {r.mode !== "review" && <span><b>{r.hearts}</b> hearts left</span>}
          <span><b>{r.streak}</b> best streak</span>
          {r.xp > 0 && <span className="xp">+{r.xp} xp</span>}
        </div>
        {r.note && <div className="bd-note">♪ {r.note}</div>}
        {r.missed.length > 0 && (
          <div className="bd-missed">
            <div className="ls-title">Worth another look</div>
            <ul>{r.missed.slice(0, 4).map((m) => <li key={m.id}><span className="q">{m.prompt.replace(/_{3,}/, "…")}</span><span className="a">{m.answer}</span></li>)}</ul>
          </div>
        )}
        <div className="bd-actions">
          <button type="button" className="btn" onClick={() => r.onAction("map")}>Back to the map</button>
          {!r.passed && <button type="button" className="btn primary gold" onClick={() => r.onAction("retry")}><span>Try again</span><span className="arrow">→</span></button>}
          {r.passed && r.nextLabel && <button type="button" className="btn primary gold" onClick={() => r.onAction("next")}><span>{r.nextLabel}</span><span className="arrow">→</span></button>}
        </div>
      </div>
    );
  }

  /* ─── Fit: one logical stage, scaled uniformly ─────────────────────
     The scene is laid out in a logical box (DESIGN) and scaled to the
     viewport, so the board, the figures and the dialogue keep the same
     proportions at every aspect ratio. Wider screens get more logical
     width (the backdrop bleeds); shorter ones scale everything down
     together instead of clipping. Phones (< 880px) render at 1:1 with
     the narrow layout. */
  const DESIGN = { w: 1366, h: 820, top: 58 };
  function computeFit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const avail = Math.max(300, vh - DESIGN.top);
    let s = 1;
    if (vw >= 880) s = Math.min(vw / DESIGN.w, avail / (DESIGN.h - DESIGN.top));
    s = Math.max(0.55, Math.min(1.7, s));
    const w = Math.round(vw / s), h = Math.round(avail / s);
    return { s, w, h, narrow: w < 1180, tight: w < 880, short: h < 660 };
  }
  function useSceneFit() {
    const [fit, setFit] = useState(computeFit);
    useEffect(() => {
      const onResize = () => setFit(computeFit());
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      return () => { window.removeEventListener("resize", onResize); window.removeEventListener("orientationchange", onResize); };
    }, []);
    return fit;
  }

  /* ─── The runner ──────────────────────────────────────────────────── */
  function SceneRunner({ steps, mode, levelNum, label, onEnd, onExit, hearts0 }) {
    const fit = useSceneFit();
    const [i, setI] = useState(0);
    const [phase, setPhase] = useState("say");   // say | ask | feedback | result
    const [fb, setFb] = useState(null);
    const [hearts, setHearts] = useState(hearts0 == null ? Infinity : hearts0);
    const [correct, setCorrect] = useState(0);
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(0);
    const [source, setSource] = useState(null);
    const [resultBoard, setResultBoard] = useState(null);
    const [pose, setPose] = useState("neutral");
    const missedRef = useRef([]);
    const askedRef = useRef(0);
    const step = steps[i];
    const isRun = mode !== "learn";

    // Enter a step
    useEffect(() => {
      if (!step) return;
      setFb(null); setSource(null);
      setPhase(step.t === "ask" ? "ask" : "say");
      if (step.t === "ask") K().sfx.step();
    }, [i]); // eslint-disable-line

    const finish = useCallback((extra) => {
      onEnd({ asked: askedRef.current, correct, total: askedRef.current, hearts: hearts === Infinity ? 3 : hearts, streak: best, missed: missedRef.current.slice(), ...(extra || {}) });
    }, [onEnd, correct, hearts, best]);

    const advance = useCallback(() => {
      if (phase === "ask" || phase === "result") return;
      if (phase === "feedback" && fb && fb.heartsLeft <= 0) { finish({ outOfHearts: true }); return; }
      if (i + 1 >= steps.length) { finish(); return; }
      // Set the phase in the same render as the index so a "say" step never
      // renders while the phase still says "feedback".
      setPhase(steps[i + 1].t === "ask" ? "ask" : "say");
      setFb(null); setSource(null);
      setI(i + 1);
    }, [phase, fb, i, steps, finish]);
    const back = useCallback(() => {
      if (isRun || phase !== "say" || i === 0) return;
      let j = i - 1;
      while (j > 0 && steps[j].t !== "say") j--;
      if (steps[j].t === "say") setI(j);
    }, [isRun, phase, i, steps]);

    const onAnswer = useCallback((ok, detail) => {
      const item = step.item;
      K().recordAnswer(item.id, ok);
      askedRef.current += 1;
      let h = hearts, s = streak;
      if (ok) { s += 1; setCorrect((c) => c + 1); setStreak(s); if (s > best) setBest(s); (s >= 3 ? K().sfx.streak : K().sfx.correct)(); setPose("happy"); }
      else {
        s = 0; setStreak(0); setPose("neutral"); K().sfx.wrong();
        if (isRun && h !== Infinity) { h -= 1; setHearts(h); }
        missedRef.current.push({ id: item.id, prompt: item.prompt, answer: correctAnswerText(item) });
      }
      const line = ok
        ? `${s >= 3 ? `${s} in a row. ` : pick(RIGHT) + " "}${stripInline(item.explain)}`
        : `${pick(WRONG)} The answer is ${correctAnswerText(item)}. ${stripInline(item.explain)}`;
      setFb({ ok, line, heartsLeft: h, item });
      setPhase("feedback");
    }, [step, hearts, streak, best, isRun]);

    // Keyboard: advance / back
    useEffect(() => {
      const onKey = (e) => {
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
        if (source) return;
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") { if (phase === "say" || phase === "feedback") { e.preventDefault(); advance(); } }
        else if (e.key === "ArrowLeft" && phase === "say") { e.preventDefault(); back(); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [advance, back, phase, source]);

    // Expose a way for the parent to show a result board in-scene.
    useEffect(() => { window.__sceneShowResult = (board) => { setResultBoard(board); setPhase("result"); }; return () => { delete window.__sceneShowResult; }; }, []);

    const board = phase === "result" ? resultBoard : phase === "ask" || phase === "feedback" ? null : (step && step.board) || findBoard(steps, i);
    const pct = steps.length > 1 ? Math.round((i / (steps.length - 1)) * 100) : 100;
    const dialogueText = phase === "say" ? (step ? step.text : "") : phase === "ask" && step && step.item ? askLine(step.item) : phase === "feedback" && fb ? fb.line : (resultBoard && resultBoard.say) || "";
    const canAdvance = phase === "say" || phase === "feedback";
    const src = phase === "feedback" && fb.item.cite ? sourceFor(fb.item.cite) : null;

    return (
      <div className={"scene mode-" + mode + " phase-" + phase + (fit.narrow ? " narrow" : "") + (fit.tight ? " tight" : "") + (fit.short ? " short" : "")} onClick={() => { if (canAdvance) advance(); }}>
        <div className="scene-bg" />
        <div className="scene-top" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="icon-btn exit" onClick={onExit} aria-label="Back to the map" title="Back to the map">×</button>
          <div className="scene-label">{label}</div>
          <div className="scene-progress" aria-hidden="true"><div style={{ width: pct + "%" }} /></div>
          {isRun && hearts !== Infinity && <HeartRow hearts={hearts} />}
          {isRun && hearts === Infinity && <span className="scene-tag">no hearts</span>}
          {streak >= 3 && <span className="scene-streak">🔥 {streak}</span>}
        </div>

        <div className="scene-fit" style={{ width: fit.w + "px", height: fit.h + "px", transform: `scale(${fit.s})` }}>
        <div className="scene-stage">
          <div className="fig fig-kohen"><img src="assets/kohen-gadol-teaching.webp" alt="" /></div>
          <div className={"fig fig-student pose-" + pose}><img src={pose === "happy" ? "assets/success.webp" : "assets/boy-learning.webp"} alt="" /></div>
          <div className={"board-wrap" + (phase === "ask" ? " asking" : "")} onClick={(e) => { if (phase === "ask" || phase === "result") e.stopPropagation(); }}>
            <div className="board" key={phase === "ask" || phase === "feedback" ? "q" + i : "b" + i}>
              {(phase === "ask" || phase === "feedback") && step && step.t === "ask" && (
                <div className={"q-board" + (phase === "feedback" ? " answered" : "")}>
                  <QuestionBoard item={step.item} onAnswer={onAnswer} />
                </div>
              )}
              {phase !== "ask" && phase !== "feedback" && <Board board={board} />}
            </div>
          </div>
        </div>

        <div className={"dialogue" + (phase === "feedback" ? (fb.ok ? " ok" : " bad") : "")} onClick={(e) => { if (!canAdvance) e.stopPropagation(); }}>
          <div className="dlg-name">{phase === "feedback" ? (fb.ok ? "✓ " : "✕ ") : ""}Kohen Gadol</div>
          <div className="dlg-text" key={i + phase}><Inline text={dialogueText} /></div>
          <div className="dlg-foot">
            {src && <button type="button" className="source-link sm" onClick={(e) => { e.stopPropagation(); setSource(src); }}><span className="src-label">Source</span><span className="src-cite">{src.cite}</span><span className="src-arrow">↗</span></button>}
            {phase === "ask" && <span className="dlg-hint">{hintFor(step.item)}</span>}
            {canAdvance && <span className="dlg-next" aria-hidden="true">{phase === "feedback" ? "Continue ▸" : "▸"}</span>}
          </div>
        </div>
        </div>

        {source && <SourceScroll sources={[source]} onClose={() => setSource(null)} />}
      </div>
    );
  }
  function findBoard(steps, i) { for (let j = i; j >= 0; j--) if (steps[j].board) return steps[j].board; return null; }
  function hintFor(item) {
    switch (item.kind) {
      case "mc": case "cloze": case "tap": return `Keys 1–${item.options.length}`;
      case "pic": return `Keys 1–${item.options.length}`;
      case "tf": return "← true · → false";
      case "sort": return `Keys 1–${item.buckets.length} place the highlighted chip`;
      default: return "";
    }
  }

  /* ─── Learn ───────────────────────────────────────────────────────── */
  function LearnScene({ levelNum, lessonIdx, onLessonDone, onExit }) {
    const L = K().level(levelNum);
    const steps = useMemo(() => buildLearnScript(levelNum, lessonIdx), [levelNum, lessonIdx]);
    const label = `Level ${K().pad2(levelNum)} · Lesson ${lessonIdx + 1}/${L.lessons.length} · ${L.lessons[lessonIdx].title}`;
    return <SceneRunner key={levelNum + "-" + lessonIdx} steps={steps} mode="learn" levelNum={levelNum} label={label} onEnd={(r) => onLessonDone(r)} onExit={onExit} />;
  }

  /* ─── Prove / Master / Review ─────────────────────────────────────── */
  function RunScene({ mode, levelNum, items, onAction, onExit }) {
    const steps = useMemo(() => buildRunScript(mode, levelNum, items), [mode, levelNum, items]);
    const L = K().level(levelNum);
    const label = mode === "review" ? "Review · all levels" : `Level ${K().pad2(levelNum)} · ${mode === "master" ? "Master" : "Prove"}`;
    const onEnd = useCallback((r) => {
      const before = K().unlockedInstruments();
      const outcome = mode === "review" ? { passed: true, stars: 0, xp: r.correct * 5 } : K().completeRun(levelNum, mode, r);
      if (mode === "review") K().progress.xp += outcome.xp;
      const after = K().unlockedInstruments();
      let note = null;
      if (after > before) { note = `${INSTRUMENTS[after - 1].en.split("·")[0].trim()} joins the ensemble.`; K().sfx.unlock(); }
      if (outcome.passed && mode !== "review") K().sfx.fanfare();
      const nextL = K().level(levelNum + 1);
      const title = mode === "review" ? "Reviewed." : outcome.passed ? (mode === "master" ? "Mastered." : "Proven.") : r.outOfHearts ? "Out of hearts." : "Not yet.";
      const say = mode === "review"
        ? (r.missed.length ? "The ones you missed come back tomorrow." : "Everything held. Well done.")
        : outcome.passed
          ? (mode === "master" ? `Level ${levelNum} is yours.` : nextL ? `Level ${levelNum + 1}, ${nextL.name}, is open.` : "You've proved the final level.")
          : (r.outOfHearts ? "Three misses. Look at the ones you got wrong, then go again." : `You need ${Math.round((mode === "master" ? K().MASTER_RATIO : K().PASS_RATIO) * 100)} percent. Have a look at the misses and go again.`);
      const nextLabel = mode === "review" ? null : mode === "prove" ? "Master this level" : nextL ? `On to Level ${levelNum + 1}` : null;
      window.__sceneShowResult && window.__sceneShowResult({ type: "result", mode, num: levelNum, title, say, passed: outcome.passed, stars: outcome.stars, xp: outcome.xp, correct: r.correct, total: r.total, hearts: r.hearts, streak: r.streak, missed: r.missed, note, nextLabel, onAction });
    }, [mode, levelNum, onAction]);
    return <SceneRunner steps={steps} mode={mode} levelNum={levelNum} label={label} hearts0={mode === "review" ? null : 3} onEnd={onEnd} onExit={onExit} />;
  }

  Object.assign(window, { SceneRunner, LearnScene, RunScene, buildLearnScript, buildRunScript });
})();
