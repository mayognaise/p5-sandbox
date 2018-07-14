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
  new ReadMe(['sketch.js', 'README.md'])
}

function draw() {
  const y = map(mouseY, 0, height, 0, h)
  const wdt = width / 2
  const hgt = height / 2
  background(y, s, b)
  fill(hgt - y, s, b)
  rect(0, 0, wdt, hgt)
  stats.update()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
