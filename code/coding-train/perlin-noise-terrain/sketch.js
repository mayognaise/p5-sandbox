let w, h
let cols, rows
const scl = 25
let flying = 0
const terrain = []

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  w = windowWidth * 1.5
  h = windowHeight
  cols = w / scl
  rows = h / scl
  for (var x = 0; x < cols; x++) {
    terrain[x] = []
  }
}

function draw() {
  if (toggle) {
    flying -= 0.1
  }
  let yoff = flying
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100)
      xoff += 0.2
    }
    yoff += 0.2
  }

  background(0)
  // stroke(255)
  // strokeWeight(1)
  noStroke()
  // noFill()
  // fill(80)
  // normalMaterial()
  translate(0, h / 10)
  rotateX(PI / 3)
  // rotateX(map(mouseX, 0, width, PI / 3, PI / 1.5))
  // rotateZ(map(mouseY, 0, height, 0, PI))
  translate(w / -2, h / -2)
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < cols - 1; x++) {
      fill(y * 5)
      vertex(x * scl, y * scl, terrain[x][y])
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1])
    }
    endShape(CLOSE)
  }
  // noLoop()
}

let toggle = true

function mouseClicked() {
  console.log(frameRate())
  toggle = !toggle
  toggle ? loop() : noLoop()
}