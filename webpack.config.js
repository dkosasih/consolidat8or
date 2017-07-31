var path = require('path');
var webpack = require('webpack');

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
        extensions: [".ts", ".js"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        inline: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.ts/,
                loaders: ['awesome-typescript-loader'], include: /node_modules\\angular-generic-table/
            },
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