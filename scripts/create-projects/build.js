const fs = require('fs')
const path = require('path')

const dataURL = path.resolve(__dirname, '../../assets/json/data.json')
const dataRaw = fs.readFileSync(dataURL, 'utf8')
const data = JSON.parse(dataRaw)

/**
 * create project
 * @param {string} id - project id
 */
const createProject = id => {
  const { group, url, scripts } = data.projects[id]
  // check group directory
  const groupDir = path.resolve(__dirname, `../../docs/${group}`)
  if (!fs.existsSync(groupDir)) {
    console.log('create group dir!', groupDir)
    fs.mkdirSync(groupDir)
  } else {
    console.log('group dir exists', groupDir)
  }
  // check project directory
  const projectDir = path.resolve(__dirname, `../../docs/${group}/${project}`)
  if (!fs.existsSync(projectDir)) {
    console.log('create project dir!', projectDir)
    // fs.mkdirSync(projectDir)
  } else {
    console.log('project dir exists', projectDir)
  }


  // save!
  // const outputPath = path.resolve(__dirname, `../../docs/${project.group}/${project.url}/index.html`)
  // const err = fs.writeFileSync(outputPath, output)
  // if (err) {
  //   throw new Error(`[renderIndexPage] couldn't save. error: "${err}"`)
  // }
  // console.log(`[renderIndexPage] saved! url: $${project.url}`)
}

/* ======================================
 * render
 ====================================== */
const projedtKeys = Object.keys(data.projects)
projedtKeys.forEach(createProject)
