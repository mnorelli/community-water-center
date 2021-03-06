import { updateList } from  './updatelist.js';

export function summary(json) {
  let population = 0;

  let systemMap = new Map();
  let analyteMap = new Map();

  json.forEach( (v) => {
    let foundSystemMap = systemMap.get(v.WATER_SYSTEM_NUMBER)
    if(typeof(foundSystemMap) == 'undefined') {
      systemMap.set(v.WATER_SYSTEM_NUMBER,[v]);
    } else {
      updateList(systemMap,v.WATER_SYSTEM_NUMBER,v);
    }

    let foundAnalyteMap = analyteMap.get(v.ANALYTE_NAME)
    if(typeof(foundAnalyteMap) == 'undefined') {
      analyteMap.set(v.ANALYTE_NAME,[v]);
    } else {
      updateList(analyteMap,v.ANALYTE_NAME,v);
    }
  })
  systemMap.forEach( (item) => {
    population += parseInt(item[0].POPULATION);
  })
  let systemCount = systemMap.size;
  let analyteCount = analyteMap.size;

  return `
    <div class="numcards">
      <p class="numcard">
        <span class="bignum">${population.toLocaleString('en')}</span> 
        <span>People with Unsafe Drinking Water</span>
      </p>
      <p class="numcard">
        <span class="bignum">${systemCount}</span> 
        <span>Non-Compliant Water Systems</span>
      </p>
      <p class="numcard">
        <span class="bignum">${analyteCount}</span> 
        <span>Analyte(s) Exceeding a Drinking Water Standard</span>
      </p>
    </div>
  `
}
