const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
     resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'react']
              }
            }
          }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: "/dist/",
        watchContentBase: true
    }
}