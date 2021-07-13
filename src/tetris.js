const NEXT_ROWS = 4;
const NEXT_COLUMNS = 4;

const BLOCKS_ROWS = 20;
const BLOCKS_COLUMNS = 10;

const PER_LINE_SCORE = 10;

const SCORE_INTERVALS = {
  500: 750,
  1000: 700,
  1500: 650,
  2000: 600,
  3500: 550,
  4000: 500,
  4500: 450,
  5000: 400,
};

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
  isPaused = false;
  isEnded = false;

  timer = null;
  current = null;
  next = null;

  score = 0;
  lines = 0;
  level = 1;
  interval = 100;

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
    // this.controller = new Controller(this);

    this.initBlocks();
  }

  containFilled(id) {
    return document.getElementById(id).getAttribute("class").includes("filled");
  }

  addFilled(id) {
    const node = document.getElementById(id);
    const className = node.getAttribute("class");
    node.setAttribute("class", `${className} filled`);
  }

  removeFilled(id) {
    const node = document.getElementById(id);
    const className = node.getAttribute("class");
    node.setAttribute("class", `${className.replace(/\sfilled/g, "")}`);
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
    if (this.boundary.isReachBottom()) {
      this.current = Object.create(this.next);
      this.current.x = 6;
      this.drawer.drawBlock(this.current);
      this.drawer.clearNext(this.next);
      this.next = createShape(2, 2);
      this.drawer.drawNext(this.next);
      //   // 消行
      //   if (this.boundary.canClearLines()) {
      //     const clearLines = this.boundary.getClearLines();
      //     this.score += clearLines * PER_LINE_SCORE;
      //     this.drawer.clearLines();
      //   }
      //   // 结束游戏
      //   if (this.boundary.isEndGame()) {
      //     this.end();
      //     // 下一轮循环
      //   } else {
      //     this.current = this.next;
      //     this.current.x = 5;
      //     this.drawer.drawBlock(this.current);
      //     this.drawer.clearNext(this.next);
      //     this.next = createShape(2, 2);
      //     this.drawer.drawNext(this.next);
      //   }
      //   // 如果没触底，则重绘下移之后的当前图形
    } else {
      this.drawer.clearBlock(this.current);
      this.current.down();
      this.drawer.drawBlock(this.current);
    }
  }

  start() {
    if (this.isEnded) return;
    this.isPaused = false;
    this.game();
    this.timer = setInterval(this.game.bind(this), this.interval);
  }

  pause() {
    if (this.isEnded) return;
    this.isPaused = true;
    clearInterval(this.timer);
  }

  end() {
    alert("游戏结束");
    this.isEnded = true;
    clearInterval(this.timer);
  }

  restart() {
    // 停止循环器
    clearInterval(this.timer);
    // 清空所有绘制图形
    this.drawer.clearAll();
    // 重置所有参数
    this.isEnded = false;
    this.isPaused = false;
    this.current = null;
    this.next = null;
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.interval = 100;
    // 开始游戏
    this.start();
  }
}
