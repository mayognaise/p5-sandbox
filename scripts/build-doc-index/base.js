require('../../docs/utils/css/default.styl')
require('./base.styl')

const onContentLoaded = () => {
  // unfocus when any link is clicked
  const linkItems = document.querySelectorAll('a')
  for (var item of linkItems) {
    item.addEventListener('click', e => e.currentTarget.blur())
  }
  // for development
  if (window.location.port === '4649') {
    for (var item of linkItems) {
      const href = item.getAttribute('href')
      const link = 'https://mayognaise.github.io/p5-sandbox'
      if (href.indexOf(link) === 0) {
        item.setAttribute('href', href === link ? '/' : href.replace(link, ''))
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', onContentLoaded)
