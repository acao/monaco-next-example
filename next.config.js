const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const transpileModules = require("next-transpile-modules");

// const TM = transpileModules(["monaco-editor"], {
//  resolveSymlinks: true,
//  debug: true,
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["monaco-editor"],
  webpack(config, { isServer }) {
    config.output.publicPath = "/_next/";
    config.resolve.alias = {
      ...config.resolve.alias,
      "./node_modules/monaco-editor/esm/vs/base/common/marked/marked.js":
        "marked",
      "../common/marked/marked.js": "marked",
    };
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["json", "graphql"],
        filename: "static/[name].worker.js",
        // publicPath: 'static'
      //  publicPath: "/static/"
        // globalAPI: true,
      })
    );

   // console.log(require.resolve("monaco-graphql/esm/graphql.worker.js"))
    console.log(config.module.rules)
    config.module.rules.push({
      test: require.resolve("monaco-graphql/esm/graphql.worker.js"),
      use: {
        loader: "worker-loader",
        options: {
          filename: "static/graphql.worker.js",
          publicPath: '/_next/'
        },
      },
    });
    // config.output.globalObject = 'self'
    return config;
  },
};

module.exports = nextConfig;
