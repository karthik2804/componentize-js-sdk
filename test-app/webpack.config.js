const path = require('path');

module.exports = {
    entry: './src/index.js',
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'dist.js',
        module: true,
        library: {
            type: "module",
        }
    },
    externals: {
        "wasi:http/types@0.2.0": "wasi:http/types@0.2.0",
        "fermyon:spin/llm@2.0.0": "fermyon:spin/llm@2.0.0"
    },
    optimization: {
        minimize: false
    },
};