 var webpack = require('webpack');  
var path = require('path');

module.exports = {
    entry: ['./js/app.js'],
    devtool: 'sourcemaps',
    cache: true,
    plugins: [ new webpack.LoaderOptionsPlugin({ debug: true }) ],
    output: {
        path: __dirname + '/static',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ],
        
    },
    resolve: {
        modules: [path.resolve(__dirname, "./js"), "node_modules"],
        extensions: ['.js', '.jsx']
    }
};