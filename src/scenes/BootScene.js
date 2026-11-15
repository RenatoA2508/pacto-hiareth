import Phaser from 'phaser';
import { PLAYER_ART } from '../config/game.js';

export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload() {
    this.failed = [];
    this.load.on('progress', (progress) => {
      document.querySelector('#load-progress').textContent = `${Math.round(progress * 100)} %`;
    });
    this.load.on('loaderror', (file) => this.failed.push(file.key));
    PLAYER_ART.animations.forEach(({ key, file }) => this.load.spritesheet(
      `aidan-${key}`, `${import.meta.env.BASE_URL}assets/images/characters/aidan/${file}`,
      { frameWidth: PLAYER_ART.frameWidth, frameHeight: PLAYER_ART.frameHeight },
    ));
  }
  create() {
    document.querySelector('#loading').hidden = true;
    if (this.failed.length) {
      const error = document.querySelector('#fatal-error');
      error.hidden = false;
      error.textContent = `No se pudieron cargar los recursos: ${this.failed.join(', ')}. Recarga la página para volver a intentarlo.`;
      return;
    }
    PLAYER_ART.animations.forEach(({ key, frames, fps }) => this.anims.create({
      key: `aidan-${key}`,
      frames: this.anims.generateFrameNumbers(`aidan-${key}`, { start: 0, end: frames - 1 }),
      frameRate: fps, repeat: -1,
    }));
    this.scene.start('Menu');
  }
}
