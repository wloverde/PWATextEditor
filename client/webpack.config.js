const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'], // Include the 'main' bundle in this HTML file
      }),
      
      // Configure the InjectManifest plugin for service workers
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        exclude: [/\.map$/, /manifest\.json$/], // Exclude specific files
      }),
      // Configure the WebpackPwaManifest plugin
      new WebpackPwaManifest({
        name: 'Jace Text Editor',
        short_name: 'Jace',
        description: 'The Only Text Editor you need',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      
    ],

    module: {
      rules: [
        // CSS loaders for .css files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
