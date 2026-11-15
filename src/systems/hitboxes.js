export function attackRectangle(body, facing, range, height) {
  return { x: facing > 0 ? body.x + body.width : body.x - range, y: body.y + (body.height - height) / 2, width: range, height };
}
export function intersects(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
export function wallBetween(a, b, platforms) {
  const start = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
  const end = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  return platforms.some((rect) => {
    let entry = 0, exit = 1;
    for (const [axis, extent] of [['x', 'width'], ['y', 'height']]) {
      const delta = end[axis] - start[axis];
      if (delta === 0) {
        if (start[axis] <= rect[axis] || start[axis] >= rect[axis] + rect[extent]) return false;
      } else {
        const first = (rect[axis] - start[axis]) / delta;
        const last = (rect[axis] + rect[extent] - start[axis]) / delta;
        entry = Math.max(entry, Math.min(first, last));
        exit = Math.min(exit, Math.max(first, last));
        if (entry > exit) return false;
      }
    }
    return entry < 1 && exit > 0;
  });
}
