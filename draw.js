{
  const base03 = '#002b36';
  const base02 = '#073642';
  const base01 = '#586e75';
  const base00 = '#657b83';
  const base0 = '#839496';
  const base1 = '#93a1a1';
  const base2 = '#eee8d5';
  const base3 = '#fdf6e3';
  const yellow = '#b58900';
  const orange = '#cb4b16';
  const red = '#dc322f';
  const magenta = '#d33682';
  const violet = '#6c71c4';
  const blue = '#268bd2';
  const cyan = '#2aa198';
  const green = '#859900';

  const lineIntersection = (x0, y0, x1, y1, x2, y2, x3, y3) => {
    if (x0 === x1) {
      if (x2 === x3) {
        if (x0 === x2) {
          return { x: x0, y: y1 }; // overlapping vertical
        } else {
          return undefined; // parallel vertical
        }
      } else {
        const mb = (y3 - y2) / (x3 - x2);
        const kb = y2 - mb * x2;
        return { x: x0, y: mb * x0 + kb }; // only line a is vertical
      }
    } else if (x2 === x3) {
      const ma = (y1 - y0) / (x1 - x0);
      const ka = y0 - ma * x0;
      return { x: x2, y: ma * x2 + ka }; // only line b is vertical
    }

    const ma = (y1 - y0) / (x1 - x0);
    const mb = (y3 - y2) / (x3 - x2);
    const ka = y0 - ma * x0;
    const kb = y2 - mb * x2;

    if (ma === mb) {
      if (ka === kb) {
        return { x: x0, y: y1 }; // overlapping
      } else {
        return undefined; // parallel
      }
    }

    const x = (kb - ka) / (ma - mb);
    const y = ma * x + ka;
    return { x, y }; // intersection
  };

  const between = (k, a, b) =>
    (Math.min(a, b) <= k || Math.abs(k - Math.min(a, b)) <= 1) &&
    (Math.max(a, b) >= k || Math.abs(k - Math.max(a, b)) <= 1);

  const segmentIntersection = (x0, y0, x1, y1, x2, y2, x3, y3) => {
    const p = lineIntersection(x0, y0, x1, y1, x2, y2, x3, y3);
    return (p !== undefined &&
        between(p.x, x0, x1) &&
        between(p.y, y0, y1) &&
        between(p.x, x2, x3) &&
        between(p.y, y2, y3))
      ? p
      : undefined;
  };

  const distance = (dx, dy) => Math.sqrt(dx * dx + dy * dy);

  const circleLineIntersection = (x0, y0, x1, y1, xc, yc, r) => {
    x0 -= xc;
    x1 -= xc;
    y0 -= yc;
    y1 -= yc;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const dr = distance(dx, dy);
    const D = x0 * y1 - x1 * y0;
    const sign = dy < 0 ? -1 : 1;
    const dis = r * r * dr * dr - D * D;
    if (dis < -0.1) {
      return [];
    } else if (Math.abs(dis) < 0.1) {
      return [{
        x: (D * dy) / (dr * dr) + xc,
        y: (-1 * D * dx) / (dr * dr) + yc
      }];
    } else {
      const xa = (D * dy + sign * dx * Math.sqrt(dis)) / (dr * dr) + xc;
      const xb = (D * dy - sign * dx * Math.sqrt(dis)) / (dr * dr) + xc;
      const ya = (-1 * D * dx + Math.abs(dy) * Math.sqrt(dis)) / (dr * dr) + yc;
      const yb = (-1 * D * dx - Math.abs(dy) * Math.sqrt(dis)) / (dr * dr) + yc;
      return [
        { x: xa, y: ya },
        { x: xa, y: yb },
        { x: xb, y: ya },
        { x: xb, y: yb }
      ];
    }
  };

  const circleSegmentIntersection = (x0, y0, x1, y1, xc, yc, r) =>
    circleLineIntersection(x0, y0, x1, y1, xc, yc, r).filter(p =>
      between(p.x, x0, x1) &&
      between(p.y, y0, y1));

  const circleDistance = (c, p) => {
    const dx = p.x - c.x;
    const dy = p.y - c.y;
    return distance(dx, dy) - c.r;
  };

  const boxDistance = (b, p) => {
    const ox = Math.abs(p.x - b.x) - b.w;
    const oy = Math.abs(p.y - b.y) - b.h;
    const d = distance(Math.max(ox, 0), Math.max(oy, 0));
    const i = Math.max(Math.min(ox, 0), Math.min(oy, 0));
    return d + i;
  };

  const fitCircle = (sw, sh, p) => Math.min(
    ...raycasting.circles.map(c => circleDistance(c, p)),
    ...raycasting.boxes.map(b => boxDistance(b, p)),
    p.x,
    p.y,
    sw - p.x,
    sh - p.y);

  const translate = ({ x, y }, r, angle) => ({
    x: x + r * Math.cos(angle),
    y: y + r * Math.sin(angle)
  });

  const closest = (p, qs) => {
    let min, minDistance;
    for (const q of qs) {
      if (q) {
        const d = distance(p.x - q.x, p.y - q.y);
        if (minDistance === undefined || d < minDistance) {
          minDistance = d;
          min = q;
        }
      }
    }
    return min;
  };

  const intersections = (p, q, x, y, w, h) => ([
    segmentIntersection(p.x, p.y, q.x, q.y, x, y, x + w, y),
    segmentIntersection(p.x, p.y, q.x, q.y, x + w, y, x + w, y + h),
    segmentIntersection(p.x, p.y, q.x, q.y, x + w, y + h, x, y + h),
    segmentIntersection(p.x, p.y, q.x, q.y, x, y + h, x, y)
  ]);

  const drawShadows = (g, sw, sh, m) => {
    if (m && !raycasting.input && (raycasting.circles.length > 0 || raycasting.boxes.length > 0)) {
      const ps = [];
      const minDistance = fitCircle(sw, sh, m);
      for (const angle of raycasting.shadows.angles) {
        let p = m;
        let r = minDistance;
        while (r > 1) {
          p = translate(p, r, angle);
          r = fitCircle(sw, sh, p);
        }
        ps.push(p);
      }
      g.fillStyle = yellow;
      g.strokeStyle = yellow;
      for (const i of Generator.range(0, ps.length - 1)) {
        g.poly(m, ps[i], ps[i + 1]).strokeAndFill();
      }
      g.poly(m, ps[ps.length - 1], ps[0]).strokeAndFill();
    }
  };

  const drawSpirograph = (g, sw, sh, m) => {
    if (m && !raycasting.input) {
      const minDistance = fitCircle(sw, sh, m);

      g.strokeStyle = orange;
      g.circle(m.x, m.y, minDistance).stroke();

      for (const angle of raycasting.spirograph.angles) {
        const p = translate(m, minDistance, angle);
        const r = fitCircle(sw, sh, p);
        g.strokeStyle = magenta;
        g.circle(p.x, p.y, r).stroke();
      }
    }
  };

  const drawLineOfSight = (g, sw, sh, m) => {
    g.fillStyle = orange;
    g.dot(raycasting.target, 8).fill();
    if (m && !raycasting.input) {
      g.strokeStyle = yellow;
      g.line(m.x, m.y, raycasting.target.x, raycasting.target.y).stroke();
      const i = closest(raycasting.target, [
        ...intersections(raycasting.target, m, 0, 0, sw, sh),
        ...raycasting.boxes.flatMap(b => intersections(raycasting.target, m, b.x - b.w, b.y - b.h, b.w * 2, b.h * 2)),
        ...raycasting.circles.flatMap(c => circleSegmentIntersection(raycasting.target.x, raycasting.target.y, m.x, m.y, c.x, c.y, c.r))
      ]);
      if (i) {
        g.fillStyle = magenta;
        g.dot(i, 8).fill();
      }
    }
  };

  raycasting.draw = (g, sw, sh, m) => {
    g.fillStyle = base03;
    g.rect(0, 0, sw, sh).fill();

    g.strokeStyle = blue;
    for (const { x, y, r } of raycasting.circles) {
      g.circle(x, y, r).stroke();
    }

    for (const { x, y, w, h } of raycasting.boxes) {
      g.rect(x - w, y - h, w * 2, h * 2).stroke();
    }

    if (m && raycasting.input) {
      g.strokeStyle = green;
      if (raycasting.selectedShape === 'box') {
        const { x, y, w, h } = raycasting.inputShape(m.x, m.y);
        g.rect(x - w, y - h, w * 2, h * 2).stroke();
      } else if (raycasting.selectedShape === 'circle') {
        const { x, y, r } = raycasting.inputShape(m.x, m.y);
        g.circle(x, y, r).stroke();
      }
    }

    if (raycasting.mode === 'shadows') {
      drawShadows(g, sw, sh, m);
    } else if (raycasting.mode === 'line-of-sight') {
      drawLineOfSight(g, sw, sh, m);
    } else if (raycasting.mode === 'spirograph') {
      drawSpirograph(g, sw, sh, m);
    }
  };
}
