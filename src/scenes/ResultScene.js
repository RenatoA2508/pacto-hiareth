import Phaser from 'phaser';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class ResultScene extends Phaser.Scene {
  constructor() { super('Result'); }
  create({ result, resume, mode = 'playground', defeated = 0 }) {
    const ui = this.registry.get('ui');
    const completed = result === 'complete';
    const combat = mode === 'combat';
    const level1 = mode === 'level1';
    ui.gameplay(false);
    drawLaboratory(this, 960);
    ui.panel({
      modal: true,
      eyebrow: completed ? 'PRUEBA COMPLETADA' : 'FIN DEL INTENTO',
      title: level1 ? (completed ? 'Portal alcanzado.' : 'Vuelve a intentarlo.') : completed ? (combat ? 'Entrenamiento completado.' : 'Prueba completada.') : 'Vuelve a intentarlo.',
      description: level1 ? (completed ? 'Has completado el primer recorrido. Puedes repetirlo o volver al menú.' : 'Retoma el recorrido desde el último checkpoint guardado.') : combat ? (completed ? 'Has superado los tres objetivos del entrenamiento de combate.' : 'La vida de Aidan llegó a cero. Puedes repetir el entrenamiento.') : completed ? 'Has llegado al final del recorrido de movimiento. La historia de Aidan comenzará en los niveles del juego.' : 'Aidan ha caído fuera de las plataformas. Puedes repetir desde el último punto de la prueba.',
      note: level1 ? `Slimes derrotados: ${defeated} · Las bajas no conceden puntos` : combat ? 'Objetivos de prueba · fuera de la historia' : completed ? 'Esta llegada completa el laboratorio, no la historia.' : resume ? 'Checkpoint disponible' : 'Volverás al punto de partida',
      actions: [
        { label: level1 ? (completed ? 'Repetir nivel 1' : 'Reintentar nivel 1') : combat ? 'Repetir entrenamiento' : completed ? 'Repetir desde el inicio' : 'Reintentar', run: () => {
          if (level1) { this.scene.start('Level1', { resume: !completed }); return; }
          if (combat) { this.scene.start('Combat'); return; }
          if (completed) this.registry.get('storage').update({ playgroundCheckpoint: false });
          this.scene.start('Playground', { resume: completed ? false : resume });
        } },
        { label: 'Volver al menú', secondary: true, run: () => this.scene.start('Menu') },
      ],
    });
  }
}
