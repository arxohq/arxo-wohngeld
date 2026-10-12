"""Мутационная чувствительность в ИЗОЛИРОВАННОЙ копии трёх пакетов (дерево не трогается).
Для каждой мутации: копия → правка → lock/lower в отдельный каталог CLIR → связанный мир →
`law-cli test` по сценариям из дерева. Мутация «убита», если хотя бы один сценарий падает."""
import json, os, re, shutil, subprocess, sys, tempfile
# Запуск: .venv-work-profile/bin/python corpus/laws/de/wohngeld/tools/mutate.py [M1 M4 …]
from pathlib import Path
R = str(Path(__file__).resolve().parents[5])
WORK = tempfile.mkdtemp(prefix="wohngeld-mutations-")  # вне дерева репозитория
L = R + "/engines/lawc/target/gate/law-cli"
PKG = {"estg": "income-for-wohngeld", "wogv": "wohngeld-verordnung", "wogg": "wohngeld"}
OUT = {"estg": "de-income-for-wohngeld.lawir.json", "wogv": "de-wohngeld-verordnung.lawir.json", "wogg": "de-wohngeld.lawir.json"}
T = R + "/corpus/laws/de/wohngeld/tests/"

MUTATIONS = [
    ("M1 коэффициент формулы 1,15 → 1,16", "wogg", "anlagen/FormelFaktor.lawparam.json", '"value": "1.15"', '"value": "1.16"',
     ["bmwsb-2025.lawtest", "grenzen.lawtest"]),
    ("M2 округление Anlage 3 Nr. 3 HALF_UP → FLOOR (всегда abrunden)", "wogg", "40-hoehe.law",
     'then wohngeld_monatlich(h, 1.00 EUR * round(z4, 0, "HALF_UP"));', 'then wohngeld_monatlich(h, 1.00 EUR * round(z4, 0, "FLOOR"));',
     ["grenzen.lawtest"]),
    ("M2b шаги z1…z4: десять знаков → два", "wogg", "40-hoehe.law",
     'let z2: Decimal = round(z1 * y, 10, "HALF_UP");', 'let z2: Decimal = round(z1 * y, 2, "HALF_UP");',
     ["grenzen.lawtest"]),
    ("M3 Arbeitnehmer-Pauschbetrag 1 230 → 1 200", "estg", "pauschbetraege/ArbeitnehmerPauschbetrag.lawparam.json", '"value": "1230"', '"value": "1200"',
     ["bmwsb-2025.lawtest"]),
    ("M4 выбор редакции: значения b (4 члена) 2025 года с 01.02.2025 вместо 01.01.2025", "wogg", "anlagen/WertBMitglieder4.lawparam.json",
     '2025-01-01', '2025-02-01', ["redaktionen.lawtest"]),
    ("M5 порог Höchstbetrag: потолок + 1 цент", "wogg", "20-miete.law",
     "then zu_beruecksichtigende_miete(h, anteil(min(m, hk) + e, n, gesamt));",
     "then zu_beruecksichtigende_miete(h, anteil(min(m, hk + 0.01 EUR) + e, n, gesamt));", ["grenzen.lawtest"]),
    ("M6 порог § 21 Nr. 1: < 10 → <= 10", "wogg", "50-anspruch.law", "when wohngeld_monatlich(h, w) and w < 10 EUR;",
     "when wohngeld_monatlich(h, w) and w <= 10 EUR;", ["grenzen.lawtest"]),
    ("M7 исключение § 7 без условия Kosten der Unterkunft", "wogg", "10-haushalt.law",
     "when leistungsbezug_7(x, art, NEIN, NEIN, NEIN, NEIN) and ausschliessende_leistung(art);\n    then nicht_vom_wohngeld_ausgeschlossen(x);",
     "when leistungsbezug_7(x, art, NEIN, NEIN, NEIN, NEIN) and ausschliessende_leistung(art);\n    then vom_wohngeld_ausgeschlossen(x);",
     ["ausschluss-und-urteil.lawtest"]),
    ("M8 Freibetrag § 17 Nr. 4: предел 1 200 → 1 300", "wogg", "30-einkommen.law", "min(sum(collect all v: Money, t: Einnahmeart where erwerbseinnahme(k, t, v)), 1200 EUR)",
     "min(sum(collect all v: Money, t: Einnahmeart where erwerbseinnahme(k, t, v)), 1300 EUR)", ["freibetraege.lawtest"]),
]

def build(root, clir):
    os.makedirs(clir, exist_ok=True)
    run = lambda *a: subprocess.run(a, capture_output=True, text=True, cwd=root)
    for key in ("estg", "wogv"):
        d = f"{root}/corpus/laws/de/{PKG[key]}"
        run(L, "lock", d, "--write"); o = run(L, "lower", d)
        if o.returncode: return o.stderr
        open(f"{clir}/{OUT[key]}", "w").write(o.stdout)
    d = f"{root}/corpus/laws/de/wohngeld"
    run(L, "lock", d, "--clir", clir, "--write")
    ctx = run(L, "imports-context", d, "--clir", clir); open(clir + "/ctx.json", "w").write(ctx.stdout)
    o = run(L, "lower", d, "--imports", clir + "/ctx.json")
    if o.returncode: return o.stderr
    open(f"{clir}/{OUT['wogg']}", "w").write(o.stdout)
    return None

def world(clir, tmp):
    state = {"format": "law.work-profile-run/1", "root": R, "clir": clir,
             "test_roots": ["corpus/laws/de/wohngeld"], "legacy_modules": [], "legacy_aliases": {}}
    json.dump(state, open(tmp + "/state.json", "w"))
    code = ("import json,sys; sys.path.insert(0,%r); sys.path.insert(0,%r)\n"
            "from corpus.lawtests.world import build_world, import_context\n"
            "p=['de.social.wohngeld','de.social.wohngeld_verordnung','de.tax.income_for_wohngeld']\n"
            "json.dump(build_world(p,'link'),open(%r,'w'),ensure_ascii=False); json.dump(import_context(p),open(%r,'w'))") % (R, R + "/engines/lawref", tmp + "/world.json", tmp + "/wctx.json")
    env = dict(os.environ, LAW_WORK_PROFILE_STATE=tmp + "/state.json")
    subprocess.run([R + "/.venv-work-profile/bin/python", "-c", code], env=env, check=True, cwd=R)

def main():
    only = sys.argv[1:]
    report = []
    for name, key, rel, old, new, suites in MUTATIONS:
        if only and not any(name.startswith(o) for o in only): continue
        tmp = tempfile.mkdtemp(dir=WORK)
        root = tmp + "/root"
        for p in PKG.values():
            shutil.copytree(f"{R}/corpus/laws/de/{p}", f"{root}/corpus/laws/de/{p}")
        f = f"{root}/corpus/laws/de/{PKG[key]}/{rel}"
        text = open(f).read()
        if text.count(old) < 1:
            report.append((name, "МУТАЦИЯ НЕ ПРИМЕНЕНА: образец не найден")); print(report[-1], flush=True); continue
        open(f, "w").write(text.replace(old, new))
        err = build(root, tmp + "/clir")
        if err:
            report.append((name, "сборка отвергла мутацию: " + err[:200])); print(report[-1], flush=True); continue
        world(tmp + "/clir", tmp)
        json.dump([T + s for s in suites], open(tmp + "/list.json", "w"))
        o = subprocess.run([L, "test", tmp + "/list.json", "--lawtest-list", "--program", tmp + "/world.json", "--imports", tmp + "/wctx.json"], capture_output=True, text=True, cwd=R)
        fails = [l for l in o.stdout.splitlines() if l.startswith("test FAIL")]
        summary = [l for l in o.stdout.splitlines() if l.startswith("lawc test:")]
        report.append((name, f"{'УБИТА' if fails else 'ВЫЖИЛА'}: {summary[-1] if summary else o.stderr[:200]}; падают: " + "; ".join(x[11:90] for x in fails[:4])))
        print(report[-1][0], "→", report[-1][1], flush=True)
    json.dump(report, open(WORK + "/report.json", "w"), ensure_ascii=False, indent=1)
    print("отчёт:", WORK + "/report.json")

main()
