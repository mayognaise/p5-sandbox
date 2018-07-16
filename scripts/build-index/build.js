/**
 * build html
 */

const fs = require('fs')
const path = require('path')
const showdown = require('showdown')
const converter = new showdown.Converter({ openLinksInNewWindow: true })

const readmeURL = path.resolve(__dirname, '../../README.md')
const baseURL = path.resolve(__dirname, './base.html')
const indexURL = path.resolve(__dirname, '../../gh-pages/index.html')

const readmeData = fs.readFileSync(readmeURL, 'utf8')
const baseData = fs.readFileSync(baseURL, 'utf8')

const readmeHTML = converter.makeHtml(readmeData)
const overwrite = '<!-- markdown -->'
const baseHTML = baseData.replace(overwrite, readmeHTML)

const err = fs.writeFileSync(indexURL, baseHTML)

console.log(err || 'file was saved!')
