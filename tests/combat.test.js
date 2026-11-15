import test from 'node:test';
import assert from 'node:assert/strict';
import { Vitals } from '../src/systems/Vitals.js';
import { AttackCycle } from '../src/systems/AttackCycle.js';
import { EnemyBrain } from '../src/systems/EnemyBrain.js';
import { TRAINING_ENEMY, PLAYER_COMBAT } from '../src/config/combat.js';
import { intersects, attackRectangle, wallBetween } from '../src/systems/hitboxes.js';

test('contacto y ataque en el mismo instante solo restan una vida', () => {
  const health = new Vitals(3, 900);
  assert.equal(health.receive(1, 100), true);
  assert.equal(health.receive(1, 100), false);
  assert.equal(health.receive(1, 999), false);
  assert.equal(health.current, 2);
  assert.equal(health.receive(1, 1000), true);
});
test('muerte terminal, daño limitado a cero y valores inválidos ignorados', () => {
  const health = new Vitals(3);
  assert.equal(health.receive(-1, 0), false);
  assert.equal(health.receive(NaN, 0), false);
  assert.equal(health.receive(Infinity, 0), false);
  assert.equal(health.receive(10, 1), true);
  assert.equal(health.current, 0);
  assert.equal(health.alive, false);
  assert.equal(health.receive(1, 2), false);
});
test('el golpe solo existe en la ventana activa, una vez por víctima', () => {
  const cycle = new AttackCycle(PLAYER_COMBAT.attack);
  const target = {};
  assert.equal(cycle.start(0), true);
  assert.equal(cycle.canHit(target, 249), false);
  assert.equal(cycle.canHit(target, 250), true);
  cycle.recordHit(target);
  assert.equal(cycle.canHit(target, 251), false);
  assert.equal(cycle.canHit({}, 499), true);
  assert.equal(cycle.canHit({}, 500), false);
  assert.equal(cycle.start(700), false);
  assert.equal(cycle.start(800), true);
  assert.equal(cycle.canHit(target, 1050), true);
});
test('un golpe interrumpido no deja hitbox activa ni elimina el cooldown', () => {
  const cycle = new AttackCycle(PLAYER_COMBAT.attack);
  cycle.start(0); cycle.cancel();
  assert.equal(cycle.phase(300), 'idle');
  assert.equal(cycle.canHit({}, 300), false);
  assert.equal(cycle.start(300), false);
  assert.equal(cycle.start(800), true);
});
test('IA detecta por ambos ejes y persigue solo si puede caminar', () => {
  const brain = new EnemyBrain(TRAINING_ENEMY);
  assert.equal(brain.update(0, { dx: 600, dy: 0 }), 'IDLE');
  assert.equal(brain.update(1, { dx: 200, dy: 200 }), 'IDLE');
  assert.equal(brain.update(2, { dx: 200, dy: 0 }), 'CHASE');
  assert.equal(brain.update(3, { dx: 200, dy: 0, blocked: true }), 'IDLE');
});
test('IA mantiene un único ataque, reacciona al daño y no actúa después de morir', () => {
  const brain = new EnemyBrain(TRAINING_ENEMY);
  assert.equal(brain.update(0, { dx: 50, dy: 0 }), 'ATTACK');
  assert.equal(brain.update(100, { dx: 200, dy: 0 }), 'ATTACK');
  assert.equal(brain.attack.startedAt, 0);
  brain.hurt(200);
  assert.equal(brain.attack.phase(700), 'idle');
  assert.equal(brain.update(300, { dx: 200, dy: 0 }), 'HURT');
  assert.equal(brain.update(501, { dx: 200, dy: 0 }), 'CHASE');
  brain.kill(); brain.hurt(2000);
  assert.equal(brain.update(3000, { dx: 40, dy: 0 }), 'DEATH');
  assert.equal(brain.attack.canHit({}, 3000), false);
});
test('hitbox se orienta delante del cuerpo sin usar el margen del sprite', () => {
  const body = { x: 100, y: 100, width: 30, height: 60 };
  const right = attackRectangle(body, 1, 70, 60);
  const left = attackRectangle(body, -1, 70, 60);
  assert.equal(right.x, 130);
  assert.equal(left.x, 30);
  assert.equal(intersects(right, { x: 140, y: 110, width: 20, height: 40 }), true);
  assert.equal(intersects(right, { x: 210, y: 110, width: 20, height: 40 }), false);
});
test('el ataque no atraviesa una pared; un suelo debajo no lo bloquea', () => {
  const a = { x: 10, y: 100, width: 30, height: 60 };
  const b = { x: 100, y: 100, width: 30, height: 60 };
  assert.equal(wallBetween(a, b, [{ x: 60, y: 90, width: 20, height: 90 }]), true);
  assert.equal(wallBetween(a, b, [{ x: 0, y: 170, width: 300, height: 90 }]), false);
  assert.equal(wallBetween(a, { ...b, x: a.x }, [{ x: 60, y: 90, width: 20, height: 90 }]), false);
});
