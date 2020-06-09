let input;

let selectedShape = 'box';

let selectedAngle = 20;

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
