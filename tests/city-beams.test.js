import test from 'node:test';
import assert from 'node:assert/strict';
import { beamPhase, BEAM_COLUMNS } from '../src/systems/CityBeams.js';
import { LEVEL2 } from '../src/config/level2.js';
import { DIFFICULTIES, levelForDifficulty } from '../src/config/difficulty.js';

test('cada haz avisa antes de hacer daño y vuelve a apagarse', () => {
  assert.equal(beamPhase(1899), 'idle');
  assert.equal(beamPhase(1900), 'warning');
  assert.equal(beamPhase(2749), 'warning');
  assert.equal(beamPhase(2750), 'active');
  assert.equal(beamPhase(3300), 'idle');
  assert.equal(beamPhase(0, 2750), 'active');
});

test('los haces dejan suelo a ambos lados y no cubren checkpoints', () => {
  for (const difficulty of Object.keys(DIFFICULTIES)) {
    const level = levelForDifficulty(LEVEL2, difficulty);
    for (const x of BEAM_COLUMNS) {
      assert.ok(level.platforms.some((p) => p.y === 470 && x - 23 > p.x && x + 23 < p.x + p.width));
      assert.ok(level.checkpoints.every((p) => Math.abs(p.x - x) > 50));
    }
  }
});
