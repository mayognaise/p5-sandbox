let snake
let food
let scl = 20
let cols
let rows

function setup() {
  createCanvas(windowWidth, windowHeight)
  frameRate(5)
  cols = rows = floor(min(width, height) / scl)
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
  fill(0)
  rect(0, 0, cols * scl, rows * scl)
  snake.update()
  snake.death()
  snake.show()
  if (snake.ateFood()) {
    resetFoodLocation()
    snake.addTail()
  }

  
  fill(255, 0, 100)
  rect(food.x * scl, food.y * scl, scl, scl)
}

function keyPressed() {
  switch(keyCode) {
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
