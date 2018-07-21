class Arc {
  constructor(start, end, dir, backwards) {
    this.x = (end + start) / 2
    this.dia = end - start
    this.vect = dir === 0 ? 1 : -1
    this.backwards = backwards
    this.count = 1
    // console.log('[Arc] start:', start, ',end:', end, ',dir:', dir, ', vect:', this.vect, ', backwards:', this.backwards)
  }
  show() {
    const { x, dia, count, vect, backwards } = this
    let r0, r1
    const len = (count / arcDiv) * PI
    if (backwards) {
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
    strokeWeight(.002 / (scl / width))
    noFill()
    arc(x, 0, dia, dia, r0, r1)
    if (this.count < arcDiv) {
      this.count += 1
    }
  }
}
