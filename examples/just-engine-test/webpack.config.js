const path = require('path');
const glob = require('webpack-glob-entry');

const NodemonPlugin = require('nodemon-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    node: { fs: 'empty', child_process: 'empty', url: true },

    entry: glob('./resources/js/*.js', './resources/levels/**/*.js'),
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: 'http://localhost:3000/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ]
    },
    resolve: {
        symlinks: false,
        extensions: ['.js', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'My RPGinia app',
            template: 'index.html',
            chunks: ['main']
        }),
        new NodemonPlugin({
            script: './server.js'
        })
    ]
}