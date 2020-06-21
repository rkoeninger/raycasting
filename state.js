{
  raycasting.mode = 'shadows';
  raycasting.target = { x: 100, y: 100, a: 0 };
  raycasting.input = undefined;
  raycasting.selectedShape = 'box';

  raycasting.inputShape = (x, y) => {
    if (raycasting.input) {
      const dx = raycasting.input.x - x;
      const dy = raycasting.input.y - y;
      if (raycasting.selectedShape === 'box') {
        return {
          x: Math.min(raycasting.input.x, x),
          y: Math.min(raycasting.input.y, y),
          w: Math.abs(dx),
          h: Math.abs(dy)
        };
      } else if (raycasting.selectedShape === 'circle') {
        return {
          ...raycasting.input,
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
