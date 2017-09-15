const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  entry: {
    index: ['babel-polyfill',
      path.resolve(__dirname, './src/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    library: 'yourComponentsName',
    libraryTarget: 'umd',
    filename: 'app.js'
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-2"],
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
    
    // new ExtractTextPlugin({
    //   filename: 'main.css',//https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27
    //   allChunks: true,
    //   ignoreOrder: false,
    //   disable: false
    // }),
    new ExtractTextPlugin({
      filename: '[name].css',//https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27
      allChunks: true,
      ignoreOrder: false,
      disable: false
    }),
    
    


    

  ]

}

module.exports = config;


