// Generic Learn screen for levels whose content is data (levels 2+).
// Slide 0 is the level's opening card; each lesson is a slide whose blocks
// reveal one per click. Sources open in the same parchment drawer as Level 1.
(() => {
  const { useState, useEffect, useCallback, useRef } = React;
  const K = () => window.KODSHIM;

  /* ─── Blocks ──────────────────────────────────────────────────────── */
  function Block({ b }) {
    const translit = K().settings.showTranslit;
    switch (b.type) {
      case "cards":
        return (
          <div className={"blk blk-cards n" + Math.min(b.items.length, 6)}>
            {b.items.map((it, i) => (
              <div className="term-card" key={i}>
                <span className="he">{it.he}</span>
                {translit && it.tl && <span className="tl">{it.tl}</span>}
                {it.en && <span className="en">{it.en}</span>}
                {it.text && <p className="txt"><Inline text={it.text} /></p>}
              </div>
            ))}
          </div>
        );
      case "table":
        return (
          <div className="blk blk-table">
            {b.caption && <div className="tbl-caption">{b.caption}</div>}
            <table>
              <thead>
                <tr>{b.cols.map((c, i) => <th key={i}><Inline text={c} /></th>)}</tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => j === 0 ? <th scope="row" key={j}><Inline text={c} /></th> : <td key={j}><Inline text={c} /></td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "compare":
        return (
          <div className="blk blk-compare">
            {[b.left, b.right].map((side, i) => (
              <div className={"cmp-col " + (i === 0 ? "l" : "r")} key={i}>
                <header>
                  {side.he && <span className="he">{side.he}</span>}
                  <span className="en">{side.title}</span>
                </header>
                <ul>{side.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>
              </div>
            ))}
          </div>
        );
      case "callout":
        return (
          <div className="blk blk-callout">
            {b.title && <div className="co-title">{b.title}</div>}
            <p><Inline text={b.text} /></p>
          </div>
        );
      case "steps":
        return (
          <ol className="blk blk-steps">
            {b.items.map((it, i) => (
              <li key={i}>
                <span className="st-num">{i + 1}</span>
                <div className="st-body">
                  <div className="st-title">{it.title}{it.he && <span className="he">{it.he}</span>}</div>
                  <p><Inline text={it.text} /></p>
                </div>
              </li>
            ))}
          </ol>
        );
      case "list":
        return (
          <div className="blk blk-list">
            {b.title && <div className="ls-title">{b.title}</div>}
            <ul>{b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</ul>
          </div>
        );
      case "terms":
        return (
          <div className="blk blk-terms">
            {b.items.map((it, i) => (
              <span className="term-chip" key={i}>
                <span className="he">{it.he}</span>
                {translit && it.tl && <span className="tl">{it.tl}</span>}
                {it.en && <span className="en">{it.en}</span>}
              </span>
            ))}
          </div>
        );
      case "cast":
        return (
          <div className={"blk blk-cast n" + Math.min(b.items.length, 6)}>
            {b.items.map((it, i) => (
              <figure className="cast-card" key={i}>
                <img src={it.src} alt={it.name || ""} />
                <figcaption>
                  {it.he && <span className="he">{it.he}</span>}
                  {it.name && <span className="name">{it.name}</span>}
                  {it.caption && <span className="cap"><Inline text={it.caption} /></span>}
                </figcaption>
              </figure>
            ))}
          </div>
        );
      case "figure":
        return (
          <figure className="blk blk-figure">
            <img src={b.src} alt={b.caption || ""} />
            {b.caption && <figcaption><Inline text={b.caption} /></figcaption>}
          </figure>
        );
      default:
        return null;
    }
  }

  /* ─── Slides ──────────────────────────────────────────────────────── */
  function IntroSlide({ L }) {
    return (
      <div className="intro">
        <div className="intro-text">
          {L.summary.map((p, i) => <p className="intro-lead" key={i}><Inline text={p} /></p>)}
          <div className="intro-toc">
            <div className="intro-toc-title">In this level</div>
            {L.lessons.map((ls, i) => (
              <div className="toc-row" key={ls.id}>
                <span className="num">{K().pad2(i + 1)}</span>
                <span>{ls.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="intro-art">
          <img src="assets/boy-learning.png" alt="A student preparing to learn" />
        </div>
      </div>
    );
  }

  function LessonSlide({ lesson, reveal }) {
    return (
      <>
        <div className="slide-context">
          {lesson.intro.map((p, i) => <p key={i}><Inline text={p} /></p>)}
        </div>
        <div className="blocks">
          {lesson.blocks.map((b, i) => (
            <div className={"fade" + (reveal >= i + 1 ? " on" : "")} key={i}>
              <Block b={b} />
            </div>
          ))}
        </div>
      </>
    );
  }

  /* ─── Screen ──────────────────────────────────────────────────────── */
  function LessonScreen({ levelNum, onDone, onBack, onSwitchStage, onAsk }) {
    const L = K().level(levelNum);
    const slides = [{ intro: true, title: `Level ${levelNum} — ${L.name}`, dek: L.tagline, sources: [], max: 0 }]
      .concat(L.lessons.map((ls) => ({ lesson: ls, title: ls.title, dek: ls.dek, sources: ls.sources || [], max: ls.blocks.length })));
    const [idx, setIdx] = useState(0);
    const [reveal, setReveal] = useState(0);
    const [drawer, setDrawer] = useState(false);
    const areaRef = useRef(null);

    const slide = slides[idx];
    const atLastReveal = reveal >= slide.max;
    const atLastSlide = idx >= slides.length - 1;
    const sources = slide.sources.map(sourceFor);

    const advance = useCallback(() => {
      if (drawer) return;
      if (!atLastReveal) { setReveal((v) => v + 1); K().sfx.tap(); return; }
      if (!atLastSlide) { setIdx((i) => i + 1); setReveal(0); K().sfx.step(); return; }
      onDone();
    }, [atLastReveal, atLastSlide, drawer, onDone]);
    const back = useCallback(() => {
      if (drawer) { setDrawer(false); return; }
      if (reveal > 0) { setReveal((v) => v - 1); return; }
      if (idx > 0) { setIdx((i) => i - 1); setReveal(slides[idx - 1].max); return; }
      onBack && onBack();
    }, [drawer, reveal, idx, onBack, slides]);
    const jumpTo = (i) => { setIdx(i); setReveal(slides[i].max); };

    useEffect(() => {
      const onKey = (e) => {
        if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
        if (e.key === "Escape" && drawer) { e.preventDefault(); setDrawer(false); return; }
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); advance(); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); back(); }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [advance, back, drawer]);

    useEffect(() => { if (areaRef.current) areaRef.current.scrollTop = 0; }, [idx]);
    // Keep the newest block in view.
    useEffect(() => {
      if (!areaRef.current || reveal === 0) return;
      const el = areaRef.current.querySelectorAll(".blocks > .fade")[reveal - 1];
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
    }, [reveal]);

    const continueLabel = atLastReveal ? (atLastSlide ? "Prove yourself" : "Next lesson") : "Continue";

    return (
      <div className="learn">
        <TopBar levelNum={levelNum} stage="learn" onStageChange={onSwitchStage} onExit={onBack} onAsk={onAsk} />
        <div className="slide-area" ref={areaRef}>
          <div className="slide-head">
            <div className="slide-eyebrow-row">
              <div className="slide-eyebrow">
                <span className="step">Level {K().pad2(levelNum)} · Learn</span>
                <span className="sep" />
                <span>{idx === 0 ? "Overview" : `Lesson ${K().pad2(idx)} of ${K().pad2(slides.length - 1)}`}</span>
              </div>
              <div className="lesson-progress" role="tablist" aria-label="Lesson progress">
                {slides.map((_, i) => (
                  <button key={i} type="button" className={"dot " + (i === idx ? "current" : i < idx ? "done" : "future")}
                    onClick={(e) => { e.stopPropagation(); jumpTo(i); }} aria-label={i === 0 ? "Overview" : "Lesson " + i} aria-current={i === idx ? "step" : undefined} />
                ))}
              </div>
            </div>
            <h1 className="slide-title">{slide.title}</h1>
            {slide.dek && <p className="slide-dek">{slide.dek}</p>}
          </div>
          <div className="slide-canvas" key={idx}>
            {slide.intro ? <IntroSlide L={L} /> : <LessonSlide lesson={slide.lesson} reveal={reveal} />}
          </div>
        </div>

        <div className="dock" onClick={(e) => e.stopPropagation()}>
          <div className="dock-left">
            <button type="button" className="btn ghost back" onClick={back}><span className="arrow">←</span><span>Back</span></button>
          </div>
          <div className="dock-mid">
            {sources.length > 0 ? (
              <button type="button" className="source-link" onClick={() => setDrawer(true)}>
                <span className="src-label">{sources.length > 1 ? "Sources" : "Source"}</span>
                <span className="src-cite">{sources.length === 1 ? sources[0].cite : sources[0].cite + " + " + (sources.length - 1) + " more"}</span>
                <span className="src-arrow">↗</span>
              </button>
            ) : <span style={{ opacity: 0 }} aria-hidden="true">·</span>}
          </div>
          <div className="dock-right">
            {!atLastReveal && <span className="dock-count">{reveal}/{slide.max}</span>}
            <button type="button" className={"btn primary " + (atLastReveal && atLastSlide ? "gold" : "")} onClick={advance}>
              <span>{continueLabel}</span><span className="arrow">→</span>
            </button>
          </div>
        </div>

        {drawer && <SourceScroll sources={sources} onClose={() => setDrawer(false)} />}
      </div>
    );
  }

  Object.assign(window, { LessonScreen, LessonBlock: Block });
})();
