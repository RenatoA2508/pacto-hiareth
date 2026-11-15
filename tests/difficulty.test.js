import test from 'node:test';
import assert from 'node:assert/strict';
import { DIFFICULTIES, levelForDifficulty, playerCombat, slimeCombat } from '../src/config/difficulty.js';
import { LEVEL1 } from '../src/config/level1.js';
import { LEVEL2 } from '../src/config/level2.js';
import { MOVEMENT, GAME } from '../src/config/game.js';
import { StorageManager, sanitizeSave } from '../src/managers/StorageManager.js';

test('la dificultad persiste y las partidas anteriores usan Media sin perder bajas', () => {
  let saved = JSON.stringify({ version: 1, level1Killed: [2] });
  const disk = { getItem: () => saved, setItem: (_, v) => { saved = v; } };
  const store = new StorageManager(disk);
  assert.equal(store.data.difficulty, 'medium');
  store.update({ difficulty: 'hard' });
  assert.equal(new StorageManager(disk).data.difficulty, 'hard');
  assert.deepEqual(new StorageManager(disk).data.level1Killed, [2]);
  for (const invalid of ['__proto__', 'unknown', null]) assert.equal(sanitizeSave({version: 1, difficulty: invalid}).difficulty, 'medium');
});
test('todos los perfiles preservan apoyos de respawn, enemigos y saltos realizables', () => {
  const range = MOVEMENT.speed * 2 * MOVEMENT.jumpSpeed / GAME.gravity;
  for (const base of [LEVEL1, LEVEL2]) {
    const before = JSON.stringify(base);
    for (const key of Object.keys(DIFFICULTIES)) {
      const map = levelForDifficulty(base, key);
      const floors = map.platforms.filter(p => p.y === 470).sort((a,b) => a.x-b.x);
      for (const p of map.platforms) assert.ok(p.width >= 100);
      for (let i=1;i<floors.length;i++) assert.ok(floors[i].x-floors[i-1].x-floors[i-1].width < range-20);
      for (const x of [...base.checkpoints.map(c=>c.x),base.portal.x,...base.enemies]) assert.ok(floors.some(p=>x-20 >= p.x && x+20 <= p.x+p.width), `${base.id}/${key}: apoyo en ${x}`);
      assert.deepEqual(map.enemies,base.enemies);
    }
    assert.equal(JSON.stringify(base),before);
  }
});
test('la presión crece manteniendo el ataque anticipado y la posibilidad de esquivar', () => {
  assert.ok(playerCombat('easy').maxHealth > playerCombat('medium').maxHealth);
  assert.ok(playerCombat('medium').invulnerabilityMs > playerCombat('hard').invulnerabilityMs);
  for(const key of Object.keys(DIFFICULTIES)) {
    const enemy=slimeCombat(key);
    assert.ok(enemy.speed < MOVEMENT.speed);
    assert.equal(enemy.attack.windupMs,500);
    assert.ok(enemy.attack.cooldownMs >= enemy.attack.windupMs+enemy.attack.activeMs);
  }
  assert.ok(slimeCombat('hard').speed > slimeCombat('medium').speed);
});
