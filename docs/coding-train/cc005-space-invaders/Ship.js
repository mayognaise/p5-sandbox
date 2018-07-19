class Ship {
  constructor() {
    this.pos = createVector(0, 0)
    this.v = createVector(0, 0)
  }
  getPos() {
    return this.pos
  }
  setDir(xs, ys) {
    this.v = createVector(xs, ys)
  }
  update() {
    const v = p5.Vector.add(this.pos, this.v)
    if (v.x < cols / -2 || v.x > cols / 2) {
      this.v.mult(0)
    }
    this.pos.add(this.v)
  }
  show() {
    fill(0, 255, 0)
    this.draw(this.pos)
  }
  draw(pos) {
    rect(pos.x * scl, pos.y * scl - scl / 2, scl / 2, scl)
  }
}
