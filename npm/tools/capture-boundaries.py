#!/usr/bin/env python3
"""Lower four existing scenarios through the released CLI, without a DSL parser."""
import argparse, hashlib, json, subprocess
from pathlib import Path
def sha(b):return 'sha256:'+hashlib.sha256(b).hexdigest()
ap=argparse.ArgumentParser(description=__doc__)
ap.add_argument('--canon',type=Path,required=True);ap.add_argument('--law',type=Path,required=True);ap.add_argument('--output',type=Path,required=True)
a=ap.parse_args();a.canon=a.canon.resolve();a.output=a.output.resolve();a.law=a.law.resolve()
if a.output.exists():raise ValueError('output must be new')
a.output.mkdir(parents=True);npm=Path(__file__).resolve().parents[1];pin=json.loads((npm/'source-pin.json').read_text())
for p,m in pin['verificationSources'].items():
 b=(a.canon/p).read_bytes()
 if sha(b)!=m['sha256'] or len(b)!=m['bytes']:raise ValueError('verification source mismatch')
clir=a.output/'clir';clir.mkdir()
for m in pin['models']:(clir/(m['name']+'.lawir.json')).write_bytes((a.canon/f"registry/p/{m['name']}/0.1.0/package.lawir.json").read_bytes())
imports=subprocess.check_output([str(a.law),'engine','imports-context',str(a.canon/'packages/de.social.wohngeld'),'--clir',str(clir)])
(a.output/'imports.json').write_bytes(imports)
files=a.output/'files.json';files.write_text(json.dumps([str(a.canon/p) for p in pin['verificationSources']])+'\n')
raw=subprocess.check_output([str(a.law),'engine','lower-test',str(files),'--lawtest-list','--program',str(a.canon/'registry/p/de.social.wohngeld/0.1.0/world.lawir.json'),'--imports',str(a.output/'imports.json')])
(a.output/'lowered.jsonl').write_bytes(raw)
selected=[t for line in raw.decode().splitlines() for t in json.loads(line)['document']['tests']
          if any(s in t['title'] for s in ['ohne Wohnort','zugleich behauptet','143,499','194,500'])]
if len(selected)!=4:raise ValueError('expected four selected existing scenarios')
(npm/'test/boundary-cases.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2)+'\n')
print('captured',len(selected),'existing scenarios')
