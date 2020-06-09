let input;

let selectedShape = 'box';

let selectedAngle = 20;

const circles = [
  { x: 100, y: 100, r: 25 },
  { x: 400, y: 150, r: 40 },
  { x: 300, y: 200, r: 10 },
  { x: 150, y: 350, r: 20 },
  { x: 600, y: 400, r: 50 },
  { x: 350, y: 600, r: 60 },
  { x: 180, y: 500, r: 15 }
];

const boxes = [
  { x: 300, y: 420, w: 50, h: 40 },
  { x: 700, y: 200, w: 30, h: 75 }
];

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
