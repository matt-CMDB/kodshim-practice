// Level 1 — Animals for korbanot.
// Lessons for this level are the bespoke illustrated slides in
// kodshim-learn.jsx (lessons: null here). Quiz bank + concepts below.
window.KODSHIM_LEVELS = window.KODSHIM_LEVELS || {};
window.KODSHIM_LEVELS[1] = {
  num: 1,
  name: "Which animals, and when",
  he: "בְּהֵמָה וָעוֹף",
  tagline: "Five species, their names at every age, and which korban takes which.",
  summary: [
    "Before any law of korbanot can be understood, you need the framework: which creatures are eligible for the altar, what they are called at each age, which four master categories every korban falls into, and what a community may bring that an individual may not.",
    "This level follows the first chapter of the Rambam's {{he:הִלְכוֹת מַעֲשֵׂה הַקָּרְבָּנוֹת}} from halacha 1 to 18.",
  ],
  scope: "Maaseh HaKorbanot 1:1–1:18",
  lessons: [
    {
      id: "L1-01",
      title: "Five species, and only five",
      dek: "Of every animal alive, the Torah names just five as fit for the altar.",
      sources: ["Maaseh HaKorbanot 1:1", "Vayikra 1:2", "Vayikra 1:14"],
      intro: [
        "Of every creature alive, the Torah lets only five kinds onto the altar: three from the herd and flock, and two kinds of bird.",
        "A deer is kosher to eat. A chicken is kosher to eat. Neither can ever be a korban.",
      ],
      blocks: [
        { type: "cards", items: [
          { he: "בָּקָר", tl: "bakar", en: "cattle", img: "assets/cow-male.webp", text: "The herd. Bulls, cows, and calves." },
          { he: "כְּבָשִׂים", tl: "kevasim", en: "sheep", img: "assets/ram.webp", text: "Half of the flock. Rams, ewes, and lambs." },
          { he: "עִזִּים", tl: "izim", en: "goats", img: "assets/male-goat.webp", text: "The other half of the flock." },
        ] },
        { type: "cards", items: [
          { he: "תּוֹרִים", tl: "torim", en: "turtledoves", text: "Fit only when grown." },
          { he: "בְּנֵי יוֹנָה", tl: "bnei yonah", en: "young pigeons", text: "Fit only while young." },
        ] },
        { type: "callout", title: "The whole list", text: "Five species: {{he:בָּקָר}}, {{he:כְּבָשִׂים}}, {{he:עִזִּים}}, {{he:תּוֹרִים}}, {{he:בְּנֵי יוֹנָה}}. Flour, wine, and oil are offerings too, but a separate system with its own laws." },
      ],
    },
    {
      id: "L1-02",
      title: "Each species has its own words",
      dek: "The Torah doesn't say \"a young male cow\". It says egel.",
      sources: ["Maaseh HaKorbanot 1:14"],
      intro: [
        "Every species has one word for the young animal and other words for the grown male and the grown female. The Torah uses them precisely, and so will the korbanot.",
      ],
      blocks: [
        { type: "cards", items: [
          { he: "עֵגֶל", tl: "egel", en: "calf — young male", img: "assets/calf.webp", text: "A young male of the herd. The young female is an {{he:עֶגְלָה}}, eglah." },
          { he: "פַּר", tl: "par", en: "bull — adult male", img: "assets/cow-male.webp", text: "Also called {{he:שׁוֹר}}, shor." },
          { he: "פָּרָה", tl: "parah", en: "cow — adult female", img: "assets/cow-f.webp", text: "The grown female of the herd." },
        ] },
        { type: "cards", items: [
          { he: "כֶּבֶשׂ", tl: "keves", en: "lamb — under one year", img: "assets/lamb.webp", text: "A male sheep in its first year. The young female is a {{he:כִּבְשָׂה}}, kivsah." },
          { he: "אַיִל", tl: "ayil", en: "ram — adult male", img: "assets/ram.webp", text: "A male sheep from its second year." },
          { he: "רָחֵל", tl: "rachel", en: "ewe — adult female", img: "assets/ewe.webp", text: "The grown female sheep." },
        ] },
        { type: "cards", items: [
          { he: "גְּדִי", tl: "gedi", en: "kid — young male", img: "assets/kid-goat.webp", text: "A young male goat. The young female is a {{he:שְׂעִירָה}}, se'irah (or gediyah)." },
          { he: "תַּיִשׁ", tl: "tayish", en: "he-goat — adult male", img: "assets/male-goat.webp", text: "Also called {{he:שָׂעִיר}}, sa'ir." },
          { he: "עֵז", tl: "ez", en: "she-goat — adult female", img: "assets/female-goat-never-used.webp", text: "The grown female goat." },
        ] },
        { type: "callout", title: "Why it matters", text: "When the Torah says {{he:כֶּבֶשׂ}} it means a sheep in its first year, and when it says {{he:אַיִל}} it means one in its second. The two are never interchangeable in a korban." },
      ],
    },
    {
      id: "L1-03",
      title: "How old is old enough?",
      dek: "Animals enter and leave eligibility on the calendar, to the hour.",
      sources: ["Maaseh HaKorbanot 1:12", "Maaseh HaKorbanot 1:14", "Vayikra 22:27", "Vayikra 22:22"],
      intro: [
        "An animal may not be offered before it has lived seven full days. From the eighth day it is valid after the fact; the Rambam rules that one should wait until the thirtieth day to begin with.",
      ],
      blocks: [
        { type: "steps", items: [
          { title: "Days 1 to 7", he: "פָּסוּל", text: "Too young. Not a valid korban at any price." },
          { title: "Days 8 to 29", he: "בְּדִיעֲבַד", text: "Valid if it was brought, but one should wait." },
          { title: "Day 30 onward", he: "לְכַתְּחִלָּה", text: "Valid from the outset. Bechor, pesach, and maaser may already be brought from day eight." },
        ] },
        { type: "table", caption: "Maximum age", cols: ["", "Through"], rows: [
          ["Cattle — {{he:בָּקָר}}", "three full years"],
          ["Sheep and goats — {{he:צֹאן}}", "two full years"],
        ] },
        { type: "callout", title: "To the hour", text: "Age is counted from the hour of birth. A male sheep on the thirtieth day of its second year is a {{he:פִּלְגָּס}}, pilgas: no longer a keves, not yet an ayil, and fit as neither. And if the animal crosses an age line between shechitah and zerikah, it is pasul." },
        { type: "callout", title: "One more disqualifier", text: "A {{he:מוּם}}, a blemish listed in the Torah such as blindness or a broken limb, makes an animal pasul at any age." },
      ],
    },
    {
      id: "L1-04",
      title: "The four categories of korban",
      dek: "Every offering, communal or individual, fits one of four kinds.",
      sources: ["Maaseh HaKorbanot 1:2", "Maaseh HaKorbanot 1:3"],
      intro: [
        "Every animal korban in the Torah belongs to one of four categories. Three more offerings exist only for individuals.",
      ],
      blocks: [
        { type: "cards", items: [
          { he: "עוֹלָה", tl: "olah", en: "burnt offering", text: "Entirely burned on the altar. No portion is eaten." },
          { he: "חַטָּאת", tl: "chatat", en: "sin offering", text: "Atones for an unintentional sin whose deliberate form carries karet." },
          { he: "אָשָׁם", tl: "asham", en: "guilt offering", text: "Brought for a short list of specific sins, or in a case of doubt." },
          { he: "שְׁלָמִים", tl: "shelamim", en: "peace offering", text: "The altar gets the fats, the kohen gets a share, and the owner eats the rest." },
        ] },
        { type: "terms", items: [
          { he: "פֶּסַח", tl: "pesach", en: "individuals only" },
          { he: "בְּכוֹר", tl: "bechor", en: "individuals only" },
          { he: "מַעֲשֵׂר", tl: "maaser", en: "individuals only" },
        ] },
      ],
    },
    {
      id: "L1-05",
      title: "Which animal for which korban",
      dek: "Each korban dictates species, sex, and sometimes age.",
      sources: ["Maaseh HaKorbanot 1:8", "Maaseh HaKorbanot 1:9", "Maaseh HaKorbanot 1:10", "Maaseh HaKorbanot 1:11", "Maaseh HaKorbanot 1:14"],
      intro: [
        "Each of the four categories has its own rules about which species and which sex may be brought. Learn these four lines and most of the level is yours.",
      ],
      blocks: [
        { type: "table", caption: "Species and sex by korban", cols: ["Korban", "Species", "Sex"], rows: [
          ["{{he:עוֹלָה}} olah", "any of the five", "male (birds: either)"],
          ["{{he:חַטָּאת}} chatat", "any of the five", "individual's animal chatat: female"],
          ["{{he:אָשָׁם}} asham", "sheep only", "male"],
          ["{{he:שְׁלָמִים}} shelamim", "cattle, sheep, goats — never birds", "either"],
        ] },
        { type: "callout", title: "The exceptions", text: "An individual's animal chatat is female, except three people who bring males: a {{he:נָשִׂיא}} brings a male goat, and the {{he:כֹּהֵן מָשִׁיחַ}} and the kohen gadol on Yom Kippur bring a bull." },
      ],
    },
    {
      id: "L1-06",
      title: "Communal, individual, and the two grades of holiness",
      dek: "The community is limited to olah and chatat. Holiness grade follows the category.",
      sources: ["Maaseh HaKorbanot 1:4", "Maaseh HaKorbanot 1:17"],
      intro: [
        "Communal offerings follow a fixed public schedule. Individual offerings come from a person's own life: a birth, a mistake, a vow, a festival.",
      ],
      blocks: [
        { type: "compare",
          left: { title: "The community brings", he: "קָרְבַּן צִבּוּר", items: ["Olah or chatat — that is the whole list", "On Shavuot, two lambs as communal shelamim", "Never an asham", "Never a bird"] },
          right: { title: "An individual brings", he: "קָרְבַּן יָחִיד", items: ["Any of the four categories", "Pesach, bechor, and maaser as well", "Birds, when the korban allows them"] },
        },
        { type: "compare",
          left: { title: "Most holy", he: "קָדְשֵׁי קָדָשִׁים", items: ["Olah", "Chatat", "Asham", "The two Shavuot lambs"] },
          right: { title: "Lighter holies", he: "קָדָשִׁים קַלִּים", items: ["Shelamim of an individual", "Bechor", "Maaser", "Pesach"] },
        },
      ],
    },
  ],
  concepts: [
    {
        "id": "L1-C01",
        "q": "A young male cow (calf)",
        "a": "egel — עֵגֶל",
        "qHe": "",
        "aHe": "עֵגֶל",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C02",
        "q": "A young female cow (heifer)",
        "a": "eglah — עֶגְלָה",
        "qHe": "",
        "aHe": "עֶגְלָה",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C03",
        "q": "An adult male cow (bull)",
        "a": "par — פַּר (also: shor — שׁוֹר)",
        "qHe": "",
        "aHe": "פַּר / שׁוֹר",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C04",
        "q": "An adult female cow",
        "a": "parah — פָּרָה",
        "qHe": "",
        "aHe": "פָּרָה",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C05",
        "q": "A young male sheep (lamb",
        "a": "under one year)",
        "qHe": "keves — כֶּבֶשׂ",
        "aHe": "",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C06",
        "q": "A young female sheep (lamb)",
        "a": "kivsah — כִּבְשָׂה",
        "qHe": "",
        "aHe": "כִּבְשָׂה",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C07",
        "q": "An adult male sheep (ram)",
        "a": "ayil — אַיִל",
        "qHe": "",
        "aHe": "אַיִל",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C08",
        "q": "An adult female sheep (ewe)",
        "a": "rachel — רָחֵל",
        "qHe": "",
        "aHe": "רָחֵל",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C09",
        "q": "A young male goat (kid)",
        "a": "gedi — גְּדִי",
        "qHe": "",
        "aHe": "גְּדִי",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C10",
        "q": "A young female goat",
        "a": "se'irah / gediyah — שְׂעִירָה / גְּדִיָּה",
        "qHe": "",
        "aHe": "שְׂעִירָה / גְּדִיָּה",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C11",
        "q": "An adult male goat",
        "a": "sa'ir / tayish — שָׂעִיר / תַּיִשׁ",
        "qHe": "",
        "aHe": "שָׂעִיר / תַּיִשׁ",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C12",
        "q": "An adult female goat",
        "a": "ez — עֵז",
        "qHe": "",
        "aHe": "עֵז",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C13",
        "q": "A turtledove",
        "a": "tor — תּוֹר (plural: torim — תּוֹרִים)",
        "qHe": "",
        "aHe": "תּוֹר / תּוֹרִים",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C14",
        "q": "A young pigeon (dove)",
        "a": "ben yonah — בֶּן יוֹנָה (plural: bnei yonah — בְּנֵי יוֹנָה)",
        "qHe": "",
        "aHe": "בֶּן יוֹנָה / בְּנֵי יוֹנָה",
        "tanach": [],
        "rambam": []
    },
    {
        "id": "L1-C15",
        "q": "From what species of mammals (non-flying animals) may a korban be brought?",
        "a": "Three: cattle (bakar), sheep (kevasim), and goats (izim).",
        "qHe": "מאלו מיני בהמות מביאים קרבן?",
        "aHe": "שלושה: בקר, כבשים, ועזים.",
        "tanach": [
            "Vayikra 1:2"
        ],
        "rambam": [
            "Maaseh HaKorbanot 1:1"
        ]
    },
    {
        "id": "L1-C16",
        "q": "From what species of birds may a korban be brought?",
        "a": "Two: turtledoves (torim) and young pigeons (bnei yonah).",
        "qHe": "מאלו מיני עוף מביאים קרבן?",
        "aHe": "שניים: תורים ובני יונה.",
        "tanach": [
            "Vayikra 1:14"
        ],
        "rambam": [
            "Maaseh HaKorbanot 1:1"
        ]
    },
    {
        "id": "L1-C17",
        "q": "At what age (young or old) are birds fit to be brought as korbanot?",
        "a": "Turtledoves must be adults, and pigeons must be young",
        "qHe": "האם תורים ובני יונה כשרים באותו גיל?",
        "aHe": "תורים גדולים כשרים וקטנים פסולים; בני יונה קטנים כשרים וגדולים פסולים.",
        "tanach": [],
        "rambam": [
            "Maaseh HaKorbanot 1:14"
        ]
    },
    {
        "id": "L1-C18",
        "q": "From what age may a birdbe offered as a korban?",
        "a": "From the eighth day of its life. Ideally from the thirtieth day onward.",
        "qHe": "מאיזה גיל ניתן להקריב בהמה?",
        "aHe": "מיום השמיני ואילך. לכתחילה מיום השלושים ואילך.",
        "tanach": [
            "Vayikra 22:27"
        ],
        "rambam": [
            "Maaseh HaKorbanot 1:12"
        ]
    },
    {
        "id": "L1-C19",
        "q": "What is the maximum age for cattle offered as a korban?",
        "a": "Three years old.",
        "qHe": "מה הגיל המרבי לקרבן בקר?",
        "aHe": "עד שלוש שנים.",
        "tanach": [],
        "rambam": [
            "Maaseh HaKorbanot 1:12"
        ]
    },
    {
        "id": "L1-C20",
        "q": "What is the maximum age for sheep or goats offered as a korban?",
        "a": "Two years old.",
        "qHe": "מה הגיל המרבי לקרבן כבשים ועזים?",
        "aHe": "עד שנתיים.",
        "tanach": [],
        "rambam": [
            "Maaseh HaKorbanot 1:12"
        ]
    },
    {
        "id": "L1-C21",
        "q": "Until what age is a sheep called a keves (lamb) rather than an ayil (ram)?",
        "a": "Until it completes its first year.",
        "qHe": "עד איזה גיל הכבש נקרא כבש ולא איל?",
        "aHe": "עד השלמת שנתו הראשונה.",
        "tanach": [],
        "rambam": [
            "Maaseh HaKorbanot 1:14"
        ]
    },
    {
        "id": "L1-C22",
        "q": "From which species may an animal olah be brought?",
        "a": "Male cattle, male sheep, or male goats; or turtledoves or young pigeons.",
        "qHe": "מאלו מינים מביאים עולה?",
        "aHe": "מן הבקר זכרים, מן הכבשים זכרים, מן העזים זכרים; או מן התורים ובני היונה (עוף מכל מין).",
        "tanach": [
            "Vayikra 1:3"
        ],
        "rambam": [
            "Maaseh HaKorbanot 1:8"
        ]
    },
    {
        "id": "L1-C23",
        "q": "From which species may a chatat be brought?",
        "a": "From all five species — cattle, sheep, goats, turtledoves, or young pigeons — male or female.",
        "qHe": "מאלו מינים מביאים חטאת?",
        "aHe": "מכל חמשת המינים — בקר, כבשים, עזים, תורים ובני יונה — זכר או נקבה.",
        "tanach": [
            "Vayikra 4:3"
        ],
        "rambam": [
            "Maaseh HaKorbanot 1:9"
        ]
    },
    {
        "id": "L1-C24",
        "q": "From which species may an asham be brought?",
        "a": "Only from male sheep (kevasim zekharim); never from cattle, goats, or birds.",
        "qHe": "מאיזה מין מביאים אשם?",
        "aHe": "רק מן הכבשים הזכרים — לא מבקר",
        "tanach": [],
        "rambam": [
            "Vayikra 5:15"
        ]
    },
    {
        "id": "L1-C25",
        "q": "From which species may shelamim be brought?",
        "a": "From cattle, sheep, or goats — male or female. There are no bird shelamim.",
        "qHe": "מאלו מינים מביאים שלמים?",
        "aHe": "מן הבקר, הכבשים, והעזים — זכר או נקבה. אין שלמים מן העוף.",
        "tanach": [
            "Vayikra 3:1"
        ],
        "rambam": [
            "Maaseh HaKorbanot 1:11"
        ]
    },
    {
        "id": "L1-C26",
        "q": "May a male animal be brought as an individual chatat?",
        "a": "Generally no — chatat yachid is always female, except: nasi, kohen mashiach, and kohen gadol on Yom Kippur.",
        "qHe": "האם זכר כשר לחטאת יחיד?",
        "aHe": "בדרך כלל לא — חטאת יחיד תמיד נקבה, חוץ מנשיא, כהן משיח, וכהן גדול ביום הכיפורים.",
        "tanach": [],
        "rambam": [
            "Maaseh HaKorbanot 1:14"
        ]
    },
    {
        "id": "L1-C27",
        "q": "What disqualifies an animal from being a korban?",
        "a": "A blemish (mum) — any physical defect listed in the Torah (blindness, broken limb, etc.) renders it pasul.",
        "qHe": "מה פוסל בהמה מקרבן?",
        "aHe": "מום — כל מום גופני המנוי בתורה (עיוורון",
        "tanach": [],
        "rambam": [
            "Vayikra 22:22"
        ]
    }
],
  quiz: [
    {
      id: "L1-Q01", kind: "match",
      prompt: "Match each Hebrew word to its meaning.",
      pairs: [
        { hebrew: "עֵגֶל",  english: "young male cow (calf)" },
        { hebrew: "אַיִל",  english: "adult male sheep (ram)" },
        { hebrew: "גְּדִי",  english: "young male goat (kid)" },
        { hebrew: "תּוֹר",  english: "turtledove" },
      ],
      explain: "Egel is the calf, ayil the ram, gedi the kid, and tor the turtledove — one word from each of the four families.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q02", kind: "mc",
      prompt: "From what species of mammals may a korban be brought?",
      options: ["Cattle, sheep, and goats", "Cattle, sheep, goats, and deer", "Sheep and goats only", "Any kosher mammal"],
      answer: 0,
      explain: "Only the herd and the flock — cattle, sheep, and goats. A deer is kosher to eat but never fit for the altar.",
      cite: "Maaseh HaKorbanot 1:1",
    },
    {
      id: "L1-Q03", kind: "sort",
      prompt: "Sort each animal into its species.",
      buckets: [
        { id: "cow",   he: "בָּקָר",     en: "Cattle" },
        { id: "sheep", he: "כְּבָשִׂים", en: "Sheep" },
        { id: "goat",  he: "עִזִּים",   en: "Goats" },
      ],
      items: [
        { hebrew: "פָּרָה",  translit: "parah",  bucket: "cow" },
        { hebrew: "כֶּבֶשׂ", translit: "keves",  bucket: "sheep" },
        { hebrew: "תַּיִשׁ", translit: "tayish", bucket: "goat" },
        { hebrew: "עֶגְלָה", translit: "eglah",  bucket: "cow" },
        { hebrew: "רָחֵל",   translit: "rachel", bucket: "sheep" },
        { hebrew: "עֵז",     translit: "ez",     bucket: "goat" },
      ],
      explain: "Parah and eglah are cattle; keves and rachel are sheep; tayish and ez are goats.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q04", kind: "mc",
      prompt: "How many species in total may be used for korbanot?",
      options: ["Three", "Four", "Five", "Seven"],
      answer: 2,
      explain: "Five: three mammals (cattle, sheep, goats) and two birds (turtledoves and young pigeons).",
      cite: "Maaseh HaKorbanot 1:1",
    },
    {
      id: "L1-Q05", kind: "tap",
      prompt: "Which Hebrew word means 'adult male cow'?",
      options: ["עֵגֶל", "פַּר", "אַיִל", "תַּיִשׁ"],
      answer: 1,
      explain: "Par (also shor) is the bull. Egel is the calf; ayil and tayish are the adult male sheep and goat.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q06", kind: "mc",
      prompt: "From what age should an animal ideally be offered?",
      options: ["From the first day", "From the eighth day", "From the thirtieth day onward", "From one year old"],
      answer: 2,
      explain: "From day eight an animal is valid after the fact; the Rambam rules that one should wait until the thirtieth day to begin with.",
      cite: "Maaseh HaKorbanot 1:12",
    },
    {
      id: "L1-Q07", kind: "match",
      prompt: "Match each species to its maximum age for korbanot.",
      pairs: [
        { hebrew: "בָּקָר",     english: "three years old" },
        { hebrew: "כְּבָשִׂים", english: "two years old (sheep)" },
        { hebrew: "עִזִּים",   english: "two years old (goats)" },
      ],
      explain: "Cattle may be offered through three full years; sheep and goats through two. Older than that the animal is zaken.",
      cite: "Maaseh HaKorbanot 1:12",
    },
    {
      id: "L1-Q08", kind: "mc",
      prompt: "From which species ONLY may an asham be brought?",
      options: ["Female sheep", "Male sheep only", "Any of the five species", "Bulls only"],
      answer: 1,
      explain: "An asham is always a male sheep — never cattle, goats, or birds.",
      cite: "Vayikra 5:15",
    },
    {
      id: "L1-Q09", kind: "sort",
      prompt: "Which korbanot can come from birds, and which cannot?",
      buckets: [
        { id: "yes", he: "מִן הָעוֹף",     en: "Can be a bird" },
        { id: "no",  he: "לֹא מִן הָעוֹף", en: "Never a bird" },
      ],
      items: [
        { hebrew: "עוֹלָה",    translit: "olah",     bucket: "yes" },
        { hebrew: "חַטָּאת",   translit: "chatat",   bucket: "yes" },
        { hebrew: "אָשָׁם",    translit: "asham",    bucket: "no" },
        { hebrew: "שְׁלָמִים", translit: "shelamim", bucket: "no" },
      ],
      explain: "Olah and chatat have bird forms. An asham is only a male sheep, and there are no bird shelamim.",
      cite: "Maaseh HaKorbanot 1:11",
    },
    {
      id: "L1-Q10", kind: "mc",
      prompt: "May the community ever bring an asham or a bird offering?",
      options: ["Yes — both are permitted", "Yes for birds, never for asham", "Never for either one", "Only on Yom Kippur"],
      answer: 2,
      explain: "Communal offerings are olah or chatat (plus the two Shavuot lambs as shelamim). The community never brings an asham and never a bird.",
      cite: "Maaseh HaKorbanot 1:4",
    },
    {
      id: "L1-Q11", kind: "sort",
      prompt: "Sort each korban by its holiness grade.",
      buckets: [
        { id: "kk",    he: "קָדְשֵׁי קָדָשִׁים", en: "Most holy" },
        { id: "kalim", he: "קָדָשִׁים קַלִּים",  en: "Lighter holies" },
      ],
      items: [
        { hebrew: "עוֹלָה",    translit: "olah",     bucket: "kk" },
        { hebrew: "אָשָׁם",    translit: "asham",    bucket: "kk" },
        { hebrew: "שַׁלְמֵי יָחִיד", translit: "shalmei yachid", bucket: "kalim" },
        { hebrew: "פֶּסַח",    translit: "pesach",   bucket: "kalim" },
      ],
      explain: "Olah, chatat, and asham are kodshei kodashim. Individual shelamim, bechor, maaser, and pesach are kodashim kalim.",
      cite: "Maaseh HaKorbanot 1:17",
    },
    {
      id: "L1-Q12", kind: "mc",
      prompt: "How precisely is a mammal's age measured for korban eligibility?",
      options: ["By day — from birthday to birthday", "By hour — the exact hour of birth to the same hour", "By week — each full seven days", "By month — each completed month"],
      answer: 1,
      explain: "Age windows run from the hour of birth to the same hour — mi'yom le'yom, to the hour.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q13", kind: "mc",
      prompt: "A male sheep on the thirtieth day of its second year — what is it, and may it be offered?",
      options: ["A keves — fully valid", "An ayil — fully valid", "A pilgas — eligible as neither keves nor ayil", "A zaken — too old to offer"],
      answer: 2,
      explain: "On that one day the animal is a pilgas: no longer a keves, not yet an ayil, so it cannot serve as either.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q14", kind: "mc",
      prompt: "An animal is within its valid age at slaughter but crosses into the next age-year before zerikah. What is the ruling?",
      options: ["Valid — slaughter determines eligibility", "Invalid — the age window must hold through zerikah", "Valid, with a fine", "Valid if less than one day has passed"],
      answer: 1,
      explain: "The animal must still be within its age window when the blood is thrown; crossing the line between shechitah and zerikah disqualifies it.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q15", kind: "tf",
      prompt: "Kosher or pasul? A turtledove is brought while still a fledgling.",
      answer: false,
      explain: "Pasul. The rule for birds is reversed: turtledoves must be adults, pigeons must be young.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q16", kind: "tf",
      prompt: "Kosher or pasul? A seven-day-old calf is brought as an olah.",
      answer: false,
      explain: "Pasul. Nothing may be offered before its eighth day of life.",
      cite: "Vayikra 22:27",
    },
    {
      id: "L1-Q17", kind: "tf",
      prompt: "Kosher or pasul? A female goat is brought as a shelamim.",
      answer: true,
      explain: "Kosher. Shelamim may be male or female from cattle, sheep, or goats — only birds are excluded.",
      cite: "Maaseh HaKorbanot 1:11",
    },
    {
      id: "L1-Q18", kind: "cloze",
      prompt: "An individual's animal chatat is always ____, except for a nasi, a kohen mashiach, and the kohen gadol on Yom Kippur.",
      options: ["female", "male", "a bird", "a lamb"],
      answer: 0,
      explain: "An individual's animal chatat is female (for a bird chatat the sex does not matter). The three exceptions bring males: the nasi a male goat, the kohen mashiach and the kohen gadol on Yom Kippur a bull.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q19", kind: "cloze",
      prompt: "An animal with a ____ — any physical defect listed in the Torah — is pasul for the altar.",
      options: ["mum", "pilgas", "zaken", "nesech"],
      answer: 0,
      explain: "A mum (blemish), such as blindness or a broken limb, disqualifies the animal.",
      cite: "Vayikra 22:22",
    },
    {
      id: "L1-Q20", kind: "tap",
      prompt: "Which word means 'young pigeon'?",
      options: ["תּוֹר", "בֶּן יוֹנָה", "גְּדִי", "כִּבְשָׂה"],
      answer: 1,
      explain: "Ben yonah is the young pigeon; tor is the turtledove. Gedi and kivsah are a kid and a young ewe.",
      cite: "Vayikra 1:14",
    },
    {
      id: "L1-Q21", kind: "mc",
      prompt: "An olah from a mammal must be which sex?",
      options: ["Male", "Female", "Either", "Male for cattle, either for the flock"],
      answer: 0,
      explain: "A mammal olah is always male. Only for the bird olah does sex not matter.",
      cite: "Maaseh HaKorbanot 1:8",
    },
    {
      id: "L1-Q22", kind: "mc",
      prompt: "Which animals are fit for a chatat?",
      options: ["Any of the five species, male or female", "Only female sheep and goats", "Only cattle", "Only birds"],
      answer: 0,
      explain: "A chatat can come from all five species. Which sex depends on who brings it — an individual's animal chatat is female; for birds it does not matter.",
      cite: "Maaseh HaKorbanot 1:9",
    },
    {
      id: "L1-Q23", kind: "pic",
      prompt: "Tap the ayil.",
      options: [
        { img: "assets/ram.webp", label: "אַיִל" }, { img: "assets/lamb.webp", label: "כֶּבֶשׂ" },
        { img: "assets/male-goat.webp", label: "תַּיִשׁ" }, { img: "assets/cow-male.webp", label: "פַּר" },
      ],
      answer: 0,
      explain: "The ayil is the grown ram. The keves is the lamb in its first year; tayish and par are the adult male goat and bull.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q24", kind: "pic",
      prompt: "Tap the egel.",
      options: [
        { img: "assets/kid-goat.webp", label: "גְּדִי" }, { img: "assets/calf.webp", label: "עֵגֶל" },
        { img: "assets/lamb.webp", label: "כֶּבֶשׂ" }, { img: "assets/cow-f.webp", label: "פָּרָה" },
      ],
      answer: 1,
      explain: "The egel is the calf, the young male of the herd. Gedi and keves are the young goat and sheep; parah is the grown cow.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q25", kind: "pic",
      prompt: "Tap the gedi.",
      options: [
        { img: "assets/ewe.webp", label: "רָחֵל" }, { img: "assets/calf.webp", label: "עֵגֶל" },
        { img: "assets/kid-goat.webp", label: "גְּדִי" }, { img: "assets/lamb.webp", label: "כֶּבֶשׂ" },
      ],
      answer: 2,
      explain: "The gedi is the young male goat. The young sheep is a keves, the young cow an egel, and the rachel is a grown ewe.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q26", kind: "pic",
      prompt: "Tap the parah, the grown female of the herd.",
      options: [
        { img: "assets/cow-male.webp", label: "פַּר" }, { img: "assets/ewe.webp", label: "רָחֵל" },
        { img: "assets/calf.webp", label: "עֵגֶל" }, { img: "assets/cow-f.webp", label: "פָּרָה" },
      ],
      answer: 3,
      explain: "Parah is the cow. Par is the bull, egel the calf, and rachel the ewe of the flock.",
      cite: "Maaseh HaKorbanot 1:14",
    },
    {
      id: "L1-Q27", kind: "cloze",
      prompt: "An ____ is burned entirely on the altar; no one eats any of it.",
      options: ["olah", "asham", "shelamim", "chatat"],
      answer: 0,
      explain: "The olah goes up whole. A chatat and asham are eaten by the kohanim; a shelamim is shared with the owner.",
      cite: "Maaseh HaKorbanot 1:2",
    },
    {
      id: "L1-Q28", kind: "mc",
      prompt: "From which korban does the owner eat a share?",
      options: ["Shelamim", "Olah", "Chatat", "Asham"],
      answer: 0,
      explain: "Only the shelamim feeds the owner: the altar takes the fats, the kohen takes his portion, and the owner eats the rest.",
      cite: "Maaseh HaKorbanot 1:2",
    },
  ],
};

// Which quiz items are used as in-lesson checks.
window.KODSHIM_LEVELS[1].checks = {
  "L1-01": ["L1-Q02", "L1-Q04", "L1-Q15"],
  "L1-02": ["L1-Q23", "L1-Q05", "L1-Q24", "L1-Q01", "L1-Q25", "L1-Q20", "L1-Q26", "L1-Q03"],
  "L1-03": ["L1-Q16", "L1-Q06", "L1-Q07", "L1-Q13", "L1-Q12", "L1-Q14", "L1-Q19"],
  "L1-04": ["L1-Q27", "L1-Q28"],
  "L1-05": ["L1-Q08", "L1-Q21", "L1-Q22", "L1-Q09", "L1-Q17", "L1-Q18"],
  "L1-06": ["L1-Q10", "L1-Q11"],
};
