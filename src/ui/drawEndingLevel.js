import { GAME } from '../config/game.js';

const PALETTES = {
  limbo: { sky: 0x171628, far: 0x292136, near: 0x201e2d, soil: 0x362c3d, edge: 0x88738d, detail: 0x514052 },
  valley: { sky: 0xe7bca1, far: 0xb1858c, near: 0x687f6d, soil: 0x5a4a49, edge: 0xa8af72, detail: 0x786052 },
  castle: { sky: 0x292333, far: 0x3f3143, near: 0x594052, soil: 0x382d3b, edge: 0xa8887d, detail: 0x6b5061 },
  gallery: { sky: 0x24202b, far: 0x463642, near: 0x59454b, soil: 0x3b3037, edge: 0xa6866b, detail: 0x63504b },
};

function drawLimbo(scene, far, near, colors, width) {
  scene.add.circle(785, 92, 37, 0xb2a4bb, 0.16).setScrollFactor(0);
  for (let x = -55, i = 0; x <= width; x += 167, i++) {
    const top = 120 + (i * 47 % 143);
    far.fillStyle(colors.far).fillEllipse(x + 50, 399, 280, 223);
    near.fillStyle(colors.near).fillTriangle(x + 18, top, x - 8, 480, x + 52, 480);
    near.fillTriangle(x + 19, top + 114, x - 58, top + 59, x - 8, top + 145);
    near.fillTriangle(x + 27, top + 128, x + 82, top + 61, x + 51, top + 142);
    near.fillStyle(0xd8b8e1, 0.30).fillRect(x + 76, top + 126, 4, 3);
  }
}

function drawValley(scene, far, near, colors, width) {
  scene.add.circle(772, 97, 54, 0xffe3af).setScrollFactor(0);
  for (let x = -250, i = 0; x <= width; x += 287, i++) {
    const peak = 106 + (i * 53 % 109);
    far.fillStyle(colors.far).fillTriangle(x, 440, x + 215, peak, x + 451, 440);
    far.fillStyle(0xffe1c1, 0.75).fillTriangle(x + 154, peak + 94, x + 215, peak, x + 285, peak + 94);
    near.fillStyle(colors.near).fillEllipse(x + 212, 443, 515, 191);
    near.fillStyle(0xe5cfa1, 0.7).fillRect(x + 90, 390, 9, 3);
  }
}

function drawStone(far, near, colors, width, gallery) {
  for (let x = -40; x <= width; x += 205) {
    far.fillStyle(colors.far).fillEllipse(x + 76, 226, 147, 219).fillRect(x + 2, 226, 147, 237);
    near.fillStyle(colors.near).fillRect(x, 102, 25, 378).fillRect(x - 6, 114, 37, 9);
    near.fillStyle(gallery ? 0xb2a38d : 0xdc995e, 0.6).fillRect(x + 32, 260, 7, 13);
  }
}

function drawFlowers(graphics, x, y, width) {
  const petals = [0xffbda8, 0xe8a1b7, 0xf6d28b];
  for (let i = 0; i < width - 26; i += 67) {
    const stem = x + i + 16;
    const bloom = y - 10 - ((x + i) % 3) * 2;
    graphics.fillStyle(0x586341).fillRect(stem, bloom, 2, y - bloom);
    graphics.fillRect(stem + 2, y - 6, 4, 2);
    graphics.fillStyle(petals[Math.floor((x + i) / 67) % petals.length]);
    graphics.fillRect(stem - 3, bloom, 8, 3).fillRect(stem, bloom - 3, 2, 9);
    graphics.fillStyle(0xf9e5b0).fillRect(stem, bloom + 1, 2, 2);
  }
}

function drawRescuePoint(scene, graphics, { x, feetY }) {
  const cageX = x + 72;
  scene.add.image(cageX, feetY, 'aine-idle').setOrigin(0.5, 0.985).setDisplaySize(47, 64);
  const cage = scene.add.graphics().setDepth(2);
  cage.lineStyle(3, 0x826d69).strokeRect(cageX - 25, feetY - 79, 50, 78);
  for (let dx = -16; dx <= 16; dx += 8) cage.lineBetween(cageX + dx, feetY - 78, cageX + dx, feetY - 2);
  cage.fillStyle(0xe0ac63).fillRect(cageX + 18, feetY - 39, 8, 9);
  graphics.fillStyle(0x29212a).fillEllipse(cageX, feetY + 2, 71, 6);
}

export function drawEndingLevel(scene, level) {
  const biome = level.id === 6 ? 'gallery' : level.biome;
  const colors = PALETTES[biome];
  scene.add.rectangle(0, 0, GAME.width, GAME.height, colors.sky).setOrigin(0).setScrollFactor(0);
  const far = scene.add.graphics().setScrollFactor(0.24);
  const near = scene.add.graphics().setScrollFactor(0.55);
  if (biome === 'limbo') drawLimbo(scene, far, near, colors, level.width);
  else if (biome === 'valley') drawValley(scene, far, near, colors, level.width);
  else drawStone(far, near, colors, level.width, biome === 'gallery');

  const surfaces = scene.physics.add.staticGroup();
  const details = scene.add.graphics().setDepth(1);
  for (const { x, y, width, height } of level.platforms) {
    const floor = scene.add.rectangle(x, y, width, height, colors.soil).setOrigin(0);
    surfaces.add(floor);
    floor.body.updateFromGameObject();
    details.fillStyle(colors.edge).fillRect(x, y, width, 5);
    details.fillStyle(colors.detail);
    for (let offset = 9; offset < width - 6; offset += 39) {
      details.fillRect(x + offset, y + 11, Math.min(21, width - offset), 4);
    }
    if (biome === 'valley') drawFlowers(details, x, y, width);
  }
  if (biome === 'gallery') drawRescuePoint(scene, details, level.portal);

  return { surfaces, update() {} };
}
