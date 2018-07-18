class Snake {
  constructor() {
    this.pos = createVector(0, 0)
    this.v = createVector(1, 0)
    this.tails = []
  }
  update() {
    this.pos.add(this.v)
    if (this.pos.x < 0 || this.pos.x >= cols) {
      this.v.mult(-1)
      this.pos.add(this.v.x * 2, 0)
    }
    if (this.pos.y < 0 || this.pos.y >= rows) {
      this.v.mult(-1)
      this.pos.add(0, this.v.y * 2)
    }
  }
  getPos() {
    return this.pos
  }
  setDir(xs, ys) {
    this.v = createVector(xs, ys)
  }
  ateFood() {
    return dist(this.pos.x, this.pos.y, food.x, food.y) < 1
  }
  addTail() {
    this.tails.unshift(this.pos.copy())
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
