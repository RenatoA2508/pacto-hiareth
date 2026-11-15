import Phaser from 'phaser';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class ResultScene extends Phaser.Scene {
  constructor() { super('Result'); }
  create({ result, resume, mode = 'playground' }) {
    const ui = this.registry.get('ui');
    const completed = result === 'complete';
    const combat = mode === 'combat';
    ui.gameplay(false);
    drawLaboratory(this, 960);
    ui.panel({
      modal: true,
      eyebrow: completed ? 'PRUEBA COMPLETADA' : 'FIN DEL INTENTO',
      title: completed ? (combat ? 'Entrenamiento completado.' : 'Prueba completada.') : 'Vuelve a intentarlo.',
      description: combat ? (completed ? 'Has superado los tres objetivos del entrenamiento de combate.' : 'La vida de Aidan llegó a cero. Puedes repetir el entrenamiento.') : completed ? 'Has llegado al final del recorrido de movimiento. La historia de Aidan comenzará en los niveles del juego.' : 'Aidan ha caído fuera de las plataformas. Puedes repetir desde el último punto de la prueba.',
      note: combat ? 'Objetivos de prueba · fuera de la historia' : completed ? 'Esta llegada completa el laboratorio, no la historia.' : resume ? 'Checkpoint disponible' : 'Volverás al punto de partida',
      actions: [
        { label: combat ? 'Repetir entrenamiento' : completed ? 'Repetir desde el inicio' : 'Reintentar', run: () => {
          if (combat) { this.scene.start('Combat'); return; }
          if (completed) this.registry.get('storage').update({ playgroundCheckpoint: false });
          this.scene.start('Playground', { resume: completed ? false : resume });
        } },
        { label: 'Volver al menú', secondary: true, run: () => this.scene.start('Menu') },
      ],
    });
  }
}
