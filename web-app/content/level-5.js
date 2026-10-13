// Level 5 — Communal korbanot and kodashim kalim.
// Source of truth: tools/levels-json/level-5.json (the CSV rows for this level).
// Format: docs/CONTENT-SCHEMA.md.

window.KODSHIM_LEVELS = window.KODSHIM_LEVELS || {};
window.KODSHIM_LEVELS[5] = {
  num: 5,
  name: "Communal korbanot and kodashim kalim",
  he: "קָרְבְּנוֹת צִבּוּר וְקָדָשִׁים קַלִּים",
  tagline: "The offerings of the whole people, the bread and flour of the Mikdash, and the korbanot the owner gets to eat.",
  summary: [
    "Until now the korbanot have mostly been an individual's business — one person, one animal, one reason. This level widens the lens. The {{he:תָּמִיד}} burns every morning and every afternoon on behalf of all of Israel; on Shabbat, Rosh Chodesh, and the festivals the community adds {{he:מוּסָפִין}}; and when the whole nation errs on the word of its own court, the community brings a chatat.",
    "Along the way we meet the grain of the Mikdash — the {{he:עֹמֶר}}, the {{he:שְׁתֵּי הַלֶּחֶם}}, the {{he:לֶחֶם הַפָּנִים}} — and the general laws of a {{he:מִנְחָה}} and of the wine and water libations. The level closes with the {{he:קָדָשִׁים קַלִּים}} that an ordinary person eats: the korban pesach and the festival offerings, the bechor and maaser behemah, and the todah with its forty loaves.",
  ],
  scope: "Temidin uMusafin 1:1–10:6; Shegagot 12:1; Avodat Yom HaKippurim 1:1, 3:14; Korban Pesach 1:1–10:12; Chagigah 1:1; Bechorot 1:1, 6:1; Maaseh HaKorbanot 2:1, 9:17, 10:6–10:7, 12:6–13:13",

  // ── Lessons ──────────────────────────────────────────────────────────
  lessons: [
    {
      id: "L5-01",
      title: "The tamid, its nesachim, and the musafim",
      dek: "Two lambs a day hold up the whole service — and every added offering is counted beyond them.",
      sources: ["Temidin uMusafin 1:1", "Temidin uMusafin 2:1", "Temidin uMusafin 4:1", "Temidin uMusafin 4:2", "Temidin uMusafin 4:3", "Maaseh HaKorbanot 2:1", "Temidin uMusafin 10:6", "Bamidbar 28:3-15"],
      intro: [
        "The word {{he:תָּמִיד}} means \"constant.\" The korban tamid is two lambs brought every single day — one in the morning and one in the afternoon, {{he:בֵּין הָעַרְבַּיִם}}. Each lamb is an olah, and each comes with its own flour offering and its own wine libation. The day's service opens with the morning lamb and closes with the afternoon lamb.",
        "Everything else the community brings is layered on top of the tamid. On Shabbat, on Rosh Chodesh, and on the festivals the Torah adds extra communal offerings, and their name says exactly that: {{he:מוּסָפִין}}, \"additions.\" A musaf never replaces the tamid; it comes **in addition** to it.",
      ],
      blocks: [
        { type: "cards", items: [
          { he: "תָּמִיד", tl: "tamid", en: "the daily offering", text: "Two lambs every day — one in the morning, one in the afternoon — each with its mincha and nesachim." },
          { he: "מִנְחַת הַתָּמִיד", tl: "minchat hatamid", en: "its flour offering", text: "One-tenth of an ephah of solet, mixed with one-quarter of a hin of oil, for each lamb." },
          { he: "נֶסֶךְ", tl: "nesech", en: "its wine libation", text: "One-quarter of a hin of wine for each lamb." },
        ] },
        { type: "compare",
          left:  { title: "Nesachim — wine", he: "נְסָכִים", items: [
            "Wine poured on the altar.",
            "Required with every animal olah and every shelamim — including the metzora's and the nazir's. (A bird olah has none.)",
            "Not brought with most chatot and ashamot.",
          ] },
          right: { title: "Nisuch hamayim — water", he: "נִסּוּךְ הַמַּיִם", items: [
            "Water poured on the altar.",
            "Only during Sukkot.",
            "A {{he:הֲלָכָה לְמֹשֶׁה מִסִּינַי}} — not written in the Torah, received by tradition.",
          ] } },
        { type: "table", caption: "The two simplest musafim — each brought beyond the daily tamid",
          cols: ["", "Shabbat", "Rosh Chodesh"],
          rows: [
            ["Olot", "Two lambs", "Two bulls, one ram, seven lambs"],
            ["Chatat", "None", "One goat"],
            ["Replaces the tamid?", "No — added to it", "No — added to it"],
          ] },
        { type: "figure", src: "assets/lamb.webp", caption: "A keves. Two of these are the tamid every day, and two more are the musaf of Shabbat." },
      ],
    },

    {
      id: "L5-02",
      title: "Communal chatot and the goats of Yom Kippur",
      dek: "When the whole nation errs on its court's ruling — and the one day the kohen gadol brings a chatat for everyone.",
      sources: ["Shegagot 12:1", "Avodat Yom HaKippurim 1:1", "Avodat Yom HaKippurim 3:14", "Vayikra 4:13-14", "Bamidbar 15:24", "Vayikra 16:3-5", "Vayikra 16:21-22"],
      intro: [
        "An individual who sins inadvertently brings a chatat. But what if the mistake belongs to the nation? If the Sanhedrin issued a mistaken ruling and most of Israel acted on it in good faith, the community itself brings a chatat. The animal depends on what the error was about: for most mitzvot it is a bull, the {{he:פַּר הֶעְלֵם דָּבָר}}; for idolatry the chatat is goats, the {{he:שְׂעִירֵי עֲבוֹדָה זָרָה}} — and each goat comes alongside a bull brought as an olah.",
        "Yom Kippur has its own set. The kohen gadol brings a bull and a ram of his own, and on behalf of the community two goats and a ram — and of the two goats, one is slaughtered and one is sent away alive. All this comes on top of the tamid and the day's musaf.",
      ],
      blocks: [
        { type: "compare",
          left:  { title: "Par he'elem davar", he: "פַּר הֶעְלֵם דָּבָר", items: [
            "A bull, brought as a chatat.",
            "The Sanhedrin ruled in error, and most of Israel acted on the ruling inadvertently.",
            "Brought by the community, not by an individual.",
          ] },
          right: { title: "Se'irei avodah zarah", he: "שְׂעִירֵי עֲבוֹדָה זָרָה", items: [
            "Goats, brought as chatot — each alongside a bull brought as an olah.",
            "The same kind of error — a mistaken Sanhedrin ruling that most of Israel followed — but the sin was idolatry.",
            "Also communal.",
          ] } },
        { type: "list", title: "What the kohen gadol brings on Yom Kippur", items: [
          "**His own:** a bull and a ram.",
          "**For the community:** two goats — one slaughtered, one sent to Azazel — and a ram as an olah.",
          "**The regular tamid**, morning and afternoon.",
          "**The musaf of the day:** a bull, a ram, seven lambs as olot, and a goat chatat.",
        ] },
        { type: "callout", title: "The se'ir hamishtaleach", text: "Of the two communal goats, one is the {{he:שָׂעִיר הַמִּשְׁתַּלֵּחַ}}. The kohen gadol confesses over it, and it is sent out to the wilderness — to Azazel — rather than slaughtered on the altar." },
        { type: "figure", src: "assets/male-goat.webp", caption: "A sa'ir. The communal chatat for idolatry, the Rosh Chodesh chatat, and both Yom Kippur goats are all male goats." },
      ],
    },

    {
      id: "L5-03",
      title: "Grain and bread of the tzibur",
      dek: "The omer, the two loaves, the twelve loaves on the golden table, and the two bowls beside them.",
      sources: ["Temidin uMusafin 7:3", "Temidin uMusafin 8:1", "Temidin uMusafin 5:1", "Temidin uMusafin 5:2", "Vayikra 23:10-11", "Vayikra 23:17", "Vayikra 24:5-9"],
      intro: [
        "Not every communal offering is an animal. Twice a year the community brings grain tied to the harvest: the {{he:עֹמֶר}} of barley right after Pesach, and the {{he:שְׁתֵּי הַלֶּחֶם}} of wheat on Shavuot. And every week, without a break, twelve loaves sit on the golden table in the Heichal — the {{he:לֶחֶם הַפָּנִים}}.",
        "Each of these has a detail worth holding onto: the omer is what permits the new grain; the shtei halechem are leavened, and their lambs are the only communal shelamim in the whole year; the lechem hapanim is swapped every Shabbat, and the frankincense beside it is burned when the bread is changed.",
      ],
      blocks: [
        { type: "terms", items: [
          { he: "עֹמֶר", tl: "omer", en: "the barley mincha of 16 Nissan" },
          { he: "חָדָשׁ", tl: "chadash", en: "new grain, forbidden until the omer" },
          { he: "שְׁתֵּי הַלֶּחֶם", tl: "shtei halechem", en: "the two loaves of Shavuot" },
          { he: "בִּכּוּרִים", tl: "bikurim", en: "first fruits" },
          { he: "לֶחֶם הַפָּנִים", tl: "lechem hapanim", en: "the showbread" },
          { he: "בְּזִיכֵי לְבוֹנָה", tl: "bazichei levonah", en: "bowls of frankincense" },
        ] },
        { type: "compare",
          left:  { title: "Omer", he: "עֹמֶר", items: [
            "A mincha of **barley**.",
            "Brought by the community on the 16th of Nissan.",
            "Permits eating the new grain, {{he:חָדָשׁ}}.",
          ] },
          right: { title: "Shtei halechem", he: "שְׁתֵּי הַלֶּחֶם", items: [
            "Two loaves of **leavened wheat** bread — chametz.",
            "Brought as bikurim on Shavuot.",
            "Come with two lambs as communal shelamim — the only communal shelamim of the year.",
          ] } },
        { type: "cards", items: [
          { he: "לֶחֶם הַפָּנִים", tl: "lechem hapanim", en: "the showbread", text: "Twelve unleavened wheat loaves, arranged in two stacks on the golden table." },
          { he: "בְּזִיכֵי לְבוֹנָה", tl: "bazichei levonah", en: "two bowls of frankincense", text: "Two bowls, one placed beside each stack of bread." },
          { he: "שַׁבָּת", tl: "Shabbat", en: "the changeover", text: "Every Shabbat the loaves are replaced. The old loaves are eaten by the kohanim, and the levonah from the bowls is burned." },
        ] },
        { type: "callout", title: "Why the bowls matter", text: "The lechem hapanim itself is not burned — it is eaten by the kohanim when it comes off the table. What goes on the altar is the levonah from the two {{he:בְּזִיכִין}}, burned on Shabbat when the bread is changed." },
      ],
    },

    {
      id: "L5-04",
      title: "Menachot: types, ingredients, and kemitzah",
      dek: "A flour offering has a shape, a recipe, and a fistful that goes to the altar.",
      sources: ["Maaseh HaKorbanot 12:6", "Maaseh HaKorbanot 12:7", "Maaseh HaKorbanot 12:8", "Maaseh HaKorbanot 13:13", "Maaseh HaKorbanot 12:12", "Vayikra 2:1-13", "Vayikra 5:11", "Bamidbar 5:15", "Vayikra 6:16"],
      intro: [
        "A {{he:מִנְחָה}} is a korban of flour — wheat or, in a few cases, barley. The Torah in Vayikra 2 lists several forms, and the difference between them is how the flour is prepared: left as plain fine flour, baked in an oven, fried on a flat pan, or cooked in a deep pan.",
        "Most menachot share one recipe: fine wheat flour ({{he:סֹלֶת}}), olive oil, salt, and frankincense ({{he:לְבוֹנָה}}). Two menachot leave out the oil and the levonah — and both are brought in circumstances of distress rather than celebration. Once a mincha is ready, the kohen takes a single fistful of it for the altar. What happens to the rest depends on who brought it.",
      ],
      blocks: [
        { type: "cards", items: [
          { he: "סֹלֶת", tl: "solet", en: "fine flour", text: "Plain fine flour, not baked." },
          { he: "מַאֲפֵה תַנּוּר", tl: "ma'afeh tanur", en: "oven-baked", text: "Baked in an oven, either as {{he:חַלּוֹת}} (loaves) or {{he:רְקִיקִין}} (wafers)." },
          { he: "מַחֲבַת", tl: "machavat", en: "flat pan", text: "Cooked on a flat pan." },
          { he: "מַרְחֶשֶׁת", tl: "marcheshet", en: "deep pan", text: "Cooked in a deep pan." },
        ] },
        { type: "compare",
          left:  { title: "Most menachot", he: "רֹב הַמְּנָחוֹת", items: [
            "Fine wheat flour — {{he:סֹלֶת}}.",
            "Olive oil.",
            "Salt.",
            "Frankincense — {{he:לְבוֹנָה}}.",
          ] },
          right: { title: "No oil, no levonah", he: "בְּלֹא שֶׁמֶן וּלְבוֹנָה", items: [
            "The sotah's mincha, {{he:מִנְחַת סוֹטָה}} — made of barley.",
            "The mincha of a poor person who owes a sliding-scale chatat, {{he:מִנְחַת חוֹטֵא}}.",
          ] } },
        { type: "steps", items: [
          { title: "The mincha is prepared", he: "הֲכָנָה", text: "Solet, oil, salt, and levonah — in whichever form the mincha takes. (The sotah's and the poor sinner's leave out the oil and levonah.)" },
          { title: "Kemitzah", he: "קְמִיצָה", text: "In an ordinary mincha, the kohen takes a fistful — a {{he:קֹמֶץ}} — from it. The wholly burned menachot skip this step." },
          { title: "The kometz is burned", he: "הַקְטָרָה", text: "The fistful is burned on the altar. This is the mincha's share of the altar." },
          { title: "The rest is eaten", he: "שְׁיָרִים", text: "The remainder is eaten by the kohanim — unless the mincha is one of the kinds that is burned entirely." },
        ] },
        { type: "list", title: "Menachot that are burned entirely — no kemitzah, nothing eaten by kohanim", items: [
          "The mincha of a kohen — {{he:מִנְחַת כֹּהֵן}}.",
          "The chavitin of the kohen gadol — {{he:חֲבִיתֵי כֹּהֵן גָּדוֹל}}.",
          "The mincha a kohen brings on his first day of service — {{he:מִנְחַת חִנּוּךְ}}.",
          "The mincha that accompanies nesachim — {{he:מִנְחַת נְסָכִים}}.",
        ] },
      ],
    },

    {
      id: "L5-05",
      title: "Korban pesach and the festival offerings",
      dek: "What the pesach is, when and where it is eaten, its second chance in Iyyar, and the three offerings of a pilgrim.",
      sources: ["Korban Pesach 1:1", "Korban Pesach 8:1", "Korban Pesach 8:15", "Korban Pesach 5:1", "Korban Pesach 10:12", "Chagigah 1:1", "Shemot 12:3-10", "Bamidbar 9:10-11", "Devarim 16:16-17"],
      intro: [
        "The {{he:קָרְבַּן פֶּסַח}} is a male lamb or kid up to one year old. It is slaughtered on the afternoon of 14 Nissan and eaten that night, roasted, together with matzah and maror. It is kodashim kalim — but with rules no other shelamim has: it must be roasted, never raw or boiled; it is eaten only by the people registered to its {{he:חֲבוּרָה}}; and the time to eat it ends at midnight.",
        "Someone who was tameh or far away on 14 Nissan gets a second chance — {{he:פֶּסַח שֵׁנִי}}, a month later. And every adult male who comes up to the Mikdash for a festival brings two korbanot of his own: an olah of appearance, {{he:עוֹלַת רְאִיָּה}}, and a shelamim of celebration, {{he:חֲגִיגָה}}. On erev Pesach there is a third, the {{he:חֲגִיגַת אַרְבָּעָה עָשָׂר}}, which exists to make sure the pesach itself is eaten on a full stomach.",
      ],
      blocks: [
        { type: "table", caption: "The korban pesach at a glance",
          cols: ["", "Korban pesach"],
          rows: [
            ["The animal", "A male lamb or kid, up to one year old"],
            ["Slaughtered", "The afternoon of 14 Nissan"],
            ["How it is eaten", "Roasted — never raw, never boiled — with matzah and maror"],
            ["Where, and by whom", "Within Jerusalem, only by those registered to the chaburah"],
            ["Until when", "That night, until midnight (the practical halacha)"],
          ] },
        { type: "callout", title: "Pesach sheni", text: "On 14 Iyyar a second pesach is offered for anyone who was tameh, on a distant journey, or otherwise unable to bring the pesach on 14 Nissan." },
        { type: "cards", items: [
          { he: "עוֹלַת רְאִיָּה", tl: "olat re'iyah", en: "olah of appearance", text: "An olah brought by every adult male when he appears at the Mikdash on the three festivals." },
          { he: "חֲגִיגָה", tl: "chagigah", en: "festival shelamim", text: "A shelamim brought by every adult male on each of the three festivals when he comes to the Mikdash." },
          { he: "חֲגִיגַת אַרְבָּעָה עָשָׂר", tl: "chagigat arba'ah asar", en: "the shelamim of 14 Nissan", text: "A shelamim brought with the pesach when the chaburah is large — so the pesach can be eaten {{he:עַל הַשֹּׂבַע}}, on a full stomach." },
        ] },
        { type: "figure", src: "assets/kid-goat.webp", caption: "A gedi. The korban pesach may be a lamb or a kid — male, and no older than one year." },
      ],
    },

    {
      id: "L5-06",
      title: "Kodashim kalim: bechor, maaser behemah, and todah",
      dek: "Three korbanot that end at the table — and how long the table stays open.",
      sources: ["Bechorot 1:1", "Bechorot 6:1", "Maaseh HaKorbanot 9:17", "Maaseh HaKorbanot 10:6", "Maaseh HaKorbanot 10:7", "Bamidbar 18:17", "Vayikra 27:32", "Vayikra 7:12-16"],
      intro: [
        "Some korbanot become holy without anyone choosing them. A {{he:בְּכוֹר}} — a male that is the first to open its mother's womb, whether cow, ewe, or she-goat — is holy from birth. (A male born after a female is not a bechor.) {{he:מַעְשַׂר בְּהֵמָה}} is every tenth animal born in the herd or flock. Both go to the altar for their blood and eimurin, and both are eaten — the bechor by kohanim, the maaser by its owner, both in Jerusalem.",
        "A {{he:תּוֹדָה}} is a shelamim of thanks, and it comes with a remarkable amount of bread: forty loaves in four kinds. Because there is so much to eat, the Torah shortens the clock. Ordinary shelamim may be eaten for two days and the night between; a todah and its breads must be finished in one day and the following night, like a chatat.",
      ],
      blocks: [
        { type: "compare",
          left:  { title: "Bechor", he: "בְּכוֹר", items: [
            "A male that is the first to open its mother's womb — of a cow, ewe, or she-goat.",
            "Holy from birth; given to a kohen.",
            "Offered on the altar.",
            "Eaten by kohanim, in Jerusalem, within two days and a night.",
          ] },
          right: { title: "Maaser behemah", he: "מַעְשַׂר בְּהֵמָה", items: [
            "Every tenth animal born to one's cattle, sheep, or goats.",
            "Set aside as a korban.",
            "Blood and eimurin go on the altar.",
            "Meat eaten by the owner, in Jerusalem.",
          ] } },
        { type: "cards", items: [
          { he: "חָמֵץ", tl: "chametz", en: "leavened loaves", text: "Ten leavened loaves." },
          { he: "חַלּוֹת", tl: "challot", en: "matzah loaves", text: "Ten unleavened loaves." },
          { he: "רְקִיקִין", tl: "rekikin", en: "matzah wafers", text: "Ten unleavened wafers." },
          { he: "רְבוּכָה", tl: "revuchah", en: "scalded matzah", text: "Ten loaves of revuchah — flour scalded in hot water before baking." },
        ] },
        { type: "callout", title: "Forty loaves", text: "Ten chametz plus thirty matzot — ten challot, ten rekikin, ten revuchah — make forty loaves for every korban todah." },
        { type: "table", caption: "How long each may be eaten",
          cols: ["", "May be eaten until"],
          rows: [
            ["Shelamim", "Two days and the night between — until sunset on the second day"],
            ["Todah and its breads", "One day and the following night — like a chatat"],
            ["Bechor", "Two days and a night"],
            ["Korban pesach", "That night, until midnight"],
          ] },
      ],
    },
  ],

  // ── Concepts (one per CSV row, in CSV order) ─────────────────────────
  concepts: [
    { id: "L5-C01", q: "What is the tamid offering?",
      a: "Two lambs daily — one each morning and one each afternoon — with their accompanying mincha and nesachim.",
      qHe: "מהו קרבן התמיד?", aHe: "שני כבשים בכל יום — אחד בבוקר ואחד בין הערביים — עם מנחתם ונסכיהם.",
      tanach: ["Bamidbar 28:3-4"], rambam: ["Temidin uMusafin 1:1"] },
    { id: "L5-C02", q: "What accompanies each tamid lamb?",
      a: "A mincha of one-tenth ephah fine flour mixed with one-quarter hin of oil; and a wine libation of one-quarter hin.",
      qHe: "מה מלווה כל כבש תמיד?", aHe: "מנחת עשירית האיפה סולת בלולה ברביעית ההין שמן; ונסך יין רביעית ההין.",
      tanach: ["Bamidbar 28:5-7"], rambam: ["Temidin uMusafin 2:1"] },
    { id: "L5-C03", q: "What are musafin?",
      a: "Additional communal offerings on Shabbat, Rosh Chodesh, and the festivals — beyond the daily tamid.",
      qHe: "מהם המוספים?", aHe: "קרבנות ציבור נוספים בשבת, ראש חודש, ומועדים — מעבר לתמיד.",
      tanach: ["Bamidbar 28:9-10"], rambam: ["Temidin uMusafin 4:1"] },
    { id: "L5-C04", q: "What is the musaf of Shabbat?",
      a: "Two lambs as olah — in addition to the daily tamid.",
      qHe: "מהו מוסף שבת?", aHe: "שני כבשים לעולה — נוסף על התמיד.",
      tanach: ["Bamidbar 28:9"], rambam: ["Temidin uMusafin 4:2"] },
    { id: "L5-C05", q: "What is the musaf of Rosh Chodesh?",
      a: "Two bulls, one ram, seven lambs as olot; and one goat as a chatat.",
      qHe: "מהו מוסף ראש חודש?", aHe: "שני פרים, איל אחד, שבעה כבשים לעולה; ושעיר אחד לחטאת.",
      tanach: ["Bamidbar 28:11-15"], rambam: ["Temidin uMusafin 4:3"] },
    { id: "L5-C06", q: "What is the par he'elem davar?",
      a: "A bull brought as a chatat when the Sanhedrin issued an erroneous ruling and the majority of Israel acted on it inadvertently.",
      qHe: "מהו פר העלם דבר?", aHe: "פר הבא לחטאת כשהורתה הסנהדרין בטעות ועשה רוב ישראל על פיהם בשגגה.",
      tanach: ["Vayikra 4:13-14"], rambam: ["Shegagot 12:1"] },
    { id: "L5-C07", q: "What are the se'irei avodah zarah?",
      a: "Goat chatot brought communally when the majority of Israel inadvertently engaged in idolatry based on an erroneous Sanhedrin ruling.",
      qHe: "מהם שעירי עבודה זרה?", aHe: "שעירי חטאת שמביא הציבור כשטעו בעבודה זרה על פי הוראת הסנהדרין.",
      tanach: ["Bamidbar 15:24"], rambam: ["Shegagot 12:1"] },
    { id: "L5-C08", q: "What korbanot does the kohen gadol bring on Yom Kippur?",
      a: "Personal: a bull and a ram. Communal: two se'irim (one slaughtered, one to Azazel) and a ram olah; plus the regular tamid and a special musaf (bull + seven lambs + goat).",
      qHe: "אלו קרבנות מקריב כהן גדול ביום הכיפורים?", aHe: "אישית: פר ואיל. ציבור: שני שעירים (אחד נשחט ואחד לעזאזל) ואיל לעולה; ועוד תמיד ומוסף — פר ושבעה כבשים ושעיר.",
      tanach: ["Vayikra 16:3-5"], rambam: ["Avodat Yom HaKippurim 1:1"] },
    { id: "L5-C09", q: "What is the se'ir hamishtaleach?",
      a: "The Yom Kippur goat confessed upon by the kohen gadol and sent to the wilderness (to Azazel).",
      qHe: "מהו שעיר המשתלח?", aHe: "שעיר שמתוודה עליו כהן גדול ביום הכיפורים ונשלח לעזאזל המדברה.",
      tanach: ["Vayikra 16:21-22"], rambam: ["Avodat Yom HaKippurim 3:14"] },
    { id: "L5-C10", q: "What are the shtei halechem of Shavuot?",
      a: "Two loaves of leavened wheat bread (chametz) brought as bikurim on Shavuot, with two lambs as communal shelamim — the only communal shelamim of the year.",
      qHe: "מהן שתי הלחם של שבועות?", aHe: "שתי כיכרות לחם חמץ של חיטה ביכורים בשבועות עם שני כבשים לשלמי ציבור — היחידים של השנה.",
      tanach: ["Vayikra 23:17"], rambam: ["Temidin uMusafin 8:1"] },
    { id: "L5-C11", q: "What is the omer?",
      a: "A barley mincha brought by the community on the 16th of Nissan; permits eating of the new grain (chadash).",
      qHe: "מהו העומר?", aHe: "מנחת שעורים של ציבור בט״ז בניסן; מתיר את החדש.",
      tanach: ["Vayikra 23:10-11"], rambam: ["Temidin uMusafin 7:3"] },
    { id: "L5-C12", q: "What is the lechem hapanim?",
      a: "Twelve unleavened wheat loaves arranged in two stacks on the golden table; replaced every Shabbat; old loaves are eaten by the kohanim.",
      qHe: "מהו לחם הפנים?", aHe: "שנים עשר חלות מצה של חיטה בשתי מערכות על שולחן הזהב; מתחלפות בכל שבת; הישנות נאכלות לכוהנים.",
      tanach: ["Vayikra 24:5-9"], rambam: ["Temidin uMusafin 5:1"] },
    { id: "L5-C13", q: "What two bowls of frankincense accompany the lechem hapanim?",
      a: "Two bazichei levonah — placed beside the two stacks; burned on Shabbat when the bread is changed.",
      qHe: "מה שני בזיכים מלווים את לחם הפנים?", aHe: "שני בזיכי לבונה — אחד לכל מערכת; מוקטרים בשבת בהחלפת הלחם.",
      tanach: ["Vayikra 24:7"], rambam: ["Temidin uMusafin 5:2"] },
    { id: "L5-C14", q: "What is a korban pesach?",
      a: "A male lamb or kid up to one year old slaughtered on the afternoon of 14 Nissan; eaten roasted that night with matzah and maror.",
      qHe: "מהו קרבן הפסח?", aHe: "כבש או גדי זכר בן שנה הנשחט בי״ד בניסן בין הערביים; נאכל צלי בלילה עם מצה ומרור.",
      tanach: ["Shemot 12:3-5"], rambam: ["Korban Pesach 1:1"] },
    { id: "L5-C15", q: "Until what time may the korban pesach be eaten?",
      a: "Until midnight (the practical halacha).",
      qHe: "עד מתי מותר לאכול קרבן הפסח?", aHe: "עד חצות הלילה.",
      tanach: ["Shemot 12:10"], rambam: ["Korban Pesach 8:15"] },
    { id: "L5-C16", q: "What is the pesach sheni?",
      a: "A second pesach offering on 14 Iyyar for those who were tameh, on a distant journey, or otherwise unable to offer it on 14 Nissan.",
      qHe: "מהו פסח שני?", aHe: "קרבן פסח נוסף בי״ד אייר למי שהיה טמא או בדרך רחוקה ולא הקריב בפסח ראשון.",
      tanach: ["Bamidbar 9:10-11"], rambam: ["Korban Pesach 5:1"] },
    { id: "L5-C17", q: "What is chagigah?",
      a: "A shelamim brought by every adult male Jew on each of the three festivals when appearing at the Temple.",
      qHe: "מהי חגיגה?", aHe: "שלמים שמביא כל זכר ישראל בכל אחד משלושת הרגלים בעת עלייתו למקדש.",
      tanach: ["Devarim 16:16-17"], rambam: ["Chagigah 1:1"] },
    { id: "L5-C18", q: "What is chagigat 14 (chagigat arba'ah asar)?",
      a: "A shelamim brought together with the pesach on 14 Nissan when the pesach group is large — so the pesach can be eaten 'al hasova'.",
      qHe: "מהי חגיגת י״ד?", aHe: "שלמים הבאים עם הפסח בי״ד בניסן כשחבורת הפסח גדולה — כדי שייאכל הפסח על השובע.",
      tanach: [], rambam: ["Korban Pesach 10:12"] },
    { id: "L5-C19", q: "What is re'iyah?",
      a: "An olah brought by every adult male Jew when appearing at the Temple on the three festivals.",
      qHe: "מהי עולת ראייה?", aHe: "עולה שמביא כל זכר ישראל בעלותו לרגל.",
      tanach: ["Devarim 16:16"], rambam: ["Chagigah 1:1"] },
    { id: "L5-C20", q: "What is a mincha and what are its main types?",
      a: "A flour offering of wheat or barley. Main types: solet, ma'afeh tanur (oven-baked — challot or rekikin), machabat (flat pan), marcheshet (deep pan).",
      qHe: "מהי מנחה ומה סוגיה העיקריים?", aHe: "קרבן קמח של חיטה או שעורה. סוגים עיקריים: סולת, מאפה תנור (חלות או רקיקים), מחבת, מרחשת.",
      tanach: ["Vayikra 2:1-7"], rambam: ["Maaseh HaKorbanot 12:6"] },
    { id: "L5-C21", q: "What ingredients are required in most menachot?",
      a: "Fine wheat flour (solet), olive oil, salt, and frankincense (levonah).",
      qHe: "אלו מרכיבים נדרשים ברוב המנחות?", aHe: "סולת, שמן זית, מלח, ולבונה.",
      tanach: ["Vayikra 2:1-13"], rambam: ["Maaseh HaKorbanot 12:7"] },
    { id: "L5-C22", q: "Which two menachot omit oil and frankincense?",
      a: "The sotah's mincha (barley) and the mincha of a poor person (sliding-scale chatat-mincha).",
      qHe: "אלו שתי מנחות אין בהן שמן ולבונה?", aHe: "מנחת סוטה (של שעורים) ומנחת חטאת של עני.",
      tanach: ["Vayikra 5:11", "Bamidbar 5:15"], rambam: ["Maaseh HaKorbanot 12:8"] },
    { id: "L5-C23", q: "What is kemitzah?",
      a: "The kohen taking a fistful (kometz) of the mincha for burning on the altar; the rest is eaten by the kohanim.",
      qHe: "מהי קמיצה?", aHe: "לקיחת הכהן מלוא קומצו מהמנחה להקטרה על המזבח; השאר נאכל לכוהנים.",
      tanach: ["Vayikra 2:2"], rambam: ["Maaseh HaKorbanot 13:13"] },
    { id: "L5-C24", q: "Which menachot are completely burned (none eaten by kohanim)?",
      a: "Mincha of a kohen; chavitin of kohen gadol; mincha of a kohen on his first day (chinuch); mincha that accompanies nesachim.",
      qHe: "אלו מנחות נשרפות כולן ואינן נאכלות לכוהנים?", aHe: "מנחת כהן; חביתי כהן גדול; מנחת חינוך; מנחת נסכים.",
      tanach: ["Vayikra 6:16"], rambam: ["Maaseh HaKorbanot 12:12"] },
    { id: "L5-C25", q: "What is a bechor?",
      a: "A male that is the first to open its mother's womb, of a kosher domestic animal — sanctified from birth; given to a kohen; offered on the altar; eaten by kohanim in Jerusalem within two days and a night.",
      qHe: "מהו בכור?", aHe: "זכר ראשון של בהמה טהורה — קדוש מבטן; ניתן לכהן; קרב על המזבח; נאכל לכוהנים בירושלים תוך שני ימים ולילה.",
      tanach: ["Bamidbar 18:17"], rambam: ["Bechorot 1:1"] },
    { id: "L5-C26", q: "What is maaser behemah?",
      a: "Every tenth animal born to one's cattle, sheep, or goats — set aside as a korban; blood and eimurin on altar; meat eaten by the owner in Jerusalem.",
      qHe: "מהו מעשר בהמה?", aHe: "כל עשירי מבקרו וצאנו — מוקדש לקרבן; דם ואימורים על המזבח; בשרו נאכל לבעלים בירושלים.",
      tanach: ["Vayikra 27:32"], rambam: ["Bechorot 6:1"] },
    { id: "L5-C27", q: "What are nesachim and which korbanot require them?",
      a: "Wine libations poured on the altar — required with every animal olah and shelamim (including the metzora's and nazir's). Not with bird olot, nor with most chatot or ashamot.",
      qHe: "מהם נסכים ועם אלו קרבנות הם באים?", aHe: "ניסוך יין על המזבח — נדרש עם כל עולה ושלמים (כולל של מצורע ונזיר). לא עם רוב חטאות ואשמות.",
      tanach: ["Bamidbar 15:4-12"], rambam: ["Maaseh HaKorbanot 2:1"] },
    { id: "L5-C28", q: "What is nisuch hamayim?",
      a: "Water libation poured on the altar during Sukkot — a halacha leMoshe miSinai.",
      qHe: "מהו ניסוך המים?", aHe: "ניסוך מים על המזבח בחג הסוכות — הלכה למשה מסיני.",
      tanach: [], rambam: ["Temidin uMusafin 10:6"] },
    { id: "L5-C29", q: "What are the four types of bread of the korban todah?",
      a: "Ten leavened loaves (chametz) plus thirty matzot in three forms — ten challot, ten rekikin, and ten revuchah — forty total.",
      qHe: "מהם ארבעת סוגי לחמי תודה?", aHe: "עשרה חמץ ושלושים מצות בשלושה סוגים: עשר חלות, עשרה רקיקים, ועשר רבוכה — ארבעים בסך הכל.",
      tanach: ["Vayikra 7:12-13"], rambam: ["Maaseh HaKorbanot 9:17"] },
    { id: "L5-C30", q: "Where is the korban pesach eaten?",
      a: "Within Jerusalem; only by those registered to the chaburah; only roasted; never raw or boiled.",
      qHe: "איפה נאכל קרבן הפסח?", aHe: "בירושלים; רק על ידי הנמנים על החבורה; רק צלי — לא חי ולא מבושל.",
      tanach: ["Shemot 12:9"], rambam: ["Korban Pesach 8:1"] },
    { id: "L5-C31", q: "Until what time may shelamim be eaten?",
      a: "Two days and the intervening night — until sunset on the second day.",
      qHe: "עד מתי נאכלים שלמים?", aHe: "שני ימים והלילה שביניהם — עד שקיעת היום השני.",
      tanach: ["Vayikra 7:16"], rambam: ["Maaseh HaKorbanot 10:7"] },
    { id: "L5-C32", q: "Until what time may todah and its breads be eaten?",
      a: "One day and the following night — like a chatat.",
      qHe: "עד מתי נאכלים תודה ולחמיה?", aHe: "יום ולילה — כחטאת.",
      tanach: ["Vayikra 7:15"], rambam: ["Maaseh HaKorbanot 10:6"] },
  ],

  // ── Quiz ─────────────────────────────────────────────────────────────
  quiz: [
    // L5-C02
    { id: "L5-Q01", kind: "cloze",
      prompt: "Each tamid lamb comes with a mincha of ____ of an ephah of fine flour, mixed with a quarter-hin of oil, and a quarter-hin of wine.",
      options: ["one-quarter", "one-tenth", "one-half", "one-third"],
      answer: 1,
      explain: "Each tamid lamb is accompanied by one-tenth of an ephah of solet mixed with one-quarter hin of oil, plus a wine libation of one-quarter hin.",
      cite: "Temidin uMusafin 2:1" },

    // L5-C01, C03, C04, C05, C08
    { id: "L5-Q02", kind: "match",
      prompt: "Match each offering to what it consists of.",
      pairs: [
        { hebrew: "תָּמִיד", english: "two lambs every day — one in the morning, one in the afternoon" },
        { hebrew: "מוּסַף שַׁבָּת", english: "two lambs as olah, added to the tamid" },
        { hebrew: "מוּסַף רֹאשׁ חֹדֶשׁ", english: "two bulls, one ram, seven lambs as olot, and a goat chatat" },
        { hebrew: "מוּסַף יוֹם הַכִּפּוּרִים", english: "a bull, a ram, seven lambs as olot, and a goat chatat" },
      ],
      explain: "The tamid is the daily base: two lambs. Musafin are the additions on Shabbat, Rosh Chodesh, and festivals — Shabbat adds two lambs; Rosh Chodesh adds two bulls, a ram, seven lambs, and a goat chatat; Yom Kippur's musaf is a bull, a ram, seven lambs as olot, and a goat chatat.",
      cite: "Temidin uMusafin 4:1" },

    // L5-C06
    { id: "L5-Q03", kind: "mc",
      prompt: "When is the par he'elem davar brought?",
      options: [
        "When a king sinned inadvertently",
        "When the kohen gadol sinned inadvertently",
        "When the Sanhedrin ruled in error and most of Israel acted on the ruling inadvertently",
        "When an individual is unsure whether he sinned",
      ],
      answer: 2,
      explain: "The par he'elem davar is a bull chatat brought by the community when the Sanhedrin issued an erroneous ruling and the majority of Israel followed it inadvertently.",
      cite: "Shegagot 12:1" },

    // L5-C07
    { id: "L5-Q04", kind: "tap",
      prompt: "Which term names the goat chatot brought when most of Israel inadvertently served idols on a mistaken Sanhedrin ruling?",
      options: ["שָׂעִיר הַמִּשְׁתַּלֵּחַ", "פַּר הֶעְלֵם דָּבָר", "שְׂעִיר רֹאשׁ חֹדֶשׁ", "שְׂעִירֵי עֲבוֹדָה זָרָה"],
      answer: 3,
      explain: "The se'irei avodah zarah are goat chatot brought communally when the majority of Israel inadvertently engaged in idolatry based on an erroneous Sanhedrin ruling. For other mitzvot the communal chatat is a bull, the par he'elem davar.",
      cite: "Shegagot 12:1" },

    // L5-C08
    { id: "L5-Q05", kind: "sort",
      prompt: "On Yom Kippur, which korbanot are the kohen gadol's own and which are the community's?",
      buckets: [
        { id: "own", he: "מִשֶּׁלּוֹ", en: "The kohen gadol's own" },
        { id: "tzibur", he: "מִשֶּׁל צִבּוּר", en: "The community's" },
      ],
      items: [
        { hebrew: "פַּר כֹּהֵן גָּדוֹל", translit: "par kohen gadol", bucket: "own" },
        { hebrew: "אֵיל כֹּהֵן גָּדוֹל", translit: "eil kohen gadol", bucket: "own" },
        { hebrew: "שְׁנֵי שְׂעִירִים", translit: "shnei se'irim", bucket: "tzibur" },
        { hebrew: "אַיִל לְעוֹלָה", translit: "ayil le'olah", bucket: "tzibur" },
        { hebrew: "תָּמִיד", translit: "tamid", bucket: "tzibur" },
        { hebrew: "מוּסָף", translit: "musaf", bucket: "tzibur" },
      ],
      explain: "The kohen gadol's personal korbanot are a bull and a ram. The communal ones are the two goats (one slaughtered, one to Azazel) and a ram olah — plus the regular tamid and the day's musaf of a bull, a ram, seven lambs as olot, and a goat chatat.",
      cite: "Avodat Yom HaKippurim 1:1" },

    // L5-C09
    { id: "L5-Q06", kind: "mc",
      prompt: "What happens to the se'ir hamishtaleach?",
      options: [
        "The kohen gadol confesses over it and it is sent to the wilderness, to Azazel",
        "It is slaughtered and its blood is sprinkled in the kodesh hakodashim",
        "It is burned whole outside the camp",
        "It is eaten by the kohanim that night",
      ],
      answer: 0,
      explain: "The se'ir hamishtaleach is the Yom Kippur goat the kohen gadol confesses upon and sends to the wilderness, to Azazel. Its partner goat is the one slaughtered.",
      cite: "Avodat Yom HaKippurim 3:14" },

    // L5-C11
    { id: "L5-Q07", kind: "cloze",
      prompt: "The omer is a ____ mincha brought by the community on the 16th of Nissan, and it permits the new grain.",
      options: ["wheat", "spelt", "barley", "oat"],
      answer: 2,
      explain: "The omer is a barley mincha of the community, brought on 16 Nissan; it permits eating chadash, the new grain. The wheat offering of the harvest is the shtei halechem on Shavuot.",
      cite: "Temidin uMusafin 7:3" },

    // L5-C10
    { id: "L5-Q08", kind: "tf",
      prompt: "The shtei halechem are two loaves of leavened wheat bread brought on Shavuot, and the two lambs with them are the only communal shelamim of the year.",
      answer: true,
      explain: "True. The shtei halechem are chametz, made of wheat, brought as bikurim on Shavuot — and their two lambs are the year's only communal shelamim.",
      cite: "Temidin uMusafin 8:1" },

    // L5-C12
    { id: "L5-Q09", kind: "mc",
      prompt: "How is the lechem hapanim arranged, and how often is it replaced?",
      options: [
        "Twelve loaves in one row, replaced every day",
        "Twelve loaves in two stacks, replaced every Shabbat",
        "Ten loaves in two stacks, replaced every Rosh Chodesh",
        "Two loaves on the golden table, replaced every Shavuot",
      ],
      answer: 1,
      explain: "The lechem hapanim is twelve unleavened wheat loaves in two stacks on the golden table. They are replaced every Shabbat, and the old loaves are eaten by the kohanim.",
      cite: "Temidin uMusafin 5:1" },

    // L5-C13
    { id: "L5-Q10", kind: "tf",
      prompt: "The two bazichei levonah stand beside the two stacks of lechem hapanim, and their frankincense is burned on Shabbat, when the bread is changed.",
      answer: true,
      explain: "True. Two bowls of frankincense are placed beside the two stacks, and their levonah is burned on Shabbat at the changeover of the bread.",
      cite: "Temidin uMusafin 5:2" },

    // L5-C20
    { id: "L5-Q11", kind: "match",
      prompt: "Match each type of mincha to how it is prepared.",
      pairs: [
        { hebrew: "סֹלֶת", english: "plain fine flour, not baked" },
        { hebrew: "מַאֲפֵה תַנּוּר", english: "oven-baked — challot or rekikin" },
        { hebrew: "מַחֲבַת", english: "cooked on a flat pan" },
        { hebrew: "מַרְחֶשֶׁת", english: "cooked in a deep pan" },
      ],
      explain: "A mincha is a flour offering of wheat or barley. Its main types are solet (fine flour), ma'afeh tanur (oven-baked, as challot or rekikin), machavat (flat pan), and marcheshet (deep pan).",
      cite: "Maaseh HaKorbanot 12:6" },

    // L5-C21
    { id: "L5-Q12", kind: "mc",
      prompt: "Which ingredients go into most menachot?",
      options: [
        "Fine wheat flour, wine, salt, and levonah",
        "Barley flour, olive oil, honey, and levonah",
        "Fine wheat flour, olive oil, salt, and water",
        "Fine wheat flour, olive oil, salt, and levonah",
      ],
      answer: 3,
      explain: "Most menachot require solet (fine wheat flour), olive oil, salt, and levonah (frankincense).",
      cite: "Maaseh HaKorbanot 12:7" },

    // L5-C22
    { id: "L5-Q13", kind: "sort",
      prompt: "Which menachot have oil and levonah, and which leave them out?",
      buckets: [
        { id: "with", he: "בְּשֶׁמֶן וּלְבוֹנָה", en: "With oil and levonah" },
        { id: "without", he: "בְּלֹא שֶׁמֶן וּלְבוֹנָה", en: "No oil, no levonah" },
      ],
      items: [
        { hebrew: "מִנְחַת סוֹטָה", translit: "minchat sotah", bucket: "without" },
        { hebrew: "מִנְחַת מַחֲבַת", translit: "minchat machavat", bucket: "with" },
        { hebrew: "מִנְחַת חוֹטֵא שֶׁל עָנִי", translit: "minchat chotei shel ani", bucket: "without" },
        { hebrew: "מִנְחַת סֹלֶת", translit: "minchat solet", bucket: "with" },
        { hebrew: "מִנְחַת מַרְחֶשֶׁת", translit: "minchat marcheshet", bucket: "with" },
      ],
      explain: "Only two menachot omit oil and levonah: the sotah's mincha, which is barley, and the mincha of a poor person bringing a sliding-scale chatat. The ordinary types — solet, machavat, marcheshet, ma'afeh tanur — have both.",
      cite: "Maaseh HaKorbanot 12:8" },

    // L5-C23
    { id: "L5-Q14", kind: "tap",
      prompt: "Which word names the fistful the kohen takes from a mincha to burn on the altar?",
      options: ["קֹמֶץ", "בָּזִיךְ", "לְבוֹנָה", "סֹלֶת"],
      answer: 0,
      explain: "Kemitzah is the kohen taking a kometz — a fistful — of the mincha for burning on the altar. In an ordinary mincha the rest is eaten by the kohanim; the wholly burned menachot have no kemitzah at all.",
      cite: "Maaseh HaKorbanot 13:13" },

    // L5-C24
    { id: "L5-Q15", kind: "sort",
      prompt: "Is part of this mincha eaten by the kohanim — or is the whole mincha burned?",
      buckets: [
        { id: "eaten", he: "שְׁיָרֶיהָ נֶאֱכָלִין", en: "Rest eaten by kohanim" },
        { id: "burned", he: "כֻּלָּהּ כָּלִיל", en: "Burned entirely" },
      ],
      items: [
        { hebrew: "מִנְחַת כֹּהֵן", translit: "minchat kohen", bucket: "burned" },
        { hebrew: "מִנְחַת סֹלֶת שֶׁל יִשְׂרָאֵל", translit: "minchat solet shel yisrael", bucket: "eaten" },
        { hebrew: "חֲבִיתֵי כֹּהֵן גָּדוֹל", translit: "chavitei kohen gadol", bucket: "burned" },
        { hebrew: "מִנְחַת חִנּוּךְ", translit: "minchat chinuch", bucket: "burned" },
        { hebrew: "מִנְחַת מַחֲבַת שֶׁל יִשְׂרָאֵל", translit: "minchat machavat shel yisrael", bucket: "eaten" },
        { hebrew: "מִנְחַת נְסָכִים", translit: "minchat nesachim", bucket: "burned" },
      ],
      explain: "Four menachot are burned entirely with nothing eaten: the mincha of a kohen, the chavitin of the kohen gadol, the minchat chinuch of a kohen's first day, and the mincha that accompanies nesachim. An ordinary yisrael's mincha has its kometz burned and the rest eaten by kohanim.",
      cite: "Maaseh HaKorbanot 12:12" },

    // L5-C27
    { id: "L5-Q16", kind: "mc",
      prompt: "Which korbanot require nesachim, the wine libations?",
      options: [
        "Every chatat and asham",
        "Every animal olah and shelamim — but not most chatot and ashamot",
        "Only communal korbanot",
        "Only the tamid and the musafim",
      ],
      answer: 1,
      explain: "Nesachim are wine libations poured on the altar. They are required with every animal olah and shelamim — including the metzora's and the nazir's — but not with a bird olah, nor with most chatot or ashamot.",
      cite: "Maaseh HaKorbanot 2:1" },

    // L5-C28
    { id: "L5-Q17", kind: "tf",
      prompt: "Nisuch hamayim, the water libation on the altar, is performed during Pesach.",
      answer: false,
      explain: "False. Nisuch hamayim is poured on the altar during Sukkot. It is a halacha leMoshe miSinai, not written in the Torah.",
      cite: "Temidin uMusafin 10:6" },

    // L5-C14
    { id: "L5-Q18", kind: "mc",
      prompt: "Which animal may be brought as a korban pesach?",
      options: [
        "A male lamb or calf up to one year old",
        "A ram or male goat in its second year",
        "A male lamb or kid up to one year old",
        "A female lamb up to one year old",
      ],
      answer: 2,
      explain: "The korban pesach is a male lamb or kid up to one year old, slaughtered on the afternoon of 14 Nissan and eaten roasted that night with matzah and maror. Cattle are never used for it.",
      cite: "Korban Pesach 1:1" },

    // L5-C15
    { id: "L5-Q19", kind: "tf",
      prompt: "The korban pesach may be eaten until dawn.",
      answer: false,
      explain: "False. As a matter of practical halacha, the korban pesach may be eaten only until midnight.",
      cite: "Korban Pesach 8:15" },

    // L5-C30
    { id: "L5-Q20", kind: "cloze",
      prompt: "The korban pesach is eaten only ____, within Jerusalem, and only by those registered to its chaburah.",
      options: ["roasted", "boiled", "raw", "salted"],
      answer: 0,
      explain: "The korban pesach is eaten within Jerusalem, only by those registered to the chaburah, and only roasted — never raw or boiled.",
      cite: "Korban Pesach 8:1" },

    // L5-C16
    { id: "L5-Q21", kind: "mc",
      prompt: "Who brings the pesach sheni, and when?",
      options: [
        "Anyone who wants a second pesach — on 14 Iyyar",
        "Those who were tameh or far away on 14 Nissan — on 15 Nissan",
        "Those who were tameh or far away on 14 Nissan — on 14 Sivan",
        "Those who were tameh, far away, or otherwise unable on 14 Nissan — on 14 Iyyar",
      ],
      answer: 3,
      explain: "Pesach sheni is a second pesach offering on 14 Iyyar, for those who were tameh, on a distant journey, or otherwise unable to offer the pesach on 14 Nissan.",
      cite: "Korban Pesach 5:1" },

    // L5-C17, C18, C19
    { id: "L5-Q22", kind: "match",
      prompt: "Match each festival offering to its description.",
      pairs: [
        { hebrew: "עוֹלַת רְאִיָּה", english: "an olah brought by every adult male appearing at the Mikdash on the three festivals" },
        { hebrew: "חֲגִיגָה", english: "a shelamim brought by every adult male on each of the three festivals" },
        { hebrew: "חֲגִיגַת אַרְבָּעָה עָשָׂר", english: "a shelamim brought with the pesach when the chaburah is large, so the pesach is eaten al hasova" },
        { hebrew: "פֶּסַח שֵׁנִי", english: "a second pesach on 14 Iyyar for those who missed the first" },
      ],
      explain: "Re'iyah is the olah and chagigah is the shelamim that every adult male brings when he appears at the Mikdash on the three festivals. Chagigat arba'ah asar is a shelamim added to the pesach on 14 Nissan when the group is large, so the pesach is eaten on a full stomach.",
      cite: "Chagigah 1:1" },

    // L5-C25
    { id: "L5-Q23", kind: "mc",
      prompt: "Who eats the bechor, and where?",
      options: [
        "The owner, in Jerusalem, within two days and a night",
        "Kohanim, in Jerusalem, within two days and a night",
        "Kohanim, in the courtyard, within one day and a night",
        "Anyone tahor, anywhere, within one day and a night",
      ],
      answer: 1,
      explain: "A bechor — a male that is the first to open its mother's womb, of a kosher domestic animal — is holy from birth and given to a kohen. It is offered on the altar and eaten by kohanim in Jerusalem within two days and a night.",
      cite: "Bechorot 1:1" },

    // L5-C26
    { id: "L5-Q24", kind: "tap",
      prompt: "Which term names every tenth animal born to one's cattle, sheep, or goats — eaten by its owner in Jerusalem?",
      options: ["בְּכוֹר", "תּוֹדָה", "מַעְשַׂר בְּהֵמָה", "חֲגִיגָה"],
      answer: 2,
      explain: "Maaser behemah is every tenth animal born to one's cattle, sheep, or goats, set aside as a korban. Its blood and eimurin go on the altar; its meat is eaten by the owner in Jerusalem. A bechor, by contrast, is eaten by kohanim.",
      cite: "Bechorot 6:1" },

    // L5-C29
    { id: "L5-Q25", kind: "mc",
      prompt: "How many loaves come with a korban todah, and of what kinds?",
      options: [
        "Forty — ten chametz, ten challot, ten rekikin, ten revuchah",
        "Thirty — ten chametz, ten challot, ten rekikin",
        "Forty — all of them matzah",
        "Twelve — unleavened, in two stacks",
      ],
      answer: 0,
      explain: "The todah comes with forty loaves: ten leavened (chametz) plus thirty matzot in three forms — ten challot, ten rekikin, and ten revuchah.",
      cite: "Maaseh HaKorbanot 9:17" },

    // L5-C31, C32 (with C15, C25)
    { id: "L5-Q26", kind: "sort",
      prompt: "Sort each korban by how long it may be eaten.",
      buckets: [
        { id: "one", he: "יוֹם וָלַיְלָה", en: "One day and a night" },
        { id: "two", he: "שְׁנֵי יָמִים וְלַיְלָה", en: "Two days and a night" },
        { id: "mid", he: "עַד חֲצוֹת", en: "Until midnight" },
      ],
      items: [
        { hebrew: "שְׁלָמִים", translit: "shelamim", bucket: "two" },
        { hebrew: "תּוֹדָה", translit: "todah", bucket: "one" },
        { hebrew: "קָרְבַּן פֶּסַח", translit: "korban pesach", bucket: "mid" },
        { hebrew: "בְּכוֹר", translit: "bechor", bucket: "two" },
        { hebrew: "לַחְמֵי תוֹדָה", translit: "lachmei todah", bucket: "one" },
        { hebrew: "חַטָּאת", translit: "chatat", bucket: "one" },
      ],
      explain: "Shelamim are eaten for two days and the intervening night, until sunset on the second day; so is a bechor. A todah and its breads get only one day and the following night, like a chatat. The korban pesach is eaten that night until midnight.",
      cite: "Maaseh HaKorbanot 10:6" },

    // ── Expanded bank ──────────────────────────────────────────────────

    // L5-C01
    { id: "L5-Q27", kind: "mc",
      prompt: "It is an ordinary weekday — not Shabbat, not Rosh Chodesh, not a festival. What does the community offer on the altar that day?",
      options: [
        "One lamb, in the morning only",
        "Two lambs — one in the morning and one in the afternoon",
        "Two lambs in the morning and two more in the afternoon",
        "A bull in the morning and a lamb in the afternoon",
      ],
      answer: 1,
      explain: "The tamid is two lambs every single day — one in the morning and one in the afternoon — each with its mincha and nesachim. On an ordinary weekday no musaf is added.",
      cite: "Temidin uMusafin 1:1" },

    // L5-C01
    { id: "L5-Q28", kind: "tf",
      prompt: "Both lambs of the tamid are brought in the morning, one right after the other.",
      answer: false,
      explain: "False. One tamid lamb is brought in the morning and the other in the afternoon; the day's service opens with the first and closes with the second.",
      cite: "Temidin uMusafin 1:1" },

    // L5-C02
    { id: "L5-Q29", kind: "cloze",
      prompt: "The wine libation of each tamid lamb is ____ of a hin.",
      options: ["one-tenth", "one-half", "one-quarter", "one-third"],
      answer: 2,
      explain: "Each tamid lamb has a nesech of one-quarter hin of wine; its mincha is one-tenth of an ephah of solet mixed with one-quarter hin of oil. The tenth belongs to the flour, not the wine.",
      cite: "Temidin uMusafin 2:1" },

    // L5-C03
    { id: "L5-Q30", kind: "cloze",
      prompt: "On Shabbat, Rosh Chodesh, and the festivals the musafin are brought ____ the daily tamid.",
      options: ["in addition to", "instead of", "in place of the afternoon lamb of"],
      answer: 0,
      explain: "Musaf means \"addition\": the extra communal offerings of Shabbat, Rosh Chodesh, and the festivals come beyond the daily tamid, which is still brought morning and afternoon.",
      cite: "Temidin uMusafin 4:1" },

    // L5-C03
    { id: "L5-Q31", kind: "tf",
      prompt: "On Rosh Chodesh the musaf takes the place of the tamid, so no tamid lambs are brought that day.",
      answer: false,
      explain: "False. The tamid is brought every day of the year; the musaf of Rosh Chodesh is added beyond it, never in place of it.",
      cite: "Temidin uMusafin 4:1" },

    // L5-C04
    { id: "L5-Q32", kind: "mc",
      prompt: "It is Shabbat morning. Besides the tamid, what goes on the altar as the musaf?",
      options: [
        "Two bulls, one ram, seven lambs, and a goat chatat",
        "Two lambs as shelamim",
        "One lamb as an olah",
        "Two lambs as olot",
      ],
      answer: 3,
      explain: "The musaf of Shabbat is two lambs brought as olot, in addition to the daily tamid. The bulls, ram, seven lambs, and goat belong to Rosh Chodesh; two lambs as shelamim belong to Shavuot.",
      cite: "Temidin uMusafin 4:2" },

    // L5-C05
    { id: "L5-Q33", kind: "mc",
      prompt: "It is Rosh Chodesh. What is the musaf?",
      options: [
        "Two lambs as olot",
        "Two bulls, one ram, and seven lambs as olot, plus one goat as a chatat",
        "One bull, one ram, and seven lambs as olot, plus one goat as a chatat",
        "Two bulls, one ram, and seven lambs as olot, with no chatat",
      ],
      answer: 1,
      explain: "The musaf of Rosh Chodesh is two bulls, one ram, and seven lambs as olot, together with one goat as a chatat — all beyond the daily tamid.",
      cite: "Temidin uMusafin 4:3" },

    // L5-C01, C03, C04, C05
    { id: "L5-Q34", kind: "sort",
      prompt: "Is each of these part of the tamid, part of a musaf, or neither?",
      buckets: [
        { id: "tamid", he: "תָּמִיד", en: "Part of the tamid" },
        { id: "musaf", he: "מוּסָף", en: "Part of a musaf" },
        { id: "neither", he: "לֹא זֶה וְלֹא זֶה", en: "Neither" },
      ],
      items: [
        { hebrew: "כֶּבֶשׂ שֶׁל שַׁחַר", translit: "keves shel shachar", bucket: "tamid" },
        { hebrew: "כֶּבֶשׂ שֶׁל בֵּין הָעַרְבַּיִם", translit: "keves shel bein ha'arbayim", bucket: "tamid" },
        { hebrew: "שְׁנֵי כְבָשִׂים שֶׁל שַׁבָּת", translit: "shnei kevasim shel Shabbat", bucket: "musaf" },
        { hebrew: "שְׂעִיר רֹאשׁ חֹדֶשׁ", translit: "se'ir Rosh Chodesh", bucket: "musaf" },
        { hebrew: "עֹמֶר", translit: "omer", bucket: "neither" },
        { hebrew: "קָרְבַּן פֶּסַח", translit: "korban pesach", bucket: "neither" },
      ],
      explain: "The tamid is the morning lamb and the afternoon lamb. The two Shabbat lambs and the Rosh Chodesh goat chatat are musafin, the additions of those days. The omer is a communal mincha and the korban pesach is an individual's — neither is tamid or musaf.",
      cite: "Temidin uMusafin 4:1" },

    // L5-C06
    { id: "L5-Q35", kind: "tap",
      prompt: "Which term names the bull chatat the community brings after the Sanhedrin ruled in error and most of Israel followed?",
      options: ["שְׂעִירֵי עֲבוֹדָה זָרָה", "פַּר כֹּהֵן גָּדוֹל", "פַּר הֶעְלֵם דָּבָר", "שָׂעִיר הַמִּשְׁתַּלֵּחַ"],
      answer: 2,
      explain: "The par he'elem davar is the community's chatat when the Sanhedrin issued an erroneous ruling and the majority of Israel acted on it inadvertently. The par kohen gadol is the kohen gadol's own Yom Kippur bull.",
      cite: "Shegagot 12:1" },

    // L5-C06, C07
    { id: "L5-Q36", kind: "mc",
      prompt: "The Sanhedrin ruled in error and most of Israel acted on the ruling. What chatat does the community bring — if the sin was idolatry, and if it was any other mitzvah?",
      options: [
        "Goats for idolatry; a bull for any other mitzvah",
        "A bull for idolatry; goats for any other mitzvah",
        "A bull in either case",
        "Goats in either case",
      ],
      answer: 0,
      explain: "For idolatry the community brings goats as chatot, the se'irei avodah zarah, each alongside a bull as an olah; for an error in any other mitzvah it brings a bull as a chatat, the par he'elem davar.",
      cite: "Shegagot 12:1" },

    // L5-C07
    { id: "L5-Q37", kind: "cloze",
      prompt: "The se'irei avodah zarah are goats brought as ____ when most of Israel inadvertently served idols on a mistaken Sanhedrin ruling.",
      options: ["olot", "chatot", "shelamim", "ashamot"],
      answer: 1,
      explain: "They are chatot — sin offerings — brought by the community, just as the par he'elem davar is for other mitzvot. For idolatry the goats are accompanied by bulls brought as olot.",
      cite: "Shegagot 12:1" },

    // L5-C08
    { id: "L5-Q38", kind: "mc",
      prompt: "On Yom Kippur, which korbanot does the kohen gadol bring from his own, and not on behalf of the community?",
      options: [
        "Two goats and a ram",
        "A bull and a goat",
        "A ram and seven lambs",
        "A bull and a ram",
      ],
      answer: 3,
      explain: "The kohen gadol's personal korbanot on Yom Kippur are a bull and a ram. The two goats and the ram olah are the community's, as are the tamid and the day's musaf.",
      cite: "Avodat Yom HaKippurim 1:1" },

    // L5-C08, C09
    { id: "L5-Q39", kind: "tf",
      prompt: "On Yom Kippur both of the community's two goats are slaughtered on the altar.",
      answer: false,
      explain: "False. Of the two se'irim, one is slaughtered and the other — the se'ir hamishtaleach — is confessed over and sent alive to the wilderness, to Azazel.",
      cite: "Avodat Yom HaKippurim 1:1" },

    // L5-C09
    { id: "L5-Q40", kind: "tap",
      prompt: "Which term names the goat the kohen gadol confesses over and sends to Azazel?",
      options: ["שְׂעִיר רֹאשׁ חֹדֶשׁ", "שָׂעִיר הַמִּשְׁתַּלֵּחַ", "שְׂעִירֵי עֲבוֹדָה זָרָה", "פַּר הֶעְלֵם דָּבָר"],
      answer: 1,
      explain: "The se'ir hamishtaleach is the Yom Kippur goat sent to the wilderness after the kohen gadol confesses over it. The Rosh Chodesh goat and the se'irei avodah zarah are slaughtered as chatot.",
      cite: "Avodat Yom HaKippurim 3:14" },

    // L5-C10
    { id: "L5-Q41", kind: "mc",
      prompt: "It is Shavuot. What grain offering does the community bring?",
      options: [
        "An omer of barley",
        "Twelve unleavened wheat loaves for the golden table",
        "Two loaves of leavened wheat bread, with two lambs as shelamim",
        "Two loaves of unleavened wheat bread, with two lambs as olot",
      ],
      answer: 2,
      explain: "On Shavuot the community brings the shtei halechem — two loaves of leavened wheat bread as bikurim — together with two lambs as communal shelamim. The omer belongs to Pesach; the twelve loaves are the weekly lechem hapanim.",
      cite: "Temidin uMusafin 8:1" },

    // L5-C10
    { id: "L5-Q42", kind: "tf",
      prompt: "The shtei halechem are chametz — leavened bread — unlike the lechem hapanim, which is unleavened.",
      answer: true,
      explain: "True. The two loaves of Shavuot are leavened wheat bread, the one communal bread that is chametz; the twelve loaves of the lechem hapanim are matzah.",
      cite: "Temidin uMusafin 8:1" },

    // L5-C11
    { id: "L5-Q43", kind: "mc",
      prompt: "It is 16 Nissan. What does the community bring today?",
      options: [
        "The shtei halechem, two leavened wheat loaves",
        "The korban pesach",
        "Twelve fresh loaves for the golden table",
        "The omer, a mincha of barley",
      ],
      answer: 3,
      explain: "On 16 Nissan the community brings the omer, a barley mincha; once it is brought, the new grain (chadash) may be eaten. The korban pesach is an individual's, on 14 Nissan; the shtei halechem come on Shavuot.",
      cite: "Temidin uMusafin 7:3" },

    // L5-C10, C12, C29
    { id: "L5-Q44", kind: "sort",
      prompt: "Chametz or matzah? Sort each bread of the Mikdash.",
      buckets: [
        { id: "chametz", he: "חָמֵץ", en: "Leavened" },
        { id: "matzah", he: "מַצָּה", en: "Unleavened" },
      ],
      items: [
        { hebrew: "שְׁתֵּי הַלֶּחֶם", translit: "shtei halechem", bucket: "chametz" },
        { hebrew: "לֶחֶם הַפָּנִים", translit: "lechem hapanim", bucket: "matzah" },
        { hebrew: "חַלּוֹת שֶׁל תּוֹדָה", translit: "challot shel todah", bucket: "matzah" },
        { hebrew: "רְקִיקֵי תוֹדָה", translit: "rekikei todah", bucket: "matzah" },
        { hebrew: "רְבוּכָה", translit: "revuchah", bucket: "matzah" },
        ],
      explain: "The shtei halechem of Shavuot are leavened, and so are ten of the forty todah loaves. The lechem hapanim and the other thirty todah loaves — challot, rekikin, and revuchah — are matzah.",
      cite: "Maaseh HaKorbanot 9:17" },

    // L5-C11, C14, C18, C10, C28
    { id: "L5-Q45", kind: "sort",
      prompt: "Which festival does each of these belong to?",
      buckets: [
        { id: "pesach", he: "פֶּסַח", en: "Pesach (Nissan)" },
        { id: "shavuot", he: "שָׁבוּעוֹת", en: "Shavuot (Sivan)" },
        { id: "sukkot", he: "סֻכּוֹת", en: "Sukkot (Tishrei)" },
      ],
      items: [
        { hebrew: "עֹמֶר", translit: "omer", bucket: "pesach" },
        { hebrew: "קָרְבַּן פֶּסַח", translit: "korban pesach", bucket: "pesach" },
        { hebrew: "חֲגִיגַת אַרְבָּעָה עָשָׂר", translit: "chagigat arba'ah asar", bucket: "pesach" },
        { hebrew: "שְׁתֵּי הַלֶּחֶם", translit: "shtei halechem", bucket: "shavuot" },
        { hebrew: "שְׁנֵי כִבְשֵׂי שַׁלְמֵי צִבּוּר", translit: "shnei kivsei shalmei tzibur", bucket: "shavuot" },
        { hebrew: "נִסּוּךְ הַמַּיִם", translit: "nisuch hamayim", bucket: "sukkot" },
      ],
      explain: "Nissan holds the korban pesach and its chagigat arba'ah asar on the 14th and the omer on the 16th. Shavuot brings the shtei halechem with their two lambs, the only communal shelamim of the year. The water libation belongs to Sukkot alone.",
      cite: "Temidin uMusafin 10:6" },

    // L5-C12
    { id: "L5-Q46", kind: "mc",
      prompt: "How many loaves of lechem hapanim are on the golden table at any one time?",
      options: ["Two", "Ten", "Twelve", "Forty"],
      answer: 2,
      explain: "Twelve unleavened wheat loaves, in two stacks, sit on the golden table all week and are replaced every Shabbat. Two is the shtei halechem; forty is the todah's bread.",
      cite: "Temidin uMusafin 5:1" },

    // L5-C13
    { id: "L5-Q47", kind: "mc",
      prompt: "When the lechem hapanim is changed on Shabbat, what from the golden table goes on the altar?",
      options: [
        "The twelve old loaves",
        "The frankincense from the two bazichin",
        "Two of the twelve loaves",
        "The two bowls themselves",
      ],
      answer: 1,
      explain: "The loaves are never burned — the old ones are eaten by the kohanim. What is burned on Shabbat is the levonah held in the two bazichin that stood beside the stacks.",
      cite: "Temidin uMusafin 5:2" },

    // L5-C13
    { id: "L5-Q48", kind: "tap",
      prompt: "Which term names the two bowls of frankincense placed beside the stacks of lechem hapanim?",
      options: ["קֹמֶץ", "מִנְחַת נְסָכִים", "שְׁתֵּי הַלֶּחֶם", "בְּזִיכֵי לְבוֹנָה"],
      answer: 3,
      explain: "The bazichei levonah are the two bowls of frankincense, one beside each stack; their levonah is burned on Shabbat when the bread is changed.",
      cite: "Temidin uMusafin 5:2" },

    // L5-C10, C11, C12, C22
    { id: "L5-Q49", kind: "match",
      prompt: "Match each grain offering to what it is made of.",
      pairs: [
        { hebrew: "עֹמֶר", english: "a barley mincha of the community, brought on 16 Nissan" },
        { hebrew: "שְׁתֵּי הַלֶּחֶם", english: "two leavened wheat loaves, brought on Shavuot" },
        { hebrew: "לֶחֶם הַפָּנִים", english: "twelve unleavened wheat loaves on the golden table" },
        { hebrew: "מִנְחַת סוֹטָה", english: "a barley mincha with no oil and no levonah" },
      ],
      explain: "The omer and the sotah's mincha are the barley offerings; the shtei halechem and the lechem hapanim are wheat — the first leavened, the second not.",
      cite: "Temidin uMusafin 7:3" },

    // L5-C14
    { id: "L5-Q50", kind: "mc",
      prompt: "On the afternoon of which day is the korban pesach slaughtered?",
      options: ["13 Nissan", "14 Nissan", "15 Nissan", "16 Nissan"],
      answer: 1,
      explain: "The korban pesach is slaughtered on the afternoon of 14 Nissan and eaten that night, roasted, with matzah and maror. The 16th is the day of the omer.",
      cite: "Korban Pesach 1:1" },

    // L5-C14
    { id: "L5-Q51", kind: "tf",
      prompt: "A male lamb in its second year is fit to be a korban pesach.",
      answer: false,
      explain: "False. The korban pesach must be a male lamb or kid up to one year old.",
      cite: "Korban Pesach 1:1" },

    // L5-C15
    { id: "L5-Q52", kind: "mc",
      prompt: "A chaburah is still eating its korban pesach late on the night of 15 Nissan. According to the practical halacha, until when may they continue?",
      options: [
        "Until midnight",
        "Until dawn",
        "Until the morning tamid is offered",
        "Until sunset the next day",
      ],
      answer: 0,
      explain: "As a matter of practical halacha the korban pesach may be eaten only until midnight; after that it may no longer be eaten.",
      cite: "Korban Pesach 8:15" },

    // L5-C16
    { id: "L5-Q53", kind: "tf",
      prompt: "Pesach sheni is offered on 14 Iyyar, one month after the first pesach.",
      answer: true,
      explain: "True. The second pesach, on 14 Iyyar, is for those who were tameh, on a distant journey, or otherwise unable to offer it on 14 Nissan.",
      cite: "Korban Pesach 5:1" },

    // L5-C16
    { id: "L5-Q54", kind: "mc",
      prompt: "A man was tameh on 14 Nissan and could not bring the korban pesach. What does he do?",
      options: [
        "He brings it on 15 Nissan, once he is tahor",
        "He brings a chatat in its place",
        "He brings a pesach sheni on 14 Iyyar",
        "He waits and brings it the following Nissan",
      ],
      answer: 2,
      explain: "Someone who was tameh, on a distant journey, or otherwise unable on 14 Nissan brings the pesach sheni on 14 Iyyar.",
      cite: "Korban Pesach 5:1" },

    // L5-C17
    { id: "L5-Q55", kind: "mc",
      prompt: "What kind of korban is the chagigah that every adult male brings on a festival?",
      options: ["An olah", "A shelamim", "A chatat", "A mincha"],
      answer: 1,
      explain: "The chagigah is a shelamim, brought by every adult male on each of the three festivals when he appears at the Mikdash. The olah he brings is the olat re'iyah.",
      cite: "Chagigah 1:1" },

    // L5-C18
    { id: "L5-Q56", kind: "cloze",
      prompt: "The chagigat arba'ah asar is brought with the pesach when the chaburah is large, so that the pesach is eaten ____.",
      options: ["al hasova — on a full stomach", "before midnight", "within Jerusalem"],
      answer: 0,
      explain: "With a large group each person would get only a little pesach meat, so a shelamim is brought on 14 Nissan to be eaten first; the pesach is then eaten al hasova, on a full stomach.",
      cite: "Korban Pesach 10:12" },

    // L5-C17, C19
    { id: "L5-Q57", kind: "mc",
      prompt: "A man comes up to the Mikdash on Sukkot. Which two korbanot does he bring for appearing there?",
      options: [
        "An olat tamid and a chagigah",
        "An olat re'iyah and a chagigat arba'ah asar",
        "A chagigah as an olah and an olat re'iyah as a shelamim",
        "An olat re'iyah as an olah and a chagigah as a shelamim",
      ],
      answer: 3,
      explain: "Every adult male who appears at the Mikdash on the three festivals brings an olat re'iyah, which is an olah, and a chagigah, which is a shelamim. The chagigat arba'ah asar belongs only to 14 Nissan.",
      cite: "Chagigah 1:1" },

    // L5-C19
    { id: "L5-Q58", kind: "tap",
      prompt: "Which term names the olah every adult male brings when he appears at the Mikdash on the three festivals?",
      options: ["חֲגִיגָה", "חֲגִיגַת אַרְבָּעָה עָשָׂר", "עוֹלַת רְאִיָּה", "עוֹלַת תָּמִיד"],
      answer: 2,
      explain: "The olat re'iyah — the olah of appearing — is the olah of the pilgrim on each festival; the chagigah is his shelamim.",
      cite: "Chagigah 1:1" },

    // L5-C20
    { id: "L5-Q59", kind: "mc",
      prompt: "A mincha is cooked in a deep pan. Which type of mincha is it?",
      options: ["Machavat", "Marcheshet", "Ma'afeh tanur", "Solet"],
      answer: 1,
      explain: "The marcheshet is the deep-pan mincha; the machavat is cooked on a flat pan, the ma'afeh tanur is oven-baked, and solet is plain fine flour.",
      cite: "Maaseh HaKorbanot 12:6" },

    // L5-C20
    { id: "L5-Q60", kind: "tap",
      prompt: "Which term names the oven-baked mincha, brought as challot or rekikin?",
      options: ["מַחֲבַת", "מַרְחֶשֶׁת", "מַאֲפֵה תַנּוּר", "סֹלֶת"],
      answer: 2,
      explain: "Ma'afeh tanur means baked in an oven; it comes in two shapes, challot (loaves) and rekikin (wafers).",
      cite: "Maaseh HaKorbanot 12:6" },

    // L5-C21
    { id: "L5-Q61", kind: "tf",
      prompt: "Most menachot require fine wheat flour, olive oil, honey, and frankincense.",
      answer: false,
      explain: "False. The four ingredients of most menachot are fine wheat flour (solet), olive oil, salt, and frankincense (levonah) — salt, not honey.",
      cite: "Maaseh HaKorbanot 12:7" },

    // L5-C21
    { id: "L5-Q62", kind: "cloze",
      prompt: "Most menachot are made of fine wheat flour, olive oil, frankincense, and ____.",
      options: ["wine", "water", "honey", "salt"],
      answer: 3,
      explain: "Salt is the fourth ingredient of most menachot, together with solet, olive oil, and levonah.",
      cite: "Maaseh HaKorbanot 12:7" },

    // L5-C22
    { id: "L5-Q63", kind: "mc",
      prompt: "Which mincha is brought with no oil and no frankincense?",
      options: [
        "The sotah's mincha",
        "The minchat nesachim",
        "The minchat machavat",
        "The chavitin of the kohen gadol",
      ],
      answer: 0,
      explain: "Only two menachot omit oil and levonah: the sotah's barley mincha and the mincha of a poor person bringing a sliding-scale chatat. The others listed have both.",
      cite: "Maaseh HaKorbanot 12:8" },

    // L5-C23
    { id: "L5-Q64", kind: "mc",
      prompt: "In an ordinary mincha, what happens once the kohen has taken the kometz?",
      options: [
        "The kometz is eaten by the kohen and the rest is burned",
        "The whole mincha, kometz and remainder, is burned",
        "The kometz is burned on the altar and the rest is eaten by the kohanim",
        "The kometz is burned and the rest is returned to the owner",
      ],
      answer: 2,
      explain: "Kemitzah takes a fistful for the altar; in an ordinary mincha that kometz is burned and the remainder is eaten by the kohanim. Only the wholly burned menachot go entirely to the fire.",
      cite: "Maaseh HaKorbanot 13:13" },

    // L5-C23
    { id: "L5-Q65", kind: "cloze",
      prompt: "Kemitzah is the kohen taking a ____ of the mincha to burn on the altar.",
      options: ["fistful", "tenth", "half", "single loaf"],
      answer: 0,
      explain: "The kometz is a fistful — the kohen's handful of the mincha — and it is the mincha's portion for the altar.",
      cite: "Maaseh HaKorbanot 13:13" },

    // L5-C24
    { id: "L5-Q66", kind: "mc",
      prompt: "Which of these menachot is NOT burned entirely — its remainder is eaten by the kohanim?",
      options: [
        "The mincha of a kohen",
        "The chavitin of the kohen gadol",
        "The minchat nesachim",
        "The minchat solet of an ordinary yisrael",
      ],
      answer: 3,
      explain: "An ordinary yisrael's mincha has its kometz burned and the rest eaten by the kohanim. The mincha of a kohen, the chavitin of the kohen gadol, the minchat chinuch, and the minchat nesachim are burned entirely.",
      cite: "Maaseh HaKorbanot 12:12" },

    // L5-C25, C26
    { id: "L5-Q67", kind: "mc",
      prompt: "A bechor and a maaser behemah both go to the altar. Who eats the meat of each?",
      options: [
        "Bechor: the kohanim; maaser behemah: its owner",
        "Bechor: its owner; maaser behemah: the kohanim",
        "Both are eaten by the kohanim",
        "Both are eaten by the owner",
      ],
      answer: 0,
      explain: "The bechor is given to a kohen and eaten by kohanim in Jerusalem; the maaser behemah stays with its owner, who eats its meat in Jerusalem after the blood and eimurin go on the altar.",
      cite: "Bechorot 6:1" },

    // L5-C25, C26, C30, C12
    { id: "L5-Q68", kind: "match",
      prompt: "Match each korban to who eats it.",
      pairs: [
        { hebrew: "בְּכוֹר", english: "kohanim, in Jerusalem, within two days and a night" },
        { hebrew: "מַעְשַׂר בְּהֵמָה", english: "its owner, in Jerusalem" },
        { hebrew: "קָרְבַּן פֶּסַח", english: "only those registered to its chaburah, roasted, in Jerusalem" },
        { hebrew: "לֶחֶם הַפָּנִים", english: "the kohanim, when the old loaves come off the table" },
      ],
      explain: "Bechor and lechem hapanim go to the kohanim; maaser behemah goes to its owner; the korban pesach is eaten only by the members of its chaburah — all within Jerusalem.",
      cite: "Bechorot 1:1" },

    // L5-C27
    { id: "L5-Q69", kind: "tf",
      prompt: "A nazir's shelamim and a metzora's olah both come with nesachim.",
      answer: true,
      explain: "True. Nesachim are required with every animal olah and every shelamim, including those of the metzora and the nazir; it is most chatot and ashamot that have none.",
      cite: "Maaseh HaKorbanot 2:1" },

    // L5-C28
    { id: "L5-Q70", kind: "tap",
      prompt: "Which term names the water libation poured on the altar on Sukkot?",
      options: ["נְסָכִים", "נִסּוּךְ הַמַּיִם", "מִנְחַת נְסָכִים", "נֶסֶךְ הַתָּמִיד"],
      answer: 1,
      explain: "Nisuch hamayim is the water libation of Sukkot, a halacha leMoshe miSinai. Nesachim are the wine libations that come with olot and shelamim all year.",
      cite: "Temidin uMusafin 10:6" },

    // L5-C27, C28, C24, C02
    { id: "L5-Q71", kind: "match",
      prompt: "Match each libation term to its meaning.",
      pairs: [
        { hebrew: "נְסָכִים", english: "wine poured on the altar with every animal olah and shelamim" },
        { hebrew: "נִסּוּךְ הַמַּיִם", english: "water poured on the altar during Sukkot — a halacha leMoshe miSinai" },
        { hebrew: "מִנְחַת נְסָכִים", english: "the flour offering that accompanies the libations — burned entirely" },
        { hebrew: "נֶסֶךְ הַתָּמִיד", english: "one-quarter hin of wine with each tamid lamb" },
      ],
      explain: "Nesachim are wine, brought with every animal olah and shelamim; the minchat nesachim is the flour that accompanies them and is burned entirely. Nisuch hamayim is water, only on Sukkot.",
      cite: "Maaseh HaKorbanot 2:1" },

    // L5-C29
    { id: "L5-Q72", kind: "cloze",
      prompt: "Of the forty loaves of a korban todah, ____ are chametz and the rest are matzah.",
      options: ["ten", "twenty", "thirty", "forty"],
      answer: 0,
      explain: "Ten of the todah's loaves are leavened; the other thirty are matzot in three forms — ten challot, ten rekikin, and ten revuchah.",
      cite: "Maaseh HaKorbanot 9:17" },

    // L5-C29
    { id: "L5-Q73", kind: "tap",
      prompt: "Which word names the scalded-dough loaves among the todah's matzot?",
      options: ["חָמֵץ", "חַלּוֹת", "רְקִיקִין", "רְבוּכָה"],
      answer: 3,
      explain: "Revuchah is the third form of the todah's matzah — ten loaves of dough scalded in hot water — beside the ten challot and ten rekikin.",
      cite: "Maaseh HaKorbanot 9:17" },

    // L5-C30
    { id: "L5-Q74", kind: "tf",
      prompt: "A chaburah cooked its korban pesach in water and ate it boiled. The pesach was eaten properly.",
      answer: false,
      explain: "False. The korban pesach may be eaten only roasted — never raw and never boiled — within Jerusalem, by those registered to its chaburah.",
      cite: "Korban Pesach 8:1" },

    // L5-C31
    { id: "L5-Q75", kind: "mc",
      prompt: "An ordinary shelamim was slaughtered on Sunday. Until when may its meat be eaten?",
      options: [
        "Until midnight Sunday night",
        "Until dawn on Monday",
        "Until sunset on Monday",
        "Until sunset on Tuesday",
      ],
      answer: 2,
      explain: "Shelamim are eaten for two days and the night between — the day of slaughter, that night, and the next day until sunset. Slaughtered Sunday, they must be finished by sunset Monday.",
      cite: "Maaseh HaKorbanot 10:7" },

    // L5-C31
    { id: "L5-Q76", kind: "tf",
      prompt: "Shelamim may be eaten for two days and the intervening night, until sunset on the second day.",
      answer: true,
      explain: "True. An ordinary shelamim has two days and the night between them; the todah, though a shelamim, is cut to one day and a night.",
      cite: "Maaseh HaKorbanot 10:7" },

    // L5-C32
    { id: "L5-Q77", kind: "mc",
      prompt: "A todah was offered on Sunday morning. Until when may it and its forty loaves be eaten?",
      options: [
        "That night only, until midnight",
        "Through Sunday and the night that follows it",
        "Through Monday until sunset — two days and a night",
      ],
      answer: 1,
      explain: "A todah and its breads are eaten for one day and the following night, like a chatat — shorter than an ordinary shelamim's two days and a night.",
      cite: "Maaseh HaKorbanot 10:6" },

    // L5-C32
    { id: "L5-Q78", kind: "tf",
      prompt: "A todah and its breads are eaten for one day and the following night, the same span as a chatat.",
      answer: true,
      explain: "True. Although the todah is a kind of shelamim, the Torah shortens its time to one day and the following night, like a chatat — and its forty loaves follow the same clock.",
      cite: "Maaseh HaKorbanot 10:6" },
  ],
};

// Which quiz items are used as in-lesson checks (hand-picked: simple kinds, each id in one lesson only).
window.KODSHIM_LEVELS[5].checks = {
  // The tamid, its nesachim, and the musafim
  "L5-01": ["L5-Q01", "L5-Q27", "L5-Q30", "L5-Q32", "L5-Q33", "L5-Q16", "L5-Q17"],
  // Communal chatot and the goats of Yom Kippur
  "L5-02": ["L5-Q03", "L5-Q35", "L5-Q36", "L5-Q38", "L5-Q39", "L5-Q06", "L5-Q40"],
  // Grain and bread of the tzibur
  "L5-03": ["L5-Q07", "L5-Q43", "L5-Q08", "L5-Q41", "L5-Q09", "L5-Q46", "L5-Q47"],
  // Menachot: types, ingredients, and kemitzah
  "L5-04": ["L5-Q59", "L5-Q60", "L5-Q12", "L5-Q62", "L5-Q63", "L5-Q14", "L5-Q64"],
  // Korban pesach and the festival offerings
  "L5-05": ["L5-Q18", "L5-Q50", "L5-Q20", "L5-Q19", "L5-Q21", "L5-Q54", "L5-Q55"],
  // Kodashim kalim: bechor, maaser behemah, and todah
  "L5-06": ["L5-Q23", "L5-Q24", "L5-Q67", "L5-Q25", "L5-Q72", "L5-Q75", "L5-Q77"],
};
