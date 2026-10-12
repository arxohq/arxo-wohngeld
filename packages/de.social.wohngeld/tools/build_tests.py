#!/usr/bin/env python3
"""Порождает сценарии `tests/*.lawtest` пакета `de.social.wohngeld`.

Ожидания записаны ЗДЕСЬ руками, каждое со ссылкой на источник: PDF BMWSB
(`sources/bmwsb/rechenbeispiele-2023.txt`, `…-2025.txt`), текст закона или
модуль калькулятора. Скрипт не запускает движок и ответов его не читает.

    python3 corpus/laws/de/wohngeld/tools/build_tests.py
"""
from __future__ import annotations

import sys
from decimal import Decimal as D
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from cases import HEADER, NEITHER, TRUE, Case, Member, money, render_test  # noqa: E402

TESTS = Path(__file__).resolve().parents[1] / "tests"
NEIN3 = ("NEIN", "NEIN", "NEIN")


def kv():   # только Kranken- und Pflegeversicherung
    return ("NEIN", "JA", "NEIN")


def kv_rv():
    return ("NEIN", "JA", "JA")


def st_kv_rv():
    return ("JA", "JA", "JA")


EHE = "EHEGATTE_NICHT_DAUERND_GETRENNT"
VERW = "VERWANDT_ODER_VERSCHWAEGERT"
BUERGERGELD_MIT_KDU = ("NR1_GRUNDSICHERUNGSGELD_SGB2", "JA", "NEIN", "NEIN", "NEIN")


def rente(monat, anteil=D("0.8")):
    """Пенсия и облагаемая часть. BMWSB облагаемую часть не называет; доля 80 % — допущение
    дела. Результат от неё не зависит, пока облагаемая часть не меньше 8,50 € в месяц
    (§ 9a S. 2 EStG): вычет 102 € в год и § 14 Abs. 2 Nr. 3 WoGG вместе дают брутто − 102 €.
    Независимость проверяет сценарий с долей 50 % (пример 2025 № 1)."""
    return (D(monat), (D(monat) * anteil).quantize(D("0.01")))


def example(year: int, number: int, case: Case, place: str, w: int, y: str, m: str | None = None,
            hk: str | None = None, extra_comment: str = "", anspruch: bool = False, title_suffix: str = "") -> str:
    h = case.h()
    steps = [(f"truth(monatliches_gesamteinkommen({h}, {y} EUR))", TRUE)]
    if m is not None:
        steps.append((f"truth(zu_beruecksichtigende_miete({h}, {m} EUR))", TRUE))
    if hk is not None:
        steps.append((f"truth(hoechstbetrag_mit_klimakomponente({h}, {hk} EUR))", TRUE))
    steps.append((f"truth(wohngeld_monatlich({h}, {w} EUR))", TRUE))
    if anspruch:
        steps.append((f"truth(wohngeldanspruch({h}, {w} EUR))", TRUE + ["judgment_requests(0)"]))
    source = ("PDF BMWSB «Rechenbeispiele» 2023 (17. Februar 2023)" if year == 2023
              else "PDF BMWSB «Beispiele für die Berechnung des Wohngelds», Stand 1. Januar 2025")
    comment = f"{source}, Rechenbeispiel {number} (фрагмент BMWSB_{year}_BSP{number}). {extra_comment}"
    return render_test(case, f"BMWSB {year} Rechenbeispiel {number}: {place} — {w} EUR{title_suffix}", steps, comment)


def bmwsb_2025() -> list[str]:
    out = []
    date = "2025-01-01"
    c = Case("bmwsb-2025-01", date, "Brandenburg", "Jüterbog, Stadt", D(335), [
        Member("rentnerin", rente=rente(1300), abzug16=kv())])
    out.append(example(2025, 1, c, "alleinstehende Rentnerin, Jüterbog (Mietenstufe I)", 110, "1162.35", "445.40", "380.20",
                       "Rente 1 300,00 − 8,50 = 1 291,50; −10 % → 1 162,35; Miete 335,00 + 110,40 = 445,40; Höchstbetrag 361 + 19,20.", anspruch=True))
    c = Case("bmwsb-2025-01b", date, "Brandenburg", "Jüterbog, Stadt", D(335), [
        Member("rentnerin", rente=rente(1300, D("0.5")), abzug16=kv())])
    out.append(example(2025, 1, c, "dieselbe Rentnerin mit steuerpflichtigem Anteil 50 %", 110, "1162.35",
                       extra_comment="Та же сумма при другой облагаемой части: допущение 80 % в прочих сценариях на итог не влияет.",
                       title_suffix=" (Anteil 50 %)"))
    c = Case("bmwsb-2025-02", date, "Rheinland-Pfalz", "Ludwigshafen am Rhein, Stadt", D(470), [
        Member("alleinstehender", alg1=D(1350))])
    out.append(example(2025, 2, c, "Alleinstehender mit ALG I, Ludwigshafen am Rhein (Mietenstufe IV)", 88, "1350.00", "580.40", "530.20",
                       "ALG I 1 350,00 без вычетов (§ 14 Abs. 2 Nr. 6; «kein Arbeitnehmer-Pauschbetrag»); Miete 470,00 + 110,40."))
    c = Case("bmwsb-2025-03", date, "Sachsen", "Leipzig, Stadt", D(480), [
        Member("ehemann", rente=rente(1410), abzug16=kv(), gdb=100),
        Member("ehefrau", beziehung=("ehemann", EHE), rente=rente(540), abzug16=kv())])
    out.append(example(2025, 3, c, "Ehepaar mit Renten, Ehemann GdB 100, Leipzig (Mietenstufe II)", 166, "1589.70", "622.60", "517.80",
                       "1 231,35 + 478,35 − 150,00 (Freibetrag § 17 Nr. 1, 1 800 €/Jahr) = 1 589,70; Miete 480 + 142,60."))
    c = Case("bmwsb-2025-05", date, "Hessen", "Wiesbaden, Landeshaupstadt", D(700), [
        Member("mutter", lohn=D(1530), abzug16=kv_rv()),
        Member("kind9", beziehung=("mutter", VERW), kind_von=("mutter",), alter=9, kindergeld=True, uvg=D(348)),
        Member("kind13", beziehung=("mutter", VERW), kind_von=("mutter",), alter=13, kindergeld=True, uvg=D(348))])
    out.append(example(2025, 5, c, "Alleinerziehende mit zwei Kindern, Wiesbaden (Mietenstufe VI)", 372, "1728.00", "870.20", "916.60",
                       "1 427,50 − 20 % = 1 142,00; Unterhaltsvorschuss 696,00 (в PDF общей суммой; делу разнесено поровну — итог не меняется);\n"
                       "Freibetrag § 17 Nr. 3 (1 320 €/Jahr) = 110,00; Miete 700 + 170,20. Anlage пишет «Wiesbaden, Landeshaupstadt».", anspruch=True))
    c = Case("bmwsb-2025-06", date, "Bayern", "München", D(1225), [
        Member("ehemann", lohn=D(2490), abzug16=st_kv_rv()),
        Member("ehefrau", beziehung=("ehemann", EHE), minijob=D(556)),
        Member("kind1", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=8, kindergeld=True),
        Member("kind2", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=5, kindergeld=True)])
    out.append(example(2025, 6, c, "Ehepaar mit zwei Kindern, Minijob, München (Mietenstufe VII)", 691, "2227.25", "1371.20", "1173.40",
                       "2 387,50 − 30 % = 1 671,25; Minijob 556,00 «(Pauschalversteuerung) ohne Werbungskostenabzug», 0 %;\n"
                       "Miete 1 225,00 über Höchstbetrag 1 139 + 34,40 → 1 173,40 + 197,80 = 1 371,20. Возраст детей в PDF не указан."))
    c = Case("bmwsb-2025-07", date, "Thüringen", "Weimar, Stadt", D(580), [
        Member("ehefrau", lohn=D(2240), abzug16=kv_rv()),
        Member("ehemann", beziehung=("ehefrau", EHE)),
        Member("kind1", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=10, kindergeld=True),
        Member("kind2", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=6, kindergeld=True)])
    out.append(example(2025, 7, c, "Ehepaar mit zwei Kindern, Weimar (Mietenstufe III)", 485, "1710.00", "777.80", "800.40",
                       "2 137,50 − 20 % = 1 710,00; Miete 580 + 197,80 = 777,80. Возраст детей в PDF не указан.", anspruch=True))
    c = Case("bmwsb-2025-08", date, "Baden-Württemberg", "Friedrichshafen, Stadt", D(870), [
        Member("ehemann", lohn=D(2750), abzug16=st_kv_rv()),
        Member("ehefrau", beziehung=("ehemann", EHE)),
        Member("tochter", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=15, kindergeld=True, minijob=D(60)),
        Member("kind2", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=11, kindergeld=True),
        Member("kind3", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=7, kindergeld=True)])
    out.append(example(2025, 8, c, "Ehepaar mit drei Kindern, Tochter mit Job, Friedrichshafen (Mietenstufe V)", 747, "1853.25", "1095.40", "1119.20",
                       "1 853,25 + 60,00 − 60,00 (Freibetrag § 17 Nr. 4); работа дочери — паушально обложенная (без паушаля расходов);\n"
                       "Miete 870 + 225,40. Возраст двух младших детей в PDF не указан."))
    c = Case("bmwsb-2025-09", date, "Nordrhein-Westfalen", "Attendorn, Stadt", D(780), [
        Member("ehefrau", lohn=D(4000), abzug16=st_kv_rv()),
        Member("ehemann", beziehung=("ehefrau", EHE)),
        Member("schwiegermutter", beziehung=("ehefrau", VERW), rente=rente(645), abzug16=kv()),
        Member("kind1", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=12, kindergeld=True),
        Member("kind2", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=9, kindergeld=True),
        Member("kind3", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=4, kindergeld=True)])
    out.append(example(2025, 9, c, "Ehepaar mit drei Kindern und Schwiegermutter, Attendorn (Mietenstufe II)", 343, "3301.10", "1033.00", "920.00",
                       "2 728,25 + 572,85 = 3 301,10; Höchstbetrag 6 Mitglieder 782 + 94 = 876 (+ 44); Miete 780 + 253,00."))
    c = Case("bmwsb-2025-10", date, "Schleswig-Holstein", "Lübeck, Stadt", D(570), [
        Member("vater", rente=rente(880), abzug16=kv()),
        Member("sohn", beziehung=("vater", VERW), leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False)])
    out.append(example(2025, 10, c, "Vater Rentner, Sohn vom Wohngeld ausgeschlossen, Lübeck (Mietenstufe IV)", 191, "784.35", "356.30", "643.80",
                       "Сын получает трансфер с учётом Kosten der Unterkunft (в PDF — «Arbeitslosengeld II», с 2023 г. Bürgergeld) — § 7 Abs. 1;\n"
                       "§ 11 Abs. 3: половина от 570 и от 619 + 24,80, половина от 142,60 → 285,00 + 71,30 = 356,30.", anspruch=True))
    return out


def bmwsb_2023() -> list[str]:
    out = []
    date = "2023-03-01"
    note = "Строка «Zu berücksichtigende Miete» PDF 2023 года показана без Heizkostenentlastung, но итог\nпримера её включает (570 € в № 7 получается только с 197,80 €); ожидание — итог Wohngeld."
    c = Case("bmwsb-2023-01", date, "Brandenburg", "Jüterbog, Stadt", D(335), [
        Member("rentnerin", rente=rente(860), abzug16=kv())])
    out.append(example(2023, 1, c, "alleinstehende Rentnerin, Jüterbog (Mietenstufe I)", 250, "766.35", hk="366.20", extra_comment=note))
    c = Case("bmwsb-2023-02", date, "Rheinland-Pfalz", "Ludwigshafen am Rhein, Stadt", D(385), [
        Member("alleinstehender", alg1=D(820))])
    out.append(example(2023, 2, c, "Alleinstehender mit ALG I, Ludwigshafen am Rhein (Mietenstufe IV)", 263, "820.00", hk="510.20"))
    c = Case("bmwsb-2023-03", date, "Sachsen", "Leipzig, Stadt", D(480), [
        Member("ehemann", rente=rente(870), abzug16=kv(), gdb=100),
        Member("ehefrau", beziehung=("ehemann", EHE), rente=rente(540), abzug16=kv())])
    out.append(example(2023, 3, c, "Ehepaar mit Renten, Ehemann GdB 100, Leipzig (Mietenstufe II)", 336, "1103.70", hk="498.80"))
    c = Case("bmwsb-2023-05", date, "Hessen", "Wiesbaden, Landeshaupstadt", D(650), [
        Member("mutter", lohn=D(1460), abzug16=kv_rv()),
        Member("kind9", beziehung=("mutter", VERW), kind_von=("mutter",), alter=9, kindergeld=True, uvg=D(237)),
        Member("kind13", beziehung=("mutter", VERW), kind_von=("mutter",), alter=13, kindergeld=True, uvg=D(237))])
    out.append(example(2023, 5, c, "Alleinerziehende mit zwei Kindern, Wiesbaden (Mietenstufe VI)", 428, "1450.00", hk="882.60",
                       extra_comment="Unterhaltsvorschuss 474,00 в PDF общей суммой; делу разнесено поровну."))
    c = Case("bmwsb-2023-06", date, "Bayern", "München", D(770), [
        Member("ehemann", lohn=D(1990), abzug16=kv_rv()),
        Member("ehefrau", beziehung=("ehemann", EHE), minijob=D(430)),
        Member("kind1", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=8, kindergeld=True),
        Member("kind2", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=5, kindergeld=True)])
    out.append(example(2023, 6, c, "Ehepaar mit zwei Kindern, München (Mietenstufe VII)", 518, "1940.00", hk="1129.40",
                       extra_comment="Доход жены 430,00 без паушаля расходов и без вычетов § 16: PDF 2023 года вида занятости не называет;\n"
                                     "по одноимённому примеру 2025 года («Minijob (Pauschalversteuerung) ohne Werbungskostenabzug») — § 40a. Допущение дела."))
    c = Case("bmwsb-2023-07", date, "Thüringen", "Weimar, Stadt", D(580), [
        Member("ehefrau", lohn=D(1770), abzug16=kv_rv()),
        Member("ehemann", beziehung=("ehefrau", EHE)),
        Member("kind1", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=10, kindergeld=True),
        Member("kind2", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=6, kindergeld=True)])
    out.append(example(2023, 7, c, "Ehepaar mit zwei Kindern, Weimar (Mietenstufe III)", 570, "1334.00", "777.80", "770.40",
                       extra_comment=note, anspruch=True))
    c = Case("bmwsb-2023-08", date, "Baden-Württemberg", "Friedrichshafen, Stadt", D(800), [
        Member("ehemann", lohn=D(2600), abzug16=st_kv_rv()),
        Member("ehefrau", beziehung=("ehemann", EHE)),
        Member("tochter", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=15, kindergeld=True, minijob=D(60)),
        Member("kind2", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=11, kindergeld=True),
        Member("kind3", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=7, kindergeld=True)])
    out.append(example(2023, 8, c, "Ehepaar mit drei Kindern, Tochter mit Job, Friedrichshafen (Mietenstufe V)", 701, "1748.25", hk="1077.20"))
    c = Case("bmwsb-2023-09", date, "Nordrhein-Westfalen", "Attendorn, Stadt", D(780), [
        Member("ehemann", lohn=D(2500), abzug16=st_kv_rv()),
        Member("ehefrau", beziehung=("ehemann", EHE)),
        Member("schwiegermutter", beziehung=("ehemann", VERW), rente=rente(645), abzug16=kv()),
        Member("kind1", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=12, kindergeld=True),
        Member("kind2", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=9, kindergeld=True),
        Member("kind3", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=4, kindergeld=True)])
    out.append(example(2023, 9, c, "Ehepaar mit drei Kindern und Schwiegermutter, Attendorn (Mietenstufe II)", 625, "2251.10",
                       extra_comment="PDF называет Höchstbetrag «887,00 Euro (plus 44 Euro)»; по Anlage 1 в редакции 1. WoGFV для шести членов\n"
                                     "и ступени II это 752 + 90 = 842 (+ 44). Показанное число с текстом не сходится, на итог не влияет\n"
                                     "(Miete 780 ниже любого из двух); ожидание Höchstbetrag здесь не проверяется."))
    c = Case("bmwsb-2023-10", date, "Schleswig-Holstein", "Lübeck, Stadt", D(570), [
        Member("vater", rente=rente(880), abzug16=kv()),
        Member("sohn", beziehung=("vater", VERW), leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False)])
    out.append(example(2023, 10, c, "Vater Rentner, Sohn vom Wohngeld ausgeschlossen, Lübeck (Mietenstufe IV)", 181, "784.35", "356.30", "619.80",
                       extra_comment="PDF 2023: «Höchstbetrag (50% von 619,80 Euro) 309,90 Euro (plus Klimakomponente)» — 595 + 24,80."))
    return out


def single(cid, date, lohn, miete, land="Thüringen", gemeinde="Weimar, Stadt", abzug=None, **kw):
    return Case(cid, date, land, gemeinde, D(miete), [Member("person", lohn=D(lohn), abzug16=abzug or kv_rv())], **kw)


def couple(cid, date, lohn, miete, land="Rheinland-Pfalz", gemeinde="Ludwigshafen am Rhein, Stadt", **kw):
    return Case(cid, date, land, gemeinde, D(miete), [
        Member("person", lohn=D(lohn), abzug16=kv_rv()),
        Member("partner", beziehung=("person", EHE))], **kw)


def grenzen() -> list[str]:
    out = []
    d = "2025-03-01"
    # Höchstbetrag + Klimakomponente для одного члена, ступень III: 456 + 19,20 = 475,20.
    for miete, m, comment in ((D("475.19"), "585.59", "на 1 цент ниже потолка — Miete целиком"),
                              (D("475.20"), "585.60", "ровно на потолке"),
                              (D("475.21"), "585.60", "на 1 цент выше — потолок")):
        c = single(f"hb-{miete}", d, 1500, miete)
        h = c.h()
        out.append(render_test(c, f"Grenze Höchstbetrag: Miete {miete} EUR bei Höchstbetrag 456 + Klimakomponente 19,20 ({comment})", [
            (f"truth(zu_beruecksichtigende_miete({h}, {m} EUR))", TRUE)],
            "§ 11 Abs. 1 S. 1 Nr. 1: «jedoch nur bis zur Höhe der Summe» aus Höchstbetrag (Anlage 1: 1 Mitglied, III — 456)\nund Klimakomponente (§ 12 Abs. 7: 19,20); плюс Heizkostenentlastung 110,40. Ожидание — арифметика текста." if miete == D("475.19") else ""))
    # § 21 Nr. 1 и Anlage 3 Nr. 3: z4 = 9,5034872592 → 10; z4 = 9,4997719845 → 9 (reference_calc.py).
    c = single("schwelle-10", d, D("1925.34"), 400)
    h = c.h()
    out.append(render_test(c, "Grenze § 21 Nr. 1: Wohngeld 10 EUR (z4 = 9,5034872592) — Anspruch besteht", [
        (f"truth(wohngeld_ungerundet({h}, 9.5034872592))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 10 EUR))", TRUE),
        (f"truth(wohngeldanspruch({h}, 10 EUR))", TRUE),
        (f"truth(kein_wohngeldanspruch({h}, WENIGER_ALS_10_EURO_21_NR1))", NEITHER)],
        "Пара с «9 EUR»: зарплата 1 925,34 и 1 925,35 € в месяц, один человек, Weimar (III), Miete 400.\nОжидания z4 — независимая арифметика `tools/reference_calc.py` по Anlagen 2, 3 (2. WoGFV)."))
    c = single("schwelle-9", d, D("1925.35"), 400)
    h = c.h()
    out.append(render_test(c, "Grenze § 21 Nr. 1: Wohngeld 9 EUR (z4 = 9,4997719845) — kein Anspruch", [
        (f"truth(wohngeld_ungerundet({h}, 9.4997719845))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 9 EUR))", TRUE),
        (f"truth(kein_wohngeldanspruch({h}, WENIGER_ALS_10_EURO_21_NR1))", TRUE),
        (f"truth(wohngeldanspruch({h}, 9 EUR))", NEITHER)]))
    # Anlage 3 Nr. 3: «bis unter 0,50 Euro … abzurunden sowie von 0,50 Euro an … aufzurunden».
    c = couple("rundung-ab", d, 2100, D("440.49"))
    h = c.h()
    out.append(render_test(c, "Rundung Anlage 3 Nr. 3: z4 = 143,4999657097 wird auf 143 EUR abgerundet", [
        (f"truth(wohngeld_ungerundet({h}, 143.4999657097))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 143 EUR))", TRUE)],
        "Пара округления: супруги, Ludwigshafen am Rhein (IV), зарплата 2 100 €, Miete 440,49 и 543,78 €.\nz4 — `tools/reference_calc.py`."))
    c = couple("rundung-auf", d, 2100, D("543.78"))
    h = c.h()
    out.append(render_test(c, "Rundung Anlage 3 Nr. 3: z4 = 194,5001603254 wird auf 195 EUR aufgerundet", [
        (f"truth(wohngeld_ungerundet({h}, 194.5001603254))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 195 EUR))", TRUE)]))
    # Anlage 3 Nr. 1: Y ниже табличного минимума.
    c = Case("y-min", d, "Thüringen", "Weimar, Stadt", D(400), [Member("person", alg1=D(100))])
    h = c.h()
    out.append(render_test(c, "Anlage 3 Nr. 1: Y = 100 EUR liegt unter dem Tabellenwert 396 und wird ersetzt", [
        (f"truth(monatliches_gesamteinkommen({h}, 100.00 EUR))", TRUE),
        (f"truth(y_nach_anlage3({h}, 396.0))", TRUE)]))
    # Anlage 3 Nr. 1: M ниже минимума — четыре члена, трое исключены, Miete 10.
    c = Case("m-min", d, "Thüringen", "Weimar, Stadt", D(10), [
        Member("person", alg1=D(900)),
        Member("b", beziehung=("person", VERW), leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False),
        Member("c", beziehung=("person", VERW), leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False),
        Member("d", beziehung=("person", VERW), leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False)])
    h = c.h()
    out.append(render_test(c, "Anlage 3 Nr. 1: M = (10 + 197,80) / 4 = 51,95 EUR liegt unter 54 und wird ersetzt", [
        (f"truth(zu_beruecksichtigende_miete({h}, 51.95 EUR))", TRUE),
        (f"truth(m_nach_anlage3({h}, 54.0))", TRUE)],
        "§ 11 Abs. 3: доля 1/4 от (Miete 10 + Heizkostenentlastung 4 Mitglieder 197,80); M_min для одного учитываемого члена — 54 (2025)."))
    # Больше двенадцати учитываемых членов (§ 19 Abs. 3) — 13 членов.
    members = [Member("person", lohn=D(3000), abzug16=st_kv_rv())]
    members += [Member(f"k{i}", beziehung=("person", VERW), kind_von=("person",), alter=10, kindergeld=True) for i in range(1, 13)]
    for date, w, m, z in (("2025-03-01", "1760", "1946.20", "1695"), ("2024-12-31", "1788", "1946.20", "1731")):
        c = Case(f"dreizehn-{date}", date, "Thüringen", "Weimar, Stadt", D(1500), members)
        h = c.h()
        out.append(render_test(c, f"§ 19 Abs. 3: 13 zu berücksichtigende Haushaltsmitglieder am {date} — Formel für 12 plus Zusatzbetrag", [
            (f"truth(zu_beruecksichtigende_miete({h}, {m} EUR))", TRUE),
            (f"truth(wohngeld_monatlich({h}, {w} EUR))", TRUE)],
            f"Независимая арифметика (`tools/reference_calc.py`): формула с величинами для 12 членов = {z} EUR, плюс Zusatzbetrag\n"
            f"(57 € до 2025, 65 € с 2025), не выше M. M = Miete 1 500 + Heizkostenentlastung 225,40 + 8 × 27,60 = 1 946,20\n"
            f"(потолок 5 + 8 × Mehrbetrag выше Miete). Доход: (36 000 − 1 230) × 0,7 − 1 320 (§ 17 Nr. 3: заявитель живёт только с детьми)."))
    # Kreis и острова.
    c = single("kreis", d, 2000, 500, land="Schleswig-Holstein", gemeinde="Tarp", kreis="Schleswig-Flensburg")
    h = c.h()
    out.append(render_test(c, "Anlage WoGV, Vorbemerkung: nicht gesondert aufgeführte Gemeinde Tarp erhält die Mietenstufe des Kreises Schleswig-Flensburg (I)", [
        (f"truth(mietenstufe({h}, MIETENSTUFE_I))", TRUE)]))
    c = single("kreis-gesondert", d, 2000, 500, land="Schleswig-Holstein", gemeinde="Lübeck, Stadt", kreis="Schleswig-Flensburg")
    h = c.h()
    out.append(render_test(c, "gesondert aufgeführte Gemeinde: Mietenstufe der Gemeinde (IV) geht der Kreisstufe vor", [
        (f"truth(mietenstufe({h}, MIETENSTUFE_IV))", TRUE),
        (f"truth(mietenstufe({h}, MIETENSTUFE_I))", NEITHER)],
        "Kreisangabe в деле неверна намеренно: для перечисленной Gemeinde подстановка Kreis не применяется."))
    c = single("insel", d, 2000, 500, land="Schleswig-Holstein", gemeinde="Helgoland", kreis="Pinneberg")
    h = c.h()
    out.append(render_test(c, "§ 12 Abs. 4a: Helgoland — gemeinsame Mietenstufe der Inseln (V), nicht die des Kreises Pinneberg (IV)", [
        (f"truth(mietenstufe({h}, MIETENSTUFE_V))", TRUE),
        (f"truth(mietenstufe({h}, MIETENSTUFE_IV))", NEITHER)]))
    return out


def redaktionen() -> list[str]:
    out = []
    base = [
        Member("ehefrau", lohn=D(2240), abzug16=kv_rv()),
        Member("ehemann", beziehung=("ehefrau", EHE)),
        Member("kind1", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=10, kindergeld=True),
        Member("kind2", beziehung=("ehefrau", VERW), kind_von=("ehefrau", "ehemann"), alter=6, kindergeld=True)]
    for date, w, comment in (
        ("2024-12-31", "463", "Последний день редакции Wohngeld-Plus-Gesetz: Anlagen 2, 3 (BGBl. I 2022 S. 2160), Anlage 1 (1. WoGFV).\n"
                              "Та же семья, что в BMWSB 2025 № 7 (доход 1 710,00, M 777,80). z4 — `tools/reference_calc.py`: 463,2504131300."),
        ("2025-01-01", "485", "Первый день 2. WoGFV (BGBl. 2024 I Nr. 314, Art. 3). § 44 Abs. 1 WoGG: с даты вступления\n"
                              "Fortschreibung решение принимается по новым Berechnungsgrößen — сумма меняется без изменения фактов."),
        ("2026-12-31", "485", "Последний день покрытия параметров: § 43 Abs. 1 WoGG велит следующую Fortschreibung к 01.01.2027."),
    ):
        c = Case(f"redaktion-{date}", date, "Thüringen", "Weimar, Stadt", D(580), base)
        h = c.h()
        out.append(render_test(c, f"Redaktionswechsel: dieselbe Familie am {date} — {w} EUR", [
            (f"truth(wohngeld_monatlich({h}, {w} EUR))", TRUE)], comment))
    c = Case("redaktion-hb-2024-12-31", "2024-12-31", "Bayern", "München", D(1225), [
        Member("ehemann", lohn=D(2490), abzug16=st_kv_rv()),
        Member("ehefrau", beziehung=("ehemann", EHE), minijob=D(556)),
        Member("kind1", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=8, kindergeld=True),
        Member("kind2", beziehung=("ehemann", VERW), kind_von=("ehemann", "ehefrau"), alter=5, kindergeld=True)])
    h = c.h()
    out.append(render_test(c, "Redaktionswechsel am Höchstbetrag: Familie aus BMWSB 2025 Nr. 6 am 31.12.2024 — M 1 327,20, 621 EUR", [
        (f"truth(hoechstbetrag_mit_klimakomponente({h}, 1129.40 EUR))", TRUE),
        (f"truth(zu_beruecksichtigende_miete({h}, 1327.20 EUR))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 621 EUR))", TRUE)],
        "Miete 1 225 € выше потолка обеих редакций: 1. WoGFV — 4 Mitglieder, VII: 1 095 + 34,40 = 1 129,40;\n"
        "2. WoGFV — 1 139 + 34,40 = 1 173,40 (пример 2025 № 6: M 1 371,20, 691 €). Сумма 621 — `tools/reference_calc.py`."))
    c = Case("redaktion-2027-01-01", "2027-01-01", "Thüringen", "Weimar, Stadt", D(580), base)
    h = c.h()
    out.append(render_test(c, "außerhalb der Abdeckung: am 1. Januar 2027 kein Wert der Anlagen — MISSING_PARAMETER_VALUE, nicht 0", [
        (f"truth(wohngeld_monatlich({h}, 485 EUR))", ["truth_status == NEITHER", "issue(MISSING_PARAMETER_VALUE)"])],
        "Правительственный проект изменений на 2027 год не принят; значения после 31.12.2026 не закреплены."))
    c = Case("redaktion-2022-12-31", "2022-12-31", "Thüringen", "Weimar, Stadt", D(580), base)
    h = c.h()
    out.append(render_test(c, "vor dem 1. Januar 2023: keine modellierte Fassung — EDITION_NOT_APPLICABLE", [
        (f"truth(wohngeld_monatlich({h}, 485 EUR))", ["truth_status == NEITHER", "issue(EDITION_NOT_APPLICABLE)"])]))
    return out


def tatsachen() -> list[str]:
    out = []
    d = "2025-03-01"
    def fam(cid, **kw):
        return Case(cid, d, "Thüringen", "Weimar, Stadt", D(580), [
            Member("ehefrau", lohn=D(2240), abzug16=kv_rv()),
            Member("ehemann", beziehung=("ehefrau", EHE))], **kw)
    c = fam("ohne-wohnort", omit=("fact-wohnort",))
    h = c.h()
    out.append(render_test(c, "unzureichende Tatsachen: ohne Wohnort keine Mietenstufe und kein Wohngeld (nicht 0)", [
        (f"truth(monatliches_gesamteinkommen({h}, 1710.00 EUR))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 0 EUR))", NEITHER)],
        "Доход считается, сумма — нет: без Mietenstufe нет Höchstbetrag."))
    c = fam("ohne-miete", omit=("entgelt",))
    h = c.h()
    out.append(render_test(c, "unzureichende Tatsachen: ohne vereinbartes Entgelt keine Miete und kein Wohngeld", [
        (f"truth(mietenstufe({h}, MIETENSTUFE_III))", TRUE),
        (f"truth(zu_beruecksichtigende_miete({h}, 0 EUR))", NEITHER)]))
    c = fam("status-offen", omit=("ehemann-leistung7",))
    h = c.h()
    out.append(render_test(c, "unzureichende Tatsachen: Ausschlussstatus des Ehemanns nach § 7 unbekannt — keine Mitgliederzahl, kein Wohngeld", [
        (f"truth(haushalt_festgestellt({h}))", NEITHER),
        (f"truth(anzahl_zu_beruecksichtigende_haushaltsmitglieder({h}, 2))", NEITHER)],
        "Отсутствие факта о трансфере — не установленное «не получает»."))
    c = fam("einkommen-offen", omit=("ehefrau-werbungskosten",))
    h = c.h()
    out.append(render_test(c, "unzureichende Tatsachen: Arbeitslohn ohne Angabe zu Werbungskosten — Jahreseinkommen nicht ermittelbar", [
        (f"truth(einkommensangabe_unvollstaendig({c.p('ehefrau')}))", TRUE),
        (f"truth(monatliches_gesamteinkommen({h}, 1710.00 EUR))", NEITHER)]))
    c = fam("unbekannter-bewohner", extra=(f'lebensmittelpunkt_im_wohnraum(entity_ref("urn:de:example:wohngeld:unbekannter-bewohner:haushalt"), entity_ref("urn:de:example:wohngeld:unbekannter-bewohner:gast"))',))
    h = c.h()
    out.append(render_test(c, "unzureichende Tatsachen: Mitbewohner ohne festgestellte Beziehung — Haushalt nicht festgestellt", [
        (f"truth(haushalt_festgestellt({h}))", NEITHER),
        (f"truth(wohngeld_monatlich({h}, 485 EUR))", NEITHER)]))
    c = fam("widerspruch-miete", extra=(f'vereinbartes_entgelt(entity_ref("urn:de:example:wohngeld:widerspruch-miete:mietverhaeltnis"), 650.00 EUR)',))
    h = c.h()
    out.append(render_test(c, "widersprüchliche Tatsachen: zwei verschiedene vereinbarte Entgelte für ein Mietverhältnis", [
        (f"truth(wohngeld_monatlich({h}, 485 EUR))", ["issue(KEY_CONFLICT)"])],
        "key(mv) у vereinbartes_entgelt: два разных значения — конфликт ключа §40, а не выбор одного из них."))
    c = fam("widerspruch-lebensmittelpunkt", extra=(f'not lebensmittelpunkt_im_wohnraum(entity_ref("urn:de:example:wohngeld:widerspruch-lebensmittelpunkt:haushalt"), entity_ref("urn:de:example:wohngeld:widerspruch-lebensmittelpunkt:ehemann"))',))
    h = c.h()
    out.append(render_test(c, "widersprüchliche Tatsachen: Lebensmittelpunkt des Ehemanns zugleich behauptet und bestritten — BOTH", [
        (f"truth(lebensmittelpunkt_im_wohnraum({h}, {c.p('ehemann')}))", ["truth_status == BOTH"])],
        "Паракосистентный ответ §-логики: утверждение и отрицание одного факта дают BOTH, а не молчаливый выбор."))
    return out


def ausschluss_und_urteil() -> list[str]:
    out = []
    d = "2025-03-01"
    c = Case("allein-buergergeld", d, "Thüringen", "Weimar, Stadt", D(500), [
        Member("person", leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False)])
    h = c.h()
    out.append(render_test(c, "§ 7 Abs. 1 Nr. 1, § 21 Nr. 2: alleinstehender Empfänger von Grundsicherungsgeld mit Kosten der Unterkunft — kein Anspruch", [
        (f"truth(vom_wohngeld_ausgeschlossen({c.p('person')}))", TRUE),
        (f"truth(kein_wohngeldanspruch({h}, ALLE_AUSGESCHLOSSEN_21_NR2))", TRUE),
        (f"truth(wohngeldberechtigt({h}, {c.p('person')}))", NEITHER)],
        "Исключение установлено фактом решения другого органа (трансфер с Kosten der Unterkunft), а не выводом из молчания."))
    for cid, l7, title in (
        ("darlehen", ("NR1_GRUNDSICHERUNGSGELD_SGB2", "JA", "JA", "NEIN", "NEIN"), "§ 7 Abs. 1 S. 3 Nr. 1: Leistung ausschließlich als Darlehen — kein Ausschluss"),
        ("ohne-kdu", ("NR1_GRUNDSICHERUNGSGELD_SGB2", "NEIN", "NEIN", "NEIN", "NEIN"), "§ 7 Abs. 1 S. 1: ohne Kosten der Unterkunft kein Ausschluss"),
        ("verzicht", ("NR1_GRUNDSICHERUNGSGELD_SGB2", "JA", "NEIN", "NEIN", "JA"), "§ 8 Abs. 2: Verzicht zur Beantragung von Wohngeld — Ausschluss gilt als nicht erfolgt")):
        c = Case(cid, d, "Thüringen", "Weimar, Stadt", D(500), [Member("person", alg1=D(900), leistung7=l7)])
        out.append(render_test(c, title, [(f"truth(nicht_vom_wohngeld_ausgeschlossen({c.p('person')}))", TRUE),
                                          (f"truth(vom_wohngeld_ausgeschlossen({c.p('person')}))", NEITHER)]))
    c = Case("drei-vier", d, "Schleswig-Holstein", "Lübeck, Stadt", D(570), [
        Member("sohn", leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False),
        Member("vater", beziehung=("sohn", VERW), rente=rente(880), abzug16=kv())])
    h = c.h()
    out.append(render_test(c, "§ 3 Abs. 4: ausgeschlossener Antragsteller bleibt wohngeldberechtigt, wenn er mit einem zu berücksichtigenden Mitglied wohnt", [
        (f"truth(wohngeldberechtigt({h}, {c.p('sohn')}))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 191 EUR))", TRUE)],
        "Состав BMWSB 2025 № 10, но заявитель — исключённый сын: сумма та же (191 €), учитывается один член."))
    c = Case("bafoeg", d, "Thüringen", "Weimar, Stadt", D(500), [Member("person", alg1=D(900))], bafoeg=("JA", "NEIN"))
    h = c.h()
    out.append(render_test(c, "§ 20 Abs. 2: allen Haushaltsmitgliedern steht Ausbildungsförderung dem Grunde nach zu — kein Anspruch", [
        (f"truth(kein_wohngeldanspruch({h}, AUSBILDUNGSFOERDERUNG_20_ABS2))", TRUE),
        (f"truth(wohngeldanspruch({h}, 0 EUR))", NEITHER)]))
    # § 21 Nr. 3 — канал суждения.
    c = single("missbrauch-offen", d, 1500, 500, missbrauch=None)
    h = c.h()
    out.append(render_test(c, "§ 21 Nr. 3 ohne Würdigung der Wohngeldbehörde: Betrag berechnet, Anspruch verlangt Urteil (REQUIRES_JUDGMENT)", [
        (f"truth(wohngeld_monatlich({h}, 202 EUR))", TRUE),
        (f"truth(wohngeldanspruch({h}, 202 EUR))", ["evaluation_status == REQUIRES_JUDGMENT",
                                                    "judgment_request(missbraeuchliche_inanspruchnahme, Wohngeldbehoerde)"])],
        "«soweit die Inanspruchnahme missbräuchlich wäre, insbesondere wegen erheblichen Vermögens» — оценка органа, числа в законе нет.\n"
        "Сумма 202 € — `tools/reference_calc.py` (один человек, Weimar III, зарплата 1 500 €, −20 %, Miete 500; z4 = 202,1965960960)."))
    c = single("missbrauch-nein", d, 1500, 500, missbrauch="nein")
    h = c.h()
    out.append(render_test(c, "§ 21 Nr. 3 Behörde verneint Missbrauch: Anspruch 202 EUR", [
        (f"truth(wohngeldanspruch({h}, 202 EUR))", TRUE + ["judgment_requests(0)"])]))
    c = single("missbrauch-ja", d, 1500, 500, missbrauch="ja")
    h = c.h()
    out.append(render_test(c, "§ 21 Nr. 3 Behörde bejaht Missbrauch: kein Anspruch", [
        (f"truth(kein_wohngeldanspruch({h}, MISSBRAEUCHLICH_21_NR3))", TRUE),
        (f"truth(wohngeldanspruch({h}, 202 EUR))", NEITHER)]))
    # § 5 Abs. 1 S. 2 Nr. 3 и Abs. 2.
    def partner_case(cid, extra_member_facts, extra=(), missbrauch="nein"):
        return Case(cid, d, "Thüringen", "Weimar, Stadt", D(600), [
            Member("person", lohn=D(2000), abzug16=kv_rv()),
            Member("partner", beziehung=None, extra=extra_member_facts)], extra=extra, missbrauch=missbrauch)
    pid = lambda cid, x: f'entity_ref("urn:de:example:wohngeld:{cid}:{x}")'
    cid = "partner-offen"
    c = partner_case(cid, (f"zusammenleben_ohne_familienrechtliche_beziehung({pid(cid,'partner')}, {pid(cid,'person')})",))
    h = c.h()
    out.append(render_test(c, "§ 5 Abs. 1 S. 2 Nr. 3: Partner ohne familienrechtliche Beziehung und ohne Vermutungstatbestand — Würdigung der Behörde verlangt", [
        (f"truth(haushaltsmitglied({h}, {c.p('partner')}))", ["evaluation_status == REQUIRES_JUDGMENT",
                                                            "judgment_request(verantwortungs_und_einstehensgemeinschaft, Wohngeldbehoerde)"])]))
    cid = "partner-gewuerdigt"
    c = partner_case(cid, (f"zusammenleben_ohne_familienrechtliche_beziehung({pid(cid,'partner')}, {pid(cid,'person')})",),
                     extra=(f"verantwortungs_und_einstehensgemeinschaft({pid(cid,'partner')}, {pid(cid,'person')})",))
    h = c.h()
    out.append(render_test(c, "§ 5 Abs. 1 S. 2 Nr. 3: Behörde bejaht die Verantwortungsgemeinschaft — zwei Haushaltsmitglieder", [
        (f"truth(gesamtzahl_haushaltsmitglieder({h}, 2))", TRUE + ["judgment_requests(0)"])]))
    cid = "partner-vermutet"
    c = partner_case(cid, (f"zusammenleben_ohne_familienrechtliche_beziehung({pid(cid,'partner')}, {pid(cid,'person')})",
                           f"vermutungstatbestand_7_abs3a_sgb2({pid(cid,'partner')}, {pid(cid,'person')}, NEIN)"))
    h = c.h()
    out.append(render_test(c, "§ 5 Abs. 2: Vermutungstatbestand erfüllt und nicht widerlegt — Haushaltsmitglied ohne gesonderte Würdigung", [
        (f"truth(gesamtzahl_haushaltsmitglieder({h}, 2))", TRUE + ["judgment_requests(0)"])]))
    # § 3 Abs. 5.
    c = Case("auslaender-status", d, "Thüringen", "Weimar, Stadt", D(500), [
        Member("person", alg1=D(900), aufenthalt="AUFENTHALTSTITEL_ODER_DULDUNG",
               extra=('tatsaechlicher_aufenthalt_im_bundesgebiet(entity_ref("urn:de:example:wohngeld:auslaender-status:person"))',))])
    h = c.h()
    out.append(render_test(c, "§ 3 Abs. 5 S. 1 Nr. 2: ausländische Person mit Aufenthaltstitel und tatsächlichem Aufenthalt ist wohngeldberechtigt", [
        (f"truth(wohngeldberechtigt({h}, {c.p('person')}))", TRUE)]))
    c = Case("auslaender-ohne-aufenthalt", d, "Thüringen", "Weimar, Stadt", D(500), [
        Member("person", alg1=D(900), aufenthalt="AUFENTHALTSTITEL_ODER_DULDUNG")])
    h = c.h()
    out.append(render_test(c, "§ 3 Abs. 5 S. 1: ohne festgestellten tatsächlichen Aufenthalt keine Wohngeldberechtigung", [
        (f"truth(wohngeldberechtigt({h}, {c.p('person')}))", ["truth_status == NEITHER"])],
        "Статус вычисления здесь не утверждается: по E-0101 правило § 5 Abs. 1 S. 2 Nr. 3 с неопределённым (не\n"
        "опровергнутым) конъюнктом остаётся живым и называет Wohngeldbehörde. Запрос при этом строится с\n"
        "аргументом не того типа (Money в позиции Person) — находка ядра, воспроизведена отдельно и передана\n"
        "координатору (analysis/coverage-matrix.md, «Находки»)."))
    # § 3 Abs. 1 S. 2 Nr. 3 (Heim) и вне модели.
    c = Case("heim", d, "Thüringen", "Weimar, Stadt", D(0), [Member("person", rente=rente(1100), abzug16=kv())], grundlage="HEIM")
    h = c.h()
    out.append(render_test(c, "§ 9 Abs. 3 S. 2, § 11 Abs. 1 S. 2: im Heim ist Höchstbetrag + Heizkostenentlastung + Klimakomponente zu berücksichtigen", [
        (f"truth(zu_beruecksichtigende_miete({h}, 585.60 EUR))", TRUE)],
        "Один член, ступень III (2025): 456 + 110,40 + 19,20 = 585,60 — независимо от «Entgelt»."))
    c = Case("lastenzuschuss", d, "Schleswig-Holstein", "Tarp", D(750), [Member("person", lohn=D(2150), abzug16=kv_rv())],
             kreis="Schleswig-Flensburg", zuschuss="LASTENZUSCHUSS")
    h = c.h()
    out.append(render_test(c, "außerhalb des Modells: Lastenzuschuss (BMWSB-Beispiele 4 und 11) — kein Betrag", [
        (f"truth(ausserhalb_des_modells({h}, LASTENZUSCHUSS))", TRUE),
        (f"truth(wohngeld_monatlich({h}, 320 EUR))", NEITHER)]))
    return out


def freibetraege() -> list[str]:
    out = []
    d = "2025-03-01"
    def two(cid, gdb=None, pflege=False):
        return Case(cid, d, "Sachsen", "Leipzig, Stadt", D(480), [
            Member("ehemann", rente=rente(1410), abzug16=kv(), gdb=gdb, pflege=pflege),
            Member("ehefrau", beziehung=("ehemann", EHE), rente=rente(540), abzug16=kv())])
    for cid, gdb, pflege, y, title in (
        ("gdb80-pflege", 80, True, "1589.70", "§ 17 Nr. 1 b: GdB 80 mit Pflegebedürftigkeit und häuslicher Pflege — 1 800 EUR"),
        ("gdb80", 80, False, "1739.70", "§ 17 Nr. 1: GdB 80 ohne Pflege — kein Freibetrag"),
        ("gdb100", 100, False, "1589.70", "§ 17 Nr. 1 a: GdB 100 — 1 800 EUR")):
        c = two(cid, gdb, pflege)
        out.append(render_test(c, title, [(f"truth(monatliches_gesamteinkommen({c.h()}, {y} EUR))", TRUE)],
                               "Состав BMWSB 2025 № 3: 1 231,35 + 478,35 = 1 739,70; Freibetrag 150,00 в месяц." if cid == "gdb80-pflege" else ""))
    c = two("ns-verfolgung")
    c.members[1].extra = ('ns_verfolgte_person(entity_ref("urn:de:example:wohngeld:ns-verfolgung:ehefrau"))',)
    out.append(render_test(c, "§ 17 Nr. 2: Opfer der nationalsozialistischen Verfolgung — 750 EUR", [
        (f"truth(abzug_13({c.h()}, NS_VERFOLGUNG_17_NR2, {c.p('ehefrau')}, 750 EUR))", TRUE),
        (f"truth(monatliches_gesamteinkommen({c.h()}, 1677.20 EUR))", TRUE)],
        "1 739,70 − 750 / 12 = 1 739,70 − 62,50 = 1 677,20."))
    def single_parent(cid, alter):
        return Case(cid, d, "Hessen", "Wiesbaden, Landeshaupstadt", D(700), [
            Member("mutter", lohn=D(1530), abzug16=kv_rv()),
            Member("kind", beziehung=("mutter", VERW), kind_von=("mutter",), alter=alter, kindergeld=True)])
    for cid, alter, y in (("allein-17", 17, "1032.00"), ("allein-18", 18, "1142.00")):
        c = single_parent(cid, alter)
        out.append(render_test(c, f"§ 17 Nr. 3: Kind {alter} Jahre — {'1 320 EUR' if alter < 18 else 'kein Freibetrag'}", [
            (f"truth(monatliches_gesamteinkommen({c.h()}, {y} EUR))", TRUE)],
            "«mindestens eines dieser Kinder noch nicht 18 Jahre alt»: пара 17/18 лет. 1 427,50 − 20 % = 1 142,00." if alter == 17 else ""))
    c = Case("allein-mit-oma", d, "Hessen", "Wiesbaden, Landeshaupstadt", D(700), [
        Member("mutter", lohn=D(1530), abzug16=kv_rv()),
        Member("kind", beziehung=("mutter", VERW), kind_von=("mutter",), alter=9, kindergeld=True),
        Member("oma", beziehung=("mutter", VERW), rente=rente(600), abzug16=kv())])
    out.append(render_test(c, "§ 17 Nr. 3: nicht ausschließlich mit Kindern — kein Alleinerziehenden-Freibetrag", [
        (f"truth(abzug_13({c.h()}, ALLEINERZIEHEND_17_NR3, {c.p('mutter')}, 1320 EUR))", NEITHER)]))
    def kind_job(cid, alter, lohn):
        return Case(cid, d, "Baden-Württemberg", "Friedrichshafen, Stadt", D(870), [
            Member("vater", lohn=D(2750), abzug16=st_kv_rv()),
            Member("kind", beziehung=("vater", VERW), kind_von=("vater",), alter=alter, minijob=D(lohn))])
    for cid, alter, lohn, betrag, title in (
        ("kind24", 24, 150, "1200", "§ 17 Nr. 4: Kind 24 Jahre, eigene Einnahmen 1 800 EUR — Freibetrag höchstens 1 200 EUR"),
        ("kind25", 25, 150, None, "§ 17 Nr. 4: Kind 25 Jahre — kein Freibetrag")):
        c = kind_job(cid, alter, lohn)
        if betrag:
            steps = [(f"truth(abzug_13({c.h()}, ERWERBSEINKOMMEN_KIND_17_NR4, {c.p('kind')}, {betrag} EUR))", TRUE)]
        else:
            steps = [(f"truth(abzug_13({c.h()}, ERWERBSEINKOMMEN_KIND_17_NR4, {c.p('kind')}, 1200 EUR))", NEITHER)]
        out.append(render_test(c, title, steps, "«noch nicht 25 Jahre alt»: пара 24/25." if alter == 24 else ""))
    def unterhalt(cid, art, betrag, titel, titelbetrag):
        c = Case(cid, d, "Thüringen", "Weimar, Stadt", D(500), [
            Member("person", lohn=D(2500), abzug16=st_kv_rv()),
        ], extra=(f'unterhaltsaufwendung_18(entity_ref("urn:de:example:wohngeld:{cid}:haushalt"), entity_ref("urn:de:example:wohngeld:{cid}:empfaenger"), {art}, {money(betrag)}, {titel}, {money(titelbetrag)})',))
        return c
    for cid, art, betrag, titel, tb, expected, title in (
        ("unterhalt-nr3", "NR3_FRUEHERER_ODER_GETRENNT_LEBENDER_EHEGATTE", 7000, "NEIN", 0, "6000", "§ 18 S. 1 Nr. 3: Unterhalt 7 000 EUR an früheren Ehegatten — höchstens 6 000 EUR"),
        ("unterhalt-titel", "NR3_FRUEHERER_ODER_GETRENNT_LEBENDER_EHEGATTE", 7000, "JA", 6500, "6500", "§ 18 S. 2: Unterhaltstitel über 6 500 EUR — bis zum festgelegten Betrag"),
        ("unterhalt-nr4", "NR4_SONSTIGE_PERSON", 3500, "NEIN", 0, "3000", "§ 18 S. 1 Nr. 4: sonstige Person — höchstens 3 000 EUR")):
        c = unterhalt(cid, art, betrag, titel, tb)
        out.append(render_test(c, title, [
            (f"truth(abzug_13({c.h()}, UNTERHALT_18, {c.p('empfaenger')}, {expected} EUR))", TRUE)]))
    # WoGV в мире WoGG: Heizumlage и Pauschbetrag Haushaltsenergie, Zahlung an Dritte.
    mv = 'entity_ref("urn:de:example:wohngeld:miete-wogv:mietverhaeltnis")'
    c = Case("miete-wogv", d, "Thüringen", "Weimar, Stadt", D(700), [Member("person", lohn=D(2000), abzug16=kv_rv())],
             extra=(f"de.social.wohngeld_verordnung::umlage_betriebskosten({mv}, de.social.wohngeld_verordnung::BETRKV_2_NR4_A, 80.00 EUR)",
                    f"de.social.wohngeld_verordnung::nicht_ausgewiesene_kosten({mv}, de.social.wohngeld_verordnung::UEBRIGE_HAUSHALTSENERGIE)",
                    f"de.social.wohngeld_verordnung::anzahl_bewohner({mv}, 1)",
                    f"de.social.wohngeld_verordnung::zahlung_an_dritte({mv}, 15.00 EUR)"))
    out.append(render_test(c, "§ 9 Abs. 1, 2 mit §§ 2, 6 WoGV: Entgelt 700 + Dritte 15 − Heizumlage 80 − Pauschbetrag Haushaltsenergie 41 = 594 EUR", [
        (f"truth(miete_nach_9({c.h()}, 594.00 EUR))", TRUE)]))
    return out


#: Ответы закреплённого калькулятора BMWSB на делах `tools/rechner-2025-cases.json`:
#:   node corpus/laws/de/wohngeld/tools/run_rechner.js corpus/laws/de/wohngeld/tools/rechner-2025-cases.json
#: Число записано из вывода калькулятора, не из модели.
RECHNER = {"r01-single-I": 139, "r02-single-VII-cap": 278, "r03-couple-II-cap": 114, "r04-singleparent-V": 670,
           "r05-five-VI-cap": 883, "r06-six-IV": 770, "r07-eight-III": 919, "r08-pensioners-disabled-II": 151,
           "r09-heim-II": 236, "r10-three-one-excluded-V": 254, "r13-child-minijob": 336,
           "r14-child-arbeitslohn-divergenz": 357}


def rechner_2025() -> list[str]:
    out = []
    d = "2025-03-01"
    def kids(n, parent="person", other="partner", start=1):
        return [Member(f"kind{i}", beziehung=(parent, VERW), kind_von=(parent, other) if other else (parent,),
                       alter=5 + i, kindergeld=True) for i in range(start, start + n)]
    spec = [
        ("r01-single-I", Case("r01", d, "Brandenburg", "Jüterbog, Stadt", D(300), [Member("person", lohn=D(1400), abzug16=kv_rv())])),
        ("r02-single-VII-cap", Case("r02", d, "Bayern", "München", D(900), [Member("person", lohn=D(1800), abzug16=st_kv_rv())])),
        ("r03-couple-II-cap", Case("r03", d, "Sachsen", "Leipzig, Stadt", D(520), [
            Member("person", lohn=D(2300), abzug16=kv_rv()), Member("partner", beziehung=("person", EHE))])),
        ("r04-singleparent-V", Case("r04", d, "Baden-Württemberg", "Friedrichshafen, Stadt", D(800),
            [Member("person", lohn=D(1700), abzug16=kv_rv())] + kids(2, other=None))),
        ("r05-five-VI-cap", Case("r05", d, "Hessen", "Wiesbaden, Landeshaupstadt", D(1300),
            [Member("person", lohn=D(3200), abzug16=st_kv_rv()), Member("partner", beziehung=("person", EHE))] + kids(3))),
        ("r06-six-IV", Case("r06", d, "Schleswig-Holstein", "Lübeck, Stadt", D(1000),
            [Member("person", lohn=D(3500), abzug16=st_kv_rv()), Member("partner", beziehung=("person", EHE))] + kids(4))),
        ("r07-eight-III", Case("r07", d, "Thüringen", "Weimar, Stadt", D(1400),
            [Member("person", lohn=D(4200), abzug16=st_kv_rv()), Member("partner", beziehung=("person", EHE))] + kids(6))),
        ("r08-pensioners-disabled-II", Case("r08", d, "Sachsen", "Leipzig, Stadt", D(450), [
            Member("person", rente=rente(1250), abzug16=kv(), gdb=100),
            Member("partner", beziehung=("person", EHE), rente=rente(700), abzug16=kv())])),
        ("r09-heim-II", Case("r09", d, "Sachsen", "Leipzig, Stadt", D(0), [Member("person", rente=rente(1100), abzug16=kv())], grundlage="HEIM")),
        ("r10-three-one-excluded-V", Case("r10", d, "Baden-Württemberg", "Friedrichshafen, Stadt", D(900), [
            Member("person", lohn=D(1900), abzug16=kv_rv()), Member("partner", beziehung=("person", EHE)),
            Member("sohn", beziehung=("person", VERW), leistung7=BUERGERGELD_MIT_KDU, abzug16=None, einkommen_vollstaendig=False)])),
        ("r13-child-minijob", Case("r13", d, "Thüringen", "Weimar, Stadt", D(700), [
            Member("person", lohn=D(2600), abzug16=st_kv_rv()), Member("partner", beziehung=("person", EHE)),
            Member("kind", beziehung=("person", VERW), kind_von=("person", "partner"), alter=16, kindergeld=True, minijob=D(150))])),
    ]
    for rid, case in spec:
        w = RECHNER[rid]
        out.append(render_test(case, f"Wohngeldrechner BMWSB 2025, Fall {rid}: {w} EUR", [
            (f"truth(wohngeld_monatlich({case.h()}, {w} EUR))", TRUE)],
            f"Ожидание — ответ закреплённого калькулятора (sources/bmwsb/wohngeldrechner-2025.module.js), дело `{rid}`\n"
            f"в tools/rechner-2025-cases.json. Поля калькулятора: доход и Werbungskosten в месяц, флажки § 16, Mietenstufe."))
    # Квалифицированное расхождение: калькулятор вычитает 100 € из ЧИСТОГО дохода ребёнка; § 17 Nr. 4
    # вычитает сумму собственных Einnahmen (≤ 1 200 € в год) из Gesamteinkommen.
    case = Case("r14", d, "Thüringen", "Weimar, Stadt", D(700), [
        Member("person", lohn=D(2600), abzug16=st_kv_rv()), Member("partner", beziehung=("person", EHE)),
        Member("kind", beziehung=("person", VERW), kind_von=("person", "partner"), alter=16, kindergeld=True, lohn=D(150), abzug16=kv_rv())])
    out.append(render_test(case, "Wohngeldrechner-Abweichung: Kind mit Arbeitslohn 150 EUR — § 17 Nr. 4 ergibt 382 EUR, der Rechner 357 EUR", [
        (f"truth(abzug_13({case.h()}, ERWERBSEINKOMMEN_KIND_17_NR4, {case.p('kind')}, 1200 EUR))", TRUE),
        (f"truth(wohngeld_monatlich({case.h()}, 382 EUR))", TRUE)],
        "Калькулятор (дело r14-child-arbeitslohn-divergenz) даёт 357: он вычитает 100 €/мес из дохода ребёнка ПОСЛЕ\n"
        "паушаля и § 16 и не ниже нуля. § 17 Nr. 4 называет «Betrag in Höhe der eigenen Einnahmen aus Erwerbstätigkeit»\n"
        "(брутто 1 800 €/год, не выше 1 200 €) и вычитает его из Gesamteinkommen (§ 13 Abs. 1). Ожидание — текст (382,\n"
        "`tools/reference_calc.py`); расхождение квалифицировано как упрощение калькулятора, README."))
    return out


def main() -> int:
    TESTS.mkdir(parents=True, exist_ok=True)
    files = {
        "bmwsb-2025.lawtest": ("// Официальные примеры BMWSB 2025 года: 9 арендных из 11 (№ 4, № 11 — Lastenzuschuss).\n// Ожидания — числа PDF; допущения дела названы в комментарии к сценарию.\n\n", bmwsb_2025()),
        "grenzen.lawtest": ("// Пары границ: потолок Miete, порог 10 €, округление до евро, минимумы M и Y,\n// число членов сверх двенадцати, Kreis и острова.\n\n", grenzen()),
        "redaktionen.lawtest": ("// Переход редакций и границы покрытия параметров.\n\n", redaktionen()),
        "tatsachen.lawtest": ("// Недостаточные и противоречивые факты.\n\n", tatsachen()),
        "ausschluss-und-urteil.lawtest": ("// Исключения §§ 7, 8, 20, 21 и каналы суждения § 5 Abs. 1 S. 2 Nr. 3, § 21 Nr. 3.\n\n", ausschluss_und_urteil()),
        "freibetraege.lawtest": ("// Freibeträge § 17, Unterhalt § 18, состав Miete через WoGV.\n\n", freibetraege()),
        "rechner-2025.lawtest": ("// Ответы калькулятора BMWSB 2025 как независимые ожидания и одно квалифицированное расхождение.\n\n", rechner_2025()),
        "bmwsb-2023.lawtest": ("// Официальные примеры BMWSB 2023 года: 9 арендных из 10 (№ 4 — Lastenzuschuss).\n// Ожидания — числа PDF; допущения дела названы в комментарии к сценарию.\n\n", bmwsb_2023()),
    }
    for name, (preamble, tests) in files.items():
        (TESTS / name).write_text(HEADER + preamble + "\n\n".join(tests) + "\n", encoding="utf-8")
        print(f"записан tests/{name}: {len(tests)} сценариев")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
