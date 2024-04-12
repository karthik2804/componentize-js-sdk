const path = require('path');
const test = require('vue-loader');
const webpack = require('webpack')
const VueLoaderPlugin = test.VueLoaderPlugin

module.exports = {
    mode: 'development', // Set to 'production' for optimized builds
    entry: './src/client.js', // Entry point for your application
    output: {
        filename: 'bundle.js', // Name of the output bundle
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.vue$/, // Rule to handle Vue files
                loader: 'vue-loader',
            },
            {
                test: /\.js$/, // Rule to handle JavaScript files
                exclude: /node_modules/, // Exclude node_modules folder
                loader: 'babel-loader', // Use Babel loader for transpiling modern JS
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(), // Enables Vue loader features
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ]
};