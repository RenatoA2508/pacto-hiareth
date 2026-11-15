import Phaser from 'phaser';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class ResultScene extends Phaser.Scene {
  constructor() { super('Result'); }
  create({ result, resume }) {
    const ui = this.registry.get('ui');
    const completed = result === 'complete';
    ui.gameplay(false);
    drawLaboratory(this, 960);
    ui.panel({
      modal: true,
      eyebrow: completed ? 'RECORRIDO COMPLETADO' : 'FIN DEL INTENTO',
      title: completed ? 'Prueba completada.' : 'Vuelve a intentarlo.',
      description: completed ? 'Has llegado al final del recorrido de movimiento. La historia de Aidan comenzará en los niveles del juego.' : 'Aidan ha caído fuera de las plataformas. Puedes repetir desde el último punto de la prueba.',
      note: completed ? 'Esta llegada completa el laboratorio, no la historia.' : resume ? 'Checkpoint disponible' : 'Volverás al punto de partida',
      actions: [
        { label: completed ? 'Repetir desde el inicio' : 'Reintentar', run: () => {
          if (completed) this.registry.get('storage').update({ playgroundCheckpoint: false });
          this.scene.start('Playground', { resume: completed ? false : resume });
        } },
        { label: 'Volver al menú', secondary: true, run: () => this.scene.start('Menu') },
      ],
    });
  }
}
