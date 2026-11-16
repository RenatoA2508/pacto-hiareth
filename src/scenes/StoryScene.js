import { OPENING_SCENES } from '../data/playable-story.js';
import Phaser from 'phaser';
import prologue from '../data/prologue.json';
import intro from '../data/level1-intro.json';
import camp from '../data/camp.json';
import act2 from '../data/act2.json';
import { DialogueReader } from '../ui/DialogueReader.js';

export class StoryScene extends Phaser.Scene {
  constructor() { super('Story'); }
  create({ kind = 'prologue', playLevel = false } = {}) {
    const ui = this.registry.get('ui');
    const storage = this.registry.get('storage');
    ui.gameplay(false);
    const chapters = {
      prologue: { story: prologue, progressKey: 'prologuePage', completeKey: 'prologueComplete', next: playLevel ? 'Story' : 'Menu', skip: playLevel ? 'Ir a la introducción' : null },
      intro: { story: intro, progressKey: 'level1IntroPage', completeKey: 'level1IntroRead', next: playLevel ? 'Level1' : 'Menu', skip: playLevel ? 'Ir al nivel' : null },
      camp: { story: camp, progressKey: 'campPage', completeKey: 'campRead', next: 'Level2', skip: 'Ir al nivel 2' },
      act2: { story: act2, progressKey: 'act2Page', completeKey: 'act2Read', next: 'EndingStory', skip: 'Omitir lectura' },
    };
    const chapter = chapters[kind] ?? chapters.prologue;
    const lines = kind === 'prologue' && !playLevel ? null : OPENING_SCENES[kind];
    const story = lines ? { ...chapter.story, paragraphs: lines.map((text) => ({ text })) } : chapter.story;
    this.reader = new DialogueReader({
      ui, storage, story,
      audio: this.registry.get('audio'),
      onClose: () => this.scene.start('Menu'),
      onFinish: () => {
        if (kind === 'act2') storage.update({ endingStep: 'limboIntro', endingPage: 0 });
        if (kind === 'prologue' && playLevel) {
          storage.update({ openingStep: 'intro' });
          this.scene.restart({ kind: 'intro', playLevel: true });
          return;
        }
        if (kind === 'intro' && playLevel) storage.update({ openingStep: null });
        this.scene.start(chapter.next, { resume: false });
      },
      skipLabel: chapter.skip,
      progressKey: chapter.progressKey, completeKey: chapter.completeKey,
    });
    this.events.once('shutdown', () => this.reader.destroy());
  }
}
