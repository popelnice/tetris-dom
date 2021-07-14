const defaultOpts = {
  game: {
    blocks: "blocks",
  },
  panel: {
    score: "score",
    lines: "lines",
    level: "level",
    next: "next",
  },
};

function createBlocks(rows, columns, parent, suffix) {
  let row = (column = 0);
  for (let i = 0; i < rows; i++) {
    row++;
    column = 0;
    for (let j = 0; j < columns; j++) {
      column++;
      const block = document.createElement("div");
      block.setAttribute("class", "block");
      block.setAttribute("id", `${suffix}_${column}_${row}`);
      parent.appendChild(block);
    }
  }
}

class Tetris {
  isPaused = true;
  isEnded = false;

  timer = null;
  current = null;
  next = null;

  score = 0;
  lines = 0;
  level = 1;
  interval = INI_INTERVAL;

  constructor(opts = {}) {
    this.options = Object.assign({}, defaultOpts, opts);

    const { blocks } = this.options.game;
    const { next, score, lines, level } = this.options.panel;

    this.scoreContainer = document.getElementById(score);
    this.linesContainer = document.getElementById(lines);
    this.levelContainer = document.getElementById(level);
    this.blocksContainer = document.getElementById(blocks);
    this.nextContainer = document.getElementById(next);

    this.drawer = new Drawer(this);
    this.boundary = new Boundary(this);
    this.controller = new Controller(this);

    this.initBlocks();
  }

  initBlocks() {
    createBlocks(BLOCKS_ROWS, BLOCKS_COLUMNS, this.blocksContainer, "blocks");
    createBlocks(NEXT_ROWS, NEXT_COLUMNS, this.nextContainer, "next");
  }

  game() {
    // 绘制游戏状态
    this.drawer.drawStatus();

    // 如果没有当前图形，则创建一个当前和下一个图形，并绘制图形
    if (!this.current) {
      this.current = createShape(6, 2);
      this.next = createShape(2, 2);
      this.drawer.drawBlock(this.current);
      this.drawer.drawNext(this.next);
    }

    // 判断触底
    if (this.boundary.canMoveDown()) {
      this.drawer.clearBlock(this.current);
      this.current.down();
      this.drawer.drawBlock(this.current);
    } else {
      // 消行
      if (this.boundary.canClearLines()) {
        const clearLines = this.boundary.getClearLines();
        this.score += clearLines * PER_LINE_SCORE;
        this.drawer.clearLines();
      }

      // 结束游戏
      if (this.boundary.isEndGame()) {
        this.end();
        // 下一轮循环
      } else {
        this.drawer.drawShape(this.current);

        this.current = Object.create(this.next);
        this.current.x = 6;
        this.drawer.drawBlock(this.current);

        this.drawer.clearNext(this.next);
        this.next = createShape(2, 2);
        this.drawer.drawNext(this.next);
      }
    }
  }

  start() {
    if (this.isEnded || !this.isPaused) return;
    this.isPaused = false;
    this.game();
    this.controller.addEvent();
    this.timer = setInterval(this.game.bind(this), this.interval);
  }

  pause() {
    if (this.isEnded || this.isPaused) return;
    this.isPaused = true;
    this.controller.removeEvent();
    clearInterval(this.timer);
  }

  end() {
    alert("游戏结束");
    this.isEnded = true;
    this.controller.removeEvent();
    clearInterval(this.timer);
  }

  restart() {
    // 停止循环器
    clearInterval(this.timer);
    // 清空所有绘制图形
    this.drawer.clearAll();
    // 重置所有参数
    this.isEnded = false;
    this.isPaused = true;
    this.current = null;
    this.next = null;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.interval = INI_INTERVAL;
    // 开始游戏
    this.start();
  }
}
