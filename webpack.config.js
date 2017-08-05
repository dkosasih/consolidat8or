var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'app': './app/main.ts'
    },
    output: {
        path: __dirname,
        filename: './dist/bundle.js',
        publicPath: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules:[
            "./node_modules",
            "./app"
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./app'), // location of your src
            {} // a map of your routes
        )
    ],
    devServer: {
        inline: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: helpers.root('tsconfig.json') }
                    }, 'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                loader: 'to-string-loader!style-loader!css-loader?sourceMap'
            },{
                test: /\.css$/,
                include: helpers.root('app'),
                loader: 'to-string-loader!raw-loader'
            },
            {
                test: /\.less$/,
                loader: 'to-string-loader!style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/,
                loaders: [{
                    loader: 'to-string-loader'
                },
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    }
}