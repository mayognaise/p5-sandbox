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
  cam = createCapture(VIDEO, console.log)
  cam.size(width, height)
}

function draw() {
  ambientLight(255)
  background(175)
  noStroke()
  push()
  rotateX(angle)
  rotateY(angle * .3)
  rotateZ(angle * .2)
  texture(cam)
  // torus(150, 80)
  // sphere(100)
  box(200)
  angle += .01
  pop()

  push()
  texture(kitten)
  translate(400, 0, 0)
  box(200)
  pop()

  translate(-400, 0, 0)
  fill(0, 0, 255)
  plane(200, 200)
  // noLoop()
}
