import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

global.window = global;
for (const file of ['engine-core.js','balance.js']) vm.runInThisContext(fs.readFileSync(file,'utf8'), {filename:file});

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
assert.ok(world.events.length > 20);
assert.ok(after.factions >= 1);
assert.ok(after.colonized >= before.colonized);
assert.ok(Number.isFinite(after.population) && after.population > 0);
assert.ok(Number.isFinite(after.economy) && after.economy > 0);
assert.ok(world.wars.length > 0, 'simulation should produce historical wars');
assert.ok(world.alliances.length > 0, 'simulation should produce alliances');
assert.ok(world.tradeRoutes.length > 0, 'simulation should produce trade routes');
const restored = E.deserialize(E.serialize(world));
assert.equal(restored.year, world.year);
assert.equal(restored.systems.length, world.systems.length);
console.log(`Smoke test passed: year ${world.year}, ${after.factions} factions, ${world.wars.length} wars, ${world.alliances.length} alliances, ${world.events.length} events.`);
