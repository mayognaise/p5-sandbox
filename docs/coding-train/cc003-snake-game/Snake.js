class Snake {
  constructor() {
    this.pos = createVector(0, 0)
    this.v = createVector(1, 0)
    this.tails = []
  }
  getPos() {
    return this.pos
  }
  setDir(xs, ys) {
    this.v = createVector(xs, ys)
  }
  ateFood() {
    return this.pos.dist(food) < 1
  }
  addTail() {
    this.tails.unshift(this.pos.copy())
  }
  death() {
    const tail = this.tails.find(t => this.pos.dist(t) < 1)
    if (!tail) { return }
    this.tails = []
  }
  update() {
    const v = p5.Vector.add(this.pos, this.v)
    if (v.x < 0 || v.x >= cols || v.y < 0 || v.y >= rows) {
      this.v.mult(-1)
    }
    this.pos.add(this.v)
  }
  show() {
    fill(0, 200, 0)
    this.tails.forEach(this.draw)
    fill(0, 255, 0)
    this.draw(this.pos)
    if (this.tails.length > 0) {
      this.tails.pop()
      this.tails.unshift(this.pos.copy())
    }
  }
  draw(pos) {
    rect(pos.x * scl, pos.y * scl, scl, scl)
  }
}
