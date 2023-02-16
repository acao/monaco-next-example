const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
//
// use this approach with next 12 and below instead of transpilePackages
//
// const transpileModules = require("next-transpile-modules");
// const withTM = transpileModules(["monaco-editor"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["monaco-editor"],
  webpack(config, _options) {
    config.output.publicPath = "/_next/";
    config.resolve.alias = {
      ...config.resolve.alias,
      "../common/marked/marked.js": "marked",
    };
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["json", "graphql"],
        filename: "static/[name].worker.js",
      })
    );
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
    return config;
  },
};

module.exports = nextConfig;
