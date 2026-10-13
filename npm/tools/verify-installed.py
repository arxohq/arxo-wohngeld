#!/usr/bin/env python3
"""Verify one tarball in a new consumer with an explicitly chosen Node binary."""
import argparse,hashlib,json,os,re,shutil,subprocess,tarfile
from pathlib import Path
ap=argparse.ArgumentParser(description=__doc__)
ap.add_argument('--candidate',type=Path,required=True);ap.add_argument('--node',type=Path,required=True);ap.add_argument('--out',type=Path,required=True)
ap.add_argument('--examples-readme',type=Path)
a=ap.parse_args();a.candidate=a.candidate.resolve();a.node=a.node.resolve();a.out=a.out.resolve()
npm=Path(__file__).resolve().parents[1]
if a.out.exists():raise ValueError('consumer output must be new')
manifest=json.loads((a.candidate/'facade-npm.json').read_text());row=manifest['packages'][0];archive=a.candidate/row['file'];raw=archive.read_bytes()
if len(raw)!=row['bytes'] or hashlib.sha256(raw).hexdigest()!=row['sha256']:raise ValueError('tarball does not match manifest')
allowed={'src','types','data','models.json','index.d.ts','source-pin.json','canon-packages.json','examples','assets','README.md','LICENSE','NOTICE','PUBLICATION-BOUNDARY.json','PUBLISHING.md','package.json'}
inventory=[]
with tarfile.open(archive) as tar:
 for f in tar.getmembers():
  p=Path(f.name)
  if not f.isfile() or p.parts[0]!='package' or p.parts[1] not in allowed or '..' in p.parts:raise ValueError('unexpected archive member: '+f.name)
  b=tar.extractfile(f).read()
  if any(s in b for s in [b'/Users/',b'/private/var/',b'/tmp/']):raise ValueError('machine path: '+f.name)
  if any(s in p.parts for s in ['node_modules','__pycache__','sources','tools','test']):raise ValueError('authoring/cache material: '+f.name)
  inventory.append({'path':f.name,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
a.out.mkdir(parents=True)
(a.out/'package.json').write_text(json.dumps({'private':True,'type':'module','dependencies':{'@arxo/canon-de-wohngeld':'file:'+str(archive),'@arxo/law':'0.4.2'},'devDependencies':{'typescript':'5.9.3'}},indent=2)+'\n')
env=os.environ.copy();env['PATH']=str(a.node.parent)+os.pathsep+env['PATH']
version=subprocess.check_output([str(a.node),'--version'],text=True).strip()
steps=[]
def run(name,cmd):
 with (a.out/(name+'.log')).open('w') as log:p=subprocess.run(cmd,cwd=a.out,env=env,stdout=log,stderr=subprocess.STDOUT)
 steps.append({'check':name,'exitCode':p.returncode});print(name,p.returncode,flush=True)
 if p.returncode:raise RuntimeError('check failed: '+name)
run('install',['npm','install','--ignore-scripts','--no-audit','--no-fund'])
shutil.copytree(npm/'test',a.out/'test')
run('runtime',[str(a.node),'--test','test/load.test.mjs','test/runtime.test.mjs'])
run('types',[str(a.node),'node_modules/typescript/bin/tsc','--noEmit','--strict','--target','ES2022','--module','NodeNext','--moduleResolution','NodeNext','--lib','ES2022,DOM,ESNext.Disposable','test/types.fixture.ts'])
docs=[('npm-readme',npm/'README.md'),('canon-readme',npm.parent/'README.md'),('examples-readme',a.examples_readme or npm.parent.parent/'law-as-code-germany-examples/README.md')]
for name,doc in docs:
 blocks=re.findall(r'```js\n(.*?)```',doc.read_text(),re.S)
 for i,block in enumerate(blocks):
  # Evidence inspection deliberately continues the first full example.
  source=blocks[0]+'\n'+block if block.startswith("import { writeFile }") else block
  file=f'{name}-{i}.mjs';(a.out/file).write_text(source);run(f'{name}-{i}',[str(a.node),file])
run('bundled-example',[str(a.node),'node_modules/@arxo/canon-de-wohngeld/examples/run-familie-weimar.mjs'])
report={'format':'arxo.wohngeld-installed-check/1','node':version,'tarball':row,'sdk':'0.4.2','engine':'0.5.2','typescript':'5.9.3','skipLibCheck':False,'checks':steps,'inventory':inventory,'passed':True,'published':False,'releaseVerified':False,'corpus':'not_checked'}
(a.out/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print('installed candidate verified on',version,flush=True)
