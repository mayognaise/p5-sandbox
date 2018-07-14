const hu = 360
const s = 100
const b = 100
let stats

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  colorMode(HSB, hu, s, b)
  rectMode(CENTER)
  noStroke()
  stats = new Stats()
}

function draw() {
  const y = map(mouseY, 0, height, 0, hu)
  const w = width / 2
  const h = height / 2
  background(y, s, b)
  fill(h - y, s, b)
  rect(0, 0, w, h)
  stats.update()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
