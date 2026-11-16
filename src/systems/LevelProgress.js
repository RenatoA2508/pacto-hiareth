import { JOURNEY_LEVELS } from '../config/journey.js';

// El recorrido recompensa checkpoints y portales, sin premiar las bajas.
export function journeyScore(data) {
  return JOURNEY_LEVELS.reduce((total, id) => total + (data[`level${id}Checkpoint`] || 0) * 100 + (data[`level${id}Complete`] ? 500 : 0), 0);
}
export class LevelProgress {
  constructor(storage, { checkpointCount, enemyCount, id = 1 }) {
    this.storage = storage;
    this.checkpointCount = checkpointCount;
    this.enemyCount = enemyCount;
    this.id = id; this.prefix = `level${id}`;
    this.checkpoint = Math.min(storage.data[`${this.prefix}Checkpoint`] ?? 0, checkpointCount - 1);
    this.killed = new Set((storage.data[`${this.prefix}Killed`] ?? []).filter((enemyId) => enemyId < enemyCount));
  }
  defeat(id) {
    if (!Number.isInteger(id) || id < 0 || id >= this.enemyCount || this.killed.has(id)) return false;
    this.killed.add(id); this.save(); return true;
  }
  reachCheckpoint(index) {
    if (!Number.isInteger(index) || index <= this.checkpoint || index >= this.checkpointCount) return false;
    this.checkpoint = index; this.save(); this.updateHighScore(); return true;
  }
  save() {
    this.storage.update({ [`${this.prefix}Checkpoint`]: this.checkpoint, [`${this.prefix}Killed`]: [...this.killed].sort((a, b) => a - b), levelReached: Math.max(this.id, this.storage.data.levelReached), currentLevel: this.id });
  }
  complete(next = {}) {
    this.save();
    this.storage.update({ [`${this.prefix}Complete`]: true, ...next });
    this.updateHighScore();
  }
  updateHighScore() {
    const score = journeyScore(this.storage.data);
    if (score > this.storage.data.highScore) this.storage.update({ highScore: score });
  }
  reset() { this.checkpoint = 0; this.killed.clear(); this.storage.update({ [`${this.prefix}Checkpoint`]: 0, [`${this.prefix}Killed`]: [], [`${this.prefix}Complete`]: false }); }
}
