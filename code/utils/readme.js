require('../../lib/highlight/styles/atom-one-dark.css')

module.exports = class ReadMe {
  constructor(paths) {
    this.paths = paths
    this.el = document.createElement('div')
    this.el.id = 'readme'
    document.body.appendChild(this.el)
    this.load()
  }
  renderJS(data, title) {
    const splitList = [
      'let stats',
      'stats = new Stats',
      'new ReadMe',
      'stats.update'
    ]
    const array = data.split('\n')
    for(let count = array.length - 1; count > -1; count--) {
      const val = array[count]
      if (splitList.find(list => val.indexOf(list) !== -1)) {
        array.splice(count, 1)
      }
    }
    const str = array.join('\n')
    const p = document.createElement('p')
    const pre = document.createElement('pre')
    const code = document.createElement('code')
    p.innerHTML = title
    p.classList.add('title')
    code.innerHTML = str
    hljs.highlightBlock(code)
    pre.classList.add('item')
    pre.appendChild(code)
    this.el.appendChild(p)
    this.el.appendChild(pre)
  }
  render(items) {
    console.log(items)
    items.forEach(({ type, data, title }) => {
      switch(type) {
        case 'js':
          return this.renderJS(data, title)
        default:
          break
      }
    })
  }
  async load() {
    try {
      const types = []
      const response = await Promise.all(this.paths.map(path => fetch(path)))
      const items = await Promise.all(response.map((res, index) => {
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
      this.render(items.map((data, index) => ({ type: types[index], data, index, title: this.paths[index] })))
    } catch (error) {
      throw new Error(error)
    }
  }
}
