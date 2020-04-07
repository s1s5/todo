const path = require('path')
const merge = require('webpack-merge') // webpack-merge
const common = require('./webpack.common.js') // 汎用設定をインポート
const TerserPlugin = require('terser-webpack-plugin')
const BundleTracker = require('webpack-bundle-tracker')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// common設定とマージする
module.exports = merge(common, {
    mode: 'production', // 本番モード
    output: {
        path: path.resolve(__dirname, 'dist', 'prod', 'js'),
        publicPath: '/static/js/',  // Djangoでどうserveするかに関わる
//        filename: '[name].[hash].js',
//        chunkFilename: '[name].[hash].js',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            maxInitialRequests: 100,
            // maxSize: 244000,  // これ入れるとdjango-webpack-loaderがうまく動かない
            // minSize: 100000,  // 効果あるかよくわからなかったので一旦OFF
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|subscriptions)/,
                    name: 'react',
                    priority: -2,
                },
                materialui: {
                    test: /[\\/]node_modules[\\/]@material-ui/,
                    name: 'material-ui',
                    priority: -4,
                },
                relayruntime: {
                    test: /[\\/]node_modules[\\/]relay-runtime/,
                    name: 'relay-runtime',
                    priority: -1,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                },
//                default: {
//                    minChunks: 2,
//                    priority: -20,
//                    reuseExistingChunk: true
//                }
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    // output: {
                    //     comments: false,
                    // },
                    compress: {
                        drop_console: true,
                    },
                },
                extractComments: 'all',  // コメントが除去された JavaScript ファイルと、LICENCE 情報のみ抽出されたファイルが出力されました。
            }),
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
    ],
})
