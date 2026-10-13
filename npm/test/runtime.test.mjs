import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { open } from '@arxo/law';
import { loadModel, models } from '@arxo/canon-de-wohngeld';
import { household, caseNames, getCaseInput } from '@arxo/canon-de-wohngeld/examples/familie-weimar';
const decode = answer => JSON.parse(new TextDecoder().decode(answer.document));
const model = await loadModel('de.social.wohngeld@0.1.0');
const law = await open(model.spec, { offline:true, local:{packages:{[model.spec]:model.package}} });
const expected = { Familie2025:'485', Familie20241231:'463', FamilieOhneWuerdigung:'485', AlleinGrundsicherung:null, VMiete850:'644', VSteuer:'542', VWerbung2000:'499', VOhneMittelpunkt:'351', V20270101:null };

test('three pinned Node entries open and expose native trees and catalog handoff',async()=>{
  for (const info of models) {
    const entry=await import('@arxo/canon-de-wohngeld/'+info.subpath);
    assert.equal(entry.spec,info.spec);
    const m=await entry.loadModel();
    assert.equal(m.package.meta.contentHash,info.worldHash);
    assert.equal(m.package.meta.packageContentHash,info.packageHash);
    assert.equal(m.descriptor.contentHash,info.packageHash);
    assert.equal(Boolean(m.questionCatalog),Boolean(info.questionCatalogHash));
    const p=await open(m.spec,{offline:true,local:{packages:{[m.spec]:m.package}}});
    const q=info.subpath==='wohngeld'?'wohngeld_monatlich':info.subpath==='wohngeld-verordnung'?'mietenstufe_gemeinde':'einkuenfte_nichtselbstaendige_arbeit';
    assert.equal(p.unfold(q,{depth:2}).tree.name,q);
    if(m.questionCatalog){assert.equal(m.questionCatalog.package,info.name);assert.ok(p.questions('en'));}
  }
  assert.deepEqual(model.package.ir.imports.map(x=>x.package.name).sort(),['de.social.wohngeld_verordnung','de.tax.income_for_wohngeld']);
});

test('nine book cases preserve statuses, exact Money and judgment provenance',async()=>{
  assert.deepEqual([...caseNames].sort(),Object.keys(expected).sort());
  for (const name of caseNames) {
    const input=getCaseInput(name);const original=structuredClone(input);
    const a=await law.collect('wohngeld_monatlich',[household,'?amount'],input);
    assert.equal(a.evaluationStatus,'COMPUTED');
    assert.equal(a.value[0]?.value??null,expected[name]);
    if(a.value.length)assert.equal(a.value[0].currency,'EUR');
    assert.ok(a.proof.nodes.length);assert.match(a.hashes.result,/^sha256:[a-f0-9]{64}$/);
    assert.deepEqual(decode(a).proofGraph,a.proof);
    if(name==='V20270101')assert.ok(a.issues.some(i=>i.code==='MISSING_PARAMETER_VALUE'));
    if(name==='AlleinGrundsicherung'){
      const excluded=await law.truth('kein_wohngeldanspruch',[household,'ALLE_AUSGESCHLOSSEN_21_NR2'],input);
      assert.equal(excluded.truthStatus,'TRUE_ONLY');
    }else if(name!=='V20270101'){
      const claim=await law.truth('wohngeldanspruch',[household,expected[name]+' EUR'],input);
      assert.equal(claim.truthStatus,name==='FamilieOhneWuerdigung'?'NEITHER':'TRUE_ONLY');
      assert.equal(claim.evaluationStatus,name==='FamilieOhneWuerdigung'?'REQUIRES_JUDGMENT':'COMPUTED');
      const judgments=input.assertions.filter(x=>x.literal.predicate.endsWith('#missbraeuchliche_inanspruchnahme'));
      if(name==='FamilieOhneWuerdigung'){
        assert.deepEqual(judgments,[]);
        assert.ok(decode(claim).results[0].judgmentRequests.some(r=>r.predicate.endsWith('#missbraeuchliche_inanspruchnahme')));
      }else{assert.equal(judgments[0].origin,'adjudicated');assert.equal(judgments[0].literal.polarity,'negative');}
    }
    assert.deepEqual(input,original);
  }
});

test('income, counted rent and three-member variant match the book',async()=>{
  for(const [name,q,expected] of [['Familie2025','monatliches_gesamteinkommen','1710'],['Familie2025','zu_beruecksichtigende_miete','777.8'],['VSteuer','monatliches_gesamteinkommen','1496.25'],['VWerbung2000','monatliches_gesamteinkommen','1658.6666666667'],['VOhneMittelpunkt','anzahl_zu_beruecksichtigende_haushaltsmitglieder',3]]){
    const a=await law.collect(q,[household,'?value'],getCaseInput(name));assert.equal(a.value[0].value,expected);
  }
});

test('dates select pinned A3 rows, anchors and reproducible canonical documents',async()=>{
  for(const [name,date] of [['Familie2025','2025-01-01'],['Familie20241231','2023-01-01']]){
    const a=await law.collect('wohngeld_monatlich',[household,'?amount'],getCaseInput(name));
    const b=await law.collect('wohngeld_monatlich',[household,'?amount'],getCaseInput(name));
    assert.deepEqual(a.document,b.document);assert.deepEqual(a.hashes,b.hashes);
    const selections=a.proof.nodes.flatMap(n=>n.attributes?.a3Selections??[]);
    assert.ok(selections.some(s=>s.dataset.endsWith(':HoechstbetragMitglieder4MietenstufeIII')&&s.row.endsWith('#'+date)));
    const anchors=a.proof.nodes.flatMap(n=>(n.attributes?.functionCalls??[]).flatMap(c=>c.sourceAnchors??[]));
    assert.ok(anchors.some(s=>s.includes('ANLAGE1')));
  }
});

test('captured existing unknown, conflicting and rounding scenarios keep their expectations',async()=>{
  const fixtures=JSON.parse(readFileSync(new URL('./boundary-cases.json',import.meta.url)));
  for(const row of fixtures){
    for(const step of row.steps??[row]){
      const input={legalTime:row.case.context.legalTime,...structuredClone(row.case)};
      const a=await law.truth(step.query.literal.predicate,step.query.literal.args,input);
      for(const e of step.expectations){
        assert.equal(e.op,'eq');assert.equal(a[e.field==='truth_status'?'truthStatus':'evaluationStatus'],e.value,row.title);
      }
    }
  }
});

test('fixture callers cannot mutate shared input; unknown names fail',()=>{
  const a=getCaseInput('Familie2025');a.assertions.splice(0);assert.ok(getCaseInput('Familie2025').assertions.length);
  assert.throws(()=>getCaseInput('Missing'),RangeError);assert.throws(()=>getCaseInput('__proto__'),RangeError);
});
