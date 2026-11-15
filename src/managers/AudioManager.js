import { SOUND_EFFECTS } from '../config/audio.js';

export class AudioManager {
  constructor(game) {
    this.game = game;
    this.volumes = new Map(SOUND_EFFECTS.map(({ key, volume }) => [key, volume]));
    this.pending = null;
    this.onUnlocked = () => {
      const key = this.pending;
      this.pending = null;
      if (key) this.play(key);
    };
    game.sound.on('unlocked', this.onUnlocked);
  }

  play(key) {
    const sound = this.game.sound;
    if (sound.mute || !this.game.cache.audio.exists(key)) return;
    if (sound.locked) {
      this.pending = key;
      // El método se invoca desde gestos del usuario; respeta la política de autoplay.
      sound.unlock?.();
      return;
    }
    sound.play(key, { volume: this.volumes.get(key) ?? 0.3 });
  }

  destroy() {
    this.pending = null;
    this.game.sound.off('unlocked', this.onUnlocked);
  }
}
