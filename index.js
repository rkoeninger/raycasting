const draw = (g, w, h, x, y) => {
  g.fillStyle = 'darkgrey';
  g.fillRect(0, 0, w, h);
  g.fillStyle = 'black';
  g.fillRect(10, 10, w - 20, h - 20);
  g.fillStyle = 'red';
  g.fillRect(x - 5, y - 5, 10, 10);
};
