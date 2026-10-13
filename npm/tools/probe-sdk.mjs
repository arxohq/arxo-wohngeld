import { open } from '@arxo/law';
import { writeFileSync, mkdirSync } from 'node:fs';
import { loadModel, models } from '../src/index.js';
import { household, caseNames, getCaseInput } from '../examples/familie-weimar.js';
const out=process.argv[2];if(!out)throw new Error('output directory required');mkdirSync(out,{recursive:true});
const write=(name,data)=>writeFileSync(`${out}/${name}.json`,JSON.stringify(data,null,2)+'\n');
for (const m of models) {
  const model=await loadModel(m.spec);
  const law=await open(model.spec,{offline:true,local:{packages:{[model.spec]:model.package}}});
  console.log(m.spec, law.unfold(m.subpath==='wohngeld'?'wohngeld_monatlich':m.subpath==='wohngeld-verordnung'?'mietenstufe_gemeinde':'einkuenfte_nichtselbstaendige_arbeit',{depth:2}).tree.name);
  if(m.subpath!=='wohngeld')continue;
  write('unfold',law.unfold('wohngeld_monatlich',{depth:2}));
  for (const name of caseNames) {
    const input=getCaseInput(name);
    const h=household;
    const answer=await law.collect('wohngeld_monatlich',[h,'?amount'],input);
    const claim=await law.truth('wohngeldanspruch',[h, `${answer.value?.[0]?.value??'485'} EUR`],input);
    write(name,{amount:{...answer,document:Array.from(answer.document)},claim:{...claim,document:Array.from(claim.document)}});
    write(name+'-document',JSON.parse(new TextDecoder().decode(answer.document)));
    console.log(name,answer.evaluationStatus,JSON.stringify(answer.value),claim.evaluationStatus,claim.truthStatus);
  }
}
