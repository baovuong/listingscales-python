var webpack = require('webpack');  
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
            },
            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,
          
                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                       {
                         // This loader resolves url() and @imports inside CSS
                         loader: "css-loader",
                       },
                       {
                         // Then we apply postCSS fixes like autoprefixer and minifying
                         loader: "postcss-loader"
                       },
                       {
                         // First we transform SASS to standard CSS
                         loader: "sass-loader",
                         options: {
                           implementation: require("sass")
                         }
                       }
                     ]
              }
        ],
        
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, "./js"), "node_modules"],
        extensions: ['.js', '.jsx']
    }
};