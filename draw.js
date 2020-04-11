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

const distanceSquared = (x0, y0, x1, y1) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  return dx * dx + dy * dy;
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

const draw = (g, w, h, mx, my) => {
  g.fillStyle = base03;
  g.fillRect(0, 0, w, h);

  g.strokeStyle = blue;
  for (const { x0, y0, x1, y1 } of edges) {
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.closePath();
    g.stroke();
  }

  const r = 100;

  if (mx !== undefined && my !== undefined) {
    g.strokeStyle = green;
    g.beginPath();
    g.arc(mx, my, r, 0, 2 * Math.PI);
    g.closePath();
    g.stroke();

    const e = edges[0];
    const s = closestPointToCirlce(mx, my, e.x0, e.y0, e.x1, e.y1);
    if (s !== undefined) {
      if (between(s.x, e.x0, e.x1) && between(s.y, e.y0, e.y1)) {
        g.fillStyle = violet;
        g.fillRect(s.x - 10, s.y - 10, 20, 20);
      }

      const dx = s.x - mx;
      const dy = s.y - my;
      const dsq = dx * dx + dy * dy;
      if (r * r > dsq) {
        const alpha = Math.acos(Math.sqrt(dsq) / r);
        const beta = Math.atan2(dy, dx);
        let theta = beta - alpha;
        let omicron = beta + alpha;
        const u = shiftPointAtAngle(mx, my, theta, r);
        const v = shiftPointAtAngle(mx, my, omicron, r);
        if (between(u.x, e.x0, e.x1) && between(u.y, e.y0, e.y1)) {
          g.fillStyle = cyan;
          g.fillRect(u.x - 10, u.y - 10, 20, 20);
        }
        if (between(v.x, e.x0, e.x1) && between(v.y, e.y0, e.y1)) {
          g.fillStyle = cyan;
          g.fillRect(v.x - 10, v.y - 10, 20, 20);
        }
        g.fillStyle = yellow;
        g.fillRect(u.x - 5, u.y - 5, 10, 10);
        g.fillRect(v.x - 5, v.y - 5, 10, 10);

        if (r * r > distanceSquared(mx, my, e.x0, e.y0)) {
          g.fillStyle = red;
          g.fillRect(e.x0 - 5, e.y0 - 5, 10, 10);
        }
        if (r * r > distanceSquared(mx, my, e.x1, e.y1)) {
          g.fillStyle = red;
          g.fillRect(e.x1 - 5, e.y1 - 5, 10, 10);
        }

        g.fillStyle = base3 + '77';
        g.beginPath();
        g.moveTo(mx, my);
        g.arc(mx, my, r, 0, theta);
        if (between(u.x, e.x0, e.x1) && between(u.y, e.y0, e.y1)) {
          g.lineTo(u.x, u.y);
        } else {
          g.lineTo(e.x0, e.y0);
          omicron = Math.atan2(e.y0 - my, e.x0 - mx);
        }
        if (between(v.x, e.x0, e.x1) && between(v.y, e.y0, e.y1)) {
          g.lineTo(v.x, v.y);
        } else {
          g.lineTo(e.x1, e.y1);
          omicron = Math.atan2(e.y1 - my, e.x1 - mx);
        }
        g.arc(mx, my, r, omicron, Math.PI * 2);
        g.closePath();
        g.fill();
      } else {
        g.fillStyle = base3 + '77';
        g.beginPath();
        g.arc(mx, my, r, 0, 2 * Math.PI);
        g.closePath();
        g.fill();
      }

      g.fillStyle = magenta;
      g.fillRect(s.x - 5, s.y - 5, 10, 10);
    }
  }
};
