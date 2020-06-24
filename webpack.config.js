const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    publicPath: "/build/",
    proxy: {
      "/api/": "http://localhost:3000/",
    },
    port: 8081,
    hot: true,
  },
  mode: process.env.NODE_ENV,
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
        },
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
