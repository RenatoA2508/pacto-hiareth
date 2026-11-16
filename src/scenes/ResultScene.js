import { ENDING_RESULTS } from '../config/journey.js';
import Phaser from 'phaser';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class ResultScene extends Phaser.Scene {
  constructor() { super('Result'); }
  create({ result, resume, mode = 'playground', defeated = 0, score = 0 }) {
    const ui = this.registry.get('ui');
    const completed = result === 'complete';
    ui.gameplay(false); drawLaboratory(this, 960);
    const actions = [];
    let title, description, note;
    const endingLevel = Number(mode.slice(5));
    if (mode.startsWith('level') && ENDING_RESULTS[endingLevel]) {
      title = completed ? 'Recorrido superado.' : 'Vuelve a intentarlo.';
      description = completed ? 'Continúa el relato.' : 'Retoma el recorrido desde el último checkpoint.';
      note = `Puntos del viaje: ${score}`;
      actions.push(completed
        ? { label: 'Continuar viaje', run: () => this.scene.start('EndingStory') }
        : { label: 'Reintentar', run: () => this.scene.start(`Level${endingLevel}`, { resume: true }) });
    } else if (mode === 'level1' || mode === 'level2') {
      const level = mode === 'level1' ? 1 : 2;
      title = completed ? 'Portal alcanzado.' : 'Vuelve a intentarlo.';
      description = completed ? 'Has completado este recorrido. Continúa el relato o vuelve a explorar el nivel.' : 'Retoma el recorrido desde el último checkpoint guardado.';
      note = level === 1 ? `Slimes derrotados: ${defeated} · Las bajas no conceden puntos` : 'Vuela alto · Antigua federación';
      note += ` · Puntos del viaje: ${score}`;
      if (completed) actions.push({ label: 'Continuar viaje', run: () => this.scene.start('Story', { kind: level === 1 ? 'camp' : 'act2' }) });
      actions.push({ label: completed ? `Repetir nivel ${level}` : `Reintentar nivel ${level}`, secondary: completed, run: () => this.scene.start(`Level${level}`, { resume: !completed }) });
    } else if (mode === 'combat') {
      title = completed ? 'Entrenamiento completado.' : 'Vuelve a intentarlo.';
      description = completed ? 'Has superado los tres objetivos del entrenamiento de combate.' : 'La vida de Aidan llegó a cero. Puedes repetir el entrenamiento.';
      note = 'Objetivos de prueba · fuera de la historia';
      actions.push({ label: 'Repetir entrenamiento', run: () => this.scene.start('Combat') });
    } else {
      title = completed ? 'Prueba completada.' : 'Vuelve a intentarlo.';
      description = completed ? 'Has llegado al final del recorrido de movimiento.' : 'Aidan ha caído fuera de las plataformas. Puedes repetir desde el último punto de la prueba.';
      note = completed ? 'Esta llegada completa el laboratorio.' : resume ? 'Checkpoint disponible' : 'Volverás al punto de partida';
      actions.push({ label: completed ? 'Repetir desde el inicio' : 'Reintentar', run: () => {
        if (completed) this.registry.get('storage').update({ playgroundCheckpoint: false });
        this.scene.start('Playground', { resume: completed ? false : resume });
      } });
    }
    actions.push({ label: 'Volver al menú', secondary: true, run: () => this.scene.start('Menu') });
    ui.panel({ modal: true, eyebrow: completed ? 'RECORRIDO COMPLETADO' : 'FIN DEL INTENTO', title, description, note, actions });
  }
}
