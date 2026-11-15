import { GAME } from '../config/game.js';
import { CITY_LAYERS } from '../config/level2.js';

export function drawCityLevel(scene, platforms) {
  const layers = CITY_LAYERS.map(({ file, factor }) => {
    const layer = scene.add.tileSprite(0, 0, GAME.width, GAME.height, `city-${file}`).setOrigin(0).setScrollFactor(0);
    layer.setTileScale(GAME.height / 324); return { layer, factor };
  });
  const surfaces = scene.physics.add.staticGroup();
  for (const { x, y, width, height } of platforms) {
    const floor = scene.add.rectangle(x, y, width, height, 0x4d4448).setOrigin(0);
    surfaces.add(floor); floor.body.updateFromGameObject();
    const g = scene.add.graphics();
    g.fillStyle(0xb3a29b).fillRect(x, y, width, 5);
    g.fillStyle(0x7b6b6b).fillRect(x, y + 5, width, 12);
    g.fillStyle(0x322c33);
    for (let i = 12; i < width; i += 58) g.fillRect(x + i, y + 24, Math.min(22, width - i), 5);
  }
  return { surfaces, update(scrollX) { layers.forEach(({ layer, factor }) => { layer.tilePositionX = scrollX * factor; }); } };
}
