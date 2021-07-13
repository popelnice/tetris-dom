function toggleFilled(tetris, shape, suffix, isFilled) {
  shape.getShapes().forEach(([x, y]) => {
    const id = `${suffix}_${x}_${y}`;
    const containerFilled = tetris.containFilled(id);
    if (isFilled) {
      if (!containerFilled) {
        tetris.addFilled(id);
      }
    } else {
      if (containerFilled) {
        tetris.removeFilled(id);
      }
    }
  });
}

class Drawer {
  constructor(tetris) {
    this.tetris = tetris;
  }

  drawStatus() {
    this.tetris.scoreContainer.innerText = this.tetris.score;
    this.tetris.linesContainer.innerText = this.tetris.lines;
    this.tetris.levelContainer.innerText = this.tetris.level;
  }

  clearBlock(shape) {
    toggleFilled(this.tetris, shape, "blocks", false);
  }

  drawBlock(shape) {
    toggleFilled(this.tetris, shape, "blocks", true);
  }

  clearNext(shape) {
    toggleFilled(this.tetris, shape, "next", false);
  }

  drawNext(shape) {
    toggleFilled(this.tetris, shape, "next", true);
  }

  clearLines() {}

  clearAll() {}
}
