/**
 * https://p5js.org/reference/#/p5/camera
 * https://p5js.org/reference/#/p5/perspective
 */

let angle = 0
let kitten
let cam

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function preload() {
  kitten = loadImage('../../images/kitten.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  const camX = map(mouseX, 0, width, windowWidth / 2, -windowWidth / 2)
  const camY = map(mouseY, 0, width, windowHeight/2, -windowHeight/2)
  camera(camX, camY, (height / 2.0) / tan(PI * 30.0 / 180.0), camX, camY, 0, 0, 1, 0)
  // ortho()
  background(175)
  noStroke()
  texture(kitten)
  const boxSize = 200
  const len = 4
  for (let index = 0; index < len; index++) {
    push()
    const x0 = boxSize * (index - (len - 1) / 2) * 1.45
    translate(x0, 0, 0)
    rotateX(45)
    rotateZ(45)
    box(boxSize)
    pop()
  }
}
