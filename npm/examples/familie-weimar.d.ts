import type { CaseInput } from '@arxo/law';
export type CaseName = 'Familie2025' | 'Familie20241231' | 'FamilieOhneWuerdigung' | 'AlleinGrundsicherung' | 'VMiete850' | 'VSteuer' | 'VWerbung2000' | 'VOhneMittelpunkt' | 'V20270101';
export declare const caseNames: readonly CaseName[];
export declare const household: 'urn:de:example:wohngeld:familie-weimar:haushalt';
export declare function getCaseInput(name: CaseName): CaseInput;
