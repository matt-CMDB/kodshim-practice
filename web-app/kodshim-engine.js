// Kodshim game engine — no React in here.
// Progress + settings persistence, the fifteen-step ladder, the Leitner
// review scheduler, quiz selection, and sound effects.

(function () {
  const PROGRESS_KEY = "kodshim.progress.v2";
  const SETTINGS_KEY = "kodshim.settings.v2";

  /* ─── Levels registry ─────────────────────────────────────────────── */
  function levels() {
    const reg = window.KODSHIM_LEVELS || {};
    return Object.keys(reg).map(Number).sort((a, b) => a - b).map((n) => reg[n]);
  }
  function level(n) { return (window.KODSHIM_LEVELS || {})[n] || null; }
  function allQuiz() {
    const out = [];
    levels().forEach((L) => (L.quiz || []).forEach((q) => out.push(Object.assign({ level: L.num }, q))));
    return out;
  }
  function quizById(id) {
    for (const L of levels()) for (const q of L.quiz || []) if (q.id === id) return Object.assign({ level: L.num }, q);
    return null;
  }

  /* ─── Storage ─────────────────────────────────────────────────────── */
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? Object.assign({}, fallback, JSON.parse(raw)) : Object.assign({}, fallback);
    } catch (e) { return Object.assign({}, fallback); }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* private mode etc. */ }
  }

  const DEFAULT_PROGRESS = {
    levels: {},      // { [n]: { learned: bool, prove: { best, stars, attempts, passed }, master: { best, stars, attempts, passed } } }
    cards: {},       // { [quizId]: { box, due, seen, wrong, last } }
    xp: 0,
    bestStreak: 0,
    runs: 0,
    created: 0,
    lastPlayed: 0,
  };
  const DEFAULT_SETTINGS = {
    music: true,
    sfx: true,
    volumes: [0.7, 0.7, 0.7, 0.7, 0.7],
    showTranslit: true,
    musicSource: "recorded",
    seenWelcome: false,
    seenTutorial: false,
  };

  let progress = read(PROGRESS_KEY, DEFAULT_PROGRESS);
  let settings = read(SETTINGS_KEY, DEFAULT_SETTINGS);
  if (!progress.created) { progress.created = Date.now(); write(PROGRESS_KEY, progress); }

  const listeners = new Set();
  function emit() { listeners.forEach((fn) => { try { fn(); } catch (e) { /* ignore */ } }); }
  function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function saveProgress() { progress.lastPlayed = Date.now(); write(PROGRESS_KEY, progress); emit(); }
  function saveSettings() { write(SETTINGS_KEY, settings); emit(); }

  function levelState(n) {
    const p = progress.levels[n] || (progress.levels[n] = {});
    if (!p.prove) p.prove = { best: 0, stars: 0, attempts: 0, passed: false };
    if (!p.master) p.master = { best: 0, stars: 0, attempts: 0, passed: false };
    return p;
  }

  /* ─── The fifteen steps ───────────────────────────────────────────── */
  // Each level is three steps up the staircase: Learn, Prove, Master.
  const STAGES = ["learn", "prove", "master"];
  function stagesDone(n) {
    const p = levelState(n);
    return [!!p.learned, !!p.prove.passed, !!p.master.passed];
  }
  function stepsClimbed() {
    let s = 0;
    levels().forEach((L) => { s += stagesDone(L.num).filter(Boolean).length; });
    return s;
  }
  function totalSteps() { return levels().length * 3; }
  // Level n is open when level n-1 has been proved (mastery is optional but rewarded).
  function isUnlocked(n) {
    if (n <= 1) return true;
    const prev = level(n - 1);
    if (!prev) return false;
    return !!levelState(n - 1).prove.passed;
  }
  function currentLevel() {
    const ls = levels();
    for (const L of ls) if (!levelState(L.num).prove.passed) return L.num;
    return ls.length ? ls[ls.length - 1].num : 1;
  }
  // The step the player stands on (1-based index into the 15), for the avatar.
  function stepFor(n, stage) { return (n - 1) * 3 + STAGES.indexOf(stage) + 1; }

  /* ─── Instruments ─────────────────────────────────────────────────── */
  // An instrument joins the ensemble once the player has climbed that many
  // steps (nevel from the start; kinnor at 3, chalil at 6, chatzotzra at 9,
  // tziltzel at 12 — one per level mastered).
  function unlockedInstruments() {
    const inst = window.INSTRUMENTS || [];
    const steps = stepsClimbed();
    return Math.max(1, inst.filter((i, idx) => idx === 0 || steps >= (i.unlockStep || 0)).length);
  }

  /* ─── Scoring ─────────────────────────────────────────────────────── */
  const PASS_RATIO = 0.7;
  const MASTER_RATIO = 0.85;
  function starsFor(hearts, correct, total) {
    const ratio = total ? correct / total : 0;
    if (hearts >= 3 && ratio === 1) return 3;
    if (hearts >= 2) return 2;
    return 1;
  }
  function completeLearn(n) {
    const p = levelState(n);
    if (!p.learned) { p.learned = true; progress.xp += 40; }
    saveProgress();
  }
  // Per-lesson completion inside Learn.
  function completeLesson(n, lessonId) {
    const p = levelState(n);
    if (!p.lessons) p.lessons = {};
    if (!p.lessons[lessonId]) { p.lessons[lessonId] = Date.now(); progress.xp += 10; }
    const L = level(n);
    if (L && L.lessons && L.lessons.every((ls) => p.lessons[ls.id])) p.learned = true;
    saveProgress();
  }
  function lessonDone(n, lessonId) { const p = levelState(n); return !!(p.lessons && p.lessons[lessonId]); }
  function nextLesson(n) {
    const L = level(n);
    if (!L || !L.lessons) return 0;
    const i = L.lessons.findIndex((ls) => !lessonDone(n, ls.id));
    return i < 0 ? 0 : i;
  }
  function completeRun(n, stage, result) {
    // result: { correct, total, hearts, streak }
    const p = levelState(n);
    const rec = p[stage];
    const ratio = result.total ? result.correct / result.total : 0;
    const need = stage === "master" ? MASTER_RATIO : PASS_RATIO;
    const passed = result.hearts > 0 && ratio >= need;
    const stars = passed ? starsFor(result.hearts, result.correct, result.total) : 0;
    rec.attempts += 1;
    rec.best = Math.max(rec.best, Math.round(ratio * 100));
    let xp = result.correct * 10;
    if (passed && !rec.passed) xp += stage === "master" ? 120 : 80;
    if (stars > rec.stars) { xp += (stars - rec.stars) * 25; rec.stars = stars; }
    if (passed) rec.passed = true;
    progress.xp += xp;
    progress.runs += 1;
    if (result.streak > progress.bestStreak) progress.bestStreak = result.streak;
    saveProgress();
    return { passed, stars, xp, ratio };
  }

  /* ─── Leitner review ──────────────────────────────────────────────── */
  const DAY = 24 * 3600 * 1000;
  const INTERVALS = [0, 1 * DAY, 3 * DAY, 7 * DAY, 14 * DAY, 30 * DAY];
  function card(id) {
    return progress.cards[id] || (progress.cards[id] = { box: 0, due: 0, seen: 0, wrong: 0, last: 0 });
  }
  function recordAnswer(id, ok) {
    const c = card(id);
    c.seen += 1;
    if (ok) c.box = Math.min(c.box + 1, INTERVALS.length - 1);
    else { c.box = 0; c.wrong += 1; }
    c.last = Date.now();
    c.due = Date.now() + INTERVALS[c.box];
    saveProgress();
  }
  function dueCards() {
    const now = Date.now();
    return allQuiz().filter((q) => isUnlocked(q.level) && levelState(q.level).learned)
      .filter((q) => { const c = progress.cards[q.id]; return c && c.seen > 0 && c.due <= now; });
  }
  function weakCards(limit) {
    return allQuiz().filter((q) => isUnlocked(q.level))
      .map((q) => ({ q, c: progress.cards[q.id] }))
      .filter((x) => x.c && x.c.wrong > 0)
      .sort((a, b) => (b.c.wrong / (b.c.seen || 1)) - (a.c.wrong / (a.c.seen || 1)))
      .slice(0, limit || 20).map((x) => x.q);
  }

  /* ─── Picking questions ───────────────────────────────────────────── */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function weightOf(q) {
    const c = progress.cards[q.id];
    if (!c || c.seen === 0) return 3;        // never seen
    if (c.wrong > 0 && c.box <= 1) return 3; // recently wrong
    if (c.box <= 2) return 2;
    return 1;
  }
  function weightedSample(pool, n, caps) {
    // caps: { kind: maxCount } to keep a run from being all drag-and-drop.
    const counts = {};
    const chosen = [];
    let items = pool.map((q) => ({ q, w: weightOf(q) }));
    while (chosen.length < n && items.length) {
      const total = items.reduce((s, x) => s + x.w, 0);
      let r = Math.random() * total;
      let idx = 0;
      for (; idx < items.length; idx++) { r -= items[idx].w; if (r <= 0) break; }
      const pick = items[Math.min(idx, items.length - 1)].q;
      items = items.filter((x) => x.q !== pick);
      const cap = caps && caps[pick.kind];
      if (cap !== undefined && (counts[pick.kind] || 0) >= cap) continue;
      counts[pick.kind] = (counts[pick.kind] || 0) + 1;
      chosen.push(pick);
    }
    return chosen;
  }
  const CAPS = { sort: 2, match: 2 };
  function pickProve(n, count) {
    const L = level(n);
    const pool = (L.quiz || []).map((q) => Object.assign({ level: n }, q));
    return orderForPacing(weightedSample(pool, count || 12, CAPS));
  }
  function pickMaster(n, count) {
    count = count || 12;
    const own = (level(n).quiz || []).map((q) => Object.assign({ level: n }, q));
    const earlier = [];
    levels().forEach((L) => { if (L.num < n) (L.quiz || []).forEach((q) => earlier.push(Object.assign({ level: L.num }, q))); });
    const nEarlier = earlier.length ? Math.min(4, Math.floor(count / 3)) : 0;
    const a = weightedSample(own, count - nEarlier, CAPS);
    const b = weightedSample(earlier, nEarlier, { sort: 1, match: 1 });
    return orderForPacing(a.concat(b));
  }
  function pickReview(count) {
    count = count || 12;
    const due = shuffle(dueCards());
    let chosen = due.slice(0, count);
    if (chosen.length < count) {
      const seenIds = new Set(chosen.map((q) => q.id));
      const rest = allQuiz().filter((q) => isUnlocked(q.level) && levelState(q.level).learned && !seenIds.has(q.id));
      chosen = chosen.concat(weightedSample(rest, count - chosen.length, CAPS));
    }
    return orderForPacing(chosen);
  }
  // Start with something quick, put the heavy interactions in the middle, end on a short one.
  function orderForPacing(items) {
    const quick = shuffle(items.filter((q) => ["mc", "tap", "tf", "cloze"].includes(q.kind)));
    const heavy = shuffle(items.filter((q) => ["sort", "match"].includes(q.kind)));
    if (!quick.length) return heavy;
    const out = [quick.shift()];
    const mid = shuffle(quick.concat(heavy));
    // keep two heavy items from being adjacent where possible
    const arranged = [];
    let lastHeavy = false;
    const queue = mid.slice();
    while (queue.length) {
      let i = 0;
      if (lastHeavy) { const j = queue.findIndex((q) => !["sort", "match"].includes(q.kind)); if (j >= 0) i = j; }
      const q = queue.splice(i, 1)[0];
      lastHeavy = ["sort", "match"].includes(q.kind);
      arranged.push(q);
    }
    return out.concat(arranged);
  }

  /* ─── Sound effects (WebAudio, no files) ──────────────────────────── */
  let ctx = null;
  function audio() {
    if (!settings.sfx) return null;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); return ctx; }
    catch (e) { return null; }
  }
  function tone(freq, t0, dur, type, gain) {
    const ac = audio(); if (!ac) return;
    const o = ac.createOscillator(); const g = ac.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, ac.currentTime + t0);
    g.gain.setValueAtTime(0.0001, ac.currentTime + t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.18, ac.currentTime + t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + t0 + dur);
    o.connect(g).connect(ac.destination);
    o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + dur + 0.05);
  }
  const sfx = {
    tap() { tone(880, 0, 0.06, "triangle", 0.08); },
    correct() { tone(659, 0, 0.12, "triangle", 0.16); tone(988, 0.1, 0.18, "triangle", 0.16); },
    wrong() { tone(196, 0, 0.22, "sawtooth", 0.1); tone(150, 0.08, 0.26, "sawtooth", 0.08); },
    streak() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.16, "triangle", 0.14)); },
    heart() { tone(330, 0, 0.3, "sine", 0.14); tone(262, 0.18, 0.4, "sine", 0.12); },
    fanfare() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22, "triangle", 0.16)); tone(1319, 0.7, 0.6, "triangle", 0.18); },
    unlock() { [392, 523, 659, 784].forEach((f, i) => tone(f, i * 0.09, 0.3, "sine", 0.14)); },
    step() { tone(440, 0, 0.08, "square", 0.05); tone(554, 0.08, 0.1, "square", 0.05); },
  };

  /* ─── Misc helpers ────────────────────────────────────────────────── */
  function resetProgress() { progress = Object.assign({}, DEFAULT_PROGRESS, { levels: {}, cards: {}, created: Date.now() }); saveProgress(); }
  function pad2(n) { return String(n).padStart(2, "0"); }
  function summary() {
    const ls = levels();
    return {
      steps: stepsClimbed(), total: totalSteps(), xp: progress.xp, bestStreak: progress.bestStreak,
      levels: ls.map((L) => ({ num: L.num, name: L.name, he: L.he, unlocked: isUnlocked(L.num), stages: stagesDone(L.num), state: levelState(L.num) })),
      due: dueCards().length,
      stars: ls.reduce((s, L) => s + levelState(L.num).prove.stars + levelState(L.num).master.stars, 0),
      maxStars: ls.length * 6,
    };
  }

  window.KODSHIM = {
    levels, level, allQuiz, quizById,
    get progress() { return progress; },
    get settings() { return settings; },
    setSetting(k, v) { settings[k] = v; saveSettings(); },
    subscribe,
    levelState, stagesDone, stepsClimbed, totalSteps, isUnlocked, currentLevel, stepFor, STAGES,
    unlockedInstruments,
    completeLearn, completeLesson, lessonDone, nextLesson, completeRun, starsFor, PASS_RATIO, MASTER_RATIO,
    recordAnswer, dueCards, weakCards, card,
    pickProve, pickMaster, pickReview, shuffle,
    sfx,
    resetProgress, summary, pad2,
  };
})();
