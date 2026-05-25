# Level 1 — Animals for Korbanos

This file is the source of truth for what every slide in Level 1 teaches.
Each section names the primary source(s), the explanatory context the learner
should read in the main pane, the verse/passage that lives on the scroll at the
top of the slide, and the build sequence (which words on the scroll highlight
as which card appears).

When this file stabilizes I'll write a small parser that turns it into the
in-slide build sequence — no need to hand-edit JSX as you iterate on content.

---

## Conventions

- `>` blocks = the actual source text, in the original language. Hebrew quotes
  use nikkud + te'amim where available; for Tanach I'll pull from the
  `Tanach with Ta'amei Hamikra` JSON in `source-material/` so the on-scroll
  display matches the printed Torah exactly.
- "Scroll" = the small Torah-scroll widget at the top of the slide. It holds
  one passage (or rolls between two) for the duration of the slide.
- Build steps: numbered list. Each step is one click in the slide.
  - **Highlight** — words on the scroll that light up that click.
  - **Reveal**    — card/element that appears in the main pane that click.
- Use absolute references (`Vayikra 1:2`, `Maaseh HaKorbanot 1:14`) so the
  parser can pull canonical text from `source-material/` automatically.

---

## Slide 0 — Welcome / table of contents

**Type:** orientation slide. No scroll.
**Visual:** `assets/boy-learning.png` on the right with the context paragraph text on the left.

### Context paragraph (main pane)

> The laws of korbanos — Temple offerings — fill the entire middle section of
> the Torah and most of Seder Kodshim in the Mishnah and Gemara. Before any of
> those laws can be understood, it is necessary to master the framework: which
> living creatures are eligible for the altar, what those creatures are called at
> each age, which four master categories every korban falls into, and how the
> Torah distinguishes between what a community may bring and what only an
> individual may bring. **Level 1** covers this framework. It follows the
> entire first chapter of the Rambam's *Hilchos Maaseh HaKorbanot* — the
> introductory chapter of his Laws of Sacrificial Procedure — from halacha 1:1
> to 1:18.

---

## Slide 1 — The five species

### Context paragraph (main pane)

> The Rambam opens his Laws of Sacrificial Procedure by establishing that of
> every animal alive, the Torah designates only **five** species as eligible for
> the altar: three mammals from the herd and flock, and two kinds of bird.
> No other creature — however otherwise kosher for eating — may be brought.
>
> The mammals are established by the opening verse of Vayikra: cattle (`בָּקָר`)
> and flock (`צֹאן`). The flock comprises sheep and goats, two sub-types
> distinguished throughout the Torah. The birds are established by Vayikra 1:14:
> turtle-doves (`תּוֹרִים`) and young pigeons (`בְּנֵי יוֹנָה`).
> Plant-based offerings — flour, wine, oil — are a separate system governed by
> their own laws.

### Primary source

**Maaseh HaKorbanot 1:1**
> כָּל הַקָּרְבָּנוֹת שֶׁל מִינֵי נֶפֶשׁ חַיָּה בָּאִין מֵחֲמִשָּׁה מִינִין בִּלְבַד.
> מִן הַבָּקָר וּמִן הַכְּבָשִׂים וּמִן הָעִזִּים וּמִן הַתּוֹרִים וּמִן בְּנֵי הַיּוֹנָה.

**Translation**
> All offerings of living creatures come from five species only: cattle,
> sheep, goats, turtle-doves, and young pigeons.

### Tanach source (mammals)

**Vayikra 1:2**
> דַּבֵּ֞ר אֶל־בְּנֵ֤י יִשְׂרָאֵל֙ וְאָמַרְתָּ֣ אֲלֵהֶ֔ם
> אָדָ֗ם כִּֽי־יַקְרִ֥יב מִכֶּ֛ם קָרְבָּ֖ן לַֽיהוָ֑ה
> מִן־הַבְּהֵמָ֗ה מִן־הַבָּקָר֙ וּמִן־הַצֹּ֔אן תַּקְרִ֖יבוּ אֶת־קָרְבַּנְכֶֽם׃

**Translation**
> "Speak to the Children of Israel and say to them: When a person from among
> you brings an offering to Hashem — from the animals, from the cattle or from
> the flock, you shall bring your offering."

### Tanach source (birds)

**Vayikra 1:14**
> וְאִ֧ם מִן־הָע֛וֹף עֹלָ֥ה קָרְבָּנ֖וֹ לַֽיהוָ֑ה
> וְהִקְרִ֣יב מִן־הַתֹּרִ֗ים א֛וֹ מִן־בְּנֵ֥י הַיּוֹנָ֖ה אֶת־קָרְבָּנֽוֹ׃

**Translation**
> "If his offering to Hashem is an olah from the bird, he shall bring his
> offering from the turtle-doves or from the young pigeons."

### Scroll content

Vayikra 1:2 opens the slide. After the mammals are filled in, the scroll
rolls forward to Vayikra 1:14 for the birds.

### Build sequence

| # | Camera | Highlight | Reveal |
|---|---|---|---|
| 1 | overview | — | scroll shows 1:2; "Animals" root visible |
| 2 | mammals subtree | `מִן־הַבְּהֵמָה` | "Mammals" branch (`בְּהֵמָה`) |
| 3 | mammals subtree | `מִן־הַבָּקָר` | "Cattle" leaf (`בָּקָר`) |
| 4 | mammals subtree | `וּמִן־הַצֹּאן` | "Flock" branch (`צֹאן`) + children Sheep + Goats |
| 5 | overview | — | _(scroll rolls to 1:14)_ |
| 6 | birds subtree | `מִן־הָעוֹף` | "Birds" branch (`עוֹף`) |
| 7 | birds subtree | `מִן־הַתֹּרִים` | "Turtle-doves" leaf |
| 8 | birds subtree | `מִן־בְּנֵי הַיּוֹנָה` | "Young pigeons" leaf |
| 9 | overview | — | tally pill: "5 species in total" |

### Notes

- The mammals verse names `בְּהֵמָה` as the umbrella, then `בָּקָר` and `צֹאן`
  as the two sub-types. The flock (`צֹאן`) doesn't itself say "sheep or goats"
  in this verse; that split emerges from later Torah usage.
- `נֶפֶשׁ חַיָּה` in Rambam covers anything alive; the point of his framing is
  to exclude inanimate sacrifices (flour, wine — those are separate categories
  with their own laws).

---

## Slide 2 — Naming the animals

### Context paragraph (main pane)

> Each of the three mammal species has a distinct Hebrew name for the young
> animal and for the grown one. The Torah is precise: a `כֶּבֶשׂ` and an
> `אַיִל` are both male sheep, but they name different age categories and are
> not interchangeable in a korban specification.
>
> The Rambam rules: wherever the Torah says `כֶּבֶשׂ`, `כַּבְשָׂה`, or
> `כְּבָשִׂים`, the animal is in its first year; wherever it says `אַיִל` or
> `אֵילִים`, it is a male in its second year. The same precision applies to
> goats and cattle. Age is measured **to the hour** for all mammal offerings.
> An animal that crosses from one age category to the next — even by one hour
> between slaughter and blood-sprinkling — is disqualified, because the valid
> age window must hold through the final step of zerikah.
>
> For birds, eligibility is determined by physical maturity, not by age in
> days. A turtledove must be adult; a young pigeon must be young. Each is
> invalid at the other's stage.

### Primary source

**Maaseh HaKorbanot 1:14**
> כָּל מָקוֹם שֶׁנֶּאֱמַר בַּתּוֹרָה כֶּבֶשׂ אוֹ כַּבְשָׂה אוֹ כְּבָשִׂים
> הֲרֵי אֵלּוּ בְּנֵי שָׁנָה.
> וְכָל מָקוֹם שֶׁנֶּאֱמַר אַיִל אוֹ אֵילִים הֵם הַזְּכָרִים בְּנֵי שְׁנָתַיִם.
> וּמֵאֵימָתַי יִקָּרֵא אַיִל — מִשֶּׁיִּכָּנֵס בְּשָׁנָה שְׁנִיָּה אֶחָד וּשְׁלֹשִׁים יוֹם.
> אֲבָל בְּיוֹם שְׁלֹשִׁים אֵינוֹ כָּשֵׁר לֹא לְכֶבֶשׂ וְלֹא לָאַיִל וְהוּא הַנִּקְרָא פִּלְגָּס.
> וְכָל מָקוֹם שֶׁנֶּאֱמַר בּוֹ עֵגֶל הֲרֵי זֶה בֶּן שָׁנָה.
> פַּר בֶּן שְׁתַּיִם.
> שְׂעִיר עִזִּים בֶּן שָׁנָה. שָׂעִיר בֶּן שְׁתַּיִם.

**Translation (paraphrased for the explanatory pane)**
> Wherever the Torah says `כֶּבֶשׂ`, `כַּבְשָׂה`, or `כְּבָשִׂים` — these are
> in their first year. `אַיִל` / `אֵילִים` — males in their second year.
> (A sheep enters the ayil category on day 31 of its second year; day 30 is
> the `פִּלְגָּס` — valid as neither.) `עֵגֶל` — first year. `פַּר` — second year.
> `שְׂעִיר עִזִּים` — first-year male goat. `שָׂעִיר` — second year.

### Hours rule

**Maaseh HaKorbanot 1:13**
> שָׁעוֹת מוֹנִין לְקָדָשִׁים. וְאִם הוֹסִיפוּ שָׁעָה אַחַת אוֹ פָּחֲתוּ שָׁעָה פְּסוּלִין.
> כֵּיצַד — קָרְבָּן שֶׁמִּצְוָתוֹ לִהְיוֹת בֶּן שָׁנָה אִם הוֹסִיף עַל הַשָּׁנָה שָׁעָה
> אַחַת נִפְסַל. אֲפִלּוּ הָיָה בֶּן שָׁנָה בִּשְׁעַת שְׁחִיטָה וְהוֹסִיף עַל הַשָּׁנָה
> בִּשְׁעַת זְרִיקָה נִפְסַל עַד שֶׁיִּהְיֶה בֶּן שָׁנָה עַד שְׁעַת זְרִיקָה.

**Translation**
> Hours are counted for sacred offerings. If [the animal] exceeded [its valid
> age window] by one hour, or was lacking one hour, it is invalid. For example:
> an offering that must be in its first year — if it exceeded the year by even
> one hour, it is invalid. Even if it was in its first year at the time of
> slaughter, but it crossed into the second year by the time of blood-sprinkling,
> it is invalid — it must remain within its first year all the way through
> zerikah.

### Scroll content

Maaseh HaKorbanot 1:14, displayed in full. Each row of the 3×3 grid maps to
a phrase in this halacha. The hours rule (1:13) appears as a secondary passage
at the bottom of the scroll.

### Build sequence (cell-by-cell)

The grid is laid out as cattle / sheep / goats across the columns, and
young / adult male / adult female down the rows.

| # | Cell | Highlight phrase | Reveal |
|---|---|---|---|
| 1 | A1 — cattle / young | `עֵגֶל` | calf — `עֵגֶל` |
| 2 | A2 — sheep / young | `כֶּבֶשׂ … כַּבְשָׂה … כְּבָשִׂים` | lamb — `כֶּבֶשׂ` |
| 3 | A3 — goat / young | `שְׂעִיר עִזִּים בֶּן שָׁנָה` | kid goat — `שְׂעִיר עִזִּים` |
| 4 | B1 — cattle / adult male | `פַּר בֶּן שְׁתַּיִם` | bull — `פַּר` |
| 5 | B2 — sheep / adult male | `אַיִל אוֹ אֵילִים` | ram — `אַיִל` |
| 6 | B3 — goat / adult male | `שָׂעִיר בֶּן שְׁתַּיִם` | he-goat — `שָׂעִיר` |
| 7 | C1 — cattle / female | _(derived — `פָּרָה`)_ | cow — `פָּרָה` |
| 8 | C2 — sheep / female | _(derived — `כַּבְשָׂה` from step 2)_ | ewe — `כַּבְשָׂה` / `רָחֵל` |
| 9 | C3 — goat / female | _(derived — `עֵז`)_ | she-goat — `עֵז` |
| 10 | pilgas banner | `בְּיוֹם שְׁלֹשִׁים אֵינוֹ כָּשֵׁר` | Pilgas strip — day 30 of yr 2, valid as neither |
| 11 | hours banner | _(scroll rolls; Rambam 1:13)_ `שָׁעוֹת מוֹנִין לְקָדָשִׁים` | "Hours count — to the hour" warning banner |

### Notes

- The Rambam in 1:14 names the young goat `שְׂעִיר עִזִּים` and the older one
  `שָׂעִיר`. The app grid uses the more familiar `גְּדִי` (kid) and `תַּיִשׁ`
  (he-goat), with the Rambam's terms shown as alternates on the detail card.
- Female cattle, sheep, and goats have no dedicated entry in 1:14; `פָּרָה`,
  `רָחֵל`, `עֵז` come from elsewhere in the Torah (Vayikra 4:28, 4:32, Bereishit
  32:15, etc.). The explanatory paragraph can handle them with "the feminine
  forms are derived from Torah usage elsewhere."
- The pilgas (day 30 of year 2) is an edge case worth highlighting: it qualifies
  as neither keves nor ayil, so it is invalid regardless of which one the
  korban requires.
- The hours rule (1:13) is placed last in the build sequence so it doesn't
  distract from the basic naming table.

---

## Slide 3 — How old is old enough?

### Context paragraph (main pane)

> Eligibility for the altar is also a matter of age. A mammal offering may not
> be brought before the animal has completed its first seven days of life
> (Vayikra 22:27). From the eighth day onward the animal is valid *b'di'eved*,
> but the Rambam rules that *l'chatchila* one should wait until the thirtieth
> day. The three exceptions — bechor, pesach, and ma'aser — may be offered from
> day eight as a first preference.
>
> Every mammal species also has a maximum age. Cattle may be offered through
> three full years; sheep and goats through two full years. Beyond those limits
> the animal is considered `זָקֵן` (old) and may not be brought.
>
> Age windows are measured from the hour of birth ("from day to day,"
> `מִיּוֹם לְיוֹם`). If a leap-year month extended the animal's year, that
> extension carries over to its eligibility window.

### Primary sources

**Maaseh HaKorbanot 1:11** _(age cutoffs — from the shlamim halacha)_
> הַקְּטַנִּים הֵם מִבֶּן שְׁמוֹנַת יָמִים עַד שָׁנָה תְּמִימָה מִיּוֹם לְיוֹם.
> אִם נִתְעַבְּרָה שָׁנָה נִתְעַבְּרָה לוֹ.
> וְהַגְּדוֹלִים בַּבָּקָר עַד שָׁלֹשׁ שָׁנִים שְׁלֵמוֹת מִיּוֹם לְיוֹם.
> וּבַצֹּאן עַד שְׁתֵּי שָׁנִים שְׁלֵמוֹת מִיּוֹם לְיוֹם.
> יוֹתֵר עַל זֶה הֲרֵי הוּא זָקֵן וְאֵין מַקְרִיבִין אוֹתוֹ.

**Maaseh HaKorbanot 1:12** _(day-8 vs. day-30 preference)_
> אַף עַל פִּי שֶׁכָּל הַקָּרְבָּנוֹת כְּשֵׁרִין מִיּוֹם הַשְּׁמִינִי וָהָלְאָה
> אֵין מַקְרִיבִין לְכַתְּחִלָּה אֶלָּא מִיּוֹם שְׁלֹשִׁים וָהָלְאָה.
> חוּץ מִן הַבְּכוֹר וּמִן הַפֶּסַח וּמִן הַמַּעֲשֵׂר שֶׁאִם רָצָה לְהַקְרִיבָן
> בַּשְּׁמִינִי לְכַתְּחִלָּה מַקְרִיב.

### Tanach source

**Vayikra 22:27**
> שׁ֣וֹר אוֹ־כֶ֤שֶׂב אוֹ־עֵז֙ כִּ֣י יִוָּלֵ֔ד וְהָיָ֛ה שִׁבְעַ֥ת יָמִ֖ים תַּ֣חַת אִמּ֑וֹ
> וּמִיּ֤וֹם הַשְּׁמִינִי֙ וָהָ֔לְאָה יֵרָצֶ֗ה לְקָרְבַּ֛ן אִשֶּׁ֖ה לַֽיהוָֽה׃

**Translation**
> "When a bull, sheep, or goat is born, it shall remain seven days beneath its
> mother; and from the eighth day onward it shall be acceptable as a
> fire-offering to Hashem."

### Scroll content

Vayikra 22:27 anchors the slide visually — the eight-day floor is the clearest
Tanach proof. The Rambam passages (1:11–12) provide the upper cutoffs and the
l'chatchila / b'di'eved distinction, shown as a second register on the scroll.

### Build sequence

| # | Camera | Highlight | Reveal |
|---|---|---|---|
| 1 | overview | — | scroll: Vayikra 22:27 |
| 2 | band 1 — Too young | `שִׁבְעַת יָמִים תַּחַת אִמּוֹ` | red band: Days 1–7 — "Too young, פָּסוּל" |
| 3 | band 2 — B'di'eved | `וּמִיּוֹם הַשְּׁמִינִי וָהָלְאָה יֵרָצֶה` | gold band: Days 8–29 — "Valid b'di'eved" |
| 4 | band 3 — L'chatchila | _(scroll rolls; Rambam 1:12)_ `מִיּוֹם שְׁלֹשִׁים וָהָלְאָה` | green band: Day 30+ — "Valid l'chatchila" |
| 5 | maxes row | _(Rambam 1:11)_ `בַּבָּקָר עַד שָׁלֹשׁ שָׁנִים` | max-card: Cattle ≤ 3 years |
| 6 | maxes row | _(Rambam 1:11)_ `וּבַצֹּאן עַד שְׁתֵּי שָׁנִים` | max-card: Sheep · Goats ≤ 2 years |
| 7 | maxes row | _(Rambam 1:14)_ `בְּיוֹם שְׁלֹשִׁים אֵינוֹ כָּשֵׁר לֹא לְכֶבֶשׂ וְלֹא לָאַיִל` | edge-case card: Pilgas — day 30 of yr 2 |

### Notes

- The three exceptions to the day-30 l'chatchila preference (bechor, pesach,
  maaser) are named in 1:12. Name them here as a footnote — they come up again
  on Slide 5 when we discuss individual-only offerings.
- `מִבֶּן שְׁמוֹנַת יָמִים` means the animal must have *completed* seven days
  (i.e., it is fully in its eighth day). Worth a footnote: "eight days" means
  it has already lived through seven.
- The leap-year extension (`אִם נִתְעַבְּרָה שָׁנָה נִתְעַבְּרָה לוֹ`) is elegant:
  if the civil/Jewish calendar stretched the year for the animal, the animal's
  valid age window stretches with it.

---

## Slide 4 — The four categories of korban

### Context paragraph (main pane)

> Every korban in the Torah — communal or individual, daily or once-in-a-lifetime
> — belongs to one of four categories. Three additional offerings are brought
> only by individuals; no communal form of them exists.
>
> The four main categories are:
> - **עוֹלָה (olah)** — entirely burned on the altar. No portion is eaten.
> - **חַטָּאת (chatat)** — brought for the accidental violation of a
>   karet-bearing prohibition. Most chataat are eaten by kohanim inside the
>   Temple courtyard; five are burned entirely (see Slide 5).
> - **אָשָׁם (asham)** — brought for specific transgressions, or in a case of
>   doubt (asham talui). Always from male sheep.
> - **שְׁלָמִים (shlamim)** — the altar receives the eimurin (fat portions),
>   the kohen receives specified parts, and the owner eats the remainder.
>   It is the only korban from which the owner eats.
>
> Three additional offerings belong exclusively to individuals: `פֶּסַח`
> (the Pesach offering), `בְּכוֹר` (the firstborn male of cattle, sheep, or
> goats), and `מַעֲשֵׂר` (the tenth animal of the year's herd).

### Primary sources

**Maaseh HaKorbanot 1:2**
> וְכָל הַקָּרְבָּנוֹת בֵּין שֶׁל צִבּוּר בֵּין שֶׁל יָחִיד אַרְבָּעָה מִינִין:
> עוֹלָה. וְחַטָּאת. וְאָשָׁם. וּשְׁלָמִים.

**Maaseh HaKorbanot 1:3**
> וְעוֹד יֵשׁ שָׁם שְׁלֹשָׁה מִינֵי קָרְבַּן יָחִיד וְהֵם הַפֶּסַח. וְהַבְּכוֹר. וְהַמַּעֲשֵׂר.

### Scroll content

Maaseh HaKorbanot 1:2 + 1:3, both displayed (short passage; fits on one
scroll without rolling).

### Build sequence

| # | Camera | Highlight | Reveal |
|---|---|---|---|
| 1 | overview | — | scroll shows 1:2 + 1:3 |
| 2 | card 1 (olah) | `עוֹלָה` | olah card |
| 3 | card 2 (chatat) | `וְחַטָּאת` | chatat card |
| 4 | card 3 (asham) | `וְאָשָׁם` | asham card |
| 5 | card 4 (shlamim) | `וּשְׁלָמִים` | shlamim card |
| 6 | overview | `הַפֶּסַח. וְהַבְּכוֹר. וְהַמַּעֲשֵׂר` | extras strip: pesach / bechor / maaser |

### Notes

- The four-category schema is the spine of Seder Kodshim. Worth saying in the
  explanatory paragraph that the later levels all carve up *within* these four.
- The shlamim is the only korban where the owner eats — this is the key
  distinction that makes it feel different in character from the other three,
  which are all "upward" movements (to Hashem or to the kohen only).

---

## Slide 5 — Communal vs. individual offerings, holiness grades, and burned chataat

### Context paragraph (main pane)

> The distinction between **communal** and **individual** offerings governs
> several practical laws. Communal offerings follow a fixed public schedule.
> Individual offerings arise from personal circumstances: a birth, an
> accidental transgression, a vow, or a festival obligation.
>
> **What may the community bring?** Communal offerings are always either an olah
> or a chatat — never shlamim (except one special case on Shavuos), never an
> asham, never a bird. The one exception: on Shavuos, two male sheep in their
> first year are brought alongside the two loaves of bread (`שְׁתֵּי הַלֶּחֶם`)
> as communal shlamim, called `זִבְחֵי שַׁלְמֵי צִבּוּר`.
>
> **Holiness grade follows from category:** The communal/individual distinction,
> together with the four-category membership, determines a korban's holiness
> grade automatically — no separate table to memorize.
> - **Olot, chataat, ashamot** → always `קָדְשֵׁי קָדָשִׁים` (most-holy)
> - **Shavuos kvasim** (the only communal shlamim) → also most-holy
> - **Individual shlamim, bechor, maaser, pesach** → `קָדָשִׁים קַלִּים` (lesser-holy)
>
> The grade determines where the animal is slaughtered, who may eat it, and for
> how long. **Kodshei Kodashim:** slaughtered in the *north* of the courtyard;
> eaten only inside the azarah, only by male kohanim, only on the day of
> offering and the following night. **Kodashim Kalim:** slaughtered anywhere in
> the courtyard; eaten anywhere in Jerusalem by any tahor person, for two days
> and one night.
>
> **Burned chataat:** Most chataat are eaten by kohanim inside the azarah. But
> five chataat are burned entirely — not eaten at all. Two are for individuals;
> three are for the community. These exceptions matter especially for the Yom
> Kippur service and the beit-din error procedure.

### Primary source (communal types)

**Maaseh HaKorbanot 1:4**
> כָּל קָרְבָּנוֹת הַצִּבּוּר הֵן עוֹלָה אוֹ חַטָּאת.
> וְאֵין בְּקָרְבְּנוֹת הַצִּבּוּר שְׁלָמִים
> חוּץ מִשְּׁנֵי כְּבָשִׂים הַבָּאִים עִם לֶחֶם הַתְּנוּפָה בַּעֲצֶרֶת
> וְהֵם הַנִּקְרָאִים זִבְחֵי שַׁלְמֵי צִבּוּר.
> וְאֵין הַצִּבּוּר מַקְרִיבִין אָשָׁם לְעוֹלָם וְלֹא עוֹף.

**Translation**
> All communal offerings are either an olah or a chatat. There are no communal
> shlamim, except for the two sheep that come with the wave-bread on Shavuos —
> they are called "communal shlamim-offerings." The community never brings an
> asham, and never brings a bird.

### Tanach source (Shavuos kvasim)

**Vayikra 23:19**
> וַעֲשִׂיתֶ֛ם שְׂעִ֥יר עִזִּ֖ים אֶחָ֣ד לְחַטָּ֑את
> וּשְׁנֵ֧י כְבָשִׂ֛ים בְּנֵ֥י שָׁנָ֖ה לְזֶ֥בַח שְׁלָמִֽים׃

**Translation**
> "And you shall make one goat as a chatat and two sheep in their first year
> as a shlamim-offering."

### Full catalog of communal and individual offerings (from 1:5)

**Maaseh HaKorbanot 1:5** _(communal portion)_
> קָרְבְּנוֹת הַצִּבּוּר הֵם שְׁנֵי תְּמִידִין שֶׁל כָּל יוֹם.
> וּמוּסְפֵי שַׁבָּתוֹת וְרָאשֵׁי חֳדָשִׁים וְהַמּוֹעֲדוֹת
> וּשְׂעִיר חַטָּאת שֶׁל יוֹם הַכִּפּוּרִים.
> וְכֵן אִם שָׁגְגוּ בֵּית דִּין וְהוֹרוּ בַּעֲבוֹדָה זָרָה —
> מֵבִיא כָּל שֵׁבֶט וְשֵׁבֶט פַּר וְשָׂעִיר: הַפָּר עוֹלָה וְהַשָּׂעִיר חַטָּאת.
> וְאֵלּוּ הַשְּׂעִירִים הֵם הַנִּקְרָאִים שְׂעִירֵי עֲבוֹדָה זָרָה.
> וְאִם שָׁגְגוּ וְהוֹרוּ בִּשְׁאָר הַמִּצְוֹת —
> מְבִיאִין פַּר לְחַטָּאת וְהוּא הַנִּקְרָא פַּר הֶעְלֵם דָּבָר שֶׁל צִבּוּר.

**Catalog of individual offerings (1:5 continued)**
The Rambam then lists every type of individual offering:
- `הַבְּכוֹר`, `הַמַּעֲשֵׂר`, `הַפֶּסַח` (the three individual-only types from 1:3)
- `חֲגִיגָה` — the pilgrimage festival offering (shlamim)
- `רְאִיָּה` — the olah brought on each of the three festivals
- `קָרְבַּן הַגֵּר` — the convert's inaugural offering (olah from animal, or two
  birds, or two animals — one olah one shlamim)
- `נֵדֶר` or `נְדָבָה` — a vowed or voluntary olah or shlamim
- `תּוֹדָה` — the thanksgiving shlamim, brought with forty loaves of bread
- `קָרְבְּנוֹת הַנָּזִיר` — the Nazir's three offerings: olah, chatat, shlamim
- `קָרְבְּנוֹת מְצֹרָע` — the metzora's three offerings: chatat, asham, olah
- `קָרְבְּנוֹת זָבִים וְיוֹלְדוֹת` — offerings for zav/zava and for a woman
  after childbirth: chatat + olah
- `קָרְבַּן הַשּׁוֹגֵג` — the accidental-violation chatat (for any karet sin
  committed unintentionally)
- `אָשָׁם תָּלוּי` — the asham brought in a case of *doubt* ("maybe I sinned")
- `אָשָׁם וַדַּאי` — the asham for certain specific transgressions
- The Kohen Gadol's personal offerings on Yom Kippur: his ayil olah and par chatat

### Holiness grades (from 1:17)

**Maaseh HaKorbanot 1:17**
> כָּל הַקָּרְבָּנוֹת הָאֵלּוּ נִקְרָאִים זְבָחִים.
> וְכָל הָעוֹלוֹת וְהַחַטָּאוֹת וְהָאֲשָׁמוֹת
> וּשְׁנֵי כַּבְשֵׂי שְׁלָמִים שֶׁל עֲצֶרֶת
> נִקְרָאִים קָדְשֵׁי קָדָשִׁים.
> אֲבָל שְׁלָמִים שֶׁל יָחִיד וְהַבְּכוֹר וְהַמַּעֲשֵׂר וְהַפֶּסַח
> נִקְרָאִים קָדָשִׁים קַלִּים.

**Translation**
> All of these offerings are called *zevachim* (slaughter-offerings). All the
> olot, chataat, ashamot, and the two sheep of Shavuos are called Kodshei
> Kodashim. But individual shlamim, bechor, maaser, and pesach are called
> Kodashim Kalim.

### Tanach sources (slaughter location — follows from holiness grade)

**Vayikra 1:11** _(olah — most-holy, slaughtered north)_
> וְשָׁחַ֨ט אֹת֜וֹ עַ֣ל יֶ֤רֶךְ הַמִּזְבֵּ֙חַ֙ צָפֹ֔נָה לִפְנֵ֖י יְהוָ֑ה

> "And he shall slaughter it on the north side of the altar, before Hashem."

**Vayikra 6:18** _(chatat — same place as olah, i.e. north)_
> בִּמְק֗וֹם אֲשֶׁ֤ר תִּשָּׁחֵט֙ הָעֹלָ֔ה תִּשָּׁחֵ֖ט הַחַטָּ֑את

> "In the place where the olah is slaughtered, the chatat shall be slaughtered."

**Vayikra 3:2** _(shlamim — anywhere in the courtyard, lesser-holy)_
> וּשְׁחָט֕וֹ פֶּ֖תַח אֹ֣הֶל מוֹעֵ֑ד

> "And he shall slaughter it at the entrance of the Tent of Meeting."
> (Halacha: 'entrance' means anywhere in the courtyard — no single side specified.)

### Burned chataat (from 1:16)

**Maaseh HaKorbanot 1:16**
> כָּל חַטָּאוֹת שֶׁל צִבּוּר נֶאֱכָלוֹת
> חוּץ מִשָּׂעִיר שֶׁל יוֹם הַכִּפּוּרִים שֶׁחֲבֵרוֹ מִשְׁתַּלֵּחַ.
> וְכֵן שְׂעִירֵי עֲבוֹדָה זָרָה וּפַר הֶעְלֵם נִשְׂרָפִין.
> וּפַר הַבָּא עַל כָּל הַמִּצְוֹת וּפַר הֶעְלֵם — נִקְרָאִים פָּרִים הַנִּשְׂרָפִין.
> וּשְׂעִירֵי עֲבוֹדָה זָרָה — נִקְרָאִים שְׂעִירִים הַנִּשְׂרָפִין.
> הָא לָמַדְתָּ שֶׁחָמֵשׁ חַטָּאוֹת הֵם הַנִּשְׂרָפוֹת:
> שְׁתַּיִם לַיָּחִיד וְשָׁלֹשׁ לַצִּבּוּר.

**Translation**
> All communal chataat are eaten — except the Yom Kippur sa'ir (because its
> partner is sent away), and the idolatry-goats and the beit-din par, which are
> burned. The burned bulls and the beit-din par are called "the burned bulls";
> the idolatry-goats are called "the burned goats." Thus: five chataat are
> burned — two for the individual and three for the community.

**The five burned chataat:**

| | Offering | Who brings it |
|--|--|--|
| Individual 1 | Par of the Kohen Mashiach (bull for an unintentional halachic ruling) | Kohen Gadol personally |
| Individual 2 | Par of Yom Kippur (KG's personal atonement bull) | Kohen Gadol personally |
| Community 1 | Sa'ir of Yom Kippur — burned because its azazel partner is sent away | Community |
| Community 2 | Sa'irei avoda zarah (goats of the idolatry-error offering) | Community / each tribe |
| Community 3 | Par ha-elem davar (bull for beit-din's erroneous ruling) | Community |

### Scroll content

Maaseh HaKorbanot 1:4 opens the slide. The scroll rolls through 1:5, then 1:17,
then 1:16 as each section is revealed.

### Build sequence

| # | Camera | Highlight | Reveal |
|---|---|---|---|
| 1 | overview | — | scroll: Rambam 1:4 |
| 2 | communal column | `עוֹלָה אוֹ חַטָּאת` | "Communal = Olah or Chatat only" header |
| 3 | communal column | `שְׁנֵי כְּבָשִׂים… עֲצֶרֶת` | "Exception: Shavuos kvasim" card |
| 4 | communal column | `אֵין הַצִּבּוּר מַקְרִיבִין אָשָׁם… וְלֹא עוֹף` | "Never: asham · bird" note |
| 5 | communal schedule | _(scroll → 1:5)_ `שְׁנֵי תְּמִידִין` | communal schedule list |
| 6 | individual column | `קָרְבְּנוֹת הַיָּחִיד` | individual catalog list |
| 7 | KK panel | _(scroll → 1:17)_ `קָדְשֵׁי קָדָשִׁים` | KK column: olot, chataat, ashamot, Shavuos kvasim + KK rules |
| 8 | Kalim panel | `קָדָשִׁים קַלִּים` | Kalim column: individual shlamim, bechor, maaser, pesach + Kalim rules |
| 9 | burned strip | _(scroll → 1:16)_ `חָמֵשׁ חַטָּאוֹת הֵם הַנִּשְׂרָפוֹת` | "5 burned chataat" strip (2 individual + 3 communal) |
| 10 | overview | — | closing summary |

### Notes

- The Shavuos kvasim are the *only* shlamim that count as Kodshei Kodashim.
  Without that caveat, the KK list looks like it excludes all shlamim.
- Pesach has its own time-of-eating rule (one night, until midnight) that
  differs from the standard kalim default of two days and one night. Note this
  without drilling in; Pesach laws are Level 12.
- Bechor is eaten only by kohanim even though it's a lesser-holy offering. This
  apparent contradiction resolves in Level 7 (Disqualifications & blemishes).
- The two burned individual chataat are both bulls (`פָּרִים`) brought by the
  Kohen Gadol; neither is a regular person's chatat.
- **Achrayut (halachot 1:6–1:7):** An individual who vowed a specific korban
  and set an animal aside is responsible if that animal dies or is lost — he
  must replace it, along with its libations. The community bears no such
  liability. An individual offering with a fixed time (bechor, pesach, maaser)
  is treated like a communal offering for this purpose. Background for later
  levels; no separate slide needed here.
- The Kohen Gadol's personal Yom Kippur offerings count as *individual*
  korbanos even though they are part of the Yom Kippur service.

---

## Slide 6 — Which animal for which korban?

### Context paragraph (main pane)

> Each of the four main categories specifies which species and sex are
> acceptable. The Rambam covers these rules in halachot 1:7–1:10 and adds a
> fifth halacha (1:15) for communal-vs-individual distinctions.
>
> - An `עוֹלָה` from mammals is always male. From birds, either sex is valid.
> - A `שְׁלָמִים` may be male or female, but only from mammals — never from
>   birds.
> - An `אָשָׁם` comes only from male sheep.
> - An individual `חַטָּאת` is female. Communal chataat come from goats or
>   cattle only — never from sheep. Communal olot come from sheep or cattle —
>   never from goats.

### Primary sources (one per panel)

**Olah — Maaseh HaKorbanot 1:7 (1:8 in some editions)**
> כָּל עוֹלַת בְּהֵמָה אֵינָהּ בָּאָה אֶלָּא מִן הַזְּכָרִים בִּלְבַד.
> וְהִיא בָּאָה מִן הַכְּבָשִׂים וּמִן הָעִזִּים וּמִן הַבָּקָר בֵּין גְּדוֹלִים בֵּין קְטַנִּים.
> וּמִן הַתּוֹרִים וּבְנֵי יוֹנָה — וְאֶחָד בָּהֶן הַזָּכָר וְהַנְּקֵבָה.

**Translation**
> Every animal olah may come only from males. It comes from sheep, goats, and
> cattle — both young and old. And from turtle-doves and young pigeons — for
> which either male or female is acceptable.

**Chatat — Maaseh HaKorbanot 1:8 (1:9)**
> הַחַטָּאת בָּאָה מֵחֲמֵשֶׁת הַמִּינִים הָאֵלּוּ
> מִן הַזְּכָרִים וּמִן הַנְּקֵבוֹת מִן הַגְּדוֹלִים וּמִן הַקְּטַנִּים.

**Translation**
> The chatat comes from all five species, from males or females, from young
> or old.

**Asham — Maaseh HaKorbanot 1:9 (1:10)**
> הָאָשָׁם אֵינוֹ בָּא אֶלָּא מִזִּכְרֵי כְּבָשִׂים בִּלְבַד.
> יֵשׁ אָשָׁם בָּא מִגְּדוֹלֵי מִין זֶה וְיֵשׁ אָשָׁם בָּא מִן הַקְּטַנִּים.

**Translation**
> The asham comes only from male sheep. Some ashamot come from the older
> animals of this species and some from the younger ones.

**Shlamim — Maaseh HaKorbanot 1:10 (1:11)**
> הַשְּׁלָמִים בָּאִים מִן הַכְּבָשִׂים וּמִן הָעִזִּים וּמִן הַבָּקָר
> מִזְּכָרִים וּמִנְּקֵבוֹת מִן הַגְּדוֹלִים וּמִן הַקְּטַנִּים.
> וְאֵין הָעוֹף בָּא שְׁלָמִים.

**Translation**
> Shlamim come from sheep, goats, and cattle — males or females, young or old.
> Birds may not be brought as shlamim.

**Sex rules: communal vs. individual — Maaseh HaKorbanot 1:15**
> כָּל קָרְבְּנוֹת הַצִּבּוּר זְכָרִים.
> וְכֵן חַטָּאוֹת שֶׁל צִבּוּר מִן הָעֵז אוֹ מִן הַבָּקָר — וְאֵין בָּהֶן מִן הַכְּבָשִׂים.
> וְכָל עוֹלוֹת הַצִּבּוּר מִן הַכְּבָשִׂים וּמִן הַבָּקָר — וְאֵין לָהֶן עוֹלָה מִן הָעֵז.
> כָּל חַטַּאת יָחִיד נְקֵבָה וְתֵאָכֵל לַכֹּהֲנִים וְאֵינָהּ בָּאָה מִן הַבָּקָר.
> חוּץ מִשָּׁלֹשׁ חַטָּאוֹת:
> חַטַּאת נָשִׂיא — שֶׁהִיא עֵז וְנֶאֱכֶלֶת.
> וְחַטַּאת כֹּהֵן מָשִׁיחַ — שֶׁהוּא פַּר וְנִשְׂרֶפֶת.
> וּפַר שֶׁמֵּבִיא כֹּהֵן גָּדוֹל בְּיוֹם הַכִּפּוּרִים — וְהוּא חַטָּאת וְנִשְׂרָף.

**Translation**
> All communal offerings are male. Communal chataat come from a goat or cattle
> — not from sheep. Communal olot come from sheep or cattle — not from goats.
> Every individual chatat is female, eaten by the kohanim, and does not come
> from cattle — except for three chataat: (1) the Nasi's chatat, which is a
> (male) goat and is eaten; (2) the Kohen Mashiach's chatat, which is a bull
> and is burned; (3) the bull the Kohen Gadol brings on Yom Kippur, which is a
> chatat and is burned.

### Scroll content

The scroll rolls between the four Rambam halachot as the camera pans between
panels. Rambam 1:15 appears on a fifth pass, covering the full slide as a summary.

### Build sequence

| # | Camera | Highlight | Reveal |
|---|---|---|---|
| 1 | overview | — | scroll: Rambam 1:7 |
| 2 | panel 1 (olah) | `אֵינָהּ בָּאָה אֶלָּא מִן הַזְּכָרִים` | olah panel: male only, all five species (birds: either sex) |
| 3 | panel 2 (shlamim) | _(scroll → 1:10)_ `מִזְּכָרִים וּמִנְּקֵבוֹת… וְאֵין הָעוֹף בָּא שְׁלָמִים` | shlamim panel: either sex, mammals only |
| 4 | panel 3 (asham) | _(scroll → 1:9)_ `אֵינוֹ בָּא אֶלָּא מִזִּכְרֵי כְּבָשִׂים בִּלְבַד` | asham panel: male sheep only |
| 5 | panel 4 (chatat) | _(scroll → 1:8)_ `מִן הַזְּכָרִים וּמִן הַנְּקֵבוֹת` | chatat panel: all five species, either sex |
| 6 | communal note | _(scroll → 1:15)_ `כָּל קָרְבְּנוֹת הַצִּבּוּר זְכָרִים` | communal strip: always male |
| 7 | individual chatat | `כָּל חַטַּאת יָחִיד נְקֵבָה` | individual chatat strip: female + three exceptions |

### Notes

- Asham talui, asham vadai, asham metzora, asham nazir all differ in whether
  the animal must be gadol (ayil) or katan (keves). Slide 6 just asserts "male
  sheep" without splitting; the granular cases belong to Level 4.
- The three exceptions to the female chatat rule connect directly to the
  burned-vs-eaten distinction covered in Slide 5.
- The order of panels (olah → shlamim → asham → chatat) groups the two
  "flexible sex" panels together and the two "strict sex" panels together, which
  is pedagogically cleaner than Rambam's own order (olah → chatat → asham →
  shlamim).

---

## Slide 7 — Eimurim: what goes on the altar from an eaten offering

### Context paragraph (main pane)

> When a korban is eaten — by the kohanim or by the owner — the entire animal
> is not consumed. The Torah specifies certain internal fat portions that must
> be separated and burned on the outer altar as a `רֵיחַ נִיחוֹחַ`. These
> portions are called **אֵימוּרִין (eimurin)**. They apply to every korban
> that is eaten: the chataat (those that are eaten), asham, and shlamim.
>
> The eimurin are identical for cattle and goats. For sheep, one part is
> added: the fat tail. The fat tail of the broad-tailed sheep common in the
> ancient Near East is a substantial fatty appendage. The Torah treats it as
> one of the premier fats and requires it on the altar (Vayikra 3:9). All
> eimurin are burned on the outer altar, not the inner golden altar, which
> receives incense only.

### Primary source

**Maaseh HaKorbanot 1:18**
> הָאֵיבָרִים שֶׁשּׂוֹרְפִין אוֹתָן עַל גַּבֵּי הַמִּזְבֵּחַ
> מִן הַחַטָּאוֹת הַנֶּאֱכָלוֹת וּמִן הָאֲשָׁמוֹת וּמִן הַשְּׁלָמִים
> הֵן הַנִּקְרָאִין אֵימוּרִין.
> וְאֵלּוּ הֵן הָאֵימוּרִין שֶׁל שׁוֹר אוֹ שֶׁל עֵז:
> הַחֵלֶב אֲשֶׁר עַל הַקֶּרֶב — וּבִכְלָלוֹ חֵלֶב שֶׁעַל גַּבֵּי הַקֵּבָה —
> וּשְׁתֵּי הַכְּלָיוֹת וְחֵלֶב שֶׁעֲלֵיהֶן עִם הַחֵלֶב אֲשֶׁר עַל הַכְּסָלִים
> וְיוֹתֶרֶת הַכָּבֵד — וְנוֹטֵל מִן הַכָּבֵד מְעַט עִם הַיּוֹתֶרֶת.
> וְאִם הָיָה הַקָּרְבָּן מִמִּין הַכְּבָשִׂים —
> מוֹסִיף עַל אֵלּוּ הָאַלְיָה תְּמִימָה
> עִם הַחֻלְיוֹת מִן הַשִּׁדְרָה עַד מְקוֹם הַכְּלָיוֹת
> שֶׁנֶּאֱמַר: "לְעֵמַּת הֶעָצֶה יְסִירֶנָּה".
> וְכָל הָאֵימוּרִין נִשְׂרָפִין עַל מִזְבֵּחַ הַחִיצוֹן.

**Translation**
> The limbs that are burned on the altar from the eaten chataat, from the
> ashamot, and from the shlamim — these are called eimurin. For cattle or
> goats the eimurin are: (1) the fat covering the intestines (including the fat
> on the stomach-maw); (2) the two kidneys and the fat on them along with the
> fat on the flanks; (3) the caudate lobe of the liver — and a small portion
> of the liver itself is taken with it. If the offering is from the sheep
> species, the entire fat tail is added, together with the vertebrae from the
> spine down to the area of the kidneys, as it says: "opposite the backbone he
> shall remove it." All eimurin are burned on the outer altar.

### Tanach source (eimurin of shlamim from cattle)

**Vayikra 3:3–5**
> וְהִקְרִ֨יב מִזֶּ֜בַח הַשְּׁלָמִ֗ים אִשֶּׁה֙ לַֽיהוָ֔ה
> אֶת־הַחֵ֙לֶב֙ הַֽמְכַסֶּ֣ה אֶת־הַקֶּ֔רֶב וְאֵ֥ת כָּל־הַחֵ֖לֶב אֲשֶׁ֥ר עַל־הַקֶּֽרֶב׃
> וְאֵת֙ שְׁתֵּ֣י הַכְּלָיֹ֔ת וְאֶת־הַחֵ֙לֶב֙ אֲשֶׁ֣ר עֲלֵיהֶ֔ן
> אֲשֶׁ֖ר עַל־הַכְּסָלִ֑ים וְאֶת־הַיֹּתֶ֙רֶת֙ עַל־הַכָּבֵ֔ד
> עַל־הַכְּלָיֹ֖ת יְסִירֶֽנָּה׃
> וְהִקְטִיר֛וּ אֹת֥וֹ בְנֵֽי־אַהֲרֹ֖ן הַמִּזְבֵּ֑חָה...

**Translation**
> "And from the shlamim offering he shall bring a fire-offering to Hashem: the
> fat covering the intestines, and all the fat on the intestines; the two
> kidneys and the fat on them, which is on the flanks; and the caudate lobe on
> the liver — he shall remove it along with the kidneys. And the sons of Aharon
> shall burn it on the altar..."

### Tanach source (fat tail — sheep shlamim)

**Vayikra 3:9**
> וְהִקְרִ֨יב מִזֶּ֜בַח הַשְּׁלָמִ֗ים אִשֶּׁה֙ לַֽיהוָ֔ה
> חֶלְבּ֛וֹ הָאַלְיָ֥ה תְמִימָ֖ה לְעֻמַּ֣ת הֶעָצֶ֑ה יְסִירֶ֙נָּה֙
> וְאֶת־הַחֵ֣לֶב הַֽמְכַסֶּ֣ה אֶת־הַקֶּ֔רֶב...

**Translation**
> "And from the shlamim offering he shall bring a fire-offering to Hashem: its
> fat — the complete fat tail, opposite the backbone he shall remove it — and
> the fat covering the intestines..."

### Scroll content

Vayikra 3:3–5 opens the slide (cattle eimurin). After the first three cards are
revealed, the scroll rolls to 3:9 for the sheep fat-tail addition.

### Build sequence

| # | Camera | Highlight | Reveal |
|---|---|---|---|
| 1 | overview | — | scroll: Vayikra 3:3 |
| 2 | card 1 | `הַחֵלֶב הַמְכַסֶּה אֶת הַקֶּרֶב` | "Fat over the intestines" — including stomach fat |
| 3 | card 2 | `שְׁתֵּי הַכְּלָיֹת וְאֶת הַחֵלֶב אֲשֶׁר עֲלֵיהֶן` | "Two kidneys + flank fat" |
| 4 | card 3 | `הַיֹּתֶרֶת עַל הַכָּבֵד` | "Caudate lobe + a bit of liver" |
| 5 | sheep banner | _(scroll → Vayikra 3:9)_ `הָאַלְיָה תְמִימָה לְעֻמַּת הֶעָצֶה` | "Fat tail (sheep only)" card |
| 6 | overview | — | "All eimurin → outer altar" closing note |

### Notes

- The eimurin apply to any *eaten* korban (chataat, asham, shlamim). The olah
  has no "eimurin" per se because the entire animal is burned anyway.
- The fat tail addition for sheep (`אַלְיָה`) reflects the specific breed
  common in the ancient Near East. The phrase `לְעֻמַּת הֶעָצֶה` ("opposite
  the spine") describes exactly where to cut so the correct vertebrae come
  with the tail.
- Halacha 1:19 (the pregnant animal: if an animal offered as shlamim was
  pregnant, the fetus's fat is not combined with the mother's eimurin, since
  the fetus is treated like one of her limbs) is left for a later level — it is
  too narrow an edge case for Level 1.

---

## Cross-slide design decisions (open)

- **One scroll or many?** A single persistent scroll widget at the top of every
  slide that loads different passages as the slide changes is recommended
  (faster to build, visually consistent). Alternative: per-slide scrolls that
  swap entirely.
- **Where does the English translation live?** Three options:
  (a) under the scroll, always visible;
  (b) inside each card as it's revealed — no English on the scroll at all;
  (c) a "toggle translation" pill on the scroll.
  Option (b) keeps the scroll visually sacred-looking while English shows up
  where the learning is happening.
- **What happens when the scroll has more text than fits?** Vayikra 22:27 is
  short; Maaseh HaKorbanot 1:5 is very long. A "scroll-with-camera" behavior —
  where the highlighted phrase scrolls into view as it's emphasized — is needed.
- **Halacha numbering.** The Sefaria Hebrew JSON merges what standard printed
  editions treat as two separate halachot (1:6 and 1:7) into one entry, causing
  a 1-number offset for everything from 1:8 onward. The numbers in this file
  follow the standard Vilna/printed-Rambam convention, not the Sefaria index.
- **Sources beyond Vayikra & Rambam.** Some slides naturally invite a Mishnah
  (Zevachim 5:1 for Slide 5's slaughter-location rules) or an aggadic midrash.
  Open question whether to layer those in here or keep Level 1 Tanach-plus-Rambam only.

---

## Open questions

- _Slide 2_ — resolved: app uses `גְּדִי` / `תַּיִשׁ` as primary labels with
  Rambam's `שְׂעִיר עִזִּים` / `שָׂעִיר` shown on the detail card.
- _Slide 3_ — the leap-year extension (`נִתְעַבְּרָה שָׁנָה`) — is a footnote
  enough, or does it need its own build step?
- _Slide 5_ — the individual-offerings catalog (Rambam 1:5 second half) is long.
  Should it display as a scrollable list inside the slide, or be abbreviated
  with a "tap to expand" interaction?
- _Slide 6_ — keep the "olah / shlamim / asham / chatat" panel ordering, or
  follow Rambam's "olah / chatat / asham / shlamim"?
- _Slide 5_ — the five-burned-chataat table: show as a table (as in this file)
  or as five sequential reveal cards?
- _Slide 7_ — do we show the Rambam's 1:18 text directly on the scroll, or
  anchor to the Vayikra 3 verses and use Rambam as the explanatory gloss?
