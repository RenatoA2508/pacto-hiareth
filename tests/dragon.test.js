import test from 'node:test';
import assert from 'node:assert/strict';
import { DragonBattle } from '../src/systems/DragonBattle.js';

test('defender mitiga el aliento y conserva la carga hasta atacar', () => {
  const battle = new DragonBattle('medium');
  assert.equal(battle.intent, 'claw');
  battle.play('charge');
  assert.equal(battle.intent, 'breath');
  assert.equal(battle.play('guard').received, 1);
  assert.equal(battle.intent, 'rest');
  assert.deepEqual(battle.play('attack'), { intent: 'rest', damage: 7, received: 0 });
  assert.equal(battle.charged, false);
});

test('una estrategia basada en las señales gana en las tres dificultades', () => {
  for (const difficulty of ['easy', 'medium', 'hard']) {
    const battle = new DragonBattle(difficulty);
    for (let i = 0; i < 20 && battle.result === 'active'; i++) {
      battle.play({ claw: 'charge', breath: 'guard', rest: 'attack' }[battle.intent]);
    }
    assert.equal(battle.result, 'victory', difficulty);
    assert.equal(battle.dragon, 0);
    assert.ok(battle.aidan > 0, difficulty);
    assert.equal(battle.play('attack'), null);
  }
});

test('atacar sin tener en cuenta las señales puede causar derrota', () => {
  const battle = new DragonBattle('hard');
  while (battle.result === 'active') battle.play('attack');
  assert.equal(battle.result, 'defeat');
  assert.equal(battle.aidan, 0);
  const retry = new DragonBattle('hard');
  assert.equal(retry.aidan, retry.balance.aidan);
  assert.equal(retry.turn, 0);
});

test('si Aidan derrota al guardián, el contraataque anunciado no sucede', () => {
  const battle = new DragonBattle('medium');
  battle.dragon = 1;
  assert.equal(battle.play('attack').received, 0);
  assert.equal(battle.aidan, battle.balance.aidan);
  assert.equal(battle.result, 'victory');
});
