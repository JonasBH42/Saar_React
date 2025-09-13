const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@assets": "src/assets",
    "@components": "src/components",
    "@constants": "src/constants",
    "@fonts": "src/fonts",
    "@hooks": "src/hooks",
    "@screens": "src/screens",
    "@services": "src/services",
    "@states": "src/states",
    "@environment": "src/environment",
    "@styles": "src/styles",
  })(config);

  return config;
};
