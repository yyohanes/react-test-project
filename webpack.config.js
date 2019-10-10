const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BUILD_FOLDER = 'public'
const ASSETS_FOLDER = 'assets'

const config = (env, argv = {}) => {
  const mode = argv.mode || 'development'
  const isDev = mode === 'development'

  const envs = require('dotenv').config().parsed || {}
  // Filter only var prefixed with REACT_
  const envKeys = Object.keys(envs).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envs[next]);

    return prev;
  }, {});

  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, BUILD_FOLDER),
      filename: !isDev ? '[name].[hash].js' : '[name].js',
      chunkFilename: isDev ? '[id].[hash].js' : '[id].js',
      // publicPath: `/${BUILD_FOLDER}/`,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
      alias: {
        app: path.resolve(__dirname, 'src'),
        ['package.json']: path.resolve(__dirname, 'package.json'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      helpers: false,
                      regenerator: true,
                    },
                  ],
                ],
                presets: [
                  '@babel/react',
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                    },
                  ],
                ],
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-import')(),
                  require('postcss-preset-env')({
                    browsers: 'last 2 versions',
                  }),
                  require('cssnano'),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|otf|svg|woff2?|png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: !isDev ? '[hash].[ext]' : '[name].[ext]',
                outputPath: ASSETS_FOLDER,
                publicPath: `/${ASSETS_FOLDER}/`,
              },
            },
          ],
        },
      ],
    },
    devtool: !isDev ? false : 'cheap-module-eval-source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: !isDev ? '[name].[hash].css' : '[name].css',
        chunkFilename: !isDev ? '[id].[hash].css' : '[id].css',
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        filename: path.resolve(__dirname, BUILD_FOLDER, 'index.html')
      }),
      new webpack.DefinePlugin({
        __DEBUG__: isDev,
        ...envKeys,
      }),
    ],
    devServer: !isDev ? undefined : {
      watchContentBase: true,
      // quiet: true,
      publicPath: '/',
      port: 3000,
    },
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '.',
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
      runtimeChunk: {
        name: entrypoint => `runtime.${entrypoint.name}`,
      },
    },
  }
}

module.exports = config
