import { Level1Scene } from './Level1Scene.js';
import { LEVEL2 } from '../config/level2.js';

// Reutiliza física, checkpoints y portal. No instancia enemigos sin recursos aprobados.
export class Level2Scene extends Level1Scene {
  constructor() { super('Level2', LEVEL2); }
}
