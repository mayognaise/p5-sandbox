module.exports = () => {
  // lib
  const lib = document.createElement('script')
  lib.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=UA-31506713-2')
  lib.async = true
  document.head.appendChild(lib)
  // config
  const config = document.createElement('script')
  config.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);} gtag('js',new Date());gtag('config','UA-31506713-2');`
  document.head.appendChild(config)
}
