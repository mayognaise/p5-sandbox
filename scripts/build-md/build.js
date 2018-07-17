/**
 * build markdown
 */

const fs = require('fs')
const path = require('path')

const dataURL = path.resolve(__dirname, './data.json')
// const readmeURL = path.resolve(__dirname, '../../README.md')

const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)

const titleId = 'p5-sandbox'

const getLink = id => {
  const item = data.links[id]
  return item && `[${id}]: ${item}`
}

const getLinks = id => {
  const arr = []
  arr.push('\n---\n')
  // title
  arr.push(getLink(titleId))
  // demo
  const demoLink = getLink(`${id}-demo`)
  demoLink && arr.push(demoLink)
  // code
  const codeLink = getLink(`${id}-code`)
  codeLink && arr.push(codeLink)
  // ref
  const refLink = getLink(`${id}-ref`)
  refLink && arr.push(refLink)
  // notes
  const { notes } = data.projects[id]
  if (Array.isArray(notes)) {
    notes.forEach(noteId => {
      const noteLink = getLink(noteId)
      noteLink && arr.push(noteLink)
    })
  }
  return arr
}

const getName = name => {
  if (!name || typeof name !== 'string') { return name }
  if (name.charAt(0) === '#') {
    name = `\\${name}`
  }
  return name.replace(/\_/g, '\\_')
}

const getProjectLine = id => {
  const name = getName(data.projects[id].name)
  if (!name) {
    throw new Error(`[getProjectLine] name is required in "projects". id: "${id}"`) 
  }
  return `- ${getName(name)} [demo][${id}-demo] [code][${id}-code] [reference][${id}-ref]`
}

const getNotes = id => {
  const { notes } = data.projects[id]
  if (!notes || !Array.isArray(notes) || notes.length === 0) { return null }
  const arr = ['\n### Notes']
  notes.forEach(noteId => {
    const name = getName(data.notes[noteId].name)
    if (!name) {
      throw new Error(`[getNotes] name is required in "notes". id: "${noteId}"`)
    }
    arr.push(`- [${name}][${noteId}]`)
  })
  return arr
}

const renderPage = id => {
  let arr = []
  // render title
  arr.push(`## [p5 Sandbox][${titleId}]\n`)
  // add project line
  arr = arr.concat(getProjectLine(id))
  // add notes
  const notes = getNotes(id)
  if (notes) {
    arr = arr.concat(notes)
  }
  // render links
  arr = arr.concat(getLinks(id))
  arr.push('\n')
  // save!
  const { url, group } = data.projects[id]
  if (!url) {
    throw new Error(`[renderPage] url is required in "projects". id: "${id}"`)
  }
  if (!group) {
    throw new Error(`[renderPage] group is required in "projects". id: "${id}"`)
  }
  const dir = path.resolve(__dirname, `../../${group}/${url}`)
  if (!fs.existsSync(dir)) {
    throw new Error(`[renderPage] no directry exist. dir: "${dir}"`)
  }
  const outputPath = path.resolve(dir, 'README.md')
  const output = arr.join('\n')
  const err = fs.writeFileSync(outputPath, output)
  if (err) {
    throw new Error(`[renderPage] couldn't save. error: "${err}"`)
  }
  console.log(`saved! url: $${url}`)
}

// render individual markdown page
const projedtKeys = Object.keys(data.projects)
projedtKeys.forEach(renderPage)


// const overwrite = '<!-- markdown -->'
// const baseHTML = baseData.replace(overwrite, readmeHTML)
// const err = fs.writeFileSync(indexURL, baseHTML)
// console.log(err || 'file was saved!')