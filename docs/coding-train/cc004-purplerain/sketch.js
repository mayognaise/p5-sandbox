const drops = []
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  for (let i = 0; i < min(400, width / 2); i++) {
    drops.push(new Drop())
  }
}

function draw() {
  background(230, 230, 250)
  drops.forEach(drop => {
    drop.update()
    drop.show()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
