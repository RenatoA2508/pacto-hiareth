import Phaser from 'phaser';

export class InputController {
  constructor(scene, ui) {
    this.keyboard = scene.input.keyboard;
    this.keys = this.keyboard.addKeys('A,D,LEFT,RIGHT,SPACE,J');
    this.ui = ui;
    // Las teclas se capturan solo mientras el canvas tiene el foco.
    this.keyboard.disableGlobalCapture();
    this.onKey = (event) => {
      if (document.activeElement?.id === 'game' && ['Space', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault();
    };
    window.addEventListener('keydown', this.onKey);
    scene.events.once('shutdown', () => {
      window.removeEventListener('keydown', this.onKey);
      this.ui.clearInput();
    });
  }

  sample() {
    const { A, D, LEFT, RIGHT, SPACE, J } = this.keys;
    const focused = document.activeElement?.id === 'game';
    const left = (focused && (A.isDown || LEFT.isDown)) || this.ui.held.has('left');
    const right = (focused && (D.isDown || RIGHT.isDown)) || this.ui.held.has('right');
    const keyboardJump = Phaser.Input.Keyboard.JustDown(SPACE);
    const touchJump = this.ui.consumeJump();
    const keyboardAttack = Phaser.Input.Keyboard.JustDown(J);
    const touchAttack = this.ui.consumeAttack();
    return { axis: Number(right) - Number(left), jump: (focused && keyboardJump) || touchJump, attack: (focused && keyboardAttack) || touchAttack };
  }

  reset() {
    this.keyboard.resetKeys();
    this.ui.clearInput();
  }
}
