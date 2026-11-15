import { GAME } from '../config/game.js';
import { NATURE_LAYERS } from '../config/level1.js';

export function drawNatureLevel(scene, platforms) {
  // Las capas 8 y 10 son suelo plano decorativo; el suelo físico ya se dibuja abajo.
  // Ampliar uniformemente el paisaje lleva las bases de los árboles bajo el terreno.
  const layers = NATURE_LAYERS.filter(({ file }) => !['8.png', '10.png'].includes(file)).map(({ file, factor }) => {
    const layer = scene.add.tileSprite(0, 0, GAME.width, GAME.height, `nature-${file}`).setOrigin(0).setScrollFactor(0);
    layer.setTileScale(GAME.height / 275);
    return { layer, factor };
  });
  const surfaces = scene.physics.add.staticGroup();
  for (const { x, y, width, height } of platforms) {
    const body = scene.add.rectangle(x, y, width, height, 0x40412b).setOrigin(0);
    surfaces.add(body); body.body.updateFromGameObject();
    const details = scene.add.graphics();
    details.fillStyle(0x5d6038).fillRect(x, y + 7, width, 10);
    details.fillStyle(0x8f9c4e).fillRect(x, y, width, 7);
    details.fillStyle(0xb9c16a);
    for (let i = 0; i < width; i += 16) details.fillRect(x + i, y - (i % 3), 8, 4);
    details.fillStyle(0x2d3525);
    for (let i = 14; i < width; i += 47) details.fillRect(x + i, y + 23, Math.min(16, width - i), 5);
  }
  return { surfaces, update(scrollX) { layers.forEach(({ layer, factor }) => { layer.tilePositionX = scrollX * factor; }); } };
}
