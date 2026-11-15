import { BaseEnemy } from './BaseEnemy.js';
import { SLIME_ART, SLIME_COMBAT, LEVEL1 } from '../config/level1.js';

export class SlimeEnemy extends BaseEnemy {
  constructor(scene, x, y, config = SLIME_COMBAT, platforms = LEVEL1.platforms) {
    super(scene, x, y, {
      texture: 'slime-idle', config, platforms, art: SLIME_ART, name: 'Slime',
      animations: Object.fromEntries(SLIME_ART.animations.map(({ key }) => [key, `slime-${key}`])),
    });
  }
}
