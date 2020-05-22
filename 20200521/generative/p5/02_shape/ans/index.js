const width = window.innerWidth;
const height = window.innerHeight;

const centerX = width / 2;
const centerY = height / 2;

function setup() {
  createCanvas(width, height);
  const r = 100;
  const ellipseLength = 10;
  const angleStep = 360 / ellipseLength;

  ellipse(centerX, centerY, r * 2);
  fill("#333333");
  for (let i = 0; i < ellipseLength; i++) {
    const x = sin(radians(angleStep * i)) * r + centerX;
    const y = cos(radians(angleStep * i)) * r + centerY;
    ellipse(x, y, 10);
  }
}

function draw() {}
