{
  const plus = () => {
    if (raycasting.mode === 'shadows' && raycasting.shadows.detail < 4096) {
      raycasting.shadows.detail *= 2;
    } else if (raycasting.mode === 'spirograph' && raycasting.spirograph.detail < 4096) {
      raycasting.spirograph.detail *=  2;
    } else if (raycasting.mode === 'first-person' && raycasting.firstPerson.detail < 2048) {
      raycasting.firstPerson.detail *= 2;
    }
    raycasting.refreshDetail();
  };
  const minus = () => {
    if (raycasting.mode === 'shadows' && raycasting.shadows.detail > 2) {
      raycasting.shadows.detail = Math.floor(raycasting.shadows.detail / 2);
    } else if (raycasting.mode === 'spirograph' && raycasting.spirograph.detail > 2) {
      raycasting.spirograph.detail = Math.floor(raycasting.spirograph.detail / 2);
    } else if (raycasting.mode === 'first-person' && raycasting.firstPerson.detail > 16) {
      raycasting.firstPerson.detail = Math.floor(raycasting.firstPerson.detail / 2);
    }
    raycasting.refreshDetail();
  };
  const bound = (k, min, max) => Math.max(min, Math.min(max, k));
  const step = (a, canvas) => {
    raycasting.target.x = bound(raycasting.target.x + 10 * Math.cos(a), 0, canvas.width);
    raycasting.target.y = bound(raycasting.target.y + 10 * Math.sin(a), 0, canvas.height);
  };
  const stepForward = ({ canvas }) => step(raycasting.target.a, canvas);
  const stepBackward = ({ canvas }) => step(raycasting.target.a + Math.PI, canvas);
  const stepLeft = ({ canvas }) => step(raycasting.target.a + Math.PI * 1.5, canvas);
  const stepRight = ({ canvas }) => step(raycasting.target.a + Math.PI * 0.5, canvas);
  const turnLeft = () => raycasting.target.a -= Math.PI / 32;
  const turnRight = () => raycasting.target.a += Math.PI / 32;
  const PLUS = '187';
  const MINUS = '189';
  const ONE = '49';
  const TWO = '50';
  const ESC = '27';
  const W = '87';
  const A = '65';
  const S = '83';
  const D = '68';
  const LEFT = '37';
  const UP = '38';
  const RIGHT = '39';
  const DOWN = '40';
  raycasting.keyInputs = {
    [PLUS]: plus,
    [MINUS]: minus,
    [ONE]: () => raycasting.input.shape = 'box',
    [TWO]: () => raycasting.input.shape = 'circle',
    [ESC]: () => raycasting.input.clear(),
    [LEFT]: turnLeft,
    [RIGHT]: turnRight,
    [UP]: stepForward,
    [DOWN]: stepBackward,
    [W]: stepForward,
    [A]: stepLeft,
    [S]: stepBackward,
    [D]: stepRight
  };
  raycasting.click = (x, y) => {
    if (!raycasting.input.isActive) {
      raycasting.input.origin = { x, y };
    } else if (raycasting.input.shape === 'box') {
      raycasting.boxes.push(raycasting.input.current(x, y));
      raycasting.input.clear();
    } else if (raycasting.input.shape === 'circle') {
      raycasting.circles.push(raycasting.input.current(x, y));
      raycasting.input.clear();
    }
  };
}
