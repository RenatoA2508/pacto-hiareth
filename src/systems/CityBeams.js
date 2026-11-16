export const BEAM_COLUMNS = [875, 1265, 2900, 3840];

export function beamPhase(now, offset = 0) {
  const cycle = ((now + offset) % 3300 + 3300) % 3300;
  if (cycle < 1900) return 'idle';
  if (cycle < 2750) return 'warning';
  return 'active';
}

export class CityBeams {
  constructor(scene) {
    this.ink = scene.add.graphics().setDepth(1);
    this.started = scene.time.now;
  }

  update(now, player, damage) {
    this.ink.clear();
    for (const [index, x] of BEAM_COLUMNS.entries()) {
      const phase = beamPhase(now - this.started, index * 620);
      this.ink.fillStyle(0xe59674, 0.65).fillRect(x - 19, 464, 38, 6);
      if (phase === 'warning') this.ink.lineStyle(2, 0xffb468, 0.8).strokeRect(x - 19, 0, 38, 470);
      if (phase !== 'active') continue;
      this.ink.fillStyle(0xff523f, 0.65).fillRect(x - 19, 0, 38, 470);
      this.ink.fillStyle(0xffc986, 0.75).fillRect(x - 4, 0, 8, 470);
      if (player.body.right > x - 17 && player.body.left < x + 17 && player.body.top < 470) damage(1);
    }
  }
}
