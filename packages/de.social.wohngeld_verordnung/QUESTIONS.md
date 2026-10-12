# Вопросы к пакету `de.social.wohngeld_verordnung`

<!-- Порождено из analysis/questions.json: python3 verify/ci/gates/coverage/check_package_questions.py --emit. Не править руками. -->

Каталог **предусмотренных** запросов §172 и того, чем каждый проверен (DECISION-0190). Карточка не означает положительного ответа по делу: ответ даёт только evaluation-документ с доказательством. Отсутствие карточки означает «не описано каталогом», а не «право молчит».

## AENDVO13_INKRAFT

Единицы источника: AENDVO13_INKRAFT.

- **Не отвечает:** Покрывает ли пакет весь акт — значит ли отсутствие карточки, что право молчит? — норма есть в тексте, правил ещё нет (AENDVO13_INKRAFT). Правила заведены у 36 закреплённых фрагментов из 40: остальные закреплены байтами публикации, но исполняемых норм не несут. Отсутствие карточки означает «в модели нормы нет», а не «право молчит».
- **Не отвечает:** Видны ли обязанности, запреты и правомочия пакета в positions? — норма есть в тексте, правил ещё нет (AENDVO13_INKRAFT). Деонтических позиций (§§122–140) пакет не объявляет: требования выражены институциональными предикатами, и запрос positions по ним не отвечает.

## WOGV_2_ABS1

Единицы источника: WOGV_2_ABS1.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `zur-miete-gehoerende-zahlung-an-dritte` | Установлено ли, что «zur_miete_gehoerende_zahlung_an_dritte» (mv: Mietverhaeltnis mv, betrag: денежная сумма betrag)? | truth | `zur_miete_gehoerende_zahlung_an_dritte(mv: Mietverhaeltnis, betrag: Money)` | `evaluate truth(zur_miete_gehoerende_zahlung_an_dritte(<mv>, <betrag>));` | — | тестов 1 |

## WOGV_6_ABS1

Единицы источника: WOGV_6_ABS1.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `ausser-betracht-bleibende-umlage` | Установлено ли, что «ausser_betracht_bleibende_umlage» (mv: Mietverhaeltnis mv, position: BetriebskostenPosition position, art: KostenartNeunZwei art, betrag: денежная сумма betrag)? | truth | `ausser_betracht_bleibende_umlage(mv: Mietverhaeltnis, position: BetriebskostenPosition, art: KostenartNeunZwei, betrag: Money)` | `evaluate truth(ausser_betracht_bleibende_umlage(<mv>, <position>, <art>, <betrag>));` | — | тестов 2 |

## WOGV_6_ABS2

Единицы источника: WOGV_6_ABS2.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `pauschbetrag-6-abs2` | Установлено ли, что «pauschbetrag_6_abs2» (mv: Mietverhaeltnis mv, art: PauschalArt art, betrag: денежная сумма betrag)? | truth | `pauschbetrag_6_abs2(mv: Mietverhaeltnis, art: PauschalArt, betrag: Money)` | `evaluate truth(pauschbetrag_6_abs2(<mv>, <art>, <betrag>));` | — | тестов 9 |

## WOGV_ANLAGE_BB_KREIS

Единицы источника: WOGV_ANLAGE_BB_KREIS.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `mietenstufe-kreis` | Установлено ли, что «mietenstufe_kreis» (land: текст land, kreis: текст kreis, stufe: целое число stufe)? | truth | `mietenstufe_kreis(land: Text, kreis: Text, stufe: Integer)` | `evaluate truth(mietenstufe_kreis(<land>, <kreis>, <stufe>));` | — | тестов 2 |

## WOGV_ANLAGE_INSELN_GEMEINSAM

Единицы источника: WOGV_ANLAGE_INSELN_GEMEINSAM.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `mietenstufe-gemeinsam` | Установлено ли, что «mietenstufe_gemeinsam» (bezeichnung: текст bezeichnung, stufe: целое число stufe)? | truth | `mietenstufe_gemeinsam(bezeichnung: Text, stufe: Integer)` | `evaluate truth(mietenstufe_gemeinsam(<bezeichnung>, <stufe>));` | — | тестов 1 |

## WOGV_ANLAGE_VORBEMERKUNG

Единицы источника: WOGV_ANLAGE_VORBEMERKUNG.

| id | вопрос | форма | цель | шаблон | ветви | проверено |
|---|---|---|---|---|---|---|
| `gemeinde-gesondert-aufgefuehrt` | Установлено ли, что «gemeinde_gesondert_aufgefuehrt» (land: текст land, gemeinde: текст gemeinde)? | truth | `gemeinde_gesondert_aufgefuehrt(land: Text, gemeinde: Text)` | `evaluate truth(gemeinde_gesondert_aufgefuehrt(<land>, <gemeinde>));` | — | тестов 2 |

## Выводимое без собственной карточки

Звенья вывода: спрашиваются через карточки выше, названы здесь ради полноты поверхности в обе стороны.

| предикат | почему без карточки |
|---|---|
| `heizkosten_position` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (AusgewieseneHeizkostenBleibenAusserBetracht); самостоятельным вопросом к пакету он не является. |
| `mietenstufe_gemeinde` | Промежуточное звено: предикат выводится правилом пакета и читается телами других правил (GemeindeGesondertAufgefuehrt); самостоятельным вопросом к пакету он не является. |

## Итог

Карточек 6, границ 2, внутренних звеньев 2; выводимых предикатов в CLIR 8, норм 0 — поверхность закрыта в обе стороны. Причины по конкретному делу берутся не из каталога, а из issues и why_not ответа.
