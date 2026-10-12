#!/usr/bin/env python3
"""Порождает дела `.lawcase` и вопросы пакета-дела `examples/familie-weimar/`.

Дела — те же факты, что в сценариях `tests/` (построитель `cases.py`), в форме
§168.4: символы канона квалифицированы именем пакета. Все дела пользуются
ОДНИМИ идентификаторами домохозяйства и лиц, поэтому один файл вопроса
годится для каждого дела. Ожидания лежат в `examples/familie-weimar/check.py`
и взяты из PDF BMWSB и текста закона, а не из ответа движка.

    python3 corpus/laws/de/wohngeld/tools/build_example.py
"""
from __future__ import annotations

import json
import re
import sys
from decimal import Decimal as D
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from cases import Case, Member  # noqa: E402

EXAMPLE = Path(__file__).resolve().parents[1] / "examples" / "familie-weimar"
PACKAGE = "examples.de.wohngeld.familie_weimar"
NAMESPACE = "urn:law:examples:de:wohngeld:familie-weimar"
W = "de.social.wohngeld::"
ENUMS = ("MIETZUSCHUSS", "MIETVERHAELTNIS", "KEIN_AUSLAENDER", "KEINE", "JA", "NEIN",
         "EHEGATTE_NICHT_DAUERND_GETRENNT", "VERWANDT_ODER_VERSCHWAEGERT", "NR1_GRUNDSICHERUNGSGELD_SGB2")
CID = "familie-weimar"
HAUSHALT = f"urn:de:example:wohngeld:{CID}:haushalt"


def familie(date: str, missbrauch: str | None = "nein") -> Case:
    ehe, verw = "EHEGATTE_NICHT_DAUERND_GETRENNT", "VERWANDT_ODER_VERSCHWAEGERT"
    return Case(CID, date, "Thüringen", "Weimar, Stadt", D(580), [
        Member("ehefrau", lohn=D(2240), abzug16=("NEIN", "JA", "JA")),
        Member("ehemann", beziehung=("ehefrau", ehe)),
        Member("kind1", beziehung=("ehefrau", verw), kind_von=("ehefrau", "ehemann"), alter=10, kindergeld=True),
        Member("kind2", beziehung=("ehefrau", verw), kind_von=("ehefrau", "ehemann"), alter=6, kindergeld=True),
    ], missbrauch=missbrauch)


def buergergeld(date: str) -> Case:
    return Case(CID, date, "Thüringen", "Weimar, Stadt", D(500), [
        Member("ehefrau", leistung7=("NR1_GRUNDSICHERUNGSGELD_SGB2", "JA", "NEIN", "NEIN", "NEIN"),
               abzug16=None, einkommen_vollstaendig=False)])


CASES = (
    ("Familie2025", "familie-2025-01-01.lawcase", familie("2025-01-01"),
     "BMWSB «Beispiele für die Berechnung des Wohngelds», Stand 1. Januar 2025, Rechenbeispiel 7:\n"
     "Ehepaar mit zwei Kindern, Weimar (Mietenstufe III), брутто 2 240 € в месяц (× 12), Bruttokaltmiete 580 €.\n"
     "Возраст детей в PDF не указан (10 и 6 лет — факт дела, на сумму не влияет). Орган злоупотребления не установил."),
    ("Familie20241231", "familie-2024-12-31.lawcase", familie("2024-12-31"),
     "Те же факты на последний день редакции Wohngeld-Plus-Gesetz (Anlagen 2, 3 BGBl. I 2022 S. 2160;\n"
     "Anlage 1 1. WoGFV). § 44 Abs. 1 WoGG: новые величины действуют только с 01.01.2025."),
    ("FamilieOhneWuerdigung", "familie-ohne-wuerdigung.lawcase", familie("2025-01-01", missbrauch=None),
     "Та же семья на 01.01.2025, но Wohngeldbehörde ещё не оценила § 21 Nr. 3 («missbräuchlich»)."),
    ("AlleinGrundsicherung", "allein-grundsicherung.lawcase", buergergeld("2025-03-01"),
     "Одинокое лицо получает трансфер по SGB II (Bürgergeld; с 01.07.2026 — Grundsicherungsgeld) с учётом\n"
     "Kosten der Unterkunft: § 7 Abs. 1 S. 1 Nr. 1 — исключение, § 21 Nr. 2 — права нет."),
)


def qualify(literal: str) -> str:
    negated = literal.startswith("not ")
    body = literal[4:] if negated else literal
    if not body.startswith("de."):
        body = W + body
    body = re.sub(r"\b(" + "|".join(ENUMS) + r")\b", lambda m: W + m.group(1), body)
    return ("not " if negated else "") + body


def render(name: str, case: Case, comment: str) -> str:
    lines = [f'language "law.core" version "0.2";', f"package {PACKAGE} version \"0.1.0\";",
             f'namespace "{NAMESPACE}";', ""]
    lines += [f"// {line}" for line in comment.split("\n")]
    lines += [f"case {name} {{", "    context {", f"        legal_time @{case.date};",
              "        knowledge_time @2026-09-15T09:00:00Z;", "        decision_time @2026-09-15T09:00:00Z;",
              '        timezone "Europe/Berlin";', "    }", ""]
    for aid, literal, origin in case.assertions():
        lines.append(f'    assert "{aid}": {qualify(literal)} {{ origin {origin}; }}')
    lines.append("}")
    return "\n".join(lines) + "\n"


def query(qid: str, predicate: str, args: list[dict]) -> dict:
    return {"queryId": qid, "kind": "truth",
            "literal": {"kind": "literal", "polarity": "positive",
                        "predicate": f"urn:de:social:clir:wohngeld#{predicate}", "args": args}}


def money(value: str) -> dict:
    return {"kind": "value", "type": {"name": "urn:law:std#Money"}, "value": value, "currency": "EUR"}


def main() -> int:
    (EXAMPLE / "cases").mkdir(parents=True, exist_ok=True)
    (EXAMPLE / "queries").mkdir(parents=True, exist_ok=True)
    for name, file, case, comment in CASES:
        (EXAMPLE / "cases" / file).write_text(render(name, case, comment), encoding="utf-8")
    h = {"kind": "entity_ref", "id": HAUSHALT}
    queries = {
        "einkommen-1710": query("einkommen-1710", "monatliches_gesamteinkommen", [h, money("1710.00")]),
        "miete-777-80": query("miete-777-80", "zu_beruecksichtigende_miete", [h, money("777.80")]),
        "wohngeld-485": query("wohngeld-485", "wohngeld_monatlich", [h, money("485")]),
        "wohngeld-463": query("wohngeld-463", "wohngeld_monatlich", [h, money("463")]),
        "anspruch-485": query("anspruch-485", "wohngeldanspruch", [h, money("485")]),
        "kein-anspruch-alle-ausgeschlossen": query(
            "kein-anspruch-alle-ausgeschlossen", "kein_wohngeldanspruch",
            [h, {"kind": "const_ref", "id": "urn:de:social:clir:wohngeld#ALLE_AUSGESCHLOSSEN_21_NR2"}]),
    }
    for qid, document in queries.items():
        (EXAMPLE / "queries" / f"{qid}.json").write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n",
                                                        encoding="utf-8")
    print(f"examples/familie-weimar: {len(CASES)} дела, {len(queries)} вопросов")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
