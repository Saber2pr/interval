const path = require('path');

module.exports = {
  entry: './lib/test/test.js',
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
};