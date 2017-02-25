let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');

let libraryName = 'PaPlayer';
let env = process.env.WEBPACK_ENV;
let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, 'src');
let BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

let plugins = [];
if (env !== 'dev') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    );
}

module.exports = {
    entry: './src/' + libraryName + '.js',

    output: {
        path: BUILD_PATH,
        filename: libraryName + '.min.js',
        library: libraryName,
        libraryTarget: 'var',
        // libraryTarget: 'umd',
        // umdNamedDefine: true
    },

    devtool: 'source-map',

    devServer: {
        publicPath: "/dist/",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: APP_PATH,
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
                include: APP_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            }
        ]
    },

    plugins: plugins
};