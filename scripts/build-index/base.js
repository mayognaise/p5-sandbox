require('./default.styl')

const init = () => {
  // unfocus when any link is clicked
  const linkItems = document.querySelectorAll('a')
  for (var item of linkItems) {
    item.addEventListener('click', e => e.currentTarget.blur())
  }
  // for development
  if (window.location.port === '3000') {
    for (var item of linkItems) {
      const href = item.getAttribute('href')
      const link = 'https://mayognaise.github.io/p5-sandbox'
      if (href.indexOf(link) === 0) {
        item.setAttribute('href', href.replace(link, ''))
        item.removeAttribute('target')
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', init)
