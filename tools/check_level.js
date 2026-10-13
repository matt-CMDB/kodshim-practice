#!/usr/bin/env node
// Validate a web-app/content/level-N.js file against docs/CONTENT-SCHEMA.md.
// Usage: node tools/check_level.js web-app/content/level-2.js
const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) { console.error("usage: check_level.js <level-file.js>"); process.exit(2); }

const window = { KODSHIM_LEVELS: {} };
const src = fs.readFileSync(file, "utf8");
try {
  new Function("window", src)(window);
} catch (e) {
  console.error("SYNTAX/RUNTIME ERROR:", e.message);
  process.exit(1);
}
const nums = Object.keys(window.KODSHIM_LEVELS);
if (nums.length !== 1) { console.error("expected exactly one level, got", nums); process.exit(1); }
const L = window.KODSHIM_LEVELS[nums[0]];
const errs = [], warns = [];
const err = (m) => errs.push(m);
const warn = (m) => warns.push(m);
const isStr = (s) => typeof s === "string" && s.trim().length > 0;

for (const k of ["num", "name", "he", "tagline", "summary", "lessons", "concepts", "quiz"]) {
  if (L[k] === undefined) err(`missing top-level field ${k}`);
}
if (!Array.isArray(L.summary) || !L.summary.every(isStr)) err("summary must be an array of strings");

const BLOCK_TYPES = ["cards", "table", "compare", "callout", "steps", "list", "terms", "figure", "cast"];
const assetsDir = path.join(path.dirname(file), "..", "assets");
(L.lessons || []).forEach((ls, i) => {
  const tag = `lesson[${i}] ${ls.id || ""}`;
  if (!isStr(ls.id) || !isStr(ls.title)) err(`${tag}: id/title required`);
  if (!Array.isArray(ls.intro) || !ls.intro.every(isStr)) err(`${tag}: intro must be string[]`);
  if (!Array.isArray(ls.sources)) err(`${tag}: sources must be an array`);
  if (!Array.isArray(ls.blocks) || ls.blocks.length < 1) err(`${tag}: needs blocks`);
  (ls.blocks || []).forEach((b, j) => {
    const bt = `${tag} block[${j}]`;
    if (!BLOCK_TYPES.includes(b.type)) { err(`${bt}: unknown type ${b.type}`); return; }
    if (b.type === "cards" && !(Array.isArray(b.items) && b.items.every((it) => isStr(it.he)))) err(`${bt}: cards need items[].he`);
    if (b.type === "table" && !(Array.isArray(b.cols) && Array.isArray(b.rows) && b.rows.every((r) => r.length === b.cols.length))) err(`${bt}: table rows must match cols length`);
    if (b.type === "compare" && !(b.left && b.right && Array.isArray(b.left.items) && Array.isArray(b.right.items))) err(`${bt}: compare needs left/right items`);
    if (b.type === "callout" && !isStr(b.text)) err(`${bt}: callout needs text`);
    if (b.type === "steps" && !(Array.isArray(b.items) && b.items.every((it) => isStr(it.title) && isStr(it.text)))) err(`${bt}: steps need items[].title/text`);
    if (b.type === "list" && !(Array.isArray(b.items) && b.items.every(isStr))) err(`${bt}: list needs string items`);
    if (b.type === "terms" && !(Array.isArray(b.items) && b.items.every((it) => isStr(it.he)))) err(`${bt}: terms need items[].he`);
    if (b.type === "cast") {
      if (!Array.isArray(b.items) || !b.items.every((it) => isStr(it.src))) err(`${bt}: cast needs items[].src`);
      else b.items.forEach((it) => { if (!fs.existsSync(path.join(assetsDir, "..", it.src))) err(`${bt}: asset not found ${it.src}`); });
    }
    if (b.type === "figure") {
      if (!isStr(b.src)) err(`${bt}: figure needs src`);
      else if (!fs.existsSync(path.join(assetsDir, "..", b.src))) err(`${bt}: asset not found ${b.src}`);
    }
  });
});

(L.concepts || []).forEach((c, i) => {
  if (!isStr(c.id) || !isStr(c.q) || !isStr(c.a)) err(`concept[${i}]: id/q/a required`);
});

const kinds = {};
const ids = new Set();
(L.quiz || []).forEach((q, i) => {
  const tag = `quiz[${i}] ${q.id || ""}`;
  if (!isStr(q.id)) err(`${tag}: id required`);
  if (ids.has(q.id)) err(`${tag}: duplicate id`);
  ids.add(q.id);
  if (!isStr(q.prompt)) err(`${tag}: prompt required`);
  if (!isStr(q.explain)) err(`${tag}: explain required`);
  if (q.cite !== null && q.cite !== undefined && !isStr(q.cite)) err(`${tag}: cite must be string or null`);
  kinds[q.kind] = (kinds[q.kind] || 0) + 1;
  switch (q.kind) {
    case "pic":
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4) err(`${tag}: pic needs 3-4 options`);
      (q.options || []).forEach((o) => { if (!o || !isStr(o.img)) err(`${tag}: pic option needs img`); else if (!fs.existsSync(path.join(assetsDir, "..", o.img))) err(`${tag}: asset not found ${o.img}`); });
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) err(`${tag}: answer index out of range`);
      break;
    case "mc": case "tap": case "cloze":
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 5) err(`${tag}: 3-5 options`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) err(`${tag}: answer index out of range`);
      if (Array.isArray(q.options) && new Set(q.options).size !== q.options.length) err(`${tag}: duplicate options`);
      if (q.kind === "cloze" && !/_{3,}/.test(q.prompt)) err(`${tag}: cloze prompt needs a ____ blank`);
      break;
    case "match":
      if (!Array.isArray(q.pairs) || q.pairs.length < 3 || q.pairs.length > 5) err(`${tag}: 3-5 pairs`);
      (q.pairs || []).forEach((p) => { if (!isStr(p.hebrew) || !isStr(p.english)) err(`${tag}: pair needs hebrew/english`); });
      break;
    case "sort": {
      if (!Array.isArray(q.buckets) || q.buckets.length < 2 || q.buckets.length > 3) err(`${tag}: 2-3 buckets`);
      const bids = new Set((q.buckets || []).map((b) => b.id));
      if (!Array.isArray(q.items) || q.items.length < 3 || q.items.length > 7) err(`${tag}: 3-7 items`);
      (q.items || []).forEach((it) => { if (!bids.has(it.bucket)) err(`${tag}: item ${it.hebrew} has unknown bucket ${it.bucket}`); if (!isStr(it.hebrew)) err(`${tag}: item needs hebrew`); });
      break;
    }
    case "tf":
      if (typeof q.answer !== "boolean") err(`${tag}: tf answer must be boolean`);
      break;
    default:
      err(`${tag}: unknown kind ${q.kind}`);
  }
});

// checks map: every id must exist, every lesson should have some
if (L.checks) {
  const qids = new Set((L.quiz || []).map((q) => q.id));
  Object.entries(L.checks).forEach(([lid, ids]) => {
    if (!(L.lessons || []).some((ls) => ls.id === lid)) err(`checks: unknown lesson ${lid}`);
    ids.forEach((id) => { if (!qids.has(id)) err(`checks: unknown quiz id ${id} in ${lid}`); });
  });
  (L.lessons || []).forEach((ls) => { if (!L.checks[ls.id] || !L.checks[ls.id].length) warn(`lesson ${ls.id} has no checks`); });
} else if (L.lessons) warn("no checks map");
const n = (L.quiz || []).length;
if (n < 16) warn(`only ${n} quiz items (want 18-24)`);
const tfs = (L.quiz || []).filter((q) => q.kind === "tf");
const trues = tfs.filter((q) => q.answer === true).length;
if (tfs.length >= 3 && (trues === 0 || trues === tfs.length)) warn("tf items are all the same answer");
const mcs = (L.quiz || []).filter((q) => ["mc", "tap", "cloze"].includes(q.kind));
const pos = {};
mcs.forEach((q) => { pos[q.answer] = (pos[q.answer] || 0) + 1; });
if (mcs.length >= 6 && Math.max(...Object.values(pos)) > mcs.length * 0.5) warn(`correct answer position skewed: ${JSON.stringify(pos)}`);

console.log(`level ${L.num} "${L.name}": ${(L.lessons || []).length} lessons, ${L.concepts.length} concepts, ${n} quiz items ${JSON.stringify(kinds)}`);
warns.forEach((w) => console.log("WARN:", w));
errs.forEach((e) => console.log("ERROR:", e));
process.exit(errs.length ? 1 : 0);
