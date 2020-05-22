const width = window.innerWidth;
const height = window.innerHeight;

const centerX = width / 2;
const centerY = height / 2;

let xStep = 0;
let noiseStep = 0;

let velocity = 1;
let accelaration = 0;

function setup() {
  createCanvas(width, height);
  strokeWeight(1);
  // point(centerX, centerY);
}

function draw() {
  // accelaration += 0.3;
  velocity += accelaration;
  // console.log(velocity + accelaration);
  if (mouseIsPressed) {
    accelaration += 0.02;
  } else {
    accelaration -= 0.01;
  }
  background("rgba(255,255,255,0.1)");
  ellipse(centerX + velocity, centerY, 20);
}
