class Box {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z)
    this.r = r
  }
  generate() {
    const boxes = []
    const { pos, r } = this
    for(let x = -1; x < 2; x++) {
      for(let y = -1; y < 2; y++) {
        for(let z = -1; z < 2; z++) {
          const sum = Math.abs(x) + Math.abs(y) + Math.abs(z)
          if (sum <= 1) {
            continue
          }

          const newR = r / 3
          const newX = pos.x + x * newR
          const newY = pos.y + y * newR
          const newZ = pos.z + z * newR
          boxes.push(new Box(newX, newY, newZ, newR))
        }
      }
    }
    return boxes
  }
  show() {
    const { pos: { x, y, z }, r } = this
    noStroke()
    ambientMaterial(255)
    push()
    translate(x, y, z)
    box(r)
    pop()
  }
}
