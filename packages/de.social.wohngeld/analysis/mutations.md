# Мутационная чувствительность (15.09.2026)

Скрипт `tools/mutate.py` копирует три пакета во временный каталог ВНЕ дерева,
вносит одну мутацию, пересобирает CLIR копии (`law-cli lock/lower`), связывает
мир и прогоняет `law-cli test` по сценариям дерева. Дерево не меняется.

| Мутация | Где | Результат | Какие сценарии падают |
|---|---|---|---|
| M1 коэффициент § 19 Abs. 1: 1,15 → 1,16 | `anlagen/FormelFaktor.lawparam.json` | **убита**: 9/24 прошли | BMWSB 2025 № 1, 3 … и grenzen |
| M2 округление Anlage 3 Nr. 3: HALF_UP → FLOOR | `40-hoehe.law` | **убита**: 12/14 | «10 EUR (z4 = 9,5034872592)», «194,5001603254 → 195» |
| M2′ округление HALF_UP → HALF_DOWN | `40-hoehe.law` | **выжила**: 14/14 | различие только при z4 ровно x,5000000000; при суммах в центах такой z4 перебором не найден (ближайшие — 143,4999657097 и 194,5001603254) |
| M2b шаги z1…z4: 10 знаков → 2 | `40-hoehe.law` | **убита**: 10/14 | обе пары порога и округления |
| M3 Arbeitnehmer-Pauschbetrag 1 230 → 1 200 | `income-for-wohngeld/pauschbetraege/` | **убита**: 5/10 | BMWSB 2025 № 5, 6, 7, 8, 9 |
| M4 выбор редакции: Anlage 2 «b» (4 члена) с 01.02.2025 | `anlagen/WertBMitglieder4.lawparam.json` | **убита**: 5/6 | «dieselbe Familie am 2025-01-01 — 485 EUR» |
| M5 порог Höchstbetrag: потолок + 0,01 € | `20-miete.law` | **убита**: 13/14 | «Miete 475.21 EUR …» |
| M6 § 21 Nr. 1: `< 10` → `<= 10` | `50-anspruch.law` | **убита**: 13/14 | «Wohngeld 10 EUR — Anspruch besteht» |
| M7 § 7: без условия Kosten der Unterkunft | `10-haushalt.law` | **убита**: 15/16 | «ohne Kosten der Unterkunft kein Ausschluss» |
| M8 § 17 Nr. 4: предел 1 200 → 1 300 | `30-einkommen.law` | **убита**: 12/13 | «Kind 24 Jahre … höchstens 1 200 EUR» |

Первая попытка M4 (конец окна 2023 года сдвинут без сдвига начала 2025 года)
отвергнута компилятором: `LDC-E8701 parameter value intervals overlap` — ворота
A3 не дают двум значениям перекрыться.
