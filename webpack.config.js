const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  mode: 'none',
  target: "node",
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './'),
    libraryTarget: 'umd',
  },
  externals: [nodeExternals()],
};

const webConfig = {
  mode: 'none',
  target: "web",
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.web.js',
    path: path.resolve(__dirname, './'),
    libraryTarget: 'umd',
    library: { type: 'window' },
  },
};

module.exports = [serverConfig, webConfig];
