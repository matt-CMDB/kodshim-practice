// Assign each quiz item to the lesson it best matches (word overlap), print mapping.
const fs = require("fs");
const STOP = new Set("the a an of to and or in on for is are it its with by from as at be that this which what who when where how not no only one two three four five may must into than then — – - · , . ; : ? ! ( ) \" '".split(" "));
function words(s) { return (s || "").toLowerCase().replace(/[{}*]/g, " ").split(/[^a-z֐-׿'’]+/).filter(w => w.length > 2 && !STOP.has(w)); }
function blockText(b) {
  const parts = [b.title, b.caption, b.text];
  (b.items || []).forEach(it => parts.push(typeof it === "string" ? it : [it.he, it.tl, it.en, it.text, it.title, it.name, it.caption].join(" ")));
  (b.rows || []).forEach(r => parts.push(r.join(" ")));
  (b.cols || []).forEach(c => parts.push(c));
  if (b.left) parts.push(b.left.title, b.left.he, (b.left.items || []).join(" "));
  if (b.right) parts.push(b.right.title, b.right.he, (b.right.items || []).join(" "));
  return parts.filter(Boolean).join(" ");
}
for (const n of [2, 3, 4, 5]) {
  const w = { KODSHIM_LEVELS: {} };
  new Function("window", fs.readFileSync(`content/level-${n}.js`, "utf8"))(w);
  const L = w.KODSHIM_LEVELS[n];
  const lessonBags = L.lessons.map(ls => {
    const bag = new Map();
    words([ls.title, ls.dek, ...ls.intro, ...ls.blocks.map(blockText)].join(" ")).forEach(x => bag.set(x, (bag.get(x) || 0) + 1));
    return bag;
  });
  const df = new Map();
  lessonBags.forEach(bag => bag.forEach((_, k) => df.set(k, (df.get(k) || 0) + 1)));
  const map = {};
  L.lessons.forEach(ls => (map[ls.id] = []));
  const nL = L.lessons.length, nQ = L.quiz.length;
  L.quiz.forEach((q, qi) => {
    const qtext = [q.prompt, q.explain, ...(q.options || []), ...(q.pairs || []).map(p => p.hebrew + " " + p.english), ...(q.items || []).map(i => i.hebrew + " " + i.translit), ...(q.buckets || []).map(b => b.en + " " + b.he)].join(" ");
    const qw = new Set(words(qtext));
    let best = -1, bestScore = -1;
    lessonBags.forEach((bag, li) => {
      let s = 0;
      qw.forEach(x => { if (bag.has(x)) s += 1 / df.get(x); });
      // mild prior: items were written roughly in lesson order
      const expected = Math.floor(qi / nQ * nL);
      s += expected === li ? 0.35 : Math.abs(expected - li) === 1 ? 0.15 : 0;
      if (s > bestScore) { bestScore = s; best = li; }
    });
    map[L.lessons[best].id].push(q.id);
  });
  console.log(`// level ${n}`);
  console.log(JSON.stringify(map));
}
