# Матрица покрытия `de.social.wohngeld`: источник → положение → реализация → проверки → границы

Фрагменты сводного текста (`WOGG_*_ED2023/ED2025/ED2026`) порождает
`corpus/tools/sources/sync/sync_de_wohngeld.py`; каждое правило анкерено во все
три редакции. Файлы сценариев — `tests/`: `bmwsb-2023`, `bmwsb-2025`,
`grenzen`, `redaktionen`, `tatsachen`, `ausschluss-und-urteil`,
`freibetraege`, `rechner-2025`.

| Источник / положение | Реализация (правило, параметр) | Проверки | Границы |
|---|---|---|---|
| § 1 Abs. 2 | `AusserhalbLastenzuschuss` | ausschluss-und-urteil «Lastenzuschuss» | Lastenzuschuss вне области |
| § 3 Abs. 1 S. 1; S. 2 Nr. 1, 3 | `mietzuschuss_grundlage` (3 правила), `WohngeldberechtigtNichtAusgeschlossen` | все BMWSB; «Heim» | S. 2 Nr. 2 → `AusserhalbMietwert` |
| § 3 Abs. 3 | факт `wohngeldantrag` (заявитель назначен) | все сценарии | выбор между несколькими — факт дела |
| § 3 Abs. 4 | `WohngeldberechtigtTrotzAusschluss` | «§ 3 Abs. 4» (191 €) | — |
| § 3 Abs. 5 S. 1–2 | `AufenthaltsstatusNachDreiFuenf*` (6), `KeineAuslaendischePerson`, `AuslaendischePersonMitStatus`, `AusserhalbMitbewohnerBefreit` | «§ 3 Abs. 5 S. 1 Nr. 2»; «ohne tatsächlichen Aufenthalt» | S. 3 («in der Regel») → `AusserhalbAufenthaltstitelSatzDrei` |
| § 4 | структура; `AnzahlZuBeruecksichtigenderHaushaltsmitglieder` | все | — |
| § 5 Abs. 1 S. 1 | `AntragstellerIstHaushaltsmitglied` | все | — |
| § 5 Abs. 1 S. 2 Nr. 1, 2, 4, 5, 6; Abs. 3 | `AngehoerigerIstHaushaltsmitglied` (рекурсия `monotone`) | BMWSB (супруги, дети, тёща/свекровь через супруга) | § 5 Abs. 4 (Wechselmodell) — вне |
| § 5 Abs. 1 S. 2 Nr. 3 | `GewuerdigteVerantwortungsgemeinschaftIstHaushaltsmitglied` + `external judgment relation verantwortungs_und_einstehensgemeinschaft` (Wohngeldbehörde) | «Partner … Würdigung verlangt» (REQUIRES_JUDGMENT + judgment_request), «Behörde bejaht» | — |
| § 5 Abs. 2 | `VerantwortungsgemeinschaftVermutet`, `VermutungstatbestandGeprueft`, `VermuteteVerantwortungsgemeinschaftIstHaushaltsmitglied` | «Vermutungstatbestand erfüllt» | опровержение — установленный факт `widerlegt: JA` |
| § 6 Abs. 1 | `ZuBeruecksichtigendesHaushaltsmitglied`, `HaushaltFestgestellt` | «Status offen», «Mitbewohner ohne Beziehung» | § 6 Abs. 2 — вне |
| § 7 Abs. 1 S. 1 Nr. 1–9, S. 2 | `AusschliessendeLeistung*` (8), `AusschlussEmpfaengerMitKostenDerUnterkunft`, `LeistungOhneKostenDerUnterkunft` | «alleinstehender Empfänger», «ohne KdU», BMWSB № 10 | § 7 Abs. 1 Nr. 3 weggefallen |
| § 7 Abs. 1 S. 3 Nr. 1–2; Abs. 2 | `KeinAusschlussBeiDarlehen`, `KeinAusschlussBeiVermeidbarerHilfebeduerftigkeit`, `AusschlussBeiLeistungEinesAnderenBeruecksichtigt` | «Darlehen» | Nr. 2 — факт решения другого органа |
| § 8 Abs. 2 | `VerzichtHebtAusschlussAuf` | «Verzicht» | § 8 Abs. 1 (сроки по месяцам) — вне |
| § 9 Abs. 1, 2; WoGV §§ 2, 6 | `MieteNachNeun`, `UmlageAbzug`, `KostenAbzug`, `PauschbetragAbzug`, `DritteZuschlag`, `Nullposten*`, `AbzuegeVonDerMiete`, `ZahlungenAnDritte` | freibetraege «§ 9 Abs. 1, 2 mit §§ 2, 6 WoGV» (594 €) | Zusatzleistungen без Pauschbetrag WoGV; WoGV §§ 3–5 |
| § 9 Abs. 3 S. 2; § 11 Abs. 1 S. 2 | `ZuBeruecksichtigendeMieteImHeim` | «Heim» (585,60), rechner r09 | S. 1 (Mietwert) — вне |
| § 11 Abs. 1 S. 1 | `ZuBeruecksichtigendeMiete` (min(Miete, HB + K) + H) | grenzen «Höchstbetrag 475,19 / 475,20 / 475,21»; BMWSB № 6 | — |
| § 11 Abs. 2 Nr. 1–5 | — | — | вне области (флаг для не-членов) |
| § 11 Abs. 3 | функция `anteil` (10 знаков, HALF_UP — прочтение Anlage 3 Nr. 2) | BMWSB № 10 (оба года), «M-Minimum», rechner r10 | способ приведения к 10 знакам — прочтение, названо |
| § 12 Abs. 1 + Anlage 1 | `HoechstbetragMitKlimakomponente`, `hoechstbetrag*`; 42 параметра `HoechstbetragMitglieder{n}Mietenstufe{S}`, `HoechstbetragMehrbetragMietenstufe{S}` | BMWSB 2025 (HB+K), redaktionen «Höchstbetrag 31.12.2024», rechner r05–r07 (сверх пяти) | покрытие [2023-01-01, 2027-01-01) |
| § 12 Abs. 4a | `InselOhneFestlandanschluss01…28`, `MietenstufeInselnOhneFestlandanschluss` | grenzen «Helgoland» | — |
| § 12 Abs. 5 + Anlage WoGV | `AnlageFuerWohnortAnwenden`, `AnlageFuerKreisAnwenden`, `MietenstufeGesondertAufgefuehrteGemeinde`, `MietenstufeDesKreises`, `MietenstufeNummer{1…7}IstStufe*` | grenzen «Tarp (Kreis)», «gesondert aufgeführte Gemeinde»; tatsachen «ohne Wohnort» | Mietenniveau (§ 12 Abs. 2–4) — вне |
| § 12 Abs. 6, 7 | `Heizkostenentlastung`; параметры `HeizkostenentlastungMitglieder{1…5}`, `…Mehrbetrag`, `KlimakomponenteMitglieder{1…5}`, `…Mehrbetrag` | все BMWSB 2025 (M), «13 Mitglieder» | — |
| § 13 Abs. 1, 2 | `Gesamteinkommen`, `JahreseinkommenBestimmt`, `KeineWeiterenAbzuege`, `MonatlichesGesamteinkommen` | все BMWSB (Y) | — |
| § 14 Abs. 1 S. 1, 4 (+ EStG) | `PositiveEinkuenfteNichtselbstaendigeArbeit`, `PositiveSonstigeEinkuenfteLeibrente` | BMWSB № 1, 3, 5–9 | прочие Einkunftsarten — вне |
| § 14 Abs. 1 S. 3 Nr. 2 | `PauschalBesteuertesArbeitsentgelt` | BMWSB № 6, 8; freibetraege «Kind 24/25» | S. 3 Nr. 1 (§ 37b) — вне |
| § 14 Abs. 2 Nr. 3, 6, 21 | `NichtBesteuerterTeilDerLeibrente`, `Lohnersatzleistung`, `Unterhaltsvorschuss` | BMWSB № 1–3, 5, 9, 10; BMWSB 2025 № 1 «Anteil 50 %» | прочие Nr. — вне; облагаемая часть пенсии — факт |
| § 14/§ 15 полнота | `KeineWeiterenEinnahmen`, `ArbeitslohnOhneBetrag`, `LeibrenteOhneBetrag`, `PauschalLohnOhneAufwendungen`, `SummeEinnahmen14` | tatsachen «Arbeitslohn ohne Werbungskosten» | § 15 Abs. 2–4 — вне |
| § 16 S. 1–4 | `Jahreseinkommen`, функция `abzugsfaktor_16` | BMWSB (0/10/20/30 %) | S. 5 — вне |
| § 17 Nr. 1 a, b | `FreibetragSchwerbehinderungGradHundert`, `FreibetragSchwerbehinderungMitPflege` | BMWSB № 3; freibetraege «GdB 80 mit/ohne Pflege», «GdB 100» | — |
| § 17 Nr. 2 | `FreibetragNsVerfolgung` | freibetraege «Opfer der NS-Verfolgung — 750 EUR» | — |
| § 17 Nr. 3 | `FreibetragAlleinerziehend` | BMWSB № 5; freibetraege «Kind 17/18», «mit Oma» | — |
| § 17 Nr. 4 | `ErwerbseinnahmeArbeitslohn`, `ErwerbseinnahmePauschalBesteuert`, `FreibetragErwerbseinkommenKind` | BMWSB № 8; freibetraege «Kind 24/25»; rechner r13, r14 | — |
| § 17a | — | — | вне (Grundrente) |
| § 18 S. 1 Nr. 1–4, S. 2 | `AbzugUnterhaltOhneTitel`, `AbzugUnterhaltMitTitel`, `unterhalt_hoechstbetrag` | freibetraege «Nr. 3 7 000 → 6 000», «Titel 6 500», «Nr. 4 3 500 → 3 000» | — |
| § 19 Abs. 1, 2 + Anlagen 2, 3 | `MNachAnlageDrei`, `YNachAnlageDrei`, `WohngeldUngerundet`, `WohngeldGerundetBisZwoelf`; функции `z4_berechnen`, `wert_a/b/c`, `mindestwert_m/y`; параметры `WertA/B/CMitglieder{1…12}`, `MindestwertM/YMitglieder{1…12}`, `FormelFaktor` | все BMWSB; grenzen «Rundung 143,4999… → 143», «194,5001… → 195», «Y-Minimum», «M-Minimum»; redaktionen | десять знаков HALF_UP — прочтение |
| § 19 Abs. 3 | `WohngeldUeberZwoelfMitglieder`; параметр `ZusatzbetragJeWeiteresMitglied` (57 / 65) | grenzen «13 Mitglieder» на обе даты | — |
| § 20 Abs. 2 S. 1–3 | `AusbildungsfoerderungSchliesstAus`, `KeinAusschlussNachZwanzig*` | «Ausbildungsförderung» | S. 4 — вне |
| § 21 Nr. 1 | `WenigerAlsZehnEuro` | grenzen «10 EUR / 9 EUR» | — |
| § 21 Nr. 2 | `AlleHaushaltsmitgliederAusgeschlossen` | «alleinstehender Empfänger» | — |
| § 21 Nr. 3 | `MissbraeuchlicheInanspruchnahme`, `Wohngeldanspruch` + `external judgment relation missbraeuchliche_inanspruchnahme` | «ohne Würdigung» (REQUIRES_JUDGMENT, judgment_request), «Behörde verneint», «Behörde bejaht» | «soweit» (частичное злоупотребление) — ответ органа булев |
| § 42d, § 43 Abs. 1, § 44 Abs. 1 | окна параметров A3 | redaktionen (6 сценариев) | после 01.01.2027 — `MISSING_PARAMETER_VALUE` |
| BMWSB Rechenbeispiele 2023/2025 | фрагменты `BMWSB_2023_BSP*`, `BMWSB_2025_BSP*` | bmwsb-2023 (9), bmwsb-2025 (10) | № 4, № 11 — Lastenzuschuss |
| BMWSB Wohngeldrechner 2025 | фрагмент `RECHNER_2025_BERECHNUNG`; `tools/run_rechner.js` | rechner-2025 (12) | расхождение r14 квалифицировано; калькулятора 2023 нет |

## Находки по ядру и инструментам (переданы координатору, ядро не менялось)

1. **Запрос суждения с аргументом не того типа.** Правило `when f(x, y) and j(x, y)`
   с `external judgment relation j(x: P, y: P)` при отсутствии фактов `f` даёт
   `REQUIRES_JUDGMENT` (это по E-0101: неопределённый конъюнкт правило не убивает),
   но `JudgmentRequest` перечисляет `y` по активному домену дела и подставляет
   `Money` в позицию типа `P` (`j(a, 500 EUR)`). Обе реализации совпадают.
   Минимальный пример (пакет из трёх деклараций и одного правила):
   `entity P; relation f(x: P, y: P) kind empirical; relation betrag(x: P, b: Money) kind empirical;
   external judgment relation j(x: P, y: P) { authority Behoerde; }` и
   `rule R(x: P, y: P) strict { when f(x, y) and j(x, y); then g(x); }`; дело — один факт
   `betrag(a, 500.00 EUR)`; вопрос `truth(g(a))` → `REQUIRES_JUDGMENT`, запросы `j(a, 500 EUR)`.
2. **`if` с `count(...) == 0` в голове правила** понижается так, что исполнение
   даёт `TYPE_ERROR` («терм 'entity_ref' вне v1-подмножества», поле
   `rule.head.args1.condition`). Обход: нулевые позиции по объявлению полноты.
3. **Таблица A3 в `mode: rules` не читается из `.law` без `<table-id>/input`**,
   а `mode: function` не вызывается по имени (`LDC-E2105`). Поэтому Anlage WoGV —
   порождённые правила с запросом `mietenstufe_anfrage`, а не `.lawtable.json`.
4. **Производительность оракула.** 1 881 правило без посылок в мире давало
   15–35 с на вычисление (канонизация программы и proof-графа); группировка строк
   по (Land, раздел, ступень) и запрос по Wohnort — ~2 с после разогрева.
