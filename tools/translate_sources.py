#!/usr/bin/env python3
"""Fill tools/translations.json with English renderings of every cited
passage that has Hebrew text but no translation yet. Uses OpenRouter
(credentials are injected by the session proxy; nothing is stored here).

Usage: python3 tools/translate_sources.py [--model anthropic/claude-sonnet-5.5] [--dry-run]
Re-runs are free: anything already in translations.json is skipped.
"""
import json, os, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import build_sources as bs  # noqa: E402

TRANS = bs.TRANS
MODEL = "anthropic/claude-sonnet-5.5"
for i, a in enumerate(sys.argv):
    if a == "--model":
        MODEL = sys.argv[i + 1]
DRY = "--dry-run" in sys.argv

SYSTEM = (
    "You translate passages of the Rambam's Mishneh Torah and of Tanach into clear, faithful "
    "English for Torah students. Keep halachic terms as transliterations the first time with a "
    "gloss in parentheses when helpful (olah, chatat, asham, shelamim, mincha, kohen, tahor, "
    "tzibur, yachid, kodshei kodashim, kodashim kalim). Transliteration style: korban, chatat, "
    "shelamim, kohen. Write 'Hashem' for the divine name. Do not add commentary, headings, or "
    "notes. Return only the translation text."
)


def call(he, cite):
    body = {
        "model": MODEL,
        "max_tokens": 700,
        "temperature": 0.2,
        "messages": [
            {"role": "system", "content": SYSTEM},
            {"role": "user", "content": f"Passage ({cite}):\n\n{he}"},
        ],
    }
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "HTTP-Referer": "https://github.com/matt-CMDB/kodshim-practice", "X-Title": "Kodshim Training"},
    )
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                d = json.load(r)
            return d["choices"][0]["message"]["content"].strip(), d.get("usage", {})
        except Exception as e:  # noqa: BLE001
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)


def main():
    trans = {}
    if os.path.exists(TRANS):
        with open(TRANS, encoding="utf-8") as f:
            trans = json.load(f)
    todo = []
    for cite in bs.collect_cites():
        e = bs.fetch(cite)
        if e and "he" in e and cite not in trans:
            todo.append((cite, e["he"]))
    print(f"{len(todo)} passages to translate with {MODEL}")
    if DRY:
        for c, he in todo:
            print(c, len(he))
        return
    tot_in = tot_out = 0
    for i, (cite, he) in enumerate(todo, 1):
        en, usage = call(he, cite)
        trans[cite] = en
        tot_in += usage.get("prompt_tokens", 0)
        tot_out += usage.get("completion_tokens", 0)
        with open(TRANS, "w", encoding="utf-8") as f:
            json.dump(trans, f, ensure_ascii=False, indent=1, sort_keys=True)
        print(f"[{i}/{len(todo)}] {cite}: {len(en)} chars")
    print(f"tokens in={tot_in} out={tot_out}")


if __name__ == "__main__":
    main()
