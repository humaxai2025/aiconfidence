module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};