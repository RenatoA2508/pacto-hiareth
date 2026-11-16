export const CITY_LAYERS = Object.freeze([
  { file: '1.png', factor: 0 }, { file: '2.png', factor: 0.12 },
  { file: '3.png', factor: 0.3 }, { file: '4.png', factor: 0.5 }, { file: '5.png', factor: 0.7 },
]);
// Patrullas mecánicas; su origen narrativo todavía no está definido.
export const LEVEL2 = Object.freeze({
  id: 2, biome: 'city', title: 'VUELA ALTO', width: 4200, height: 680,
  start: { x: 140, feetY: 468 }, portal: { x: 4010, feetY: 470 },
  checkpoints: [{ x: 140, feetY: 468 }, { x: 1550, feetY: 468 }, { x: 3000, feetY: 468 }],
  enemies: [560, 1650, 2750, 3820],
  platforms: [
    { x: 0, y: 470, width: 1000, height: 210 },
    { x: 1150, y: 470, width: 1150, height: 210 },
    { x: 2450, y: 470, width: 1050, height: 210 },
    { x: 3650, y: 470, width: 550, height: 210 },
    { x: 450, y: 365, width: 180, height: 28 },
    { x: 1320, y: 365, width: 160, height: 28 },
    { x: 1990, y: 365, width: 150, height: 28 },
    { x: 2660, y: 365, width: 170, height: 28 },
    { x: 3210, y: 365, width: 150, height: 28 },
  ],
});
