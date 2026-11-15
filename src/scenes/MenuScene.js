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
    if (storage.data.playgroundCheckpoint) actions.push({ label: 'Continuar prueba', run: () => this.scene.start('Playground', { resume: true }) });
    actions.push({ label: storage.data.playgroundCheckpoint ? 'Empezar de nuevo' : 'Iniciar prueba', secondary: storage.data.playgroundCheckpoint, run: () => {
      storage.update({ playgroundCheckpoint: false });
      this.scene.start('Playground', { resume: false });
    } });
    actions.push({ label: storage.data.prologuePage ? 'Continuar prólogo' : 'Leer prólogo', secondary: true, run: () => this.scene.start('Story') });
    actions.push({ label: 'Entrenamiento de combate', secondary: true, run: () => this.scene.start('Combat') });
    ui.panel({
      eyebrow: 'PLATAFORMAS 2D · EN DESARROLLO',
      title: 'El pacto<br>de <em>Hiareth</em>',
      description: 'Camina, salta y encuentra tu ritmo. Prueba el movimiento de Aidan antes de comenzar su historia.',
      note: storage.available ? 'Escenario de prueba · sin contenido narrativo' : 'Guardado no disponible · puedes jugar en esta sesión',
      actions,
    });
  }
}
