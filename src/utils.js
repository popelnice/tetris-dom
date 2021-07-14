const NEXT_ROWS = 4;
const NEXT_COLUMNS = 4;

const BLOCKS_ROWS = 20;
const BLOCKS_COLUMNS = 10;

const PER_LINE_SCORE = 10;

const INI_INTERVAL = 800;

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

function hasClassName(id, className) {
  return document.getElementById(id).getAttribute("class").includes(className);
}

function addClassName(id, className) {
  const node = document.getElementById(id);
  node.setAttribute("class", `${node.getAttribute("class")} ${className}`);
}

function removeClassName(id, className) {
  const node = document.getElementById(id);
  node.setAttribute(
    "class",
    `${node
      .getAttribute("class")
      .replace(new RegExp(`\\s${className}`, "g"), "")}`
  );
}
