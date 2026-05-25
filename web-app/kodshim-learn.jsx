// Redesigned Learn screen for Level 1.
// Single-column, no sidebar, no camera zoom, no permanent scroll widget.
// Sources live in a drawer that pulls up from the bottom dock.

const {
  useState: useStateLV,
  useEffect: useEffectLV,
  useCallback: useCallbackLV,
  useMemo: useMemoLV,
  useRef: useRefLV
} = React;

/* ─── Reveal fade primitive ─────────────────────────────────────────── */
function Fade({ on, children, delay = 0 }) {
  return (
    <div
      className={"fade" + (on ? " on" : "")}
      style={delay ? { transitionDelay: delay + "ms" } : undefined}>
      
      {children}
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Sources — passages each slide cites (drawer-only).                 */
/* ═══════════════════════════════════════════════════════════════════ */
const SRC_VAYIKRA_1_2 = {
  cite: "Vayikra 1:2",
  he: "דַּבֵּר אֶל־בְּנֵי יִשְׂרָאֵל וְאָמַרְתָּ אֲלֵהֶם, אָדָם כִּי־יַקְרִיב מִכֶּם קָרְבָּן לַה׳ — מִן־הַבְּהֵמָה, מִן־הַבָּקָר וּמִן־הַצֹּאן תַּקְרִיבוּ אֶת־קָרְבַּנְכֶם.",
  en: "Speak to the Children of Israel and say to them: When a person from among you brings an offering to Hashem — from the cattle, from the herd or from the flock, you shall bring your offering."
};
const SRC_VAYIKRA_1_14 = {
  cite: "Vayikra 1:14",
  he: "וְאִם מִן־הָעוֹף עֹלָה קָרְבָּנוֹ לַה׳ — וְהִקְרִיב מִן־הַתֹּרִים אוֹ מִן־בְּנֵי הַיּוֹנָה אֶת־קָרְבָּנוֹ.",
  en: "If his offering to Hashem is an olah from the bird, he shall bring his offering from the turtle-doves or from the young pigeons."
};
const SRC_MK_1_14 = {
  cite: "Maaseh HaKorbanot 1:14",
  he: "כָּל מָקוֹם שֶׁנֶּאֱמַר בַּתּוֹרָה כֶּבֶשׂ אוֹ כַּבְשָׂה אוֹ כְּבָשִׂים הֲרֵי אֵלּוּ בְּנֵי שָׁנָה. וְכָל מָקוֹם שֶׁנֶּאֱמַר אַיִל אוֹ אֵילִים הֵם הַזְּכָרִים בְּנֵי שְׁנָתַיִם. וּמֵאֵימָתַי יִקָּרֵא אַיִל — מִשֶּׁיִּכָּנֵס בְּשָׁנָה שְׁנִיָּה אֶחָד וּשְׁלֹשִׁים יוֹם. וְכָל מָקוֹם שֶׁנֶּאֱמַר בּוֹ עֵגֶל — הֲרֵי זֶה בֶּן שָׁנָה. פַּר בֶּן שְׁתַּיִם. שְׂעִיר עִזִּים בֶּן שָׁנָה. שָׂעִיר בֶּן שְׁתַּיִם.",
  en: "Wherever the Torah says keves, kavsa, or kevasim — these are one-year-olds. Wherever it says ayil or eilim — these are males in their second year. From when is it called an ayil? From the thirty-first day of its second year. Wherever it says egel — this is a one-year-old. Par — two years old. Se'ir izim — a one-year-old male goat. Sa'ir — two years old."
};
const SRC_MK_1_11 = {
  cite: "Maaseh HaKorbanot 1:11–14",
  he: "אֵין מַקְרִיבִין קָרְבָּן עַד שֶׁיַּעֲבֹר עָלָיו שְׁמוֹנָה יָמִים, וְהוּא בֶּן יוֹם רִאשׁוֹן שֶׁל שְׁמוֹנָה. וּמִכָּאן וָאֵילָךְ — כָּשֵׁר. בָּקָר — עַד שָׁלֹשׁ שָׁנִים. כְּבָשִׂים וְעִזִּים — עַד שְׁתֵּי שָׁנִים.",
  en: "A korban is not offered until eight days have passed over it — the first day of the eighth. From then onward it is kasher. Cattle — up to three years. Sheep and goats — up to two years."
};
const SRC_MK_1_2 = {
  cite: "Maaseh HaKorbanot 1:2–3",
  he: "אַרְבָּעָה מִינֵי קָרְבָּנוֹת הֵם: עוֹלָה, וְחַטָּאת, וְאָשָׁם, וּשְׁלָמִים. וְיֵשׁ שָׁם קָרְבָּנוֹת אֲחֵרִים שֶׁל יָחִיד: פֶּסַח, בְּכוֹר, וּמַעֲשֵׂר.",
  en: "There are four kinds of korbanot: olah, chatat, asham, and shelamim. And there are other individual offerings: pesach, bechor, and ma'aser."
};
const SRC_MK_1_6 = {
  cite: "Maaseh HaKorbanot 1:6–10",
  he: "הָעוֹלָה — זְכָרִים בִּלְבַד מִן הַבְּהֵמָה; וּמִן הָעוֹף, זְכָרִים וּנְקֵבוֹת. הַשְּׁלָמִים — זְכָרִים וּנְקֵבוֹת, וְאֵין שְׁלָמִים בָּאִין מִן הָעוֹף. הָאָשָׁם — אֵינוֹ בָּא אֶלָּא מִן הַזְּכָרִים שֶׁבַּכְּבָשִׂים. חַטַּאת יָחִיד — נְקֵבָה.",
  en: "An olah — only males from animals; from birds, male or female. Shlamim — male or female, but never from birds. An asham — comes only from male sheep. Chatat of an individual — female (with named exceptions)."
};
const SRC_MK_1_17 = {
  cite: "Maaseh HaKorbanot 1:17",
  he: "קָדְשֵׁי קָדָשִׁים — עוֹלָה, חַטָּאת, אָשָׁם, וְזִבְחֵי שַׁלְמֵי צִבּוּר. קָדָשִׁים קַלִּים — שְׁלָמִים שֶׁל יָחִיד, בְּכוֹר, מַעֲשֵׂר, וּפֶסַח.",
  en: "Kodshei Kodashim (most holy) — olah, chatat, asham, and communal shlamim. Kodashim Kalim (lighter holies) — individual shlamim, bechor, ma'aser, and pesach."
};
const SRC_MK_1_1 = {
  cite: "Maaseh HaKorbanot 1:1",
  he: "כָּל הַקָּרְבָּנוֹת שֶׁל מִינֵי נֶפֶשׁ חַיָּה בָּאִין מֵחֲמִשָּׁה מִינִין בִּלְבַד: מִן הַבָּקָר וּמִן הַכְּבָשִׂים וּמִן הָעִזִּים וּמִן הַתּוֹרִים וּמִן בְּנֵי הַיּוֹנָה.",
  en: "All offerings of living creatures come from five species only: cattle, sheep, goats, turtle-doves, and young pigeons."
};
const SRC_MK_1_4 = {
  cite: "Maaseh HaKorbanot 1:4",
  he: "כָּל קָרְבָּנוֹת הַצִּבּוּר הֵן עוֹלָה אוֹ חַטָּאת. וְאֵין בְּקָרְבְּנוֹת הַצִּבּוּר שְׁלָמִים חוּץ מִשְּׁנֵי כְּבָשִׂים הַבָּאִים עִם לֶחֶם הַתְּנוּפָה בַּעֲצֶרֶת — הֵם הַנִּקְרָאִים זִבְחֵי שַׁלְמֵי צִבּוּר. וְאֵין הַצִּבּוּר מַקְרִיבִין אָשָׁם לְעוֹלָם וְלֹא עוֹף.",
  en: "All communal offerings are either an olah or a chatat. There are no communal shlamim, except for the two sheep brought with the wave-bread on Shavuos — called 'communal shlamim-offerings.' The community never brings an asham, and never brings a bird."
};
const SRC_MK_1_16 = {
  cite: "Maaseh HaKorbanot 1:16",
  he: "חָמֵשׁ חַטָּאוֹת הֵם הַנִּשְׂרָפוֹת: שְׁתַּיִם לַיָּחִיד וְשָׁלֹשׁ לַצִּבּוּר. שֶׁל יָחִיד — פַּר כֹּהֵן מָשִׁיחַ, וּפַר יוֹם הַכִּפּוּרִים שֶׁל כֹּהֵן גָּדוֹל. שֶׁל צִבּוּר — שָׂעִיר יוֹם הַכִּפּוּרִים שֶׁחֲבֵרוֹ מִשְׁתַּלֵּחַ, שְׂעִירֵי עֲבוֹדָה זָרָה, פַּר הֶעְלֵם דָּבָר.",
  en: "Five chataat are burned entirely — two for the individual and three for the community. Individual: the par of the kohen mashiach; and the par the kohen gadol brings on Yom Kippur. Communal: the Yom Kippur sa'ir (because its partner is sent to azazel); the goats of the idolatry-error offering; and the par of the beit-din's erroneous ruling."
};
/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 0 · Intro (TOC + welcome paragraph)                          */
/* ═══════════════════════════════════════════════════════════════════ */
const INTRO_TOC = [
"The animals: five species",
"Naming young and old",
"How old is old enough?",
"The four categories of korban",
"Animal × korban — exceptions and rules",
"Most holy and lighter holies"];

const SlideIntro = {
  title: "Level 1 — Animals for korbanos",
  dek: "Six lessons. Take your time — the kohen gadol won't rush you.",
  sources: [],
  maxReveal: 0,
  render: () =>
  <div className="intro">
      <div className="intro-text">
        <p className="intro-lead">
          The laws of korbanos — Temple offerings — fill the entire middle
          section of the Torah and most of Seder Kodshim in the Mishnah and
          Gemara. Before any of those laws can be understood, it is necessary
          to master the framework: which living creatures are eligible for the
          altar, what those creatures are called at each age, which four master
          categories every korban falls into, and how the Torah distinguishes
          between what a community may bring and what only an individual may bring.
        </p>
        <p className="intro-lead">
          <strong>Level 1</strong> covers this framework. It follows the entire
          first chapter of the Rambam's <em>Hilchos Maaseh HaKorbanot</em> —
          the introductory chapter of his Laws of Sacrificial Procedure — from
          halacha 1:1 to 1:18. Everything from Level 2 onward assumes you can
          already tell the difference between a{" "}
          <span className="he-inline">כֶּבֶשׂ</span> and an{" "}
          <span className="he-inline">אַיִל</span>.
        </p>
        <div className="intro-toc">
          <div className="intro-toc-title">In this level</div>
          {INTRO_TOC.map((t, i) =>
        <div className="toc-row" key={i}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span>{t}</span>
            </div>
        )}
        </div>
      </div>
      <div className="intro-art" style={{ width: "306px" }}>
        <img src="assets/boy-learning.png" alt="A student preparing to learn" style={{ width: "306px", height: "600px" }} />
      </div>
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 1 · The five species                                         */
/* ═══════════════════════════════════════════════════════════════════ */
//   r1: mammals branch + cattle
//   r2: flock + sheep + goats
//   r3: birds branch + 2 birds
//   r4: tally pill
const SlideSpecies = {
  title: "Five species — and only five",
  dek: "Of every animal alive, the Torah names just five as fit for the altar.",
  sources: [SRC_MK_1_1, SRC_VAYIKRA_1_2, SRC_VAYIKRA_1_14],
  maxReveal: 4,
  context:
    <div className="slide-context">
      <p>The Rambam opens his Laws of Sacrificial Procedure by establishing that of every animal alive, the Torah designates only <strong>five</strong> species as eligible for the altar: three mammals from the herd and flock, and two kinds of bird. No other creature — however otherwise kosher for eating — may be brought.</p>
      <p>The mammals are established by the opening verse of Vayikra: cattle (<span className="he-inline">בָּקָר</span>) and flock (<span className="he-inline">צֹאן</span>). The flock comprises sheep and goats, two sub-types distinguished throughout the Torah. The birds are established by Vayikra 1:14: turtle-doves (<span className="he-inline">תּוֹרִים</span>) and young pigeons (<span className="he-inline">בְּנֵי יוֹנָה</span>). Plant-based offerings — flour, wine, oil — are a separate system governed by their own laws.</p>
    </div>,
  render: (r) =>
  <div className="tree">
      <div className="tree-root">
        <span className="he">בְּהֵמָה וָעוֹף</span>
        <span className="en">Animals</span>
      </div>
      <div className="tree-stems">
        <span className="tree-stem-l" />
        <span className="tree-stem-r" />
      </div>
      <div className="tree-branches">
        <Fade on={r >= 1}>
          <div className="branch">
            <div className="branch-head">
              <span className="he">בְּהֵמָה</span>
              <span className="en">Mammals</span>
              <span className="sub">non-flying</span>
            </div>
            <div className="leaves">
              <Fade on={r >= 1} delay={120}>
                <div className="leaf">
                  <span className="he">בָּקָר</span>
                  <span className="en">Cattle</span>
                </div>
              </Fade>
              <Fade on={r >= 2} delay={60}>
                <div className="leaf">
                  <span className="he">כְּבָשִׂים</span>
                  <span className="en">Sheep</span>
                </div>
              </Fade>
              <Fade on={r >= 2} delay={180}>
                <div className="leaf">
                  <span className="he">עִזִּים</span>
                  <span className="en">Goats</span>
                </div>
              </Fade>
            </div>
          </div>
        </Fade>
        <Fade on={r >= 3}>
          <div className="branch">
            <div className="branch-head">
              <span className="he">עוֹף</span>
              <span className="en">Birds</span>
              <span className="sub">flying</span>
            </div>
            <div className="leaves">
              <Fade on={r >= 3} delay={120}>
                <div className="leaf">
                  <span className="he">תּוֹרִים</span>
                  <span className="en">Turtle-doves</span>
                </div>
              </Fade>
              <Fade on={r >= 3} delay={240}>
                <div className="leaf">
                  <span className="he">בְּנֵי יוֹנָה</span>
                  <span className="en">Young pigeons</span>
                </div>
              </Fade>
            </div>
          </div>
        </Fade>
      </div>
      <Fade on={r >= 4}>
        <div className="tree-tally">
          <span className="num">5</span>
          <span className="lab">species in total — three mammals, two birds.</span>
        </div>
      </Fade>
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 2 · Naming the animals (3×3 grid)                            */
/* ═══════════════════════════════════════════════════════════════════ */
const NAMES_COLS = [
{ key: "cow", he: "בָּקָר", en: "Cattle" },
{ key: "sheep", he: "כְּבָשִׂים", en: "Sheep" },
{ key: "goat", he: "עִזִּים", en: "Goats" }];

const NAMES_ROWS = [
{ key: "young", en: "young", sub: "8 days – 1 year" },
{ key: "male", en: "adult male", sub: "1–3 yr cattle · 1–2 yr flock" },
{ key: "female", en: "adult female", sub: "same age window" }];

const NAMES_CELLS = {
  "young-cow": {
    img: "calf.png", he: "עֵגֶל", tl: "egel", en: "calf",
    species: "cattle", stage: "young",
    age: "Day 8 — end of year 1",
    ageNote: "Eligible from the 8th day of life; called egel through its first year.",
    usedFor: [
      { he: "עֵגֶל בֶּן בָּקָר", tl: "Egel of the kohen mashiach", en: "His chatat on his first day of service (Vayikra 9:2)." },
      { he: "פַּר הַעֲלֵם דָּבָר", tl: "Communal chatat (when egel)", en: "When the verse specifies a young one." }
    ]
  },
  "young-sheep": {
    img: "lamb.png", he: "כֶּבֶשׂ", tl: "keves", en: "lamb",
    species: "sheep", stage: "young",
    age: "Day 8 — end of year 1",
    ageNote: "A keves / kavsa / kevasim is always a one‑year‑old.",
    usedFor: [
      { he: "תָּמִיד שֶׁל שַׁחַר וּבֵין הָעַרְבַּיִם", tl: "Tamid", en: "Two daily olot — morning and afternoon." },
      { he: "קָרְבַּן פֶּסַח", tl: "Pesach", en: "Brought from sheep or goats, in its first year." },
      { he: "עוֹלָה · שְׁלָמִים", tl: "Olah & shelamim", en: "Standard individual offerings." },
      { he: "מוּסַף שַׁבָּת וְיוֹם טוֹב", tl: "Musaf", en: "Additional offerings on shabbat & festivals." }
    ]
  },
  "young-goat": {
    img: "kid-goat.png", he: "גְּדִי", tl: "gedi", en: "kid",
    species: "goats", stage: "young",
    age: "Day 8 — end of year 1",
    ageNote: "A se'ir izim ben shanah — a one‑year‑old male goat.",
    usedFor: [
      { he: "קָרְבַּן פֶּסַח", tl: "Pesach", en: "From sheep or from goats, in its first year." },
      { he: "חַטַּאת יָחִיד (זָכָר חָרִיג)", tl: "Chatat (exceptional)", en: "Brought as a male chatat for a nasi." }
    ]
  },
  "male-cow": {
    img: "cow-male.png", he: "פַּר", tl: "par", en: "bull (also: שׁוֹר shor)",
    species: "cattle", stage: "adult male",
    age: "Year 2 — through age 3",
    ageNote: "A par is two years old; cattle remain eligible until their third year ends.",
    usedFor: [
      { he: "עוֹלָה (פַּר בֶּן בָּקָר)", tl: "Olah", en: "A par as a burnt offering." },
      { he: "פַּר כֹּהֵן מָשִׁיחַ", tl: "Par kohen mashiach", en: "The high priest's chatat for an erroneous ruling." },
      { he: "פַּר הַעֲלֵם דָּבָר שֶׁל צִבּוּר", tl: "Par he'elem davar", en: "Communal chatat for a court's mistaken ruling." },
      { he: "פַּר יוֹם הַכִּפּוּרִים", tl: "Par Yom Kippur", en: "The kohen gadol's chatat on Yom Kippur." }
    ]
  },
  "male-sheep": {
    img: "ram.png", he: "אַיִל", tl: "ayil", en: "ram (from day 31 of yr 2)",
    species: "sheep", stage: "adult male",
    age: "Day 31 of year 2 — end of year 2",
    ageNote: "Called ayil only from the 31st day of its second year onward.",
    usedFor: [
      { he: "אָשָׁם", tl: "Asham", en: "Always an ayil — including asham gezelot and asham me'ilot." },
      { he: "אֵילֵי נָזִיר", tl: "Eilei nazir", en: "The nazir's olah and shelamim ram." },
      { he: "אֵיל הַמִּלּוּאִים", tl: "Eil ha'miluim", en: "Inauguration of the kohanim." },
      { he: "אֵיל יוֹם הַכִּפּוּרִים", tl: "Eil Yom Kippur", en: "The kohen gadol's & community's ram of the day." }
    ]
  },
  "male-goat": {
    img: "male-goat.png", he: "תַּיִשׁ", tl: "tayish", en: "he-goat (also: שָׂעִיר sa'ir)",
    species: "goats", stage: "adult male",
    age: "Year 2 (1 – 2 years)",
    ageNote: "A sa'ir is two years old; throughout its second year called sa'ir.",
    usedFor: [
      { he: "שָׂעִיר חַטַּאת נָשִׂיא", tl: "Chatat of a nasi", en: "A tribal leader's individual chatat — male." },
      { he: "שְׂעִירֵי רֹאשׁ חֹדֶשׁ וְרֶגֶל", tl: "Sa'ir of Rosh Chodesh & festivals", en: "Communal chatat at every musaf." },
      { he: "שָׂעִיר לַעֲזָאזֵל / לַה'", tl: "Sa'irei Yom Kippur", en: "The two goats of Yom Kippur." }
    ]
  },
  "female-cow": {
    img: "cow-f.png", he: "פָּרָה", tl: "parah", en: "cow",
    species: "cattle", stage: "adult female",
    age: "Year 2 — through age 3",
    ageNote: "Cattle females share the same eligibility window as males.",
    usedFor: [
      { he: "שְׁלָמִים", tl: "Shelamim", en: "From cattle, male or female." },
      { he: "פָּרָה אֲדֻמָּה", tl: "Parah adumah", en: "The red heifer — purification, not on the altar." }
    ]
  },
  "female-sheep": {
    img: "ewe.png", he: "רָחֵל", tl: "rachel", en: "ewe (also: כַּבְשָׂה kavsa)",
    species: "sheep", stage: "adult female",
    age: "From day 31 of year 2 — end of year 2",
    ageNote: "An adult ewe shares the ayil age window.",
    usedFor: [
      { he: "חַטַּאת יָחִיד", tl: "Chatat yachid", en: "The default individual chatat — always female." },
      { he: "שְׁלָמִים", tl: "Shelamim", en: "From sheep, male or female." },
      { he: "כִּבְשַׂת אָשָׁם מְצֹרָע", tl: "Asham metzora (kivsah)", en: "The female asham of the metzora." }
    ]
  },
  "female-goat": {
    img: "female-goat-never-used.png", he: "עֵז", tl: "ez", en: "she-goat (also: שְׂעִירָה se'irah)",
    species: "goats", stage: "adult female",
    age: "Year 2 (1 – 2 years)",
    ageNote: "Shares the sa'ir age window.",
    usedFor: [
      { he: "שְׂעִירַת עִזִּים — חַטַּאת יָחִיד", tl: "Chatat yachid", en: "The default female chatat for an individual." },
      { he: "שְׁלָמִים", tl: "Shelamim", en: "From goats, male or female." }
    ]
  }
};
// Reveal one ROW at a time (3 reveals total: r1=young, r2=adult male, r3=adult female).
const SlideNames = {
  title: "Each species, its own words for young and grown",
  dek: "The Torah doesn't say \"a young male cow\" — it says egel.",
  sources: [SRC_MK_1_14],
  maxReveal: 3,
  context:
    <div className="slide-context">
      <p>Each of the three mammal species has a distinct Hebrew name for the young animal and for the grown one. The Torah is precise: a <span className="he-inline">כֶּבֶשׂ</span> and an <span className="he-inline">אַיִל</span> are both male sheep, but they name different age categories and are not interchangeable in a korban specification.</p>
      <p>The Rambam rules: wherever the Torah says <span className="he-inline">כֶּבֶשׂ</span>, <span className="he-inline">כַּבְשָׂה</span>, or <span className="he-inline">כְּבָשִׂים</span>, the animal is in its first year; wherever it says <span className="he-inline">אַיִל</span> or <span className="he-inline">אֵילִים</span>, it is a male in its second year. The same precision applies to goats and cattle. Age is measured <strong>to the hour</strong> for all mammal offerings. An animal that crosses from one age category to the next — even by one hour between slaughter and blood-sprinkling — is disqualified, because the valid age window must hold through the final step of zerikah.</p>
      <p>For birds, eligibility is determined by physical maturity, not by age in days. A turtledove must be adult; a young pigeon must be young. Each is invalid at the other's stage.</p>
    </div>,
  render: (r, ctx) =>
  <div className="names">
      <div className="names-corner" />
      {NAMES_COLS.map((col) =>
    <div className="names-col" key={col.key}>
          <span className="he">{col.he}</span>
          <span className="en">{col.en}</span>
        </div>
    )}
      {NAMES_ROWS.map((row, ri) =>
    <React.Fragment key={row.key}>
          <Fade on={r >= ri + 1}>
            <div className="names-row">
              <span className="en">{row.en}</span>
              <span className="sub">{row.sub}</span>
            </div>
          </Fade>
          {NAMES_COLS.map((col, ci) => {
        const cellKey = row.key + "-" + col.key;
        const cell = NAMES_CELLS[cellKey];
        return (
          <Fade on={r >= ri + 1} delay={ci * 90} key={col.key}>
                <button
                  type="button"
                  className="names-cell"
                  onClick={(e) => {
                e.stopPropagation();
                ctx && ctx.openZoom && ctx.openZoom(cellKey);
              }}
                  aria-label={"More about " + cell.tl + ": " + cell.en}>
                  <div className="names-img" style={{ backgroundImage: `url(assets/${cell.img})` }} />
                  <div className="names-meta">
                    <span className="he">{cell.he}</span>
                    <span className="tl">{cell.tl}</span>
                    <span className="en">{cell.en}</span>
                  </div>
                  <span className="names-cell-zoom" aria-hidden="true">⤢</span>
                </button>
              </Fade>);

      })}
        </React.Fragment>
    )}
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 3 · How old is old enough?                                   */
/* ═══════════════════════════════════════════════════════════════════ */
//  r1: axis + segments
//  r2: explanation cards
//  r3: max cards
const SlideAges = {
  title: "How old is old enough?",
  dek: "Animals enter and leave eligibility on the calendar — to the day.",
  sources: [SRC_MK_1_11],
  maxReveal: 3,
  context:
    <div className="slide-context">
      <p>Eligibility for the altar is also a matter of age. A mammal offering may not be brought before the animal has completed its first seven days of life (Vayikra 22:27). From the eighth day onward the animal is valid <em>b'di'eved</em>, but the Rambam rules that <em>l'chatchila</em> one should wait until the thirtieth day. The three exceptions — bechor, pesach, and ma'aser — may be offered from day eight as a first preference.</p>
      <p>Every mammal species also has a maximum age. Cattle may be offered through three full years; sheep and goats through two full years. Beyond those limits the animal is considered <span className="he-inline">זָקֵן</span> (old) and may not be brought.</p>
      <p>Age windows are measured from the hour of birth (<span className="he-inline">מִיּוֹם לְיוֹם</span>). If a leap-year month extended the animal's year, that extension carries over to its eligibility window as well.</p>
    </div>,
  render: (r) =>
  <div className="ages">
      <Fade on={r >= 1}>
        <div className="ages-axis" aria-label="Eligibility timeline">
          <div className="ages-segment ages-seg-1">days 1–7</div>
          <div className="ages-segment ages-seg-2">days 8–29</div>
          <div className="ages-segment ages-seg-3">day 30 onward</div>
          <span className="ages-tick" style={{ left: "0%" }}>birth</span>
          <span className="ages-tick" style={{ left: "8.5%" }}>day 8</span>
          <span className="ages-tick" style={{ left: "31%" }}>day 30</span>
          <span className="ages-tick" style={{ left: "100%" }}>max age</span>
        </div>
      </Fade>

      <Fade on={r >= 2}>
        <svg
          className="ages-connectors"
          viewBox="0 0 100 32"
          preserveAspectRatio="none"
          aria-hidden="true">
          
          {/* Segment 1 → card 1 (left + right edges) */}
          <path className="cl-1" d="M 1,0 L 0,32" />
          <path className="cl-1" d="M 9,0 L 32,32" />
          {/* Segment 2 → card 2 */}
          <path className="cl-2" d="M 10,0 L 34,32" />
          <path className="cl-2" d="M 31,0 L 66,32" />
          {/* Segment 3 → card 3 */}
          <path className="cl-3" d="M 33,0 L 68,32" />
          <path className="cl-3" d="M 99,0 L 100,32" />
        </svg>
      </Fade>

      <Fade on={r >= 2}>
        <div className="ages-explain">
          <div className="band-card t1">
            <span className="range">Days 1 – 7</span>
            <span className="name">Too young — פָּסוּל</span>
            <p className="note">Not a valid korban at any cost.</p>
          </div>
          <div className="band-card t2">
            <span className="range">Days 8 – 29</span>
            <span className="name">Valid b'di'eved</span>
            <p className="note">From the eighth day a korban is kasher — but l'chatchila one waits.</p>
          </div>
          <div className="band-card t3">
            <span className="range">Day 30 onward</span>
            <span className="name">Valid l'chatchila</span>
            <p className="note">Bechor, pesach, and ma'aser may already be brought from day 8.</p>
          </div>
        </div>
      </Fade>

      <Fade on={r >= 3}>
        <div className="ages-divider">Maximum age</div>
      </Fade>
      <Fade on={r >= 3} delay={100}>
        <div className="ages-maxes">
          <div className="max-card">
            <span className="he">בָּקָר</span>
            <span className="en">Cattle</span>
            <span className="num">≤ 3 years</span>
          </div>
          <div className="max-card">
            <span className="he">כְּבָשִׂים · עִזִּים</span>
            <span className="en">Sheep · Goats</span>
            <span className="num">≤ 2 years</span>
          </div>
          <div className="max-card call">
            <span className="he">פִּלְגָּס</span>
            <span className="en">Pilgas</span>
            <span className="num">day 30 of yr 2</span>
            <span className="note">A male sheep on this one day is neither keves nor ayil.</span>
          </div>
        </div>
      </Fade>
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 4 · Four categories of korban                                */
/* ═══════════════════════════════════════════════════════════════════ */
//  r1–r4: each card's line; r5: extras
const KORBANOT = [
{ he: "עוֹלָה", tl: "olah", en: "burnt offering",
  line: "Entirely burned on the mizbe'ach. No portion is eaten — wholly to Hashem." },
{ he: "חַטָּאת", tl: "chatat", en: "sin offering",
  line: "Atones for accidental violation of a karet-bearing prohibition." },
{ he: "אָשָׁם", tl: "asham", en: "guilt offering",
  line: "Brought for specific transgressions, or in doubt (asham talui)." },
{ he: "שְׁלָמִים", tl: "shelamim", en: "peace offering",
  line: "Eimurin to the altar, portions to the kohen, the rest is feasted by the owner." }];

const SlideKorbanos = {
  title: "The four categories of korban",
  dek: "Every offering — communal or individual — fits one of four kinds.",
  sources: [SRC_MK_1_2],
  maxReveal: 5,
  context:
    <div className="slide-context">
      <p>Every korban in the Torah — communal or individual, daily or once-in-a-lifetime — belongs to one of four categories. Three additional offerings are brought only by individuals; no communal form of them exists.</p>
      <p>The four main categories: <strong>עוֹלָה (olah)</strong> — entirely burned on the altar, no portion is eaten. <strong>חַטָּאת (chatat)</strong> — brought for the accidental violation of a karet-bearing prohibition. <strong>אָשָׁם (asham)</strong> — brought for specific transgressions, or in a case of doubt. <strong>שְׁלָמִים (shlamim)</strong> — the only korban from which the owner eats; the altar receives certain fat portions, the kohen receives specified parts, and the owner eats the rest.</p>
    </div>,
  render: (r) =>
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <div className="korban-grid">
        {KORBANOT.map((k, i) =>
      <div className="korban-card" key={k.tl}>
            <span className="he">{k.he}</span>
            <span className="tl">{k.tl}</span>
            <span className="en">{k.en}</span>
            <Fade on={r >= i + 1}>
              <p className="line">{k.line}</p>
            </Fade>
          </div>
      )}
      </div>
      <Fade on={r >= 5}>
        <div className="korban-extras">
          <span className="label">Three more · individuals only</span>
          <div className="items">
            <span className="item"><span className="he">פֶּסַח</span> pesach</span>
            <span className="item"><span className="he">בְּכוֹר</span> bechor</span>
            <span className="item"><span className="he">מַעֲשֵׂר</span> ma'aser</span>
          </div>
        </div>
      </Fade>
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 5 · Animal × korban                                          */
/* ═══════════════════════════════════════════════════════════════════ */
const MATCH_PANELS = [
{ he: "עוֹלָה", en: "Olah",
  rules: [
  { k: "Sex", v: "males only (mammals); either for birds" },
  { k: "Species", v: "any of the five" },
  { k: "Age", v: "any valid age" }],

  pics: ["cow-male.png", "ram.png", "male-goat.png"]
},
{ he: "שְׁלָמִים", en: "Shlamim",
  rules: [
  { k: "Sex", v: "male or female" },
  { k: "Species", v: "mammals only — no birds" },
  { k: "Age", v: "any valid age" }],

  pics: ["cow-f.png", "ewe.png", "female-goat-never-used.png"]
},
{ he: "אָשָׁם", en: "Asham",
  rules: [
  { k: "Sex", v: "male only" },
  { k: "Species", v: "sheep only — never cattle, goats, birds" },
  { k: "Age", v: "usually adult (ayil); metzora's asham is a keves" }],

  pics: ["ram.png", "lamb.png"]
},
{ he: "חַטָּאת יָחִיד", en: "Chatat (individual)",
  rules: [
  { k: "Sex", v: "female" },
  { k: "Species", v: "any of the five" },
  { k: "Exceptions", v: "nasi (male goat); kohen mashiach & KG on Yom Kippur (bull)" }],

  pics: ["ewe.png", "female-goat-never-used.png"]
}];

const SlideMatch = {
  title: "Which animal for which korban?",
  dek: "Each korban dictates species, sex, and sometimes age.",
  sources: [SRC_MK_1_6],
  maxReveal: 5,
  context:
    <div className="slide-context">
      <p>Each of the four main categories specifies which species and sex are acceptable. The Rambam covers these rules in halachot 1:7–1:10 and adds a further halacha (1:15) for communal-vs-individual distinctions.</p>
      <ul>
        <li>An <span className="he-inline">עוֹלָה</span> from mammals is always <strong>male</strong>. From birds, either sex is valid.</li>
        <li>A <span className="he-inline">שְׁלָמִים</span> may be male or female, but only from mammals — <strong>never from birds</strong>.</li>
        <li>An <span className="he-inline">אָשָׁם</span> comes only from <strong>male sheep</strong> — never from cattle, goats, or birds.</li>
        <li>An individual <span className="he-inline">חַטָּאת</span> is <strong>female</strong>. Communal chataat are from goats or cattle only — never sheep. Communal olot come from sheep or cattle — never goats.</li>
      </ul>
    </div>,
  render: (r) =>
  <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      <div className="match">
        {MATCH_PANELS.map((p, i) =>
      <Fade on={r >= i + 1} key={p.en}>
            <div className="match-panel">
              <header>
                <span className="he">{p.he}</span>
                <span className="en">{p.en}</span>
              </header>
              <div className="match-rules">
                {p.rules.map((rule) =>
            <div className="match-rule" key={rule.k}>
                    <span className="k">{rule.k}</span>
                    <span>{rule.v}</span>
                  </div>
            )}
              </div>
              <div className="match-pics">
                {p.pics.map((src) => <img key={src} src={"assets/" + src} alt="" />)}
              </div>
            </div>
          </Fade>
      )}
      </div>
      <Fade on={r >= 5}>
        <div className="match-note">
          A communal chatat is always male, and never a sheep — only a goat or a bull. The community never brings an asham, and never a bird.
        </div>
      </Fade>
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide 6 · Communal vs. individual, and the holiness scale          */
/* ═══════════════════════════════════════════════════════════════════ */
//  r1: communal restriction rule
//  r2: KK column
//  r3: Kalim column
const SlideKK = {
  title: "Communal vs. individual — and the holiness scale",
  dek: "The community is limited to olah or chatat. Holiness grade follows from category.",
  sources: [SRC_MK_1_4, SRC_MK_1_17],
  maxReveal: 3,
  context:
    <div className="slide-context">
      <p>The distinction between <strong>communal</strong> and <strong>individual</strong> offerings governs which types of korban may be brought. Communal offerings follow a fixed public schedule. Individual offerings arise from personal circumstances: a birth, an accidental transgression, a vow, or a festival obligation.</p>
      <p>Communal offerings are always either an olah or a chatat — never shlamim (except one special case on Shavuos), never an asham, and never a bird. The exception: on Shavuos, two male sheep in their first year are brought alongside the two loaves of bread as communal shlamim, called <span className="he-inline">זִבְחֵי שַׁלְמֵי צִבּוּר</span>.</p>
      <p>Holiness grade follows from category automatically — no separate table to memorize. Olot, chataat, ashamot, and the Shavuos kvasim are <span className="he-inline">קָדְשֵׁי קָדָשִׁים</span> (most-holy). Individual shlamim, bechor, maaser, and pesach are <span className="he-inline">קָדָשִׁים קַלִּים</span> (lesser-holy).</p>
    </div>,
  render: (r) =>
  <div className="kk-wrap">
      <Fade on={r >= 1}>
        <div className="communal-rule">
          <div className="communal-rule-row">
            <span className="cr-label">Communal offerings</span>
            <span className="cr-value">olah or chatat only</span>
          </div>
          <div className="communal-rule-pills">
            <span className="cr-pill cr-exception">Exception · Shavuos: two kvasim as communal shlamim</span>
            <span className="cr-pill cr-never">Never: asham · Never: a bird</span>
          </div>
        </div>
      </Fade>
      <div className="kk">
        <Fade on={r >= 2}>
          <div className="kk-col kk">
            <header>
              <span className="he">קָדְשֵׁי קָדָשִׁים</span>
              <span className="en">Kodshei Kodashim · Most holy</span>
            </header>
            <ul>
              <li><span className="he">עוֹלָה</span>olah</li>
              <li><span className="he">חַטָּאת</span>chatat</li>
              <li><span className="he">אָשָׁם</span>asham</li>
              <li><span className="he">שַׁלְמֵי צִבּוּר</span>communal shlamim</li>
            </ul>
          </div>
        </Fade>
        <Fade on={r >= 3}>
          <div className="kk-col lt">
            <header>
              <span className="he">קָדָשִׁים קַלִּים</span>
              <span className="en">Kodashim Kalim · Lighter holies</span>
            </header>
            <ul>
              <li><span className="he">שְׁלָמִים</span>shlamim (indiv.)</li>
              <li><span className="he">בְּכוֹר</span>bechor</li>
              <li><span className="he">מַעֲשֵׂר</span>ma'aser</li>
              <li><span className="he">פֶּסַח</span>pesach</li>
            </ul>
          </div>
        </Fade>
      </div>
    </div>

};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Slide registry                                                     */
/* ═══════════════════════════════════════════════════════════════════ */
const SLIDES = [
SlideIntro, SlideSpecies, SlideNames, SlideAges,
SlideKorbanos, SlideMatch, SlideKK];


/* ═══════════════════════════════════════════════════════════════════ */
/*  Source scroll — centered Torah scroll with multi-source paging.    */
/* ═══════════════════════════════════════════════════════════════════ */
function SourceScroll({ sources, onClose }) {
  const [idx, setIdx] = useStateLV(0);
  const total = sources ? sources.length : 0;
  useEffectLV(() => {setIdx(0);}, [sources]);

  useEffectLV(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {e.preventDefault();onClose();}
      if (e.key === "ArrowLeft" && idx > 0) {e.preventDefault();setIdx(idx - 1);}
      if (e.key === "ArrowRight" && idx < total - 1) {e.preventDefault();setIdx(idx + 1);}
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, total, onClose]);

  if (!sources || sources.length === 0) return null;
  const cur = sources[idx];

  return (
    <div className="drawer-back" onClick={onClose} role="presentation">
      <div
        className="scroll"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={"Source: " + cur.cite}>
        
        <div className="rod" aria-hidden="true" />
        <div className="parchment">
          <button
            type="button"
            className="parchment-close"
            onClick={onClose}
            aria-label="Close">
            ×</button>
          <div className="parchment-eyebrow">Source</div>
          <h3 className="parchment-cite">{cur.cite}</h3>
          <div className="parchment-body">
            <div className="parchment-en">{cur.en}</div>
            <div className="parchment-divider" />
            <div className="parchment-he">{cur.he}</div>
          </div>
          {total > 1 &&
          <div className="parchment-paging">
              <button
              type="button"
              className="paging-arrow"
              onClick={() => setIdx(idx - 1)}
              disabled={idx === 0}
              aria-label="Previous source">
              ←</button>
              <div className="paging-dots">
                {sources.map((s, i) =>
              <button
                key={i}
                type="button"
                className={"paging-dot" + (i === idx ? " current" : "")}
                onClick={() => setIdx(i)}
                aria-label={"Source " + (i + 1) + ": " + s.cite} />

              )}
              </div>
              <button
              type="button"
              className="paging-arrow"
              onClick={() => setIdx(idx + 1)}
              disabled={idx === total - 1}
              aria-label="Next source">
              →</button>
              <span className="paging-count">
                <b>{idx + 1}</b> of {total}
              </span>
            </div>
          }
        </div>
        <div className="rod" aria-hidden="true" />
      </div>
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Name-cell zoom — clicked from the 3×3 names grid                  */
/* ═══════════════════════════════════════════════════════════════════ */
function NameCellZoom({ cellKey, onClose }) {
  const cell = NAMES_CELLS[cellKey];
  if (!cell) return null;
  return (
    <div className="zoom-back" onClick={onClose} role="presentation">
      <div
        className="zoom-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={"Details for " + cell.tl}>
        <button
          type="button"
          className="zoom-close"
          onClick={onClose}
          aria-label="Close">
          ×</button>

        <div className="zoom-hero">
          <div
            className="zoom-img"
            style={{ backgroundImage: `url(assets/${cell.img})` }}
            aria-hidden="true" />

          <div className="zoom-tags">
            <span className="zoom-tag">{cell.species}</span>
            <span className="zoom-tag">{cell.stage}</span>
          </div>
        </div>

        <div className="zoom-body">
          <div className="zoom-eyebrow">The Torah's name</div>
          <h3 className="zoom-he">{cell.he}</h3>
          <div className="zoom-namepair">
            <span className="tl">{cell.tl}</span>
            <span className="sep">·</span>
            <span className="en">{cell.en}</span>
          </div>

          <div className="zoom-section">
            <div className="zoom-section-head">
              <span className="label">Eligibility window</span>
              <span className="value">{cell.age}</span>
            </div>
            {cell.ageNote && <p className="zoom-section-note">{cell.ageNote}</p>}
          </div>

          <div className="zoom-section">
            <div className="zoom-section-head">
              <span className="label">Used as / in</span>
              <span className="value">{cell.usedFor.length} korbanos</span>
            </div>
            <ul className="zoom-uses">
              {cell.usedFor.map((u, i) =>
              <li key={i}>
                  <div className="zoom-use-title">
                    <span className="he">{u.he}</span>
                    <span className="tl">{u.tl}</span>
                  </div>
                  <div className="zoom-use-en">{u.en}</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════ */
/*  LearnScreen                                                        */
/* ═══════════════════════════════════════════════════════════════════ */
function LearnScreen({ onDone, onBack, onSwitchStage }) {
  const [slideIdx, setSlideIdx] = useStateLV(0);
  const [reveal, setReveal] = useStateLV(0);
  const [drawerOpen, setDrawerOpen] = useStateLV(false);
  const [zoomCell, setZoomCell] = useStateLV(null);
  const [showScrollHint, setShowScrollHint] = useStateLV(false);
  const slideAreaRef = useRefLV(null);

  const slide = SLIDES[slideIdx];
  const sources = slide.sources || [];
  const atLastReveal = reveal >= slide.maxReveal;
  const atLastSlide = slideIdx >= SLIDES.length - 1;
  const modalOpen = drawerOpen || zoomCell !== null;

  const advance = useCallbackLV(() => {
    if (modalOpen) return;
    if (!atLastReveal) {setReveal((v) => v + 1);return;}
    if (!atLastSlide) {setSlideIdx((i) => i + 1);setReveal(0);return;}
    onDone();
  }, [atLastReveal, atLastSlide, modalOpen, onDone]);

  const back = useCallbackLV(() => {
    if (zoomCell !== null) {setZoomCell(null);return;}
    if (drawerOpen) {setDrawerOpen(false);return;}
    if (reveal > 0) {setReveal((v) => v - 1);return;}
    if (slideIdx > 0) {
      const prev = SLIDES[slideIdx - 1];
      setSlideIdx((i) => i - 1);
      setReveal(prev.maxReveal);
      return;
    }
    onBack && onBack();
  }, [reveal, slideIdx, drawerOpen, zoomCell, onBack]);

  const jumpTo = (i) => {setSlideIdx(i);setReveal(SLIDES[i].maxReveal);};

  useEffectLV(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      if (e.key === "Escape" && zoomCell !== null) {e.preventDefault();setZoomCell(null);return;}
      if (e.key === "Escape" && drawerOpen) {e.preventDefault();setDrawerOpen(false);return;}
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();advance();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, drawerOpen, zoomCell]);

  // Scroll to top and reset hint whenever the slide changes.
  useEffectLV(() => {
    const el = slideAreaRef.current;
    if (el) el.scrollTop = 0;
    setShowScrollHint(false);
  }, [slideIdx]);

  // Show a bounce arrow after 2s if the area has overflow and user hasn't scrolled.
  useEffectLV(() => {
    const el = slideAreaRef.current;
    if (!el) return;
    let scrolled = false;
    const onScroll = () => { scrolled = true; setShowScrollHint(false); };
    el.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(() => {
      if (!scrolled && el.scrollHeight > el.clientHeight + 10) {
        setShowScrollHint(true);
      }
    }, 2000);
    return () => { clearTimeout(timer); el.removeEventListener("scroll", onScroll); };
  }, [slideIdx]);

  const continueLabel = atLastReveal ?
  atLastSlide ? "Prove yourself" : "Next lesson" :
  "Continue";

  return (
    <div className="learn">
      <TopBar
        stage="learn"
        onStageChange={onSwitchStage}
        onExit={onBack} />
      

      <div className="slide-area" ref={slideAreaRef}>
        <div className="slide-head">
          <div className="slide-eyebrow-row">
            <div className="slide-eyebrow">
              <span className="step">Level 01 · Learn</span>
              <span className="sep" />
              <span>Lesson {String(slideIdx + 1).padStart(2, "0")} of {String(SLIDES.length).padStart(2, "0")}</span>
            </div>
            <div className="lesson-progress" role="tablist" aria-label="Lesson progress">
              {SLIDES.map((_, i) => {
                const state = i === slideIdx ? "current" : i < slideIdx ? "done" : "future";
                return (
                  <button
                    key={i}
                    type="button"
                    className={"dot " + state}
                    onClick={(e) => {e.stopPropagation();jumpTo(i);}}
                    aria-label={"Lesson " + (i + 1)}
                    aria-current={i === slideIdx ? "step" : undefined} />);


              })}
            </div>
          </div>
          <h1 className="slide-title">{slide.title}</h1>
          {slide.dek && <p className="slide-dek">{slide.dek}</p>}
        </div>
        <div className="slide-canvas" key={slideIdx /* re-mount per slide so fades replay */}>
          {slide.context}
          {slide.render(reveal, { openZoom: (k) => setZoomCell(k) })}
        </div>
      </div>

      <div className="dock" onClick={(e) => e.stopPropagation()}>
        <div className="dock-left">
          <button type="button" className="btn ghost back" onClick={back}>
            <span className="arrow">←</span>
            <span>Back</span>
          </button>
        </div>
        <div className="dock-mid">
          {sources.length > 0 ?
          <button
            type="button"
            className="source-link"
            onClick={() => setDrawerOpen(true)}>
            
              <span className="src-label">{sources.length > 1 ? "Sources" : "Source"}</span>
              <span className="src-cite">
                {sources.length === 1 ?
              sources[0].cite :
              sources[0].cite + " + " + (sources.length - 1) + " more"}
              </span>
              <span className="src-arrow">↗</span>
            </button> :

          <span style={{ opacity: 0 }} aria-hidden="true">·</span>
          }
        </div>
        <div className="dock-right">
          <button
            type="button"
            className={"btn primary " + (atLastReveal && atLastSlide ? "gold" : "")}
            onClick={advance}>
            
            <span>{continueLabel}</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {drawerOpen &&
      <SourceScroll sources={sources} onClose={() => setDrawerOpen(false)} />
      }
      {zoomCell !== null &&
      <NameCellZoom cellKey={zoomCell} onClose={() => setZoomCell(null)} />
      }
      {showScrollHint && (
        <button
          type="button"
          className="scroll-hint"
          aria-label="Scroll down"
          onClick={() => slideAreaRef.current?.scrollBy({ top: 320, behavior: "smooth" })}
        >↓</button>
      )}
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Top bar — brand + stage bricks + actions                          */
/* ═══════════════════════════════════════════════════════════════════ */
const STAGES = [
{ id: "learn", num: "01", label: "Learn" },
{ id: "prove", num: "02", label: "Prove" },
{ id: "review", num: "03", label: "Review" }];


function TopBar({ stage, onStageChange, onExit, onMusic }) {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="brand-mark">קדשים</span>
        <span className="brand-sep" />
        <span className="brand-title">
          <span className="num">LVL 01</span>
        </span>
      </div>

      <div className="stage-wrap">
        <div className="stage-label">Level 01 · Animals for Korbanos</div>
        <div className="stage-bricks" role="tablist" aria-label="Stage selector">
          {STAGES.map((s) =>
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={stage === s.id}
            className={"brick" + (stage === s.id ? " active" : "")}
            onClick={() => onStageChange && onStageChange(s.id)}
            title={s.label}>
            
              <span className="brick-num">{s.num}</span>
              <span className="brick-name">{s.label}</span>
            </button>
          )}
        </div>
      </div>

      <div className="topbar-actions">
        {onMusic &&
        <button type="button" className="icon-btn" onClick={onMusic} title="Music">♪</button>
        }
        <button type="button" className="icon-btn exit" onClick={onExit} title="Exit to the steps" aria-label="Exit">×</button>
      </div>
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Quiz intro splash                                                  */
/* ═══════════════════════════════════════════════════════════════════ */
function QuizIntroScreen({ onBegin, onBack, onSwitchStage }) {
  useEffectLV(() => {
    const onKey = (e) => {
      if (e.key !== "Enter") return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      onBegin();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBegin]);

  return (
    <div className="quiz">
      <TopBar stage="prove" onStageChange={onSwitchStage} onExit={onBack} />
      <div className="quiz-intro">
        <div className="quiz-intro-art">
          <img src="assets/test.png" alt="Time to prove yourself" />
        </div>
        <div className="quiz-intro-text">
          <div className="quiz-intro-eyebrow">Level 01 · Prove Your Knowledge</div>
          <h1 className="quiz-intro-h">Time to test what you've learned.</h1>
          <p className="quiz-intro-p">
            A mix of multiple-choice, sorting, and matching cards drawn from
            the six lessons you just walked through.
          </p>
          <ul className="quiz-intro-rules">
            <li><b>Three hearts.</b> Each wrong answer costs one.</li>
            <li><b>Seventy percent</b> correct earns the step.</li>
            <li><b>Earlier material</b> may resurface in later levels.</li>
          </ul>
          <div className="quiz-intro-actions">
            <button type="button" className="btn" onClick={onBack}>Back to the steps</button>
            <button type="button" className="btn primary gold" onClick={onBegin}>
              <span>Begin</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Result screen                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
function ResultScreen({ passed, hearts, total, correct, onMap, onRetry, onSwitchStage }) {
  useEffectLV(() => {
    const onKey = (e) => {
      if (e.key !== "Enter") return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      onRetry();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onRetry]);

  return (
    <div className="quiz">
      <TopBar stage="prove" onStageChange={onSwitchStage} onExit={onMap} />
      <div className="result">
        <div className="result-card">
          <div className="quiz-intro-eyebrow">Level 01 · Verdict</div>
          <h1 className="result-h">{passed ? "Proven." : "Not yet."}</h1>
          <p className="result-p">
            {passed ?
            "You're ready to climb to Level 02." :
            "Try again — every wrong answer was a chance to remember better."}
          </p>
          <div className="result-stats">
            <div className="result-stat">
              <span className="v">{correct}/{total}</span>
              <span className="l">Correct</span>
            </div>
            <div className="result-stat">
              <span className="v">{Math.round(correct / total * 100)}%</span>
              <span className="l">Score</span>
            </div>
            <div className="result-stat">
              <span className="v">{hearts}</span>
              <span className="l">Hearts left</span>
            </div>
          </div>
          <div className="result-actions">
            <button className="btn" onClick={onMap}>Back to the steps</button>
            <button className="btn primary gold" onClick={onRetry}>
              <span>{passed ? "Continue" : "Try again"}</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>);

}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Review screen (placeholder until earlier-material cards exist)     */
/* ═══════════════════════════════════════════════════════════════════ */
function ReviewScreen({ onSwitchStage, onBack }) {
  return (
    <div className="review">
      <TopBar stage="review" onStageChange={onSwitchStage} onExit={onBack} />
      <div className="review-body">
        <div className="review-card">
          <div className="quiz-intro-eyebrow">Level 01 · Review</div>
          <h2 className="review-h">Spaced-review cards live here.</h2>
          <p className="review-p">
            Once you've finished a level, the words and concepts you've
            already met start mixing in with the new ones — so old material
            doesn't quietly slip away. There's nothing to review yet from
            Level 01.
          </p>
          <div className="review-coming">Coming soon</div>
          <div className="result-actions" style={{ marginTop: 14 }}>
            <button type="button" className="btn" onClick={() => onSwitchStage("learn")}>
              <span className="arrow">←</span>
              <span>Back to Learn</span>
            </button>
            <button type="button" className="btn primary" onClick={() => onSwitchStage("prove")}>
              <span>Go to Prove</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>);

}

/* ─── Confetti ────────────────────────────────────────────────────── */
function Confetti() {
  const COLORS = ["#D4A046", "#6B8A3F", "#B85A3D", "#4A7CB5", "#8B5E9C", "#D46B46", "#4BAF82"];
  const pieces = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      dur: 2.5 + Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: 7 + Math.random() * 9,
      h: 5 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 120,
    })), []);

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            "--x": p.x + "%",
            "--w": p.w + "px",
            "--h": p.h + "px",
            "--color": p.color,
            "--delay": p.delay + "s",
            "--dur": p.dur + "s",
            "--drift": p.drift + "px",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Success screen ──────────────────────────────────────────────── */
function SuccessScreen({ hearts, correct, total, onMap, onRetry, onSwitchStage }) {
  const missed = total - correct;

  useEffectLV(() => {
    const onKey = (e) => {
      if (e.key !== "Enter") return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
      onRetry();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onRetry]);

  return (
    <div className="quiz">
      <Confetti />
      <TopBar stage="prove" onStageChange={onSwitchStage} onExit={onMap} />
      <div className="success-body">
        <img src="assets/success.png" className="success-img" alt="" />
        <div className="quiz-intro-eyebrow">Level 01 · Complete</div>
        <h1 className="success-h">Well done.</h1>
        <p className="result-p">
          {missed === 0
            ? "You answered every question correctly. Outstanding."
            : `You finished with ${hearts} heart${hearts !== 1 ? "s" : ""} to spare — ready to move on.`}
        </p>
        <div className="result-actions">
          <button type="button" className="btn" onClick={onMap}>Back to the steps</button>
          <button type="button" className="btn primary gold" onClick={onRetry}>
            <span>Continue</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LearnScreen, QuizIntroScreen, ResultScreen, TopBar, ReviewScreen, SuccessScreen });