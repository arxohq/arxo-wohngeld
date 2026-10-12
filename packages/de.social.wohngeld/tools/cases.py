"""Построитель сценариев `.lawtest` для пакета `de.social.wohngeld`.

Сценарии — данные. Этот модуль только переводит описание дела (состав
домохозяйства, суммы из официального примера) в утверждения §267; ОЖИДАНИЯ
пишутся рядом с делом руками — из PDF BMWSB, из текста закона или из
модуля калькулятора, — а не из ответа движка.

Суммы примеров BMWSB месячные; § 15 WoGG и § 2 Abs. 7 EStG требуют годовых
ожидаемых сумм, поэтому факты — месячная сумма × 12.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from decimal import Decimal

NS_CASE = "urn:de:example:wohngeld"
E = "de.tax.income_for_wohngeld"
V = "de.social.wohngeld_verordnung"


def money(value) -> str:
    d = Decimal(str(value)).quantize(Decimal("0.01"))
    return f"{d} EUR"


@dataclass
class Member:
    pid: str
    beziehung: tuple[str, str] | None = None        # (к кому, Beziehungsart); None — заявитель
    aufenthalt: str = "KEIN_AUSLAENDER"
    leistung7: tuple[str, str, str, str, str] = ("KEINE", "NEIN", "NEIN", "NEIN", "NEIN")
    abzug16: tuple[str, str, str] | None = ("NEIN", "NEIN", "NEIN")
    lohn: Decimal | None = None          # месячная брутто-зарплата
    werbungskosten: Decimal = Decimal(0) # месячные доказанные расходы
    rente: tuple[Decimal, Decimal] | None = None  # (месячная пенсия, месячная облагаемая часть)
    alg1: Decimal | None = None
    uvg: Decimal | None = None
    minijob: Decimal | None = None
    alter: int | None = None
    kind_von: tuple[str, ...] = ()
    kindergeld: bool = False
    gdb: int | None = None
    pflege: bool = False
    einkommen_vollstaendig: bool = True
    extra: tuple[str, ...] = ()


@dataclass
class Case:
    cid: str
    date: str
    land: str
    gemeinde: str
    miete: Decimal
    members: list[Member]
    kreis: str | None = None
    grundlage: str = "MIETVERHAELTNIS"
    zuschuss: str = "MIETZUSCHUSS"
    bafoeg: tuple[str, str] = ("NEIN", "NEIN")
    miete_vollstaendig: bool = True
    freibetraege_vollstaendig: bool = True
    missbrauch: str | None = "nein"      # "nein" | "ja" | None (органу вопрос не задан)
    extra: tuple[str, ...] = ()
    # Префиксы id утверждений, которые выбросить. Id факта, совпавший с именем
    # отношения, пишется с `fact-` (errata E-0340, LDC-E1382): `fact-wohnort`.
    omit: tuple[str, ...] = ()

    def h(self) -> str:
        return f'entity_ref("{NS_CASE}:{self.cid}:haushalt")'

    def p(self, pid: str) -> str:
        return f'entity_ref("{NS_CASE}:{self.cid}:{pid}")'

    def mv(self) -> str:
        return f'entity_ref("{NS_CASE}:{self.cid}:mietverhaeltnis")'

    def assertions(self) -> list[tuple[str, str, str]]:
        """(id, литерал, origin)."""
        h, mv = self.h(), self.mv()
        applicant = self.members[0]
        out: list[tuple[str, str, str]] = [
            ("antrag", f"wohngeldantrag({h}, {self.p(applicant.pid)}, {self.zuschuss})", "case_input"),
            ("grundlage", f"nutzungsgrundlage({h}, {self.p(applicant.pid)}, {self.grundlage})", "case_input"),
            ("fact-wohnort", f'wohnort({h}, "{self.land}", "{self.gemeinde}")', "case_input"),
            ("mv", f"mietverhaeltnis_des_haushalts({h}, {mv})", "case_input"),
            ("entgelt", f"vereinbartes_entgelt({mv}, {money(self.miete)})", "case_input"),
            ("bafoeg", f"ausbildungsfoerderung_20_abs2({h}, {self.bafoeg[0]}, {self.bafoeg[1]})", "case_input"),
        ]
        if self.kreis:
            out.append(("kreis", f'wohnort_kreis({h}, "{self.kreis}")', "case_input"))
        if self.miete_vollstaendig:
            out.append(("miete-vollstaendig", f"angaben_zur_miete_vollstaendig({mv})", "case_input"))
        if self.freibetraege_vollstaendig:
            out.append(("freibetraege-vollstaendig", f"angaben_freibetraege_vollstaendig({h})", "case_input"))
        if self.missbrauch == "nein":
            out.append(("behoerde-21-nr3", f"not missbraeuchliche_inanspruchnahme({h})", "adjudicated"))
        elif self.missbrauch == "ja":
            out.append(("behoerde-21-nr3", f"missbraeuchliche_inanspruchnahme({h})", "adjudicated"))
        for m in self.members:
            x = self.p(m.pid)
            k = m.pid
            out.append((f"{k}-lebensmittelpunkt", f"lebensmittelpunkt_im_wohnraum({h}, {x})", "case_input"))
            out.append((f"{k}-aufenthalt", f"aufenthaltsrechtlicher_status({x}, {m.aufenthalt})", "case_input"))
            l7 = m.leistung7
            out.append((f"{k}-leistung7", f"leistungsbezug_7({x}, {l7[0]}, {l7[1]}, {l7[2]}, {l7[3]}, {l7[4]})", "case_input"))
            if m.beziehung:
                out.append((f"{k}-beziehung", f"beziehung({x}, {self.p(m.beziehung[0])}, {m.beziehung[1]})", "case_input"))
            if m.abzug16:
                a = m.abzug16
                out.append((f"{k}-abzug16", f"abzugsmerkmale_16({x}, {a[0]}, {a[1]}, {a[2]})", "case_input"))
            if m.einkommen_vollstaendig:
                out.append((f"{k}-einkommen-vollstaendig", f"einkommensangaben_vollstaendig({x})", "case_input"))
            if m.lohn is not None:
                out.append((f"{k}-lohn", f"{E}::arbeitslohn_in_geld({x}, {money(m.lohn * 12)})", "case_input"))
                out.append((f"{k}-werbungskosten", f"{E}::nachgewiesene_werbungskosten_arbeit({x}, {money(m.werbungskosten * 12)})", "case_input"))
            if m.rente is not None:
                out.append((f"{k}-rente", f"{E}::leibrente_gesetzliche_rentenversicherung({x}, {money(m.rente[0] * 12)}, {money(m.rente[1] * 12)})", "case_input"))
                out.append((f"{k}-werbungskosten-rente", f"{E}::nachgewiesene_werbungskosten_sonstige({x}, 0.00 EUR)", "case_input"))
            if m.alg1 is not None:
                out.append((f"{k}-alg1", f"{E}::arbeitslosengeld_sgb3({x}, {money(m.alg1 * 12)})", "case_input"))
            if m.uvg is not None:
                out.append((f"{k}-uvg", f"unterhaltsvorschuss({x}, {money(m.uvg * 12)})", "case_input"))
            if m.minijob is not None:
                out.append((f"{k}-minijob", f"{E}::arbeitsentgelt_40a_pauschal_besteuert({x}, {money(m.minijob * 12)})", "case_input"))
                out.append((f"{k}-minijob-aufwendungen", f"aufwendungen_pauschal_besteuertes_arbeitsentgelt({x}, 0.00 EUR)", "case_input"))
            if m.alter is not None:
                out.append((f"{k}-alter", f"alter_in_vollendeten_jahren({x}, {m.alter})", "case_input"))
            for parent in m.kind_von:
                out.append((f"{k}-kind-von-{parent}", f"kind_von({x}, {self.p(parent)})", "case_input"))
            if m.kindergeld:
                out.append((f"{k}-kindergeld", f"kindergeld_gewaehrt({x})", "case_input"))
            if m.gdb is not None:
                out.append((f"{k}-gdb", f"schwerbehinderung({x}, {m.gdb})", "case_input"))
            if m.pflege:
                out.append((f"{k}-pflege", f"pflegebeduerftig_mit_haeuslicher_pflege({x})", "case_input"))
            for i, lit in enumerate(m.extra):
                out.append((f"{k}-extra-{i}", lit, "case_input"))
        for i, lit in enumerate(self.extra):
            out.append((f"extra-{i}", lit, "adjudicated" if lit.startswith("not verantwortungs") or lit.startswith("verantwortungs") else "case_input"))
        return [a for a in out if not any(a[0].startswith(o) for o in self.omit)]


def render_test(case: Case, title: str, steps: list[tuple[str, list[str]]], comment: str = "",
                context_date: str | None = None) -> str:
    date = context_date or case.date
    lines = []
    for line in comment.strip("\n").split("\n") if comment else []:
        lines.append(f"// {line}" if line else "//")
    lines.append(f'test "{title}" {{')
    lines.append("    given {")
    lines.append(f'        context {{ legal_time @{date}; decision_time @{date}T09:00:00Z; knowledge_time @{date}T09:00:00Z; timezone "Europe/Berlin"; }}')
    for aid, lit, origin in case.assertions():
        lines.append(f'        assert "{aid}": {lit} {{ origin {origin}; }}')
    lines.append("    }")
    for query, expectations in steps:
        lines.append(f"    evaluate {query};")
        for e in expectations:
            lines.append(f"    expect {e};")
    lines.append("}")
    return "\n".join(lines)


HEADER = ('language "law.core" version "0.2";\npackage de.social.wohngeld version "0.1.0";\n'
          'namespace "urn:de:social:clir:wohngeld";\n\n')
TRUE = ["truth_status == TRUE_ONLY", "evaluation_status == COMPUTED"]
NEITHER = ["truth_status == NEITHER", "evaluation_status == COMPUTED"]
