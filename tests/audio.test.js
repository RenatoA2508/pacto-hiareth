import test from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { AudioManager } from '../src/managers/AudioManager.js';

function fakeAudio({ locked = false, muted = false } = {}) {
  const sound = new EventEmitter();
  sound.mute = muted; sound.locked = locked; sound.played = []; sound.unlocks = 0;
  sound.play = (key, options) => sound.played.push({ key, options });
  sound.unlock = () => { sound.unlocks++; };
  const game = { sound, cache: { audio: { exists: (key) => ['click', 'land'].includes(key) } } };
  return { manager: new AudioManager(game), sound };
}

test('silencio impide reproducir sonidos y claves inexistentes se ignoran', () => {
  const { manager, sound } = fakeAudio({ muted: true });
  manager.play('click'); sound.mute = false; manager.play('missing');
  assert.equal(sound.played.length, 0);
  manager.play('click'); assert.equal(sound.played[0].key, 'click');
});
test('autoplay bloqueado conserva solo el último efecto hasta el desbloqueo', () => {
  const { manager, sound } = fakeAudio({ locked: true });
  manager.play('click'); manager.play('land');
  assert.equal(sound.played.length, 0);
  sound.locked = false; sound.emit('unlocked');
  assert.deepEqual(sound.played.map(({ key }) => key), ['land']);
  sound.emit('unlocked'); assert.equal(sound.played.length, 1);
});
test('silenciar antes del desbloqueo cancela el sonido pendiente', () => {
  const { manager, sound } = fakeAudio({ locked: true });
  manager.play('click'); sound.mute = true; sound.locked = false; sound.emit('unlocked');
  assert.equal(sound.played.length, 0);
  manager.destroy(); assert.equal(sound.listenerCount('unlocked'), 0);
});
