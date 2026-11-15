import Phaser from 'phaser';
import './style.css';
import { GAME } from './config/game.js';
import { StorageManager } from './managers/StorageManager.js';
import { GameUI } from './ui/GameUI.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { PlaygroundScene } from './scenes/PlaygroundScene.js';
import { PauseScene } from './scenes/PauseScene.js';
import { ResultScene } from './scenes/ResultScene.js';

let browserStorage;
try { browserStorage = window.localStorage; } catch { /* Modo privado o política del navegador. */ }
const storage = new StorageManager(browserStorage);
const ui = new GameUI(storage);
const game = new Phaser.Game({
  // Este incremento solo necesita dibujo 2D; Canvas evita depender del driver WebGL.
  type: Phaser.CANVAS,
  parent: 'game',
  width: GAME.width, height: GAME.height,
  backgroundColor: '#15252b',
  pixelArt: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  physics: { default: 'arcade', arcade: { gravity: { x: 0, y: GAME.gravity }, debug: false } },
  scene: [BootScene, MenuScene, PlaygroundScene, PauseScene, ResultScene],
  callbacks: {
    preBoot(instance) { instance.registry.set('storage', storage); instance.registry.set('ui', ui); },
    postBoot(instance) { instance.sound.mute = storage.data.muted; },
  },
});

ui.on('mute', () => {
  storage.update({ muted: !storage.data.muted });
  game.sound.mute = storage.data.muted;
  ui.updateMute();
});
if (import.meta.hot) import.meta.hot.dispose(() => { ui.destroy(); game.destroy(true); });
