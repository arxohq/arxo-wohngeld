import { open, type CaseInput } from '@arxo/law';
import { loadModel, type ModelSpec } from '@arxo/canon-de-wohngeld';
import { loadModel as loadWohngeld } from '@arxo/canon-de-wohngeld/wohngeld';
import { loadModel as loadVerordnung } from '@arxo/canon-de-wohngeld/wohngeld-verordnung';
import { loadModel as loadIncome } from '@arxo/canon-de-wohngeld/income-for-wohngeld';
import { getCaseInput, household, type CaseName } from '@arxo/canon-de-wohngeld/examples/familie-weimar';
const spec: ModelSpec = 'de.social.wohngeld@0.1.0';
const model = await loadWohngeld();
const law = await open(model.spec,{offline:true,local:{packages:{[model.spec]:model.package}}});
const input: CaseInput = getCaseInput('Familie2025');
await law.collect('wohngeld_monatlich',[household,'?amount'],input);
await law.truth('wohngeldanspruch',[household,'485 EUR'],input);
await law.collect('de.tax.income_for_wohngeld::einkuenfte_nichtselbstaendige_arbeit',['person','?income'],input);
await loadModel(spec);await loadVerordnung();await loadIncome();
// @ts-expect-error exact model specs only
await loadModel('de.social.wohngeld');
// @ts-expect-error unknown relation
await law.collect('wohngeld_montlich',[household,'?amount'],input);
// @ts-expect-error exact fixture names only
const wrong: CaseName = 'Familie';
void wrong;
