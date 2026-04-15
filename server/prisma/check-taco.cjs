const taco = require('./taco.json');
const tacoDescs = taco.map(t => t.description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase());

const fs = require('fs');
const checkFile = fs.readFileSync('./check-foods.ts', 'utf-8');
const match = checkFile.match(/const foodList = \[([\s\S]*?)\]/);
if (!match) { console.log('Could not parse food list'); process.exit(1); }
const foodsStr = match[1];
const foods = foodsStr.match(/"([^"]+)"/g).map(s => s.replace(/"/g, ''));
const unique = [...new Set(foods)];

function norm(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

const found = [];
const missing = [];

for (const food of unique) {
  const search = norm(food);
  const inTaco = tacoDescs.some(t => t.includes(search));
  if (inTaco) {
    found.push(food);
  } else {
    missing.push(food);
  }
}

console.log('=== COBERTURA TACO ===');
console.log('Total alimentos do usuario:', unique.length);
console.log('Encontrados no TACO:', found.length);
console.log('Ausentes no TACO:', missing.length);
console.log('Cobertura:', ((found.length/unique.length)*100).toFixed(1) + '%');
console.log();
console.log('--- ENCONTRADOS NO TACO (' + found.length + ') ---');
found.forEach(f => console.log('  + ' + f));
console.log();
console.log('--- AUSENTES NO TACO (' + missing.length + ') ---');
missing.forEach(f => console.log('  - ' + f));
