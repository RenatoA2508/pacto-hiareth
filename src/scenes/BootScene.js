import Phaser from 'phaser';
import { PLAYER_ART } from '../config/game.js';
import { SOUND_EFFECTS } from '../config/audio.js';
import { AudioManager } from '../managers/AudioManager.js';
import { SLIME_ART, NATURE_LAYERS } from '../config/level1.js';
import { CITY_LAYERS } from '../config/level2.js';

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
    this.load.image('victory-field', `${import.meta.env.BASE_URL}assets/images/epilogue/field.png`);
    this.load.image('aine-idle', `${import.meta.env.BASE_URL}assets/images/characters/aine/idle.png`);
    this.load.image('robot-idle', `${import.meta.env.BASE_URL}assets/images/enemies/robot/idle.png`);
    SOUND_EFFECTS.forEach(({ key, file }) => {
      const base = `${import.meta.env.BASE_URL}assets/audio/sfx/`;
      this.load.audio(key, [base + file, base + file.replace('.ogg', '.mp3')]);
    });
    SLIME_ART.animations.forEach(({ key, file }) => this.load.spritesheet(`slime-${key}`, `${import.meta.env.BASE_URL}assets/images/enemies/slime/${file}`, { frameWidth: 64, frameHeight: 64 }));
    NATURE_LAYERS.forEach(({ file }) => this.load.image(`nature-${file}`, `${import.meta.env.BASE_URL}assets/images/backgrounds/nature/${file}`));
    CITY_LAYERS.forEach(({ file }) => this.load.image(`city-${file}`, `${import.meta.env.BASE_URL}assets/images/backgrounds/city/${file}`));
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
    SLIME_ART.animations.forEach(({ key, count, fps, repeat }) => this.anims.create({
      key: `slime-${key}`, frames: this.anims.generateFrameNumbers(`slime-${key}`, { start: count * 3, end: count * 4 - 1 }), frameRate: fps, repeat,
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
