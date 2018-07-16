/**
 * Controller
 */
module.exports = class Controller {
  constructor() {
    // main element
    const el = document.createElement('div')
    el.id = 'playback'
    document.body.appendChild(el)
    // wrapper element
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    el.appendChild(wrapper)
    // toggle button for p5 loop animation
    const button = document.createElement('button')
    button.classList.add('toggle-button')
    button.addEventListener('click', e => {
      e.preventDefault()
      const paused = 'is-paused'
      el.classList.toggle(paused)
      if (el.classList.contains(paused)) {
        noLoop()
      } else {
        loop()
      }
    })
    el.appendChild(button)
    // visibility
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
          document.body.classList.toggle('is-hidden')
          break
        default:
          break
      }
    })
  }
}
