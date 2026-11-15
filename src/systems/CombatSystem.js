import { PLAYER_COMBAT } from '../config/combat.js';
import { intersects, wallBetween } from './hitboxes.js';

export class CombatSystem {
  constructor(scene, { player, enemies, platforms, onDefeated, onPlayerDamage, showHitboxes = false }) {
    Object.assign(this, { scene, player, enemies, platforms, onDefeated, onPlayerDamage });
    this.graphics = showHitboxes ? scene.add.graphics() : null;
    scene.physics.add.overlap(player, enemies, (_, enemy) => {
      if (enemy.vitals.alive && player.vitals.alive) onPlayerDamage(enemy.config.contactDamage);
    });
  }
  paint(box, color) {
    this.graphics?.fillStyle(color, 0.15).fillRect(box.x, box.y, box.width, box.height);
    this.graphics?.lineStyle(1, color, 0.85).strokeRect(box.x, box.y, box.width, box.height);
  }
  update(now) {
    this.graphics?.clear();
    if (!this.player.vitals.alive) return;
    const playerBox = this.player.attackBox(now);
    if (playerBox) this.paint(playerBox, 0xe4c88c);
    for (const enemy of this.enemies) {
      if (!enemy.active || !enemy.vitals.alive) continue;
      if (playerBox && this.player.attackCycle.canHit(enemy, now) && intersects(playerBox, enemy.body) && !wallBetween(this.player.body, enemy.body, this.platforms) && enemy.takeDamage(PLAYER_COMBAT.damage, now)) {
        this.player.attackCycle.recordHit(enemy); this.scene.registry.get('audio')?.play('land');
        if (!enemy.vitals.alive) this.onDefeated(enemy);
      }
      if (!enemy.vitals.alive) continue;
      enemy.updateAI(now, this.player);
      const box = enemy.attackBox(now);
      if (box) {
        this.paint(box, 0xf09068);
        if (enemy.brain.attack.canHit(this.player, now) && intersects(box, this.player.body) && !wallBetween(enemy.body, this.player.body, this.platforms) && this.onPlayerDamage(enemy.config.damage)) enemy.brain.attack.recordHit(this.player);
      }
    }
  }
}
