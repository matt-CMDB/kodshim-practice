// The map: fifteen steps up to the Ezras Yisrael, the avatar on the current
// step, a level card per level, and the toolbar (instructions, music,
// settings, about, review).
(() => {
  const { useState, useEffect, useMemo } = React;
  const K = () => window.KODSHIM;

  /* ─── Staircase ───────────────────────────────────────────────────── */
  function Staircase({ summary, onPick, onPickLocked }) {
    const levels = summary.levels;
    const steps = [];
    levels.forEach((L) => {
      K().STAGES.forEach((stage, si) => {
        steps.push({ idx: (L.num - 1) * 3 + si + 1, level: L, stage, si, done: L.stages[si] });
      });
    });
    const climbed = summary.steps; // number of completed steps; avatar stands on step `climbed` (0 = ground)
    const total = steps.length;
    return (
      <div className="stairs" style={{ "--total": total }} aria-label="The fifteen steps">
        {steps.slice().reverse().map((s) => {
          const isCurrent = s.idx === climbed + 1;
          const locked = !s.level.unlocked;
          const cls = ["stair", s.done ? "done" : "", isCurrent ? "current" : "", locked ? "locked" : "", s.si === 0 ? "first" : "", s.si === 2 ? "last" : ""].join(" ");
          return (
            <button
              key={s.idx}
              type="button"
              className={cls}
              style={{ "--i": s.idx }}
              disabled={locked}
              onClick={() => (locked ? onPickLocked(s.level) : onPick(s.level.num, s.stage))}
              title={`Step ${s.idx} · Level ${s.level.num} ${s.stage}`}
            >
              <span className="stair-num">{K().pad2(s.idx)}</span>
              <span className="stair-stage">{s.stage}</span>
              {s.si === 1 && (
                <span className="stair-level">
                  <span className="n">Level {s.level.num}</span>
                  <span className="t">{s.level.name}</span>
                </span>
              )}
              {s.done && <span className="stair-check" aria-hidden="true">✓</span>}
              {s.stage !== "learn" && s.done && (
                <Stars n={s.stage === "prove" ? s.level.state.prove.stars : s.level.state.master.stars} size="sm" />
              )}
            </button>
          );
        })}
        <div className="stairs-ground">Ezras Nashim · ground</div>
        <div className="stairs-top">Ezras Yisrael</div>
        <Avatar step={climbed} total={total} />
      </div>
    );
  }

  function Avatar({ step, total }) {
    // Feet on the top edge of the step bar (CSS computes it from --step); on the ground when step is 0.
    return (
      <div className={"avatar" + (step === 0 ? " ground" : "")} style={{ "--step": step }} aria-hidden="true">
        <img src="assets/boy-learning.png" alt="" />
      </div>
    );
  }

  /* ─── Kohen's speech bubble ───────────────────────────────────────── */
  function hintFor(summary) {
    const cur = summary.levels.find((L) => !L.stages[1]) || summary.levels[summary.levels.length - 1];
    if (summary.steps === 0) return { title: "Welcome, trainee.", text: "Start with Level 1 — learn the five species and their names, then prove it." };
    if (summary.steps >= summary.total) return { title: "You have reached the gate.", text: "Every level mastered. Keep your cards sharp in Review, and come back any time." };
    if (cur && !cur.stages[0]) return { title: `Level ${cur.num} is open.`, text: `${cur.name}. Walk through the lessons first — the kohen gadol won't rush you.` };
    if (cur && !cur.stages[1]) return { title: "Time to prove it.", text: `Twelve cards on ${cur.name.toLowerCase()}. Three hearts, seventy percent to pass.` };
    if (summary.due > 0) return { title: `${summary.due} card${summary.due === 1 ? "" : "s"} due for review.`, text: "Old material slips away quietly. A short review keeps it." };
    const m = summary.levels.find((L) => L.stages[1] && !L.stages[2]);
    if (m) return { title: `Master Level ${m.num}.`, text: "A harder run, mixed with earlier levels. Pass it to climb the third step and add an instrument." };
    return { title: "Keep climbing.", text: "Pick any open step." };
  }

  function KohenBubble({ summary }) {
    const h = hintFor(summary);
    return (
      <div className="kohen-bubble">
        <div className="kb-title">{h.title}</div>
        <div className="kb-text">{h.text}</div>
      </div>
    );
  }

  /* ─── HUD ─────────────────────────────────────────────────────────── */
  function Hud({ summary, music }) {
    return (
      <div className="hud" aria-label="Progress">
        <div className="hud-item"><span className="v">{summary.steps}<span className="of">/{summary.total}</span></span><span className="l">steps</span></div>
        <div className="hud-item"><span className="v">{summary.stars}<span className="of">/{summary.maxStars}</span></span><span className="l">stars</span></div>
        <div className="hud-item"><span className="v">{summary.xp}</span><span className="l">xp</span></div>
        <div className="hud-item"><span className="v">{music ? music.unlockedCount : 1}<span className="of">/5</span></span><span className="l">instruments</span></div>
      </div>
    );
  }

  /* ─── Level card ──────────────────────────────────────────────────── */
  function LevelCard({ level, focus, onClose, onStart }) {
    const L = K().level(level.num);
    const st = level.state;
    const stages = level.stages;
    const rows = [
      { id: "learn", n: "01", name: "Learn", he: "לִמּוּד", desc: L.lessons ? `${L.lessons.length} lessons` : "Six illustrated lessons", done: stages[0], ok: true, stars: null, best: null },
      { id: "prove", n: "02", name: "Prove", he: "מִבְחָן", desc: "12 cards · 3 hearts · 70% to pass", done: stages[1], ok: true, stars: st.prove.stars, best: st.prove.best, attempts: st.prove.attempts },
      { id: "master", n: "03", name: "Master", he: "שְׁלֵמוּת", desc: "12 harder cards, mixed with earlier levels · 85%", done: stages[2], ok: stages[1], stars: st.master.stars, best: st.master.best, attempts: st.master.attempts },
    ];
    return (
      <Modal onClose={onClose} className="level-modal" label={`Level ${L.num}`}>
        <div className="eyebrow gold">Level {K().pad2(L.num)} · steps {(L.num - 1) * 3 + 1}–{L.num * 3}</div>
        <h2 className="modal-h sm level-modal-h">
          <span className="he">{L.he}</span>
          <span className="en">{L.name}</span>
        </h2>
        <p className="modal-p level-tagline">{L.tagline}</p>
        {L.scope && <div className="level-scope">Rambam · {L.scope}</div>}
        <div className="stage-rows">
          {rows.map((r) => (
            <button
              key={r.id}
              type="button"
              className={"stage-row" + (r.done ? " done" : "") + (!r.ok ? " off" : "") + (focus === r.id ? " focus" : "")}
              disabled={!r.ok}
              onClick={() => onStart(L.num, r.id)}
            >
              <span className="sr-num">{r.n}</span>
              <span className="sr-main">
                <span className="sr-name">{r.name} <span className="he">{r.he}</span></span>
                <span className="sr-desc">{r.desc}</span>
              </span>
              <span className="sr-right">
                {r.stars !== null && r.done && <Stars n={r.stars} size="sm" />}
                {r.best !== null && r.attempts > 0 && <span className="sr-best">best {r.best}%</span>}
                {r.id === "learn" && r.done && <span className="sr-check">✓</span>}
                {!r.ok && <span className="sr-lock">prove first</span>}
                <span className="sr-go">→</span>
              </span>
            </button>
          ))}
        </div>
        <div className="level-modal-foot">
          <span className="eyebrow">{(L.quiz || []).length} cards in the bank</span>
          <span className="dot-sep">·</span>
          <span className="eyebrow">{(L.concepts || []).length} concepts</span>
        </div>
      </Modal>
    );
  }

  /* ─── Settings ────────────────────────────────────────────────────── */
  function SettingsCard({ onClose, music, onOpenMusic, onReset }) {
    const s = K().settings;
    const [, bump] = useState(0);
    const [key, setKey] = useState(s.tutorKey || "");
    const [model, setModel] = useState(s.tutorModel || "anthropic/claude-haiku-5.5");
    const [showKey, setShowKey] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const set = (k, v) => { K().setSetting(k, v); bump((x) => x + 1); };
    const saveTutor = () => { set("tutorKey", key.trim()); set("tutorModel", model.trim() || "anthropic/claude-haiku-5.5"); };
    return (
      <Modal onClose={onClose} className="settings-modal" label="Settings">
        <div className="eyebrow gold">Settings</div>
        <h2 className="modal-h sm">Make it yours.</h2>

        <div className="set-group">
          <div className="set-row">
            <div className="set-label"><b>Music</b><span>The Levi'im ensemble, layered as you climb.</span></div>
            <button type="button" className={"music-toggle" + (music.enabled ? " on" : "")} onClick={() => { music.start(); music.setEnabled(!music.enabled); }} aria-pressed={music.enabled}>
              <span className="dot" /> {music.enabled ? "On" : "Off"}
            </button>
          </div>
          <div className="set-row">
            <div className="set-label"><b>Mixer</b><span>Balance the instruments you've unlocked.</span></div>
            <button type="button" className="btn sm" onClick={onOpenMusic}>Open mixer</button>
          </div>
          <div className="set-row">
            <div className="set-label"><b>Sound effects</b><span>Chimes for right and wrong answers, fanfares.</span></div>
            <button type="button" className={"music-toggle" + (s.sfx ? " on" : "")} onClick={() => set("sfx", !s.sfx)} aria-pressed={s.sfx}>
              <span className="dot" /> {s.sfx ? "On" : "Off"}
            </button>
          </div>
          <div className="set-row">
            <div className="set-label"><b>Transliteration</b><span>Show Latin-letter readings under Hebrew terms.</span></div>
            <button type="button" className={"music-toggle" + (s.showTranslit ? " on" : "")} onClick={() => set("showTranslit", !s.showTranslit)} aria-pressed={s.showTranslit}>
              <span className="dot" /> {s.showTranslit ? "On" : "Off"}
            </button>
          </div>
        </div>

        <div className="set-group">
          <div className="set-head">Ask the kohen <span className="eyebrow">optional</span></div>
          <p className="set-help">
            An in-game study partner that answers questions about the current level. It calls
            OpenRouter straight from this browser with your own key, which is kept only in this
            browser's storage. Costs a fraction of a cent per question with the default model.
          </p>
          <label className="set-field">
            <span>OpenRouter API key</span>
            <span className="set-input-row">
              <input type={showKey ? "text" : "password"} value={key} onChange={(e) => setKey(e.target.value)} placeholder="sk-or-v1-…" spellCheck={false} autoComplete="off" />
              <button type="button" className="btn sm ghost" onClick={() => setShowKey((v) => !v)}>{showKey ? "Hide" : "Show"}</button>
            </span>
          </label>
          <label className="set-field">
            <span>Model</span>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} spellCheck={false} />
          </label>
          <div className="set-actions">
            <button type="button" className="btn primary sm" onClick={saveTutor}>Save</button>
            {s.tutorKey && <span className="set-ok">Key saved · tutor enabled</span>}
          </div>
        </div>

        <div className="set-group danger">
          <div className="set-row">
            <div className="set-label"><b>Reset progress</b><span>Clears every step, star and review card on this browser.</span></div>
            {!confirm
              ? <button type="button" className="btn sm" onClick={() => setConfirm(true)}>Reset…</button>
              : <span className="set-input-row">
                  <button type="button" className="btn sm danger" onClick={() => { onReset(); setConfirm(false); }}>Yes, reset</button>
                  <button type="button" className="btn sm ghost" onClick={() => setConfirm(false)}>Keep</button>
                </span>}
          </div>
        </div>
      </Modal>
    );
  }

  /* ─── About ───────────────────────────────────────────────────────── */
  function AboutCard({ onClose }) {
    return (
      <Modal onClose={onClose} className="about-modal" label="About">
        <div className="eyebrow gold">About</div>
        <h2 className="modal-h sm">Kodshim Training</h2>
        <p className="modal-p">
          A small game for learning the laws of korbanot — the offerings of the Beis HaMikdash —
          one level at a time. The curriculum follows the Rambam's <em>Mishneh Torah</em>, Sefer
          Avodah, beginning with <em>Hilchot Maaseh HaKorbanot</em>.
        </p>
        <p className="modal-p">
          Every lesson and card cites its source. Hebrew texts are drawn from Sefaria exports of
          the Mishneh Torah and of Vayikra; the English renderings in the sources drawer are
          machine-translated and should be checked against a printed edition before you rely on them.
        </p>
        <p className="modal-p">
          The fifteen steps are the <em>ma'alot</em> between the Ezras Nashim and the Ezras
          Yisrael, on which the Levi'im sang the fifteen Shir HaMa'alot. Each level is three steps:
          learn, prove, master. The music is the ancient <em>Epitaph of Seikilos</em>, one instrument
          joining per level mastered.
        </p>
        <p className="modal-p music-caveat">
          <strong>A caveat.</strong> This is a study aid, not a posek. Where the game and your rav
          differ, your rav is right.
        </p>
      </Modal>
    );
  }

  /* ─── Instructions (rewritten tutorial card) ──────────────────────── */
  function InstructionsCard({ onClose, onOpenMusic }) {
    return (
      <Modal onClose={onClose} className="tutorial-modal" label="How it works">
        <div className="eyebrow gold">How it works</div>
        <h2 className="modal-h sm">Learn the laws. Prove yourself. Climb the fifteen steps.</h2>
        <p className="modal-p">
          Five levels, each a distinct area of the laws of korbanot. Every level is three steps up
          the staircase, and every step you climb adds a voice to the Levi'im's music.
        </p>
        <ol className="tutorial-list">
          <li><span className="num">1</span><div><strong>Learn</strong><p>Short lessons with the Hebrew terms, a table or two, and the Rambam's own words in the sources drawer.</p></div></li>
          <li><span className="num">2</span><div><strong>Prove</strong><p>Twelve cards from the level — multiple choice, sorting, matching, kosher-or-pasul. Three hearts; seventy percent passes and opens the next level.</p></div></li>
          <li><span className="num">3</span><div><strong>Master</strong><p>A harder run that mixes in earlier levels and leans on the cards you've missed. Pass it to take the level's third step.</p></div></li>
        </ol>
        <div className="tutorial-callout">
          <strong>Review keeps it.</strong>
          <p>Every card you answer goes into a spaced-review deck. The map shows how many are due; a review run has no hearts and costs nothing but a few minutes.</p>
        </div>
        <div className="tutorial-cta">
          <button type="button" className="btn gold lg" onClick={onClose}><span>Got it!</span></button>
          {onOpenMusic && (
            <button type="button" className="link-btn music-link" onClick={onOpenMusic}>
              <span className="link-ico" aria-hidden="true">♪</span> What's this music?
            </button>
          )}
        </div>
      </Modal>
    );
  }

  /* ─── Toolbar ─────────────────────────────────────────────────────── */
  function MapToolbar({ onInstructions, onMusic, onSettings, onAbout, onReview, due, playing }) {
    return (
      <div className="tool-strip" aria-label="Tools">
        <button type="button" className="tool-btn" onClick={onReview} aria-label="Review">
          <span className="tool-ico" aria-hidden="true">↻</span>
          <span className="tool-label">Review</span>
          {due > 0 && <span className="tool-badge">{due}</span>}
        </button>
        <button type="button" className="tool-btn" onClick={onInstructions} aria-label="Instructions">
          <span className="tool-ico" aria-hidden="true">?</span>
          <span className="tool-label">How it works</span>
        </button>
        <button type="button" className="tool-btn" onClick={onMusic} aria-label="Music">
          <span className={"tool-ico" + (playing ? " playing" : "")} aria-hidden="true">♪</span>
          <span className="tool-label">Music</span>
        </button>
        <button type="button" className="tool-btn" onClick={onSettings} aria-label="Settings">
          <span className="tool-ico" aria-hidden="true">⚙</span>
          <span className="tool-label">Settings</span>
        </button>
        <button type="button" className="tool-btn" onClick={onAbout} aria-label="About">
          <span className="tool-ico" aria-hidden="true">i</span>
          <span className="tool-label">About</span>
        </button>
      </div>
    );
  }

  /* ─── Map scene ───────────────────────────────────────────────────── */
  function MapScene({ music, onStart, onReview, onOpenMusic, firstVisit, onReset }) {
    const [, bump] = useState(0);
    useEffect(() => K().subscribe(() => bump((x) => x + 1)), []);
    const summary = useMemo(() => K().summary(), [K().progress.lastPlayed, K().progress.xp]); // eslint-disable-line
    const [card, setCard] = useState(null);         // { num, focus }
    const [modal, setModal] = useState(firstVisit ? "instructions" : null);
    const [shake, setShake] = useState(null);

    useEffect(() => {
      const onKey = (e) => {
        if (e.key !== "Enter" || modal || card) return;
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
        const cur = summary.levels.find((L) => L.unlocked && !L.stages[1]) || summary.levels.find((L) => L.unlocked && !L.stages[2]);
        if (cur) setCard({ num: cur.num, focus: !cur.stages[0] ? "learn" : !cur.stages[1] ? "prove" : "master" });
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [modal, card, summary]);

    const pickLocked = (L) => { setShake(L.num); K().sfx.tap(); setTimeout(() => setShake(null), 500); };
    const playing = music && music.enabled && music.unlockedCount > 0;
    const focusLevel = card ? summary.levels.find((L) => L.num === card.num) : null;

    return (
      <div className="intro intro-tutorial map-scene">
        <div className="heichal-backdrop" />
        <div className="figure figure-left">
          <img src="assets/kohen-gadol-teaching.png" alt="The kohen gadol teaching" className="figure-img" />
          <KohenBubble summary={summary} />
        </div>

        <div className="intro-brand">
          <span className="he">קדשים</span>
          <span className="sep" />
          <span className="en">KODSHIM TRAINING</span>
        </div>

        <Hud summary={summary} music={music} />

        <div className={"stairs-wrap" + (shake ? " shake" : "")}>
          <Staircase summary={summary} onPick={(num, stage) => { K().sfx.tap(); setCard({ num, focus: stage }); }} onPickLocked={pickLocked} />
          {shake && <div className="stairs-locked-note">Prove Level {shake - 1} first</div>}
        </div>

        <MapToolbar
          onInstructions={() => setModal("instructions")}
          onMusic={onOpenMusic}
          onSettings={() => setModal("settings")}
          onAbout={() => setModal("about")}
          onReview={onReview}
          due={summary.due}
          playing={playing}
        />

        {card && focusLevel && (
          <LevelCard level={focusLevel} focus={card.focus} onClose={() => setCard(null)} onStart={(num, stage) => { setCard(null); onStart(num, stage); }} />
        )}
        {modal === "instructions" && <InstructionsCard onClose={() => setModal(null)} onOpenMusic={onOpenMusic} />}
        {modal === "settings" && <SettingsCard onClose={() => setModal(null)} music={music} onOpenMusic={onOpenMusic} onReset={() => { onReset(); setModal(null); }} />}
        {modal === "about" && <AboutCard onClose={() => setModal(null)} />}
      </div>
    );
  }

  Object.assign(window, { MapScene, LevelCard, SettingsCard, AboutCard, InstructionsCard });
})();
