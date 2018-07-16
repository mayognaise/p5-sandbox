function setup() {
  createCanvas(windowWidth, windowHeight)
  // for debug
  new Playback()
  new ReadMe(['README.md', 'sketch.js'])
}

function draw() {
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
