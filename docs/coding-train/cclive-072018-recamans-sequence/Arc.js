class Arc {
  constructor(start, end, dir, backward) {
    this.x = (end + start) / 2
    this.dia = abs(end - start)
    this.vect = dir === 0 ? 1 : -1
    this.backward = backward
    this.count = 1
    // console.log('[Arc] start:', start, ',end:', end, ',dir:', dir, ', vect:', this.vect, ', backward:', this.backward)
  }
  show() {
    const { x, dia, count, vect, backward } = this
    let r0, r1
    const len = (count / arcDiv) * PI
    if (backward) {
      if (vect === 1) {
        // cw
        r0 = 0
        r1 = len
      } else {
        // ccw
        r0 = -len
        r1 = 0
      }
    } else {
      if (vect === 1) {
        // cw
        r0 = PI - len
        r1 = PI
      } else {
        // ccw
        r0 = PI
        r1 = PI + len
      }
    }
    stroke(255)
    strokeWeight(.001 * biggest)
    noFill()
    arc(x, 0, dia, dia, r0, r1)
    if (this.count < arcDiv) {
      this.count += 1
    }
  }
}
