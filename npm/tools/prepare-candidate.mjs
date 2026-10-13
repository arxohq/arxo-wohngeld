/** Prepare exactly one local candidate. No network, upload or publication. */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
if(args.length!==2||args[0]!=='--out')throw new Error('Usage: node tools/prepare-candidate.mjs --out NEW_DIRECTORY_OUTSIDE_GIT');
const out=resolve(args[1]);const fromCanon=relative(resolve(root,'..'),out);
if(!fromCanon.startsWith('..')||existsSync(out))throw new Error('Use a new output directory outside the canon checkout');
execFileSync(process.execPath,['tools/build.mjs','--canon','..'],{cwd:root,stdio:'inherit'});
mkdirSync(out,{recursive:true});
const packed=JSON.parse(execFileSync('npm',['pack','--ignore-scripts','--json','--pack-destination',out],{cwd:root,encoding:'utf8'}))[0];
const bytes=readFileSync(join(out,packed.filename));
const manifest={schema:'arxo.npm-candidate/1',status:'PREPARED_WITH_DEFERRED_VERIFICATION',published:false,releaseVerified:false,corpus:'not_checked',
 note:'Single private Wohngeld candidate. Addressed checks are reported separately; public source terms remain unconfirmed.',
 requiredPublishedDependencies:{'@arxo/law':'0.4.2'},
 packages:[{name:packed.name,file:packed.filename,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')}]};
writeFileSync(join(out,'facade-npm.json'),JSON.stringify(manifest,null,2)+'\n');
writeFileSync(join(out,'inventory.json'),JSON.stringify(packed.files,null,2)+'\n');
console.log(JSON.stringify(manifest,null,2));
