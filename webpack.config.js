/*** webpack.config.js ***/
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "example/src/index.html"),
    filename: "./index.html"
});
const pkg = require('./package.json');
const libraryName= pkg.name;

module.exports = {
    entry: path.join(__dirname, "example/src/index.js"),
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'myUnflappableComponent.js',
      library: libraryName,
      libraryTarget: 'umd',
      publicPath: '/dist/',
      umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    externals: {
    // Don't bundle react or react-dom
    react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
    },
    "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
      }
    },
    devServer: {
        port: 3030
    }
};
