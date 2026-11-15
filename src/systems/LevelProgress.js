// Contador de decisiones separado del puntaje. Las bajas nunca conceden puntos.
export class LevelProgress {
  constructor(storage, { checkpointCount, enemyCount }) {
    this.storage = storage;
    this.checkpointCount = checkpointCount;
    this.enemyCount = enemyCount;
    this.checkpoint = Math.min(storage.data.level1Checkpoint, checkpointCount - 1);
    this.killed = new Set(storage.data.level1Killed.filter((id) => id < enemyCount));
  }
  defeat(id) {
    if (!Number.isInteger(id) || id < 0 || id >= this.enemyCount || this.killed.has(id)) return false;
    this.killed.add(id); this.save(); return true;
  }
  reachCheckpoint(index) {
    if (!Number.isInteger(index) || index <= this.checkpoint || index >= this.checkpointCount) return false;
    this.checkpoint = index; this.save(); return true;
  }
  save() { this.storage.update({ level1Checkpoint: this.checkpoint, level1Killed: [...this.killed].sort((a, b) => a - b), levelReached: Math.max(1, this.storage.data.levelReached) }); }
  complete() { this.save(); this.storage.update({ level1Complete: true }); }
  reset() { this.checkpoint = 0; this.killed.clear(); this.storage.update({ level1Checkpoint: 0, level1Killed: [], level1Complete: false }); }
}
