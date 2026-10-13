# Maintain and deliver the Wohngeld candidate

The wrapper is maintained only in this repository's `npm/`. Models and registry
remain unchanged. The first npm release was authorized by the maintainer on 13 October 2026.
Use the existing CI channel; do not publish from a workstation. Source repository
visibility and public catalog registration are separate actions.

## Frozen inputs

Models and registry: `arxohq/arxo-wohngeld@d1887e87da88682930460b10deb9f52870ef5d54`.
Book cases: `arxohq/law-as-code-germany-examples@9575dcba842d1b7da310300e2bcfbe3f1cb87ff9`.
`source-pin.json` uses the distribution-specific `arxo.wohngeld-source-pin/1`;
it is not a general model schema. Its `files` map pins original source assets;
generated loader/type/visual files are covered by the archive inventory and SHA.

The toolchain for case capture and addressed source scenarios is released
`@arxo/cli@0.2.2` (Darwin arm64 binary
`sha256:c33dfee9fc9606fd67dde801e06b813acf1b1eb1f6466bbc625e9d4dbe7312d0`).
Install it separately, outside this checkout; `--law` names its executable.
It must not be replaced with a debug CLI. Python tools require Python 3.12+.

From `npm/`, with `EXAMPLES` the exact example checkout and `LAW` the released executable:

```sh
python3.12 tools/capture-cases.py --canon .. --examples "$EXAMPLES" --law "$LAW" --output /new/external/case-capture
python3.12 tools/capture-boundaries.py --canon .. --law "$LAW" --output /new/external/boundary-capture
python3.12 tools/publication-boundary.py --canon ..
npm ci --ignore-scripts
node tools/build.mjs --canon ..
npm test
npm run test:types
node tools/readme-assets.mjs
node tools/prepare-candidate.mjs --out /new/external/candidate
```

Capture copies only pinned case inputs into the new scratch directory. `law install`
and `law ask` run there. Canonical assertions/context/constants/options come from
CLI requests. No `.lawcase` semantics are reproduced in Python. Boundary capture
uses `engine imports-context` and `engine lower-test` to retain four existing
unknown/conflict/rounding scenarios and their expectations; these fixtures are
test inputs, excluded from the npm archive.

Build checks original raw hashes and sizes, identities/semantics, descriptors,
referenced catalogs and import closure, then generates the exact-spec registry
types. TypeScript 5.9.3 uses strict checking with `ES2022`, `DOM`,
`ESNext.Disposable` and no `skipLibCheck`. The peer is exactly `@arxo/law@0.4.2`;
its engine is `@arxo/law-engine@0.5.2`. Node baseline is 20; also check Node 24.

Source scenarios are a separate, addressed check. Run once per pinned package:

```sh
"$LAW" test ../packages/de.social.wohngeld_verordnung
"$LAW" test ../packages/de.tax.income_for_wohngeld
"$LAW" test ../packages/de.social.wohngeld
```

Expected totals: 18, 12 and 87. Original recorded export outcomes are historical
evidence, distinct from this execution. Do not run the full corpus or general
completion gates, or modify models/expectations to make the SDK check pass.

## Public README visuals

`node tools/readme-assets.mjs` generates SVG sources from SDK evidence and uses
`rsvg-convert` to render their PNG previews. The PNGs are immutable assets in
`arxohq/law-releases`, tag `canon-de-wohngeld-assets-v0.1.0`. Verify their anonymous
download SHA-256 before publishing the npm README that references them. The SVGs,
PNGs, evidence and asset manifest are also bundled in npm.

## Static depth

`tools/formalization-depth.py` calls the existing `boundaries.depth` against
original own-package CLIR. It stages unchanged source bytes and declares the
existing `de_paragraph` convention only in scratch; no new classifier is introduced.
Annexes/table rows do not enter the paragraph denominator. Amendment/example/script
publications remain `not_measured` in the per-document report.

The measurement uses frozen original implementations from the corpus and core Git
revisions recorded in `assets/formalization-depth.json`:

```text
.claude/skills/formalize-act/scripts/boundaries.py    corpus
corpus/tools/lib/act_split.py                       corpus
corpus/lib/lawbin.py                                corpus
engines/lawref/lawref/editions/applicability.py       core
```

Use `git show EXACT_REV:path` to retain these four files in an external directory
with the same layout. Write `corpus-revision.txt` and `core-revision.txt` there.
The prepared corpus runtime is not published, so the static adapter supplies its
original applicability dependency directly instead of invoking a runtime installer.
Only the import resolver is adapted; original depth/applicability code is unchanged.
All implementation hashes are recorded. This does not execute a corpus evaluator.

```sh
python3.12 tools/formalization-depth.py --implementation /frozen/implementation --canon .. --output assets/formalization-depth.json
```

## Check the installed archive

Install the tarball and exact SDK in **new external consumers** for Node 20 and 24.
Copy `test/` and the README code blocks into the consumer, preserving its installed
package resolution; execute tests, README examples and the type fixture there.
No source-tree `node_modules` or neighbouring workspace package may satisfy imports.

Checks cover all three exports/open/unfold, catalog metadata, two included imports,
integrity failures in isolated copies, independent models/fixtures, nine book cases,
judgment origins/requests, A3 rows and function anchors, repeated canonical bytes,
existing unknown/conflicting cases and rounding boundaries. Inventory every archive
file and confirm allowed roots, licences and absence of caches, source tools/tests,
raw publisher documents or absolute machine paths.

SDK 0.4.2 reports the 2027 empty collection as `COMPUTED` with
`MISSING_PARAMETER_VALUE` warning issues. Keep that observed contract visible.
Top-level `sources` is empty in these queries; proof attributes retain parameter
selections and function source anchors. If a chosen SDK criterion fails, save a
minimal reproduction and report failure; a new SDK release is a separate assignment.

## Future delivery through existing CI

The one-package helper creates a new tarball, `inventory.json` and
`facade-npm.json` (`arxo.npm-candidate/1`) outside Git. It does not overwrite the
monorepository's shared manifest, add an npm publisher or publish locally.

The original rights review is recorded by NOTICE and
`PUBLICATION-BOUNDARY.json` (BMWSB and pre-2023 BGBl database copies). The maintainer explicitly authorized distribution of the original model bytes for the noncommercial demonstration. Retain all
16 source files and 30 embedded fragment texts, and verify the intended public
asset URLs. Do not assume Apache-2.0 licenses publisher texts or remove text by
silently changing the pinned model.

With a separate explicit delivery assignment:

1. Review and push only the prepared branches; choose repository visibility.
2. Carry this exact SHA-checked manifest through the existing candidate channel
   in an owned `arxo-io/law` delivery branch. The CLI/helper lives in the private
   infrastructure checkout; no engine source is added to this consumer repository.
3. Use existing `apps/delivery/candidate.py upload` to retain immutable release
   assets, then `publish-facade-npm.yml` in **`arxo-io/law`**, dry-run before publish.
   The existing CI consumes the explicit manifest package row; any required
   allowlist/schema registration belongs to that delivery review.
4. Verify npm version/tag, public tarball SHA, anonymous installation, examples,
   types, README and immutable assets. Do not probe the unpublished name in advance.
5. Only after publication register docs/catalog in the independent public
   **`arxohq/law`** checkout. Do not publish `@arxo/docs-mcp`.

Local preparation retains `published: false` in the candidate manifest; only observed npm publication changes that record. `releaseVerified: false` and full corpus `not_checked` remain. Public installation, dist-tags and assets must be verified after publication. Source repository access and subject acceptance remain separate from runtime/archive delivery.
