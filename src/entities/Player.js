import Phaser from 'phaser';
import { MOVEMENT, PLAYER_ART } from '../config/game.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, feetY) {
    super(scene, x, feetY, 'aidan-idle');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // El origen coincide con el centro horizontal y la base visible del dibujo.
    this.setOrigin(0.5, 167 / PLAYER_ART.frameHeight).setScale(PLAYER_ART.scale);
    const { width, height, offsetX, offsetY } = PLAYER_ART.body;
    this.body.setSize(width, height).setOffset(offsetX, offsetY);
    this.body.setMaxVelocity(MOVEMENT.speed, MOVEMENT.maxFallSpeed);
    this.play('aidan-idle');
  }

  move({ axis, jump }) {
    this.setVelocityX(axis * MOVEMENT.speed);
    if (axis) this.setFlipX(axis < 0);
    if (jump && this.body.blocked.down) this.setVelocityY(-MOVEMENT.jumpSpeed);
    if (!this.body.blocked.down) this.play(this.body.velocity.y < 0 ? 'aidan-jump' : 'aidan-fall', true);
    else this.play(axis ? 'aidan-run' : 'aidan-idle', true);
  }
}
