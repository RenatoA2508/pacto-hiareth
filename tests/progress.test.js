import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageManager } from '../src/managers/StorageManager.js';
import { LevelProgress } from '../src/systems/LevelProgress.js';
import { LEVEL1 } from '../src/config/level1.js';
import { LEVEL2 } from '../src/config/level2.js';
import { MOVEMENT, GAME } from '../src/config/game.js';

function store() {
  let saved = null;
  return new StorageManager({ getItem: () => saved, setItem: (_, value) => { saved = value; } });
}
const counts = { checkpointCount: LEVEL1.checkpoints.length, enemyCount: LEVEL1.enemies.length };

test('el nivel concede puntos de avance con cero bajas', () => {
  const storage = store(); const progress = new LevelProgress(storage, counts);
  progress.reachCheckpoint(1); progress.reachCheckpoint(2); progress.complete();
  assert.equal(storage.data.level1Complete, true);
  assert.equal(storage.data.levelReached, 1);
  assert.deepEqual(storage.data.level1Killed, []);
  assert.equal(storage.data.highScore, 700);
});
test('una baja se cuenta una sola vez y persiste independientemente del puntaje', () => {
  const storage = store(); const progress = new LevelProgress(storage, counts);
  assert.equal(progress.defeat(2), true);
  assert.equal(progress.defeat(2), false);
  assert.equal(progress.defeat(-1), false);
  assert.equal(progress.defeat(100), false);
  const resumed = new LevelProgress(storage, counts);
  assert.equal(resumed.killed.has(2), true);
  assert.equal(storage.data.highScore, 0);
});
test('checkpoints avanzan sin retroceder y un viaje nuevo limpia las bajas', () => {
  const storage = store(); const progress = new LevelProgress(storage, counts);
  assert.equal(progress.reachCheckpoint(1.5), false);
  assert.equal(progress.reachCheckpoint(2), true);
  assert.equal(progress.reachCheckpoint(1), false);
  assert.equal(progress.reachCheckpoint(99), false);
  progress.defeat(1); progress.complete(); progress.reset();
  assert.equal(storage.data.level1Checkpoint, 0);
  assert.deepEqual(storage.data.level1Killed, []);
  assert.equal(storage.data.level1Complete, false);
  assert.equal(storage.data.levelReached, 1);
});
test('plataformas elevadas y huecos del nivel son compatibles con el salto aprobado', () => {
  const maxRise = MOVEMENT.jumpSpeed ** 2 / (2 * GAME.gravity);
  const maxRange = MOVEMENT.speed * 2 * MOVEMENT.jumpSpeed / GAME.gravity;
  const ground = LEVEL1.platforms.filter((p) => p.y === 470).sort((a, b) => a.x - b.x);
  for (let i = 1; i < ground.length; i++) assert.ok(ground[i].x - (ground[i - 1].x + ground[i - 1].width) < maxRange - 20);
  for (const platform of LEVEL1.platforms.filter((p) => p.y < 470)) assert.ok(470 - platform.y <= maxRise, `Plataforma ${platform.x} demasiado alta`);
});

test('el segundo nivel guarda su avance sin perder las bajas del primero', () => {
  const storage = store(); const first = new LevelProgress(storage, counts);
  first.defeat(0); first.complete();
  const second = new LevelProgress(storage, { id: 2, checkpointCount: 3, enemyCount: 0 });
  second.reachCheckpoint(1); second.complete();
  assert.equal(storage.data.currentLevel, 2);
  assert.equal(storage.data.levelReached, 2);
  assert.equal(storage.data.level2Complete, true);
  assert.equal(storage.data.level2Checkpoint, 1);
  assert.deepEqual(storage.data.level1Killed, [0]);
  assert.equal(storage.data.level1Complete, true);
  assert.equal(storage.data.highScore, 1100);
});
test('la ciudad mantiene huecos y plataformas alcanzables', () => {
  const range = MOVEMENT.speed * 2 * MOVEMENT.jumpSpeed / GAME.gravity;
  const rise = MOVEMENT.jumpSpeed ** 2 / (2 * GAME.gravity);
  const floor = LEVEL2.platforms.filter((p) => p.y === 470);
  assert.equal(LEVEL2.enemies.length, 4);
  for (let i = 1; i < floor.length; i++) assert.ok(floor[i].x - floor[i - 1].x - floor[i - 1].width < range - 20);
  for (const p of LEVEL2.platforms.filter((p) => p.y < 470)) assert.ok(470 - p.y <= rise);
});

test('puntos no se duplican al reintentar y récord persiste al reiniciar', () => {
  const storage = store(); const first = new LevelProgress(storage, counts);
  first.reachCheckpoint(1); first.defeat(0); first.reachCheckpoint(2); first.complete(); first.complete();
  assert.equal(storage.data.highScore, 700);
  const again = new LevelProgress(storage, counts); again.reset();
  assert.equal(storage.data.highScore, 700);
  again.reachCheckpoint(1); again.complete();
  assert.equal(storage.data.highScore, 700);
});
test('bajas de ciudad persisten y no alteran puntuación', () => {
  const storage = store(); const opts = { id: 2, checkpointCount: 3, enemyCount: 4 };
  const city = new LevelProgress(storage, opts); city.defeat(2); city.defeat(2);
  assert.deepEqual(new LevelProgress(storage, opts).killed, new Set([2]));
  assert.equal(storage.data.highScore, 0);
});

test('completar un recorrido conserva el próximo capítulo al reanudar', () => {
  const storage = store();
  storage.update({ endingStep: 'limbo', limboRoute: 'magic' });
  const limbo = new LevelProgress(storage, { id: 3, checkpointCount: 3, enemyCount: 6 });
  limbo.reachCheckpoint(1);
  limbo.complete({ endingStep: 'valleyIntro', endingPage: 0 });

  assert.equal(storage.data.endingStep, 'valleyIntro');
  assert.equal(storage.data.limboRoute, 'magic');
  assert.equal(storage.data.level3Complete, true);
  assert.equal(storage.data.highScore, 600);

  const rescue = new LevelProgress(storage, { id: 6, checkpointCount: 1, enemyCount: 3 });
  rescue.complete({ endingStep: 'rescueDone' });
  assert.equal(storage.data.endingStep, 'rescueDone');
  assert.equal(storage.data.highScore, 600);
});
