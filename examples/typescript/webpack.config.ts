import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

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
        template: "node_modules/html-webpack-template/index.ejs",
        title: "Fela with Typescript",
    })],
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
} as webpack.Configuration;
