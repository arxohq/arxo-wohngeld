# `de.social.wohngeld_verordnung` — Wohngeldverordnung (WoGV)

Паспорт области. Составлен ДО реализации (15.09.2026).

## Место в наборе и направление импорта

WoGV — постановление Федерального правительства по полномочию § 38 WoGG
(Nr. 2: Mietenstufen, Nr. 3: Miete и Pauschbeträge). Делегированный акт
уточняет понятия закона, но закон при расчёте ЧИТАЕТ его: § 12 Abs. 1 WoGG
берёт Mietenstufe из Anlage WoGV, § 9 Abs. 2 S. 2 WoGG — Pauschbeträge из
§ 6 Abs. 2 WoGV. Поэтому стрелка импорта — **WoGG → WoGV**; WoGV не
импортирует WoGG и не знает его типов домохозяйства. Её словарь — собственный:
`Mietverhaeltnis` (Miet- oder mietähnliches Nutzungsverhältnis) и таблица
Mietenstufen по названиям Land/Gemeinde/Kreis. Цикл исключён построением.

## Что входит

| Положение | Содержание | Форма |
|---|---|---|
| § 1 Abs. 1, Abs. 3 | Miete определяется по Teil 2; Mietenstufen Gemeinden — из Anlage | правила-связки |
| § 2 Abs. 1 | к Miete относятся платежи третьему лицу по договору в связи с наймом | правило состава |
| § 2 Abs. 2 | иных вычетов, кроме § 9 Abs. 2 WoGG, нет | модель: вычеты только перечисленные |
| § 6 Abs. 1 Nr. 1–2 | какие Betriebskosten (по номерам § 2 BetrKV) «außer Betracht bleiben» как Heiz-/Warmwasserkosten | правила классификации по перечислению |
| § 6 Abs. 2 Nr. 1–4 | Pauschbeträge, если суммы не видны из договора: отопление 1,25 €/м², горячая вода 9/17/+3 €, Haushaltsenergie 41/74/+15 €, гараж 36 €, стоянка 25 € | правила-вычисления |
| Anlage (zu § 1 Abs. 3) | Mietenstufen всех Gemeinden и Kreise шестнадцати земель и «Inseln ohne Festlandanschluss»; правило «Soweit die zu einem Kreis gehörenden Gemeinden … nicht gesondert aufgeführt sind, gilt die Mietenstufe des Kreises» | порождённые данные + правило подстановки |

**Mietenstufen закрепляются полностью, генератором из первичного текста.**
Таблица (1 881 строка: Gemeinden, Kreise, общая ступень островов) порождается
`corpus/tools/sources/sync/sync_de_wohngeld.py` из сводного текста портала и
СВЕРЯЕТСЯ с первичным: Anlage в редакции BGBl. I 2022 S. 2166–2210 (Art. 5
Wohngeld-Plus-Gesetz) плюс 18 вставок и одно исключение 13. Verordnung zur
Änderung der WoGV (BGBl. 2023 I Nr. 102, в силе «mit Wirkung vom 1. Januar
2023»). Расхождение множеств строк останавливает генератор. Ручной подборки
строк нет.

Форма (замер 15.09.2026). Первая форма — 1 881 правило без посылок — давала
оракулу 15–35 с на одно вычисление: таблица материализовалась и канонизировалась
в proof целиком. Действующая форма: строки сгруппированы по (Land, раздел,
ступень) — 111 правил с дизъюнкцией названий, — и правило срабатывает только на
запрос `mietenstufe_anfrage(land, gemeinde)` (`…_kreis`), который пишет WoGG из
Wohnort домохозяйства; ~2 с после разогрева. Таблица A3 (`.lawtable.json`) не
взята: `mode: rules` читает внутренний предикат `<table-id>/input`, который из
`.law` не назвать, а `mode: function` не вызывается по имени (`LDC-E2105`).

Окно редакции — с 01.01.2023: Anlage с тех пор не менялась (2. WoGFV,
BGBl. 2024 I Nr. 314 Art. 2, тронула только оглавление, § 20 и Teil 5;
портал — «zuletzt geändert durch Art. 2 V v. 21.10.2024»). Mietenstufen на
2025 год те же, что на 2023 год: § 43 WoGG Fortschreibung Mietenstufen не
пересчитывает. Разница двух редакций набора живёт в WoGG (Anlagen 1–3), а не
здесь, и это видно на сценариях, а не только сказано.

Ретроактивность 13. ÄndVO — наблюдаемое свойство: вставленные строки
(например, «Bad Schönborn | IV») действуют с 01.01.2023 по оси `legal_time`,
хотя опубликованы 19.04.2023.

## Что не входит и почему

- § 3 (Mietvorauszahlungen, Mieterdarlehen), § 4 (Sach- und Dienstleistungen
  des Mieters): дело подаёт уже приведённое vereinbarte Entgelt.
- § 5 (nicht feststehende Betriebskosten → «Erfahrungswerte als
  Pauschbeträge»): величина — усмотрение органа без числа в тексте; вне
  области, а не фиктивное число.
- § 6 Abs. 2 для § 9 Abs. 2 Nr. 5 WoGG (Zusatzleistungen): Pauschbetrag
  постановлением не установлен — такое дело не считается.
- § 6 Abs. 3, § 7 (Mietwert), Teil 3 §§ 8–15 (Wohngeld-Lastenberechnung —
  Lastenzuschuss), Teil 4 §§ 16–22 (Datenabgleich).
- Способ, которым Statistisches Bundesamt определяет Mietenniveau (§ 12
  Abs. 2–4 WoGG): таблица — готовый нормативный результат.
- Принадлежность Gemeinde к Kreis — факт дела (в Anlage её нет); название
  Gemeinde дело подаёт ровно в написании Anlage («Weimar, Stadt»). Опечатка
  даёт отсутствие Mietenstufe, а не ступень по умолчанию.

## Источники

- WoGV, сводный текст портала (build 2026-05-06), `sources/gii/`.
- BGBl. I 2022 Nr. 48 (Wohngeld-Plus-Gesetz, Art. 5 — Anlage) — копия
  OffeneGesetze.de; BGBl. 2023 I Nr. 102 — официальные байты recht.bund.de.
- Хэши — `sources/PINS.sha256`.
