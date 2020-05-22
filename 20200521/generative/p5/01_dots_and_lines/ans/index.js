const width = window.innerWidth;
const height = window.innerHeight;

const centerX = width / 2;
const centerY = height / 2;

function setup() {
  createCanvas(width, height);
  stroke("purple");
  strokeWeight(10);
  for (let i = 0; i < width; i++) {
    point(i, centerY);
  }
}

function draw() {}
