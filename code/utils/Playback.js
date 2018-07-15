/**
 * Playback for p5 loop animation
 */
module.exports = class Playback {
  constructor() {
    // main element
    const el = document.createElement('div')
    el.id = 'playback'
    document.body.appendChild(el)
    // wrapper element
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    el.appendChild(wrapper)
    // toggle button
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
  }
}
