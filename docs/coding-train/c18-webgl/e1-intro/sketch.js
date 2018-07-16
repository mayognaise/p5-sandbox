let angle = 0

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  background(175)
  rotateX(PI/3)
  rotateZ(angle)
  rectMode(CENTER)
  fill(0,255,0)
  rect(0, 0, 200, 200)
  angle += .01
}
