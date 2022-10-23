const path = require("path");

export default {
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
  ],
  alias: {
    Assets: path.resolve(__dirname, "./src/assets/"),
    Utils: path.resolve(__dirname, "./src/utils/")
  }
};
