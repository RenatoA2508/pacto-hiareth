import { BaseEnemy } from './BaseEnemy.js';
import { TRAINING_ENEMY, TRAINING } from '../config/combat.js';

// Objetivo geométrico de QA; no representa un slime ni un personaje del relato.
export class PracticeEnemy extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, {
      texture: 'practice-target', config: TRAINING_ENEMY, platforms: TRAINING.platforms, name: 'OBJETIVO',
      art: { originY: 1, scale: 1, body: { width: 28, height: 46, offsetX: 6, offsetY: 10 } },
    });
  }
}
