export const JOURNEY_LEVELS = [1, 2, 3, 4, 5];
export const ENDING_LEVEL_STEPS = { limbo: 3, valley: 4, castle: 5, rescue: 6 };
export const ENDING_RESULTS = { 3: 'valleyIntro', 4: 'valleyEncounter', 5: 'dragonIntro', 6: 'rescueDone' };
export const ENDING_STEPS = [
  'limboIntro', 'limboChoice', 'limboAfter', 'valleyIntro', 'valleyEncounter',
  'rescueDone', 'castleIntro', 'dragonIntro', 'dragon', 'victory', 'complete',
  ...Object.keys(ENDING_LEVEL_STEPS),
];

export function newEnding() {
  const levels = Object.fromEntries([3, 4, 5, 6].flatMap((id) => [
    [`level${id}Checkpoint`, 0], [`level${id}Killed`, []], [`level${id}Complete`, false],
  ]));
  return { ...levels, endingStep: null, endingPage: 0, limboRoute: null };
}
