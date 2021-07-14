function toggleShape(shape, suffix, isShape) {
  shape.getShapes().forEach(([x, y]) => {
    const id = `${suffix}_${x}_${y}`;
    const hasShape = hasClassName(id, "shape");
    if (isShape) {
      if (!hasShape) {
        addClassName(id, "shape");
      }
    } else {
      if (hasShape) {
        removeClassName(id, "shape");
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
    toggleShape(shape, "blocks", false);
  }

  drawBlock(shape) {
    toggleShape(shape, "blocks", true);
  }

  clearNext(shape) {
    toggleShape(shape, "next", false);
  }

  drawNext(shape) {
    toggleShape(shape, "next", true);
  }

  drawShape(shape) {
    shape.getShapes().forEach(([x, y]) => {
      const id = `blocks_${x}_${y}`;
      removeClassName(id, "shape");
      addClassName(id, "fill");
    });
  }

  clearLines() {}

  clearAll() {}
}
