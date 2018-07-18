/**
 * build html
 */

const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const converter = new showdown.Converter()

const baseURL = path.resolve(__dirname, './base.html')
const baseData = fs.readFileSync(baseURL, 'utf8')
let baseHTML = baseData

// styles
const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)
const stylesOverwrite = '/* styles */'
const projects = Object.keys(data.projects).map(id => ({ id, ...data.projects[id]}))
const projectsByCategory = Object.keys(data.categories).map(key => projects.filter(proj => key === proj.category))
const stylesArr = []
projectsByCategory.forEach(projs => {
  projs.forEach((proj, index) => {
    let domId
    switch (proj.category) {
      case 'coding-challenge':
        domId = 'codingchallengecodingchallenge'
        break
      case 'p1-color':
        domId = 'p1color'
        break
      default:
        throw new Error(`[renderIndexPage] category is required in "projects". id: "${proj.id}"`)
    }
    stylesArr.push(`#${domId} + ul li:nth-child(${index + 1}) { background-image: url('./assets/images/thumbs/${proj.url}.png'); }`)
  })
})
baseHTML = baseHTML.replace(stylesOverwrite, stylesArr.join('\n      '))

// markdown
const readmeURL = path.resolve(__dirname, '../../docs/README.md')
const readmeData = fs.readFileSync(readmeURL, 'utf8')
const readmeHTML = converter.makeHtml(readmeData)
const markdownOverwrite = '<!-- markdown -->'
baseHTML = baseHTML.replace(markdownOverwrite, readmeHTML)

// save!
const indexURL = path.resolve(__dirname, '../../docs/index.html')
const err = fs.writeFileSync(indexURL, baseHTML)

console.log(err || '[renderIndexPage] saved!')
