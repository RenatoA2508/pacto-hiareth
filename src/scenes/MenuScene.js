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
    const hasProgress = storage.data.levelReached >= 1;
    if (hasProgress) actions.push({ label: storage.data.level1Complete ? 'Repetir nivel 1' : 'Continuar nivel 1', run: () => this.scene.start('Level1', { resume: !storage.data.level1Complete }) });
    actions.push({ label: hasProgress ? 'Nuevo viaje' : 'Comenzar viaje', secondary: hasProgress, run: () => {
      storage.update({ level1IntroPage: 0, level1Checkpoint: 0, level1Killed: [], level1Complete: false });
      this.scene.start('Story', { kind: 'intro', playLevel: true });
    } });
    actions.push({ label: storage.data.prologuePage ? 'Continuar prólogo' : 'Leer prólogo', secondary: true, run: () => this.scene.start('Story') });
    actions.push({ label: storage.data.playgroundCheckpoint ? 'Continuar prueba' : 'Prueba de movimiento', secondary: true, run: () => this.scene.start('Playground', { resume: storage.data.playgroundCheckpoint }) });
    actions.push({ label: 'Entrenamiento de combate', secondary: true, run: () => this.scene.start('Combat') });
    ui.panel({
      eyebrow: 'PLATAFORMAS 2D · EN DESARROLLO',
      title: 'El pacto<br>de <em>Hiareth</em>',
      description: 'El primer viaje de Aidan atraviesa un bosque en guerra. Alcanza el portal atacando o esquivando a los slimes.',
      note: storage.available ? 'Nivel 1 disponible · el viaje continúa en desarrollo' : 'Guardado no disponible · puedes jugar en esta sesión',
      actions,
    });
  }
}
