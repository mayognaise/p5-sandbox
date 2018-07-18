class Snake {
  constructor(scl) {
    this.x = 0
    this.y = 0
    this.xSpeed = 1
    this.ySpeed = 0
    this.scl = scl
  }
  update() {
    this.x += this.xSpeed * this.scl
    this.y += this.ySpeed * this.scl
    this.x = constrain(this.x, 0, width - this.scl)
    this.y = constrain(this.y, 0, height - this.scl)
  }
  dir(xs, ys) {
    this.xSpeed = xs
    this.ySpeed = ys
  }
  show() {
    fill(255)
    noStroke()
    rect(this.x, this.y, this.scl, this.scl)
  }
}
