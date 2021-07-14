function isOutOfBorder(shape) {
  const shapes = shape
    .getShapes()
    .filter(([x, y]) => !document.getElementById(`blocks_${x}_${y}`));
  return shapes.length !== 0;
}

function isTouchBlocks(shape) {
  const shapes = shape
    .getShapes()
    .filter(([x, y]) => hasClassName(`blocks_${x}_${y}`, "fill"));
  return shapes.length !== 0;
}

class Boundary {
  constructor(tetris) {
    this.tetris = tetris;
  }

  canMoveLeft() {
    const shape = Object.create(this.tetris.current);
    shape.x -= 1;
    return !(isOutOfBorder(shape) || isTouchBlocks(shape));
  }

  canMoveRight() {
    const shape = Object.create(this.tetris.current);
    shape.x += 1;
    return !(isOutOfBorder(shape) || isTouchBlocks(shape));
  }

  canMoveDown() {
    const shape = Object.create(this.tetris.current);
    shape.y += 1;
    return !(isOutOfBorder(shape) || isTouchBlocks(shape));
  }

  canTransform() {
    const shape = Object.create(this.tetris.current);
    shape.transform();
    return !(isOutOfBorder(shape) || isTouchBlocks(shape));
  }

  canClearLines() {
    let clearColumns = 0;
    for (let y = BLOCKS_ROWS; y > 0; y--) {
      clearColumns = 0;
      for (let x = BLOCKS_COLUMNS; x > 0; x--) {
        if (hasClassName(`blocks_${x}_${y}`, "fill")) clearColumns++;
      }
      if (clearColumns === BLOCKS_COLUMNS) {
        return true;
      }
    }
    return false;
  }

  getClearLines() {
    let clearColumns = 0;
    let clearLines = 0;
    for (let y = BLOCKS_ROWS; y > 0; y--) {
      clearColumns = 0;
      for (let x = BLOCKS_COLUMNS; x > 0; x--) {
        if (hasClassName(`blocks_${x}_${y}`, "fill")) clearColumns++;
      }
      if (clearColumns === BLOCKS_COLUMNS) {
        clearLines++;
      }
    }
    return clearLines;
  }

  isEndGame() {}
}
