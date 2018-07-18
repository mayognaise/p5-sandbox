/**
 * Controller
 */

const paused = 'is-paused'
const hidden = 'is-hidden'

module.exports = class Controller {
  constructor() {
    // main element
    this.el = document.createElement('div')
    this.el.id = 'playback'
    document.body.appendChild(this.el)
    // wrapper element
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    this.el.appendChild(wrapper)
    // toggle button for p5 loop animation
    const button = document.createElement('button')
    button.classList.add('toggle-button')
    button.addEventListener('click', e => {
      e.preventDefault()
      this.togglePlayback()
    })
    this.el.appendChild(button)
    // visibility
    let isHidden = window.localStorage.getItem(hidden) === 'true'
    isHidden && document.body.classList.add(hidden)
    document.addEventListener('keydown', e => {
      switch (e.key) {
        // save image
        case 's':
          const keys = window.location.href.split('/').reverse()
          const index = keys.findIndex(val => val)
          saveCanvas(keys[index], 'png')
          break
        // toggle visibility
        case 'h':
          isHidden = !isHidden
          window.localStorage.setItem(hidden, isHidden)
          document.body.classList.toggle(hidden)
          break
        // toggle playback
        case 'p':
          this.togglePlayback()
          break
        default:
          break
      }
    })
  }
  togglePlayback() {
    this.el.classList.toggle(paused)
    if (this.el.classList.contains(paused)) {
      noLoop()
    } else {
      loop()
    }
  }
}
