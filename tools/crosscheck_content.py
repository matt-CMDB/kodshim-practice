#!/usr/bin/env python3
"""Second-opinion review of the quiz banks and lessons with a different model
via OpenRouter. Sends one level per request and asks for a short list of
factual problems (against the CSV rows, which are included as ground truth)
and quality problems (ambiguous prompts, two defensible answers, weak
distractors). Writes tools/crosscheck-level-N.md.

Usage: python3 tools/crosscheck_content.py [--model openai/gpt-6-sol] [levels...]
"""
import json, os, re, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
MODEL = "openai/gpt-6-sol"
args = sys.argv[1:]
if "--model" in args:
    i = args.index("--model"); MODEL = args[i + 1]; del args[i:i + 2]
LEVELS = [int(a) for a in args] or [1, 2, 3, 4, 5]

SYSTEM = (
    "You are a meticulous reviewer of Torah-study materials about korbanot (Temple offerings), "
    "working from the Rambam's Mishneh Torah. You will receive (1) GROUND TRUTH: the question/answer "
    "rows of a curriculum level, and (2) the game content built from them: lessons and quiz items. "
    "Your job: find problems. Report ONLY real issues, each on its own line, prefixed by the item id "
    "(e.g. L3-Q07, L3-01) and a severity tag [FACT] for a factual/halachic error or a claim that "
    "contradicts the ground truth or well-established halacha, [AMBIG] for a quiz item with more than "
    "one defensible answer or a misleading prompt, [DISTRACTOR] for an implausible or accidentally-"
    "correct distractor, [HEBREW] for a misspelled or mis-pointed Hebrew term, [STYLE] only for "
    "something that would confuse a learner. Be concrete: say what is wrong and what it should be. "
    "If the ground truth itself looks wrong, say so with [GROUND]. If nothing is wrong, say 'No issues.' "
    "Do not praise, do not summarize, do not restate the content."
)


def load_level_js(n):
    path = os.path.join(ROOT, "web-app", "content", f"level-{n}.js")
    src = open(path, encoding="utf-8").read()
    # Evaluate with node to get JSON.
    import subprocess
    js = "const w={KODSHIM_LEVELS:{}}; new Function('window', process.argv[1])(w); console.log(JSON.stringify(Object.values(w.KODSHIM_LEVELS)[0]));"
    out = subprocess.run(["node", "-e", js, src], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def compact(L):
    lessons = []
    for ls in L.get("lessons") or []:
        lessons.append({"id": ls["id"], "title": ls["title"], "intro": ls["intro"], "blocks": ls["blocks"]})
    quiz = []
    for q in L["quiz"]:
        q2 = {k: v for k, v in q.items() if k != "cite"}
        q2["cite"] = q.get("cite")
        quiz.append(q2)
    return {"lessons": lessons, "quiz": quiz}


def call(system, user):
    body = {"model": MODEL, "max_tokens": 2500, "temperature": 0.1,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}
    req = urllib.request.Request("https://openrouter.ai/api/v1/chat/completions", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json", "X-Title": "Kodshim Training"})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                d = json.load(r)
            return d["choices"][0]["message"]["content"], d.get("usage", {})
        except Exception:  # noqa: BLE001
            if attempt == 3:
                raise
            time.sleep(3 * (attempt + 1))


def main():
    tot_in = tot_out = 0
    for n in LEVELS:
        L = load_level_js(n)
        rows = json.load(open(os.path.join(HERE, "levels-json", f"level-{n}.json"), encoding="utf-8"))["concepts"]
        gt = "\n".join(f"{r['id']}: Q: {r['q']} | A: {r['a']} | cites: {', '.join(r['tanach'] + r['rambam'])}" for r in rows)
        content = json.dumps(compact(L), ensure_ascii=False)
        user = f"LEVEL {n}: {L['name']}\n\nGROUND TRUTH ROWS:\n{gt}\n\nGAME CONTENT (JSON):\n{content}"
        text, usage = call(SYSTEM, user)
        tot_in += usage.get("prompt_tokens", 0); tot_out += usage.get("completion_tokens", 0)
        out = os.path.join(HERE, f"crosscheck-level-{n}.md")
        with open(out, "w", encoding="utf-8") as f:
            f.write(f"# Cross-check of level {n} by {MODEL}\n\n{text}\n")
        print(f"level {n}: {len(text)} chars -> {out}")
    print(f"tokens in={tot_in} out={tot_out}")


if __name__ == "__main__":
    main()
