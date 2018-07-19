class Drop {
  constructor() {
    this.topY = height / -1.5
    const y = map(random(), 0, 1, this.topY * -1, this.topY)
    this.reset(y)
    noStroke()
    fill(138, 43, 226)
  }
  reset(y0) {
    const x = map(random(), 0, 1, width / -2, width / 2)
    const y = y0 || this.topY
    const z = random()
    this.pos = createVector(x, y, z)
    this.v = createVector(0, random(10) + 2, 0)
    this.g = createVector(0, .5, 0)
  }
  update() {
    this.v.add(this.g)
    this.pos.add(this.v)
    if (this.pos.y > height / 1.5) {
      this.reset()
    }
  }
  show() {
    push()
    translate(this.pos.x, this.pos.y, this.pos.z)
    box(1, height / 10, 1)
    pop()
  }
}
