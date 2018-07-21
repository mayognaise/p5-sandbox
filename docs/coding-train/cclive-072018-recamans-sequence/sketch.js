const numbers = []
const arcs = []
let count = 1
let index = 0
let biggest = 0
let scl = 0

// for stroke animation
const arcDiv = 30
let arcCount = 0

// for sound
const attackLevel = 1.0
const releaseLevel = 0
const attackTime = .001
const decayTime = .1
const susPercent = .2
const releaseTime = .03
let osc
let env

function setup() {
  createCanvas(windowWidth, windowHeight)

  env = new p5.Env()
  env.setADSR(attackTime, decayTime, susPercent, releaseTime)
  env.setRange(attackLevel, releaseLevel)

  osc = new p5.Oscillator()
  osc.setType('sine')
  osc.amp(env)
  osc.start()
}

function draw() {
  if (arcCount % arcDiv === 0) {
    step()
  }
  background(0)
  arcCount++
  translate(0, height / 2)
  scl = lerp(scl, width / biggest, .1)
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

  const n = index % 25 + 40 // C4 Middle C (40) - C6 Soprano C (High C) (64)
  const freq = pow(2, (n - 49) / 12) * 440
  osc.freq(freq)
  env.play()

  index = next
  if (index > biggest) {
    biggest = index
  }

  count++
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
