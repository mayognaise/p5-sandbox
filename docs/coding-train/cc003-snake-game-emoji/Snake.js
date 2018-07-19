class Snake {
  constructor() {
    this.pos = createVector(0, 0)
    this.v = createVector(1, 0)
    this.tails = []
    this.draw = this.draw.bind(this)
    this.emojis = ['😄', '😃']
    this.emoji = this.emojis[0]
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
  addTail(emoji) {
    this.tails.unshift({ emoji, pos: this.pos.copy() })
    this.emoji = '😋'
  }
  death() {
    const tail = this.tails.find(t => this.pos.dist(t.pos) < 1)
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
    const { emoji, pos } = this
    this.draw({ emoji, pos })
    if (this.tails.length > 0) {
      this.tails = this.tails.map((tail, index) => {
        const prev = this.tails[index - 1]
        return {
          emoji: tail.emoji,
          pos: prev ? prev.pos : pos.copy()
        }
      })
    }
    if (this.emoji === '😫') { return }
    this.emoji = (this.emoji === this.emojis[0]) ? this.emojis[1] : this.emojis[0]
  }
  draw({ emoji, pos }) {
    textSize(scl)
    text(emoji, pos.x * scl, (pos.y + lineHeight) * scl)
  }
}
