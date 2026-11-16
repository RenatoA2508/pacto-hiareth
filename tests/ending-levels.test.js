import test from 'node:test';
import assert from 'node:assert/strict';
import { ENDING_LEVELS, RESCUE_LEVEL } from '../src/config/ending-levels.js';
import { DIFFICULTIES, levelForDifficulty } from '../src/config/difficulty.js';
import { GAME, MOVEMENT } from '../src/config/game.js';

test('los niveles finales conservan apoyo y saltos alcanzables en cada dificultad', () => {
  const maxRange = 2 * MOVEMENT.jumpSpeed * MOVEMENT.speed / GAME.gravity;
  const maxRise = MOVEMENT.jumpSpeed ** 2 / (2 * GAME.gravity);

  for (const base of [...Object.values(ENDING_LEVELS), RESCUE_LEVEL]) {
    for (const difficulty of Object.keys(DIFFICULTIES)) {
      const level = levelForDifficulty(base, difficulty);
      const ground = level.platforms.filter((platform) => platform.y === 470);
      const label = `${base.id} / ${difficulty}`;
      for (const x of [...level.enemies, ...level.checkpoints.map((point) => point.x), level.portal.x]) {
        assert.ok(ground.some((platform) => x > platform.x + 15 && x < platform.x + platform.width - 15), `${label}: sin suelo en x=${x}`);
      }
      for (let n = 1; n < ground.length; n++) {
        const gap = ground[n].x - ground[n - 1].x - ground[n - 1].width;
        assert.ok(gap < maxRange - 20, `${label}: hueco de ${gap}px`);
      }
      for (const platform of level.platforms) {
        assert.ok(platform.width > 0 && 470 - platform.y <= maxRise, `${label}: plataforma inalcanzable`);
      }
    }
  }
});
