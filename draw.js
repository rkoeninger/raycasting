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

const range = (x0, xn, i = 1) => {
  const xs = [];
  for (x = x0; x < xn; x += i) {
    xs.push(x);
  }
  return xs;
};

const angles = range(0, 2 * Math.PI, Math.PI / 256);

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

const fitCircle = (sw, sh, p) => Math.min(
  ...circles.map(c => circleDistance(c, p)),
  ...boxes.map(b => boxDistance(b, p)),
  p.x,
  p.y,
  sw - p.x,
  sh - p.y);

const translate = ({ x, y }, r, angle) => ({
  x: x + r * Math.cos(angle),
  y: y + r * Math.sin(angle)
});

const draw = (g, sw, sh, m) => {
  g.fillCircle = function (x, y, r) {
    this.beginPath();
    this.arc(x, y, Math.abs(r), 0, 2 * Math.PI);
    this.closePath();
    return this.fill();
  };
  g.strokeCircle = function (x, y, r) {
    this.beginPath();
    this.arc(x, y, Math.abs(r), 0, 2 * Math.PI);
    this.closePath();
    return this.stroke();
  };
  g.strokeLine = function (x, y, x2, y2) {
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(x2, y2);
    this.closePath();
    return this.stroke();
  };

  g.fillStyle = base03;
  g.fillRect(0, 0, sw, sh);

  g.strokeStyle = blue;
  for (const { x, y, r } of circles) {
    g.strokeCircle(x, y, r);
  }

  for (const { x, y, w, h } of boxes) {
    g.strokeRect(x - w, y - h, w * 2, h * 2);
  }

  if (m) {
    const minDistance = fitCircle(sw, sh, m);
    for (const angle of angles) {
      let p = m;
      let r = minDistance;
      while (r > 1) {
        p = translate(p, r, angle);
        r = fitCircle(sw, sh, p);
      }
      g.fillStyle = green;
      g.fillCircle(p.x, p.y, 4);
      g.strokeStyle = yellow;
      g.strokeLine(m.x, m.y, p.x, p.y);
    }
  }
};
