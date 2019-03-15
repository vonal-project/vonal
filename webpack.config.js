const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production' ,
  entry: './src/renderer.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'renderer.built.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: '@sucrase/webpack-loader',
          options: {
            transforms: ['jsx']
          }
        }
      }
    ]
  }
};
