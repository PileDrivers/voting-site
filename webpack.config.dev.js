var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: ["./src/index.jsx", "./src/less/custom.less"],
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: "bundle.js",
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg)$/i,
        loader: 'url-loader?limit=200000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};