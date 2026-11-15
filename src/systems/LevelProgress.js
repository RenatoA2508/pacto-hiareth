// Contador de decisiones separado del puntaje. Las bajas nunca conceden puntos.
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
    this.checkpoint = index; this.save(); return true;
  }
  save() {
    this.storage.update({ [`${this.prefix}Checkpoint`]: this.checkpoint, [`${this.prefix}Killed`]: [...this.killed].sort((a, b) => a - b), levelReached: Math.max(this.id, this.storage.data.levelReached), currentLevel: this.id });
  }
  complete() { this.save(); this.storage.update({ [`${this.prefix}Complete`]: true }); }
  reset() { this.checkpoint = 0; this.killed.clear(); this.storage.update({ [`${this.prefix}Checkpoint`]: 0, [`${this.prefix}Killed`]: [], [`${this.prefix}Complete`]: false }); }
}
