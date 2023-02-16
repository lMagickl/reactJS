import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import InterpolateHtmlPlugin from 'interpolate-html-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.tsx",
  experiments: {
    outputModule: true,
    topLevelAwait: true,
  },
  output: {
    filename: "[name].js",
    library: {
      type: "module",
    },
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: false,
    host: "localhost",
    port: 3000,
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath:  "/",
      serverSideRender: true,
      writeToDisk: true,
      
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
      manifest: path.resolve(__dirname, "public", "manifest.json")
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'public'
  })
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "tsconfig.json": path.resolve(
        __dirname,
        isProduction ? "tsconfig.prod.json" : "tsconfig.dev.json"
      ),
    },
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }

  return config;
};
