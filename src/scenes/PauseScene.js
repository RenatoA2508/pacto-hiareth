import Phaser from 'phaser';

export class PauseScene extends Phaser.Scene {
  constructor() { super('Pause'); }
  create() {
    const ui = this.registry.get('ui');
    ui.gameplay(false);
    const resume = () => {
      ui.hidePanel(); ui.gameplay(true); ui.focusGame();
      this.scene.resume('Playground'); this.scene.stop();
    };
    const escape = (event) => { if (event.code === 'Escape') { event.preventDefault(); resume(); } };
    window.addEventListener('keydown', escape);
    this.events.once('shutdown', () => window.removeEventListener('keydown', escape));
    ui.panel({
      modal: true, eyebrow: 'EN PAUSA', title: 'Un momento de calma.',
      description: 'La prueba se detiene aquí. Continúa cuando quieras.',
      note: 'Esc para volver a la prueba',
      actions: [
        { label: 'Continuar', run: resume },
        { label: 'Volver al menú', secondary: true, run: () => {
          this.scene.stop('Playground'); this.scene.start('Menu');
        } },
      ],
    });
  }
}
