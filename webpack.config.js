module.exports = {
    entry: {
        'app': './app/main.ts'
    },
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        loaders: [
            { test: /\.ts/, 
              loaders: ['ts-loader'], exclude: /node_modules/
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }]
    }
}