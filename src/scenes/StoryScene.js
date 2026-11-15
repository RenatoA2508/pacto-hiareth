import Phaser from 'phaser';
import prologue from '../data/prologue.json';
import { DialogueReader } from '../ui/DialogueReader.js';

export class StoryScene extends Phaser.Scene {
  constructor() { super('Story'); }
  create() {
    const ui = this.registry.get('ui');
    ui.gameplay(false);
    this.reader = new DialogueReader({
      ui, storage: this.registry.get('storage'), story: prologue,
      audio: this.registry.get('audio'),
      onClose: () => this.scene.start('Menu'),
    });
    this.events.once('shutdown', () => this.reader.destroy());
  }
}
