import { open } from '@arxo/law';
import { loadModel } from '@arxo/canon-de-wohngeld/wohngeld';
import { household, getCaseInput } from '@arxo/canon-de-wohngeld/examples/familie-weimar';

const model = await loadModel();
const wohngeld = await open(model.spec, {
  offline: true,
  local: { packages: { [model.spec]: model.package } },
});
const input = getCaseInput('Familie2025');
const amount = await wohngeld.collect('wohngeld_monatlich', [household, '?amount'], input);
console.log(amount.evaluationStatus, amount.value);
const claim = await wohngeld.truth('wohngeldanspruch', [household, '485 EUR'], input);
console.log(claim.evaluationStatus, claim.truthStatus);
