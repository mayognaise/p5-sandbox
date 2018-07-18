/**
 * build markdown
 */

const fs = require('fs')
const path = require('path')

const { renderMainReadMe, renderReadMe } = require('./build')

const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)


/* ======================================
 * render
 ====================================== */
renderMainReadMe()
const projedtKeys = Object.keys(data.projects)
projedtKeys.forEach(renderReadMe)
