let input;
let target = { x: 100, y: 100 };
let mode = 'shadows';
let selectedShape = 'box';

const range = (x0, xn, i = 1) => {
  const xs = [];
  for (; x0 < xn; x0 += i) {
    xs.push(x0);
  }
  return xs;
};

let detail;
let angles = [];
let secondaryAngles = [];

const setDetail = d => {
  detail = d;
  angles = range(0, 2 * Math.PI, Math.PI / d);
  secondaryAngles = range(0, 2 * Math.PI, 16 * Math.PI / d);
};

setDetail(128);

const circles = [];
const boxes = [];

const inputShape = (offsetX, offsetY) => {
  if (input) {
    const p1 = input;
    const p2 = { x: offsetX, y: offsetY };
    if (selectedShape === 'box') {
      return {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
        w: Math.abs(p1.x - p2.x),
        h: Math.abs(p1.y - p2.y)
      };
    } else if (selectedShape === 'circle') {
      return {
        ...p1,
        r: Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
      };
    }
  }
};
