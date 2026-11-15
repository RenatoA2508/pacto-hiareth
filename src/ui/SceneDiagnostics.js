// Solo desarrollo: información visible para medir física sin tocar el estado del juego.
export function createDiagnostics(scene) {
  if (!import.meta.env.DEV || !new URLSearchParams(location.search).has('debug')) return null;
  const output = document.createElement('output'); output.setAttribute('aria-live', 'off');
  output.style = 'position:fixed;bottom:4px;left:4px;z-index:30;background:#000;color:#fff;padding:8px;font:12px monospace';
  document.body.append(output);
  scene.events.once('shutdown', () => output.remove());
  let next = 0;
  return { update(player) {
    if (scene.time.now < next) return;
    next = scene.time.now + 250;
    output.textContent = `FPS ${scene.game.loop.actualFps.toFixed(0)} · x ${player.x.toFixed(0)} · pies ${player.body.bottom.toFixed(0)} · suelo ${player.body.blocked.down}`;
  } };
}
