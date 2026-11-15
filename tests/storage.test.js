import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageManager, sanitizeSave } from '../src/managers/StorageManager.js';

function memoryStorage(initial = null) {
  let value = initial;
  return { getItem: () => value, setItem: (_, next) => { value = next; } };
}

test('checkpoint y audio sobreviven a una nueva sesión sin avanzar niveles narrativos', () => {
  const disk = memoryStorage();
  const first = new StorageManager(disk);
  first.update({ playgroundCheckpoint: true, muted: true });
  const next = new StorageManager(disk);
  assert.equal(next.data.playgroundCheckpoint, true);
  assert.equal(next.data.muted, true);
  assert.equal(next.data.highScore, 0);
  assert.equal(next.data.levelReached, 0);
});

test('un JSON corrupto no impide recuperar y guardar la prueba', () => {
  const disk = memoryStorage('{partida incompleta');
  const store = new StorageManager(disk);
  assert.equal(store.data.playgroundCheckpoint, false);
  store.update({ playgroundCheckpoint: true });
  assert.equal(new StorageManager(disk).data.playgroundCheckpoint, true);
});

test('rechaza datos manipulados y versiones desconocidas', () => {
  assert.deepEqual(sanitizeSave({ version: 9, playgroundCheckpoint: true }), sanitizeSave(null));
  const clean = sanitizeSave({ version: 1, highScore: -10, levelReached: '3', muted: 'true', playgroundCheckpoint: 1 });
  assert.equal(clean.highScore, 0);
  assert.equal(clean.levelReached, 0);
  assert.equal(clean.muted, false);
  assert.equal(clean.playgroundCheckpoint, false);
  assert.equal(sanitizeSave({ version: 1, highScore: Infinity }).highScore, 0);
});

test('permite jugar en memoria si localStorage está bloqueado o lleno', () => {
  const blocked = { getItem() { throw new Error('SecurityError'); }, setItem() { throw new Error('QuotaExceededError'); } };
  const store = new StorageManager(blocked);
  assert.doesNotThrow(() => store.update({ playgroundCheckpoint: true, muted: true }));
  assert.equal(store.available, false);
  assert.equal(store.data.playgroundCheckpoint, true);
  assert.equal(store.data.muted, true);
  const absent = new StorageManager();
  assert.doesNotThrow(() => absent.update({ muted: true }));
  assert.equal(absent.available, false);
});

test('guarda la lectura sin perder el checkpoint de una partida anterior', () => {
  const disk = memoryStorage(JSON.stringify({ version: 1, playgroundCheckpoint: true, muted: true }));
  const store = new StorageManager(disk);
  store.update({ prologuePage: 12, prologueComplete: true });
  const loaded = new StorageManager(disk);
  assert.equal(loaded.data.prologuePage, 12);
  assert.equal(loaded.data.prologueComplete, true);
  assert.equal(loaded.data.playgroundCheckpoint, true);
  assert.equal(loaded.data.muted, true);
});
