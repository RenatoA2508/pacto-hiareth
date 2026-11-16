const ground = (x, width) => ({ x, y: 470, width, height: 210 });
const ledge = (x, y, width) => ({ x, y, width, height: 22 });
const point = (x) => ({ x, feetY: 468 });

function level(id, biome, title, width, enemies, checkpoints, platforms, exitLabel, objective, requiredEnemies = []) {
  return Object.freeze({
    id, biome, title, width, height: 680, enemies,
    start: point(125), portal: point(width - 135),
    checkpoints: [125, ...checkpoints].map(point), platforms, exitLabel, objective, requiredEnemies,
  });
}

export const ENDING_LEVELS = Object.freeze({
  3: level(3, 'limbo', 'LIMBO (ENFERMEDAD)', 3150,
    [470, 1010, 1330, 1760, 2095, 2670],
    [1160, 2480],
    [ground(0, 650), ground(775, 700), ground(1595, 650), ground(2370, 780),
      ledge(390, 370, 155), ledge(940, 380, 185), ledge(1820, 375, 170), ledge(2710, 370, 180)],
    'Salida del Limbo', 'Encuentra la salida del Limbo'),
  4: level(4, 'valley', 'DON’T TRY', 2660,
    [1690],
    [945, 1900],
    [ground(0, 690), ground(795, 570), ground(1485, 1175),
      ledge(420, 375, 175), ledge(1000, 365, 190), ledge(1770, 380, 155)],
    'Galerías', 'Busca a Aine en las galerías'),
  5: level(5, 'castle', 'HIARETH', 3240,
    [540, 960, 1570, 1950, 2530, 2900],
    [1220, 2420],
    [ground(0, 660), ground(785, 550), ground(1455, 690), ground(2260, 980),
      ledge(415, 375, 160), ledge(1030, 377, 185), ledge(1750, 365, 195), ledge(2610, 370, 170)],
    'Dormitorio', 'Vence a los dos guardianes de la puerta', [4, 5]),
});

export const RESCUE_LEVEL = level(6, 'valley', 'DON’T TRY', 1250,
  [370, 750, 930], [],
  [ground(0, 1250), ledge(510, 375, 144)],
  'Aine', 'Derrota a los captores para liberar a Aine', [0, 1, 2]);
