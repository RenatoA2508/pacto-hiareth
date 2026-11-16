import { WALK_DIALOGUE } from '../data/playable-story.js';

export class WalkDialogue {
  constructor(scene, id, startX) {
    this.scene = scene;
    this.pending = (WALK_DIALOGUE[id] ?? []).filter((line) => line.x >= startX - 55);
    this.node = document.createElement('aside');
    this.node.className = 'walk-dialogue';
    this.node.hidden = true;
    this.node.setAttribute('aria-live', 'polite');
    this.speaker = document.createElement('strong');
    this.text = document.createElement('span');
    this.node.append(this.speaker, this.text);
    document.querySelector('#game').parentElement.append(this.node);
    scene.events.once('shutdown', () => this.node.remove());
  }

  update(x, now) {
    if (now >= (this.until ?? 0)) this.node.hidden = true;
    if (!this.node.hidden || this.pending[0]?.x > x || !this.pending.length) return;
    this.show(this.pending.shift(), now);
  }

  show(line, now) {
    this.speaker.textContent = line.speaker;
    this.text.textContent = line.text;
    this.node.hidden = false;
    this.until = now + Math.max(3400, line.text.length * 49);
  }
}
