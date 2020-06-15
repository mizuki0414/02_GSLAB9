const width = window.innerWidth;
const height = window.innerHeight;

const centerX = width / 2;
const centerY = height / 2;

const radius = 200;
const colorLength = 24;

function createColoBelt(colorLength) {
  const hueStep = 360 / colorLength;
  const widthStep = width / colorLength;
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < colorLength; i++) {
    fill(hueStep * i, 100, 100);
    rect(i * widthStep, centerY - widthStep / 2, widthStep);
  }
}

function createColorWheel(colorLength) {
  const hueStep = 360 / colorLength;
  const angleStep = 360 / colorLength;
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < colorLength; i++) {
    fill(hueStep * i, 100, 100);
    noStroke();
    const x = sin(radians(angleStep * i + 180)) * -1 * radius + centerX;
    const y = cos(radians(angleStep * i + 180)) * radius + centerY;
    ellipse(x, y, 30);
  }
}

function createBrightnessBelt(step) {
  const rectwidth = 100;
  const rectheight = height / step;
  const bStep = 100 / step;
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < step; i++) {
    fill(240, 100, bStep * i);
    rect(centerX + rectwidth, rectheight * i, rectwidth, rectheight);
  }
}

function createSaturationBelt(step) {
  const rectwidth = 100;
  const rectheight = height / step;
  const SStep = 100 / step;
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < step; i++) {
    fill(240, SStep * i, 100);
    rect(centerX - rectwidth, rectheight * i, rectwidth, rectheight);
  }
}

function setup() {
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  // fill(240, 100, 100);
  // rect(centerX, centerY, 100);
  // createColoBelt(colorLength);
  // createColorWheel(colorLength);
  // createBrightnessBelt(10);
  // createSaturationBelt(10);
}

function draw() {}
