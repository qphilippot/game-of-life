'use strict'
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './src/app.js'
  ],

  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss-var')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },

      {
        test: /\.scss$/,
        loader: [
          'style-loader', 
          'css-loader', 
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ]
}