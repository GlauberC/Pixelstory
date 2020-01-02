module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-undef': 'off',
    'lines-around-directive': 'off',
    strict: 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
  },
}
