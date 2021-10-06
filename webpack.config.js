/* eslint-disable */
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
const dotenv = require('dotenv')
const webpack = require('webpack')
const path = require('path')

module.exports = () => {
  const env = dotenv.config().parsed
  const envVars = Object.keys(env).reduce((obj, key) => {
    obj[`process.env.${key}`] = JSON.stringify(env[key])
    return obj
  }, {})

  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.s?[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: true, sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ]
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      port: 8081
    },
    plugins: [
      new webpack.DefinePlugin(envVars),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      }),
    ],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@history': path.resolve(__dirname, 'src/history'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@reducers': path.resolve(__dirname, 'src/reducers'),
        '@actions': path.resolve(__dirname, 'src/actions'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@api': path.resolve(__dirname, 'src/api')
      }
    }
  }
}
