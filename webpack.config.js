const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production' ,
  entry: './src/renderer.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'renderer.built.js'
  }
};
