import { PLAYER_ART } from '../config/game.js';

function aidan(scene, x, y, animation = 'idle') {
  return scene.add.sprite(x, y, `aidan-${animation}`).setOrigin(0.5, 167 / PLAYER_ART.frameHeight)
    .setScale(2).play(`aidan-${animation}`);
}

function aine(scene, x, y) {
  return scene.add.image(x, y, 'aine-idle').setOrigin(0.5, 0.985).setDisplaySize(105, 157);
}

export function drawVignette(scene, chapter) {
  const limbo = chapter.startsWith('limbo');
  const valley = chapter.startsWith('valley');
  if (!limbo && !valley) return false;
  scene.cameras.main.setBackgroundColor(limbo ? '#1b192b' : '#846c72');
  const g = scene.add.graphics();
  if (limbo) {
    g.fillStyle(0x302541).fillCircle(740, 130, 85);
    g.fillStyle(0x252038).fillRect(0, 385, 960, 155);
    for (let x = 0; x < 960; x += 165) {
      g.fillStyle(0x352945).fillTriangle(x, 390, x + 30, 125 + x % 83, x + 75, 390);
    }
  } else {
    g.fillStyle(0xffdb9c).fillCircle(760, 130, 75);
    g.fillStyle(0x746d78).fillTriangle(0, 393, 230, 99, 515, 393).fillTriangle(310, 393, 660, 100, 960, 393);
    g.fillStyle(0x495c50).fillRect(0, 385, 960, 155);
  }

  if (chapter === 'limboTunnel') {
    g.fillStyle(0x48364c).fillRect(0, 352, 420, 188).fillRect(565, 350, 395, 190);
    g.fillStyle(0x766074).fillRect(0, 352, 420, 12).fillRect(565, 350, 395, 12);
    g.fillStyle(0x110e1e).fillRect(420, 352, 145, 188);
    aidan(scene, 698, 350).setFlipX(true);
    const companion = aine(scene, 558, 380).setAngle(-9);
    const hand = scene.add.graphics({ x: 437, y: 430 });
    hand.fillStyle(0x978982).fillRect(0, 23, 78, 19);
    hand.fillStyle(0xe4d9b5).fillRect(7, 24, 65, 8).fillRect(69, 13, 23, 28);
    for (let i = 0; i < 4; i++) hand.fillRect(83, 11 + i * 7, 20 + i * 2, 5);
    scene.tweens.add({
      targets: hand, x: 456, y: 338, duration: 600, delay: 150, hold: 280, yoyo: true,
      onYoyo: () => scene.tweens.add({ targets: companion, x: 606, y: 350, angle: 0, duration: 320 }),
    });
  } else if (chapter === 'limboMagic' || chapter === 'limboIntro') {
    aidan(scene, 420, 390, chapter === 'limboMagic' ? 'attack' : 'idle');
    aine(scene, 345, 390);
    for (const x of [570, 656, 750]) {
      const skeleton = scene.add.graphics({ x, y: 365 });
      skeleton.fillStyle(0xd3c5ac).fillRect(0, -64, 28, 24).fillRect(11, -42, 6, 53)
        .fillRect(2, -34, 24, 5).fillRect(2, -24, 24, 5).fillRect(5, 3, 7, 22).fillRect(18, 3, 7, 22);
      skeleton.fillStyle(0x21172e).fillRect(4, -56, 6, 6).fillRect(18, -56, 6, 6);
      if (chapter === 'limboMagic') scene.tweens.add({ targets: skeleton, x: x + 96, alpha: 0.3, delay: 380, duration: 430 });
    }
    if (chapter === 'limboMagic') {
      const flame = scene.add.ellipse(495, 365, 76, 38, 0xff8844, 0.78);
      scene.tweens.add({ targets: flame, x: 825, scaleX: 3, alpha: 0, delay: 250, duration: 620 });
    }
  } else if (chapter === 'valleyIntro') {
    g.fillStyle(0x241e30).fillTriangle(536, 382, 698, 382, 621, 520);
    for (let x = 470; x < 740; x += 21) g.fillStyle(x % 3 ? 0xf6d5ac : 0xb47ba3).fillRect(x, 373 - x % 11, 7, 6);
    aidan(scene, 400, 385);
    const companion = aine(scene, 578, 385);
    scene.tweens.add({ targets: companion, x: 620, y: 480, angle: 23, alpha: 0, delay: 800, duration: 460 });
  } else if (chapter === 'valleyLoss' || chapter === 'valleyCaptive') {
    g.fillStyle(0x312631).fillRect(0, 0, 960, 386).fillStyle(0x59424e).fillRect(0, 385, 960, 155);
    aidan(scene, 440, 385);
    const companion = aine(scene, 625, 385);
    if (chapter === 'valleyLoss') companion.setAngle(-65).setTint(0xad9eb3);
    else {
      const bars = scene.add.graphics();
      bars.fillStyle(0xaca0a4);
      for (let x = 558; x <= 700; x += 20) bars.fillRect(x, 220, 5, 165);
      bars.fillRect(555, 220, 150, 6).fillRect(555, 378, 150, 6);
    }
  } else return false;
  return true;
}
