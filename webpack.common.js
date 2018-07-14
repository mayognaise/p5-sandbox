const path = require('path')

module.exports = {
  entry: './code/utils/index.js',
  output: {
    filename: 'utils.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
