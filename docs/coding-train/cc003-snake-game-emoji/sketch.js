let snake
let food
let foodEmoji
let foodEmojis = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🌶', '🌽', '🥕', '🥔', '🍠', '🥐', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🥞', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍧', '🍨', '🍦', '🥧', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜']
let foodCount = 0
let scl
let lineHeight = 1
const cols = rows = 16

function setup() {
  createCanvas(windowWidth, windowHeight)
  scl = floor(min(width, height) / cols)
  textSize(scl)
  frameRate(3)
  snake = new Snake()
  foodEmojis = shuffle(foodEmojis)
  resetFood()
  noStroke()
  // for arrow keypads
  new ArrowKeys(arrowKeyPressed)
}

function resetFood() {
  const fp = createVector(floor(random(cols)), floor(random(rows)))
  const sp = snake.getPos()
  const d = sp.dist(fp)
  if (d < 6) {
    return resetFood()
  }
  foodEmoji = foodEmojis[foodCount++ % foodEmojis.length]
  food = fp
}

function draw() {
  // bg
  background(50)
  fill(0)
  rect(0, 0, cols * scl, rows * scl)
  // snake
  snake.update()
  snake.death()
  snake.show()
  if (snake.ateFood()) {
    snake.addTail(foodEmoji)
    resetFood()
  }
  // food
  text(foodEmoji, food.x * scl, (food.y + lineHeight) * scl)
}

function arrowKeyPressed(key) {
  switch (key) {
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

function keyPressed() {
  arrowKeyPressed(keyCode)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
