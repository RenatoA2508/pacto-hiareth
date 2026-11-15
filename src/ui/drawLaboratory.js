import { GAME } from '../config/game.js';

// Formas geométricas para QA de físicas; no sustituyen los fondos aprobados.
export function drawLaboratory(scene, width) {
  scene.cameras.main.setBackgroundColor('#15252b');
  const grid = scene.add.graphics().setScrollFactor(0);
  grid.lineStyle(1, 0x536c68, 0.12);
  for (let x = 0; x < GAME.width; x += 48) grid.lineBetween(x, 0, x, GAME.height);
  for (let y = 0; y < GAME.height; y += 48) grid.lineBetween(0, y, GAME.width, y);
  const lines = scene.add.graphics().setScrollFactor(0.25);
  lines.lineStyle(1, 0x9da78b, 0.1);
  for (let x = 140; x < width; x += 360) {
    lines.strokeRect(x, 170, 185, 310);
    lines.lineBetween(x, 170, x + 185, 480);
    lines.lineBetween(x + 185, 170, x, 480);
  }
}
