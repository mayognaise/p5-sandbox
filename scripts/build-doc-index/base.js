require('../../docs/utils/css/default.styl')
require('./base.styl')

const onContentLoaded = () => {
  // unfocus when any link is clicked
  const linkItems = document.querySelectorAll('a')
  for (let item of linkItems) {
    item.addEventListener('click', e => e.currentTarget.blur())
  }
  // add link for square image
  const listItems = document.querySelectorAll('h3 + ul li')
  for (let item of listItems) {
    const el = item.querySelector('a').cloneNode()
    el.classList.add('link-sq')
    item.appendChild(el)
    // console.log(el)
    // p_prime = p.cloneNode(true)
  }
  // for development
  if (window.location.port === '4649') {
    for (let item of linkItems) {
      const href = item.getAttribute('href')
      const link = 'https://mayognaise.github.io/p5-sandbox'
      if (href.indexOf(link) === 0) {
        item.setAttribute('href', href === link ? '/' : href.replace(link, ''))
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', onContentLoaded)
