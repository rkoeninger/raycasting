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

const between = (k, a, b) => ((a <= k) && (k <= b)) || ((b <= k) && (k <= a));

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

const draw = (g, w, h, x, y) => {
  g.fillStyle = base01;
  g.fillRect(0, 0, w, h);
  g.fillStyle = base03;
  g.fillRect(10, 10, w - 20, h - 20);

  let q, dsq;
  g.lineWidth = 1;
  for (const { x0, y0, x1, y1 } of edges) {
    const p = segmentIntersection(x0, y0, x1, y1, x, y, 10, 10);
    if (p !== undefined) {
      const dsp = distanceSquared(10, 10, p.x, p.y);
      if (dsq === undefined || dsp < dsq) {
        q = p;
        dsq = dsp;
      }
      g.fillStyle = orange;
      g.fillRect(p.x - 5, p.y - 5, 10, 10);
    }
    g.strokeStyle = p !== undefined ? red : base0;
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.closePath();
    g.stroke();
  }

  if (x !== undefined && y !== undefined) {
    if (input.x !== undefined && input.y !== undefined) {
      g.strokeStyle = base3;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(x, y);
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
    g.fillStyle = magenta;
    g.fillRect(x - 5, y - 5, 10, 10);
  }
};
