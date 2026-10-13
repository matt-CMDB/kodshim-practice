// App shell: screens, music engine, run bookkeeping, tutor drawer.
//   loading → welcome → map → (learn | run-intro → run → run-result) → map
(() => {
  const { useState, useEffect, useMemo, useRef, useCallback } = React;
  const K = () => window.KODSHIM;

  const ALL_IMAGES = [
    "assets/heichal-steps.webp", "assets/kohen-gadol-teaching.webp", "assets/boy-learning.webp",
    "assets/instruments.webp", "assets/test.webp", "assets/success.webp", "assets/teach-and-learn.webp",
    "assets/calf.webp", "assets/cow-male.webp", "assets/cow-f.webp", "assets/ram.webp", "assets/ewe.webp",
    "assets/lamb.webp", "assets/male-goat.webp", "assets/kid-goat.webp",
  ];

  /* ─── Music engine ─────────────────────────────────────────────────── */
  function useMusicEngine() {
    const s = K().settings;
    const [enabled, setEnabledState] = useState(s.music !== false);
    const [started, setStarted] = useState(false);
    const [volumes, setVolumesState] = useState(() => (Array.isArray(s.volumes) && s.volumes.length === INSTRUMENTS.length ? s.volumes : INSTRUMENTS.map(() => 0.7)));
    const [unlockedCount, setUnlockedCount] = useState(() => K().unlockedInstruments());
    const refs = useRef({});

    useEffect(() => K().subscribe(() => setUnlockedCount(K().unlockedInstruments())), []);
    useEffect(() => {
      INSTRUMENTS.forEach((inst, i) => {
        const el = refs.current[inst.id];
        if (!el) return;
        el.volume = volumes[i];
        const shouldPlay = started && enabled && i < unlockedCount;
        if (shouldPlay) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
        else el.pause();
      });
    }, [started, enabled, unlockedCount, volumes]);

    const setEnabled = (v) => { setEnabledState(v); K().setSetting("music", v); };
    const setVolume = (i, v) => setVolumesState((prev) => { const next = prev.map((x, j) => (j === i ? v : x)); K().setSetting("volumes", next); return next; });
    return { enabled, setEnabled, start: () => setStarted(true), unlockedCount, volumes, setVolume, refs };
  }

  function AudioRack({ music }) {
    return (
      <div aria-hidden="true" className="audio-rack">
        {INSTRUMENTS.map((inst) => (
          <audio key={inst.id} ref={(el) => { music.refs.current[inst.id] = el; }} src={encodeURI(inst.file)} loop preload="auto" />
        ))}
      </div>
    );
  }

  /* ─── Run intro ────────────────────────────────────────────────────── */
  const RUN_COPY = {
    prove: { eyebrow: "Prove your knowledge", h: "Time to test what you've learned.", p: "Twelve cards drawn from this level — multiple choice, sorting, matching, kosher-or-pasul.", rules: [["Three hearts.", "Each wrong answer costs one."], ["Seventy percent", "correct earns the step and opens the next level."], ["Every card", "goes into your review deck afterward."]], art: "assets/test.webp", cta: "Begin" },
    master: { eyebrow: "Master the level", h: "A harder run. Earlier levels mix in.", p: "Twelve cards, weighted toward the ones you've missed, with a few from the levels below.", rules: [["Three hearts.", "Same as Prove."], ["Eighty-five percent", "to pass — this is the third step and an instrument."], ["Earlier material", "appears without warning."]], art: "assets/teach-and-learn.webp", cta: "Begin" },
    review: { eyebrow: "Review", h: "Keep what you've learned.", p: "Cards that are due, then the ones you find hardest, from every level you've opened.", rules: [["No hearts.", "Nothing to lose but the forgetting."], ["Right answers", "push a card further into the future."], ["Wrong answers", "bring it back tomorrow."]], art: "assets/teach-and-learn.webp", cta: "Start review" },
  };
  function RunIntro({ mode, levelNum, count, onBegin, onBack, onSwitchStage, onAsk }) {
    const c = RUN_COPY[mode];
    const nothingToReview = mode === "review" && K().pickReview(12).length === 0;
    useEffect(() => {
      const onKey = (e) => { if (e.key === "Enter" && !nothingToReview) { e.preventDefault(); onBegin(); } };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [onBegin, nothingToReview]);
    return (
      <div className="quiz run-intro">
        <TopBar levelNum={levelNum} stage={mode === "review" ? "review" : "prove"} onStageChange={onSwitchStage} onExit={onBack} onAsk={onAsk} />
        <div className="quiz-intro">
          <div className="quiz-intro-art"><img src={c.art} alt="" /></div>
          <div className="quiz-intro-text">
            <div className="quiz-intro-eyebrow">{mode === "review" ? "All levels" : `Level ${K().pad2(levelNum)}`} · {c.eyebrow}</div>
            <h1 className="quiz-intro-h">{c.h}</h1>
            <p className="quiz-intro-p">{c.p}{mode === "review" && count ? ` ${count} card${count === 1 ? "" : "s"} this session.` : ""}</p>
            <ul className="quiz-intro-rules">{c.rules.map(([b, t], i) => <li key={i}><b>{b}</b> {t}</li>)}</ul>
            {nothingToReview && <p className="quiz-intro-p"><b>Nothing to review yet.</b> Walk through a level's lessons first — its cards join the deck as you answer them.</p>}
            <div className="quiz-intro-actions">
              <button type="button" className="btn" onClick={onBack}>Back to the steps</button>
              <button type="button" className="btn primary gold" onClick={onBegin} disabled={nothingToReview}><span>{c.cta}</span><span className="arrow">→</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Run result ───────────────────────────────────────────────────── */
  function RunResult({ mode, levelNum, result, outcome, missed, onMap, onRetry, onNext, onSwitchStage, onAsk, unlockedNote }) {
    const passed = mode === "review" ? true : outcome.passed;
    useEffect(() => {
      if (passed) K().sfx.fanfare();
      const onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); (passed ? onNext : onRetry)(); } };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [passed, onNext, onRetry]);
    const pct = Math.round((result.correct / result.total) * 100);
    const title = mode === "review" ? "Reviewed." : passed ? (mode === "master" ? "Mastered." : "Proven.") : (result.outOfHearts ? "Out of hearts." : "Not yet.");
    const L = K().level(levelNum);
    const nextL = K().level(levelNum + 1);
    const sub = mode === "review"
      ? `${result.correct} of ${result.total} remembered. ${missed.length ? "The ones you missed come back tomorrow." : "Everything held."}`
      : passed
        ? (mode === "master" ? `Level ${levelNum} is yours. ${unlockedNote || ""}` : (nextL ? `Level ${levelNum + 1} — ${nextL.name} — is open.` : "You've proved the final level."))
        : (result.outOfHearts ? "Three misses. Have a look at the ones you got wrong, then try again." : `You need ${Math.round((mode === "master" ? K().MASTER_RATIO : K().PASS_RATIO) * 100)}% to pass. Have a look at the misses and go again.`);
    return (
      <div className="quiz">
        {passed && mode !== "review" && <Confetti />}
        <TopBar levelNum={levelNum} stage={mode === "review" ? "review" : "prove"} onStageChange={onSwitchStage} onExit={onMap} onAsk={onAsk} />
        <div className={passed ? "success-body" : "result"}>
          <div className={passed ? "" : "result-card"}>
            {passed && mode !== "review" && <img src="assets/success.webp" className="success-img" alt="" />}
            <div className="quiz-intro-eyebrow">{mode === "review" ? "Review" : `Level ${K().pad2(levelNum)} · ${mode === "master" ? "Master" : "Prove"}`}</div>
            <h1 className={passed ? "success-h" : "result-h"}>{title}</h1>
            {mode !== "review" && outcome.stars > 0 && <div className="result-stars"><Stars n={outcome.stars} size="lg" /></div>}
            {outcome.xp > 0 && <div className="result-xp">+{outcome.xp} xp</div>}
            <p className="result-p">{sub}</p>
            {unlockedNote && mode === "master" && <div className="result-note"><span>♪</span><span>{unlockedNote}</span></div>}
            <div className="result-stats">
              <div className="result-stat"><span className="v">{result.correct}/{result.total}</span><span className="l">Correct</span></div>
              <div className="result-stat"><span className="v">{pct}%</span><span className="l">Score</span></div>
              {mode !== "review" && <div className="result-stat"><span className="v">{result.hearts}</span><span className="l">Hearts left</span></div>}
              <div className="result-stat"><span className="v">{result.streak}</span><span className="l">Best streak</span></div>
            </div>
            {missed.length > 0 && (
              <div className="result-missed">
                <div className="result-missed-title">Worth another look</div>
                <ul>{missed.map((m) => <li key={m.id}><span className="q">{m.prompt.replace(/_{3,}/, "…")}</span><span className="a">{m.answerText}</span></li>)}</ul>
              </div>
            )}
            <div className="result-actions">
              <button type="button" className="btn" onClick={onMap}>Back to the steps</button>
              {!passed && <button type="button" className="btn primary gold" onClick={onRetry}><span>Try again</span><span className="arrow">→</span></button>}
              {passed && <button type="button" className="btn primary gold" onClick={onNext}><span>{mode === "review" ? "Back to the steps" : mode === "prove" ? "Master this level" : (nextL ? `On to Level ${levelNum + 1}` : "Back to the steps")}</span><span className="arrow">→</span></button>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function answerTextOf(item) {
    switch (item.kind) {
      case "mc": case "tap": case "cloze": return item.options[item.answer];
      case "tf": return item.answer ? "True / kosher" : "False / pasul";
      case "match": return "see the pairs in Learn";
      case "sort": return "see the buckets in Learn";
      default: return "";
    }
  }

  /* ─── App ──────────────────────────────────────────────────────────── */
  function App() {
    const [screen, setScreen] = useState("loading");
    const [loadedCount, setLoadedCount] = useState(0);
    const [levelNum, setLevelNum] = useState(() => K().currentLevel());
    const [run, setRun] = useState(null);          // { mode, items, key }
    const [result, setResult] = useState(null);    // { result, outcome, missed, unlockedNote }
    const [musicCardOpen, setMusicCardOpen] = useState(false);
    const [tutor, setTutor] = useState(null);      // { seed }
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [mapKey, setMapKey] = useState(0);
    const music = useMusicEngine();
    const missedRef = useRef([]);

    useEffect(() => {
      let count = 0;
      ALL_IMAGES.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => { count += 1; setLoadedCount(count); if (count >= ALL_IMAGES.length) setScreen("welcome"); };
        img.src = src;
      });
    }, []);

    const goMap = useCallback(() => { setRun(null); setResult(null); setTutor(null); setMapKey((k) => k + 1); setScreen("map"); }, []);
    const startStage = useCallback((num, stage) => {
      setLevelNum(num);
      setTutor(null);
      if (stage === "learn") { setScreen("learn"); return; }
      setRun({ mode: stage, items: null, key: Date.now() });
      setScreen("run-intro");
    }, []);
    const startReview = useCallback(() => {
      const num = K().currentLevel();
      setLevelNum(num);
      setTutor(null);
      setRun({ mode: "review", items: null, key: Date.now() });
      setScreen("run-intro");
    }, []);
    const beginRun = useCallback(() => {
      const r = run;
      let items;
      if (r.mode === "prove") items = K().pickProve(levelNum, 12);
      else if (r.mode === "master") items = K().pickMaster(levelNum, 12);
      else items = K().pickReview(12);
      if (!items.length) { goMap(); return; }
      missedRef.current = [];
      setRun({ ...r, items, key: Date.now() });
      setScreen("run");
    }, [run, levelNum, goMap]);
    const finishRun = useCallback((res) => {
      const before = K().unlockedInstruments();
      const outcome = run.mode === "review" ? { passed: true, stars: 0, xp: res.correct * 5 } : K().completeRun(levelNum, run.mode, res);
      if (run.mode === "review") { K().progress.xp += outcome.xp; }
      const after = K().unlockedInstruments();
      let unlockedNote = null;
      if (after > before) { unlockedNote = `The ${INSTRUMENTS[after - 1].en.split("·")[0].trim()} joins the ensemble.`; K().sfx.unlock(); }
      else if (run.mode === "master" && outcome.passed && K().stepsClimbed() >= K().totalSteps()) unlockedNote = "You stand at the gate of the Ezras Yisrael.";
      setResult({ result: res, outcome, missed: missedRef.current.slice(), unlockedNote });
      setScreen("run-result");
    }, [run, levelNum]);

    // Track misses for the result screen (the run records Leitner itself).
    const onRunAnswer = useCallback((item, ok) => { if (!ok) missedRef.current.push({ id: item.id, prompt: item.prompt, answerText: answerTextOf(item) }); }, []);

    const switchStage = useCallback((stage) => {
      if (stage === "learn") setScreen("learn");
      else if (stage === "prove" || stage === "master") startStage(levelNum, stage);
      else if (stage === "review") startReview();
    }, [levelNum, startStage, startReview]);

    const openTutor = useCallback((item, ok) => { setTutor({ seed: item ? { item, ok } : null }); }, []);
    const askBtn = useCallback(() => openTutor(null, null), [openTutor]);

    const learnDone = useCallback(() => { K().completeLearn(levelNum); startStage(levelNum, "prove"); }, [levelNum, startStage]);

    const firstVisit = !K().settings.seenTutorial;
    const L = K().level(levelNum);

    return (
      <div className="app" data-screen-label={"Kodshim · " + screen}>
        <div className="stage">
          {screen === "loading" && <LoadingScene loaded={loadedCount} total={ALL_IMAGES.length} />}
          {screen === "welcome" && (
            <WelcomeScene levels={[]} onContinue={() => { music.start(); K().setSetting("seenWelcome", true); goMap(); }} onOpenMusic={() => setMusicCardOpen(true)} />
          )}
          {screen === "map" && (
            <MapScene key={mapKey} music={music} firstVisit={firstVisit} onStart={(n, stage) => { if (firstVisit) K().setSetting("seenTutorial", true); startStage(n, stage); }}
              onReview={startReview} onOpenMusic={() => setMusicCardOpen(true)} onReset={() => { K().resetProgress(); setMapKey((k) => k + 1); }} />
          )}
          {screen === "learn" && (L.lessons
            ? <LessonScreen key={levelNum} levelNum={levelNum} onDone={learnDone} onBack={goMap} onSwitchStage={switchStage} onAsk={askBtn} />
            : <LearnScreen key={levelNum} levelNum={levelNum} onDone={learnDone} onBack={goMap} onSwitchStage={switchStage} onAsk={askBtn} />)}
          {screen === "run-intro" && run && (
            <RunIntro mode={run.mode} levelNum={levelNum} count={run.mode === "review" ? Math.min(12, K().dueCards().length) || null : null} onBegin={beginRun} onBack={goMap} onSwitchStage={switchStage} onAsk={askBtn} />
          )}
          {screen === "run" && run && run.items && (
            <QuizRun key={run.key} mode={run.mode} levelNum={levelNum} items={run.items.map((it) => Object.assign({}, it, { _track: true }))}
              onFinish={finishRun} onExit={goMap} onSwitchStage={switchStage} onAsk={openTutor} onAnswer={onRunAnswer} />
          )}
          {screen === "run-result" && run && result && (
            <RunResult mode={run.mode} levelNum={levelNum} result={result.result} outcome={result.outcome} missed={result.missed} unlockedNote={result.unlockedNote}
              onMap={goMap} onRetry={() => { setRun({ ...run, items: null }); setScreen("run-intro"); }}
              onNext={() => { if (run.mode === "prove") startStage(levelNum, "master"); else if (run.mode === "master" && K().level(levelNum + 1)) startStage(levelNum + 1, "learn"); else goMap(); }}
              onSwitchStage={switchStage} onAsk={askBtn} />
          )}
        </div>
        {musicCardOpen && <MusicCard music={music} onClose={() => setMusicCardOpen(false)} />}
        {settingsOpen && <SettingsCard onClose={() => setSettingsOpen(false)} music={music} onOpenMusic={() => setMusicCardOpen(true)} onReset={() => { K().resetProgress(); setSettingsOpen(false); goMap(); }} />}
        {tutor && <TutorDrawer levelNum={levelNum} seed={tutor.seed} onClose={() => setTutor(null)} onOpenSettings={() => setSettingsOpen(true)} />}
        <AudioRack music={music} />
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
})();
