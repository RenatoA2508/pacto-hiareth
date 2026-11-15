import Phaser from 'phaser';
import { GAME } from '../config/game.js';
import { PLAYGROUND } from '../data/playground.js';
import { Player } from '../entities/Player.js';
import { InputController } from '../managers/InputController.js';
import { drawLaboratory } from '../ui/drawLaboratory.js';

export class PlaygroundScene extends Phaser.Scene {
  constructor() { super('Playground'); }
  create({ resume = false } = {}) {
    this.ui = this.registry.get('ui');
    this.storage = this.registry.get('storage');
    this.ending = false;
    this.checkpointActive = resume && this.storage.data.playgroundCheckpoint;
    this.ui.hidePanel(); this.ui.mode(false); this.ui.gameplay(true); this.ui.checkpoint(this.checkpointActive); this.ui.focusGame();
    drawLaboratory(this, PLAYGROUND.width);
    this.physics.world.setBounds(0, 0, PLAYGROUND.width, PLAYGROUND.height);
    this.cameras.main.setBounds(0, 0, PLAYGROUND.width, GAME.height);
    const surfaces = this.physics.add.staticGroup();
    PLAYGROUND.platforms.forEach(({ x, y, width, height }) => {
      const visual = this.add.rectangle(x, y, width, height, 0x2b4142).setOrigin(0);
      surfaces.add(visual);
      visual.body.updateFromGameObject();
      this.add.rectangle(x, y, width, 3, 0xa7b395).setOrigin(0);
      this.add.rectangle(x + 8, y + 9, width - 16, Math.min(height - 10, 20), 0x1c3035).setOrigin(0);
    });
    this.mark(PLAYGROUND.start, '01 / MOVIMIENTO', 'A · D / ← · →', 0x9cae9a);
    this.mark({ x: 480, feetY: 275 }, '02 / SALTO', 'ESPACIO', 0x9cae9a);
    this.checkpointMarker = this.mark(PLAYGROUND.checkpoint, '03 / CHECKPOINT', 'GUARDADO AUTOMÁTICO', this.checkpointActive ? 0xe0c78f : 0x81978d);
    this.mark(PLAYGROUND.finish, '04 / LLEGADA', 'FIN DE LA PRUEBA', 0xe0c78f);
    const spawn = this.checkpointActive ? PLAYGROUND.checkpoint : PLAYGROUND.start;
    this.player = new Player(this, spawn.x, spawn.feetY);
    this.physics.add.collider(this.player, surfaces);
    this.cameras.main.startFollow(this.player, true, 0.12, 1);
    this.controls = new InputController(this, this.ui);
    const offPause = this.ui.on('pause', () => this.pausePlay());
    const onEscape = (event) => {
      if (event.code === 'Escape' && this.scene.isActive()) { event.preventDefault(); this.pausePlay(); }
    };
    const onBlur = () => this.pausePlay();
    const onVisibility = () => { if (document.hidden) this.pausePlay(); };
    window.addEventListener('keydown', onEscape);
    window.addEventListener('blur', onBlur);
    document.addEventListener('visibilitychange', onVisibility);
    this.events.once('shutdown', () => {
      offPause(); window.removeEventListener('keydown', onEscape); window.removeEventListener('blur', onBlur);
      document.removeEventListener('visibilitychange', onVisibility);
      this.ui.gameplay(false);
    });
    this.ui.announce('Prueba iniciada. Recorre las plataformas hasta la marca de llegada.');
    if (import.meta.env.DEV && new URLSearchParams(location.search).has('debug')) {
      this.telemetry = document.createElement('output');
      this.telemetry.setAttribute('aria-live', 'off');
      this.nextTelemetryAt = 0;
      this.telemetry.style = 'position:fixed;bottom:4px;left:4px;z-index:30;background:#000;color:#fff;padding:8px;font:12px monospace';
      document.body.append(this.telemetry);
      this.events.once('shutdown', () => { this.telemetry.remove(); this.telemetry = null; });
    }
  }

  mark({ x, feetY }, heading, caption, color) {
    this.add.rectangle(x, feetY - 35, 2, 70, color).setOrigin(0.5, 0.5);
    const flag = this.add.rectangle(x + 17, feetY - 66, 32, 14, color).setOrigin(0.5);
    this.add.text(x, feetY - 125, heading, { fontFamily: 'Arial', fontSize: '11px', color: '#d6cbb0' }).setOrigin(0.5);
    this.add.text(x, feetY - 105, caption, { fontFamily: 'Arial', fontSize: '8px', color: '#a6b3a7' }).setOrigin(0.5);
    return flag;
  }

  pausePlay() {
    if (this.ending || !this.scene.isActive()) return;
    this.controls.reset();
    this.registry.get('audio')?.play('back');
    this.scene.launch('Pause');
    this.scene.pause();
  }

  finishRun(result) {
    if (this.ending) return;
    this.ending = true;
    this.controls.reset();
    this.scene.start('Result', { result, resume: this.checkpointActive });
  }

  update(time) {
    if (this.ending) return;
    this.player.move(this.controls.sample());
    if (this.telemetry && time >= this.nextTelemetryAt) {
      this.nextTelemetryAt = time + 1000;
      this.telemetry.textContent = `FPS ${this.game.loop.actualFps.toFixed(0)} · x ${this.player.x.toFixed(0)} · y ${this.player.body.bottom.toFixed(0)} · suelo ${this.player.body.blocked.down}`;
    }
    // Limitar X sin suelo invisible en el fondo: una caída debe terminar la prueba.
    this.player.x = Phaser.Math.Clamp(this.player.x, 24, PLAYGROUND.width - 24);
    if (this.player.body.top > GAME.height + 40) { this.finishRun('fall'); return; }
    if (!this.checkpointActive && Math.abs(this.player.x - PLAYGROUND.checkpoint.x) < 35 && this.player.body.blocked.down) {
      this.checkpointActive = true;
      this.storage.update({ playgroundCheckpoint: true });
      this.checkpointMarker.setFillStyle(0xe0c78f);
      this.registry.get('audio')?.play('confirm');
      this.ui.checkpoint(true);
      this.ui.announce(this.storage.available ? 'Checkpoint guardado.' : 'Checkpoint activo en esta sesión. El navegador no permite guardar.');
    }
    if (this.player.x >= PLAYGROUND.finish.x && this.player.body.blocked.down) this.finishRun('complete');
  }
}
