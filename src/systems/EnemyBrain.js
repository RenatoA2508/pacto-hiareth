import { AttackCycle } from './AttackCycle.js';

export class EnemyBrain {
  constructor(config) { this.config = config; this.state = 'IDLE'; this.attack = new AttackCycle(config.attack); this.hurtUntil = 0; }
  update(now, { dx, dy, blocked = false }) {
    if (this.state === 'DEATH') return this.state;
    if (now < this.hurtUntil) return this.state = 'HURT';
    if (this.attack.phase(now) !== 'idle') return this.state = 'ATTACK';
    const detected = Math.abs(dx) <= this.config.detectionX && Math.abs(dy) <= this.config.detectionY;
    if (!detected) return this.state = 'IDLE';
    if (Math.abs(dx) <= this.config.attackRange && this.attack.start(now)) return this.state = 'ATTACK';
    return this.state = blocked || Math.abs(dx) < this.config.attackRange ? 'IDLE' : 'CHASE';
  }
  hurt(now) {
    if (this.state === 'DEATH') return;
    this.attack.cancel(); this.hurtUntil = now + this.config.hurtMs; this.state = 'HURT';
  }
  kill() { this.attack.cancel(); this.state = 'DEATH'; }
}
