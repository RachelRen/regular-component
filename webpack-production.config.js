const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 获取指定路径下的入口文件
function getEntries(globPath) {
     var files = glob.sync(globPath),
       entries = {};

     files.forEach(function(filepath) {
         // 取倒数第二层(view下面的文件夹)做包名
         var split = filepath.split('/');
         var name = split[split.length - 2];

         entries[name] = './' + filepath;
     });

     return entries;
}

var entries = getEntries('src/view/**/index.js');

Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: name + '.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './template.html',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})

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


