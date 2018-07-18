let snake
let food
let scl = 20
let cols
let rows

function setup() {
  createCanvas(windowWidth, windowHeight)
  snake = new Snake(scl)
  frameRate(10)
  cols = floor(width / scl)
  rows = floor(height / scl)
  food = pickLocation()
}

function pickLocation() {
  const v = createVector(floor(random(cols)), floor(random(rows)))
  return v.mult(scl)
}

function draw() {
  background(0)
  snake.update()
  snake.show()

  
  fill(255, 0, 100)
  rect(food.x, food.y, scl, scl)
}

function keyPressed() {
  switch(keyCode) {
    case UP_ARROW:
      snake.dir(0, -1)
      break
    case DOWN_ARROW:
      snake.dir(0, 1)
      break
    case RIGHT_ARROW:
      snake.dir(1, 0)
      break
    case LEFT_ARROW:
      snake.dir(-1, 0)
      break
    default:
      break
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
