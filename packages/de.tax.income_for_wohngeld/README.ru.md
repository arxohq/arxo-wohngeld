# `de.tax.income_for_wohngeld` — нормы EStG, которые читает Wohngeld

Паспорт области. Составлен ДО реализации (15.09.2026) по закреплённым текстам
и официальным примерам BMWSB; сужать его постфактум ради зелёных сценариев
нельзя — любое сужение записывается здесь с причиной и датой.

## Зачем отдельный пакет

§ 14 Abs. 1 S. 1 WoGG строит годовой доход домохозяйства из «положительных
Einkünfte im Sinne des § 2 Abs. 1 und 2 des Einkommensteuergesetzes». Это
отсылка к ДРУГОМУ акту, и классификация дохода (вид дохода, Einnahmen,
Werbungskosten, паушальные вычеты) — налоговая квалификация, а не жилищная.
Поэтому она живёт в пакете EStG, а `de.social.wohngeld` его импортирует.
Обратной стрелки нет: EStG о Wohngeld ничего не знает.

Разделение трёх слоёв — требование набора:

| Слой | Что это | Где |
|---|---|---|
| исходные факты | брутто-зарплата, фактически понесённые Werbungskosten, годовая сумма пенсии, её облагаемая часть по уведомлению, сумма ALG I, паушально обложенная зарплата мини-джоба | `kind empirical`, подаются делом |
| юридическая квалификация | вид дохода § 2 Abs. 1 S. 1 Nr. 4 и Nr. 7, Lohnersatzleistung § 32b, паушальное обложение § 40a | правила пакета |
| вычисленные суммы | Einkünfte = Einnahmen − Werbungskosten (§ 2 Abs. 2 S. 1 Nr. 2) с паушалями § 9a | правила пакета, параметры A3 |

Готовая «сумма учитываемого дохода» входом НЕ принимается ни здесь, ни в WoGG.

## Что входит

| Положение | Содержание | Форма |
|---|---|---|
| § 2 Abs. 1 S. 1 Nr. 4, Nr. 7 | виды дохода: nichtselbständige Arbeit, sonstige Einkünfte § 22 | правила квалификации |
| § 2 Abs. 2 S. 1 Nr. 2 | Einkünfte = Überschuss der Einnahmen über die Werbungskosten | правило-вычисление |
| § 8 Abs. 1 | Einnahmen — блага в деньгах | факт брутто-зарплаты в деньгах |
| § 19 Abs. 1 S. 1 Nr. 1 | Gehälter, Löhne — Einnahmen aus nichtselbständiger Arbeit | правило квалификации |
| § 9 Abs. 1 S. 1 | Werbungskosten — расходы на получение дохода | факт «nachgewiesene Werbungskosten» |
| § 9a S. 1 Nr. 1 Buchst. a | Arbeitnehmer-Pauschbetrag 1 230 € с 01.01.2023: JStG 2022, BGBl. I 2022 S. 2294, Art. 4 Nr. 3 («Angabe „1 200 Euro“ durch die Angabe „1 230 Euro“»), в силе по Art. 13 Abs. 1 с 01.01.2023; тот же текст в сводной редакции 2026 года | параметр A3 `ArbeitnehmerPauschbetrag` |
| § 9a S. 1 Nr. 3 | Pauschbetrag 102 € для Einnahmen § 22 Nr. 1 | параметр A3 `PauschbetragSonstigeEinkuenfte` |
| § 9a S. 1 (вводная часть) | паушаль — только «wenn nicht höhere Werbungskosten nachgewiesen werden» | правило выбора большего |
| § 9a S. 2 | паушали Nr. 1 a и Nr. 3 — не выше Einnahmen | ограничение в функции |
| § 22 Nr. 1 S. 3 Buchst. a Doppelbuchst. aa | Leibrenten из gesetzliche Rentenversicherung: облагается «der der Besteuerung unterliegende Anteil» | факт годовой суммы и облагаемой части |
| § 32b Abs. 1 S. 1 Nr. 1 Buchst. a | Arbeitslosengeld по SGB III — Lohnersatzleistung | правило квалификации |
| § 40a Abs. 2 | паушальный налог работодателя на мини-джоб | факт паушального обложения + квалификация |

Ось времени: суммы — годовые («Die Einkommensteuer ist eine Jahressteuer»,
§ 2 Abs. 7); паушали выбираются по `legal_time` дела. Для Wohngeld это
месяц, за который считается пособие: WoGG § 15 Abs. 1 берёт доход,
ожидаемый в Bewilligungszeitraum, и значение паушаля — того года.

Покрытие паушалей начинается 01.01.2023 — днём, с которого действуют обе
редакции WoGG набора. Прежнее значение 1 200 € (Steuerentlastungsgesetz 2022,
Art. 2 Nr. 2) в покрытие не взято: статья вступила в силу 28.05.2022, а на весь
Veranlagungszeitraum 2022 её распространяет § 52 Abs. 1 EStG в редакции 2022
года, текст которой не закреплён. Вне покрытия — `MISSING_PARAMETER_VALUE`, а
не 0.

## Что не входит и почему

- Gewinneinkunftsarten (§ 2 Abs. 1 S. 1 Nr. 1–3), Kapitalvermögen (Nr. 5),
  Vermietung und Verpachtung (Nr. 6): самозанятость и имущественный доход
  вне первого выпуска набора.
- Прочие случаи § 22 (Nr. 1a, 2, 3, 4, 5), Versorgungsbezüge § 19 Abs. 2 с
  Versorgungsfreibetrag и Pauschbetrag § 9a S. 1 Nr. 1 Buchst. b.
- **Расчёт облагаемой части пенсии** по таблице § 22 Nr. 1 S. 3 Buchst. a
  Doppelbuchst. aa (Besteuerungsanteil по году начала пенсии и
  Rentenfreibetrag): таблица менялась (Wachstumschancengesetz) и требует
  исторических сумм пенсии; облагаемая часть подаётся делом как
  установленная величина. Граница названа; сама квалификация и вычет 102 €
  исполнимы.
- Состав Werbungskosten по § 9 Abs. 1 S. 3 Nr. 1–7, Abs. 2–6
  (Entfernungspauschale и т. п.): дело подаёт итог «nachgewiesene
  Werbungskosten».
- § 9a S. 3 (Beiträge an Gewerkschaften neben den Pauschbeträgen) — есть в
  закреплённой сводной редакции 2026 года, дата вступления по первичному
  тексту не установлена; дело с профсоюзными взносами вне области.
- Sachbezüge § 8 Abs. 2–4, steuerfreie Einnahmen § 3 (кроме того, что WoGG
  сам добавляет по § 14 Abs. 2), прочие Lohnersatzleistungen § 32b
  (Krankengeld, Elterngeld, Kurzarbeitergeld …), ausländische Einkünfte.
- Сам налог: тариф, Sonderausgaben, zu versteuerndes Einkommen — Wohngeld их
  не читает.

## Источники

- EStG, сводный текст gesetze-im-internet.de (build 2026-08-04, «zuletzt
  geändert durch Art. 7 G v. 29.6.2026 I Nr. 197»), `sources/gii/`.
  Неофициальная сводка: байты портала, не BGBl.
- BGBl. I 2022 Nr. 51 (Jahressteuergesetz 2022) — копия OffeneGesetze.de,
  `sources/bgbl/`.
- Хэши — `sources/PINS.sha256`; получение —
  `corpus/tools/sources/fetch/fetch_de_wohngeld_texts.py`.

`verifiedAgainstSource = false`: суммы паушалей сверены с текстом выпусков
BGBl, но выпуски до 2023 года закреплены копией, а сводный текст — выдача
портала.
