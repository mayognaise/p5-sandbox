function setup() {
  createCanvas(windowWidth, windowHeight)
  // for debug
  new Playback()
  new ReadMe(['README.md', 'sketch.js'])
}

function draw() {
  background(0)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
