import { PLAYER_COMBAT } from './combat.js';
import { SLIME_COMBAT } from './level1.js';

// Configuración global de dificultad. No modifica el relato.
export const DIFFICULTIES = Object.freeze({
  easy: { label: 'Fácil', health: 5, invulnerabilityMs: 1200, speed: 55, cooldownMs: 2000, gapExtra: -30, platformTrim: 0, cityGap: 0, description: '5 vidas · slimes tranquilos · saltos amplios' },
  medium: { label: 'Media', health: 3, invulnerabilityMs: 900, speed: 85, cooldownMs: 1450, gapExtra: 30, platformTrim: 20, cityGap: 90, description: '3 vidas · slimes activos · más saltos en las ruinas' },
  hard: { label: 'Hard', health: 3, invulnerabilityMs: 650, speed: 110, cooldownMs: 1150, gapExtra: 45, platformTrim: 40, cityGap: 130, description: '3 vidas · recuperación breve · saltos precisos' },
});
export const difficultyKey = (key) => Object.hasOwn(DIFFICULTIES, key) ? key : 'medium';
export const difficulty = (key) => DIFFICULTIES[difficultyKey(key)];
export function playerCombat(key) {
  const d = difficulty(key);
  return { ...PLAYER_COMBAT, maxHealth: d.health, invulnerabilityMs: d.invulnerabilityMs };
}
export function slimeCombat(key) {
  const d = difficulty(key);
  // Mantener la anticipación y la animación del ataque; variar el tiempo entre ataques.
  return { ...SLIME_COMBAT, speed: d.speed, attack: { ...SLIME_COMBAT.attack, cooldownMs: d.cooldownMs } };
}
export function levelForDifficulty(base, key) {
  const d = difficulty(key);
  const floors = base.platforms.filter(p => p.y === 470);
  let platforms = base.platforms.map(p => p.y === 470
    ? { ...p, width: p.width - (p === floors.at(-1) ? 0 : d.gapExtra) }
    : { ...p, x: p.x + d.platformTrim / 2, width: p.width - d.platformTrim });
  if (base.id === 2 && d.cityGap) {
    for (const cut of [700, 1800, 3150]) {
      platforms = platforms.flatMap(p => p.y === 470 && cut > p.x && cut + d.cityGap < p.x + p.width
        ? [{ ...p, width: cut - p.x }, { ...p, x: cut + d.cityGap, width: p.x + p.width - cut - d.cityGap }]
        : [p]);
    }
  }
  return { ...base, platforms };
}
