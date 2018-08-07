const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './index.js',
    },
    output: {
        filename: './dist/shinejs.js',
        library: 'Shinejs',
        libraryTarget: 'umd'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'dist',
            to: 'dist-example/js'
        }])
    ],
};