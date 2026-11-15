import Phaser from 'phaser';
import { Vitals } from '../systems/Vitals.js';
import { EnemyBrain } from '../systems/EnemyBrain.js';
import { attackRectangle } from '../systems/hitboxes.js';

export class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, { texture, config, platforms, art, animations = null, name }) {
    super(scene, x, y, texture);
    scene.add.existing(this); scene.physics.add.existing(this);
    this.config = config; this.platforms = platforms; this.animationKeys = animations; this.displayName = name;
    this.setOrigin(0.5, art.originY).setScale(art.scale);
    const { width, height, offsetX, offsetY } = art.body;
    this.body.setSize(width, height).setOffset(offsetX, offsetY);
    this.setCollideWorldBounds(true);
    this.vitals = new Vitals(config.maxHealth, config.invulnerabilityMs);
    this.brain = new EnemyBrain(config); this.facing = -1; this.visualState = null;
    this.label = scene.add.text(x, y - 76, name, { font: '9px Arial', color: '#e1e4cf', backgroundColor: '#14242b', padding: { x: 4, y: 2 } }).setOrigin(0.5);
  }
  updateAI(now, player) {
    if (!this.vitals.alive) return;
    if (!player.vitals.alive) { this.setVelocityX(0); return; }
    const dx = player.body.center.x - this.body.center.x;
    const dy = player.body.center.y - this.body.center.y;
    const direction = Math.sign(dx) || this.facing;
    const probeX = this.body.center.x + direction * (this.body.width / 2 + 12);
    const hasFloor = this.platforms.some((p) => probeX >= p.x && probeX <= p.x + p.width && Math.abs(p.y - this.body.bottom) < 24);
    const blocked = direction < 0 ? this.body.blocked.left : this.body.blocked.right;
    if (this.brain.attack.phase(now) === 'idle' && this.brain.state !== 'HURT') this.facing = direction;
    const state = this.brain.update(now, { dx, dy, blocked: blocked || !hasFloor });
    this.setFlipX(this.facing < 0);
    this.setVelocityX(state === 'CHASE' && this.body.blocked.down ? direction * this.config.speed : 0);
    if (this.animationKeys) {
      const key = { IDLE: 'idle', CHASE: 'walk', ATTACK: 'attack', HURT: 'hurt' }[state];
      if (this.visualState !== state) this.play(this.animationKeys[key]);
      this.visualState = state;
      this.setTint(state === 'HURT' ? 0xffd6b0 : 0xffffff);
      this.label.setText(`${this.displayName} · ${this.vitals.current}/${this.vitals.max}`);
    } else {
      this.setTint(state === 'HURT' ? 0xffffff : state === 'ATTACK' ? 0xe9a66e : 0x9fb79e);
      const labels = { IDLE: 'EN ESPERA', CHASE: 'SE ACERCA', ATTACK: 'ATAQUE', HURT: 'GOLPEADO' };
      this.label.setText(`${this.vitals.current}/${this.vitals.max} · ${labels[state]}`);
    }
    this.label.setPosition(this.x, this.y - 76);
  }
  attackBox(now) {
    if (!this.vitals.alive || this.brain.attack.phase(now) !== 'active') return null;
    return attackRectangle(this.body, this.facing, this.config.attackRange, this.config.hitboxHeight);
  }
  takeDamage(damage, now) {
    if (!this.vitals.receive(damage, now)) return false;
    this.setVelocityX(0);
    if (!this.vitals.alive) {
      this.brain.kill(); this.body.enable = false; this.label.destroy();
      if (this.animationKeys) {
        this.clearTint().play(this.animationKeys.death);
        this.once('animationcomplete', () => this.destroy());
      } else this.scene.tweens.add({ targets: this, alpha: 0, duration: 250, onComplete: () => this.destroy() });
    } else {
      this.brain.hurt(now);
      if (this.animationKeys) { this.play(this.animationKeys.hurt); this.visualState = 'HURT'; }
    }
    return true;
  }
}
