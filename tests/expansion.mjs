import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

global.window=global;
for(const file of ['engine-core.js','balance.js','expansion.js']) vm.runInThisContext(fs.readFileSync(file,'utf8'),{filename:file});
const E=global.UTEngine;
assert.ok(E?.__deepExpansion,'deep expansion should patch the simulation engine');
const world=E.generate('EXPANSION-CI',{systemCount:120,factionCount:9,temperament:'volatile'});
assert.equal(world.expansion.version,2);
assert.equal(world.expansion.ancients.sites.length>=3,true);
assert.ok(world.factions.every(f=>f.leader&&f.ideology&&f.faith));

E.advance(world,3000); // 250 years
assert.ok(world.year>=2450);
assert.ok(world.expansion.senate.founded,'senate should form in mature galaxies');
assert.ok(world.expansion.senate.resolutions.length>10,'senate should hold repeated sessions');
assert.ok(world.expansion.espionage.operations.length>0,'espionage layer should generate operations');
assert.ok(world.expansion.replay.length>=20,'timeline replay should retain long-term frames');
assert.ok(world.expansion.leaderHistory.length>0,'leaders should experience succession');
assert.ok(world.expansion.ancients.artifacts.length>0,'precursor archaeology should produce discoveries');
assert.ok(world.expansion.crisis,'late-game crisis should emerge by the hard deadline');
assert.ok(Array.isArray(world.expansion.megastructures));
assert.ok(Array.isArray(world.expansion.federations));
assert.ok(world.factions.every(f=>Number.isFinite(f.tech)&&Number.isFinite(f.fleet)&&Number.isFinite(f.stability)));
assert.ok(world.systems.filter(s=>s.owner!=null).every(s=>Number.isFinite(s.population)&&Number.isFinite(s.economy)));

const json=E.serialize(world);
const restored=E.deserialize(json);
assert.equal(restored.expansion.version,2);
assert.equal(restored.expansion.senate.founded,world.expansion.senate.founded);
assert.equal(restored.expansion.replay.length,world.expansion.replay.length);
assert.equal(E.currentWorld,restored);
console.log(`Expansion stress passed: ${restored.year}, ${restored.expansion.senate.resolutions.length} senate sessions, ${restored.expansion.espionage.operations.length} ops, ${restored.expansion.megastructures.length} megastructures, crisis=${restored.expansion.crisis?.name}.`);
