import { BaseEnemy } from './BaseEnemy.js';
import { TRAINING_ENEMY } from '../config/combat.js';

const DOG = { key: 'limbo-hound', name: 'Sabueso óseo', attackRange: 45, detectionX: 255 };
const BANDIT = { key: 'valley-bandit', name: 'Bandido', attackRange: 50, detectionX: 250 };
const GUARD = { key: 'castle-guard', name: 'Guardián', attackRange: 55, detectionX: 275 };
const TYPES = { 3: DOG, 4: BANDIT, 5: GUARD, 6: BANDIT };
const STATES = {
  idle: { count: 2, fps: 4, repeat: -1 },
  walk: { count: 4, fps: 8, repeat: -1 },
  attack: { count: 6, fps: 8, repeat: 0 },
  hurt: { count: 2, fps: 8, repeat: 0 },
  death: { count: 4, fps: 8, repeat: 0 },
};

function rectangle(ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function paintHound(ctx, stance, stride) {
  const shape = (color, x, y, w, h) => rectangle(ctx, color, x, y, w, h);
  const dark = '#2e2833';
  const bone = '#d6d0b3';
  const shade = '#9b958a';
  const jowl = stance === 'attack' ? 3 : 0;
  shape(dark, 3, 19, 30, 11);
  shape(shade, 4, 20, 8, 4);
  shape(bone, 10, 20, 21, 4);
  for (let x = 13; x < 29; x += 5) shape(bone, x, 22, 3, 7);
  shape(dark, 27, 17, 16, 13);
  shape(bone, 28, 18, 13, 9);
  shape(bone, 29, 14, 4, 7);
  shape(dark, 36, 20, 4, 4);
  shape('#ac5b8d', 37, 21, 2, 2);
  shape(shade, 32, 26 + jowl, 10, 3);
  for (const [x, step] of [[13, stride], [28, -stride]]) {
    shape(shade, x, 28, 3, 8);
    shape(bone, x + step, 34, 3, 6);
    shape(bone, x + step, 39, 6, 2);
  }
}

function paintHumanoid(ctx, type, stance, stride) {
  const shape = (color, x, y, w, h) => rectangle(ctx, color, x, y, w, h);
  const dark = '#292332';
  const coat = type === GUARD ? '#655f82' : '#96584a';
  const face = type === GUARD ? '#ada5aa' : '#d39772';
  shape(dark, 15, 7, 16, 15);
  shape(coat, 17, 8, 11, 6);
  shape(face, 21, 14, 9, 5);
  shape(dark, 26, 15, 3, 2);
  shape(dark, 11, 20, 23, 13);
  shape(coat, 14, 19, 17, 12);
  shape('#c7a57f', 13, 28, 19, 2);
  for (const [x, step] of [[16, stride], [25, -stride]]) {
    shape(dark, x, 31, 6, 6);
    shape(dark, x + step, 36, 6, 5);
    shape(coat, x + step, 39, 7, 2);
  }
  if (stance === 'attack') {
    shape(face, 28, 22, 7, 4);
    shape('#dfd1a7', 34, 22, 11, 3);
  } else {
    shape(face, 30, 23, 4, 7);
    shape('#dfd1a7', 34, 27, 3, 9);
  }
}

function enemyAnimations(scene, type) {
  const names = {};
  for (const [state, { count, fps, repeat }] of Object.entries(STATES)) {
    const animation = `${type.key}-${state}`;
    names[state] = animation;
    if (scene.anims.exists(animation)) continue;
    const frames = [];
    for (let frame = 0; frame < count; frame++) {
      const key = `${animation}-${frame}`;
      let texture = scene.textures.get(key);
      if (!scene.textures.exists(key)) {
        texture = scene.textures.createCanvas(key, 48, 44);
        const ctx = texture.getContext();
        const stride = state === 'walk' ? [0, 3, 0, -3][frame] : 0;
        const stance = state === 'attack' && frame >= 4 ? 'attack' : 'idle';
        ctx.save();
        if (state === 'death') {
          ctx.globalAlpha = 1 - frame / count;
          ctx.translate(0, frame * 3);
        } else if (state === 'idle') ctx.translate(0, frame % 2);
        else if (state === 'hurt') ctx.translate(-frame * 2, 0);
        else if (stance === 'attack') ctx.translate(frame - 3, 0);
        if (type === DOG) paintHound(ctx, stance, stride);
        else paintHumanoid(ctx, type, stance, stride);
        ctx.restore();
        texture.refresh();
      }
      frames.push({ key });
    }
    scene.anims.create({ key: animation, frames, frameRate: fps, repeat });
  }
  return names;
}

export class EndingEnemy extends BaseEnemy {
  constructor(scene, x, y, levelId, difficulty, platforms) {
    const type = TYPES[levelId];
    const animations = enemyAnimations(scene, type);
    super(scene, x, y, {
      texture: `${animations.idle}-0`,
      config: {
        ...TRAINING_ENEMY, speed: difficulty.speed, detectionX: type.detectionX,
        patrolRadius: type === DOG ? 95 : 0, attackRange: type.attackRange, attack: { windupMs: 500, activeMs: 180, recoveryMs: 200, cooldownMs: difficulty.cooldownMs },
      },
      platforms, name: type.name, animations,
      art: type === DOG
        ? { originY: 41 / 44, scale: 1.35, body: { width: 29, height: 24, offsetX: 10, offsetY: 17 } }
        : { originY: 41 / 44, scale: 1.35, body: { width: 20, height: 33, offsetX: 14, offsetY: 8 } },
    });
    this.play(animations.idle);
  }

  updateAI(now, player) {
    super.updateAI(now, player);
    if (!this.vitals.alive) return;
    const attackPhase = this.brain.attack.phase(now);
    if (attackPhase === 'windup') this.setTint(0xf4b674);
    if (attackPhase === 'active') this.setTint(0xff876b);
  }
}
