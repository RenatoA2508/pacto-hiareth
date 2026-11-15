// Balance de entrenamiento: aprobado para probar y ajustar, no es canon narrativo.
export const PLAYER_COMBAT = Object.freeze({
  maxHealth: 3, invulnerabilityMs: 900, damage: 1, range: 78, hitboxHeight: 70,
  hurtMs: 250,
  attack: { windupMs: 250, activeMs: 250, recoveryMs: 167, cooldownMs: 800 },
});
export const TRAINING_ENEMY = Object.freeze({
  maxHealth: 2, invulnerabilityMs: 220, damage: 1, contactDamage: 1,
  speed: 85, detectionX: 420, detectionY: 95, attackRange: 68,
  hitboxHeight: 54, hurtMs: 300,
  attack: { windupMs: 650, activeMs: 180, recoveryMs: 400, cooldownMs: 1600 },
});
export const TRAINING = Object.freeze({
  width: 2200, height: 680,
  start: { x: 140, feetY: 468 },
  enemies: [620, 1180, 1810],
  platforms: [
    { x: 0, y: 470, width: 2200, height: 210 },
    { x: 1430, y: 385, width: 100, height: 85 },
  ],
});
