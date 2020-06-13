const webpack =  require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      port: 8081  
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        // new HtmlWebpackInlineSVGPlugin({
        //     runPreEmit: true
        // }),

        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css',
          }),

        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/assets/img/favicon.ico'), to: path.resolve(__dirname, 'dist/assets/img/favicon.ico')}
            ]
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
          }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css-loader',
                      options: { sourceMap: true }
                    },
                    {
                      loader: 'postcss-loader',
                      options: { sourceMap: true, config: { path: 'src/assets/js/postcss.config.js' } }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css-loader',
                      options: { sourceMap: true }
                    },
                    {
                      loader: 'postcss-loader',
                      options: { sourceMap: true, config: { path: 'src/assets/js/postcss.config.js' } }
                    },
                    {
                      loader: 'sass-loader',
                      options: { sourceMap: true }
                    }
                  ]
            },
            {
                test: /\.(png|jpg|gif|webp|svg)$/,
                use: ['file-loader'],
            },
            // {
            //     test: /\.svg$/,
            //     loader: ['svg-inline-loader']
            // },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}