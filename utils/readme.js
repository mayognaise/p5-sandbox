/**
 * code visualer
 */

const showdown = require('showdown')
const converter = new showdown.Converter({ openLinksInNewWindow: true })

const hljs = require('highlight.js/lib/highlight.js')
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
require('highlight.js/styles/atom-one-light.css')

const show = 'is-show'

module.exports = class ReadMe {
  constructor(paths) {
    this.paths = paths
    // main element
    this.el = document.createElement('div')
    this.el.id = 'readme'
    document.body.appendChild(this.el)
    // wrapper element
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('wrapper')
    this.el.appendChild(this.wrapper)
    // toggle button
    const button = document.createElement('button')
    button.classList.add('toggle-button')
    button.addEventListener('click', e => {
      e.preventDefault()
      this.el.classList.toggle(show)
    })
    document.addEventListener('keydown', e => {
      if (e.key === 'i') {
        this.el.classList.toggle(show)
      }
    })
    this.el.appendChild(button)
    // start load files
    this.load()
  }
  getJSText(data) {
    const spliceList = [
      '//',
      'let stats',
      'stats = new Stats',
      'new ReadMe',
      'new Controller',
      'stats.update'
    ]
    const array = data.split('\n')
    for (let count = array.length - 1; count > -1; count--) {
      const val = array[count]
      if (spliceList.find(list => val.indexOf(list) !== -1)) {
        array.splice(count, 1)
      }
    }
    return array.join('\n')
  }
  render(items) {
    items.forEach(({ type, data, title }) => {
      if (type === 'md') {
        const markdown = document.createElement('div')
        markdown.classList.add('markdown')
        markdown.innerHTML = converter.makeHtml(data)
        this.wrapper.appendChild(markdown)
      } else {
        // header
        const header = document.createElement('h3')
        header.classList.add('title')
        header.innerHTML = title
        this.wrapper.appendChild(header)
        // highlight code
        const pre = document.createElement('pre')
        const code = document.createElement('code')
        code.classList.add(type)
        code.innerHTML = type === 'js' ? this.getJSText(data) : data
        pre.appendChild(code)
        this.wrapper.appendChild(pre)
        hljs.highlightBlock(code)
      }
    })
  }
  /**
   * fetch files
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Response
   */
  async load() {
    let items
    const types = []
    try {
      const response = await Promise.all(this.paths.map(path => fetch(path)))
      items = await Promise.all(response.map((res, index) => {
        const arr = res.url.split('.')
        const type = arr[arr.length - 1]
        types[index] = type
        switch (type) {
          case 'json':
            return res.json()
          default:
            return res.text()
        }
      }))
    } catch (error) {
      throw new Error(error)
    }
    if (!items) { return }
    this.render(items.map((data, index) => ({ type: types[index], data, index, title: this.paths[index] })))
  }
}
