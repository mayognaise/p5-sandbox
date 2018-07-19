let ship
let scl
const cols = rows = 16

function setup() {
  createCanvas(windowWidth, windowHeight)
  scl = floor(min(width, height) / cols)
  frameRate(3)
  ship = new Ship()
  noStroke()
  rectMode(CENTER)
  // for arrow keypads
  new ArrowKeys(arrowKeyPressed, arrowKeyReleased)
}

function draw() {
  // bg
  background(50)
  fill(0)
  translate(cols * scl / 2, rows * scl)
  rect(0, rows * scl / -2, cols * scl, rows * scl)
  // ship
  ship.update()
  ship.show()
}

function arrowKeyPressed(key) {
  switch (key) {
    case RIGHT_ARROW:
      ship.setDir(1, 0)
      break
    case LEFT_ARROW:
      ship.setDir(-1, 0)
      break
    default:
      break
  }
}

function arrowKeyReleased(key) {
  switch (key) {
    case RIGHT_ARROW:
    case LEFT_ARROW:
      ship.setDir(0, 0)
      break
    default:
      break
  }
}

function keyPressed() {
  arrowKeyPressed(keyCode)
}

function keyReleased() {
  arrowKeyReleased(keyCode)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
