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
  translate(mouseX - width / 2, mouseY - height / 2)
  rotateZ(angle)
  rectMode(CENTER)
  fill(0,255,0)
  strokeWeight(1)
  // rect(0, 0, 200, 200)
  // box(10, 100, 50)
  torus(150, 10)
  angle += .01
}
