import Phaser from 'phaser';
import { ENDING_SCENES } from '../data/playable-story.js';
import { drawVignette } from '../ui/StoryVignettes.js';
import { ENDING_LEVEL_STEPS } from '../config/journey.js';
import { journeyScore } from '../systems/LevelProgress.js';
import { DialogueReader } from '../ui/DialogueReader.js';

export class EndingStoryScene extends Phaser.Scene {
  constructor() { super('EndingStory'); }

  create({ step } = {}) {
    const storage = this.registry.get('storage');
    const ui = this.registry.get('ui');
    const current = storage.data.endingStep ?? step ?? 'limboIntro';
    const saveStep = (next, patch = {}) => storage.update({ endingStep: next, endingPage: 0, ...patch });
    let transitioning = false;
    const go = (next, patch) => {
      if (transitioning) return;
      transitioning = true;
      saveStep(next, patch);
      this.scene.restart({ step: next });
    };
    if (current !== storage.data.endingStep) saveStep(current);
    if (ENDING_LEVEL_STEPS[current]) {
      this.scene.start(`Level${ENDING_LEVEL_STEPS[current]}`, { resume: true });
      return;
    }
    if (current === 'dragon') {
      this.scene.start('Dragon');
      return;
    }

    ui.gameplay(false);
    const alone = storage.data.limboRoute === 'tunnel';
    const limbo = 'ACTO 3 · LIMBO (ENFERMEDAD)';
    const valley = 'ACTO 4 · DON’T TRY';
    const castle = 'ACTO FINAL · HIARETH';
    const menu = () => this.scene.start('Menu');

    if (current === 'limboChoice') {
      drawVignette(this, 'limboIntro');
      ui.panel({
        eyebrow: limbo, title: 'Los esqueletos cierran el paso.',
        description: 'Aine ve una abertura bajo las raíces. Aidan todavía puede abrir otro camino con fuego.',
        actions: [
          { label: 'Bajar por el túnel', run: () => go('limboAfter', { limboRoute: 'tunnel' }) },
          { label: 'Abrirse paso con magia', run: () => go('limboAfter', { limboRoute: 'magic' }) },
          { label: 'Volver al menú', secondary: true, run: menu },
        ],
      });
      return;
    }

    if (current === 'victory') {
      go('complete');
      return;
    }
    if (current === 'complete') {
      if (this.textures.exists('victory-field')) this.add.image(480, 270, 'victory-field').setDisplaySize(960, 540);
      this.add.sprite(770, 461, 'aidan-idle').setOrigin(0.5, 167 / 250).setScale(1.35).play('aidan-idle');
      if (!alone) this.add.image(710, 461, 'aine-idle').setOrigin(0.5, 0.985).setDisplaySize(57, 77);
      ui.panel({
        eyebrow: castle, title: 'Lia Fáil recuperada',
        description: alone ? 'Aidan cruza el campo con el frasco de Aine. Del otro lado hay pan caliente y un lugar donde sentarse.' : 'Aidan y Aine salen juntos al amanecer. Al otro lado del campo hay una casa donde pueden desayunar al sol.',
        note: `Puntos del viaje: ${journeyScore(storage.data)} · Récord: ${storage.data.highScore}`,
        actions: [{ label: 'Volver al menú', run: menu }],
      });
      return;
    }

    const chapters = {
      limboIntro: [limbo, 'limboIntro', 'limboChoice'],
      limboAfter: [limbo, alone ? 'limboTunnel' : 'limboMagic', 'limbo'],
      valleyIntro: [valley, 'valleyIntro', 'valley'],
      valleyEncounter: [valley, alone ? 'valleyLoss' : 'valleyCaptive', alone ? 'castleIntro' : 'rescue'],
      rescueDone: [valley, 'valleyRescue', 'castleIntro'],
      castleIntro: [castle, alone ? 'castleAlone' : 'castleTogether', 'castle'],
    };
    if (current === 'dragonIntro') {
      go('dragon');
      return;
    }
    const [title, key, next] = chapters[current];
    const visual = drawVignette(this, key);
    const reader = new DialogueReader({
      ui, storage, audio: this.registry.get('audio'),
      story: { title, paragraphs: ENDING_SCENES[key].map((text) => ({ text })) }, visual,
      progressKey: 'endingPage', completeKey: null,
      onClose: menu, onFinish: () => go(next),
    });
    if (['limboTunnel', 'limboMagic', 'valleyIntro'].includes(key)) {
      reader.next.disabled = true;
      if (key.startsWith('limbo')) reader.body.style.visibility = 'hidden';
      this.time.delayedCall(1100, () => {
        reader.body.style.visibility = '';
        reader.next.disabled = false;
      });
    }
    this.events.once('shutdown', () => reader.destroy());
  }
}
