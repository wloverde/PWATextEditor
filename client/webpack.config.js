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
        template: './src/index.html',
        chunks: ['main'], // Include the 'main' bundle in this HTML file
      }),
      
      // Configure the WebpackPwaManifest plugin
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA Short Name',
        description: 'Your PWA Description',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      
      // Configure the InjectManifest plugin for service workers
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        exclude: [/\.map$/, /manifest\.json$/], // Exclude specific files
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
            },
          },
        },
      ],
    },
  };
};
