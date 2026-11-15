export class Vitals {
  constructor(maxHealth, invulnerabilityMs = 0) {
    this.max = maxHealth;
    this.current = maxHealth;
    this.invulnerabilityMs = invulnerabilityMs;
    this.invulnerableUntil = -Infinity;
  }
  get alive() { return this.current > 0; }
  receive(damage, now) {
    if (!this.alive || !Number.isFinite(damage) || damage <= 0 || now < this.invulnerableUntil) return false;
    this.current = Math.max(0, this.current - damage);
    this.invulnerableUntil = now + this.invulnerabilityMs;
    return true;
  }
}
