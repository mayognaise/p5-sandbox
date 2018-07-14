module.exports = class Stats {
  constructor() {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'stats')
    document.body.appendChild(this.el)
  }
  update(val) {
    this.el.innerHTML = val
  }
}
