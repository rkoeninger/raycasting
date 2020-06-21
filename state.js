{
  raycasting.mode = 'shadows';
  raycasting.target = { x: 100, y: 100 };
  raycasting.input = undefined;
  raycasting.selectedShape = 'box';

  raycasting.inputShape = (x, y) => {
    if (raycasting.input) {
      const p = raycasting.input;
      const q = { x, y };
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      if (raycasting.selectedShape === 'box') {
        return {
          x: Math.min(p.x, q.x),
          y: Math.min(p.y, q.y),
          w: Math.abs(dx),
          h: Math.abs(dy)
        };
      } else if (raycasting.selectedShape === 'circle') {
        return {
          ...p,
          r: Math.sqrt(dx * dx + dy * dy)
        };
      }
    }
    return undefined;
  };

  raycasting.shadows = {
    detail: 256,
    get angles() {
      return Generator.range(0, 2 * Math.PI, Math.PI / this.detail);
    }
  };

  raycasting.spirograph = {
    detail: 16,
    get angles() {
      return Generator.range(0, 2 * Math.PI, Math.PI / this.detail);
    }
  };

  raycasting.circles = [];
  raycasting.boxes = [];
}
