#!/usr/bin/env python3
"""Capture canonical CLI inputs; the released CLI alone parses .lawcase."""
import argparse, hashlib, json, shutil, subprocess, tomllib
from pathlib import Path

def sha(b): return 'sha256:' + hashlib.sha256(b).hexdigest()
ap=argparse.ArgumentParser(description=__doc__)
ap.add_argument('--canon',type=Path,required=True)
ap.add_argument('--examples',type=Path,required=True)
ap.add_argument('--law',type=Path,required=True)
ap.add_argument('--output',type=Path,required=True,help='new directory outside Git')
a=ap.parse_args();npm=Path(__file__).resolve().parents[1]
a.canon=a.canon.resolve();a.examples=a.examples.resolve();a.law=a.law.resolve();a.output=a.output.resolve()
pin=json.loads((npm/'source-pin.json').read_text())
if a.output.exists():raise ValueError('output must be new')
a.output.mkdir(parents=True)
version=json.loads(subprocess.check_output([str(a.law),'version','--json']))
if version['tool']!='0.2.2':raise ValueError('expected released CLI 0.2.2')
for p,meta in pin['examplesSource']['files'].items():
    b=(a.examples/p).read_bytes()
    if len(b)!=meta['bytes'] or sha(b)!=meta['sha256']:raise ValueError('example pin mismatch: '+p)
for meta in pin['files'].values():
    b=(a.canon/meta['from']).read_bytes()
    if len(b)!=meta['bytes'] or sha(b)!=meta['sha256']:raise ValueError('canon pin mismatch: '+meta['from'])
fixtures={};records=[]
for folder in ['familie-weimar','familie-weimar-varianten']:
    dest=a.output/folder;dest.mkdir()
    for p in pin['examplesSource']['files']:
        if p.startswith(folder+'/'):
            target=a.output/p;target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a.examples/p,target)
    with (a.output/(folder+'-install.log')).open('w') as log:
        subprocess.run([str(a.law),'install','--registry','arxo='+str(a.canon/'registry')],cwd=dest,check=True,stdout=log,stderr=subprocess.STDOUT)
    for case in tomllib.loads((dest/'law.toml').read_text())['cases']:
        name=case['name'];run=a.output/'runs'/name
        query='queries/collect-w.json' if folder.endswith('varianten') else 'queries/wohngeld-485.json'
        with (a.output/(name+'.log')).open('w') as log:
            subprocess.run([str(a.law),'ask','.', '--case',name,'--query-json',query,'--out',str(run)],cwd=dest,check=True,stdout=log,stderr=subprocess.STDOUT)
        raw=(run/'request.json').read_bytes();request=json.loads(raw);c=request['case']
        if request['semanticVersion']!='0.2.11':raise ValueError('case semantics mismatch')
        fixtures[name]={'legalTime':c['context']['legalTime'],**{k:c[k] for k in ['assertions','context','constants','options'] if k in c}}
        records.append({'name':name,'path':folder+'/'+case['path'],'sourceHash':pin['examplesSource']['files'][folder+'/'+case['path']]['sha256'], 'requestHash':sha(raw)})
(npm/'examples').mkdir(exist_ok=True)
(npm/'examples/familie-weimar-cases.json').write_text(json.dumps(fixtures,ensure_ascii=False,indent=2)+'\n')
(npm/'examples/provenance.json').write_text(json.dumps({'format':'arxo.wohngeld-case-capture/1','source':pin['examplesSource']|{'files':pin['examplesSource']['files']},'cli':version,'cases':records},ensure_ascii=False,indent=2)+'\n')
print('captured',len(fixtures),'cases')
