# Матрица покрытия `de.social.wohngeld_verordnung`

| Источник / положение | Реализация | Проверки | Границы |
|---|---|---|---|
| § 1 Abs. 1 | анкер `AusgewieseneHeizkostenBleibenAusserBetracht` | tests «Umlage für zentrale Heizungsanlage» | — |
| § 1 Abs. 3 + Anlage, Vorbemerkung | `mietenstufe_anfrage`, `mietenstufe_anfrage_kreis`, `GemeindeGesondertAufgefuehrt`; подстановка Kreis — в WoGG (`MietenstufeDesKreises`) | tests WoGV-01…07; WoGG grenzen «Tarp», «gesondert aufgeführte Gemeinde», «Helgoland» | принадлежность Gemeinde к Kreis — факт дела |
| Anlage: Gemeinden 16 земель, Kreise, «Inseln ohne Festlandanschluss» | `20-anlage-mietenstufen.law`: 111 порождённых правил на 1 881 строку (группы Land × раздел × ступень), анкер — фрагмент раздела `WOGV_ANLAGE_<Land>_<GEMEINDE/KREIS>` | WoGV-01 Weimar III, WoGV-02 Leipzig Stadt II / Kreis I, WoGV-03 опечатка, WoGV-06 острова; все 18 примеров BMWSB через WoGG | генератор сверяет портал с BGBl. I 2022 S. 2166 ff. + 13. ÄndVO |
| 13. ÄndVO (BGBl. 2023 I Nr. 102): 18 вставок, 1 исключение, «mit Wirkung vom 1. Januar 2023» | те же строки в таблице; фрагмент `AENDVO13_INKRAFT` | WoGV-04 «Bad Schönborn» на 01.01.2023; WoGV-05 «Coesfeld» исключён | — |
| 2. WoGFV Art. 2 (оглавление, § 20, Teil 5) | фрагмент `ZWEITE_WOGFV_ART2_WOGV` — основание неизменности Anlage | — | Teil 5, § 20 не моделируются |
| § 2 Abs. 1 | `ZahlungAnDritteGehoertZurMiete` | WoGV-13; WoGG freibetraege «594 EUR» | — |
| § 2 Abs. 2 | модель: вычеты только по § 9 Abs. 2 WoGG | — (свойство модели) | § 5 (Erfahrungswerte) — вне |
| § 6 Abs. 1 Nr. 1, 2 | `Heizkostenposition*` (7), `Waermelieferung*` (3), `AusgewieseneHeizkostenBleibenAusserBetracht` | WoGV-08, WoGV-09 | номера BetrKV — перечисление; текст BetrKV не закреплён |
| § 6 Abs. 2 Nr. 1–4 | `PauschbetragZentralheizung`, `PauschbetragWarmwasser`, `PauschbetragHaushaltsenergie`, `PauschbetragGarage`, `PauschbetragStellplatz` | WoGV-10 (78,125), WoGV-11-1/2/3 (9/17/20), WoGV-12-1/2/4 (41/74/104), WoGV-13, WoGV-14 (нет площади — нет суммы) | Nr. 5 § 9 Abs. 2 WoGG без Pauschbetrag; § 6 Abs. 3 |
| §§ 3, 4, 5, 7–22 | — | — | вне области (README) |
| до 01.01.2023 | окно редакции `WOGV_ED2023` | WoGV-07 `EDITION_NOT_APPLICABLE` | прежние Anlagen не закреплены |
