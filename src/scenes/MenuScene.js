import { newEnding } from '../config/journey.js';
import Phaser from 'phaser';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }
  create() {
    const ui = this.registry.get('ui');
    const storage = this.registry.get('storage');
    drawLaboratory(this, 960);
    const g = this.add.graphics();
    g.lineStyle(1, 0xcbb582, 0.35).strokeCircle(740, 270, 150);
    g.lineStyle(1, 0xcbb582, 0.16).strokeCircle(740, 270, 162);
    g.fillStyle(0x263b3d).fillRect(570, 416, 340, 124);
    g.lineStyle(2, 0xa2b199, 0.7).lineBetween(570, 416, 910, 416);
    this.add.sprite(740, 418, 'aidan-idle').setOrigin(0.5, 167 / 250).setScale(2).play('aidan-idle');
    this.add.text(740, 470, 'AIDAN', { fontFamily: 'Arial', fontSize: '11px', color: '#c2c6ad', letterSpacing: 4 }).setOrigin(0.5);
    ui.gameplay(false);
    const actions = [];
    const hasProgress = storage.data.levelReached >= 1 || Boolean(storage.data.openingStep);
    if (storage.data.openingStep) {
      actions.push({ label: storage.data.openingStep === 'prologue' ? 'Continuar prólogo' : 'Continuar introducción', run: () => this.scene.start('Story', { kind: storage.data.openingStep, playLevel: true }) });
    } else if (storage.data.endingStep || (storage.data.level2Complete && storage.data.act2Read)) {
      actions.push({ label: storage.data.endingStep === 'complete' ? 'Ver cierre del viaje' : 'Continuar viaje', run: () => this.scene.start('EndingStory') });
    } else if (hasProgress) {
      const level = storage.data.currentLevel;
      const completed = storage.data[`level${level}Complete`];
      if (completed && !storage.data[level === 1 ? 'campRead' : 'act2Read']) actions.push({ label: 'Continuar relato', run: () => this.scene.start('Story', { kind: level === 1 ? 'camp' : 'act2' }) });
      else actions.push({ label: completed ? `Repetir nivel ${level}` : `Continuar nivel ${level}`, run: () => this.scene.start(`Level${level}`, { resume: !completed }) });
    }
    actions.push({ label: hasProgress ? 'Nuevo viaje' : 'Comenzar viaje', secondary: hasProgress, run: () => {
      storage.update({ ...newEnding(), openingStep: 'prologue', currentLevel: 1, prologuePage: 0, prologueComplete: false, level1IntroPage: 0, level1IntroRead: false, level1Checkpoint: 0, level1Killed: [], level1Complete: false, level2Checkpoint: 0, level2Killed: [], level2Complete: false, campPage: 0, campRead: false, act2Page: 0, act2Read: false });
      this.scene.start('Story', { kind: 'prologue', playLevel: true });
    } });
    if (!storage.data.openingStep) actions.push({ label: 'Leer prólogo', secondary: true, run: () => this.scene.start('Story', { kind: 'prologue', playLevel: false }) });
    actions.push({ label: storage.data.playgroundCheckpoint ? 'Continuar prueba' : 'Prueba de movimiento', secondary: true, run: () => this.scene.start('Playground', { resume: storage.data.playgroundCheckpoint }) });
    actions.push({ label: 'Entrenamiento de combate', secondary: true, run: () => this.scene.start('Combat') });
    ui.panel({
      difficultySelector: true,
      eyebrow: 'PLATAFORMAS 2D',
      title: 'El pacto<br>de <em>Hiareth</em>',
      description: 'Acompaña a Aidan en su viaje por los portales en busca de Lia Fáil.',
      note: storage.available ? `Récord: ${storage.data.highScore} puntos` : 'Guardado no disponible · puedes jugar en esta sesión',
      actions,
    });
  }
}
