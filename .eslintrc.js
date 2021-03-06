module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript', // airbnb, airbnb-typescriptの順番で記述
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier', // prettirとeslintの競合を避ける,最後に入れること
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: './tsconfig.json', // airbnb-typescriptで利用する
  },
  settings: {
    react: {
      version: 'detect', // reactのバージョンを設定,eslint-plugin-reactで利用
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/display-name': 'off',
    'react/function-component-definition': 'off',
  },
};
