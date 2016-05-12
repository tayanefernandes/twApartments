const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'index.js'),
  dist: path.join(__dirname, 'public/dist')
};

module.exports = {
  preLoaders: [ { test: /\.js$/, loader: "source-map-loader" } ],
  entry: PATHS.app,
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    progress: true,
    hot: true,
    stats: 'errors-only'
  }
};