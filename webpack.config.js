const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, 
      {
          test: /\.s[a|c]ss$/,
          loader: 'style!css!sass'
      }
    ]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}