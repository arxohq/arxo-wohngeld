/** SVGs from admitted SDK answers and native unfold, without subject arithmetic. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { open } from '@arxo/law';
import { loadModel } from '../src/wohngeld.js';
import { household, getCaseInput } from '../examples/familie-weimar.js';
const assets=new URL('../assets/',import.meta.url);mkdirSync(assets,{recursive:true});
const write=(name,data)=>writeFileSync(new URL(name,assets),data);
const model=await loadModel();const law=await open(model.spec,{offline:true,local:{packages:{[model.spec]:model.package}}});
const evidence=[];
for(const name of ['Familie2025','FamilieOhneWuerdigung']){
  const input=getCaseInput(name);const amount=await law.collect('wohngeld_monatlich',[household,'?amount'],input);
  const claim=await law.truth('wohngeldanspruch',[household,'485 EUR'],input);
  assert.equal(amount.value[0].value,'485');
  assert.equal(claim.truthStatus,name==='Familie2025'?'TRUE_ONLY':'NEITHER');
  const document=JSON.parse(new TextDecoder().decode(claim.document));
  evidence.push({name,legalTime:input.legalTime,amount:{evaluationStatus:amount.evaluationStatus,value:amount.value,hashes:amount.hashes,proofNodes:amount.proof.nodes.length},
    claim:{evaluationStatus:claim.evaluationStatus,truthStatus:claim.truthStatus,judgmentRequests:document.results[0].judgmentRequests,hashes:claim.hashes}});
}
const unfold=law.unfold('wohngeld_monatlich',{depth:2,lang:'en',quote:0});
write('wohngeld-unfold.json',JSON.stringify(unfold,null,2)+'\n');
write('example-evidence.json',JSON.stringify({format:'arxo.wohngeld-readme-evidence/1',spec:model.spec,worldHash:model.pin.worldHash,sdk:'@arxo/law@0.4.2',engine:'@arxo/law-engine@0.5.2',cases:evidence},null,2)+'\n');
const C={ink:'#122d4c',muted:'#51657c',cream:'#f8f4eb',line:'#d9e0e6',blue:'#315d84',green:'#14644b',greenSoft:'#e6f1eb',amber:'#875617',amberSoft:'#fbefd9'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const text=(x,y,s,size=22,color=C.ink,weight=400,mono=false)=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}"${mono?' class="mono"':''}>${esc(s)}</text>`;
const box=(x,y,w,h,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${color}"/>`;
const line=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${C.blue}" stroke-width="2" marker-end="url(#arrow)"/>`;
const svg=(w,h,title,desc,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><style>text{font-family:Arial,Helvetica,sans-serif}.mono{font-family:ui-monospace,Menlo,Consolas,monospace}</style><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8" fill="${C.blue}"/></marker></defs>${box(0,0,w,h,C.cream)}${body.join('\n')}</svg>\n`;
const amount=evidence[0].amount.value[0].value;
write('cover.svg',svg(1200,620,'German Housing Benefit on Arxo','Three pinned German models and nine book cases. Demonstration for Node.js, with explicit facts, dates and judgments.',[
  text(56,67,'ARXO  /  LAW AS CODE BY COUNTRY · VOLUME 2',19,C.muted,650),
  text(56,166,'German Housing',60,C.ink,750),text(56,236,'Benefit on Arxo',60,C.ink,750),
  text(58,302,'Wohngeld · pinned models · inspectable answers',24,C.muted),
  box(57,351,602,67,'#e8ecef'),text(81,394,'Node.js 20+   /   @arxo/law 0.4.2',23,C.blue,600,true),
  text(58,490,'3 model entries',28,C.ink,700),text(58,533,'9 fictional cases from the German book',22,C.muted),
  box(764,111,380,345,C.ink),text(795,162,'FAMILIE2025',20,'#d8e5ed',600,true),
  text(793,273,`€${amount}`,84,'#ffffff',750),text(797,315,'monthly model amount',23,'#d8e5ed'),
  text(797,387,evidence[0].claim.truthStatus,23,'#bce3cd',650,true),text(797,424,'Claim includes an explicit judgment',17,'#d8e5ed'),
  text(58,590,'OPEN SOURCE  /  NONCOMMERCIAL TEACHING DEMONSTRATION  /  PINNED MODELS',16,C.muted,600),
]));
write('model-to-answer.svg',svg(1000,570,'From pinned model and case to answer','Model, facts and legal date enter the common engine. Amount and claim are separate queries. The canonical document retains proof and parameter-row evidence.',[
  text(38,53,'One model. Explicit inputs. Inspectable results.',31,C.ink,700),
  box(38,90,285,120,'#e8ecef'),text(57,126,'loadModel()',23,C.blue,650,true),text(57,160,'Pinned world + 2 imports',21),text(57,191,'Original bytes checked',19,C.muted),
  box(358,90,604,120,'#e8ecef'),text(380,126,'getCaseInput(\'Familie2025\')',23,C.blue,650,true),text(380,163,'Facts · legal date · adjudicated judgment',21),text(380,191,'2025-01-01 · Europe/Berlin',19,C.muted),
  line(180,214,180,250),line(660,214,660,250),box(38,260,924,85,'#dce6ef'),text(62,297,'@arxo/law → open(... local.packages)',25,C.blue,650,true),text(62,325,'Offline WebAssembly execution · model formulas and rounding',19,C.muted),
  line(279,350,279,385),line(732,350,732,385),box(38,398,448,130,C.greenSoft),box(514,398,448,130,C.greenSoft),
  text(62,434,'wohngeld_monatlich',21,C.green,600,true),text(62,481,`${amount} EUR`,34,C.green,700),text(62,511,evidence[0].amount.evaluationStatus,19,C.green,600,true),
  text(538,434,'wohngeldanspruch',21,C.green,600,true),text(538,477,evidence[0].claim.truthStatus,27,C.green,700,true),text(538,512,'document · proof · A3 selections · hashes',18,C.green),
]));
const fork=[text(38,56,'An amount is available before a claim is established.',29,C.ink,700)];
for(let i=0;i<evidence.length;i++){
  const e=evidence[i],x=38+i*480,color=i?C.amber:C.green;
  fork.push(box(x,90,444,335,i?C.amberSoft:C.greenSoft),text(x+24,131,e.name,23,C.ink,650,true),
    text(x+24,174,`${e.amount.value[0].value} EUR · amount`,29,color,700),text(x+24,218,e.claim.truthStatus,23,color,650,true),
    text(x+24,252,e.claim.evaluationStatus,21,color,600,true),
    text(x+24,310,i?'Judgment is absent':'Explicit negative assertion',21,C.ink,600),
    text(x+24,346,i?'Wohngeldbehörde must assess § 21 Nr. 3':'origin: adjudicated',18,C.muted,!i?600:400,!i),
    text(x+24,392,i?'No judgment is invented by the loader':'missbraeuchliche_inanspruchnahme',16,C.muted));
}
write('amount-and-claim.svg',svg(1000,460,'Amount and claim are separate','Both cases compute EUR 485. The case with an adjudicated negative misuse judgment establishes the claim. The other requires judgment.',fork));
const rows=[];
function visit(node,depth=0,producer=false){
  const name=node.name??(node.kind==='comparison'?'comparison':node.kind??'test');
  rows.push({depth,name,prefix:producer?'⇐ ':node.polarity==='negative'?'not ':'',producer,anchor:node.anchors?.[0]?.locator??'',folded:node.folded??false});
  for(const p of node.producers??[])visit(p,depth+1,true);
  for(const p of node.premises??[])visit(p,depth+1,false);
}
visit(unfold.tree);
write('knows-wohngeld.svg',svg(1100,150+rows.length*33,'What the model knows: wohngeld_monatlich','Native unfold at depth 2, without a selected case. Full tree and text are bundled in wohngeld-unfold.json.',[
  text(30,40,'WHAT THE MODEL KNOWS',18,C.muted,700),text(30,75,"de.social.wohngeld@0.1.0 · unfold('wohngeld_monatlich', { depth: 2 })",18,C.muted,400,true),
  box(24,94,1052,38,C.greenSoft),text(40,120,'question  wohngeld_monatlich',21,C.green,650,true),
  ...rows.map((r,i)=>text(36+r.depth*25,161+i*33,(r.prefix+r.name).slice(0,82-r.depth*3),17,r.producer?'#5149a1':C.ink,r.producer?650:400,true)+text(920,161+i*33,r.anchor,13,'#8b5a1b')),
]));
const images=['cover','model-to-answer','amount-and-claim','knows-wohngeld'];
for (const name of images) execFileSync('rsvg-convert', [fileURLToPath(new URL(name+'.svg',assets)), '-o', fileURLToPath(new URL(name+'.png',assets))]);
const files=['cover.svg','model-to-answer.svg','amount-and-claim.svg','knows-wohngeld.svg','wohngeld-unfold.json','example-evidence.json','formalization-depth.json',...images.map(name=>name+'.png')];
write('manifest.json',JSON.stringify({format:'arxo.wohngeld-readme-assets/1',worldHash:model.pin.worldHash,
 publicAssets:{repository:'arxohq/law-releases',tag:'canon-de-wohngeld-assets-v0.1.0'},
 tree:{predicate:'wohngeld_monatlich',depth:2,lang:'en',quote:0,caseSelected:false},
 files:Object.fromEntries(files.map(f=>{const b=readFileSync(new URL(f,assets));return[f,{bytes:b.length,sha256:'sha256:'+createHash('sha256').update(b).digest('hex')}]}))},null,2)+'\n');
console.log('SVGs generated from SDK evidence and native unfold.');
