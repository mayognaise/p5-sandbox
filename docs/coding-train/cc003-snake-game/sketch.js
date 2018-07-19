let snake
let food
let scl
const cols = rows = 16

function setup() {
  createCanvas(windowWidth, windowHeight)
  scl = floor(min(width, height) / cols)
  frameRate(3)
  snake = new Snake()
  resetFoodLocation()
  background(50)
  noStroke()
}

function resetFoodLocation() {
  const fp = createVector(floor(random(cols)), floor(random(rows)))
  const sp = snake.getPos()
  const d = sp.dist(fp)
  if (d < 10) {
    return resetFoodLocation()
  }
  food = fp
}

function draw() {
  // bg
  fill(0)
  rect(0, 0, cols * scl, rows * scl)
  // snake
  snake.update()
  snake.death()
  if (snake.ateFood()) {
    resetFoodLocation()
    snake.addTail()
  }
  snake.show()
  // food
  fill(255, 0, 100)
  rect(food.x * scl, food.y * scl, scl, scl)
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      snake.setDir(0, -1)
      break
    case DOWN_ARROW:
      snake.setDir(0, 1)
      break
    case RIGHT_ARROW:
      snake.setDir(1, 0)
      break
    case LEFT_ARROW:
      snake.setDir(-1, 0)
      break
    default:
      break
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
