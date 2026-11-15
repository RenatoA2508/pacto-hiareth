const KEY = 'pacto-hiraeth:v1';
const defaults = () => ({ version: 1, highScore: 0, levelReached: 0, muted: false, playgroundCheckpoint: false, prologuePage: 0, prologueComplete: false, level1Checkpoint: 0, level1Killed: [], level1Complete: false, level1IntroPage: 0, level1IntroRead: false });

export function sanitizeSave(value) {
  if (!value || typeof value !== 'object' || value.version !== 1) return defaults();
  const number = (n) => Number.isSafeInteger(n) && n >= 0 ? n : 0;
  return {
    version: 1,
    highScore: number(value.highScore),
    levelReached: number(value.levelReached),
    muted: value.muted === true,
    playgroundCheckpoint: value.playgroundCheckpoint === true,
    prologuePage: number(value.prologuePage),
    prologueComplete: value.prologueComplete === true,
    level1Checkpoint: Math.min(number(value.level1Checkpoint), 2),
    level1Killed: Array.isArray(value.level1Killed) ? [...new Set(value.level1Killed.filter((id) => Number.isSafeInteger(id) && id >= 0 && id < 6))] : [],
    level1Complete: value.level1Complete === true,
    level1IntroPage: number(value.level1IntroPage),
    level1IntroRead: value.level1IntroRead === true,
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
