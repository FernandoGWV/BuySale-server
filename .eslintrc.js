module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs,}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        allowString: false,
        allowNumber: false,
      },
    ],
    quotes: "warn",
    "@typescript-eslint/quotes": "error",
    semi: "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-readonly": "error",
  },
};
