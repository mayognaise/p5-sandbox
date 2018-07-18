/**
 * build html
 */

const fs = require('fs')
const path = require('path')

const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)

const baseURL = path.resolve(__dirname, './base.html')
const baseData = fs.readFileSync(baseURL, 'utf8')

/**
 * render index html
 * @param {string} id - project id
 */
exports.renderIndexPage = id => {
  const titleOverwrite = '<!-- title -->'
  const linksOverwrite = '<!-- links -->'
  const addonsOverwrite = '<!-- addons -->'
  const scriptsOverwrite = '<!-- scripts -->'
  const projectOverwrite = '<!-- project -->'
  const project = data.projects[id]
  let output = baseData
  // title
  const title = project.name
  if (!title) {
    throw new Error(`[renderIndexPage] name is required in "projects". id: "${id}"`) 
  }
  const group = data.groups[project.group]
  if (!group) {
    throw new Error(`[renderIndexPage] group is required in "projects". id: "${id}"`)
  }
  const groupName = group.name
  if (!groupName) {
    throw new Error(`[renderIndexPage] name is required in "groups". id: "${project.group}"`)
  }
  const category = data.categories[project.category]
  if (!category) {
    throw new Error(`[renderIndexPage] category is required in "projects". id: "${id}"`)
  }
  const categoryName = category.name
  if (!categoryName) {
    throw new Error(`[renderIndexPage] name is required in "categories". id: "${project.category}"`)
  }
  output = output.replace(titleOverwrite, `${categoryName} ${title} from ${groupName}`)
  // links (options)
  const links = project.links
  if (Array.isArray(links)) {
    const linksArr = links.map(val => `<link rel="stylesheet" href="${val}" />`)
    output = output.replace(linksOverwrite, linksArr.join('\n'))
  }
  // addons (options)
  const addons = project.addons
  if (Array.isArray(addons)) {
    const addonsArr = addons.map(val => `<script src="${val}"></script>`)
    output = output.replace(addonsOverwrite, addonsArr.join('\n'))
  }
  // scripts (options)
  const scripts = project.scripts
  if (Array.isArray(scripts)) {
    const scriptsArr = scripts.map(val => `<script src="./${val}"></script>`)
    output = output.replace(scriptsOverwrite, scriptsArr.join('\n'))
  }
  // project
  output = output.replace(projectOverwrite, `<script>const project = ${JSON.stringify(project)}</script>`)
  // save!
  const outputPath = path.resolve(__dirname, `../../docs/${project.group}/${project.url}/index.html`)
  const err = fs.writeFileSync(outputPath, output)
  if (err) {
    throw new Error(`[renderIndexPage] couldn't save. error: "${err}"`)
  }
  console.log(`[renderIndexPage] saved! url: $${project.url}`)
}
