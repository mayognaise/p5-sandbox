const path = require('path')

module.exports = {
  entry: {
    utils: './utils/index.js',
    index: './scripts/build-index/base.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
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
