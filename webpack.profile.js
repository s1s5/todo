const merge = require('webpack-merge') // webpack-merge
const prod = require('./webpack.prod.js') // 汎用設定をインポート

module.exports = merge(prod, {
    resolve: {
        alias: {
            'react-dom$': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
        }
    }
})
