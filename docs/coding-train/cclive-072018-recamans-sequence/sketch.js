let count = 1
let index = 0
const numbers = []
const sequence = []
let scl

const arcs = []
let biggest = 0

const arcDiv = 30
let arcCount = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  // frameRate(1)
}

function draw() {
  if (arcCount % arcDiv === 0) {
    step()
  }
  background(0)
  arcCount++
  translate(0, height / 2)
  scl = width / biggest
  // const scl = lerp(width, biggest)
  scale(scl)
  // scale(40)
  arcs.forEach(arc => arc.show())
}

function step() {
  let next = index - count
  let backwards = true
  if (next <= 0 || numbers[next]) {
    next = index + count
    backwards = false
  }
  numbers[next] = true
  sequence.push(next)

  const a = new Arc(index, next, count % 2, backwards)
  arcs.push(a)

  index = next
  if (index > biggest) {
    biggest = index
  }
  count++
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
