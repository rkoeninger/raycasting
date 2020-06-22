{
  raycasting.installCanvasHelpers = g => {
    g.circle = function (x, y, r) {
      this.beginPath();
      this.arc(x, y, Math.abs(r), 0, 2 * Math.PI);
      this.closePath();
      return this;
    };
    g.line = function (x, y, x2, y2) {
      this.beginPath();
      this.moveTo(x, y);
      this.lineTo(x2, y2);
      this.closePath();
      return this;
    };
    g.rect = function (x, y, w, h) {
      this.beginPath();
      this.moveTo(x, y);
      this.lineTo(x + w, y);
      this.lineTo(x + w, y + h);
      this.lineTo(x, y + h);
      this.closePath();
      return this;
    };
    g.poly = function (p, ...ps) {
      this.beginPath();
      this.moveTo(p.x, p.y);
      for (const q of ps) {
        this.lineTo(q.x, q.y);
      }
      this.closePath();
      return this;
    };
    g.dot = function (p, size) {
      return this.circle(p.x, p.y, size / 2);
    };
    g.strokeAndFill = function () {
      g.fill();
      g.stroke();
      return this;
    };
  };
  window.Generator = (function*(){}).prototype;
  Generator.range = function* (x0, xn, i = 1) {
    for (let x = x0; x < xn; x += i) {
      yield x;
    }
  };
}
