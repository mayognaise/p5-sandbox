let count = 1
let index = 0
const numbers = []
const arcs = []
let biggest = 0

const arcDiv = 30
let arcCount = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  if (arcCount % arcDiv === 0) {
    step()
  }
  background(0)
  arcCount++
  translate(0, height / 2)
  const scl = width / biggest
  // const scl = lerp(width, biggest)
  scale(scl)
  for (let arc of arcs) {
    arc.show()
  }
}

function step() {
  let next = index - count
  let backward = true
  if (next <= 0 || numbers[next]) {
    next = index + count
    backward = false
  }
  numbers[next] = true
  const arc = new Arc(index, next, count % 2, backward, arcs.length)
  arcs.push(arc)

  index = next
  if (index > biggest) {
    biggest = index
  }
  count++
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
