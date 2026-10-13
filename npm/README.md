![German Housing Benefit on Arxo](assets/cover.svg)

# German Housing Benefit on Arxo

**Load a pinned Wohngeld model, ask it about a fictional household, and inspect the answer.**
Three model entries and nine complete cases from *Law as Code in Practice: German Housing Benefit (Wohngeld)*, Volume 2.

**Private candidate · Node.js 20+ · ESM · `@arxo/law@0.4.2` · models `0.1.0`**

[Start](#start-with-the-local-candidate) · [Choose a model](#choose-a-model) · [Book cases](#explore-the-book-cases) · [Evidence](#inspect-the-evidence) · [Depth](#formalization-depth) · [Reproduce](#reproduce-the-candidate)

This is an independent teaching demonstration of Mietzuschuss. It does not claim legal accuracy or completeness, and is not an implementation by or for a German authority. For an actual application, use the official texts and the competent Wohngeld office.

## Start with the local candidate

The package is **not published**. In a new directory, install the delivered tarball and the exact SDK:

```sh
npm init -y
npm install --ignore-scripts /absolute/path/arxo-canon-de-wohngeld-0.1.0.tgz @arxo/law@0.4.2
```

Save this as `example.mjs`, then run `node example.mjs`:

```js
import { open } from '@arxo/law';
import { loadModel } from '@arxo/canon-de-wohngeld/wohngeld';
import {
  household, getCaseInput,
} from '@arxo/canon-de-wohngeld/examples/familie-weimar';

const model = await loadModel();
const wohngeld = await open(model.spec, {
  offline: true,
  local: { packages: { [model.spec]: model.package } },
});

const input = getCaseInput('Familie2025');
const amount = await wohngeld.collect(
  'wohngeld_monatlich', [household, '?amount'], input,
);
console.log(amount.evaluationStatus, amount.value);

const claim = await wohngeld.truth(
  'wohngeldanspruch', [household, '485 EUR'], input,
);
console.log(claim.evaluationStatus, claim.truthStatus);
```

The model returns **€485** as Money (`value: '485'`, `currency: 'EUR'`); the claim is `COMPUTED / TRUE_ONLY`. The formula, rounding and selection of parameter editions run inside Arxo. There is no benefit formula in the loader.

Installation by npm name, dist-tags, CDN assets and anonymous GitHub access remain unverified steps of a future publication. The bundled relative images are for local preview; public immutable asset URLs have not been established.

## Choose a model

| Node import suffix | Exact model spec | Purpose |
|---|---|---|
| `/wohngeld` | `de.social.wohngeld@0.1.0` | Mietzuschuss: household, exclusions, rent, income, amount and claim |
| `/wohngeld-verordnung` | `de.social.wohngeld_verordnung@0.1.0` | Rent components and municipality/district Mietenstufen |
| `/income-for-wohngeld` | `de.tax.income_for_wohngeld@0.1.0` | The selected EStG income rules read by Wohngeld |

Each subpath exports `spec` and `loadModel()`. The root exports `models`, `loadModel(exactSpec)`, `ModelNotFoundError` and `ModelIntegrityError`:

```js
import { models, loadModel } from '@arxo/canon-de-wohngeld';
console.table(models.map(({ spec, subpath }) => ({ spec, subpath })));
const model = await loadModel('de.social.wohngeld@0.1.0');
```

The root import reads the catalog and metadata. Loading reads only the selected world, descriptor and referenced question catalog; every call returns independent JSON. The Wohngeld world already includes both imports. Separate entries do not create a second combined calculation.

Always pass `local.packages` to `open`, as above. Installation alone does not register these entries with the SDK's automatic resolver. Question catalogs are returned as metadata; they do not generate or fill a case. The income entry has no catalog, which is valid.

Versionless or unknown specs fail with `MODEL_NOT_FOUND`. Missing, damaged or inconsistent active assets fail with `MODEL_INTEGRITY`, before parsing unchecked bytes. There is no network fallback. Inspect `model.descriptor` for the original registry descriptor; `model.package.meta.contentHash` is the **world** hash, while `packageContentHash` is the original **package** hash.

![Pinned model and explicit inputs lead to separate queries](assets/model-to-answer.svg)

## Explore the book cases

`getCaseInput(name)` supplies the **complete canonical assertions, context and options captured by released CLI 0.2.2**. It returns a fresh copy; an unknown runtime name throws `RangeError`. All nine names are typed as `CaseName`.

```js
import { caseNames, getCaseInput } from '@arxo/canon-de-wohngeld/examples/familie-weimar';
console.log(caseNames);
const input = getCaseInput('Familie2025');
console.log(input.context, input.assertions);
```

The baseline is the fictional Vogt family in Weimar: four members, annual wage €26,880, contractual monthly rent €580, monthly model income €1,710 and counted rent €777.80. Context retains legal date `2025-01-01`, decision and knowledge times `2026-09-15T09:00:00Z`, and `Europe/Berlin`. Money and Decimal values are strings, not JavaScript floating-point inputs.

The assertions include an explicit **negative** `missbraeuchliche_inanspruchnahme` with `origin: 'adjudicated'`. The case without assessment does not receive that assertion. See [complete bundled inputs](examples/familie-weimar-cases.json) and [capture provenance](examples/provenance.json).

| Case | What changes | Verified behavior | Book chapters |
|---|---|---|---|
| `Familie2025` | Baseline, 1 January 2025 | €485; claim `TRUE_ONLY` | 0, 2–4, 9 |
| `Familie20241231` | Legal date 31 December 2024 | €463; 2023 parameter rows | 1, 5, 8 |
| `FamilieOhneWuerdigung` | Authority's judgment absent | €485; claim `NEITHER / REQUIRES_JUDGMENT` | 6 |
| `AlleinGrundsicherung` | SGB II support including housing costs | Excluding conclusion under § 21 Nr. 2 | 7 |
| `VMiete850` | Contractual rent €850 | €644 | 2, 3, 8 |
| `VSteuer` | Income tax also expected | €542 | 2, 3, 8 |
| `VWerbung2000` | Proven work expenses €2,000 | €499 | 2, 3, 8 |
| `VOhneMittelpunkt` | Markus's centre of life absent from input | Model counts three members; €351 | 3, 8 |
| `V20270101` | Legal date 1 January 2027 | Empty amount; `MISSING_PARAMETER_VALUE` issues | 1, 8 |

The three-member variant records a boundary of this model: an absent centre-of-life assertion changes the member collection. It must not be generalized into a legal presumption that every missing fact is false.

For 2027, this SDK reports `evaluationStatus: 'COMPUTED'` together with an empty collection and warning issues. Check **status, values and issues together**; do not substitute zero or the last known amount.

## An amount and a claim are different questions

![The amount is known while a claim may require judgment](assets/amount-and-claim.svg)

Changing only the case to `FamilieOhneWuerdigung` still gives €485. Its `wohngeldanspruch` query returns `NEITHER / REQUIRES_JUDGMENT`, with a canonical `judgmentRequests` entry addressed to the Wohngeldbehörde. The loader does not make that assessment.

Truth is four-valued: `TRUE_ONLY`, `FALSE_ONLY`, `BOTH`, `NEITHER`. An absent fact, an explicit negative assertion and a conflict are distinct. An answer should not be reduced to Boolean. These models declare institutional predicates; they do **not** declare deontic positions, so `positions()` is not an entitlement API for this kit.

## Inspect the evidence

Continue the first example to preserve the canonical bytes and inspect parameter evidence:

```js
import { writeFile } from 'node:fs/promises';
await writeFile('answer.json', amount.document);

const selections = amount.proof.nodes.flatMap(
  node => node.attributes?.a3Selections ?? [],
);
const anchors = amount.proof.nodes.flatMap(node =>
  (node.attributes?.functionCalls ?? []).flatMap(call => call.sourceAnchors ?? []),
);
console.log(selections, anchors, amount.hashes);
console.log(wohngeld.unfold('wohngeld_monatlich', { depth: 2 }).text);
```

In SDK 0.4.2, the top-level `sources` array is empty for these queries. A3 row selections and function source anchors remain available in the **proof attributes** shown above. The dated checks confirm 2025 rows for `Familie2025` and 2023 rows for `Familie20241231`; some components retain their unchanged 2023 rows in both cases. Anchors list retained model sources, including several editions; they are not all claims that every listed edition applies to the case.

Original model/world hashes, program/result hashes and tarball SHA-256 identify different objects. Identical SDK requests reproduce identical canonical documents and hashes. A new SDK collect query need not have the same fingerprints as a historical CLI truth query.

<details>
<summary>What the model knows: native unfold at depth 2</summary>

![Native producer tree for wohngeld_monatlich](assets/knows-wohngeld.svg)

This is the SDK's native model tree, without a selected case. [Full tree and text](assets/wohngeld-unfold.json); [verified diagram inputs](assets/example-evidence.json). Recursion depth 2 controls the picture; it is unrelated to formalization depth.

</details>

## Formalization depth

Existing `boundaries.depth` measures **German paragraph editions in consolidated GII texts**, using only each original package's own nodes. Imports are excluded. Source bytes are matched to publications by SHA-256; distinct editions are counted separately. A paragraph with a deriving node is executable in this measure, which does **not** establish complete formalization of its legal content.

| Model | Measured units | Executable | Source only | No anchored implementation | Unmeasured publications | Status |
|---|---:|---:|---:|---:|---:|---|
| Wohngeld | 157 paragraph editions: 52 + 52 + 53 | 57 | 9 | 91 | 7 | partial |
| Wohngeldverordnung | 22 paragraphs | 3 | 0 | 19 | 3 | partial |
| Income for Wohngeld | 239 EStG paragraphs | 9 | 0 | 230 | 1 | partial |

The denominator is the complete recognized paragraph inventory of each pinned consolidated text, not just the chosen model scope. `NONE` means no anchored implementation under this measure. `INTERPRETED` and `ANCHORED` are zero here. Annex tables, amendment publications, worked examples and scripts have unsupported or unmeasured units and do not contribute invented percentages. In particular, this paragraph measure does not grade the completeness of WoGG Anlagen 1–3 or the WoGV Mietenstufen annex.

[Machine-readable unit report](assets/formalization-depth.json) records editions, denominators, package/world/source hashes, original implementation hashes and every unmeasured publication. Static executable depth, number of scenarios and subject acceptance are separate claims.

## Scope, source pins and reproduction rights

The model covers selected Mietzuschuss household and exclusion rules (§§ 3–8), rent and components (§§ 9, 11, 12), income (§§ 13–18), the § 19 calculation and selected §§ 20–21. It is not a general German benefits calculator or full WoGG implementation. Consolidated snapshots and amendments describe more law than this executable scope. The pinned model metadata records `verifiedAgainstSource: false`.

| Input | Frozen source |
|---|---|
| Models and registry | `arxohq/arxo-wohngeld@d1887e87da88682930460b10deb9f52870ef5d54` |
| Book cases | `arxohq/law-as-code-germany-examples@9575dcba842d1b7da310300e2bcfbe3f1cb87ff9` |
| Model identities | Three versions `0.1.0`, semantics `law.core/0.2.11` |
| SDK / engine | `@arxo/law@0.4.2` / `@arxo/law-engine@0.5.2` |

See [source pin](source-pin.json), [LICENSE](LICENSE), [original NOTICE](NOTICE) and [publication boundary](PUBLICATION-BOUNDARY.json). The code/model licence does not automatically license publisher texts. Existing NOTICE leaves BMWSB materials and pre-2023 BGBl database terms **unconfirmed for public distribution**. The inventory lists 16 affected source files and 30 embedded fragment texts. Necessary private inputs are retained; model bytes have not been altered to remove texts. Both source repositories remain private.

## Reproduce the candidate

From `npm/` in a checkout containing the pinned registry:

```sh
npm ci --ignore-scripts
node tools/build.mjs --canon ..
npm test
npm run test:types
node tools/prepare-candidate.mjs --out /absolute/path/new-candidate-directory
```

The build verifies original pinned bytes and generates Node entries and relation types. It neither downloads models nor compiles the live corpus. The candidate helper packs **only this package**, writes `arxo.npm-candidate/1`, and performs no publication. Archive and verification outputs belong outside Git. [Maintainer instructions](PUBLISHING.md) explain source capture, static depth and future CI delivery.

The original export records **87 + 18 + 12 passed scenarios**. A new addressed CLI 0.2.2 check also passed all 117. New SDK checks separately cover the nine book cases, A3 selections and source anchors, judgment requests, existing unknown/conflicting facts and rounding boundaries. Strict TypeScript uses 5.9.3 with `ES2022`, `DOM`, `ESNext.Disposable`, without `skipLibCheck`; relation names, qualified imports and exact specs are generated from pinned declarations.

These local checks do not mark a release or full subject corpus accepted: `published: false`, `releaseVerified: false`, corpus `not_checked`. No full corpus or general completion gates are run.
