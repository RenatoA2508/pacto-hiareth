import Phaser from 'phaser';
import { GAME } from '../config/game.js';
import { LEVEL1 } from '../config/level1.js';
import { Player } from '../entities/Player.js';
import { SlimeEnemy } from '../entities/SlimeEnemy.js';
import { InputController } from '../managers/InputController.js';
import { LevelProgress } from '../systems/LevelProgress.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { drawNatureLevel } from '../ui/drawNatureLevel.js';
import { drawCityLevel } from '../ui/drawCityLevel.js';
import { createDiagnostics } from '../ui/SceneDiagnostics.js';

export class Level1Scene extends Phaser.Scene {
  constructor(key = 'Level1', level = LEVEL1) { super(key); this.level = level; }
  create({ resume = false } = {}) {
    this.ui = this.registry.get('ui'); this.ending = false;
    this.progress = new LevelProgress(this.registry.get('storage'), { id: this.level.id, checkpointCount: this.level.checkpoints.length, enemyCount: this.level.enemies.length });
    if (!resume) this.progress.reset();
    this.progress.save();
    this.ui.hidePanel(); this.ui.mode(true); this.ui.gameplay(true); this.ui.focusGame();
    this.physics.world.setBounds(0, 0, this.level.width, this.level.height);
    this.cameras.main.setBounds(0, 0, this.level.width, GAME.height);
    this.environment = this.level.biome === 'city' ? drawCityLevel(this, this.level.platforms) : drawNatureLevel(this, this.level.platforms);
    const spawn = this.level.checkpoints[this.progress.checkpoint];
    this.player = new Player(this, spawn.x, spawn.feetY, { combat: true });
    this.enemies = this.level.enemies.flatMap((x, id) => {
      if (this.progress.killed.has(id)) return [];
      const enemy = new SlimeEnemy(this, x, 468); enemy.progressId = id; return [enemy];
    });
    this.physics.add.collider(this.player, this.environment.surfaces);
    this.physics.add.collider(this.enemies, this.environment.surfaces);
    this.physics.add.collider(this.enemies, this.enemies);
    this.combat = new CombatSystem(this, {
      player: this.player, enemies: this.enemies, platforms: this.level.platforms,
      onPlayerDamage: (damage) => this.damagePlayer(damage),
      onDefeated: (enemy) => { this.progress.defeat(enemy.progressId); this.updateStats(); },
    });
    this.cameras.main.startFollow(this.player, true, 0.12, 1);
    this.checkpointMarkers = this.level.checkpoints.slice(1).map(({ x, feetY }, offset) => {
      this.add.rectangle(x, feetY - 20, 8, 40, 0x364333).setOrigin(0.5, 0.5);
      const light = this.add.circle(x, feetY - 45, 7, this.progress.checkpoint > offset ? 0xf2d996 : 0xb0c69a);
      this.add.text(x, feetY - 74, 'Checkpoint', { font: '10px Arial', color: '#f2efd9', backgroundColor: '#233e2d', padding: { x: 5, y: 3 } }).setOrigin(0.5);
      return light;
    });
    const { x, feetY } = this.level.portal;
    this.add.ellipse(x, feetY - 73, 90, 146, 0x7154a6, 0.22);
    this.portalRing = this.add.ellipse(x, feetY - 73, 64, 132).setStrokeStyle(4, 0xc4b6ed, 0.95);
    this.add.ellipse(x, feetY - 73, 44, 110).setStrokeStyle(2, 0x967bc7, 0.8);
    this.add.text(x, feetY - 166, 'Portal', { font: '13px Georgia', color: '#f4efd9', backgroundColor: '#283b36', padding: { x: 9, y: 5 } }).setOrigin(0.5);
    this.controls = new InputController(this, this.ui);
    this.diagnostics = createDiagnostics(this);
    const pause = () => {
      if (this.ending || !this.scene.isActive()) return;
      this.controls.reset(); this.registry.get('audio')?.play('back');
      this.scene.launch('Pause', { sceneKey: this.scene.key }); this.scene.pause();
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
    this.ui.announce(this.level.id === 1 ? 'Tierra, mar y cielo. Alcanza el portal. Puedes atacar a los slimes o esquivarlos.' : 'Vuela alto. Atraviesa las plataformas de la ciudad hasta el portal.');
  }
  updateStats() {
    if (this.level.id === 1) this.ui.levelStats(this.player.vitals.current, this.player.vitals.max, this.progress.killed.size, this.progress.checkpoint);
    else this.ui.cityStats(this.player.vitals.current, this.player.vitals.max, this.progress.checkpoint);
  }
  damagePlayer(damage) {
    if (this.ending || !this.player.takeDamage(damage, this.time.now)) return false;
    this.updateStats(); this.ui.announce(`Vida ${this.player.vitals.current} de ${this.player.vitals.max}.`);
    if (!this.player.vitals.alive) this.finish('defeat', 750);
    return true;
  }
  finish(result, delay = 350) {
    if (this.ending) return;
    this.ending = true; this.controls.reset(); this.player.setVelocityX(0);
    this.enemies.forEach((enemy) => { if (enemy.active && enemy.body) enemy.setVelocityX(0); });
    if (result === 'complete') { this.progress.complete(); this.registry.get('audio')?.play('confirm'); }
    this.time.delayedCall(delay, () => this.scene.start('Result', { result, mode: `level${this.level.id}`, defeated: this.progress.killed.size }));
  }
  update() {
    if (this.ending) return;
    const now = this.time.now;
    this.player.move(this.controls.sample());
    this.diagnostics?.update(this.player);
    this.player.x = Phaser.Math.Clamp(this.player.x, 25, this.level.width - 25);
    this.environment.update(this.cameras.main.scrollX);
    this.portalRing.setAlpha(0.65 + Math.sin(now / 400) * 0.25);
    this.combat.update(now);
    if (this.ending) return;
    if (this.player.body.top > GAME.height + 40) { this.finish('fall', 0); return; }
    this.level.checkpoints.forEach((checkpoint, index) => {
      if (Math.abs(this.player.x - checkpoint.x) < 35 && this.player.body.blocked.down && this.progress.reachCheckpoint(index)) {
        this.checkpointMarkers[index - 1].setFillStyle(0xf2d996); this.updateStats();
        this.registry.get('audio')?.play('confirm'); this.ui.announce('Checkpoint guardado.');
      }
    });
    if (Math.abs(this.player.x - this.level.portal.x) < 40 && this.player.body.blocked.down) this.finish('complete');
  }
}
