{
  raycasting.input = undefined;
  raycasting.target = { x: 100, y: 100 };
  raycasting.mode = 'shadows';
  raycasting.selectedShape = 'box';

  raycasting.shadowDetail;
  raycasting.spiroDetail;
  raycasting.angles = [];
  raycasting.secondaryAngles = [];

  raycasting.setShadowDetail = d => {
    raycasting.shadowDetail = d;
    raycasting.angles = Array.range(0, 2 * Math.PI, Math.PI / d);
  };
  raycasting.setSpiroDetail = d => {
    raycasting.spiroDetail = d;
    raycasting.secondaryAngles = Array.range(0, 2 * Math.PI, Math.PI / d);
  };

  raycasting.setShadowDetail(256);
  raycasting.setSpiroDetail(16);

  raycasting.circles = [];
  raycasting.boxes = [];

  raycasting.inputShape = (x, y) => {
    if (raycasting.input) {
      const p1 = raycasting.input;
      const p2 = { x, y };
      if (raycasting.selectedShape === 'box') {
        return {
          x: Math.min(p1.x, p2.x),
          y: Math.min(p1.y, p2.y),
          w: Math.abs(p1.x - p2.x),
          h: Math.abs(p1.y - p2.y)
        };
      } else if (raycasting.selectedShape === 'circle') {
        return {
          ...p1,
          r: Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
        };
      }
    }
    return undefined;
  };
}
