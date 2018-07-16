const scl = 25
const terrain = []
let stats
let w, h
let cols, rows
let flying = 0

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  w = windowWidth * 2
  h = windowHeight * 1.5
  cols = w / scl
  rows = h / scl
  for (var x = 0; x < cols; x++) {
    terrain[x] = []
  }
  // for debug
  stats = new Stats()
  new Playback()
  new ReadMe(['README.md', 'sketch.js'])
}

function draw() {
  flying -= map(mouseY, 0, height, 0.005, 0.01)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(x / 10, y / 10 + flying), 0, 1, -100, 100)
    }
  }

  background(0)
  noStroke()
  rotateX(PI / 3)
  rotateZ(map(mouseX, 0, height, PI / -15, PI / 2))
  translate(w / -2, h / -2)
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < cols - 1; x++) {
      fill(map(y, 0, rows, 0, 255))
      vertex(x * scl, y * scl, terrain[x][y])
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1])
    }
    endShape(CLOSE)
  }
  stats.update(floor(frameRate()))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
