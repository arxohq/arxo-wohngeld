import { readFileSync } from 'node:fs';
const fixtures = JSON.parse(readFileSync(new URL('./familie-weimar-cases.json', import.meta.url), 'utf8'));
export const caseNames = Object.freeze(Object.keys(fixtures));
export const household = 'urn:de:example:wohngeld:familie-weimar:haushalt';
export function getCaseInput(name) {
  if (!Object.hasOwn(fixtures, name)) throw new RangeError(`Unknown book case: ${String(name)}`);
  return structuredClone(fixtures[name]);
}
