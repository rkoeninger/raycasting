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

const line = (g, x0, y0, x1, y1) => {
  g.beginPath();
  g.moveTo(x0, y0);
  g.lineTo(x1, y1);
  g.closePath();
  g.stroke();
};

const draw = (g, w, h, x, y) => {
  g.fillStyle = base01;
  g.fillRect(0, 0, w, h);
  g.fillStyle = base03;
  g.fillRect(10, 10, w - 20, h - 20);

  g.strokeStyle = violet;
  g.lineWidth = 2;
  line(g, 10, 10, x, y);
  line(g, 10, h - 10, x, y);
  line(g, w - 10, 10, x, y);
  line(g, w - 10, h - 10, x, y);

  g.fillStyle = magenta;
  g.fillRect(x - 5, y - 5, 10, 10);
};
