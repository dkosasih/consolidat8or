var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './app/main.ts'
    },
    output: {
        path: __dirname,
        filename: './dist/bundle.js',
        publicPath: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.ts/,
                loaders: ['ts-loader'], exclude: /node_modules/
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }]
    }
}