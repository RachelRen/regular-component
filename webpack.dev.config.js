const path = require('path');
const webpack = require('webpack');
var libraryName = 'library';
var outputFile = libraryName + '.js';


const config = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/lib2',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "stage-2"],
                        plugins: ["babel-plugin-add-module-exports"]
                        //plugins: ['transform-runtime']//https://babeljs.io/docs/plugins/transform-runtime/
                    }
                }
            }, {
                test: /\.html?$/,
                use: {
                    loader: 'html-loader'
                }
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ]


            }, {
                test: /\.scss?$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
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
                        loader: 'sass-loader'
                    }
                ]
            }, {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: {
                    loader: 'url-loader'
                }

            }, {
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


        },
    }


}

module.exports = config;