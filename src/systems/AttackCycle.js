// Usa el reloj de la escena: la pausa también detiene las ventanas de ataque.
export class AttackCycle {
  constructor(config) { this.config = config; this.startedAt = null; this.nextAllowedAt = 0; this.hits = new Set(); }
  start(now) {
    if (now < this.nextAllowedAt || this.phase(now) !== 'idle') return false;
    this.startedAt = now;
    this.nextAllowedAt = now + this.config.cooldownMs;
    this.hits.clear();
    return true;
  }
  phase(now) {
    if (this.startedAt === null) return 'idle';
    const elapsed = now - this.startedAt;
    const { windupMs, activeMs, recoveryMs } = this.config;
    if (elapsed < windupMs) return 'windup';
    if (elapsed < windupMs + activeMs) return 'active';
    if (elapsed < windupMs + activeMs + recoveryMs) return 'recovery';
    return 'idle';
  }
  canHit(target, now) { return this.phase(now) === 'active' && !this.hits.has(target); }
  recordHit(target) { this.hits.add(target); }
  cancel() { this.startedAt = null; this.hits.clear(); }
}
