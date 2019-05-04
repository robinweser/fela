import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

const index = path.resolve(__dirname, "src/index.tsx");
const dist = path.resolve(__dirname, "dist");

export default {
    devServer: {
        contentBase: dist,
        port: 9000,
    },
    mode: "development",
    devtool: "source-map",
    entry: index,
    module: {
        rules: [
            {test: /\.tsx?$/, use: "ts-loader"},
        ],
    },
    output: {
        filename: "bundle.js",
        path: dist,
    },
    plugins: [new HtmlWebpackPlugin({
        appMountId: "root",
        inject: false,
        template: require('html-webpack-template'),
        title: "Fela with Typescript",
    })],
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
} as webpack.Configuration;
