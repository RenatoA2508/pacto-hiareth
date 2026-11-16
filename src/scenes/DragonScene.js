import { ENDING_STORY } from '../data/ending-story.js';
import Phaser from 'phaser';
import { PLAYER_ART } from '../config/game.js';
import { DragonBattle, DRAGON_ACTIONS } from '../systems/DragonBattle.js';

const WARNINGS = {
  claw: 'El dragón alza una garra.',
  breath: 'El dragón toma aire para lanzar fuego.',
  rest: 'El dragón recupera el aliento. Puedes atacar sin recibir un golpe.',
};

function polygon(graphics, color, points) {
  graphics.fillStyle(color).beginPath().moveTo(...points[0]);
  for (const point of points.slice(1)) graphics.lineTo(...point);
  graphics.closePath().fillPath();
}

function drawDragon(scene) {
  const dragon = scene.add.graphics({ x: 500, y: 116 });
  polygon(dragon, 0x301d38, [[200, 82], [225, 17], [323, 3], [404, 56], [350, 59], [319, 118], [259, 140]]);
  polygon(dragon, 0x633650, [[215, 83], [239, 26], [317, 12], [374, 50], [330, 53], [296, 106], [251, 124]]);
  polygon(dragon, 0x8e4f63, [[244, 33], [313, 13], [308, 35], [284, 88], [257, 69]]);
  polygon(dragon, 0x271d31, [[268, 141], [344, 150], [398, 109], [381, 153], [340, 182], [258, 184]]);
  polygon(dragon, 0x2e2035, [[131, 92], [186, 80], [235, 99], [297, 127], [308, 177], [263, 235], [196, 231], [169, 181], [126, 143]]);
  polygon(dragon, 0x73506d, [[143, 99], [183, 90], [220, 109], [254, 108], [285, 143], [288, 164], [247, 181], [213, 167], [189, 142], [171, 153], [142, 132]]);
  polygon(dragon, 0xb68974, [[172, 125], [199, 140], [225, 167], [253, 177], [243, 200], [209, 199], [184, 165]]);
  polygon(dragon, 0x362539, [[121, 147], [151, 151], [172, 197], [150, 230], [107, 230], [123, 206], [121, 178]]);
  polygon(dragon, 0x362539, [[242, 165], [270, 168], [282, 205], [260, 238], [214, 238], [221, 218], [243, 204]]);
  polygon(dragon, 0x69465d, [[123, 150], [147, 162], [154, 195], [132, 218], [118, 218], [134, 195]]);
  polygon(dragon, 0x69465d, [[243, 177], [267, 181], [268, 204], [248, 225], [226, 225], [251, 202]]);
  polygon(dragon, 0xe3cc9e, [[121, 221], [122, 230], [108, 230], [110, 224]]);
  polygon(dragon, 0xe3cc9e, [[227, 228], [227, 238], [214, 238], [215, 232]]);
  polygon(dragon, 0x35223a, [[146, 100], [123, 70], [72, 62], [40, 96], [9, 104], [22, 132], [75, 133], [113, 121]]);
  polygon(dragon, 0x96647d, [[136, 94], [117, 78], [78, 71], [51, 102], [18, 110], [27, 120], [70, 118], [108, 110]]);
  polygon(dragon, 0xd5b18e, [[109, 74], [92, 39], [121, 55], [132, 82]]);
  polygon(dragon, 0xd5b18e, [[78, 73], [65, 50], [89, 64]]);
  polygon(dragon, 0xffc574, [[65, 95], [95, 86], [85, 101], [73, 103]]);
  dragon.fillStyle(0x23172b).fillRect(81, 93, 4, 8).fillRect(31, 111, 8, 3);
  return dragon;
}

function drawChamber(scene) {
  scene.cameras.main.setBackgroundColor('#191322');
  const g = scene.add.graphics();
  g.fillStyle(0x292334).fillRect(0, 79, 960, 291);
  for (let y = 79; y < 370; y += 30) {
    for (let x = y % 60 ? 0 : -40; x < 960; x += 80) {
      g.lineStyle(1, 0x4d4154, 0.75).strokeRect(x, y, 80, 30);
    }
  }
  g.fillStyle(0x483340).fillRect(0, 370, 960, 170);
  g.fillStyle(0x775b61).fillRect(0, 366, 960, 5);
  g.fillStyle(0x483342).fillRect(562, 259, 344, 60);
  g.fillStyle(0x594257).fillRect(576, 256, 312, 31);
  g.fillStyle(0xa58779).fillRect(583, 282, 300, 6);
  g.fillStyle(0x2b2130).fillRect(573, 318, 9, 48).fillRect(879, 318, 9, 48);
  for (const x of [538, 925]) {
    g.fillStyle(0x3c2c34).fillRect(x, 125, 7, 117);
    g.fillStyle(0xb48461).fillRect(x - 8, 235, 22, 8);
    g.fillStyle(0xffb36e).fillTriangle(x - 6, 234, x + 11, 234, x + 3, 210);
  }
}

export class DragonScene extends Phaser.Scene {
  constructor() { super('Dragon'); }

  create() {
    const { data } = this.registry.get('storage');
    this.ui = this.registry.get('ui');
    this.ui.gameplay(false);
    this.battle = new DragonBattle(data.difficulty);
    const script = data.limboRoute === 'magic' ? ENDING_STORY.dragonTogether : ENDING_STORY.dragonAlone;
    this.conversation = script.filter((line) => /^(Dragón|Aidan|Aine):/.test(line)).slice(0, -1);
    drawChamber(this);
    this.dragonArt = drawDragon(this);
    this.dragonArt.setAlpha(1);
    this.dragonAura = this.add.ellipse(530, 246, 58, 21, 0xff9048).setAlpha(0);
    this.aidan = this.add.sprite(509, 366, 'aidan-idle')
      .setOrigin(0.5, 167 / PLAYER_ART.frameHeight).setScale(1.1).play('aidan-idle');
    this.aidan.on('animationcomplete', () => {
      if (this.battle.result === 'active') this.aidan.play('aidan-idle');
    });
    if (data.limboRoute === 'magic') {
      this.add.image(450, 366, 'aine-idle').setOrigin(0.5, 0.985).setDisplaySize(66, 83);
    }
    this.events.once('shutdown', () => this.ui.hidePanel());
    this.showTurn('Vénceme en duelo y te entregaré el fragmento.');
  }

  showTurn(message) {
    const { aidan, dragon, balance, intent, charged, turn } = this.battle;
    const speech = this.conversation[turn];
    const actions = [
      { label: charged ? 'Llama concentrada' : DRAGON_ACTIONS.attack.label, run: () => this.takeTurn('attack') },
      { label: DRAGON_ACTIONS.guard.label, run: () => this.takeTurn('guard'), secondary: true },
    ];
    if (!charged) actions.push({ label: DRAGON_ACTIONS.charge.label, run: () => this.takeTurn('charge'), secondary: true });
    actions.push({ label: 'Volver al menú', run: () => this.scene.start('Menu'), secondary: true });
    this.ui.panel({
      eyebrow: `HIARETH · TURNO ${turn + 1}`,
      title: 'El dragón',
      description: `${speech ? speech + ' ' : ''}${WARNINGS[intent]}`,
      note: `Aidan ${aidan}/${balance.aidan} PV · Dragón ${dragon}/${balance.dragon} PV. ${message} Defender reduce el daño a 1. Canalizar potencia la próxima llama.`,
      actions,
    });
    this.ui.announce(`Turno ${turn + 1}. ${speech ?? message} ${WARNINGS[intent]} Aidan ${aidan} puntos de vida. Dragón ${dragon} puntos de vida.`);
  }

  takeTurn(action) {
    const round = this.battle.play(action);
    if (!round) return;
    this.tweens.killTweensOf(this.dragonAura);
    if (round.intent === 'breath' && round.received) {
      this.dragonAura.setPosition(530, 246).setScale(1).setAlpha(0.9);
      this.tweens.add({ targets: this.dragonAura, x: 466, scaleX: 2.5, scaleY: 1.75, alpha: 0, duration: 380 });
    }
    this.tweens.killTweensOf(this.dragonArt);
    this.dragonArt.setPosition(500, 116);
    if (round.received && round.intent === 'claw') {
      this.tweens.add({ targets: this.dragonArt, x: 469, y: 123, yoyo: true, duration: 145 });
    }
    if (round.damage) {
      this.aidan.play('aidan-attack');
      this.dragonArt.setAlpha(0.55);
      this.tweens.add({ targets: this.dragonArt, alpha: 1, duration: 280 });
    } else if (round.received) {
      this.aidan.play('aidan-hurt');
    }

    if (this.battle.result === 'victory') {
      this.registry.get('audio')?.play('confirm');
      this.registry.get('storage').update({ endingStep: 'victory', endingPage: 0 });
      this.ui.hidePanel();
      this.ui.announce('El dragón se rinde.');
      this.time.delayedCall(450, () => this.scene.start('EndingStory', { step: 'victory' }));
      return;
    }
    if (this.battle.result === 'defeat') {
      this.aidan.play('aidan-death');
      this.ui.panel({
        eyebrow: 'HIARETH',
        title: 'Aidan cae',
        description: 'El dragón se prepara antes de lanzar fuego. Defender reduce el golpe a un punto de daño.',
        actions: [
          { label: 'Reintentar duelo', run: () => this.scene.restart() },
          { label: 'Volver al menú', run: () => this.scene.start('Menu'), secondary: true },
        ],
      });
      return;
    }

    const actions = {
      attack: `La llama inflige ${round.damage} de daño.`,
      guard: 'Aidan se protege.',
      charge: 'Aidan concentra el fuego en sus manos.',
    };
    const response = round.received ? ` Aidan recibe ${round.received} de daño.` : '';
    this.showTurn(actions[action] + response);
  }
}
