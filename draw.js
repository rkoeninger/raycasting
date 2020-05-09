const base03 = '#002b36';
const base02 = '#073642';
const base01 = '#586e75';
const base00 = '#657b83';
const base0 = '#839496';
const base1 = '#93a1a1';
const base2 = '#eee8d5';
const base3 = '#fdf6e3';
const yellow = '#b58900';
const orange = '#cb4b16';
const red = '#dc322f';
const magenta = '#d33682';
const violet = '#6c71c4';
const blue = '#268bd2';
const cyan = '#2aa198';
const green = '#859900';

const distance = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

const circleDistance = (c, p) => {
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return distance(dx, dy) - c.r;
};

const boxDistance = (b, p) => {
  const ox = Math.abs(p.x - b.x) - b.w;
  const oy = Math.abs(p.y - b.y) - b.h;
  const d = distance(Math.max(ox, 0), Math.max(oy, 0));
  const i = Math.max(Math.min(ox, 0), Math.min(oy, 0));
  return d + i;
};

const minOf = xs => xs.reduce((m, c) => c < m ? c : m, Number.POSITIVE_INFINITY);

const draw = (g, sw, sh, m) => {
  g.fillStyle = base03;
  g.fillRect(0, 0, sw, sh);

  g.strokeStyle = blue;
  for (const { x, y, r } of circles) {
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.closePath();
    g.stroke();
  }

  for (const { x, y, w, h } of boxes) {
    g.strokeRect(x - w, y - h, w * 2, h * 2);
  }

  if (m) {
    const minDistance = minOf([
      ...circles.map(c => circleDistance(c, m)),
      ...boxes.map(b => boxDistance(b, m)),
      m.x,
      m.y,
      sw - m.x,
      sh - m.y]);
    g.strokeStyle = orange;
    g.beginPath();
    g.arc(m.x, m.y, Math.abs(minDistance), 0, 2 * Math.PI);
    g.closePath();
    g.stroke();
  }
};
