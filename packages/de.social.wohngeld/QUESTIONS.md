# Вопросы к пакету `de.social.wohngeld`

<!-- Порождено из analysis/questions.json: python3 verify/ci/gates/coverage/check_package_questions.py --emit. Не править руками. -->

Каталог **предусмотренных** запросов §172 и того, чем каждый проверен (DECISION-0190). Карточка не означает положительного ответа по делу: ответ даёт только evaluation-документ с доказательством. Отсутствие карточки означает «не описано каталогом», а не «право молчит».

## BMWSB_2023_BSP1

Единицы источника: BMWSB_2023_BSP1.

- **Не отвечает:** Покрывает ли пакет весь акт — значит ли отсутствие карточки, что право молчит? — норма есть в тексте, правил ещё нет (BMWSB_2023_BSP1). Правила заведены у 114 закреплённых фрагментов из 167: остальные закреплены байтами публикации, но исполняемых норм не несут. Отсутствие карточки означает «в модели нормы нет», а не «право молчит».
- **Не отвечает:** Можно ли спросить вывод, у которого нет порождённого сценария? — ограничение языка или движка (BMWSB_2023_BSP1). 5 выводов пакета остались без исполнимого свидетельства: их посылки содержат дизъюнкцию, текстовое значение или вызов терма, либо голова вычисляемая. Такие выводы записаны в internal и станут карточками вместе со сценариями, написанными руками.
- **Не отвечает:** Видны ли обязанности, запреты и правомочия пакета в positions? — норма есть в тексте, правил ещё нет (BMWSB_2023_BSP1). Деонтических позиций (§§122–140) пакет не объявляет: требования выражены институциональными предикатами, и запрос positions по ним не отвечает.

## WOGG_18_ED2023

Единицы источника: WOGG_18_ED2023.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `abzug-13` | Установлено ли, что «abzug_13» (h: Haushalt h, grund: Abzugsgrund grund, лицо: Person person, betrag: денежная сумма betrag)? | truth | `abzug_13(h: Haushalt, grund: Abzugsgrund, person: Person, betrag: Money)` | `evaluate truth(abzug_13(<h>, <grund>, <person>, <betrag>));` | — | тестов 8 |

## WOGG_21_ED2023

Единицы источника: WOGG_21_ED2023.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `kein-wohngeldanspruch` | Установлено ли, что «kein_wohngeldanspruch» (h: Haushalt h, grund: KeinAnspruchGrund grund)? | truth | `kein_wohngeldanspruch(h: Haushalt, grund: KeinAnspruchGrund)` | `evaluate truth(kein_wohngeldanspruch(<h>, <grund>));` | — | тестов 5 |
| `wohngeldanspruch` | Установлено ли, что «wohngeldanspruch» (h: Haushalt h, betrag: денежная сумма betrag)? | truth | `wohngeldanspruch(h: Haushalt, betrag: Money)` | `evaluate truth(wohngeldanspruch(<h>, <betrag>));` | — | тестов 11 |

## WOGG_3_ABS5_ED2023

Единицы источника: WOGG_3_ABS5_ED2023.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `ausserhalb-des-modells` | Установлено ли, что «ausserhalb_des_modells» (h: Haushalt h, grund: AusserhalbGrund grund)? | truth | `ausserhalb_des_modells(h: Haushalt, grund: AusserhalbGrund)` | `evaluate truth(ausserhalb_des_modells(<h>, <grund>));` | — | тестов 1 |

## Выводимое без собственной карточки

Звенья вывода: спрашиваются через карточки выше, названы здесь ради полноты поверхности в обе стороны.

| предикат | почему без карточки |
|---|---|
| `dritte_zuschlag` | Вывод без исполнимого свидетельства: посылки правила содержат формы, которых порождённый сценарий не строит (дизъюнкция, текстовое значение или вызов терма), либо голова вычисляемая. Карточка появится вместе со сценарием, написанным руками. |
| `einnahmeposten_14` | Вывод без исполнимого свидетельства: посылки правила содержат формы, которых порождённый сценарий не строит (дизъюнкция, текстовое значение или вызов терма), либо голова вычисляемая. Карточка появится вместе со сценарием, написанным руками. |
| `kosten_abzug` | Вывод без исполнимого свидетельства: посылки правила содержат формы, которых порождённый сценарий не строит (дизъюнкция, текстовое значение или вызов терма), либо голова вычисляемая. Карточка появится вместе со сценарием, написанным руками. |
| `pauschbetrag_abzug` | Вывод без исполнимого свидетельства: посылки правила содержат формы, которых порождённый сценарий не строит (дизъюнкция, текстовое значение или вызов терма), либо голова вычисляемая. Карточка появится вместе со сценарием, написанным руками. |
| `umlage_abzug` | Вывод без исполнимого свидетельства: посылки правила содержат формы, которых порождённый сценарий не строит (дизъюнкция, текстовое значение или вызов терма), либо голова вычисляемая. Карточка появится вместе со сценарием, написанным руками. |
| `abzuege_von_der_miete` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (MieteNachNeun); самостоятельным вопросом к пакету он не является. |
| `anzahl_zu_beruecksichtigende_haushaltsmitglieder` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AlleHaushaltsmitgliederAusgeschlossen, Gesamteinkommen, MNachAnlageDrei…); самостоятельным вопросом к пакету он не является. |
| `aufenthaltsvoraussetzung_3_abs5_status` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AuslaendischePersonMitStatus); самостоятельным вопросом к пакету он не является. |
| `aufenthaltsvoraussetzung_erfuellt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AngehoerigerIstHaushaltsmitglied, AntragstellerIstHaushaltsmitglied, GewuerdigteVerantwortungsgemeinschaftIstHaushaltsmitglied…); самостоятельным вопросом к пакету он не является. |
| `aufwendungen_40a_bestimmt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (PauschalLohnOhneAufwendungen); самостоятельным вопросом к пакету он не является. |
| `ausschliessende_leistung` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AusschlussEmpfaengerMitKostenDerUnterkunft, LeistungOhneKostenDerUnterkunft); самостоятельным вопросом к пакету он не является. |
| `ausschlussstatus_bestimmt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (HaushaltFestgestellt); самостоятельным вопросом к пакету он не является. |
| `einkommensangabe_unvollstaendig` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (SummeEinnahmen14); самостоятельным вопросом к пакету он не является. |
| `einkuenfte_arbeit_bestimmt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (ArbeitslohnOhneBetrag); самостоятельным вопросом к пакету он не является. |
| `erwerbseinnahme` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (FreibetragErwerbseinkommenKind); самостоятельным вопросом к пакету он не является. |
| `gesamteinkommen` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (MonatlichesGesamteinkommen, YNachAnlageDrei); самостоятельным вопросом к пакету он не является. |
| `gesamtzahl_haushaltsmitglieder` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (Heizkostenentlastung, HoechstbetragMitKlimakomponente, ZuBeruecksichtigendeMiete…); самостоятельным вопросом к пакету он не является. |
| `haushalt_festgestellt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AnzahlZuBeruecksichtigenderHaushaltsmitglieder, GesamtzahlHaushaltsmitglieder); самостоятельным вопросом к пакету он не является. |
| `haushaltsmitglied` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AlleHaushaltsmitgliederAusgeschlossen, AngehoerigerIstHaushaltsmitglied, FreibetragAlleinerziehend…); самостоятельным вопросом к пакету он не является. |
| `heizkostenentlastung` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (ZuBeruecksichtigendeMiete, ZuBeruecksichtigendeMieteImHeim); самостоятельным вопросом к пакету он не является. |
| `hoechstbetrag_mit_klimakomponente` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (ZuBeruecksichtigendeMiete, ZuBeruecksichtigendeMieteImHeim); самостоятельным вопросом к пакету он не является. |
| `insel_ohne_festlandanschluss` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (MietenstufeDesKreises, MietenstufeInselnOhneFestlandanschluss); самостоятельным вопросом к пакету он не является. |
| `jahreseinkommen` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (Gesamteinkommen, JahreseinkommenBestimmt); самостоятельным вопросом к пакету он не является. |
| `jahreseinkommen_bestimmt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (Gesamteinkommen); самостоятельным вопросом к пакету он не является. |
| `kein_ausschluss_nach_20` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (Wohngeldanspruch); самостоятельным вопросом к пакету он не является. |
| `m_nach_anlage3` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (WohngeldUngerundet); самостоятельным вопросом к пакету он не является. |
| `miete_aus_vertrag_grundlage` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (ZuBeruecksichtigendeMiete); самостоятельным вопросом к пакету он не является. |
| `miete_nach_9` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (ZuBeruecksichtigendeMiete); самостоятельным вопросом к пакету он не является. |
| `mietenstufe` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (HoechstbetragMitKlimakomponente, MietenstufeDesKreises, MietenstufeGesondertAufgefuehrteGemeinde…); самостоятельным вопросом к пакету он не является. |
| `mietenstufe_nummer` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (MietenstufeNummer1IstStufeI, MietenstufeNummer2IstStufeII, MietenstufeNummer3IstStufeIII…); самостоятельным вопросом к пакету он не является. |
| `mietzuschuss_grundlage` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (WohngeldberechtigtNichtAusgeschlossen, WohngeldberechtigtTrotzAusschluss, ZuBeruecksichtigendeMiete); самостоятельным вопросом к пакету он не является. |
| `monatliches_gesamteinkommen` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (YNachAnlageDrei); самостоятельным вопросом к пакету он не является. |
| `nicht_vom_wohngeld_ausgeschlossen` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AusschlussstatusBestimmtNegativ, WohngeldberechtigtNichtAusgeschlossen, ZuBeruecksichtigendesHaushaltsmitglied); самостоятельным вопросом к пакету он не является. |
| `sonstige_einkuenfte_bestimmt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (LeibrenteOhneBetrag); самостоятельным вопросом к пакету он не является. |
| `summe_einnahmen_14` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (Jahreseinkommen); самостоятельным вопросом к пакету он не является. |
| `verantwortungsgemeinschaft_vermutet` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (VermuteteVerantwortungsgemeinschaftIstHaushaltsmitglied); самостоятельным вопросом к пакету он не является. |
| `vermutungstatbestand_geprueft` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (GewuerdigteVerantwortungsgemeinschaftIstHaushaltsmitglied); самостоятельным вопросом к пакету он не является. |
| `vom_wohngeld_ausgeschlossen` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AusschlussstatusBestimmtNegativ, AusschlussstatusBestimmtPositiv, WohngeldberechtigtNichtAusgeschlossen…); самостоятельным вопросом к пакету он не является. |
| `wohngeld_monatlich` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (WenigerAlsZehnEuro, Wohngeldanspruch); самостоятельным вопросом к пакету он не является. |
| `wohngeld_ungerundet` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (WohngeldGerundetBisZwoelf, WohngeldUeberZwoelfMitglieder); самостоятельным вопросом к пакету он не является. |
| `wohngeldberechtigt` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (Wohngeldanspruch, ZuBeruecksichtigendeMiete, ZuBeruecksichtigendeMieteImHeim); самостоятельным вопросом к пакету он не является. |
| `y_nach_anlage3` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (WohngeldUngerundet); самостоятельным вопросом к пакету он не является. |
| `zahlungen_an_dritte` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (MieteNachNeun); самостоятельным вопросом к пакету он не является. |
| `zu_beruecksichtigende_miete` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (MNachAnlageDrei, WohngeldUeberZwoelfMitglieder); самостоятельным вопросом к пакету он не является. |
| `zu_beruecksichtigendes_haushaltsmitglied` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (FreibetragAlleinerziehend, FreibetragErwerbseinkommenKind, FreibetragNsVerfolgung…); самостоятельным вопросом к пакету он не является. |

## Итог

Карточек 4, границ 3, внутренних звеньев 45; выводимых предикатов в CLIR 49, норм 0 — поверхность закрыта в обе стороны. Причины по конкретному делу берутся не из каталога, а из issues и why_not ответа.
