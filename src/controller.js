class Controller {
  constructor(tetris) {
    this.tetris = tetris;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  addEvent() {
    document.addEventListener("keydown", this.onKeyDown, true);
  }

  removeEvent() {
    document.removeEventListener("keydown", this.onKeyDown, true);
  }

  onKeyDown(e) {
    const keyCode = e.keyCode;
    const { boundary, drawer, current } = this.tetris;
    switch (keyCode) {
      // up
      case 38:
        if (boundary.canTransform()) {
          drawer.clearBlock(current);
          current.transform();
          drawer.drawBlock(current);
        }
        break;
      // right
      case 39:
        if (boundary.canMoveRight()) {
          drawer.clearBlock(current);
          current.right();
          drawer.drawBlock(current);
        }
        break;
      // down
      case 40:
        if (boundary.canMoveDown()) {
          drawer.clearBlock(current);
          current.down();
          drawer.drawBlock(current);
        }
        break;
      // left
      case 37:
        if (boundary.canMoveLeft()) {
          drawer.clearBlock(current);
          current.left();
          drawer.drawBlock(current);
        }
        break;
    }
  }
}
