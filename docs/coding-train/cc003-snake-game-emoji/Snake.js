class Snake {
  constructor() {
    this.pos = createVector(0, 0)
    this.v = createVector(1, 0)
    this.tails = []
    this.draw = this.draw.bind(this)
    this.emoji = null
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
    this.emoji = '😋'
  }
  death() {
    const tail = this.tails.find(t => this.pos.dist(t) < 1)
    if (!tail) { return }
    this.tails = []
    this.emoji = '😫'
  }
  update() {
    const v = p5.Vector.add(this.pos, this.v)
    if (v.x < 0 || v.x >= cols || v.y < 0 || v.y >= rows) {
      this.v.mult(-1)
    }
    this.pos.add(this.v)
  }
  show() {
    this.tails.forEach(this.draw)
    this.draw(this.pos)
    if (this.tails.length > 0) {
      this.tails.pop()
      this.tails.unshift(this.pos.copy())
    }
    // emoji
    if (this.emoji) {
      textSize(scl)
      text(this.emoji, this.pos.x * scl, (this.pos.y + .95) * scl)
      this.emoji = null
    }
  }
  draw(pos, index = -1) {
    const g = 255 - (index + 1) * 10
    fill(0, max(50, g) , 0)
    rect(pos.x * scl, pos.y * scl, scl, scl)
  }
}
