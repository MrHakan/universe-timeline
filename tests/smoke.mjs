import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

global.window = global;
vm.runInThisContext(fs.readFileSync('engine-core.js','utf8'), {filename:'engine-core.js'});

const E = global.UTEngine;
assert.ok(E, 'engine should expose UTEngine');
const world = E.generate('CI-UNIVERSE', {systemCount:100, factionCount:8, temperament:'volatile'});
assert.equal(world.systems.length, 100);
assert.equal(world.factions.length, 8);
assert.ok(world.systems.every(s => Array.isArray(s.neighbors) && s.neighbors.length >= 1));
const before = E.summary(world);
E.advance(world, 1200); // 100 simulated years
const after = E.summary(world);
assert.ok(world.year >= 2300);
assert.ok(world.events.length > 8);
assert.ok(after.factions >= 1);
assert.ok(after.colonized >= before.colonized);
assert.ok(Number.isFinite(after.population));
assert.ok(Number.isFinite(after.economy));
const save = E.serialize(world);
const restored = E.deserialize(save);
assert.equal(restored.year, world.year);
assert.equal(restored.systems.length, world.systems.length);
console.log(`Smoke test passed: year ${world.year}, ${after.factions} factions, ${world.events.length} events, ${world.wars.length} wars recorded.`);
