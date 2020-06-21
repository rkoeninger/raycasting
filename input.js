{
  const plus = () => {
    if (raycasting.mode === 'shadows') {
      if (raycasting.shadows.detail < 4096) {
        raycasting.shadows.detail = raycasting.shadows.detail * 2;
      }
    } else if (raycasting.mode === 'spirograph') {
      if (raycasting.spirograph.detail < 4096) {
        raycasting.spirograph.detail = raycasting.spirograph.detail * 2;
      }
    }
    raycasting.refreshDetail();
  };
  const minus = () => {
    if (raycasting.mode === 'shadows') {
      if (raycasting.shadows.detail > 2) {
        raycasting.shadows.detail = Math.floor(raycasting.shadows.detail / 2);
      }
    } else if (raycasting.mode === 'spirograph') {
      if (raycasting.spirograph.detail > 2) {
        raycasting.spirograph.detail = Math.floor(raycasting.spirograph.detail / 2);
      }
    }
    raycasting.refreshDetail();
  };
  const PLUS = '187';
  const MINUS = '189';
  const ONE = '49';
  const TWO = '50';
  const ESC = '27';
  const W = '87';
  const A = '65';
  const S = '83';
  const D = '68';
  raycasting.keyInputs = {
    [PLUS]: plus,
    [MINUS]: minus,
    [ONE]: () => raycasting.selectedShape = 'box',
    [TWO]: () => raycasting.selectedShape = 'circle',
    [ESC]: () => raycasting.input = undefined,
    [W]: () => raycasting.target.y = Math.max(0, raycasting.target.y - 50),
    [A]: () => raycasting.target.x = Math.max(0, raycasting.target.x - 50),
    [S]: ({ canvas }) => raycasting.target.y = Math.min(canvas.clientHeight, raycasting.target.y + 50),
    [D]: ({ canvas }) => raycasting.target.x = Math.min(canvas.clientWidth, raycasting.target.x + 50)
  };
  raycasting.click = (x, y) => {
    if (raycasting.input === undefined) {
      raycasting.input = { x, y };
    } else {
      if (raycasting.selectedShape === 'box') {
        raycasting.boxes.push(raycasting.inputShape(x, y));
      } else if (raycasting.selectedShape === 'circle') {
        raycasting.circles.push(raycasting.inputShape(x, y));
      }
      raycasting.input = undefined;
    }
  };
}
