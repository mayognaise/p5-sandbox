class ArrowKeys {
  constructor(callback) {
    this.callback = callback
    // main element
    this.el = document.createElement('div')
    this.el.id = 'arrowkeys'
    document.body.appendChild(this.el)
    // buttons
    const arrows = ['UP', 'DOWN', 'RIGHT', 'LEFT']
    arrows.forEach(type => {
      const button = document.createElement('button')
      button.classList.add('toggle-button')
      button.classList.add(type)
      button.addEventListener('touchstart', e => this.keyPressed(e, type))
      button.addEventListener('mousedown', e => this.keyPressed(e, type))
      this.el.appendChild(button)
    })
  }
  keyPressed(e, type) {
    // e.preventDefault()
    e.currentTarget.blur()
    switch (type) {
      case 'UP': return this.callback(UP_ARROW)
      case 'DOWN': return this.callback(DOWN_ARROW)
      case 'RIGHT': return this.callback(RIGHT_ARROW)
      case 'LEFT': return this.callback(LEFT_ARROW)
      default: return
    }
  }
}
