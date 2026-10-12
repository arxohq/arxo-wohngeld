# arxo-wohngeld

> **First of all, a demonstration.** This repository shows what modelling legislation with Arxo can do: German housing-benefit law (Wohngeld) written as executable canons, with the source of every answer. It is an independent model built from published German law for teaching and demonstration. It does not claim legal accuracy or completeness, it is not an implementation by or for any German authority, and its answers are not legal advice. For a real application, rely on the official texts and the competent Wohngeld office.

Pinned canon, executable as it stands: source text with provenance, the
model built over it and the scenarios that check its answers. The norms
here are data — they are executed by `law`; this repository carries no
rule code of its own.

## Contents

| Package | Version | Scenarios | Dependencies |
|---|---|---|---|
| `de.social.wohngeld_verordnung` | 0.1.0 | 18 | 0 |
| `de.tax.income_for_wohngeld` | 0.1.0 | 12 | 0 |
| `de.social.wohngeld` | 0.1.0 | 87 | 2 |

## How it is verified

Every package is built by `package.py` with the pinned toolchain: compilation,
§267 scenarios on both evaluators, replay of saved evaluations and a rebuild
from the release itself. A failure of any step stops the build.

```sh
python3 tools/toolchain.py download --lock toolchain.lock.json --out /tmp/law-tools
python3 /tmp/law-tools/package.py packages/<name> \
    --lawc /tmp/law-tools/law-cli --offline --out /tmp/<name>-release
```

## Dependencies

Dependency bytes are pinned under `packages/<name>/deps/` and verified against the hash recorded in `law.lock`: the build and the CI are offline.

## Installing from this repository

`registry/` publishes these packages and their closure (3) in the
layout of the Arxo registry: descriptors, canonical CLIR bytes (§208), worlds and
resources. A case package whose `law.lock` pins them installs from a clone:

```sh
law install --registry arxo=<path to the clone>/registry
```

The sources are `packages/<name>/`; the registry copy does not repeat them.
`python3 registry/check_registry.py` verifies schemas, addresses and hashes.

## Rights

Code and model: see `LICENSE`. The pinned texts of the publishers keep their
own terms of reproduction, listed per package in `NOTICE`; those terms are
not covered by the code licence.

The terms of reproduction of the pinned texts are not declared by `de.social.wohngeld`, `de.social.wohngeld_verordnung`, `de.tax.income_for_wohngeld`:
they are checked against the publication addresses in `NOTICE` before this repository is opened.

Maintainer: Rifat Dzhumagulov (hi@arxo.io). Address: https://github.com/arxohq/arxo-wohngeld.
