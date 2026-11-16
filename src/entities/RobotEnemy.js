import { BaseEnemy } from './BaseEnemy.js';
import { TRAINING_ENEMY } from '../config/combat.js';

export class RobotEnemy extends BaseEnemy {
  constructor(scene, x, y, difficulty, platforms) {
    super(scene, x, y, {
      texture: 'robot-idle', name: 'Autómata', platforms,
      config: { ...TRAINING_ENEMY, speed: difficulty.speed, detectionX: 300,
        attack: { ...TRAINING_ENEMY.attack, cooldownMs: difficulty.cooldownMs } },
      art: { originY: 0.91, scale: 0.08, body: { width: 820, height: 650, offsetX: 350, offsetY: 280 } },
    });
  }

  updateAI(now, player) {
    super.updateAI(now, player);
    if (!this.vitals.alive) return;
    const phase = this.brain.attack.phase(now);
    const walk = this.body.velocity.x ? Math.sin(now / 65) * 3 : 0;
    if (phase === 'windup') {
      this.setAngle(-this.facing * 7).setTint(0xffc082);
    } else if (phase === 'active') {
      this.setAngle(this.facing * 8).setTint(0xff947a);
    } else {
      this.setAngle(walk);
    }
  }
}
