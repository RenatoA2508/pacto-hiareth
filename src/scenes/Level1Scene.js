import { CityBeams } from '../systems/CityBeams.js';
import { WalkDialogue } from '../ui/WalkDialogue.js';
import { difficulty, levelForDifficulty, playerCombat, slimeCombat } from '../config/difficulty.js';
import Phaser from 'phaser';
import { GAME } from '../config/game.js';
import { LEVEL1 } from '../config/level1.js';
import { Player } from '../entities/Player.js';
import { SlimeEnemy } from '../entities/SlimeEnemy.js';
import { ENDING_RESULTS } from '../config/journey.js';
import { EndingEnemy } from '../entities/EndingEnemy.js';
import { AineCompanion } from '../entities/AineCompanion.js';
import { drawEndingLevel } from '../ui/drawEndingLevel.js';
import { RobotEnemy } from '../entities/RobotEnemy.js';
import { InputController } from '../managers/InputController.js';
import { LevelProgress, journeyScore } from '../systems/LevelProgress.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { drawNatureLevel } from '../ui/drawNatureLevel.js';
import { drawCityLevel } from '../ui/drawCityLevel.js';
import { createDiagnostics } from '../ui/SceneDiagnostics.js';

export class Level1Scene extends Phaser.Scene {
  constructor(key = 'Level1', level = LEVEL1) { super(key); this.baseLevel = level; }
  create({ resume = false } = {}) {
    const difficultyId = this.registry.get('storage').data.difficulty;
    this.difficulty = difficulty(difficultyId);
    this.level = levelForDifficulty(this.baseLevel, difficultyId);
    this.enemyConfig = slimeCombat(difficultyId);
    this.ui = this.registry.get('ui'); this.ending = false;
    this.progress = new LevelProgress(this.registry.get('storage'), { id: this.level.id, checkpointCount: this.level.checkpoints.length, enemyCount: this.level.enemies.length });
    if (!resume) this.progress.reset();
    this.progress.save();
    this.ui.hidePanel(); this.ui.mode(true); this.ui.gameplay(true); this.ui.focusGame();
    this.physics.world.setBounds(0, 0, this.level.width, this.level.height);
    this.cameras.main.setBounds(0, 0, this.level.width, GAME.height);
    const { id, platforms, enemies } = this.level;
    if (id === 1) this.environment = drawNatureLevel(this, platforms);
    else if (id === 2) this.environment = drawCityLevel(this, platforms);
    else this.environment = drawEndingLevel(this, this.level);
    const spawn = this.level.checkpoints[this.progress.checkpoint];
    this.walkDialogue = new WalkDialogue(this, id, spawn.x);
    this.player = new Player(this, spawn.x, spawn.feetY, { combat: true, combatConfig: playerCombat(difficultyId) });
    const withAine = id <= 3 || (id === 5 && this.progress.storage.data.limboRoute === 'magic');
    this.companion = withAine ? new AineCompanion(this, spawn.x, spawn.feetY) : null;
    this.enemies = enemies.flatMap((x, enemyId) => {
      if (this.progress.killed.has(enemyId)) return [];
      let enemy;
      if (id === 1) enemy = new SlimeEnemy(this, x, 468, this.enemyConfig, platforms);
      else if (id === 2) enemy = new RobotEnemy(this, x, 468, this.difficulty, platforms);
      else enemy = new EndingEnemy(this, x, 468, id, this.difficulty, platforms);
      enemy.progressId = enemyId;
      return [enemy];
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
    this.cityBeams = id === 2 ? new CityBeams(this) : null;
    const { x, feetY } = this.level.portal;
    this.add.ellipse(x, feetY - 73, 90, 146, 0x7154a6, 0.22);
    this.portalRing = this.add.ellipse(x, feetY - 73, 64, 132).setStrokeStyle(4, 0xc4b6ed, 0.95);
    this.add.ellipse(x, feetY - 73, 44, 110).setStrokeStyle(2, 0x967bc7, 0.8);
    this.add.text(x, feetY - 166, this.level.exitLabel ?? 'Portal', { font: '13px Georgia', color: '#f4efd9', backgroundColor: '#283b36', padding: { x: 9, y: 5 } }).setOrigin(0.5);
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
    this.ui.announce(`${this.level.title}. ${this.objective}`);
  }
  get objective() {
    return this.level.objective ?? 'Alcanza el portal. Puedes combatir o esquivar.';
  }
  updateStats() {
    if (this.level.id === 1) this.ui.levelStats(this.player.vitals.current, this.player.vitals.max, this.progress.killed.size, this.progress.checkpoint);
    else if (this.level.id === 2) this.ui.cityStats(this.player.vitals.current, this.player.vitals.max, this.progress.checkpoint);
    else this.ui.journeyStats(this.level, this.player.vitals, this.progress, this.objective);
    document.querySelector('#hud-title').textContent += ` · ${this.difficulty.label}`;
    document.querySelector('#combat-health').textContent += ` · Puntos ${journeyScore(this.progress.storage.data)}`;
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
    if (result === 'complete') {
      const next = ENDING_RESULTS[this.level.id];
      this.progress.complete(next ? { endingStep: next, endingPage: 0 } : {});
      this.registry.get('audio')?.play('confirm');
    }
    this.time.delayedCall(delay, () => this.scene.start('Result', { result, mode: `level${this.level.id}`, defeated: this.progress.killed.size, score: journeyScore(this.progress.storage.data) }));
  }
  update() {
    if (this.ending) return;
    const now = this.time.now;
    this.player.move(this.controls.sample());
    this.diagnostics?.update(this.player);
    this.walkDialogue.update(this.player.x, now);
    this.companion?.follow(this.player, now, this.level.width);
    this.player.x = Phaser.Math.Clamp(this.player.x, 25, this.level.width - 25);
    this.environment.update(this.cameras.main.scrollX);
    this.portalRing.setAlpha(0.65 + Math.sin(now / 400) * 0.25);
    this.cityBeams?.update(now, this.player, (damage) => this.damagePlayer(damage));
    this.combat.update(now);
    if (this.ending) return;
    if (this.player.body.top > GAME.height + 40) { this.finish('fall', 0); return; }
    this.level.checkpoints.forEach((checkpoint, index) => {
      if (Math.abs(this.player.x - checkpoint.x) < 35 && this.player.body.blocked.down && this.progress.reachCheckpoint(index)) {
        this.checkpointMarkers[index - 1].setFillStyle(0xf2d996); this.updateStats();
        this.registry.get('audio')?.play('confirm'); this.ui.announce('Checkpoint guardado.');
      }
    });
    const atExit = Math.abs(this.player.x - this.level.portal.x) < 40 && this.player.body.blocked.down;
    const required = this.level.requiredEnemies ?? [];
    const exitLocked = required.some((id) => !this.progress.killed.has(id));
    this.portalRing.setStrokeStyle(4, exitLocked ? 0xd87976 : 0xc4b6ed, 0.95);
    if (atExit && !exitLocked) this.finish('complete');
    if (atExit && exitLocked && !this.exitWarned) {
      this.exitWarned = true;
      this.ui.announce(this.objective);
      this.walkDialogue.show({ speaker: 'Aidan', text: this.objective }, now);
    }
    if (!atExit) this.exitWarned = false;
  }
}
