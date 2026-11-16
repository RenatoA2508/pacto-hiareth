import { difficultyKey } from '../config/difficulty.js';

const BALANCE = Object.freeze({
  easy: { aidan: 20, dragon: 16, claw: 2, breath: 5 },
  medium: { aidan: 19, dragon: 20, claw: 2, breath: 6 },
  hard: { aidan: 18, dragon: 23, claw: 3, breath: 7 },
});

const PATTERN = ['claw', 'breath', 'rest'];

export const DRAGON_ACTIONS = Object.freeze({
  attack: { label: 'Llama', damage: 3 },
  guard: { label: 'Defender' },
  charge: { label: 'Canalizar', damage: 7 },
});

export class DragonBattle {
  constructor(difficulty) {
    this.balance = BALANCE[difficultyKey(difficulty)];
    this.aidan = this.balance.aidan;
    this.dragon = this.balance.dragon;
    this.turn = 0;
    this.charged = false;
    this.result = 'active';
  }

  get intent() { return PATTERN[this.turn % PATTERN.length]; }

  play(action) {
    if (this.result !== 'active' || !Object.hasOwn(DRAGON_ACTIONS, action)) return null;
    if (action === 'charge' && this.charged) return null;

    const intent = this.intent;
    const damage = action === 'attack'
      ? (this.charged ? DRAGON_ACTIONS.charge.damage : DRAGON_ACTIONS.attack.damage)
      : 0;

    if (action === 'attack') this.charged = false;
    if (action === 'charge') this.charged = true;
    this.dragon = Math.max(0, this.dragon - damage);
    if (!this.dragon) {
      this.result = 'victory';
      return { intent, damage, received: 0 };
    }

    const incoming = this.balance[intent] ?? 0;
    const received = action === 'guard' && incoming ? 1 : incoming;
    this.aidan = Math.max(0, this.aidan - received);
    if (!this.aidan) this.result = 'defeat';
    this.turn++;
    return { intent, damage, received };
  }
}
