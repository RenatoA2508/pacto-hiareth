import { DIFFICULTIES } from '../config/difficulty.js';
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
  levelStats(health, maxHealth, defeated, checkpoint) {
    document.querySelector('#hud-title').textContent = 'ACTO 1 · TIERRA, MAR Y CIELO';
    document.querySelector('#checkpoint-label').textContent = checkpoint ? `Checkpoint ${checkpoint}/2 · alcanza el portal` : 'Alcanza el portal';
    document.querySelector('#combat-health').textContent = `Vida ${health}/${maxHealth} · Slimes derrotados: ${defeated}`;
    document.querySelector('#mode-label').textContent = 'ATACA O ESQUIVA · J PARA ATACAR';
  }
  cityStats(health, maxHealth, checkpoint) {
    document.querySelector('#hud-title').textContent = 'ACTO 2 · VUELA ALTO';
    document.querySelector('#checkpoint-label').textContent = checkpoint ? `Checkpoint ${checkpoint}/2 · alcanza el portal` : 'Alcanza el portal';
    document.querySelector('#combat-health').textContent = `Vida ${health}/${maxHealth}`;
    document.querySelector('#mode-label').textContent = 'ESQUIVA LOS HACES · J PARA ATACAR';
  }
  journeyStats(level, vitals, progress, objective) {
    const act = level.id === 5 ? 'ACTO FINAL' : `ACTO ${level.id === 6 ? 4 : level.id}`;
    document.querySelector('#hud-title').textContent = `${act} · ${level.title}`;
    document.querySelector('#checkpoint-label').textContent = progress.checkpoint
      ? `Checkpoint ${progress.checkpoint}/${level.checkpoints.length - 1} · ${objective}` : objective;
    const required = level.requiredEnemies ?? [];
    const remaining = required.filter((id) => !progress.killed.has(id)).length;
    const foes = required.length ? ` · ${level.id === 6 ? 'Captores' : 'Guardianes'} ${required.length - remaining}/${required.length}` : '';
    document.querySelector('#combat-health').textContent = `Vida ${vitals.current}/${vitals.max}${foes}`;
    document.querySelector('#mode-label').textContent = 'J · ATAQUE EN SUELO';
  }
  gameplay(active) {
    this.hud.hidden = !active;
    this.touchControls.hidden = !active;
    if (!active) this.clearInput();
  }
  hidePanel() { this.panels.replaceChildren(); }

  panel({ eyebrow, title, description, note, modal = false, actions, difficultySelector = false }) {
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
    panel.append(top, heading, copy);
    if (difficultySelector) {
      const label = document.createElement('label'); label.className = 'difficulty-selector';
      const text = document.createElement('span'); text.textContent = 'Dificultad del viaje';
      const select = document.createElement('select'); select.setAttribute('aria-label', 'Dificultad del viaje');
      for (const [key, value] of Object.entries(DIFFICULTIES)) {
        const option = document.createElement('option'); option.value = key; option.textContent = value.label; select.append(option);
      }
      select.value = this.storage.data.difficulty;
      const hint = document.createElement('small'); hint.id = 'difficulty-hint'; select.setAttribute('aria-describedby', hint.id);
      const describe = () => { hint.textContent = DIFFICULTIES[select.value].description + '. Se aplica al entrar en cualquier acto.'; };
      select.addEventListener('change', () => { this.storage.update({ difficulty: select.value }); describe(); this.announce(hint.textContent); });
      describe(); label.append(text, select, hint); panel.append(label);
    }
    panel.append(buttons, small);
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
