# Матрица покрытия `de.tax.income_for_wohngeld`

| Источник / положение | Реализация | Проверки | Границы |
|---|---|---|---|
| § 19 Abs. 1 S. 1 Nr. 1, § 8 Abs. 1 S. 1 | `EinnahmenAusNichtselbstaendigerArbeit` (факт `arbeitslohn_in_geld`) | EStG-01…09; BMWSB (WoGG) | Sachbezüge § 8 Abs. 2–4, Versorgungsbezüge § 19 Abs. 2 |
| § 9 Abs. 1 S. 1 | факт `nachgewiesene_werbungskosten_arbeit` / `…_sonstige` | EStG-02, 04, 06 | состав расходов § 9 Abs. 1 S. 3, Abs. 2–6 |
| § 9a S. 1 Nr. 1 Buchst. a | `WerbungskostenabzugArbeit`, функция `abzug_werbungskosten`, параметр `ArbeitnehmerPauschbetrag` (1 230 € с 01.01.2023; JStG 2022 Art. 4 Nr. 3) | EStG-01, 03/04 (1 230,00 / 1 230,01), 07 (01.01.2023), 08 (31.12.2022 — вне редакции) | 1 200 € (2022) не взято: § 52 Abs. 1 EStG 2022 не закреплён |
| § 9a S. 1 Nr. 3 | `WerbungskostenabzugSonstige`, параметр `PauschbetragSonstigeEinkuenfte` (102 €) | EStG-10, 11; BMWSB пенсии (WoGG) | значение закреплено по сводному тексту 2026; неизменность с 2023 — по истории § 9a (JStG 2022, StÄndG 2025 S. 3) |
| § 9a S. 2 | ограничение `min(pauschbetrag, einnahmen)` | EStG-05, 11 | — |
| § 2 Abs. 1 S. 1 Nr. 4, Abs. 2 S. 1 Nr. 2 | `EinkuenfteAusNichtselbstaendigerArbeit` | EStG-01…07 | — |
| § 2 Abs. 1 S. 1 Nr. 7; § 22 Nr. 1 S. 3 Buchst. a Doppelbuchst. aa | `EinnahmenLeibrente`, `SonstigeEinkuenfteLeibrente` | EStG-10, 11 | таблица Besteuerungsanteil не моделируется: облагаемая часть — факт |
| § 32b Abs. 1 S. 1 Nr. 1 Buchst. a | `ArbeitslosengeldIstLohnersatzleistung` | EStG-12; BMWSB № 2 (WoGG) | прочие Lohnersatzleistungen |
| § 40a Abs. 2, 5; § 40 Abs. 3 S. 3 | `PauschalBesteuertesArbeitsentgelt` | EStG-12 (не входит в Einkünfte); BMWSB № 6, 8 (WoGG) | § 40a Abs. 1, 2a, 3, 7 |
| § 9a S. 3 (с 01.01.2026) | — | — | вне области |
| прочие виды дохода § 2 Abs. 1 S. 1 Nr. 1–3, 5, 6 | — | — | вне области |
