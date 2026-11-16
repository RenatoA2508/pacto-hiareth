export class AineCompanion {
  constructor(scene, x, feetY) {
    this.image = scene.add.image(x - 55, feetY, 'aine-idle')
      .setOrigin(0.5, 0.985).setDisplaySize(52, 70).setDepth(1);
    this.shadow = scene.add.ellipse(x - 55, feetY, 24, 5, 0x182624, 0.35).setDepth(1);
    this.trail = [];
    this.lastTime = null;
  }

  follow(player, now, levelWidth) {
    const grounded = player.body.blocked.down;
    const moving = Math.abs(player.body.velocity.x) > 20;
    this.trail.push({ x: player.x, y: player.y, flip: player.flipX, moving, grounded, time: now });
    while (this.trail.length > 1 && this.trail[1].time <= now - 260) this.trail.shift();
    const step = this.trail[0];
    if (now - step.time < 260) return;
    const elapsed = Math.min(50, now - (this.lastTime ?? now - 16));
    this.lastTime = now;
    const playerDistance = this.image.x - player.x;
    const stationary = !moving && grounded && (Math.abs(playerDistance) > 34 && Math.abs(playerDistance) < 70);
    const targetX = stationary ? this.image.x : Math.max(25, Math.min(levelWidth - 25,
      step.x + (!step.moving && step.grounded ? (step.flip ? 44 : -44) : 0)));
    const x = this.image.x + (targetX - this.image.x) * (1 - Math.exp(-elapsed / 54));
    const stride = step.moving && step.grounded ? Math.sin(now / 61) : 0;
    const breath = step.moving ? 0 : Math.sin(now / 235);
    const lift = Math.abs(stride) * 4;
    this.image.setPosition(Math.round(x), Math.round(step.y - lift)).setFlipX(step.flip)
      .setAngle(step.grounded ? stride * 4 : step.flip ? -8 : 8)
      .setDisplaySize(52 + Math.abs(stride), 70 - Math.abs(stride) * 3 + breath * 1.2);
    this.shadow.setPosition(x, step.y).setVisible(step.grounded);
  }
}
