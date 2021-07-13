class Controller {
  constructor(tetris) {
    this.tetris = tetris;
  }

  init() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyPress", this.onKeyPress);
    document.addEventListener("keyup", this.onKeyUp);
  }

  destroy() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyPress", this.onKeyPress);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyDown() {}

  onKeyPress() {}

  onKeyUp() {}
}
