module.exports = class Stats {
  constructor() {
    const main = document.createElement('div')
    main.setAttribute('id', 'stats')
    this.el = document.createElement('span')
    main.appendChild(this.el)
    document.body.appendChild(main)
  }
  update(val) {
    this.el.innerHTML = val
  }
}
