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

const between = (k, a, b) => Math.min(a, b) <= k && k <= Math.max(a, b);

const distance = (p, q) => {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const closestPointToCirlce = (cx, cy, px, py, qx, qy) => {
  const mpq = (qy - py) / (qx - px);
  const kpq = py - mpq * px;
  const mcs = -1 / mpq;
  const kcs = cy - mcs * cx;
  const x = (kpq - kcs) / (mcs - mpq);
  const y = mcs * x + kcs;
  return { x, y };
};

const shiftPointAtAngle = (x, y, a, r) => ({
  x: x + Math.cos(a) * r,
  y: y + Math.sin(a) * r
});

const minOf = xs => xs.reduce((m, c) => c < m ? c : m, Number.POSITIVE_INFINITY);

const draw = (g, w, h, m) => {
  g.fillStyle = base03;
  g.fillRect(0, 0, w, h);

  g.strokeStyle = blue;
  for (const { x, y, r } of objects) {
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.closePath();
    g.stroke();
  }

  if (m) {
    const minDistance = minOf([
      ...objects.map(o => distance(o, m) - o.r),
      m.x,
      m.y,
      w - m.x,
      h - m.y]);
    g.strokeStyle = orange;
    g.beginPath();
    g.arc(m.x, m.y, Math.abs(minDistance), 0, 2 * Math.PI);
    g.closePath();
    g.stroke();
  }
};
