import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { PLAYER_ART } from '../src/config/game.js';
import { SOUND_EFFECTS } from '../src/config/audio.js';

test('las hojas reales contienen el número de cuadros configurado', () => {
  for (const { file, frames } of PLAYER_ART.animations) {
    const png = readFileSync(new URL(`../public/assets/images/characters/aidan/${file}`, import.meta.url));
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), PLAYER_ART.frameWidth * frames, file);
    assert.equal(png.readUInt32BE(20), PLAYER_ART.frameHeight, file);
  }
});

test('cada efecto tiene un archivo OGG válido y fallback MP3', () => {
  for (const { file } of SOUND_EFFECTS) {
    const ogg = readFileSync(new URL(`../public/assets/audio/sfx/${file}`, import.meta.url));
    const mp3 = readFileSync(new URL(`../public/assets/audio/sfx/${file.replace('.ogg', '.mp3')}`, import.meta.url));
    assert.equal(ogg.subarray(0, 4).toString(), 'OggS');
    assert.ok(mp3.length > 500);
  }
});

test('el prólogo corresponde a la fuente canónica conservada', () => {
  const story = JSON.parse(readFileSync(new URL('../src/data/prologue.json', import.meta.url)));
  const source = readFileSync(new URL('../docs/source/el pacto de hiraeth (1).docx', import.meta.url));
  assert.equal(story.sourceSha256, createHash('sha256').update(source).digest('hex'));
  assert.equal(story.paragraphs.length, 28);
  assert.deepEqual(story.paragraphs.map(({ sourceIndex }) => sourceIndex), Array.from({ length: 28 }, (_, i) => i + 33));
});
