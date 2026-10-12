"""Независимая сверочная арифметика § 19 WoGG (Decimal) — ВНЕ пакета.

Назначение: получить ожидания граничных сценариев (порог 10 €, округление
Anlage 3 Nr. 3, число членов сверх двенадцати, смена редакции), которых нет в
официальных примерах. Таблицы переписаны здесь вручную с выпусков BGBl
(1. WoGFV — Anlage 1 2023; Wohngeld-Plus-Gesetz — Anlagen 2, 3 2023;
2. WoGFV — Anlagen 1–3 2025), а не прочитаны из `anlagen/*.lawparam.json`:
ошибка переписывания в одном месте проявится расхождением со сценарием.
Та же программа воспроизводит все 18 арендных примеров BMWSB (`selfcheck`).
"""
from __future__ import annotations

from decimal import ROUND_HALF_UP, Decimal as D

Q10 = D("0.0000000001")
HB = {
    2023: {1: [347, 392, 438, 491, 540, 591, 651], 2: [420, 474, 530, 595, 654, 716, 788],
           3: [501, 564, 631, 708, 778, 853, 937], 4: [584, 659, 736, 825, 909, 995, 1095],
           5: [667, 752, 841, 944, 1038, 1137, 1251], "+": [79, 90, 102, 114, 124, 143, 157]},
    2025: {1: [361, 408, 456, 511, 562, 615, 677], 2: [437, 493, 551, 619, 680, 745, 820],
           3: [521, 587, 657, 737, 809, 887, 975], 4: [608, 686, 766, 858, 946, 1035, 1139],
           5: [694, 782, 875, 982, 1080, 1183, 1302], "+": [82, 94, 106, 119, 129, 149, 163]},
}
HEIZ = [D("110.40"), D("142.60"), D("170.20"), D("197.80"), D("225.40")]
HEIZ_PLUS = D("27.60")
KLIMA = [D("19.20"), D("24.80"), D("29.60"), D("34.40"), D("39.20")]
KLIMA_PLUS = D("4.80")
A = [D(x) for x in "0.04 0.03 0.02 0.01 0 -0.01 -0.02 -0.03 -0.04 -0.06 -0.09 -0.12".split()]
B = {2023: "4.991 3.716 3.035 2.251 1.985 1.792 1.657 1.648 1.432 1.300 1.188 1.152",
     2025: "4.797 3.571 2.917 2.163 1.907 1.722 1.592 1.583 1.376 1.249 1.141 1.107"}
C = {2023: "4.620 3.450 2.780 2.000 1.950 1.880 1.870 1.870 1.880 1.880 2.220 2.510",
     2025: "4.080 3.040 2.450 1.760 1.720 1.660 1.650 1.650 1.660 1.660 1.960 2.210"}
MMIN = {2023: [52, 64, 76, 88, 99, 99, 111, 123, 135, 146, 180, 286],
        2025: [54, 67, 79, 92, 103, 103, 115, 128, 140, 152, 187, 298]}
YMIN = {2023: [350, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600],
        2025: [396, 679, 906, 1132, 1358, 1585, 1811, 2037, 2264, 2490, 2717, 2943]}
ZUSATZ = {2023: D(57), 2025: D(65)}


def edition(date: str) -> int:
    if "2023-01-01" <= date < "2025-01-01":
        return 2023
    if "2025-01-01" <= date < "2027-01-01":
        return 2025
    raise ValueError(f"{date}: вне покрытия")


def hoechstbetrag(y: int, n: int, stufe: int) -> D:
    if n <= 5:
        return D(HB[y][n][stufe - 1])
    return D(HB[y][5][stufe - 1]) + D(HB[y]["+"][stufe - 1]) * (n - 5)


def component(values: list[D], plus: D, n: int) -> D:
    return values[n - 1] if n <= 5 else values[4] + plus * (n - 5)


def m_value(y: int, gesamt: int, n: int, stufe: int, miete: D, heim: bool = False) -> D:
    cap = hoechstbetrag(y, gesamt, stufe) + component(KLIMA, KLIMA_PLUS, gesamt)
    base = (cap if heim else min(miete, cap)) + component(HEIZ, HEIZ_PLUS, gesamt)
    if n == gesamt:
        return base
    return (base * n / D(gesamt)).quantize(Q10, ROUND_HALF_UP)


def z4(y: int, n: int, m: D, monatseinkommen: D) -> D:
    k = min(n, 12)
    b = D(B[y].split()[k - 1]) / D(10000)
    c = D(C[y].split()[k - 1]) / D(100000)
    mm = max(m, D(MMIN[y][k - 1]))
    yy = max(monatseinkommen, D(YMIN[y][k - 1]))
    z1 = (A[k - 1] + b * mm + c * yy).quantize(Q10, ROUND_HALF_UP)
    z2 = (z1 * yy).quantize(Q10, ROUND_HALF_UP)
    return (D("1.15") * (mm - z2)).quantize(Q10, ROUND_HALF_UP)


def wohngeld(date: str, gesamt: int, n: int, stufe: int, miete: D, jahres_gesamteinkommen: D,
             heim: bool = False) -> dict:
    y = edition(date)
    m = m_value(y, gesamt, n, stufe, miete, heim)
    monat = (jahres_gesamteinkommen / D(12)).quantize(Q10, ROUND_HALF_UP)
    zz = z4(y, n, m, monat)
    w = zz.quantize(D(1), ROUND_HALF_UP)
    if n > 12:
        w = min(w + ZUSATZ[y] * (n - 12), m)
    return {"M": m, "Y": monat, "z4": zz, "W": w}


def selfcheck() -> None:
    pb, rb = D("102.50"), D("8.50")
    cases = [
        ("2023-03-01", 1, 1, 1, D(335), (D(860) - rb) * D("0.9"), 250),
        ("2023-03-01", 1, 1, 4, D(385), D(820), 263),
        ("2023-03-01", 2, 2, 2, D(480), (D(870) - rb) * D("0.9") + (D(540) - rb) * D("0.9") - 150, 336),
        ("2023-03-01", 3, 3, 6, D(650), (D(1460) - pb) * D("0.8") + 474 - 110, 428),
        ("2023-03-01", 4, 4, 7, D(770), (D(1990) - pb) * D("0.8") + 430, 518),
        ("2023-03-01", 4, 4, 3, D(580), (D(1770) - pb) * D("0.8"), 570),
        ("2023-03-01", 5, 5, 5, D(800), (D(2600) - pb) * D("0.7"), 701),
        ("2023-03-01", 6, 6, 2, D(780), (D(2500) - pb) * D("0.7") + (D(645) - rb) * D("0.9"), 625),
        ("2023-03-01", 2, 1, 4, D(570), (D(880) - rb) * D("0.9"), 181),
        ("2025-01-01", 1, 1, 1, D(335), (D(1300) - rb) * D("0.9"), 110),
        ("2025-01-01", 1, 1, 4, D(470), D(1350), 88),
        ("2025-01-01", 2, 2, 2, D(480), (D(1410) - rb) * D("0.9") + (D(540) - rb) * D("0.9") - 150, 166),
        ("2025-01-01", 3, 3, 6, D(700), (D(1530) - pb) * D("0.8") + 696 - 110, 372),
        ("2025-01-01", 4, 4, 7, D(1225), (D(2490) - pb) * D("0.7") + 556, 691),
        ("2025-01-01", 4, 4, 3, D(580), (D(2240) - pb) * D("0.8"), 485),
        ("2025-01-01", 5, 5, 5, D(870), (D(2750) - pb) * D("0.7"), 747),
        ("2025-01-01", 6, 6, 2, D(780), (D(4000) - pb) * D("0.7") + (D(645) - rb) * D("0.9"), 343),
        ("2025-01-01", 2, 1, 4, D(570), (D(880) - rb) * D("0.9"), 191),
    ]
    for date, gesamt, n, stufe, miete, monat, expected in cases:
        got = wohngeld(date, gesamt, n, stufe, miete, monat * 12)["W"]
        assert got == expected, (date, gesamt, stufe, got, expected)


if __name__ == "__main__":
    selfcheck()
    print("reference_calc: 18 арендных примеров BMWSB воспроизведены")
