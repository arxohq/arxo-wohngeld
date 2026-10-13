#!/usr/bin/env python3
"""Inventory terms left unconfirmed by the pinned NOTICE; makes no rights decision."""
import argparse,hashlib,json
from pathlib import Path
def sha(b):return 'sha256:'+hashlib.sha256(b).hexdigest()
ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--canon',type=Path,required=True)
a=ap.parse_args();a.canon=a.canon.resolve();npm=Path(__file__).resolve().parents[1];pin=json.loads((npm/'source-pin.json').read_text())
out={'format':'arxo.wohngeld-publication-boundary/1','publicReady':False,'status':'terms_unconfirmed',
 'basis':{'path':'NOTICE','sha256':pin['files']['NOTICE']['sha256'],'sourceRevision':pin['revision']},
 'note':'Private candidate retains necessary inputs. BMWSB and pre-2023 gazette database terms remain unconfirmed for public distribution. No model bytes were removed or changed.',
 'sourceFiles':[],'embeddedTexts':[],'affectedNpmAssets':[]}
seen=set()
for m in pin['models']:
 p=a.canon/f"registry/p/{m['name']}/0.1.0/package.lawir.json";j=json.loads(p.read_bytes());pubs=[n for n in j['nodes'] if n['kind']=='publication' and ('bmwsb.bund.de' in n['uri'] or 'offenegesetze.de' in n['uri'])]
 editions={n['edition'] for n in pubs};hashes={n['documentHash'] for n in pubs}
 for f in (a.canon/'packages'/m['name']/'sources').rglob('*'):
  if f.is_file() and (sha(f.read_bytes()) in hashes or f.parent.name=='bmwsb' or (f.parent.name=='bgbl' and any(y in f.name for y in ['2021','2022']))):
   rel=str(f.relative_to(a.canon))
   if rel not in seen:out['sourceFiles'].append({'path':rel,'bytes':f.stat().st_size,'sha256':sha(f.read_bytes()),'shippedInNpm':False});seen.add(rel)
 for n in j['nodes']:
  if n['kind']=='fragment' and n.get('edition') in editions:
   for t in n.get('texts',[]):out['embeddedTexts'].append({'package':m['name'],'fragment':n['id'],'edition':n['edition'],'language':t.get('language'),'textHash':sha(t['text'].encode()),'publicationIds':[p['id'] for p in pubs if p['edition']==n['edition']]})
 if pubs:
  for suffix in ['package.lawir.json','world.lawir.json']:
   target=f"data/{m['subpath']}/{suffix}";out['affectedNpmAssets'].append({'path':target,'sha256':pin['files'][target]['sha256']})
(npm/'PUBLICATION-BOUNDARY.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
print(len(out['sourceFiles']),'source files;',len(out['embeddedTexts']),'embedded texts; public terms unconfirmed')
