import Phaser from 'phaser';
import { PLAYER_ART } from '../config/game.js';
import { SOUND_EFFECTS } from '../config/audio.js';
import { AudioManager } from '../managers/AudioManager.js';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload() {
    this.failed = [];
    this.load.on('progress', (progress) => {
      document.querySelector('#load-progress').textContent = `${Math.round(progress * 100)} %`;
    });
    this.load.on('loaderror', (file) => this.failed.push({ key: file.key, type: file.type }));
    PLAYER_ART.animations.forEach(({ key, file }) => this.load.spritesheet(
      `aidan-${key}`, `${import.meta.env.BASE_URL}assets/images/characters/aidan/${file}`,
      { frameWidth: PLAYER_ART.frameWidth, frameHeight: PLAYER_ART.frameHeight },
    ));
    SOUND_EFFECTS.forEach(({ key, file }) => {
      const base = `${import.meta.env.BASE_URL}assets/audio/sfx/`;
      this.load.audio(key, [base + file, base + file.replace('.ogg', '.mp3')]);
    });
  }
  create() {
    document.querySelector('#loading').hidden = true;
    const critical = this.failed.filter(({ type }) => type !== 'audio');
    if (critical.length) {
      const error = document.querySelector('#fatal-error');
      error.hidden = false;
      error.textContent = `No se pudieron cargar los recursos: ${critical.map(({ key }) => key).join(', ')}. Recarga la página para volver a intentarlo.`;
      return;
    }
    PLAYER_ART.animations.forEach(({ key, frames, fps, repeat = -1 }) => this.anims.create({
      key: `aidan-${key}`,
      frames: this.anims.generateFrameNumbers(`aidan-${key}`, { start: 0, end: frames - 1 }),
      frameRate: fps, repeat,
    }));
    this.registry.set('audio', new AudioManager(this.game));
    if (this.failed.length) {
      const notice = document.querySelector('#audio-notice');
      notice.hidden = false;
      notice.textContent = 'Algunos sonidos no están disponibles. Puedes seguir jugando.';
    }
    this.scene.start('Menu');
  }
}
