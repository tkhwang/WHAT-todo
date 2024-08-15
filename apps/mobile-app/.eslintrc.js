module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react-hooks", "@typescript-eslint", "prettier"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    semi: [1, "always"],
    "no-var": "warn",
    eqeqeq: "warn",
    "react/prop-types": 0,
    "no-extra-semi": "error",
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "arrow-parens": ["warn", "as-needed"],
    "no-unused-vars": ["off"],
    "no-console": ["off"],
    "import/prefer-default-export": ["off"],
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-pascal-case": "warn",
    "react/jsx-key": "warn",
    "no-debugger": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react/function-component-definition": [2, { namedComponents: ["arrow-function", "function-declaration"] }],
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-nested-ternary": 0,
    "react/jsx-curly-brace-presence": ["warn", { props: "always", children: "always" }],
    "import/no-unresolved": ["error", { caseSensitive: false }],
    "react/jsx-props-no-spreading": [1, { custom: "ignore" }],
    "linebreak-style": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "import/no-extraneous-dependencies": 0,
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
        "newlines-between": "always",
      },
    ],
    "no-shadow": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        project: "./apps/mobile-app/tsconfig.json",
      },
    },
  },
};
