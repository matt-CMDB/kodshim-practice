#!/usr/bin/env python3
"""Split kodshim-practice.csv into one JSON file per level, with the Hebrew
source citations normalized to the English cite strings used in the app
(e.g. "הל׳ מעשה הקרבנות א:יד" -> "Maaseh HaKorbanot 1:14").

Usage: python3 tools/csv_to_levels.py [out_dir]
"""
import csv, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
CSV = os.path.join(ROOT, "kodshim-practice.csv")

# Hebrew hilchot / sefer names -> English cite prefix.
BOOKS = {
    "מעשה הקרבנות": "Maaseh HaKorbanot",
    "תמידין ומוספין": "Temidin uMusafin",
    "מחוסרי כפרה": "Mechusrei Kapparah",
    "שגגות": "Shegagot",
    "קרבן פסח": "Korban Pesach",
    "חגיגה": "Chagigah",
    "בכורות": "Bechorot",
    "נזירות": "Nezirut",
    "סוטה": "Sotah",
    "עבודת יום הכיפורים": "Avodat Yom HaKippurim",
    "פסולי המוקדשין": "Pesulei HaMukdashin",
    "מעילה": "Meilah",
    "ביאת המקדש": "Biat HaMikdash",
    "איסורי ביאה": "Issurei Biah",
    "קרבן שלמים": "Maaseh HaKorbanot",  # no such hilchot; shelamim live in Maaseh HaKorbanot
    "ויקרא": "Vayikra",
    "במדבר": "Bamidbar",
    "דברים": "Devarim",
    "שמות": "Shemot",
    "תהלים": "Tehillim",
}

GEMATRIA = {
    "א": 1, "ב": 2, "ג": 3, "ד": 4, "ה": 5, "ו": 6, "ז": 7, "ח": 8, "ט": 9,
    "י": 10, "כ": 20, "ל": 30, "מ": 40, "נ": 50, "ס": 60, "ע": 70, "פ": 80, "צ": 90,
    "ק": 100, "ר": 200, "ש": 300, "ת": 400,
}


def heb_num(s):
    s = s.replace("״", "").replace("'", "").replace("׳", "").replace('"', "").strip()
    if not s:
        return None
    if s.isdigit():
        return int(s)
    total = 0
    for ch in s:
        if ch not in GEMATRIA:
            return None
        total += GEMATRIA[ch]
    return total


def norm_ref(ref):
    """'א:יד' -> '1:14'; 'י:ו-ז' -> '10:6-7'; 'א-ז' -> '1-7'; 'ג' -> '3'."""
    ref = ref.strip()
    if not ref:
        return ""
    if ":" in ref:
        ch, vs = ref.split(":", 1)
        c = heb_num(ch)
        parts = [heb_num(p) for p in vs.split("-")]
        if c is None or any(p is None for p in parts):
            return ref
        return f"{c}:" + "-".join(str(p) for p in parts)
    parts = [heb_num(p) for p in ref.split("-")]
    if any(p is None for p in parts):
        return ref
    return "-".join(str(p) for p in parts)


def norm_cite(raw):
    """Return a list of normalized cite strings (a cell may hold several)."""
    raw = (raw or "").strip()
    if not raw:
        return []
    out = []
    for piece in re.split(r"[;،]", raw):
        piece = piece.strip().rstrip(".")
        if not piece:
            continue
        piece = re.sub(r"^הל['׳]\s*", "", piece)
        matched = False
        for he, en in sorted(BOOKS.items(), key=lambda kv: -len(kv[0])):
            if piece.startswith(he):
                ref = piece[len(he):].strip()
                out.append((en + " " + norm_ref(ref)).strip())
                matched = True
                break
        if not matched:
            # Garbage from a mis-quoted CSV cell; keep only if it looks like a cite.
            if re.search(r"[א-ת]+\s+[א-ת]+:[א-ת]+", piece):
                out.append(piece)
    return out


def main():
    out_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "tools", "levels-json")
    os.makedirs(out_dir, exist_ok=True)
    with open(CSV, encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    levels = {}
    counters = {}
    for r in rows:
        lvl = int(r["level"])
        counters[lvl] = counters.get(lvl, 0) + 1
        item = {
            "id": f"L{lvl}-C{counters[lvl]:02d}",
            "q": r["question-english"].strip(),
            "a": r["answer-english"].strip(),
            "qHe": r["question-hebrew"].strip(),
            "aHe": r["answer-hebrew"].strip(),
            "tanach": norm_cite(r["biblical-source"]),
            "rambam": norm_cite(r["mishnah-torah-source"]),
        }
        levels.setdefault(lvl, {"num": lvl, "name": r["level-name"].strip(), "concepts": []})
        levels[lvl]["concepts"].append(item)
    for lvl, data in levels.items():
        path = os.path.join(out_dir, f"level-{lvl}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"level {lvl}: {len(data['concepts'])} concepts -> {path}")


if __name__ == "__main__":
    main()
