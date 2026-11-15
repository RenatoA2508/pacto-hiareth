// Valores de laboratorio para revisar con el equipo; no son balance definitivo.
export const GAME = Object.freeze({ width: 960, height: 540, gravity: 1000 });
export const MOVEMENT = Object.freeze({ speed: 245, jumpSpeed: 470, maxFallSpeed: 750 });
export const PLAYER_ART = Object.freeze({
  frameWidth: 250, frameHeight: 250, scale: 0.9,
  // El dibujo termina en y=167. El margen transparente no es parte de la hitbox.
  body: { width: 30, height: 65, offsetX: 111, offsetY: 102 },
  animations: [
    { key: 'idle', file: 'Idle.png', frames: 8, fps: 8 },
    { key: 'run', file: 'Run.png', frames: 8, fps: 12 },
    { key: 'jump', file: 'Jump.png', frames: 2, fps: 8 },
    { key: 'fall', file: 'Fall.png', frames: 2, fps: 8 },
    { key: 'attack', file: 'Attack1.png', frames: 8, fps: 12, repeat: 0 },
    { key: 'hurt', file: 'Take hit.png', frames: 3, fps: 12, repeat: 0 },
    { key: 'death', file: 'Death.png', frames: 7, fps: 10, repeat: 0 },
  ],
});
