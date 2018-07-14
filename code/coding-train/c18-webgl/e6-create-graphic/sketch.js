let graphics
let love

const boxSize = 200

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  // graphics = createGraphics(boxSize, boxSize)
  // graphics.background(255)
  love = createGraphics(300, 100)
  love.background(100)
  love.fill(255)
  love.textAlign(CENTER)
  love.textSize(100)
  love.translate(0, 30, 0)
  love.text('love', 150, 50)
}

function draw() {
  background(0)
  // graphics.fill(255, 0, 255)
  // graphics.ellipse(mouseX, mouseY, 20)
  ambientLight(255)
  noStroke()
  texture(love)
  // texture(graphics)
  rotateX(45)
  // rotateZ(45)
  // box(boxSize)
  plane(300, 100)
}
