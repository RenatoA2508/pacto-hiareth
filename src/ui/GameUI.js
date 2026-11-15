export class GameUI extends EventTarget {
  constructor(storage) {
    super();
    this.storage = storage;
    this.held = new Set();
    this.pointers = new Map();
    this.jumpPending = false;
    this.attackPending = false;
    this.abort = new AbortController();
    this.panels = document.querySelector('#panels');
    this.hud = document.querySelector('#hud');
    this.touchControls = document.querySelector('#touch-controls');
    this.mute = document.querySelector('#mute');
    const options = { signal: this.abort.signal };
    document.querySelector('#pause').addEventListener('click', () => this.emit('pause'), options);
    this.mute.addEventListener('click', () => this.emit('mute'), options);
    for (const button of this.touchControls.querySelectorAll('button')) {
      const control = button.dataset.control;
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        button.setPointerCapture(event.pointerId);
        this.pointers.set(event.pointerId, control);
        this.press(control);
        button.classList.add('held');
      }, options);
      const release = (event) => {
        this.pointers.delete(event.pointerId);
        if (![...this.pointers.values()].includes(control)) this.held.delete(control);
        button.classList.remove('held');
      };
      button.addEventListener('pointerup', release, options);
      button.addEventListener('pointercancel', release, options);
      button.addEventListener('lostpointercapture', release, options);
      button.addEventListener('keydown', (event) => {
        if (['Enter', ' '].includes(event.key)) { event.preventDefault(); this.press(control); }
      }, options);
      button.addEventListener('keyup', (event) => {
        if (['Enter', ' '].includes(event.key)) { event.preventDefault(); this.held.delete(control); }
      }, options);
      button.addEventListener('blur', () => this.held.delete(control), options);
    }
    window.addEventListener('blur', () => this.clearInput(), options);
    this.updateMute();
  }

  emit(name) { this.dispatchEvent(new Event(name)); }
  on(name, callback) {
    this.addEventListener(name, callback);
    return () => this.removeEventListener(name, callback);
  }
  press(control) {
    if (control === 'jump' && !this.held.has(control)) this.jumpPending = true;
    if (control === 'attack' && !this.held.has(control)) this.attackPending = true;
    this.held.add(control);
  }
  consumeJump() { const pending = this.jumpPending; this.jumpPending = false; return pending; }
  consumeAttack() { const pending = this.attackPending; this.attackPending = false; return pending; }
  clearInput() {
    this.held.clear(); this.pointers.clear(); this.jumpPending = false; this.attackPending = false;
    this.touchControls.querySelectorAll('button').forEach((button) => button.classList.remove('held'));
  }
  announce(text) { document.querySelector('#announcement').textContent = text; }
  focusGame() { document.querySelector('#game').focus({ preventScroll: true }); }
  updateMute() {
    const muted = this.storage.data.muted;
    this.mute.textContent = muted ? 'Silencio: sí' : 'Silencio: no';
    this.mute.setAttribute('aria-pressed', String(muted));
  }
  checkpoint(active) {
    document.querySelector('#checkpoint-label').textContent = active ? 'Checkpoint guardado' : 'Punto de partida';
  }
  mode(combat) {
    document.querySelector('#attack-button').hidden = !combat;
    document.querySelector('#combat-health').hidden = !combat;
    document.querySelector('#combat-help').hidden = !combat;
    document.querySelector('#game').setAttribute('aria-label', `Escena de plataformas. A y D o flechas para caminar; Espacio para saltar; ${combat ? 'J para atacar en suelo; ' : ''}Escape para pausar.`);
    document.querySelector('#hud-title').textContent = combat ? 'ENTRENAMIENTO DE COMBATE' : 'PRUEBA DE MOVIMIENTO';
    document.querySelector('#mode-label').textContent = combat ? 'J · ATAQUE EN SUELO' : 'PRUEBA TÉCNICA / SIN COMBATE';
  }
  combatStats(health, defeated, total, maxHealth) {
    document.querySelector('#combat-health').textContent = `Vida ${health}/${maxHealth} · Objetivos ${defeated}/${total}`;
    document.querySelector('#checkpoint-label').textContent = 'Acércate y ataca con J';
  }
  gameplay(active) {
    this.hud.hidden = !active;
    this.touchControls.hidden = !active;
    if (!active) this.clearInput();
  }
  hidePanel() { this.panels.replaceChildren(); }

  panel({ eyebrow, title, description, note, modal = false, actions }) {
    this.clearInput();
    const panel = document.createElement('section');
    panel.className = `panel${modal ? ' modal' : ''}`;
    panel.setAttribute('aria-labelledby', 'panel-title');
    if (modal) { panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); }
    const top = document.createElement('p'); top.className = 'eyebrow'; top.textContent = eyebrow;
    const heading = document.createElement('h1'); heading.id = 'panel-title';
    // El único HTML de títulos es estático y propiedad del código del juego.
    heading.innerHTML = title;
    const copy = document.createElement('p'); copy.className = 'description'; copy.textContent = description;
    const buttons = document.createElement('div'); buttons.className = 'panel-actions';
    actions.forEach(({ label, run, secondary = false }) => {
      const button = document.createElement('button'); button.type = 'button';
      if (secondary) button.className = 'secondary';
      const text = document.createElement('span'); text.textContent = label;
      const arrow = document.createElement('span'); arrow.textContent = '→'; arrow.setAttribute('aria-hidden', 'true');
      button.append(text, arrow);
      button.addEventListener('click', () => { this.emit('ui-confirm'); run(); });
      buttons.append(button);
    });
    const small = document.createElement('p'); small.className = 'small-note'; small.textContent = note ?? '';
    panel.append(top, heading, copy, buttons, small);
    // Tab queda dentro del diálogo; Escape lo gestiona la escena correspondiente.
    if (modal) panel.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = [...buttons.querySelectorAll('button')];
      const index = focusable.indexOf(document.activeElement);
      event.preventDefault();
      focusable[(index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length].focus();
    });
    this.panels.replaceChildren(panel);
    buttons.firstElementChild?.focus({ preventScroll: true });
    this.announce(`${eyebrow}. ${heading.innerText.replace(/\s+/g, ' ')}. ${description}`);
  }

  destroy() { this.abort.abort(); this.clearInput(); this.hidePanel(); }
}
