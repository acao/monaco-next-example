const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { patchWebpackConfig } = require("next-global-css");
const path = require.path;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // this is necessary because monaco-editor
  // imports css files which next.js doesn't like
  // transpilePackages: ["monaco-editor"],
  webpack(config, options) {
    // this fixes some issues with loading webworkers
    config.output.publicPath = "/_next/";
    patchWebpackConfig(config, options);
    config.resolve.alias = {
      ...config.resolve.alias,

      // this solves a bug with more recent `monaco-editor` versions innext.js,
      // where a version of marked with modules pre-transpiled seems to break the build.
      //
      // it's an error that mentions that exports.Lexer is a const that can't be re-declared
      "../common/marked/marked.js": "marked",
    };
    if (!options.isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["json", "graphql"],
          filename: "static/[name].worker.js",
          customLanguages: [
            {
              label: "graphql",
              worker: {
                id: "graphql",
                entry: require.resolve("monaco-graphql/esm/graphql.worker.js"),
              },
            },
          ],
        })
      );
    }
    // this ensures the custom graphql webworker transpiles to the correct place
    config.module.rules.push({ test: /\.ttf$/, type: "asset/resource" });
    return config;
  },
};

module.exports = nextConfig;
