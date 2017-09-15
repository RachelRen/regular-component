const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  entry: {
    index: [
      path.resolve(__dirname, './src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'components.min.js',
    publicPath: '/',
    // chunkFilename:'js/[name].chunk.js',
  },
  
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-2"],
            plugins: ["transform-export-extensions"]
            //plugins: ['transform-runtime']//https://babeljs.io/docs/plugins/transform-runtime/
          }
        }
      },
      {
        test: /\.html?$/,
        use: {
          loader: 'html-loader'
        }
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }
          ]

        })

      },
      {
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')({
                  broswers: ['last 3 version', 'ie >= 10']
                })]
                
              }
            },
            {
              loader: 'sass-loader',

            }]

        })
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: 'url-loader'
        }

      },
      {
        test: /\.(png|gif|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: './assets/images/[name].[ext]',
            limit: 100
          }
        }

      }



    ]
  },
  
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',//https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27
      allChunks: true,
      ignoreOrder: false,
      disable: false
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    //   output: {
    //     comments: false,
        
    //     ascii_only: true,
    //   },
    //   sourceMap: true,
    // }),

  ]

}

module.exports = config;


