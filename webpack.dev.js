const path = require('path');
const merge = require('webpack-merge') // webpack-merge
const webpack = require('webpack');
const common = require('./webpack.common.js') // 汎用設定をインポート

const HtmlWebpackPlugin = require('html-webpack-plugin');

// common設定とマージする
module.exports = merge(common, {
    mode: 'development', // 本番モード
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    output: {
        path: path.join(__dirname, 'dist', 'dev'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),  // HMRを使用している時、moduleの相対パスを表示してくれる
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/dev-index.html'),
        }),
    ],
})
