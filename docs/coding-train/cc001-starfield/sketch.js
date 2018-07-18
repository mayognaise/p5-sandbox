const stars = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  for (let index = 0; index < 400; index++) {
    stars.push(new Star())
  }
}

function draw() {
  background(0)
  translate(width / 2, height / 2)
  const speed = map(mouseX, 0, width, 10, 20)
  stars.forEach(star => {
    star.update(speed)
    star.show()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
