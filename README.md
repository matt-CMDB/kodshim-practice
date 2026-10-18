# Kodshim Training

A small game for learning the laws of korbanot (Temple offerings) from the
Rambam's Mishneh Torah, one level at a time. Five levels, fifteen steps up to
the Ezras Yisrael, the Levi'im's music layering as you climb.

## Kodshim Quest (new)

`quest/` holds a second, separate game built on the same content: a
top-down, Pokémon-style adventure. You play a trainee in Temple-era
Yerushalayim. "Wild" animals appear in the tall grass of the pastures outside
Sha'ar HaTzon and you name them (keves, ayil, pilgas, egel, par...) from their
species, sex and exact age to register them in your Sefer HaKorbanos; pilgrims
on the road challenge you when you cross their line of sight; the kohen at each
gate is the boss, and the badges are the Mikdash's own seals from Shekalim 5:3.
Level 1 (the pastures) covers the five species, names, ages and blemishes;
Level 2 (the city) covers olah, chatas, asham and shelamim, kodshei kodashim
vs. kodashim kalim, and where each is slaughtered and eaten.

```
cd quest
python3 -m http.server 8766
# then open http://localhost:8766/
```

Controls: arrows / WASD move, Z / Space / Enter confirm and talk, X cancel
(hold to run), Esc menu (Sefer, save, music). Progress is saved in
`localStorage` under `kodshim.quest.v1`. On GitHub Pages it is published at
`https://<owner>.github.io/kodshim-practice/quest/`.

The look is "HD-2D": 16px pixel art rendered at 2× (3× on very large
screens) with a lighting pass on top (soft shadows, ambient occlusion, bloom,
a tilt-shift blur at the edges, drifting dust) and a high-resolution glass UI.

Layout: `js/content.js` (every fact, lesson and question, with Rambam and
Vayikra sources), `js/rules.js` (the animal and korban generators that grade
answers from those rules), `js/sprites.js` and `js/tiles.js` (all pixel art,
drawn in code), `js/maps.js`, `js/engine.js`, `js/battle.js`, `js/sefer.js`,
`js/audio.js` (chiptune, no samples).

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
