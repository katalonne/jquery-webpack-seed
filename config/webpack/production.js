import path from 'path';

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

var node_dir = path.resolve(__dirname, 'node_modules');
var lightbox2_dir = path.resolve(node_dir, 'lightbox2', 'dist', 'images');

module.exports = function (_path) {
    var webpackConfig = {
        entry: {

            map: _path + '/dev/map.js',
            bundle: _path + '/dev/index.js',
            // vendor: ['webpack-dev-server/client','./dev/vendor.js']
            vendor: _path + '/dev/vendor.js',
            // bundle_secondary: _path + '/dev/bundle_secondary.js',
        },
        output: {
            path: path.join(_path, 'dist'),
            filename: '[name].js',
            // filename: '[name].[hash].js',
        },
        resolve: {
            modulesDirectories: [
                'node_modules',
                'dev'
            ],
            alias: {
                assets: path.resolve(_path, 'dev', 'assets'),
                root: path.resolve(_path)
            },
            root: [
                path.resolve(__dirname, 'dev', 'assets'),
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    // exclude: [
                    // 	path.resolve(__dirname, "node_modules"),
                    // ],
                    query: {
                        compact: false,
                        plugins: ["transform-es2015-modules-commonjs"],
                        presets: ['es2015', 'stage-0']
                    }
                },

                {

                    test: new RegExp('/node_modules/lightbox2/dist/js/lightbox.js'),
                    loader: "imports?define=>false"
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(
                        "style",
                        "css-loader?minimize!postcss-loader!autoprefixer-loader!sass"
                    )
                },
                // { test: /jquery/, loader: 'expose?$!expose?jQuery' },
                { test: /\.jpg$/, loader: "file-loader?name=./assets/imgs/[name].jpg" },
                { test: /\.png$/, loaders: ["file-loader?name=./assets/imgs/[name].png"] },
                { test: /\.(gif|woff|woff2|eot|ttf|svg|cur)$/, loader: "url-loader" },
            ]
        },

        postcss: function () {
            return [precss, autoprefixer];
        },


        plugins: [
            new CopyWebpackPlugin([
                { from: './dev/assets', to: 'assets' },
                { from: './dev/bootstrap3', to: 'bootstrap3' },
                // { from: lightbox2_dir, to: 'assets/imgs' },
                // { from: lightbox2_dir, to: 'assets/imgs' }
            ]),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['bundle', 'vendor']
            }),
            new HtmlWebpackPlugin({
                hash: false,
                template: 'ejs!./dev/main/main.html',
                filename: 'index.html',
                inject: 'body',
                chunks: ['vendor', 'bundle','map'],
            }),
            // new ExtractTextPlugin("styles.[hash].css"),
            new ExtractTextPlugin("styles.css"),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
            }),
            // new webpack.HotModuleReplacementPlugin()
        ],
    }

    return webpackConfig;
    // devServer: {
    // hot:true,
    // inline:true
    // }

};