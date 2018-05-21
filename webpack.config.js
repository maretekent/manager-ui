var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
ExtractTextPlugin = require('extract-text-webpack-plugin');
CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src', 'index.html')
})

module.exports = {
    entry: {index: path.join(__dirname, 'src', 'App.js')},
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader?name=./Scripts/dist/[name].[ext]'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },

        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('style.bundle.css'),
        new CopyWebpackPlugin([
            {
                context: './src/assets/images',
                from: '**/*',
                to: 'assets/images'
            }
        ])
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}