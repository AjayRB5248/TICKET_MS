const path = require("path");

module.exports = {
  trailingSlash: true,
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
    },
  },
  webpack(config) {
    // Expose jQuery to the global object
    config.module.rules.push({
      test: require.resolve("jquery"),
      loader: "expose-loader",
      options: {
        exposes: ["$", "jQuery"],
      },
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "assets", "frontend", "sass")],
  },
};
