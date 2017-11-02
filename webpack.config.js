const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  entry: {
    style: './src/assets/sass/style.scss',
    vendor: ['regularjs'],
    index: ['babel-polyfill',
      path.resolve(__dirname, './src/example.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename:'js/[name].chunk.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "./src"),
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    port: 2337,
    host: '0.0.0.0', 
    disableHostCheck: true
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
  resolve: {
    alias: {
      Src: path.resolve(__dirname, './src'),
      Javascript: path.resolve(__dirname, './src/javascript')
      // Images: path.resolve(__dirname, './src/assets/images'),
      // Components: path.resolve(__dirname, './src/app/components'),
      // Util: path.resolve(__dirname, './src/app/util')

    },
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'//gave the chunk a different name
    }),
    


    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/src/index.html',
      inject: true,
      chunks: ['vendor', 'index'],//会自动将js文件插入html中
      chunksSortMode: 'dependency'
    })

  ]

}

module.exports = config;


