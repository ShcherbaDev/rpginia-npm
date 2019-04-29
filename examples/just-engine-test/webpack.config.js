const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: './resources/js/main.js',
    output: {
        filename: 'main.min.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new NodemonPlugin({
            script: './server.js'
        })
    ]
}