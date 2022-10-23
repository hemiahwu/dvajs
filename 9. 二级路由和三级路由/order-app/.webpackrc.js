const path = require("path");

export default {
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
  ],
  alias: {
    Utils: path.resolve(__dirname, "./src/utils/")
  }
};
