# Kodshim Training

A small game for learning the laws of korbanot (Temple offerings) from the
Rambam's Mishneh Torah, one level at a time. Five levels, fifteen steps up to
the Ezras Yisrael, the Levi'im's music layering as you climb.

## Kodshim Quest

Kodshim Quest, the Pokémon-style game built on the same content, now lives in
its own repository, [kodshim-quest](https://github.com/matt-CMDB/kodshim-quest),
and is played at https://jewishai.me/kodshim-quest/. The old `quest/` address
on this site redirects there.

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
push to `main` that touches the app. Once Pages is
enabled for the repository (Settings → Pages → Source: GitHub Actions), the game
lives at `https://<owner>.github.io/kodshim-practice/`.

## How it is organized

```
web-app/
  kodshim-training.html    page shell, script order
  kodshim-engine.js        progress, review scheduler, question picker, sound
  kodshim-music.js         the Ma'alot score: a WebAudio synth for the five instruments
  kodshim-app.jsx          screens and routing
  kodshim-map.jsx          the journey map, level sheet, menu, settings, about
  kodshim-scene.jsx        the courtyard scene: lesson scripts, boards, dialogue, runs
  kodshim-quiz.jsx         the answer surfaces (mc, tap, cloze, pic, tf, match, sort)
  kodshim-ui.jsx           shared bits (inline markup, stars, modal, source scroll)
  content/level-N.js       lessons + concepts + quiz bank per level
  kodshim-sources.js       generated: cited Hebrew texts + English
  kodshim-play.css         the map and the scene
  kodshim-game.css         stars, modals, settings, music card
tools/
  csv_to_levels.py         CSV → tools/levels-json/level-N.json (normalized cites)
  build_sources.py         pulls cited passages from source-material/ → kodshim-sources.js
  translate_sources.py     fills tools/translations.json through OpenRouter (one-off)
  check_level.js           validates a content file against docs/CONTENT-SCHEMA.md
  crosscheck_content.py    second-model review of a level's content (OpenRouter)
  map_checks.js            proposes which quiz cards each lesson uses as checks
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

## Music

The Levi'im's five instruments (kinor, nevel, chalil, chatzotzrah,
tziltzel) join one at a time as you clear stages. Menu → Music has a mixer
and a Preview button that plays the full ensemble; the preview only runs
while that card is open. Settings → Score switches between the recorded
Seikilos arrangement and the synthesized Ma'alot score.
