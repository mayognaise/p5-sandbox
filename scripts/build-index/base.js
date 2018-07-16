require('./default.styl')

const init = () => {
  const linkItems = document.querySelectorAll('a')
  for (var item of linkItems) {
    item.addEventListener('click', e => e.currentTarget.blur())
  }
}

document.addEventListener('DOMContentLoaded', init)
