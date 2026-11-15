import Phaser from 'phaser';
import { MOVEMENT, PLAYER_ART } from '../config/game.js';
import { PLAYER_COMBAT } from '../config/combat.js';
import { Vitals } from '../systems/Vitals.js';
import { AttackCycle } from '../systems/AttackCycle.js';
import { attackRectangle } from '../systems/hitboxes.js';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, feetY, { combat = false } = {}) {
    super(scene, x, feetY, 'aidan-idle');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // El origen coincide con el centro horizontal y la base visible del dibujo.
    this.setOrigin(0.5, 167 / PLAYER_ART.frameHeight).setScale(PLAYER_ART.scale);
    const { width, height, offsetX, offsetY } = PLAYER_ART.body;
    this.body.setSize(width, height).setOffset(offsetX, offsetY);
    this.body.setMaxVelocity(MOVEMENT.speed, MOVEMENT.maxFallSpeed);
    this.play('aidan-idle');
    this.nextStepAt = 0;
    this.wasGrounded = false;
    this.combatEnabled = combat;
    this.vitals = new Vitals(PLAYER_COMBAT.maxHealth, PLAYER_COMBAT.invulnerabilityMs);
    this.attackCycle = new AttackCycle(PLAYER_COMBAT.attack);
    this.facing = 1;
    this.hurtUntil = 0;
  }

  move({ axis, jump, attack = false }) {
    const grounded = this.body.blocked.down;
    const now = this.scene.time.now;
    const audio = this.scene.registry.get('audio');
    if (!this.vitals.alive) { this.setVelocityX(0); return; }
    this.setAlpha(now < this.vitals.invulnerableUntil && Math.floor(now / 100) % 2 === 0 ? 0.4 : 1);
    if (now < this.hurtUntil) { this.setVelocityX(0); return; }
    if (this.combatEnabled && attack && grounded && this.attackCycle.start(now)) this.play('aidan-attack');
    if (this.attackCycle.phase(now) !== 'idle') { this.setVelocityX(0); return; }
    if (grounded && !this.wasGrounded) audio?.play('land');
    if (grounded && axis && now >= this.nextStepAt) {
      audio?.play('step');
      this.nextStepAt = now + 330;
    }
    this.wasGrounded = grounded;
    this.setVelocityX(axis * MOVEMENT.speed);
    if (axis) { this.facing = Math.sign(axis); this.setFlipX(axis < 0); }
    if (jump && this.body.blocked.down) this.setVelocityY(-MOVEMENT.jumpSpeed);
    if (!this.body.blocked.down) this.play(this.body.velocity.y < 0 ? 'aidan-jump' : 'aidan-fall', true);
    else this.play(axis ? 'aidan-run' : 'aidan-idle', true);
  }

  takeDamage(damage, now) {
    if (!this.vitals.receive(damage, now)) return false;
    this.attackCycle.cancel();
    this.setVelocityX(0);
    this.scene.registry.get('audio')?.play('land');
    if (!this.vitals.alive) this.play('aidan-death');
    else { this.hurtUntil = now + PLAYER_COMBAT.hurtMs; this.play('aidan-hurt'); }
    return true;
  }

  attackBox(now) {
    return this.attackCycle.phase(now) === 'active' ? attackRectangle(this.body, this.facing, PLAYER_COMBAT.range, PLAYER_COMBAT.hitboxHeight) : null;
  }
}
