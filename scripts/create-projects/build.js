const fs = require('fs')
const path = require('path')

const { renderIndexPage } = require('../build-index/build')
const { renderReadMe } = require('../build-md/build')

const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)

const sketchURL = path.resolve(__dirname, './sketch.js')
const sketchRaw = fs.readFileSync(sketchURL, 'utf8')

/**
 * create project
 * @param {string} id - project id
 */
const createProject = id => {
  const { group, url, scripts } = data.projects[id]
  // check group directory
  const groupDir = path.resolve(__dirname, `../../docs/${group}`)
  if (!fs.existsSync(groupDir)) {
    fs.mkdirSync(groupDir)
    console.log('created group directory:', groupDir)
  }
  // check project directory
  const projectDir = path.resolve(__dirname, `../../docs/${group}/${url}`)
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir)
    console.log('created project directory:', projectDir)
  }
  // check sketch.js
  const sketchDist = path.resolve(__dirname, `../../docs/${group}/${url}/sketch.js`)
  if (!fs.existsSync(sketchDist)) {
    fs.writeFileSync(sketchDist, sketchRaw)
    console.log('created sketch.js:', sketchDist)
  }
  // check scripts
  if (Array.isArray(scripts)) {
    scripts.forEach(src => {
      const srcDist = path.resolve(__dirname, `../../docs/${group}/${url}/${src}`)
      if (!fs.existsSync(srcDist)) {
        const srcRaw = `class ${src.split('.')[0]} {\n  constructor() {\n  }\n  update() {\n  }\n  show() {\n  }\n}\n`
        fs.writeFileSync(srcDist, srcRaw)
        console.log(`created:`, srcDist)
      }
    })
  }
  // check index.html
  const indexDist = path.resolve(__dirname, `../../docs/${group}/${url}/index.html`)
  if (!fs.existsSync(indexDist)) {
    renderIndexPage(id)
    console.log('created index.html:', indexDist)
  }
  // check readme
  const readmeDist = path.resolve(__dirname, `../../docs/${group}/${url}/README.md`)
  if (!fs.existsSync(readmeDist)) {
    renderReadMe(id)
    console.log('created readme.html:', readmeDist)
  }
}

/* ======================================
 * render
 ====================================== */
const projedtKeys = Object.keys(data.projects)
projedtKeys.forEach(createProject)
