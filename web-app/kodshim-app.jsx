// App shell: loading → welcome → map → (learn scene | run scene) → map.
(() => {
  const { useState, useEffect, useRef, useCallback } = React;
  const K = () => window.KODSHIM;

  const ALL_IMAGES = [
    "assets/heichal-steps.webp", "assets/kohen-gadol-teaching.webp", "assets/boy-learning.webp", "assets/success.webp",
    "assets/instruments.webp", "assets/calf.webp", "assets/cow-male.webp", "assets/cow-f.webp", "assets/ram.webp",
    "assets/ewe.webp", "assets/lamb.webp", "assets/male-goat.webp", "assets/kid-goat.webp", "assets/female-goat-never-used.webp",
  ];

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
        if (started && enabled && i < unlockedCount) { const p = el.play(); if (p && p.catch) p.catch(() => {}); } else el.pause();
      });
    }, [started, enabled, unlockedCount, volumes]);
    const setEnabled = (v) => { setEnabledState(v); K().setSetting("music", v); };
    const setVolume = (i, v) => setVolumesState((prev) => { const next = prev.map((x, j) => (j === i ? v : x)); K().setSetting("volumes", next); return next; });
    return { enabled, setEnabled, start: () => setStarted(true), unlockedCount, volumes, setVolume, refs };
  }

  function AudioRack({ music }) {
    return <div aria-hidden="true" className="audio-rack">{INSTRUMENTS.map((inst) => <audio key={inst.id} ref={(el) => { music.refs.current[inst.id] = el; }} src={encodeURI(inst.file)} loop preload="auto" />)}</div>;
  }

  function App() {
    const [screen, setScreen] = useState("loading");
    const [loadedCount, setLoadedCount] = useState(0);
    const [levelNum, setLevelNum] = useState(() => K().currentLevel());
    const [lessonIdx, setLessonIdx] = useState(0);
    const [run, setRun] = useState(null);       // { mode, items, key }
    const [musicCardOpen, setMusicCardOpen] = useState(false);
    const [tutor, setTutor] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [mapKey, setMapKey] = useState(0);
    const music = useMusicEngine();

    useEffect(() => {
      let count = 0;
      ALL_IMAGES.forEach((src) => { const img = new Image(); img.onload = img.onerror = () => { count += 1; setLoadedCount(count); if (count >= ALL_IMAGES.length) setScreen("welcome"); }; img.src = src; });
    }, []);

    const goMap = useCallback(() => { setRun(null); setTutor(null); setMapKey((k) => k + 1); setScreen("map"); }, []);

    const startRun = useCallback((mode, num) => {
      let items;
      if (mode === "prove") items = K().pickProve(num, 10);
      else if (mode === "master") items = K().pickMaster(num, 10);
      else items = K().pickReview(10);
      if (!items.length) { goMap(); return; }
      setLevelNum(num); setTutor(null);
      setRun({ mode, items, key: Date.now() });
      setScreen("run");
    }, [goMap]);

    const startStage = useCallback((num, stage) => {
      if (K().settings.seenTutorial !== true) K().setSetting("seenTutorial", true);
      if (stage === "learn") { setLevelNum(num); setLessonIdx(K().nextLesson(num)); setTutor(null); setScreen("learn"); return; }
      startRun(stage, num);
    }, [startRun]);
    const startReview = useCallback(() => startRun("review", K().currentLevel()), [startRun]);

    const onLessonDone = useCallback(() => {
      const L = K().level(levelNum);
      K().completeLesson(levelNum, L.lessons[lessonIdx].id);
      if (lessonIdx + 1 < L.lessons.length) { setLessonIdx(lessonIdx + 1); return; }
      K().completeLearn(levelNum);
      startRun("prove", levelNum);
    }, [levelNum, lessonIdx, startRun]);

    const onRunAction = useCallback((action) => {
      if (action === "map") { goMap(); return; }
      if (action === "retry") { startRun(run.mode, levelNum); return; }
      if (action === "next") {
        if (run.mode === "prove") startRun("master", levelNum);
        else if (run.mode === "master" && K().level(levelNum + 1)) startStage(levelNum + 1, "learn");
        else goMap();
      }
    }, [run, levelNum, goMap, startRun, startStage]);

    const openTutor = useCallback((item) => setTutor({ seed: item ? { item } : null }), []);
    const firstVisit = !K().settings.seenTutorial;

    return (
      <div className="app" data-screen-label={"Kodshim · " + screen}>
        <div className="stage">
          {screen === "loading" && <LoadingScene loaded={loadedCount} total={ALL_IMAGES.length} />}
          {screen === "welcome" && <WelcomeScene levels={[]} onContinue={() => { music.start(); K().setSetting("seenWelcome", true); goMap(); }} onOpenMusic={() => setMusicCardOpen(true)} />}
          {screen === "map" && <MapScene key={mapKey} music={music} firstVisit={firstVisit} onStart={startStage} onReview={startReview} onOpenMusic={() => setMusicCardOpen(true)} onReset={() => { K().resetProgress(); setMapKey((k) => k + 1); }} />}
          {screen === "learn" && <LearnScene levelNum={levelNum} lessonIdx={lessonIdx} onLessonDone={onLessonDone} onExit={goMap} onAsk={openTutor} />}
          {screen === "run" && run && <RunScene key={run.key} mode={run.mode} levelNum={levelNum} items={run.items} onAction={onRunAction} onExit={goMap} onAsk={openTutor} />}
        </div>
        {musicCardOpen && <MusicCard music={music} onClose={() => setMusicCardOpen(false)} />}
        {settingsOpen && <SettingsCard onClose={() => setSettingsOpen(false)} music={music} onOpenMusic={() => setMusicCardOpen(true)} onReset={() => { K().resetProgress(); setSettingsOpen(false); goMap(); }} />}
        {tutor && <TutorDrawer levelNum={levelNum} seed={tutor.seed} onClose={() => setTutor(null)} onOpenSettings={() => setSettingsOpen(true)} />}
        <AudioRack music={music} />
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
