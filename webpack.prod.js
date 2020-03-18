const path = require('path')
const merge = require('webpack-merge') // webpack-merge
const common = require('./webpack.common.js') // 汎用設定をインポート
const TerserPlugin = require('terser-webpack-plugin')

// common設定とマージする
module.exports = merge(common, {
    mode: 'production', // 本番モード
    output: {
        path: path.resolve(__dirname, 'dist', 'prod'),
        filename: '[name].[hash].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
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
})
