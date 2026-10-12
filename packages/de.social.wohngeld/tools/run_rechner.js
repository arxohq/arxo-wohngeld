// Исполняет закреплённый модуль калькулятора BMWSB (sources/bmwsb/wohngeldrechner-2025.module.js)
// на делах из JSON и печатает его ответы. Калькулятор — независимая реализация министерства,
// а не наша модель: его ответы — внешние ожидания для сценариев `tests/rechner-2025.lawtest`.
//
//   node corpus/laws/de/wohngeld/tools/run_rechner.js <дела.json>
//
// Модуль ждёт браузер (jQuery, форма). Здесь подставлены минимальные заглушки полей
// формы: значения берутся из дела, код расчёта `calculateWohngeld` исполняется как есть.
"use strict";
const fs = require("fs");
const path = require("path");
const moduleSource = fs.readFileSync(path.join(__dirname, "../sources/bmwsb/wohngeldrechner-2025.module.js"), "utf8");

let captured = null;
const gsb = { makeGSBModule: (name, obj) => { captured = obj; }, log: () => {} };
const chain = new Proxy(function () {}, { get: () => chain, apply: () => chain });
const $ = function () { return chain; };
$.gsb = {};
new Function("gsb", "$", "jQuery", moduleSource)(gsb, $, $);
if (!captured) throw new Error("модуль калькулятора не зарегистрирован");

function field(value) { return { val: () => (value === undefined ? "" : String(value)) }; }
function box(on) { return { is: () => !!on }; }

function run(c) {
  const base = {
    options: { calculationVariables: captured.defaultOptions.calculationVariables },
    min: captured.min, max: captured.max,
    localizedParseFloat: captured.localizedParseFloat, localizedParseInt: captured.localizedParseInt,
    $householdMembers: field(c.householdMembers),
    $housingbenefitRecipients: field(c.excluded || 0),
    $rentlevel: field(c.rentLevel),
    $homeResident: box(c.homeResident),
    $rent: field(c.rent),
    $disabledHouseholdMembers: field(c.disabled || 0),
    $singleParent: box(c.singleParent),
    $childsupport: field(c.childsupport || 0),
    $incomeMembers: [],
    result: null,
  };
  base.$result = { val: (v) => { base.result = v; }, focus: () => {} };
  for (let i = 0; i < 12; i++) {
    const m = (c.members || [])[i] || {};
    base.$incomeMembers.push({
      $income: field(m.income || 0), $deductions: field(m.deductions || 0),
      $incometax: box(m.tax), $healthInsurance: box(m.health), $pensionInsurance: box(m.pension),
      $pension: box(false), $workingUnderageChild: box(m.workingChild),
    });
  }
  const event = { preventDefault: () => {}, target: {} };
  const saved$ = global.$;
  global.$ = (x) => (x === event.target ? { data: () => base } : chain);
  try {
    new Function("$", "event", "base", "return (" + captured.calculateWohngeld.toString() + ")")(global.$, event, base)(event);
  } finally {
    global.$ = saved$;
  }
  return base.result;
}

const cases = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const out = cases.map((c) => ({ id: c.id, result: run(c) }));
process.stdout.write(JSON.stringify(out, null, 1) + "\n");
