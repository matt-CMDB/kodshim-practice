// Same flow as the original, but the Learn + Quiz screens
// route to the redesigned components.

const { useState, useEffect, useMemo, useRef } = React;

const ALL_IMAGES = [
  "assets/heichal-steps.png",
  "assets/kohen-gadol-teaching.png",
  "assets/boy-learning.png",
  "assets/instruments.png",
  "assets/test.png",
  "assets/success.png",
  "assets/teach-and-learn.png",
  "assets/calf.png",
  "assets/cow-male.png",
  "assets/cow-f.png",
  "assets/ram.png",
  "assets/ewe.png",
  "assets/lamb.png",
  "assets/male-goat.png",
  "assets/kid-goat.png",
];

/* ─── Music engine ─────────────────────────────────────────────────── */
function unlockedCountForLevel(level) {
  if (level >= 12) return 5;
  if (level >= 9)  return 4;
  if (level >= 6)  return 3;
  if (level >= 3)  return 2;
  return 1;
}

function useMusicEngine(currentLevel) {
  const [enabled, setEnabled] = useState(true);
  const [started, setStarted] = useState(false);
  const [volumes, setVolumes] = useState(() => INSTRUMENTS.map(() => 0.7));
  const refs = useRef({});
  const unlockedCount = unlockedCountForLevel(currentLevel);

  useEffect(() => {
    INSTRUMENTS.forEach((inst, i) => {
      const el = refs.current[inst.id];
      if (!el) return;
      el.volume = volumes[i];
      const shouldPlay = started && enabled && i < unlockedCount;
      if (shouldPlay) {
        const p = el.play();
        if (p && p.catch) p.catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [started, enabled, unlockedCount, volumes]);

  const setVolume = (i, v) =>
    setVolumes(prev => prev.map((x, j) => (j === i ? v : x)));

  return {
    enabled,
    setEnabled,
    start: () => setStarted(true),
    unlockedCount,
    volumes,
    setVolume,
    refs
  };
}

function pickQuiz(questions, n) {
  const arr = questions.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(n, arr.length));
}

function App() {
  const [screen, setScreen] = useState("loading");
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let count = 0;
    ALL_IMAGES.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        count += 1;
        setLoadedCount(count);
        if (count >= ALL_IMAGES.length) setScreen("welcome");
      };
      img.src = src;
    });
  }, []);
  const [tutorialDismissed, setTutorialDismissed] = useState(false);
  const [musicCardOpen, setMusicCardOpen] = useState(false);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [correct, setCorrect] = useState(0);
  const [status, setStatus] = useState(null);
  const [qKey, setQKey] = useState(0);

  const data = window.KODSHIM_DATA;
  const [quizItems, setQuizItems] = useState(() => pickQuiz(data.quiz, 10));
  const totalQ = quizItems.length;

  const currentLevel = useMemo(() => {
    const open = data.levels.filter(l => l.state !== "locked");
    return open.length ? Math.max(...open.map(l => l.num)) : 1;
  }, [data.levels]);
  const music = useMusicEngine(currentLevel);

  const resetQuiz = () => {
    setQuizItems(pickQuiz(data.quiz, 10));
    setQuizIdx(0); setHearts(3); setCorrect(0);
    setStatus(null); setQKey(k => k + 1);
  };

  const goTutorial  = () => setScreen("tutorial");
  const goLearn     = () => { resetQuiz(); setScreen("learn"); };
  const goQuizIntro = () => { resetQuiz(); setScreen("quiz-intro"); };
  const goQuiz      = () => { resetQuiz(); setScreen("quiz"); };
  const goReview    = () => setScreen("review");

  // Stage selector used by the three-brick topbar control.
  // The user can flip freely between Learn and Review; choosing Prove
  // sends them to the quiz intro splash so the quiz starts fresh.
  const switchStage = (stage) => {
    if (stage === "learn")  setScreen("learn");
    else if (stage === "prove")  setScreen("quiz-intro");
    else if (stage === "review") setScreen("review");
  };

  const handleResolve = (ok) => {
    setStatus({
      ok,
      msg: ok
        ? randomFrom(["Correct.", "Right.", "Yes.", "Spot on."])
        : randomFrom(["Not quite.", "Almost.", "Off by one.", "Try the next."])
    });
    if (ok) setCorrect(c => c + 1);
    let newHearts = hearts;
    if (!ok) { newHearts = hearts - 1; setHearts(newHearts); }

    setTimeout(() => {
      setStatus(null);
      if (newHearts <= 0) { setScreen("result"); return; }
      if (quizIdx + 1 >= totalQ) {
        setScreen("success");
        return;
      }
      setQuizIdx(quizIdx + 1);
      setQKey(k => k + 1);
    }, 1200);
  };

  const isIntro = screen === "welcome" || screen === "tutorial";

  return (
    <div className="app" data-screen-label={"Kodshim · " + screen}>
      <div className="stage">
        {screen === "loading" && (
          <LoadingScene loaded={loadedCount} total={ALL_IMAGES.length} />
        )}
        {screen === "welcome" && (
          <WelcomeScene
            levels={data.levels}
            onContinue={() => { music.start(); setScreen("tutorial"); }}
            onOpenMusic={() => setMusicCardOpen(true)}
          />
        )}
        {screen === "tutorial" && (
          <TutorialScene
            levels={data.levels}
            showCard={!tutorialDismissed}
            onDismissCard={() => setTutorialDismissed(true)}
            onShowCard={() => setTutorialDismissed(false)}
            onSelectStep={() => { setTutorialDismissed(true); goLearn(); }}
            music={music}
            onOpenMusic={() => setMusicCardOpen(true)}
          />
        )}
        {screen === "learn" && (
          <LearnScreen onDone={goQuizIntro} onBack={goTutorial} onSwitchStage={switchStage} />
        )}
        {screen === "quiz-intro" && (
          <QuizIntroScreen onBegin={goQuiz} onBack={goTutorial} onSwitchStage={switchStage} />
        )}
        {screen === "quiz" && (
          <QuizScreen
            key={qKey}
            item={quizItems[quizIdx]}
            qIdx={quizIdx}
            qTotal={totalQ}
            hearts={hearts}
            status={status}
            onResolve={handleResolve}
            onBack={goTutorial}
            onSwitchStage={switchStage}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            passed={hearts > 0 && correct >= Math.ceil(totalQ * 0.7)}
            hearts={hearts}
            total={totalQ}
            correct={correct}
            onMap={goTutorial}
            onRetry={goQuiz}
            onSwitchStage={switchStage}
          />
        )}
        {screen === "success" && (
          <SuccessScreen
            hearts={hearts}
            correct={correct}
            total={totalQ}
            onMap={goTutorial}
            onRetry={goQuiz}
            onSwitchStage={switchStage}
          />
        )}
        {screen === "review" && (
          <ReviewScreen onSwitchStage={switchStage} onBack={goTutorial} />
        )}
      </div>
      {musicCardOpen && (
        <MusicCard music={music} onClose={() => setMusicCardOpen(false)} />
      )}
      <AudioRack music={music} />
    </div>
  );
}

function AudioRack({ music }) {
  return (
    <div aria-hidden="true" className="audio-rack">
      {INSTRUMENTS.map(inst => (
        <audio
          key={inst.id}
          ref={el => { music.refs.current[inst.id] = el; }}
          src={encodeURI(inst.file)}
          loop
          preload="auto"
        />
      ))}
    </div>
  );
}

/* ─── Quiz wrapper ─────────────────────────────────────────────────── */
function QuizScreen({ item, qIdx, qTotal, hearts, status, onResolve, onBack, onSwitchStage }) {
  const pct = ((qIdx + 1) / qTotal) * 100;
  return (
    <div className="quiz">
      <TopBar stage="prove" onStageChange={onSwitchStage} onExit={onBack} />
      <div className="quiz-top">
        <div className="quiz-hearts" aria-label="Hearts remaining">
          {[0, 1, 2].map(i => (
            <span key={i} className={"quiz-heart" + (i >= hearts ? " lost" : "")} />
          ))}
        </div>
        <div className="quiz-progress">
          <div className="quiz-bar"><div className="quiz-bar-fill" style={{ width: pct + "%" }} /></div>
          <span className="quiz-count">
            <b>{String(qIdx + 1).padStart(2, "0")}</b> / {String(qTotal).padStart(2, "0")}
          </span>
        </div>
        <div style={{ width: 1 }} />
      </div>

      <div className="quiz-body">
        {item.kind === "mc"    && <MCQuestion item={item} onResolve={onResolve} />}
        {item.kind === "tap"   && <MCQuestion item={item} onResolve={onResolve} tap />}
        {item.kind === "match" && <MatchQuestion item={item} onResolve={onResolve} />}
        {item.kind === "sort"  && <SortQuestion item={item} onResolve={onResolve} />}
      </div>

      <div className="quiz-foot">
        <span className="quiz-hint">
          {item.kind === "sort" ? "Place every chip, then press Check." : "One wrong answer costs a heart."}
        </span>
        {status && (
          <div className={"quiz-status " + (status.ok ? "ok" : "bad")}>
            <span className="dot">{status.ok ? "✓" : "✕"}</span>
            <span>{status.msg}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* mount */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
