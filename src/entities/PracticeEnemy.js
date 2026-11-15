import Phaser from 'phaser';
import { TRAINING_ENEMY, TRAINING } from '../config/combat.js';
import { Vitals } from '../systems/Vitals.js';
import { EnemyBrain } from '../systems/EnemyBrain.js';
import { attackRectangle } from '../systems/hitboxes.js';

// Objetivo geométrico de entrenamiento. No representa un slime ni un enemigo canónico.
export class PracticeEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'practice-target');
    scene.add.existing(this); scene.physics.add.existing(this);
    this.setOrigin(0.5, 1);
    this.body.setSize(28, 46).setOffset(6, 10);
    this.setCollideWorldBounds(true);
    this.vitals = new Vitals(TRAINING_ENEMY.maxHealth, TRAINING_ENEMY.invulnerabilityMs);
    this.brain = new EnemyBrain(TRAINING_ENEMY);
    this.facing = -1;
    this.label = scene.add.text(x, y - 76, 'OBJETIVO', { font: '9px Arial', color: '#c2c9b0' }).setOrigin(0.5);
  }

  updateAI(now, player) {
    if (!this.vitals.alive) return;
    if (!player.vitals.alive) { this.setVelocityX(0); return; }
    const dx = player.body.center.x - this.body.center.x;
    const dy = player.body.center.y - this.body.center.y;
    const direction = Math.sign(dx) || this.facing;
    const probeX = this.body.center.x + direction * 30;
    const hasFloor = TRAINING.platforms.some((p) => probeX >= p.x && probeX <= p.x + p.width && Math.abs(p.y - this.body.bottom) < 24);
    const blocked = direction < 0 ? this.body.blocked.left : this.body.blocked.right;
    if (this.brain.attack.phase(now) === 'idle' && this.brain.state !== 'HURT') this.facing = direction;
    const state = this.brain.update(now, { dx, dy, blocked: blocked || !hasFloor });
    if (state !== 'ATTACK' && state !== 'HURT') this.facing = direction;
    this.setVelocityX(state === 'CHASE' && this.body.blocked.down ? direction * TRAINING_ENEMY.speed : 0);
    this.setTint(state === 'HURT' ? 0xffffff : state === 'ATTACK' ? 0xe9a66e : 0x9fb79e);
    const labels = { IDLE: 'EN ESPERA', CHASE: 'SE ACERCA', ATTACK: 'ATAQUE', HURT: 'GOLPEADO' };
    this.label.setPosition(this.x, this.y - 76).setText(`${this.vitals.current}/${this.vitals.max} · ${labels[state]}`);
  }

  attackBox(now) {
    return this.vitals.alive && this.brain.attack.phase(now) === 'active' ? attackRectangle(this.body, this.facing, TRAINING_ENEMY.attackRange, TRAINING_ENEMY.hitboxHeight) : null;
  }

  takeDamage(damage, now) {
    if (!this.vitals.receive(damage, now)) return false;
    this.setVelocityX(0);
    if (!this.vitals.alive) {
      this.brain.kill(); this.body.enable = false; this.label.destroy();
      this.scene.tweens.add({ targets: this, alpha: 0, duration: 250, onComplete: () => this.destroy() });
    } else this.brain.hurt(now);
    return true;
  }
}
