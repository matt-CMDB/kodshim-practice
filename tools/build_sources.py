#!/usr/bin/env python3
"""Collect every citation used by the game content and emit
web-app/kodshim-sources.js with the Hebrew text (from source-material/) and
the English rendering (from tools/translations.json, filled by
translate_sources.py).

Cites come from:
  * tools/levels-json/level-N.json   (the CSV rows)
  * web-app/content/level-N.js       (lesson sources + quiz cites), if present

Usage: python3 tools/build_sources.py
"""
import glob, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "source-material")
OUT = os.path.join(ROOT, "web-app", "kodshim-sources.js")
TRANS = os.path.join(HERE, "translations.json")

FILES = {
    "Maaseh HaKorbanot": ("Mishneh Torah, Sacrificial Procedure - he - merged.json", "הלכות מעשה הקרבנות"),
    "Temidin uMusafin": ("Mishneh Torah, Daily Offerings and Additional Offerings - he - merged.json", "הלכות תמידין ומוספין"),
    "Mechusrei Kapparah": ("Mishneh Torah, Offerings for Those with Incomplete Atonement - he - merged.json", "הלכות מחוסרי כפרה"),
    "Shegagot": ("Mishneh Torah, Offerings for Unintentional Transgressions - he - merged.json", "הלכות שגגות"),
    "Korban Pesach": ("Mishneh Torah, Paschal Offering - he - merged.json", "הלכות קרבן פסח"),
    "Chagigah": ("Mishneh Torah, Festival Offering - he - merged.json", "הלכות חגיגה"),
    "Bechorot": ("Mishneh Torah, Firstlings - he - merged.json", "הלכות בכורות"),
    "Vayikra": ("Leviticus - he - Tanach with Ta'amei Hamikra.json", "ויקרא"),
}
HE_TITLES = {
    "Nezirut": "הלכות נזירות", "Sotah": "הלכות סוטה",
    "Avodat Yom HaKippurim": "הלכות עבודת יום הכיפורים",
    "Pesulei HaMukdashin": "הלכות פסולי המוקדשין", "Meilah": "הלכות מעילה",
    "Biat HaMikdash": "הלכות ביאת המקדש", "Issurei Biah": "הלכות איסורי ביאה",
    "Bamidbar": "במדבר", "Devarim": "דברים", "Shemot": "שמות", "Tehillim": "תהלים",
}
TANACH = {"Vayikra", "Bamidbar", "Devarim", "Shemot", "Tehillim"}

CITE_RE = re.compile(r"^([A-Za-z' ]+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?(?:-(\d+))?$")
_cache = {}


def load(book):
    if book not in _cache:
        fn = FILES[book][0]
        with open(os.path.join(SRC, fn), encoding="utf-8") as f:
            _cache[book] = json.load(f)["text"]
    return _cache[book]


def clean(s):
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("יְהוָ֑ה", "ה׳").replace("יהוָ֑ה", "ה׳")
    s = re.sub(r"[ְ-ׇֽֿׁׂׅ֑ׄ-֯]*יהוה[ְ-ֽ֑-֯]*", "ה׳", s)
    s = s.replace("לַֽה׳", "לַה׳").replace("לַה׳", "לַה׳")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def strip_teamim(s):
    """Tanach text carries cantillation; keep nikud, drop te'amim and meteg."""
    return re.sub(r"[֑-ֽ֯]", "", s)


def parse(cite):
    m = CITE_RE.match(cite.strip())
    if not m:
        return None
    book, ch, v1, v2, ch2 = m.groups()
    return book.strip(), int(ch), (int(v1) if v1 else None), (int(v2) if v2 else None), (int(ch2) if ch2 else None)


def fetch(cite):
    p = parse(cite)
    if not p:
        return None
    book, ch, v1, v2, ch2 = p
    entry = {"book": book, "heTitle": HE_TITLES.get(book) or FILES.get(book, (None, ""))[1], "ref": cite[len(book):].strip()}
    if book not in FILES or v1 is None:
        return entry  # no text available (book not in source-material, or chapter-only cite)
    text = load(book)
    try:
        chap = text[ch - 1]
        last = v2 or v1
        parts = [clean(chap[i - 1]) for i in range(v1, last + 1)]
    except IndexError:
        return entry
    if book in TANACH:
        parts = [strip_teamim(x) for x in parts]
    entry["he"] = " ".join(parts)
    return entry


def collect_cites():
    cites = set()
    for path in glob.glob(os.path.join(HERE, "levels-json", "level-*.json")):
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        for c in d["concepts"]:
            cites.update(c.get("tanach", []))
            cites.update(c.get("rambam", []))
    for path in glob.glob(os.path.join(ROOT, "web-app", "content", "level-*.js")):
        with open(path, encoding="utf-8") as f:
            js = f.read()
        for m in re.finditer(r'"((?:Maaseh HaKorbanot|Temidin uMusafin|Mechusrei Kapparah|Shegagot|Korban Pesach|Chagigah|Bechorot|Nezirut|Sotah|Avodat Yom HaKippurim|Pesulei HaMukdashin|Meilah|Biat HaMikdash|Issurei Biah|Vayikra|Bamidbar|Devarim|Shemot|Tehillim) \d+(?::\d+(?:-\d+)?)?)"', js):
            cites.add(m.group(1))
    return sorted(c for c in cites if parse(c))


def main():
    trans = {}
    if os.path.exists(TRANS):
        with open(TRANS, encoding="utf-8") as f:
            trans = json.load(f)
    out = {}
    missing_text, missing_en = [], []
    for cite in collect_cites():
        e = fetch(cite)
        if not e:
            continue
        if "he" not in e:
            missing_text.append(cite)
        if cite in trans:
            e["en"] = trans[cite]
        elif "he" in e:
            missing_en.append(cite)
        out[cite] = e
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// Generated by tools/build_sources.py — do not edit by hand.\n")
        f.write("// Hebrew from source-material/ (Sefaria exports); English from tools/translations.json.\n")
        f.write("window.KODSHIM_SOURCES = ")
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    print(f"{len(out)} cites -> {OUT}")
    print(f"{len(missing_text)} without Hebrew text (book not in source-material or chapter-only)")
    print(f"{len(missing_en)} with Hebrew but no English yet")
    if "--list-missing" in sys.argv:
        print("\n".join(missing_en))


if __name__ == "__main__":
    main()
