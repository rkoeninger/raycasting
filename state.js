{
  raycasting.mode = 'shadows';
  raycasting.target = { x: 100, y: 400, a: 0 };

  raycasting.input = {
    origin: undefined,
    shape: 'box',
    get isActive() { return this.origin !== undefined; },
    clear() { this.origin = undefined; },
    current(x, y) {
      if (this.origin) {
        const dx = this.origin.x - x;
        const dy = this.origin.y - y;
        if (this.shape === 'box') {
          return {
            x: Math.min(this.origin.x, x),
            y: Math.min(this.origin.y, y),
            w: Math.abs(dx),
            h: Math.abs(dy)
          };
        } else if (this.shape === 'circle') {
          return {
            ...this.origin,
            r: Math.sqrt(dx * dx + dy * dy)
          };
        }
      }
    }
  };

  raycasting.shadows = {
    detail: 256,
    get angles() { return Generator.range(0, 2 * Math.PI, Math.PI / this.detail); }
  };

  raycasting.spirograph = {
    detail: 16,
    get angles() { return Generator.range(0, 2 * Math.PI, Math.PI / this.detail); }
  };

  raycasting.firstPerson = {
    fov: Math.PI / 2,
    detail: 64,
    get angles() {
      return Generator.range(
        raycasting.target.a - this.fov / 2,
        raycasting.target.a + this.fov / 2,
        this.fov / this.detail);
    }
  };

  raycasting.circles = [];
  raycasting.boxes = [];
}
