import { ENDING_STEPS, newEnding } from '../config/journey.js';
import { ENDING_LEVELS, RESCUE_LEVEL } from '../config/ending-levels.js';
import { difficultyKey } from '../config/difficulty.js';
const KEY = 'pacto-hiraeth:v1';
const defaults = () => ({
  ...newEnding(),
  version: 1, difficulty: 'medium', highScore: 0, levelReached: 0, currentLevel: 1, muted: false,
  openingStep: null, playgroundCheckpoint: false, prologuePage: 0, prologueComplete: false,
  level1Checkpoint: 0, level1Killed: [], level1Complete: false, level1IntroPage: 0, level1IntroRead: false,
  level2Checkpoint: 0, level2Killed: [], level2Complete: false,
  campPage: 0, campRead: false, act2Page: 0, act2Read: false,
});

export function sanitizeSave(value) {
  if (!value || typeof value !== 'object' || value.version !== 1) return defaults();
  const number = (n) => Number.isSafeInteger(n) && n >= 0 ? n : 0;
  const limboRoute = ['tunnel', 'magic'].includes(value.limboRoute) ? value.limboRoute : null;
  let endingStep = ENDING_STEPS.includes(value.endingStep) ? value.endingStep : null;
  if (!limboRoute && endingStep && !['limboIntro', 'limboChoice'].includes(endingStep)) endingStep = value.level2Complete === true ? 'limboIntro' : null;
  const endingLevels = Object.fromEntries([...Object.values(ENDING_LEVELS), RESCUE_LEVEL].flatMap((level) => {
    const prefix = `level${level.id}`;
    const killed = value[`${prefix}Killed`];
    return [
      [`${prefix}Checkpoint`, Math.min(number(value[`${prefix}Checkpoint`]), level.checkpoints.length - 1)],
      [`${prefix}Killed`, Array.isArray(killed) ? [...new Set(killed.filter((id) => Number.isSafeInteger(id) && id >= 0 && id < level.enemies.length))] : []],
      [`${prefix}Complete`, value[`${prefix}Complete`] === true],
    ];
  }));
  return {
    ...endingLevels, endingStep, limboRoute, endingPage: endingStep === value.endingStep ? number(value.endingPage) : 0,
    version: 1,
    difficulty: difficultyKey(value.difficulty),
    highScore: number(value.highScore),
    levelReached: number(value.levelReached),
    muted: value.muted === true,
    openingStep: ['prologue', 'intro'].includes(value.openingStep) ? value.openingStep : null,
    playgroundCheckpoint: value.playgroundCheckpoint === true,
    prologuePage: number(value.prologuePage),
    prologueComplete: value.prologueComplete === true,
    level1Checkpoint: Math.min(number(value.level1Checkpoint), 2),
    level1Killed: Array.isArray(value.level1Killed) ? [...new Set(value.level1Killed.filter((id) => Number.isSafeInteger(id) && id >= 0 && id < 6))] : [],
    level1Complete: value.level1Complete === true,
    level1IntroPage: number(value.level1IntroPage),
    level1IntroRead: value.level1IntroRead === true,
    currentLevel: [2, 3, 4, 5, 6].includes(value.currentLevel) ? value.currentLevel : 1,
    level2Checkpoint: Math.min(number(value.level2Checkpoint), 2),
    level2Killed: Array.isArray(value.level2Killed) ? [...new Set(value.level2Killed.filter((id) => Number.isSafeInteger(id) && id >= 0 && id < 4))] : [],
    level2Complete: value.level2Complete === true,
    campPage: number(value.campPage), campRead: value.campRead === true,
    act2Page: number(value.act2Page), act2Read: value.act2Read === true,
  };
}

export class StorageManager {
  constructor(storage) {
    this.storage = storage;
    this.available = Boolean(storage);
    try {
      this.data = sanitizeSave(JSON.parse(storage?.getItem(KEY) ?? 'null'));
    } catch {
      // Una partida corrupta o el almacenamiento bloqueado no impiden jugar.
      this.data = defaults();
      this.available = false;
    }
  }

  update(patch) {
    this.data = sanitizeSave({ ...this.data, ...patch, version: 1 });
    try {
      if (!this.storage) throw new Error('Storage unavailable');
      this.storage.setItem(KEY, JSON.stringify(this.data));
      this.available = true;
    } catch {
      this.available = false;
    }
    return this.data;
  }
}
