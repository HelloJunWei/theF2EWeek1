const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    build: './src/js/main.js',
    vendor: ['moment']
  },
  output: {
    path: path.resolve(__dirname, './dist/static'),
    publicPath: './static',
    filename: '[name].[hash].js',
  },
  plugins: [
    new webpack.ProvidePlugin({   
      moment: 'moment'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'] // Specify the common bundle's name.
    }),
    new HtmlWebpackPlugin({
      //編譯後的位置與名稱
      filename: '../index.html',
      //來源
      template: './index.html',
      inject: true,
      minify: {
        removeComments: (process.env.NODE_ENV === 'production')?true:false,
        collapseWhitespace: (process.env.NODE_ENV === 'production')?true:false,
        removeAttributeQuotes: (process.env.NODE_ENV === 'production')?true:false
      },
      chunksSortMode: 'dependency'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss$/,
        use:[{
          loader: "style-loader" // creates style nodes from JS strings
        },
        {
          loader: "css-loader" // translates CSS into CommonJS
        },{
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
