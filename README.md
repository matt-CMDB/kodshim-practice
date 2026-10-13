# Kodshim Training

A small game for learning the laws of korbanot (Temple offerings) from the
Rambam's Mishneh Torah, one level at a time. Five levels, fifteen steps up to
the Ezras Yisrael, the Levi'im's music layering as you climb.

## Run it

The game is a static page. It needs to be served over HTTP (not opened as a
`file://` URL), because the lesson files are loaded with script tags and
Babel compiles the components in the browser.

```
cd web-app
python3 -m http.server 8765
# then open http://localhost:8765/kodshim-training.html
```

Any static server works (VS Code's Live Server, `npx serve`, etc.). React and
Babel are vendored under `web-app/vendor/`, so nothing is fetched from a CDN
except the Google Fonts.

## Online

`.github/workflows/pages.yml` publishes `web-app/` to GitHub Pages on every
push to `main` (and to the revamp branch) that touches the app. Once Pages is
enabled for the repository (Settings → Pages → Source: GitHub Actions), the game
lives at `https://<owner>.github.io/kodshim-practice/`.

## How it is organized

```
web-app/
  kodshim-training.html    page shell, script order
  kodshim-engine.js        progress, review scheduler, question picker, sound, tutor client
  kodshim-app.jsx          screens and routing
  kodshim-map.jsx          the staircase, level cards, settings, about
  kodshim-learn.jsx        Level 1's illustrated lessons (bespoke), TopBar, source drawer
  kodshim-lesson.jsx       generic lesson renderer for levels 2–5
  kodshim-quiz.jsx         question kinds, feedback card, the quiz run
  kodshim-tutor.jsx        "Ask the kohen" drawer
  kodshim-ui.jsx           shared bits (inline markup, stars, modal)
  content/level-N.js       lessons + concepts + quiz bank per level
  kodshim-sources.js       generated: cited Hebrew texts + English
  kodshim-game.css         styles for everything added in the revamp
tools/
  csv_to_levels.py         CSV → tools/levels-json/level-N.json (normalized cites)
  build_sources.py         pulls cited passages from source-material/ → kodshim-sources.js
  translate_sources.py     fills tools/translations.json through OpenRouter (one-off)
  check_level.js           validates a content file against docs/CONTENT-SCHEMA.md
  crosscheck_content.py    second-model review of a level's content (OpenRouter)
docs/
  DESIGN.md                game design
  CONTENT-SCHEMA.md        the content format
```

`kodshim-practice.csv` is the test bank and the source of truth for the
halachic content. To change a level, edit `web-app/content/level-N.js`
(wording, lessons, quiz items) and run:

```
node tools/check_level.js web-app/content/level-N.js
python3 tools/build_sources.py      # if you cited a passage that was not cited before
```

## Progress and settings

Everything is stored in the browser's `localStorage` (`kodshim.progress.v2`
and `kodshim.settings.v2`). Settings → Reset progress wipes it.

## The tutor

"Ask the kohen" calls OpenRouter straight from the browser with a key you
paste into Settings. The key never leaves your browser. The default model is
`anthropic/claude-haiku-5.5`; any OpenRouter model id works.
