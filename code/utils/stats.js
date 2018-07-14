module.exports = class Stats {
  constructor() {
    this.div = createDiv(document.body)
    this.div.elt.setAttribute('id', 'stats')
  }
  update() {
    this.div.html(floor(frameRate()))
  }
}
