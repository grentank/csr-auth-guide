module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
};
