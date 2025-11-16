const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,     // Node.js globals
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  {
    files: ["test/**/*.js", "**/*.test.js"],   // match test folder and *.test.js
    languageOptions: {
      globals: {
        ...globals.jest,    // allow describe, it, expect
      },
    },
  },
];
