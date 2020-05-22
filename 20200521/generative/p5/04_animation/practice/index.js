const width = window.innerWidth;
const height = window.innerHeight;

const centerX = width / 2;
const centerY = height / 2;

let xStep = 0;
function setup() {}

function draw() {
  xStep += 0.01;
  ellipse(0 + xStep, centerY, 100);
}
