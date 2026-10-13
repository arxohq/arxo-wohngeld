#!/usr/bin/env python3
"""Static depth through the existing boundaries.depth; no lowering or new classifier.

The adapter supplies the original applicability dependency directly. It does not
need an executable corpus runtime for this static operation. All four original
implementation files and their Git revisions are recorded in the output.
"""
import argparse, hashlib, importlib.util, json, sys, tempfile, types
from collections import Counter
from pathlib import Path
def sha(b):return 'sha256:'+hashlib.sha256(b).hexdigest()
ap=argparse.ArgumentParser(description=__doc__)
ap.add_argument('--implementation',type=Path,required=True,help='frozen original implementation files and *-revision.txt')
ap.add_argument('--canon',type=Path,required=True)
ap.add_argument('--output',type=Path,required=True)
a=ap.parse_args();a.implementation=a.implementation.resolve();a.canon=a.canon.resolve()
root=Path(__file__).resolve().parents[1];pin=json.loads((root/'source-pin.json').read_text())
impl=['.claude/skills/formalize-act/scripts/boundaries.py','corpus/tools/lib/act_split.py','corpus/lib/lawbin.py','engines/lawref/lawref/editions/applicability.py']
module_file=a.implementation/impl[3]
spec=importlib.util.spec_from_file_location('lawref.editions.applicability',module_file)
app=importlib.util.module_from_spec(spec);sys.modules[spec.name]=app;spec.loader.exec_module(app)
# Original boundaries only uses this resolver to import applicability. Supply
# the frozen implementation directory; no compiler/toolchain is selected here.
resolver=types.ModuleType('lawbin');resolver.lawref_site_packages=lambda:module_file.parents[2]
sys.modules['lawbin']=resolver
spec=importlib.util.spec_from_file_location('wohngeld_depth',a.implementation/impl[0])
measure=importlib.util.module_from_spec(spec);sys.modules[spec.name]=measure;spec.loader.exec_module(measure)
catalog_bytes=(a.canon/'packages.json').read_bytes()
if sha(catalog_bytes)!=pin['files']['canon-packages.json']['sha256']:raise ValueError('catalog pin mismatch')
catalog={r['name']:r for r in json.loads(catalog_bytes)['packages']}
levels=['EXECUTABLE','INTERPRETED','ANCHORED','SOURCE_ONLY','NONE']
report={'format':'arxo.canon-depth-snapshot/0.1','source':{'repository':pin['repository'],'revision':pin['revision']},
 'method':{'implementation':'boundaries.depth','implementationHashes':{p:sha((a.implementation/p).read_bytes()) for p in impl},
  'implementationRevisions':{k:(a.implementation/(k+'-revision.txt')).read_text().strip() for k in ['corpus','core']},
  'adapter':'static import resolver only; original applicability and depth code unchanged',
  'adapterHash':sha(Path(__file__).read_bytes()),
  'unit':'German paragraph edition for GII consolidated statutes; identical document bytes deduplicated per package',
  'imports':'excluded; own package nodes only','unmeasuredAreas':['Annexes and table rows within consolidated sources are outside the paragraph denominator'],'levels':levels,'completeness':'not assessed',
  'scenarios':'recorded export outcomes; fresh CLI/SDK checks are separate','releaseVerified':False,'corpus':'not_checked'},'packages':[]}
for model in pin['models']:
 name=model['name'];ir_path=a.canon/f'registry/p/{name}/0.1.0/package.lawir.json';raw=ir_path.read_bytes()
 if sha(raw)!=model['packageHash']:raise ValueError('package pin mismatch')
 ir=json.loads(raw);nodes=ir['nodes']
 if any(n.get('package')!=model['namespace'] for n in nodes):raise ValueError('imports in package nodes')
 pubs=[n for n in nodes if n['kind']=='publication'];kinds=Counter(n['kind'] for n in nodes)
 source_dir=a.canon/'packages'/name/'sources';by_hash={}
 for p in sorted(source_dir.rglob('*')):
  if p.is_file():by_hash.setdefault(sha(p.read_bytes()),[]).append(p)
 docs=[];unmeasured=[];counts=Counter();seen=set()
 for pub in pubs:
  h=pub['documentHash']
  if h in seen:continue
  seen.add(h);paths=by_hash.get(h,[]);source=next((p for p in paths if p.suffix=='.txt'),None)
  rec={'publications':[p['id'] for p in pubs if p['documentHash']==h],'documentHash':h,
       'paths':[str(p.relative_to(a.canon)) for p in paths], 'editions':[p.get('edition') for p in pubs if p['documentHash']==h]}
  if source is None or source.parent.name!='gii':
   unmeasured.append({**rec,'reason':'division of amendment, table, worked example or script not measured by this report'});continue
  # Existing de_paragraph convention requires an explicit declaration; do not
  # add it to the original source tree or alter source bytes.
  with tempfile.TemporaryDirectory(prefix='wohngeld-depth-') as t:
   staged=Path(t)/'source.txt';staged.write_bytes(source.read_bytes())
   declaration={'document':'source.txt','unit':'de_paragraph'}
   (staged.parent/'articles.json').write_text(json.dumps(declaration)+'\n')
   result=measure.depth(staged,ir_path)
  rows=[{**r,'level':'NONE' if r['level']=='—' else r['level']} for r in result['rows']]
  if not rows:unmeasured.append({**rec,'reason':'German paragraph units not recognized'});continue
  counts.update(r['level'] for r in rows if r['level']!='EXCLUDED')
  docs.append({**rec,'unit':'de_paragraph','denominator':len(rows),'reportUnitConvention':'de_paragraph',
               'reportUnitReason':'original GII headings use §; existing measure requires this explicit convention',
               'declarationHash':sha((json.dumps(declaration)+'\n').encode()),'units':rows,'unresolvedAnchors':result['unresolved']})
 report['packages'].append({'name':name,'spec':model['spec'],'packageHash':model['packageHash'],'worldHash':model['worldHash'],
   'status':'partial' if docs and unmeasured else 'measured' if docs else 'not_measured','units':sum(counts.values()),
   'levels':{k:counts[k] for k in levels},'ownRules':kinds['rule'],'ownFragments':kinds['fragment'],
   'recordedScenarios':catalog[name]['tests'],'recordedOutcome':catalog[name]['outcome'],
   'documents':docs,'unmeasuredDocuments':unmeasured})
 print(name,sum(counts.values()),dict(counts),flush=True)
a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
