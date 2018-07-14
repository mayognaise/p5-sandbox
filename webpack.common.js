const path = require('path')

module.exports = {
  entry: './code/utils/index.js',
  output: {
    filename: 'utils.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true
}
