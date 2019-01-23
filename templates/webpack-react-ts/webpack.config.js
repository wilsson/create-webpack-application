const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/entry.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
     resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html')
        })
    ]
}