class ArrowKeys {
  constructor(pressHandleEvent, releaseHandleEvent) {
    this.pressHandleEvent = pressHandleEvent
    this.releaseHandleEvent = releaseHandleEvent
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
      button.addEventListener('click', e => this.keyClicked(e, type))
      this.el.appendChild(button)
    })
  }
  keyPressed(e, type) {
    e.currentTarget.classList.add('active')
    if (!this.pressHandleEvent) { return }
    switch (type) {
      case 'UP': return this.pressHandleEvent(UP_ARROW)
      case 'DOWN': return this.pressHandleEvent(DOWN_ARROW)
      case 'RIGHT': return this.pressHandleEvent(RIGHT_ARROW)
      case 'LEFT': return this.pressHandleEvent(LEFT_ARROW)
      default: return
    }
  }
  keyClicked(e, type) {
    e.currentTarget.classList.remove('active')
    e.currentTarget.blur()
    if (!this.releaseHandleEvent) { return }
    switch (type) {
      case 'UP': return this.releaseHandleEvent(UP_ARROW)
      case 'DOWN': return this.releaseHandleEvent(DOWN_ARROW)
      case 'RIGHT': return this.releaseHandleEvent(RIGHT_ARROW)
      case 'LEFT': return this.releaseHandleEvent(LEFT_ARROW)
      default: return
    }
  }
}
