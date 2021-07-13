class Boundary {
  constructor(tetris) {
    this.tetris = tetris;
  }

  isReachBottom() {
    const shape = this.tetris.current;
    // 判断是否接触到边界底部
    const outerShapes = shape
      .getShapes()
      .filter(([x, y]) => !document.getElementById(`blocks_${x}_${y + 1}`));
    if (outerShapes.length) return true;
    // 判断碰撞
    const bottomShapes = shape
      .getShapes()
      .filter(([x, y]) => !this.tetris.containFilled(`blocks_${x}_${y + 1}`));
    const blockedShapes = bottomShapes.filter(([x, y]) =>
      this.tetris.containFilled(`blocks_${x}_${y + 1}`)
    );
    return blockedShapes.length !== 0;
  }

  canClearLines() {}

  getClearLines() {}

  isEndGame() {}
}
