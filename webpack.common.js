const path = require('path')

module.exports = {
  entry: {
    'utils': path.resolve(__dirname, './docs/utils/index.js'),
    'doc-index': path.resolve(__dirname, './scripts/build-doc-index/base.js'),
  },
  output: {
    path: path.resolve(__dirname, './docs/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
}
