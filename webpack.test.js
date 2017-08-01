var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.(css|html)$/,
                loaders: ['raw-loader']
            },
            {
                test: /\.ts/,
                loaders: ['awesome-typescript-loader'], include: /node_modules\\angular-generic-table/
            },
            {
                test: /\.ts/,
                loaders: ['awesome-typescript-loader'], exclude: /node_modules/
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};