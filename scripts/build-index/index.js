/**
 * build html
 */

const fs = require('fs')
const path = require('path')

const { renderIndexPage } = require('./build')

const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)

/* ======================================
 * render
 ====================================== */
const projedtKeys = Object.keys(data.projects)
projedtKeys.forEach(renderIndexPage)
