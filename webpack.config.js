const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './front-end/index.jsx',
    output: {
        path: __dirname + '/front-end-build',
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', 'json'],
        modules: [
            path.resolve('.'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            inject: 'body',
            template: './front-end/index.html'
        }),
    ],
    devServer: {
        //contentBase: './',
        historyApiFallback: true,
        host: '0.0.0.0',
        //hot: true,
        port: 7001,
        proxy: {
            '/api': 'http://127.0.0.1:7000'
        }
    }
};
