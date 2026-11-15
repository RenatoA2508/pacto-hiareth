import Phaser from 'phaser';
import prologue from '../data/prologue.json';
import intro from '../data/level1-intro.json';
import { DialogueReader } from '../ui/DialogueReader.js';

export class StoryScene extends Phaser.Scene {
  constructor() { super('Story'); }
  create({ kind = 'prologue', playLevel = false } = {}) {
    const ui = this.registry.get('ui');
    ui.gameplay(false);
    this.reader = new DialogueReader({
      ui, storage: this.registry.get('storage'), story: kind === 'intro' ? intro : prologue,
      audio: this.registry.get('audio'),
      onClose: () => this.scene.start('Menu'),
      onFinish: () => playLevel ? this.scene.start('Level1', { resume: false }) : this.scene.start('Menu'),
      skipLabel: playLevel ? 'Ir al nivel' : null,
      progressKey: kind === 'intro' ? 'level1IntroPage' : 'prologuePage',
      completeKey: kind === 'intro' ? 'level1IntroRead' : 'prologueComplete',
    });
    this.events.once('shutdown', () => this.reader.destroy());
  }
}
