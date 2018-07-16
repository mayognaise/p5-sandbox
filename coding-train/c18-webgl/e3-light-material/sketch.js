let angle = 0

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  // ambientLight(0, 0, 255)
  pointLight(0, 255, 255, 1, -windowWidth/2, -windowHeight/2, 400)
  const dx = mouseX - windowWidth / 2
  const dy = mouseY - windowHeight / 2
  let v = createVector(dx, dy, 0)
  v.div(100)
  directionalLight(255, 0, 255, 1, v)
  background(175)
  rotateX(angle)
  rotateY(angle * .3)
  rotateZ(angle * .2)
  rectMode(CENTER)
  // fill(0,255,0)
  // normalMaterial()
  ambientMaterial(0, 255, 255)
  noStroke()
  // rect(0, 0, 200, 200)
  // box(10, 100, 50)

  torus(150, 80)
  // sphere(100)
  angle += .01
}
