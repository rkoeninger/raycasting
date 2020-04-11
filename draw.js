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

const lineIntersection = (x0, y0, x1, y1, x2, y2, x3, y3) => {
  if (x0 === x1) {
    if (x2 === x3) {
      if (x0 === x2) {
        return { x: x0, y: y1 }; // overlapping vertical
      } else {
        return undefined; // parallel vertical
      }
    } else {
      const mb = (y3 - y2) / (x3 - x2);
      const kb = y2 - mb * x2;
      return { x: x0, y: mb * x0 + kb }; // only line a is vertical
    }
  } else if (x2 === x3) {
    const ma = (y1 - y0) / (x1 - x0);
    const ka = y0 - ma * x0;
    return { x: x2, y: ma * x2 + ka }; // only line b is vertical
  }

  const ma = (y1 - y0) / (x1 - x0);
  const mb = (y3 - y2) / (x3 - x2);
  const ka = y0 - ma * x0;
  const kb = y2 - mb * x2;

  if (ma === mb) {
    if (ka === kb) {
      return { x: x0, y: y1 }; // overlapping
    } else {
      return undefined; // parallel
    }
  }

  const x = (kb - ka) / (ma - mb);
  const y = ma * x + ka;
  return { x, y }; // intersection
};

const between = (k, a, b) => Math.min(a, b) <= k && k <= Math.max(a, b);

const segmentIntersection = (x0, y0, x1, y1, x2, y2, x3, y3) => {
  const p = lineIntersection(x0, y0, x1, y1, x2, y2, x3, y3);
  if (p === undefined) {
    return undefined;
  } else if (between(p.x, x0, x1) && between(p.y, y0, y1) && between(p.x, x2, x3) && between(p.y, y2, y3)) {
    return p;
  }
  return undefined;
};

const distanceSquared = (x0, y0, x1, y1) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  return dx * dx + dy * dy;
};

const drawRay = (g, x, y, mx, my) => {
  let q, dsq, ql;
  g.lineWidth = 1;
  for (const { x0, y0, x1, y1 } of edges) {
    if (x !== undefined && y !== undefined) {
      const p = segmentIntersection(x0, y0, x1, y1, x, y, 10, 10);
      if (p !== undefined) {
        const dsp = distanceSquared(10, 10, p.x, p.y);
        if (dsq === undefined || dsp < dsq) {
          q = p;
          dsq = dsp;
          ql = { x0, y0, x1, y1 };
        }
      }
    }
    g.strokeStyle = base0;
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.closePath();
    g.stroke();
  }

  if (q !== undefined) {
    g.strokeStyle = red;
    g.beginPath();
    g.moveTo(ql.x0, ql.y0);
    g.lineTo(ql.x1, ql.y1);
    g.closePath();
    g.stroke();
  }

  if (x !== undefined && y !== undefined) {
    if (input.x !== undefined && input.y !== undefined) {
      g.strokeStyle = base3;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(mx, my);
      g.lineTo(input.x, input.y);
      g.closePath();
      g.stroke();
    }

    g.strokeStyle = violet;
    g.lineWidth = 2;
    g.beginPath();
    if (q === undefined) {
      g.moveTo(x, y);
    } else {
      g.moveTo(q.x, q.y);
    }
    g.lineTo(10, 10);
    g.closePath();
    g.stroke();
  }
};

const range = (i, j) => [...new Array(j - i).keys()].map(x => x + i);

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
