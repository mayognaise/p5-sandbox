const h = 360
const s = 100
const b = 100

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB, h, s, b)
  rectMode(CENTER)
  noStroke()
}

function draw() {
  const y = map(mouseY, 0, height, 0, h)
  const hgt = map(mouseX, 0, width, 0, height)
  background(y, s, b)
  fill(h - y, s, b)
  rect(width / 2, height / 2, mouseX, hgt)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
