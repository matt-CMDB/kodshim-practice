// The map: five medallions along the courtyard and up the steps to the
// Heichal. Your trainee stands by the current one. One line from the kohen.
// A single menu button holds review, instructions, music, settings, about.
(() => {
  const { useState, useEffect, useMemo } = React;
  const K = () => window.KODSHIM;

  // Positions in percent of the backdrop image (2000×1439): a path from the
  // courtyard floor up the steps to the door.
  const NODES = [
    { x: 27, y: 85 }, { x: 40, y: 73 }, { x: 49.5, y: 61 }, { x: 56.5, y: 50.5 }, { x: 62.5, y: 40.5 },
  ];
  const SHORT = ["Animals", "Categories", "Who brings what", "Olah · chatat · asham", "Communal & kalim"];

  function Ring({ stages, size = 76 }) {
    const r = size / 2 - 4, c = size / 2, gap = 10;
    const arc = (i) => {
      const a0 = -90 + i * 120 + gap / 2, a1 = -90 + (i + 1) * 120 - gap / 2;
      const p = (a) => [c + r * Math.cos((a * Math.PI) / 180), c + r * Math.sin((a * Math.PI) / 180)];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
    };
    return (
      <svg className="jm-ring" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {[0, 1, 2].map((i) => <path key={i} d={arc(i)} className={stages[i] ? "on" : ""} />)}
      </svg>
    );
  }

  function Medallion({ lv, idx, current, onPick }) {
    const node = NODES[idx];
    const done = lv.stages.every(Boolean);
    const cls = ["jm-node", lv.unlocked ? "open" : "locked", current ? "current" : "", done ? "done" : ""].join(" ");
    const stars = lv.state.prove.stars + lv.state.master.stars;
    return (
      <button type="button" className={cls} style={{ left: node.x + "%", top: node.y + "%" }} onClick={() => onPick(lv)} aria-label={`Level ${lv.num}: ${lv.name}`} title={`Level ${lv.num} · ${lv.name}`}>
        <Ring stages={lv.stages} />
        <span className="jm-num">{lv.unlocked ? lv.num : "🔒"}</span>
        <span className="jm-label"><b>Level {lv.num}</b><span>{SHORT[idx] || lv.name}</span></span>
        {lv.unlocked && stars > 0 && <span className="jm-stars">{"★".repeat(Math.min(6, stars))}</span>}
      </button>
    );
  }

  function hintFor(summary) {
    const cur = summary.levels.find((L) => L.unlocked && !L.stages[1]) || summary.levels.find((L) => L.unlocked && !L.stages[2]);
    if (summary.steps === 0) return "Welcome, trainee. Start with Level 1: the five species and their names.";
    if (summary.steps >= summary.total) return "Every level mastered. Keep your cards sharp in Review.";
    if (cur && !cur.stages[0]) return `Level ${cur.num} is open. Walk through the lessons with me first.`;
    if (cur && !cur.stages[1]) return `You've learned Level ${cur.num}. Prove it when you're ready.`;
    if (summary.due > 0) return `${summary.due} card${summary.due === 1 ? "" : "s"} due for review. Old material slips away quietly.`;
    if (cur) return `Master Level ${cur.num} to climb its last step and add an instrument.`;
    return "Pick any level.";
  }

  /* ─── Level sheet ─────────────────────────────────────────────────── */
  function LevelSheet({ lv, onClose, onStart }) {
    const L = K().level(lv.num);
    const st = lv.state;
    const lessons = L.lessons || [];
    const doneLessons = lessons.filter((ls) => K().lessonDone(lv.num, ls.id)).length;
    const nextLesson = K().nextLesson(lv.num);
    const stage = !lv.stages[0] ? "learn" : !lv.stages[1] ? "prove" : !lv.stages[2] ? "master" : "prove";
    const primary = { learn: doneLessons ? `Continue with lesson ${nextLesson + 1}` : "Start learning", prove: "Prove it", master: "Master it" }[stage];
    useEffect(() => {
      const onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); onStart(lv.num, stage); } };
      window.addEventListener("keydown", onKey, true);
      return () => window.removeEventListener("keydown", onKey, true);
    }, [lv.num, stage, onStart]);
    return (
      <div className="sheet-back" onClick={onClose} role="presentation">
        <div className="sheet level-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Level ${lv.num}`}>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
          <div className="eyebrow gold">Level {K().pad2(lv.num)}</div>
          <h2><span className="he">{L.he}</span><span className="en">{L.name}</span></h2>
          <p className="sheet-tag">{L.tagline}</p>
          <div className="sheet-stages">
            <button type="button" className={"stage-chip" + (lv.stages[0] ? " done" : "") + (stage === "learn" ? " next" : "")} onClick={() => onStart(lv.num, "learn")}>
              <span className="sc-name">Learn</span>
              <span className="sc-sub">{doneLessons}/{lessons.length} lessons</span>
              <span className="sc-dots">{lessons.map((ls) => <i key={ls.id} className={K().lessonDone(lv.num, ls.id) ? "on" : ""} />)}</span>
            </button>
            <button type="button" className={"stage-chip" + (lv.stages[1] ? " done" : "") + (stage === "prove" ? " next" : "")} onClick={() => onStart(lv.num, "prove")}>
              <span className="sc-name">Prove</span>
              <span className="sc-sub">{st.prove.attempts ? `best ${st.prove.best}%` : "10 cards · 3 hearts"}</span>
              {st.prove.stars > 0 && <Stars n={st.prove.stars} size="sm" />}
            </button>
            <button type="button" className={"stage-chip" + (lv.stages[2] ? " done" : "") + (stage === "master" ? " next" : "") + (lv.stages[1] ? "" : " off")} disabled={!lv.stages[1]} onClick={() => onStart(lv.num, "master")}>
              <span className="sc-name">Master</span>
              <span className="sc-sub">{!lv.stages[1] ? "prove first" : st.master.attempts ? `best ${st.master.best}%` : "harder · mixed"}</span>
              {st.master.stars > 0 && <Stars n={st.master.stars} size="sm" />}
            </button>
          </div>
          <div className="sheet-actions">
            <button type="button" className="btn primary gold lg" onClick={() => onStart(lv.num, stage)}><span>{primary}</span><span className="arrow">→</span></button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Menu sheet ──────────────────────────────────────────────────── */
  function MenuSheet({ summary, music, onClose, onReview, onInstructions, onMusic, onSettings, onAbout }) {
    const items = [
      ["↻", "Review", summary.due > 0 ? `${summary.due} due` : "practice deck", onReview],
      ["?", "How it works", "", onInstructions],
      ["♪", "Music", music.enabled ? `${music.unlockedCount} of 5 playing` : "off", onMusic],
      ["⚙", "Settings", "", onSettings],
      ["i", "About", "", onAbout],
    ];
    return (
      <div className="sheet-back" onClick={onClose} role="presentation">
        <div className="sheet menu-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Menu">
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button>
          <div className="menu-summary">
            <span><b>{summary.steps}</b>/{summary.total} steps</span>
            <span><b>{summary.stars}</b>/{summary.maxStars} stars</span>
            <span><b>{summary.xp}</b> xp</span>
          </div>
          <ul className="menu-list">
            {items.map(([ico, name, sub, fn]) => (
              <li key={name}><button type="button" onClick={() => { onClose(); fn(); }}><span className="mi-ico">{ico}</span><span className="mi-name">{name}</span><span className="mi-sub">{sub}</span></button></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* ─── Settings / About / Instructions ─────────────────────────────── */
  function SettingsCard({ onClose, music, onOpenMusic, onReset }) {
    const s = K().settings;
    const [, bump] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const set = (k, v) => { K().setSetting(k, v); bump((x) => x + 1); };
    const Toggle = ({ on, onClick }) => <button type="button" className={"music-toggle" + (on ? " on" : "")} onClick={onClick} aria-pressed={on}><span className="dot" /> {on ? "On" : "Off"}</button>;
    return (
      <Modal onClose={onClose} className="settings-modal" label="Settings">
        <div className="eyebrow gold">Settings</div>
        <h2 className="modal-h sm">Make it yours.</h2>
        <div className="set-group">
          <div className="set-row"><div className="set-label"><b>Music</b><span>The Levi'im ensemble, one instrument per level mastered.</span></div><Toggle on={music.enabled} onClick={() => { music.start(); music.setEnabled(!music.enabled); }} /></div>
          <div className="set-row"><div className="set-label"><b>Score</b><span>The recorded Epitaph of Seikilos, or an original piece, "Ma'alot", played by the game's own synthesizer.</span></div>
            <span className="seg">
              <button type="button" className={"seg-btn" + (music.source === "recorded" ? " on" : "")} onClick={() => { music.start(); music.setSource("recorded"); }}>Seikilos</button>
              <button type="button" className={"seg-btn" + (music.source === "synth" ? " on" : "")} onClick={() => { music.start(); music.setSource("synth"); }}>Ma'alot</button>
            </span></div>
          <div className="set-row"><div className="set-label"><b>Mixer</b><span>Balance the instruments, and preview the full ensemble.</span></div><button type="button" className="btn sm" onClick={onOpenMusic}>Open mixer</button></div>
          <div className="set-row"><div className="set-label"><b>Sound effects</b><span>Chimes for right and wrong answers, fanfares.</span></div><Toggle on={s.sfx} onClick={() => set("sfx", !s.sfx)} /></div>
          <div className="set-row"><div className="set-label"><b>Transliteration</b><span>Latin-letter readings under Hebrew terms.</span></div><Toggle on={s.showTranslit} onClick={() => set("showTranslit", !s.showTranslit)} /></div>
        </div>
        <div className="set-group danger">
          <div className="set-row"><div className="set-label"><b>Reset progress</b><span>Clears every step, star and review card on this browser.</span></div>
            {!confirm ? <button type="button" className="btn sm" onClick={() => setConfirm(true)}>Reset…</button>
              : <span className="set-input-row"><button type="button" className="btn sm danger" onClick={() => { onReset(); setConfirm(false); }}>Yes, reset</button><button type="button" className="btn sm ghost" onClick={() => setConfirm(false)}>Keep</button></span>}
          </div>
        </div>
      </Modal>
    );
  }

  function AboutCard({ onClose }) {
    return (
      <Modal onClose={onClose} className="about-modal" label="About">
        <div className="eyebrow gold">About</div>
        <h2 className="modal-h sm">Kodshim Training</h2>
        <p className="modal-p">A small game for learning the laws of korbanot, the offerings of the Beis HaMikdash, one level at a time. The curriculum follows the Rambam's <em>Mishneh Torah</em>, Sefer Avodah, beginning with <em>Hilchot Maaseh HaKorbanot</em>.</p>
        <p className="modal-p">Every lesson and card cites its source. Hebrew texts come from Sefaria exports of the Mishneh Torah and of Vayikra; the English in the source scroll is machine-translated and should be checked against a printed edition before you rely on it.</p>
        <p className="modal-p">The five levels climb the fifteen <em>ma'alot</em> between the Ezras Nashim and the Ezras Yisrael: learn, prove, master, three steps a level. The music is the ancient <em>Epitaph of Seikilos</em>, one instrument joining per level mastered.</p>
        <p className="modal-p music-caveat"><strong>A caveat.</strong> This is a study aid, not a posek. Where the game and your rav differ, your rav is right.</p>
      </Modal>
    );
  }

  function InstructionsCard({ onClose, onOpenMusic }) {
    return (
      <Modal onClose={onClose} className="tutorial-modal" label="How it works">
        <div className="eyebrow gold">How it works</div>
        <h2 className="modal-h sm">Learn with the kohen. Prove it. Climb.</h2>
        <ol className="tutorial-list">
          <li><span className="num">1</span><div><strong>Learn</strong><p>The kohen gadol teaches one idea at a time. Tap to continue; every few taps he asks you something.</p></div></li>
          <li><span className="num">2</span><div><strong>Prove</strong><p>Ten cards from the level with three hearts. Seventy percent passes and opens the next level.</p></div></li>
          <li><span className="num">3</span><div><strong>Master</strong><p>A harder run that mixes in earlier levels. Pass it to finish the level and add an instrument to the music.</p></div></li>
        </ol>
        <div className="tutorial-callout"><strong>Review keeps it.</strong><p>Every card you answer joins a spaced-review deck. Review from the menu when cards are due; no hearts there.</p></div>
        <div className="tutorial-cta">
          <button type="button" className="btn gold lg" onClick={onClose}><span>Got it!</span></button>
          {onOpenMusic && <button type="button" className="link-btn music-link" onClick={onOpenMusic}><span className="link-ico" aria-hidden="true">♪</span> What's this music?</button>}
        </div>
      </Modal>
    );
  }

  /* ─── Map scene ───────────────────────────────────────────────────── */
  function MapScene({ music, onStart, onReview, onOpenMusic, onReset, firstVisit }) {
    const [, bump] = useState(0);
    useEffect(() => K().subscribe(() => bump((x) => x + 1)), []);
    const summary = useMemo(() => K().summary(), [K().progress.lastPlayed, K().progress.xp]); // eslint-disable-line
    const [sheet, setSheet] = useState(null);
    const [modal, setModal] = useState(null);
    const [shake, setShake] = useState(null);
    const currentNum = (summary.levels.find((L) => L.unlocked && !L.stages.every(Boolean)) || summary.levels[summary.levels.length - 1]).num;
    const curNode = NODES[currentNum - 1];

    useEffect(() => {
      const onKey = (e) => {
        if (e.key !== "Enter" || modal || sheet) return;
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
        setSheet(currentNum);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [modal, sheet, currentNum]);

    const pick = (lv) => {
      if (!lv.unlocked) { setShake(lv.num); K().sfx.tap(); setTimeout(() => setShake(null), 700); return; }
      K().sfx.tap(); setSheet(lv.num);
    };
    const pathD = NODES.map((n, i) => `${i ? "L" : "M"} ${n.x * 20} ${n.y * 14.39}`).join(" ");
    const sheetLevel = sheet ? summary.levels.find((L) => L.num === sheet) : null;

    return (
      <div className="jmap-scene">
        <div className="jmap">
          <div className="jmap-img" />
          <svg className="jm-path" viewBox="0 0 2000 1439" preserveAspectRatio="none" aria-hidden="true"><path d={pathD} /></svg>
          {summary.levels.map((lv, i) => <Medallion key={lv.num} lv={lv} idx={i} current={lv.num === currentNum} onPick={pick} />)}
          <div className="jm-avatar" style={{ left: curNode.x + "%", top: curNode.y + "%" }} aria-hidden="true"><img src="assets/boy-learning.webp" alt="" /></div>
          {shake && <div className="jm-locked" style={{ left: NODES[shake - 1].x + "%", top: NODES[shake - 1].y + "%" }}>Prove Level {shake - 1} first</div>}
        </div>

        <div className="jm-brand"><span className="he">קדשים</span><span className="en">Kodshim Training</span></div>
        <button type="button" className={"jm-menu-btn" + (summary.due > 0 ? " due" : "")} onClick={() => setModal("menu")} aria-label="Menu">
          <span className="bars" aria-hidden="true"><i /><i /><i /></span>
          {summary.due > 0 && <span className="tool-badge">{summary.due}</span>}
        </button>

        <div className="jm-kohen">
          <img src="assets/kohen-gadol-teaching.webp" alt="" />
          <div className="jm-bubble">{hintFor(summary)}</div>
        </div>

        {sheetLevel && <LevelSheet lv={sheetLevel} onClose={() => setSheet(null)} onStart={(num, stage) => { setSheet(null); onStart(num, stage); }} />}
        {modal === "menu" && <MenuSheet summary={summary} music={music} onClose={() => setModal(null)} onReview={onReview} onInstructions={() => setModal("instructions")} onMusic={onOpenMusic} onSettings={() => setModal("settings")} onAbout={() => setModal("about")} />}
        {modal === "instructions" && <InstructionsCard onClose={() => setModal(null)} onOpenMusic={onOpenMusic} />}
        {modal === "settings" && <SettingsCard onClose={() => setModal(null)} music={music} onOpenMusic={onOpenMusic} onReset={() => { onReset(); setModal(null); }} />}
        {modal === "about" && <AboutCard onClose={() => setModal(null)} />}
      </div>
    );
  }

  Object.assign(window, { MapScene, SettingsCard, AboutCard, InstructionsCard });
})();
