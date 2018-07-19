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
  const sketchDest = path.resolve(__dirname, `../../docs/${group}/${url}/sketch.js`)
  if (!fs.existsSync(sketchDest)) {
    fs.writeFileSync(sketchDest, sketchRaw)
    console.log('created sketch.js:', sketchDest)
  }
  // check scripts
  if (Array.isArray(scripts)) {
    scripts.forEach(src => {
      const srcDest = path.resolve(__dirname, `../../docs/${group}/${url}/${src}`)
      if (!fs.existsSync(srcDest)) {
        const arr = src.split('.')
        const className = arr[arr.length - 2]
        const srcRaw = `class ${className.charAt(0) === '/' ? className.substr(1) : className} {\n  constructor() {\n  }\n  update() {\n  }\n  show() {\n  }\n}\n`
        fs.writeFileSync(srcDest, srcRaw)
        console.log(`created script:`, srcDest)
      }
    })
  }
  // check index.html
  const indexDest = path.resolve(__dirname, `../../docs/${group}/${url}/index.html`)
  if (!fs.existsSync(indexDest)) {
    renderIndexPage(id)
    console.log('created index.html:', indexDest)
  }
  // check readme
  const readmeDest = path.resolve(__dirname, `../../docs/${group}/${url}/README.md`)
  if (!fs.existsSync(readmeDest)) {
    renderReadMe(id)
    console.log('created readme:', readmeDest)
  }
  // check thumb
  const baseThumb = path.resolve(__dirname, './thumb.png')
  const thumbDest = path.resolve(__dirname, `../../docs/assets/images/thumbs/${url}.png`)
  if (!fs.existsSync(thumbDest)) {
    const thumbSrc = fs.createReadStream(baseThumb)
    const outStr = fs.createWriteStream(thumbDest)
    thumbSrc.pipe(outStr)
    console.log('created thumb:', thumbDest)
  }
}

/* ======================================
 * render
 ====================================== */
const projedtKeys = Object.keys(data.projects)
projedtKeys.forEach(createProject)
