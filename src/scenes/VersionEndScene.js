import Phaser from 'phaser';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class VersionEndScene extends Phaser.Scene {
  constructor() { super('VersionEnd'); }
  create() {
    drawLaboratory(this, 960);
    const ui = this.registry.get('ui'); ui.gameplay(false);
    ui.panel({
      modal: true, eyebrow: 'ACTOS 1 Y 2', title: 'Fin de esta versión.',
      description: 'El viaje de Aidan continúa. Puedes volver a explorar los dos recorridos desde el menú.',
      note: 'El relato continúa en los próximos actos.',
      actions: [{ label: 'Volver al menú', run: () => this.scene.start('Menu') }],
    });
  }
}
