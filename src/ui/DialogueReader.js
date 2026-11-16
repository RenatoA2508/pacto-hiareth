export class DialogueReader {
  constructor({ ui, storage, story, onClose, onFinish = onClose, audio, progressKey = 'prologuePage', completeKey = 'prologueComplete', skipLabel = null, visual = false }) {
    this.ui = ui;
    this.visual = visual;
    this.storage = storage;
    this.story = story;
    this.onClose = onClose;
    this.audio = audio;
    this.progressKey = progressKey;
    this.index = Math.min(storage.data[progressKey] ?? 0, story.paragraphs.length - 1);
    this.abort = new AbortController();
    this.root = document.createElement('section');
    this.root.className = visual ? 'story-reader story-visual' : 'story-reader';
    this.root.setAttribute('aria-labelledby', 'story-heading');
    this.root.innerHTML = '<header><div><span class="eyebrow">EL PACTO DE HIARETH</span><h1 id="story-heading"></h1></div><div class="story-actions"><button type="button" data-story="close">Volver al menú</button></div></header><div class="story-body" tabindex="0" aria-label="Texto de la historia"><p class="story-speaker"></p><p class="story-text"></p></div><footer><button type="button" data-story="previous">← Anterior</button><span class="story-progress" aria-live="polite"></span><button type="button" data-story="next">Siguiente →</button></footer>';
    const finish = () => {
      if (this.finished) return;
      this.finished = true;
      if (completeKey) storage.update({ [completeKey]: true });
      onFinish();
    };
    if (skipLabel) {
      const skip = document.createElement('button'); skip.type = 'button'; skip.textContent = skipLabel;
      skip.addEventListener('click', finish); this.root.querySelector('.story-actions').append(skip);
    }
    this.root.querySelector('h1').textContent = story.title;
    this.body = this.root.querySelector('.story-body');
    this.text = this.root.querySelector('.story-text');
    this.speaker = this.root.querySelector('.story-speaker');
    this.previous = this.root.querySelector('[data-story="previous"]');
    this.next = this.root.querySelector('[data-story="next"]');
    this.root.querySelector('[data-story="close"]').addEventListener('click', onClose);
    this.previous.addEventListener('click', () => this.show(this.index - 1));
    this.next.addEventListener('click', () => {
      if (this.index === story.paragraphs.length - 1) {
        finish();
      } else this.show(this.index + 1);
    });
    window.addEventListener('keydown', (event) => {
      if (event.repeat) return;
      if (event.code === 'Escape') { event.preventDefault(); onClose(); }
      if (event.code === 'ArrowLeft') { event.preventDefault(); this.previous.click(); }
      if (event.code === 'ArrowRight') { event.preventDefault(); this.next.click(); }
    }, { signal: this.abort.signal });
    ui.panels.replaceChildren(this.root);
    this.show(this.index, false);
    this.body.focus({ preventScroll: true });
  }

  show(index, sound = true) {
    this.index = Math.max(0, Math.min(index, this.story.paragraphs.length - 1));
    const paragraph = this.story.paragraphs[this.index].text;
    // Se conserva el párrafo completo; el rótulo identifica la voz sin reescribirlo.
    const colon = paragraph.indexOf(':');
    const prefix = paragraph.slice(0, colon);
    const hasSpeaker = /^(Aidan|Aine|Viajero|Dragón|Elfa|Mujer|Líder del pacto(?: de Hiareth)?)$/i.test(prefix);
    this.speaker.textContent = hasSpeaker ? prefix : 'Narración';
    this.text.textContent = this.visual && hasSpeaker ? paragraph.slice(colon + 1).trimStart() : paragraph;
    this.previous.disabled = this.index === 0;
    this.next.textContent = this.index === this.story.paragraphs.length - 1 ? 'Continuar' : 'Siguiente →';
    this.root.querySelector('.story-progress').textContent = `${this.index + 1} / ${this.story.paragraphs.length}`;
    this.body.scrollTop = 0;
    this.storage.update({ [this.progressKey]: this.index });
    if (sound) this.audio?.play('click');
  }

  destroy() { this.abort.abort(); this.root.remove(); }
}
