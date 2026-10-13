# Level content schema

Each level lives in `web-app/content/level-N.js` and registers itself on
`window.KODSHIM_LEVELS[N]`. The file is plain JavaScript (no JSX, no imports)
so it can be loaded with a `<script>` tag and edited by hand.

The CSV (`kodshim-practice.csv`) is the test bank and the source of truth for
every halachic claim. Lessons explain the concepts in the CSV; quiz items test
them. Do not introduce halachic claims that are not in the CSV rows for the
level, apart from neutral framing (what a word means, how topics relate).

```js
window.KODSHIM_LEVELS = window.KODSHIM_LEVELS || {};
window.KODSHIM_LEVELS[2] = {
  num: 2,
  name: "Basic categorization",           // CSV level-name, may be lightly polished
  he: "סוּגֵי הַקָּרְבָּנוֹת",               // short Hebrew title with nikud
  tagline: "Four kinds, two grades of holiness, and the words for all of it.",
  summary: [                               // 1-3 paragraphs for the level's opening card
    "Plain text paragraph. Inline Hebrew is written as {{he:עוֹלָה}}.",
  ],
  scope: "Maaseh HaKorbanot 1:2–1:18, 5:8, 10:1–10:5",   // where the Rambam covers it
  lessons: [ /* Lesson */ ],
  concepts: [ /* Concept */ ],
  quiz: [ /* QuizItem */ ],
};
```

## Inline markup

Text fields (`summary`, `intro`, `text`, `explain`, `line`) are plain strings.
Two inline markers are allowed:

- `{{he:עוֹלָה}}` renders a Hebrew span (with nikud, please).
- `**bold**` renders bold.

No HTML, no other markdown.

## Lesson

```js
{
  id: "L2-01",
  title: "The four categories of korban",
  dek: "Every offering — communal or individual — fits one of four kinds.",
  sources: ["Maaseh HaKorbanot 1:2", "Vayikra 1:9"],   // cite strings, see below
  intro: ["paragraph", "paragraph"],                   // 1-3 paragraphs, shown above the blocks
  blocks: [ /* Block */ ],                             // 2-4 blocks; each block is one reveal step
}
```

### Blocks

Each block is revealed by one click/keypress, in order.

```js
{ type: "cards", items: [ { he: "עוֹלָה", tl: "olah", en: "burnt offering", text: "One sentence." } ] }
// 2-6 term cards in a grid. `he` is required; `tl` and `en` are short; `text` is one or two sentences.

{ type: "table", caption: "Where each grade is slaughtered and eaten",
  cols: ["", "Kodshei kodashim", "Kodashim kalim"],
  rows: [ ["Slaughtered", "North of the courtyard", "Anywhere in the courtyard"],
          ["Eaten by", "Male kohanim", "Anyone tahor"] ] }
// Cells are plain strings (inline markers allowed). First column is the row label.

{ type: "compare", left:  { title: "Korban tzibur", he: "קָרְבַּן צִבּוּר", items: ["...", "..."] },
                   right: { title: "Korban yachid", he: "קָרְבַּן יָחִיד", items: ["...", "..."] } }
// Two columns side by side, 2-5 short items each.

{ type: "callout", title: "The rule", text: "One to three sentences that state the key halacha." }

{ type: "steps", items: [ { title: "Shechitah", he: "שְׁחִיטָה", text: "..." } ] }
// An ordered sequence, 3-6 steps.

{ type: "list", title: "Which chatot are burned", items: ["...", "..."] }

{ type: "terms", items: [ { he: "נוֹתָר", tl: "notar", en: "left over past its time" } ] }
// A row of chips for vocabulary, 3-8 items.

{ type: "figure", src: "assets/ram.png", caption: "An ayil — the asham animal." }
// Only use images that exist under web-app/assets/ (see the list in the task prompt).

{ type: "cast", items: [ { src: "assets/cast/yoledet.png", he: "יוֹלֶדֶת", name: "The yoledet", caption: "What she brings." } ] }
// A row of character portraits (web-app/assets/cast/) with a Hebrew label, a name and a one-line caption; 1-4 items.
```

## Concept

One entry per CSV row for the level, in CSV order. These drive the Review
flashcards and ground the in-game tutor. Copy `q`, `a`, `qHe`, `aHe` from the
CSV (fix obvious typos only), and copy the normalized cites.

```js
{ id: "L2-C01", q: "What are the four main types of individual animal korbanot?",
  a: "Olah, chatat, asham, and shelamim.",
  qHe: "מהם ארבעת סוגי קרבנות הבהמה העיקריים?", aHe: "עוֹלָה, חַטָּאת, אָשָׁם, וּשְׁלָמִים.",
  tanach: ["Vayikra 1-7"], rambam: ["Maaseh HaKorbanot 1:2"] }
```

## QuizItem

Every item has `id`, `kind`, `prompt`, `explain`, `cite`, and the fields for
its kind. `explain` is one or two sentences shown after the learner answers,
whether right or wrong: state the correct answer and the reason. `cite` is a
single cite string (the best one) or `null`.

```js
{ id: "L2-Q01", kind: "mc",
  prompt: "Which korban is the only one the owner eats from?",
  options: ["Olah", "Chatat", "Asham", "Shelamim"],      // 3-4 options, exactly one correct
  answer: 3,
  explain: "Shelamim is shared three ways — eimurin to the altar, chazeh and shok to the kohen, the rest to the owner.",
  cite: "Maaseh HaKorbanot 1:2" }

{ id: "L2-Q02", kind: "tap",            // "tap the right Hebrew word"
  prompt: "Which word means the fats burned on the altar?",
  options: ["אֵימוּרִין", "אַלְיָה", "נוֹתָר", "פִּגּוּל"],   // Hebrew with nikud, one correct
  answer: 0, explain: "...", cite: "Maaseh HaKorbanot 1:17" }

{ id: "L2-Q03", kind: "match",          // tap a Hebrew term, then its meaning
  prompt: "Match each term to its meaning.",
  pairs: [ { hebrew: "עוֹלָה", english: "entirely burned; nothing eaten" }, ... ],   // 3-4 pairs
  explain: "...", cite: "..." }

{ id: "L2-Q04", kind: "sort",           // drag chips into buckets
  prompt: "Sort each korban by its holiness grade.",
  buckets: [ { id: "kk", he: "קָדְשֵׁי קָדָשִׁים", en: "Most holy" }, { id: "kalim", he: "קָדָשִׁים קַלִּים", en: "Lighter holies" } ],
  items: [ { hebrew: "עוֹלָה", translit: "olah", bucket: "kk" }, ... ],    // 4-6 chips, 2-3 buckets
  explain: "...", cite: "..." }

{ id: "L2-Q05", kind: "tf",             // "Kosher or pasul?" style true/false
  prompt: "Kodashim kalim may be eaten anywhere in Jerusalem by any tahor person.",
  answer: true,
  explain: "...", cite: "Maaseh HaKorbanot 10:5" }

{ id: "L2-Q06", kind: "cloze",          // pick the word that completes the sentence
  prompt: "Kodshei kodashim must be slaughtered in the ____ of the courtyard.",
  options: ["north", "south", "east", "west"],
  answer: 0,
  explain: "...", cite: "Maaseh HaKorbanot 5:8" }
```

### Quiz authoring rules

- 18–24 items per level, covering every concept in the CSV at least once.
- Mix of kinds: roughly 8 mc, 3 tap, 2–3 match, 2–3 sort, 3 tf, 2 cloze.
- Ids are `L<level>-Q<two digits>` in order.
- Distractors must be plausible to a learner and clearly wrong according to the
  CSV. Prefer distractors that are *other real things from the same level*
  (another korban, another animal, another place) over made-up ones.
- Never use "all of the above" / "none of the above".
- Randomize where the correct answer sits; do not always put it first.
- A `tf` set should be about half true, half false. A false statement should
  flip one specific detail (a number, a species, a place), not be absurd.
- Wording: short, concrete, a learner can answer in under 20 seconds.
- Hebrew terms with nikud. Transliteration follows the CSV style:
  korban/korbanot, chatat, asham, shelamim, olah, mincha, kohen, tahor, tzibur,
  yachid, kodshei kodashim, kodashim kalim.

## Checks

Each level also carries a `checks` map from lesson id to the quiz ids the
scene asks during that lesson, spread across its blocks:

```js
window.KODSHIM_LEVELS[2].checks = { "L2-01": ["L2-Q01", "L2-Q02"], ... };
```

`node tools/map_checks.js` proposes a mapping by word overlap; adjust by hand.
Cards in `cards` blocks may carry an `img` (shown on the board), and a `pic`
quiz kind shows picture options: `{ kind: "pic", options: [{ img, label }], answer }`.

## Cite strings

`"<Book> <chapter>:<halacha>"`, with the book names used by the CSV splitter:

Rambam: `Maaseh HaKorbanot`, `Temidin uMusafin`, `Mechusrei Kapparah`,
`Shegagot`, `Korban Pesach`, `Chagigah`, `Bechorot`, `Nezirut`, `Sotah`,
`Avodat Yom HaKippurim`, `Pesulei HaMukdashin`, `Meilah`, `Biat HaMikdash`,
`Issurei Biah`.

Tanach: `Vayikra`, `Bamidbar`, `Devarim`, `Shemot`, `Tehillim`.

Ranges are written `Vayikra 7:15-16`. Use only cites that appear in the
level's JSON (`tools/levels-json/level-N.json`) or that are adjacent halachot
in the same chapter when a lesson clearly needs them.
