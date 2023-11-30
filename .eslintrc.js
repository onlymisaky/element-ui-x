/** @typedef {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,
  ignorePatterns: [
    'lib',
    'vue.config.js',
    'lint-staged.config.js',
    'babel.config.js',
    'scripts/build.js',
    'docs/.vuepress/config.js',
    'docs/.vuepress/enhanceApp.js',
  ],
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};

module.exports = eslintConfig;
