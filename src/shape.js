class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.index = 0;
    this.shapes = [];
  }

  getShapes() {
    return this.shapes[this.index].map(([a, b]) => [this.x + a, this.y + b]);
  }

  left() {
    this.x -= 1;
  }

  right() {
    this.x += 1;
  }

  down() {
    this.y += 1;
  }

  transform() {
    if (this.index === this.shapes.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }
}

class OShape extends Shape {
  shapes = [
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, -1],
    ],
  ];
}

class IShape extends Shape {
  shapes = [
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [-1, 0],
      [1, 0],
      [2, 0],
    ],
  ];
}
class SShape extends Shape {
  shapes = [
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [1, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, -1],
      [1, 1],
    ],
  ];
}

class ZShape extends Shape {
  shapes = [
    [
      [0, 0],
      [1, 0],
      [0, -1],
      [-1, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, -1],
    ],
  ];
}

class LShape extends Shape {
  shapes = [
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [1, 1],
    ],
    [
      [0, 0],
      [-1, 0],
      [1, 0],
      [1, -1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, -1],
      [-1, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [-1, 0],
      [-1, 1],
    ],
  ];
}

class JShape extends Shape {
  shapes = [
    [
      [0, 0],
      [0, -1],
      [0, 1],
      [-1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [-1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, -1],
      [1, -1],
    ],
    [
      [0, 0],
      [1, 0],
      [-1, 0],
      [-1, -1],
    ],
  ];
}

class TShape extends Shape {
  shapes = [
    [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, -1],
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 1],
    ],
  ];
}

const Shapes = [OShape, IShape, SShape, ZShape, LShape, JShape, TShape];

function createShape(x, y) {
  const index = Math.floor(Math.random() * Shapes.length);
  return new Shapes[index](x, y);
}
