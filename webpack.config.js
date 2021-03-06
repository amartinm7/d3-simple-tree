const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}