let sponge = []
let count = 3
let stats

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  const size = Math.min(windowWidth, windowHeight) / 2
  sponge.push(new Box(0, 0, 0, size))
  // for debug
  stats = new Stats()
  new Playback()
  new ReadMe(['README.md', 'sketch.js', 'Box.js'])
}

function draw() {
  background(0)
  ambientLight(100);
  directionalLight(255, 255, 255, 0.25, 0.25, 0)
  const angleY = map(mouseX, 0, width, PI, 0)
  const angleX = map(mouseY, 0, height, PI, 0)
  rotateX(angleX)
  rotateY(angleY)
  sponge.forEach(box => {
    box.show()
  })
  stats.update(floor(frameRate()))
}

function mousePressed() {
  count--
  if (count < 0) { return }
  let nextSponge = []
  sponge.forEach(box => {
    nextSponge = nextSponge.concat(box.generate())
  })
  sponge = nextSponge
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
