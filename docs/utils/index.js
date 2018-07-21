require('./css/default.styl')
require('./css/utils.styl')
const Stats = require('./Stats')
const ReadMe = require('./ReadMe')
const Controller = require('./Controller')
const ga = require('./ga')

let statsItem

const updateStats = () => {
  if (statsItem && window.frameRate) {
    statsItem.update(floor(frameRate()))
  }
  window.requestAnimationFrame(updateStats)
}

const onContentLoaded = () => {
  statsItem = new Stats()
  updateStats()
  new Controller()
  let files = ['./README.md', './sketch.js']
  if (project.scripts) {
    files = files.concat(project.scripts)
  }
  new ReadMe(files)
  ga()
}

document.addEventListener('DOMContentLoaded', onContentLoaded)
