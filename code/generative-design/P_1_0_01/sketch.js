const h = 360
const s = 100
const b = 100
let stats

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(HSB, h, s, b)
  rectMode(CENTER)
  noStroke()
  stats = new Stats()
  new ReadMe(['README.md', 'sketch.js'])
}

function draw() {
  const y = map(mouseY, 0, height, 0, h)
  const hgt = map(mouseX, 0, width, 0, height)
  background(y, s, b)
  fill(h - y, s, b)
  rect(0, 0, mouseX, hgt)
  stats.update(floor(frameRate()))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
