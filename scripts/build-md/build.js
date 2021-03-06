/**
 * build markdown
 */

const fs = require('fs')
const path = require('path')

const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)

const titleId = 'p5-sandbox'
const title = `[p5 Sandbox][${titleId}]`

/**
 * get link
 * @param {string} id - link id
 * @requires {string} 
 */
const getLink = id => {
  const item = data.links[id]
  return item && `[${id}]: ${item}`
}

/**
 * get links
 * @param {string} id - project id
 * @returns {string[]} 
 */
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

/**
 * convert name
 * @param {string} name
 * @returns {string}
 */
const getName = name => {
  if (!name || typeof name !== 'string') { return name }
  if (name.charAt(0) === '#') {
    name = `\\${name}`
  }
  return name.replace(/\_/g, '\\_')
}

/**
 * get project line
 * @param {string} id - project id
 * @returns {string} 
 */
const getProjectLine = id => {
  const name = getName(data.projects[id].name)
  if (!name) {
    throw new Error(`[getProjectLine] name is required in "projects". id: "${id}"`) 
  }
  return `- ${getName(name)} [demo][${id}-demo] [code][${id}-code] [reference][${id}-ref]`
}

/**
 * get notes
 * @param {string} id - project id 
 * @returns {string[]}
 */
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

/**
 * render page
 * @param {string} id - project id
 */
exports.renderReadMe = id => {
  let arr = []
  // render title
  arr.push(`## ${title}\n`)
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
  const dir = path.resolve(__dirname, `../../docs/${group}/${url}`)
  if (!fs.existsSync(dir)) {
    throw new Error(`[renderPage] no directry exist. dir: "${dir}"`)
  }
  const outputPath = path.resolve(dir, 'README.md')
  const output = arr.join('\n')
  const err = fs.writeFileSync(outputPath, output)
  if (err) {
    throw new Error(`[renderPage] couldn't save. error: "${err}"`)
  }
  console.log(`[renderPage] saved! url: $${url}`)
}

/**
 * render main markdown page
 */
exports.renderMainReadMe = () => {
  const baseUrl = path.resolve(__dirname, './main.md')
  let baseText = fs.readFileSync(baseUrl, 'utf8')
  const titleOverwrite = '<!-- title -->'
  const contentsOverwrite = '<!-- contents -->'
  const linksOverwrite = '<!-- links -->'
  let output
  // title
  output = baseText.replace(titleOverwrite, `# ${title}`)

  // contents
  const contentsArr = []
  Object.keys(data.groups).forEach(groupKey => {
    const group = data.groups[groupKey]
    // group name
    const groupName = getName(group.name)
    if (!groupName) {
      throw new Error(`[getNotes] name is required in "groups". id: "${groupKey}"`)
    }
    const groupText = data.links[groupKey] ? `[${groupName}][${groupKey}]` : groupName
    contentsArr.push(`## ${groupText}`)
    // group description (option)
    const groupDesc = getName(group.description)
    groupDesc && contentsArr.push(groupDesc)
    // group categories
    if (Array.isArray(group.categories)) {
      group.categories.forEach(categoryKey => {
        const category = data.categories[categoryKey]
        // category name
        const categoryName = getName(category.name)
        if (!categoryName) {
          throw new Error(`[getNotes] name is required in "categorys". id: "${categorykey}"`)
        }
        const categoryText = data.links[categoryKey] ? `[${categoryName}][${categoryKey}]` : categoryName
        contentsArr.push(`\n### ${categoryText}`)
        // projects filtered by categoryKey
        const projects = Object.keys(data.projects).filter(key => data.projects[key].category === categoryKey)
        projects.forEach(projId => contentsArr.push(getProjectLine(projId)))
      })
    }
    contentsArr.push('\n')
  })
  output = output.replace(contentsOverwrite, contentsArr.join('\n'))
  
  // links
  const linksText = Object.keys(data.links).map(getLink).join('\n')
  output = output.replace(linksOverwrite, linksText)
  
  // save!
  const outputPath = path.resolve(__dirname, '../../docs/README.md')
  const err = fs.writeFileSync(outputPath, output)
  if (err) {
    throw new Error(`[renderMainPage] couldn't save. error: "${err}"`)
  }
  console.log(`[renderMainPage] saved!`)
}
