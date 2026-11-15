import { TRAINING_ENEMY } from './combat.js';

export const SLIME_ART = Object.freeze({
  frameWidth: 64, frameHeight: 64, scale: 2, originY: 40 / 64,
  body: { width: 18, height: 18, offsetX: 23, offsetY: 22 },
  // Cuarta fila inspeccionada: vista lateral derecha. FlipX permite mirar a la izquierda.
  animations: [
    { key: 'idle', file: 'Idle.png', count: 6, fps: 8, repeat: -1 },
    { key: 'walk', file: 'Walk.png', count: 8, fps: 10, repeat: -1 },
    { key: 'attack', file: 'Attack.png', count: 10, fps: 10, repeat: 0 },
    { key: 'hurt', file: 'Hurt.png', count: 5, fps: 12, repeat: 0 },
    { key: 'death', file: 'Death.png', count: 10, fps: 12, repeat: 0 },
  ],
});
export const SLIME_COMBAT = Object.freeze({
  ...TRAINING_ENEMY, speed: 65, detectionX: 330, detectionY: 80,
  attackRange: 65, hitboxHeight: 70, hurtMs: 417,
  attack: { windupMs: 500, activeMs: 500, recoveryMs: 0, cooldownMs: 1700 },
});
export const NATURE_LAYERS = Object.freeze([
  { file: '1.png', factor: 0 }, { file: '2.png', factor: 0.08 },
  { file: '3.png', factor: 0.16 }, { file: '5.png', factor: 0.3 },
  { file: '6.png', factor: 0.45 }, { file: '7.png', factor: 0.6 },
  { file: '8.png', factor: 0.8 }, { file: '10.png', factor: 0.95 },
]);
export const LEVEL1 = Object.freeze({
  id: 1, biome: 'nature', title: 'TIERRA, MAR Y CIELO',
  width: 4300, height: 680, start: { x: 140, feetY: 468 },
  portal: { x: 4110, feetY: 470 },
  checkpoints: [{ x: 140, feetY: 468 }, { x: 1680, feetY: 468 }, { x: 3100, feetY: 468 }],
  enemies: [650, 1380, 2100, 2690, 3440, 3830],
  platforms: [
    { x: 0, y: 470, width: 960, height: 210 },
    { x: 1110, y: 470, width: 1160, height: 210 },
    { x: 2420, y: 470, width: 1140, height: 210 },
    { x: 3710, y: 470, width: 590, height: 210 },
    { x: 450, y: 365, width: 170, height: 28 },
    { x: 1230, y: 365, width: 160, height: 28 },
    { x: 1930, y: 365, width: 170, height: 28 },
    { x: 2540, y: 365, width: 170, height: 28 },
    { x: 3240, y: 365, width: 150, height: 28 },
  ],
});
