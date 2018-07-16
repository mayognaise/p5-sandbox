class Star {
  constructor() {
    this.reset()
  }

  reset() {
    const x = random(-width / 2, width / 2)
    const y = random(-height / 2, height / 2)
    this.v = createVector(x, y)
    this.z = random(width)
    this.pz = this.z
  }

  update(speed = 0) {
    this.z -= speed
    if (this.z < 1) {
      this.reset()
    }
  }

  show() {
    const x = map(this.v.x / this.z, 0, 1, 0, width)
    const y = map(this.v.y / this.z, 0, 1, 0, height)
    const px = map(this.v.x / this.pz, 0, 1, 0, width)
    const py = map(this.v.y / this.pz, 0, 1, 0, height)
    stroke(255)
    strokeWeight(1)
    line(px, py, x, y)
    // store z as previous z
    this.pz = this.z
  }
}
