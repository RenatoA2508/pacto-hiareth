import Phaser from 'phaser';
import { GAME } from '../config/game.js';
import { TRAINING, TRAINING_ENEMY, PLAYER_COMBAT } from '../config/combat.js';
import { Player } from '../entities/Player.js';
import { PracticeEnemy } from '../entities/PracticeEnemy.js';
import { InputController } from '../managers/InputController.js';
import { intersects, wallBetween } from '../systems/hitboxes.js';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class CombatScene extends Phaser.Scene {
  constructor() { super('Combat'); }
  create() {
    this.ui = this.registry.get('ui');
    this.defeated = 0; this.ending = false;
    this.ui.hidePanel(); this.ui.mode(true); this.ui.gameplay(true); this.ui.focusGame();
    drawLaboratory(this, TRAINING.width);
    this.physics.world.setBounds(0, 0, TRAINING.width, TRAINING.height);
    this.cameras.main.setBounds(0, 0, TRAINING.width, GAME.height);
    const floor = this.physics.add.staticGroup();
    TRAINING.platforms.forEach(({ x, y, width, height }) => {
      const rectangle = this.add.rectangle(x, y, width, height, 0x2b4142).setOrigin(0);
      floor.add(rectangle); rectangle.body.updateFromGameObject();
      this.add.rectangle(x, y, width, 3, 0xb7ab84).setOrigin(0);
    });
    this.createTargetTexture();
    this.player = new Player(this, TRAINING.start.x, TRAINING.start.feetY, { combat: true });
    this.enemies = TRAINING.enemies.map((x) => new PracticeEnemy(this, x, 468));
    this.physics.add.collider(this.player, floor);
    this.physics.add.collider(this.enemies, floor);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.overlap(this.player, this.enemies, (_, enemy) => {
      if (enemy.vitals.alive) this.damagePlayer(TRAINING_ENEMY.contactDamage);
    });
    this.cameras.main.startFollow(this.player, true, 0.12, 1);
    this.hitboxGraphics = this.add.graphics();
    this.add.text(180, 260, 'J / ATAQUE CERCANO', { font: '13px Arial', color: '#dcc497' });
    this.add.text(180, 290, '3 objetivos geométricos · sin contenido narrativo', { font: '11px Arial', color: '#aebba9' });
    this.controls = new InputController(this, this.ui);
    const pause = () => {
      if (this.ending || !this.scene.isActive()) return;
      this.controls.reset();
      this.registry.get('audio')?.play('back');
      this.scene.launch('Pause', { sceneKey: 'Combat' }); this.scene.pause();
    };
    const onKey = (event) => { if (event.code === 'Escape') { event.preventDefault(); pause(); } };
    const onVisibility = () => { if (document.hidden) pause(); };
    const offPause = this.ui.on('pause', pause);
    window.addEventListener('keydown', onKey); window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', onVisibility);
    this.events.once('shutdown', () => {
      offPause(); window.removeEventListener('keydown', onKey); window.removeEventListener('blur', pause);
      document.removeEventListener('visibilitychange', onVisibility); this.ui.gameplay(false);
    });
    this.updateStats();
    this.ui.announce('Entrenamiento. Tres puntos de vida. Acércate a los objetivos y ataca con J o el botón Atacar.');
  }

  createTargetTexture() {
    if (this.textures.exists('practice-target')) return;
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x769082).fillRect(6, 10, 28, 46);
    g.lineStyle(2, 0xd0d4b3).strokeRect(2, 2, 36, 52);
    g.lineBetween(10, 15, 30, 43).lineBetween(30, 15, 10, 43);
    g.generateTexture('practice-target', 40, 56); g.destroy();
  }
  updateStats() { this.ui.combatStats(this.player.vitals.current, this.defeated, this.enemies.length, this.player.vitals.max); }
  damagePlayer(damage) {
    if (this.ending || !this.player.takeDamage(damage, this.time.now)) return false;
    this.updateStats();
    this.ui.announce(`Vida: ${this.player.vitals.current} de ${this.player.vitals.max}.`);
    if (!this.player.vitals.alive) this.finish('defeat', 750);
    return true;
  }
  finish(result, delay = 350) {
    if (this.ending) return;
    this.ending = true; this.controls.reset(); this.player.setVelocityX(0);
    this.enemies.forEach((enemy) => { if (enemy.active && enemy.body) enemy.setVelocityX(0); });
    this.time.delayedCall(delay, () => this.scene.start('Result', { result, mode: 'combat' }));
  }
  paintHitbox(box, color) {
    this.hitboxGraphics.fillStyle(color, 0.15).fillRect(box.x, box.y, box.width, box.height);
    this.hitboxGraphics.lineStyle(1, color, 0.85).strokeRect(box.x, box.y, box.width, box.height);
  }
  update() {
    if (this.ending) return;
    const now = this.time.now;
    this.player.move(this.controls.sample());
    this.player.x = Phaser.Math.Clamp(this.player.x, 25, TRAINING.width - 25);
    this.hitboxGraphics.clear();
    const playerBox = this.player.attackBox(now);
    if (playerBox) this.paintHitbox(playerBox, 0xe4c88c);
    for (const enemy of this.enemies) {
      if (!enemy.active || !enemy.vitals.alive) continue;
      if (playerBox && this.player.attackCycle.canHit(enemy, now) && intersects(playerBox, enemy.body) && !wallBetween(this.player.body, enemy.body, TRAINING.platforms)) {
        if (enemy.takeDamage(PLAYER_COMBAT.damage, now)) {
          this.player.attackCycle.recordHit(enemy); this.registry.get('audio')?.play('land');
          if (!enemy.vitals.alive) { this.defeated++; this.updateStats(); }
        }
      }
      if (!enemy.vitals.alive) continue;
      enemy.updateAI(now, this.player);
      const enemyBox = enemy.attackBox(now);
      if (enemyBox) {
        this.paintHitbox(enemyBox, 0xf09068);
        if (enemy.brain.attack.canHit(this.player, now) && intersects(enemyBox, this.player.body) && !wallBetween(enemy.body, this.player.body, TRAINING.platforms) && this.damagePlayer(TRAINING_ENEMY.damage)) enemy.brain.attack.recordHit(this.player);
      }
    }
    if (this.defeated === this.enemies.length) this.finish('complete');
  }
}
